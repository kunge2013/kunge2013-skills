# Skills 参考手册

本文档提供了 Kunge2013 Skills Hub 中所有可用 skills 的详细参考信息。

## 可用 Skills

### Example Skill

**名称**: `example-skill`
**版本**: 1.0.0
**类别**: demo
**路径**: `skills/example-skill`

**描述**: 一个示例 skill，展示了 Claude Code skills 的基本结构和功能。

**基本用法**:
```bash
/example-skill --message "Hello World"
```

**参数**:
- `--message`: 要显示的消息（默认: "Hello, World!"）
- `--verbose`: 启用详细输出模式

**详细文档**: [查看完整文档](../skills/example-skill/SKILL.md)

---

## Skills 分类

### 工具类 (Utility)

用于日常任务和效率提升的工具。

### 示例类 (Demo)

用于学习和参考的示例 skills。

### 自动化类 (Automation)

自动化重复任务的 skills。

---

## 使用 Skills

### 在 Claude Code 中使用

```bash
# 基本用法
/<skill-name>

# 带参数
/<skill-name> --option value

# 详细模式
/<skill-name> --verbose
```

### 在脚本中使用

```javascript
import { main } from 'skills/example-skill/scripts/main';

const result = await main({
  message: 'Hello',
  verbose: true
});

console.log(result);
```

---

## 技术参考

### Skill 结构

每个 skill 遵循以下结构：

```
skills/<skill-name>/
├── SKILL.md              # Skill 定义和文档
├── scripts/              # 可选：实现代码
│   ├── main.ts           # 入口文件
│   └── main.test.ts      # 测试文件
├── prompts/              # 可选：提示词模板
└── references/           # 可选：参考文档
```

### SKILL.md 格式

```yaml
---
name: skill-name
description: Brief description
version: 1.0.0
author: author-name
category: category
tags: [tag1, tag2]
---
```

### 接口定义

#### Options 接口

```typescript
interface Options {
  [key: string]: any;
}
```

#### Result 接口

```typescript
interface Result {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
```

---

## 开发参考

### 创建新 Skill

参考 [创建自定义 Skills 指南](creating-skills.md) 了解详细信息。

### 测试 Skills

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test skills/example-skill/scripts/main.test.ts
```

### 验证 Skills

```bash
# 验证所有 skills
npm run validate
```

---

## 故障排除

### Skill 无法加载

1. 检查 SKILL.md 格式是否正确
2. 验证 marketplace.json 中的路径
3. 运行 `npm run validate` 检查配置

### 执行错误

1. 检查环境变量配置
2. 查看详细错误信息（使用 `--verbose`）
3. 检查依赖是否已安装

### 性能问题

1. 使用 `--verbose` 查看详细执行时间
2. 检查是否有不必要的循环或递归
3. 优化异步操作

---

## 贡献指南

想要贡献新的 skill？

1. Fork 本仓库
2. 创建新的 skill 目录
3. 编写 SKILL.md 和实现代码
4. 运行 `npm run validate` 验证
5. 提交 Pull Request

---

## 资源链接

- [项目主页](../README.md)
- [安装指南](installation.md)
- [创建 Skills 指南](creating-skills.md)
- [Claude Code 官方文档](https://platform.claude.com/docs/en/agents-and-tools/agent-skills)
- [GitHub 仓库](https://github.com/kunge2013/kunge2013-skills)