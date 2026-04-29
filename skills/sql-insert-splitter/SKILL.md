---
name: sql-insert-splitter
description: This skill should be used when the user needs to split a large SQL file containing INSERT statements into multiple smaller files. It supports configuring the number of rows per file (default 1000), optionally prepending a DELETE statement to each output file with conditions derived from INSERT field values (IN / BETWEEN / EQ), and specifying the output directory.
---

# SQL Insert Splitter

## Overview

Split large SQL INSERT files into multiple smaller files. Each output file can optionally include a DELETE statement at the top whose WHERE condition is automatically built from the INSERT data of that chunk.

## Workflow

### Step 1 - Gather Parameters

Collect the following from the user before running:

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `input_file` | Yes | - | Path to the source `.sql` file |
| `--rows` | No | 1000 | Number of INSERT rows per output file |
| `--out-dir` | No | Same dir as input | Directory where split files are written |
| `--delete-table` | No | - | Table name for the DELETE statement |
| `--delete-field` | No | - | Column name used in the DELETE WHERE clause (must exist in the INSERT column list) |
| `--delete-op` | No | `in` | Condition type: `in` | `between` | `eq` |
| `--encoding` | No | `utf-8` | File encoding |

**DELETE modes explained:**

- `in` -> `DELETE FROM t WHERE field IN (v1, v2, ...)`
  Use when the field is an ID or discrete value.
- `between` -> `DELETE FROM t WHERE field BETWEEN min AND max`
  Use when the field is a date or numeric range; min/max are derived automatically from the chunk.
- `eq` -> `DELETE FROM t WHERE field = v1`
  Use when every row in the chunk shares the same field value.

### Step 2 - Run the Script

The script is located at `scripts/split_sql.py`. Execute it with Python 3:

```bash
# Basic split (no DELETE)
python scripts/split_sql.py data.sql --rows 500 --out-dir ./output

# Split + DELETE WHERE id IN (...)
python scripts/split_sql.py data.sql \
  --rows 1000 \
  --out-dir ./output \
  --delete-table orders \
  --delete-field id \
  --delete-op in

# Split + DELETE WHERE create_date BETWEEN ... AND ...
python scripts/split_sql.py data.sql \
  --delete-table orders \
  --delete-field create_date \
  --delete-op between \
  --out-dir ./output \
  --encoding gbk
```

### Step 3 - Verify Output

Each output file is named `<stem>_NNNN.sql` (e.g. `data_0001.sql`, `data_0002.sql`).

Structure of each file:

```sql
-- (optional) header lines from original file, e.g. SET NAMES utf8mb4;

DELETE FROM orders WHERE id IN (1, 2, 3, ...);   -- only if --delete-table provided

INSERT INTO orders (id, name, ...) VALUES (...);
INSERT INTO orders (id, name, ...) VALUES (...);
...
```

Check the console output for a per-file summary and any warnings about missing field values or unrecognized column names.

## Important Notes

- The script handles single-row INSERT format: `INSERT INTO t (cols) VALUES (row);`
  Multi-row batch INSERT (`VALUES (...), (...), (...)`) is **not** split at the value level - each such line counts as one INSERT row.
- For `--delete-op between`, values are sorted lexicographically; ensure date/number formats are zero-padded and consistent.
- Non-INSERT lines appearing before the first INSERT (e.g. `SET`, `USE`, comments) are treated as a header and prepended to every output file.
- If the `--delete-field` column cannot be found in the INSERT column list, a warning is printed and no DELETE statement is generated for that chunk.
