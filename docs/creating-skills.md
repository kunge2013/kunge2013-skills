# 创建自定义 Skills 指南

本文档详细说明如何为 Kunge2013 Skills Hub 创建和发布自定义 skills。

## Skill 基本概念

Claude Code Skill 是一个可重用的 AI 工具，包含：

- **SKILL.md**: 定义 skill 的元数据、描述和使用方法
- **scripts/**: 可选的 TypeScript/JavaScript 实现
- **prompts/**: 可选的提示词模板
- **references/**: 可选的参考文档和资源

## 创建 Skill 的步骤

### 步骤 1: 创建目录结构

```bash
# 创建新的 skill 目录
mkdir -p skills/my-custom-skill

# 创建必要的子目录
mkdir -p skills/my-custom-skill/scripts
mkdir -p skills/my-custom-skill/prompts
mkdir -p skills/my-custom-skill/references
```

### 步骤 2: 创建 SKILL.md

`SKILL.md` 是 skill 的核心文件，包含 YAML 前置数据和 Markdown 文档：

```markdown
---
name: my-custom-skill
description: Brief description of what this skill does (max 1024 chars)
version: 1.0.0
author: kunge2013
category: utility
tags: [automation, productivity]
---

# My Custom Skill

## 描述

详细描述这个 skill 的功能和用途。

## 使用方法

在 Claude Code 中使用此 skill 的方法。

### 示例

```bash
/my-custom-skill --option value
```

## 参数说明

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| --option | string | 否 | 参数说明 |

## 配置

如果 skill 需要配置，说明如何配置。

## 限制和注意事项

列出任何限制或需要注意的事项。
```

**SKILL.md 要求**:
- 前置数据必须包含 `name`, `description`, `version`
- `description` 最大 1024 字符
- 文档内容建议不超过 500 行
- 使用第三人称描述

### 步骤 3: 创建实现代码（可选）

如果 skill 需要 JavaScript/TypeScript 实现：

```typescript
// skills/my-custom-skill/scripts/main.ts

#!/usr/bin/env node

interface Options {
  option?: string;
  verbose?: boolean;
}

export async function main(options: Options = {}) {
  const { option, verbose = false } = options;

  if (verbose) {
    console.log('Running with options:', options);
  }

  // 实现你的 skill 逻辑
  console.log(`Custom skill running with option: ${option || 'default'}`);

  return {
    success: true,
    result: `Processed: ${option || 'default'}`
  };
}

// CLI 入口
if (require.main === module) {
  const args = process.argv.slice(2);
  const options: Options = {
    option: args[0],
    verbose: args.includes('--verbose')
  };

  main(options)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}
```

### 步骤 4: 创建测试文件（可选）

```typescript
// skills/my-custom-skill/scripts/main.test.ts

import { describe, it, expect } from 'bun:test';
import { main } from './main';

describe('My Custom Skill', () => {
  it('should run successfully', async () => {
    const result = await main({ option: 'test' });
    expect(result.success).toBe(true);
  });

  it('should handle default option', async () => {
    const result = await main({});
    expect(result.result).toContain('default');
  });
});
```

### 步骤 5: 创建提示词模板（可选）

```markdown
<!-- skills/my-custom-skill/prompts/template.md -->
---
name: task-template
description: Template for common tasks
---

请帮我完成以下任务：
- [ ] {{task1}}
- [ ] {{task2}}

注意事项：
{{notes}}
```

### 步骤 6: 添加参考文档（可选）

```markdown
<!-- skills/my-custom-skill/references/api-docs.md -->
# API 参考文档

详细的 API 使用说明...
```

## 注册 Skill

### 更新 marketplace.json

在 `.claude-plugin/marketplace.json` 中注册新 skill：

```json
{
  "name": "kunge2013-skills",
  "version": "1.0.0",
  "description": "Personal Claude Code skills hub",
  "author": "kunge2013",
  "skills": [
    {
      "name": "my-custom-skill",
      "path": "skills/my-custom-skill",
      "description": "Brief description of the skill",
      "version": "1.0.0",
      "category": "utility"
    }
  ]
}
```

### 验证 Skill

运行验证脚本确保 skill 配置正确：

```bash
npm run validate
```

## Skill 最佳实践

### 命名规范

- 使用 kebab-case: `my-custom-skill`
- 包含 `kunge2013-` 前缀（如果是官方 skill）
- 名字最大 64 个字符
- 使用描述性名称

### 文档规范

- 使用清晰的 Markdown 格式
- 提供使用示例
- 包含参数说明
- 添加错误处理说明

### 代码规范

- 使用 TypeScript 进行类型检查
- 保持代码简洁
- 添加适当的错误处理
- 编写测试用例

### 错误处理

```typescript
export async function main(options: Options = {}) {
  try {
    // 验证输入
    if (!options.required && options.required !== false) {
      throw new Error('Required option is missing');
    }

    // 执行逻辑
    const result = await process(options);

    return { success: true, result };
  } catch (error) {
    console.error('Error executing skill:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

## 测试 Skill

### 本地测试

```bash
# 直接运行
bun skills/my-custom-skill/scripts/main.ts --option test

# 或通过 npm
npm run test
```

### 在 Claude Code 中测试

```bash
# 启动 Claude Code
claude

# 在 Claude Code 中使用 skill
/my-custom-skill --option test
```

## 发布 Skill

### 版本控制

1. 更新 `SKILL.md` 中的版本号
2. 更新 `CHANGELOG.md`
3. 提交代码：
```bash
git add .
git commit -m "feat: add my-custom-skill v1.0.0"
git push
```

### 发布到 GitHub

```bash
# 打标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签
git push origin v1.0.0

# 或推送所有标签
git push --tags
```

### 发布到 npm（可选）

```bash
# 更新主版本
npm version major

# 发布
npm publish
```

## 高级功能

### 依赖其他 Skills

如果 skill 依赖其他 skills：

```typescript
import { executeSkill } from './utils/skill-helper';

export async function main(options: Options = {}) {
  const dependencyResult = await executeSkill('other-skill', {
    param: options.value
  });

  return { ... };
}
```

### 环境变量

```typescript
const apiKey = process.env.MY_SKILL_API_KEY;
if (!apiKey) {
  throw new Error('MY_SKILL_API_KEY environment variable is required');
}
```

### 配置文件

```typescript
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.env.HOME, '.kunge2013-skills', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
```

## 调试技巧

### 启用详细日志

```typescript
const DEBUG = process.env.DEBUG === 'true';

function debug(...args: any[]) {
  if (DEBUG) {
    console.log('[DEBUG]', ...args);
  }
}
```

### 错误追踪

```typescript
export async function main(options: Options = {}) {
  const startTime = Date.now();

  try {
    debug('Starting with options:', options);

    // ... 逻辑 ...

    debug(`Completed in ${Date.now() - startTime}ms`);
    return { success: true };
  } catch (error) {
    debug('Error:', error);
    throw error;
  }
}
```

## 示例 Skills

查看现有 skills 作为参考：

- `skills/example-skill/` - 基础 skill 示例
- `skills/advanced-skill/` - 高级功能示例

## 常见问题

### Q: Skill 无法加载？

A: 检查 `SKILL.md` 格式是否正确，确保 YAML 前置数据有效。

### Q: 如何调试 skill？

A: 启用 `DEBUG=true` 环境变量，或使用 `--verbose` 选项。

### Q: 可以使用外部库吗？

A: 可以，在 `scripts/` 目录中安装依赖，但建议保持依赖最少。

## 需要更多帮助？

- 查看 [Skills 参考手册](skills-reference.md)
- 检查 GitHub Issues
- 提交新的 Issue 或 Pull Request