#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SQL INSERT 拆分工具

将包含大量 INSERT 语句的 SQL 文件拆分为多个小文件，支持：
- 按行数拆分（默认 1000 行/文件）
- 在每个文件头部插入可选的 DELETE 语句
- DELETE 条件可基于 INSERT 数据中的字段值
- 指定输出目录

Usage:
    python split_sql.py <input_file> [options]

Options:
    --rows          每个输出文件包含的 INSERT 行数（默认: 1000）
    --out-dir       输出目录（默认: 与输入文件同目录）
    --delete-table  要生成 DELETE 语句的目标表名
    --delete-field  DELETE 条件字段名（对应 INSERT 中的某列）
    --delete-op     DELETE 条件操作符: in | between | eq（默认: in）
    --encoding      文件编码（默认: utf-8）

Examples:
    # 仅拆分，不加 DELETE
    python split_sql.py data.sql --rows 500 --out-dir ./output

    # 拆分并为每个文件添加 DELETE ... WHERE id IN (...)
    python split_sql.py data.sql --delete-table orders --delete-field id --delete-op in

    # DELETE ... WHERE create_date BETWEEN 'min' AND 'max'
    python split_sql.py data.sql --delete-table orders --delete-field create_date --delete-op between
"""

import argparse
import os
import re
import sys
import io
from pathlib import Path

# Windows 控制台 UTF-8
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")


# ─────────────────────────── 解析 INSERT 语句 ───────────────────────────────

def parse_insert_columns(insert_line: str):
    """从 INSERT INTO table (col1, col2, ...) VALUES ... 中提取列名列表。"""
    m = re.search(r"\(\s*([^)]+?)\s*\)\s*values", insert_line, re.IGNORECASE)
    if not m:
        return []
    cols = [c.strip().strip('`"[]') for c in m.group(1).split(",")]
    return cols


def parse_values_row(values_str: str):
    """
    从单行 VALUES 子串中提取字段值列表，支持带引号的字符串（含逗号、转义）。
    values_str 形如: ('abc', 123, 'x,y', NULL)
    """
    # 去掉最外层括号
    values_str = values_str.strip()
    if values_str.startswith("("):
        values_str = values_str[1:]
    if values_str.endswith(")"):
        values_str = values_str[:-1]

    tokens = []
    current = ""
    in_quote = False
    quote_char = ""
    i = 0
    while i < len(values_str):
        ch = values_str[i]
        if in_quote:
            if ch == "\\" and i + 1 < len(values_str):
                current += ch + values_str[i + 1]
                i += 2
                continue
            if ch == quote_char:
                in_quote = False
            current += ch
        else:
            if ch in ("'", '"'):
                in_quote = True
                quote_char = ch
                current += ch
            elif ch == ",":
                tokens.append(current.strip())
                current = ""
            else:
                current += ch
        i += 1
    if current.strip():
        tokens.append(current.strip())
    return tokens


def get_field_value(columns, values, field_name: str):
    """根据列名获取 VALUES 行中对应字段的原始值字符串。"""
    field_lower = field_name.lower()
    for i, col in enumerate(columns):
        if col.lower() == field_lower and i < len(values):
            return values[i]
    return None


# ─────────────────────────── 拆分核心逻辑 ───────────────────────────────────

def split_insert_file(
    input_path: str,
    rows_per_file: int = 1000,
    out_dir: str = None,
    delete_table: str = None,
    delete_field: str = None,
    delete_op: str = "in",
    encoding: str = "utf-8",
):
    input_path = Path(input_path).resolve()
    if not input_path.exists():
        print(f"[ERROR] 输入文件不存在: {input_path}")
        sys.exit(1)

    # 输出目录
    if out_dir:
        out_path = Path(out_dir).resolve()
    else:
        out_path = input_path.parent
    out_path.mkdir(parents=True, exist_ok=True)

    # 读取所有行
    print(f"[INFO] 读取文件: {input_path} (encoding={encoding})")
    with open(input_path, encoding=encoding, errors="replace") as f:
        raw_lines = f.readlines()

    # 分离 INSERT 行与非 INSERT 行（头部注释/SET 语句等）
    header_lines = []
    insert_lines = []
    for line in raw_lines:
        stripped = line.strip()
        if stripped.upper().startswith("INSERT"):
            insert_lines.append(stripped)
        else:
            if not insert_lines:  # 还没遇到第一条 INSERT，视为头部
                header_lines.append(line)

    if not insert_lines:
        print("[WARN] 文件中未找到 INSERT 语句，退出。")
        sys.exit(0)

    total = len(insert_lines)
    num_files = (total + rows_per_file - 1) // rows_per_file
    stem = input_path.stem
    suffix = input_path.suffix or ".sql"

    print(f"[INFO] 共找到 {total} 条 INSERT，将拆分为 {num_files} 个文件（每文件 {rows_per_file} 行）")

    # 尝试解析列名（从第一条 INSERT 语句）
    columns = parse_insert_columns(insert_lines[0]) if insert_lines else []
    if delete_field and columns:
        if delete_field.lower() not in [c.lower() for c in columns]:
            print(f"[WARN] 字段 '{delete_field}' 未在 INSERT 列中找到，列名: {columns}")

    # 按块写文件
    for chunk_idx in range(num_files):
        chunk = insert_lines[chunk_idx * rows_per_file: (chunk_idx + 1) * rows_per_file]
        file_num = chunk_idx + 1
        out_file = out_path / f"{stem}_{file_num:04d}{suffix}"

        # 收集 DELETE 条件值
        delete_stmt = ""
        if delete_table and delete_field and columns:
            field_values = []
            for ins_line in chunk:
                # 取 VALUES 部分（支持单行 INSERT ... VALUES (...)）
                m = re.search(r"values\s*(\(.*\))\s*;?\s*$", ins_line, re.IGNORECASE | re.DOTALL)
                if m:
                    row_vals = parse_values_row(m.group(1))
                    v = get_field_value(columns, row_vals, delete_field)
                    if v and v.upper() != "NULL":
                        field_values.append(v)

            if field_values:
                delete_stmt = _build_delete(delete_table, delete_field, delete_op, field_values)
            else:
                print(f"[WARN] 第 {file_num} 个文件未提取到有效的 DELETE 值，跳过 DELETE 语句生成")

        with open(out_file, "w", encoding=encoding) as fout:
            # 写头部（如 SET NAMES utf8mb4; 等）
            if header_lines:
                fout.writelines(header_lines)
                fout.write("\n")

            # 写 DELETE 语句
            if delete_stmt:
                fout.write(delete_stmt)
                fout.write("\n\n")

            # 写 INSERT 语句
            for ins in chunk:
                line_out = ins if ins.endswith(";") else ins + ";"
                fout.write(line_out + "\n")

        print(f"[OK]   写出: {out_file}  ({len(chunk)} 行 INSERT)")

    print(f"\n[DONE] 拆分完成，共生成 {num_files} 个文件 -> {out_path}")


def _build_delete(table: str, field: str, op: str, values: list) -> str:
    """根据操作符构建 DELETE 语句。"""
    op = op.lower()
    if op == "in":
        val_list = ", ".join(values)
        return f"DELETE FROM {table} WHERE {field} IN ({val_list});"
    elif op == "between":
        # 取最小值与最大值（按字符串排序，适合日期/数字类型且格式统一）
        sorted_vals = sorted(values)
        min_v, max_v = sorted_vals[0], sorted_vals[-1]
        return f"DELETE FROM {table} WHERE {field} BETWEEN {min_v} AND {max_v};"
    elif op == "eq":
        # 通常只有单值场景，取第一个
        return f"DELETE FROM {table} WHERE {field} = {values[0]};"
    else:
        print(f"[WARN] 未知的 delete-op '{op}'，回退为 IN")
        val_list = ", ".join(values)
        return f"DELETE FROM {table} WHERE {field} IN ({val_list});"


# ─────────────────────────── CLI 入口 ───────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="拆分 SQL INSERT 文件，可选在每个子文件头部生成 DELETE 语句",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("input_file", help="输入 SQL 文件路径")
    parser.add_argument("--rows", type=int, default=1000, help="每个文件的 INSERT 行数（默认 1000）")
    parser.add_argument("--out-dir", default=None, help="输出目录（默认与输入文件同目录）")
    parser.add_argument("--delete-table", default=None, help="DELETE 语句目标表名")
    parser.add_argument("--delete-field", default=None, help="DELETE 条件字段名（须为 INSERT 中的列）")
    parser.add_argument(
        "--delete-op",
        default="in",
        choices=["in", "between", "eq"],
        help="DELETE 条件类型: in（默认）| between | eq",
    )
    parser.add_argument("--encoding", default="utf-8", help="文件编码（默认 utf-8）")

    args = parser.parse_args()

    split_insert_file(
        input_path=args.input_file,
        rows_per_file=args.rows,
        out_dir=args.out_dir,
        delete_table=args.delete_table,
        delete_field=args.delete_field,
        delete_op=args.delete_op,
        encoding=args.encoding,
    )


if __name__ == "__main__":
    main()
