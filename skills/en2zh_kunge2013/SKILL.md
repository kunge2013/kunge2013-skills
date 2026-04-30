---
name: en2zh_kunge2013
description: 将英文 Markdown 文件翻译为中文。当用户请求将英文内容翻译为中文、转换文档语言或对英文文件进行本地化时使用此技能。支持 Markdown (.md)、纯文本 (.txt) 等文本格式。翻译后的文件命名为 xxx_CN.md（例如 README.md → README_CN.md），与原始文件位于同一目录。
---

# English to Chinese Translator

## Overview

本技能用于将英文文档翻译为自然、流畅的中文，同时保留原始结构和格式含义。适用于技术文档、Markdown 文件及通用文本内容。

## 快速开始

翻译文档的步骤：

1. **读取源文件** - 使用 Read 工具加载英文内容
2. **翻译内容** - 在保留原始结构和格式的前提下生成中文翻译
3. **写入输出文件** - 创建新文件，命名格式为 `xxx_CN.md`（例如 `README.md` → `README_CN.md`），与原始文件位于同一目录

## 命名规则

**翻译后的文件名必须为 `原始文件名_CN.md`，与原始文件在同一目录下。**

示例：
- `README.md` → `README_CN.md`
- `guide.md` → `guide_CN.md`
- `docs/getting-started.md` → `docs/getting-started_CN.md`

## 翻译准则

### 通用原则

- **准确性优先**：保留原始含义，不增删信息
- **中文表达自然**：使用自然的中文措辞，而非逐字直译
- **保持结构**：保留标题、列表、代码块、表格和链接不变
- **技术术语**：适当保留常见技术术语的英文（API、HTTP、JSON 等）
- **一致性**：全文使用一致的术语

### 格式处理

#### Markdown (.md)

- 保留所有 Markdown 语法：`#`、`**`、`*`、`` ` ``、`>`、`-`、`1.` 等
- 代码块（`` ``` ``）保持不变 — 不翻译代码
- 行内代码（反引号）保持不变，除非是描述性文字
- 保留链接语法：`[text](url)` — 翻译 text，保留 URL
- 保留图片语法：`![alt](url)` — 翻译 alt 文字，保留 URL

#### 表格

- 翻译表格内容，保持表格结构不变
- 保留列对齐标记（`|---|`）

#### 代码和技术内容

- **绝不翻译**：代码、函数名、变量名、命令、文件路径
- **绝不翻译**：URL、电子邮件地址、API 端点
- **视情况而定**：技术术语如 "endpoint"、"payload"、"callback" — 使用通用中文技术术语，或若无标准翻译则保留英文

### 翻译质量检查清单

- [ ] 所有内容已准确翻译
- [ ] 中文表达自然流畅
- [ ] 原始结构和格式已保留
- [ ] 代码块和技术标识符保持不变
- [ ] 链接和 URL 完整
- [ ] 技术术语处理一致

## 常用技术术语参考

| English | Chinese |
|---------|---------|
| API | API (保留英文) |
| endpoint | 端点 / endpoint |
| request/response | 请求/响应 |
| authentication | 认证 |
| authorization | 授权 |
| parameter | 参数 |
| configuration | 配置 |
| deployment | 部署 |
| repository | 仓库 / repository |
| commit | 提交 / commit |
| merge | 合并 / merge |
| branch | 分支 / branch |
| issue | 问题 / issue |
| pull request | 拉取请求 / PR |
| callback | 回调 / callback |
| middleware | 中间件 |
| framework | 框架 |
| library | 库 / library |
| dependency | 依赖 |

**注意**：当不确定某个技术术语的翻译时，保留英文并附中文解释（例如 "端点 (endpoint)"）通常是最清晰的做法。

## 工作流程

### 步骤 1：识别输入

从用户请求中确定源文件路径和格式。

### 步骤 2：读取源内容

使用 Read 工具加载英文文档的完整内容。

### 步骤 3：生成翻译

按照上述准则生成中文翻译。对于较长的文档，逐段翻译以确保质量。

### 步骤 4：写入输出文件

创建翻译后的文件，命名格式为 `xxx_CN.md`：
- 原始：`README.md` → 翻译后：`README_CN.md`
- 原始：`docs/guide.md` → 翻译后：`docs/guide_CN.md`

输出文件必须与原始文件位于同一目录。

### 步骤 5：验证

完成前验证：
- 文件已成功写入
- 格式已保留
- 代码/命令未被意外翻译

## 使用示例

**用户请求**："将这个 README.md 翻译成中文"

**流程**：
1. 读取 `README.md`
2. 在保留 Markdown 结构的同时翻译内容
3. 写入 `README_CN.md`，包含中文翻译

## Resources

本技能专注于翻译指导，无需额外的捆绑资源。所有翻译工作由语言模型按照上述准则执行。
