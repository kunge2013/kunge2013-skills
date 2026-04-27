---
name: hello-world
description: A simple greeting skill that demonstrates basic functionality. Use this skill to generate friendly greeting messages or to test skill integration.
version: 1.0.0
category: demo
tags: [example, tutorial, greeting]
---

# Hello World Skill

## 描述

这是一个简单的问候技能，演示基本的 skill 功能。它生成友好的问候消息，非常适合用于测试 skill 集成和了解如何使用 skills。

## 使用方法

在 Claude Code 对话中使用此 skill：

```bash
# 基本使用
/hello-world

# 带自定义名字
/hello-world --name "张三"

# 带问候语
/hello-world --greeting "你好" --name "李四"

# 详细模式
/hello-world --verbose
```

## 功能特性

### 1. 基础问候

生成标准的问候消息："Hello, World!"

### 2. 自定义名字

支持自定义接收者的名字，生成个性化的问候。

### 3. 自定义问候语

支持自定义问候语，如"你好"、"Hi"、"Bonjour"等。

### 4. 详细输出

使用 `--verbose` 标志可以看到问候消息的详细信息，包括时间戳和消息长度。

## 参数说明

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| --name | string | 否 | 接收者的名字（默认: "World"） |
| --greeting | string | 否 | 问候语（默认: "Hello"） |
| --verbose | flag | 否 | 启用详细输出模式 |

## 使用示例

### 示例 1: 基本使用

```bash
/hello-world
```

输出：
```
✅ Hello, World!
```

### 示例 2: 自定义名字

```bash
/hello-world --name "张三"
```

输出：
```
✅ Hello, 张三!
```

### 示例 3: 自定义问候语和名字

```bash
/hello-world --greeting "你好" --name "李四"
```

输出：
```
✅ 你好, 李四!
```

### 示例 4: 详细模式

```bash
/hello-world --verbose
```

输出：
```
[时间戳] 2024-01-01 12:00:00
[接收者] World
[问候语] Hello
[消息长度] 13 字符

✅ Hello, World!
```

## 适用场景

- 测试 skill 功能是否正常工作
- 学习如何在 Claude Code 中使用 skills
- 作为创建自定义 skills 的参考模板
- 演示基本的消息处理和参数传递

## 限制和注意事项

- 名字和问候语会被自动清理（移除首尾空白）
- 名字长度限制为 50 个字符
- 问候语长度限制为 20 个字符
- 此 skill 主要用于演示和学习目的

## 扩展建议

基于此 skill 创建新的技能时：

1. 修改 SKILL.md 中的描述和功能说明
2. 在 `scripts/` 目录中添加实现代码（如需要）
3. 在 `references/` 目录中添加参考文档
4. 在 `prompts/` 目录中添加提示词模板
5. 更新 `.claude-plugin/marketplace.json` 注册 skill

## 相关资源

- [创建自定义 Skills 指南](../docs/creating-skills.md)
- [安装指南](../docs/installation.md)
- [在 Claude Code 中使用 Skills](../docs/using-skills-in-claude-code.md)
- [Skills 参考手册](../docs/skills-reference.md)

## 快速开始

现在就试试在对话中使用：

```bash
/hello-world --name "你的名字"
```

或者直接告诉 Claude：

```
"请用 hello-world 技能向我打招呼"
```

Claude 会自动理解并执行此 skill！