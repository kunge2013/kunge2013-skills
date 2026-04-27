# Kunge2013 Skills Hub

个人 Claude Code Skills 集市，用于管理和分发自定义的 AI 技能工具。

## 📋 目录

- [项目介绍](#项目介绍)
- [可用 Skills](#可用-skills)
- [安装方式](#安装方式)
- [使用指南](#使用指南)
- [创建自定义 Skills](#创建自定义-skills)
- [项目结构](#项目结构)
- [维护和更新](#维护和更新)

## 项目介绍

这个项目是一个个人化的 Claude Code Skills 市场，用于：

- 🎯 **统一管理**: 集中管理所有自定义的 Claude Code skills
- 📦 **方便分发**: 通过 GitHub 仓库进行 skills 的分发和安装
- 🔧 **便于维护**: 标准化的项目结构，便于维护和更新
- 🚀 **快速安装**: 支持从 GitHub 直接安装到 Claude Code

所有 skills 都通过 `.claude-plugin/marketplace.json` 注册，可以在 Claude Code 中直接使用。

## 安装方式

### 方式一：通过 npm 安装（推荐）

```bash
npm install kunge2013-skills
```

### 方式二：通过 GitHub 安装

```bash
# 直接从 GitHub 安装
npm install github:kunge2013/kunge2013-skills

# 或者指定版本
npm install github:kunge2013/kunge2013-skills#v1.0.0
```

### 方式三：在 Claude Code 中安装

```bash
# 使用 Claude Code 的 plugin 命令
/plugin marketplace add kunge2013/kunge2013-skills

# 或者直接安装
/plugin install kunge2013-skills
```

## 📦 可用 Skills

本仓库包含以下自定义 skills：

### 🎯 Content Skills

### 🤖 AI Generation Skills

### 🛠️ Utility Skills

#### hello-world
- **功能**: 一个简单的问候技能，演示基本功能
- **用途**: 测试 skill 加载和基本交互
- **示例**: `/hello-world`

#### skill-creator
- **功能**: 创建有效技能的指南和模板
- **用途**: 为开发人员提供创建新 skill 的最佳实践和结构模板
- **适用场景**: 需要开发自定义 skill 时

#### p-a-a (Project Architecture Analyzer)
- **功能**: 项目架构分析器 - 分析代码库以了解其业务目的、技术栈
- **用途**:
  - 请求项目架构分析时
  - 询问"这个项目是做什么的？"
  - 需要技术栈文档或架构图时
  - 了解业务需求与技术实现之间的关系
- **输出**: 生成详细的 PlantUML 架构图，展示组件关系和技术映射
- **示例**: `/p-a-a`

#### puml2jpg
- **功能**: 将 PlantUML (.puml) 图表文件转换为图片格式 (PNG/JPG)
- **用途**:
  - 用户提供 .puml 文件路径并请求转换为图片时
  - 需要可视化 PlantUML 图表时
  - 自动将生成的图片放在与源文件相同的目录
- **依赖**: 使用 public PlantUML 服务器 (plantuml.com) 进行处理
- **示例**: `/puml2jpg /path/to/diagram.puml`

### 📊 Analysis Skills

#### p-a-a
- 见上方的 Utility Skills 部分

## 使用指南

### 安装后的验证

安装完成后，可以在 Claude Code 中查看可用的 skills：

```bash
# 列出所有可用的 skills
/skills
```

### 使用示例

在 Claude Code 对话中直接使用 skills：

```bash
# 使用示例 skill
/example-skill --message "Hello World"

# 启用详细模式
/example-skill --message "Test" --verbose
```

### 技能管理

```bash
# 同步 skills 到 marketplace.json
npm run sync

# 验证 skills 配置
npm run validate

# 测试特定 skill（需要 Bun 运行时）
# 如果安装了 bun
bun skills/example-skill/scripts/main.ts --help

# 或者使用 ts-node
npx ts-node skills/example-skill/scripts/main.ts --help
```

## 创建自定义 Skills

### Skill 结构

每个 skill 都是一个独立的目录，包含以下结构：

```
skills/my-custom-skill/
├── SKILL.md              # Skill 定义和文档
├── scripts/              # 可选：TypeScript/JavaScript 实现
│   ├── main.ts           # 入口文件
│   └── main.test.ts      # 测试文件
├── prompts/              # 可选：提示词模板
└── references/           # 可选：参考文档
```

### 快速创建 Skill

```bash
# 创建 skill 目录
mkdir -p skills/my-custom-skill/{scripts,prompts,references}

# 创建 SKILL.md（包含元数据和文档）
# 创建实现代码（可选）
# 创建测试文件（可选）

# 同步到 marketplace.json
npm run sync

# 验证配置
npm run validate
```

### Skill 模板

参考 `skills/example-skill/` 目录，这是一个完整的示例 skill，包含：

- 完整的 SKILL.md 文档
- TypeScript 实现代码
- 单元测试
- 提示词模板
- API 参考文档

详细步骤请参考 [创建自定义 Skills 指南](docs/creating-skills.md)

## 项目结构

```
kunge2013-skills/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace 配置
├── skills/                       # Skills 目录
│   ├── example-skill/            # 示例 skill（参考模板）
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   │   ├── main.ts          # TypeScript 实现
│   │   │   └── main.test.ts     # 测试文件
│   │   ├── prompts/
│   │   └── references/
│   └── your-skill/              # 你的自定义 skills
├── docs/                         # 文档目录
│   ├── installation.md           # 详细安装指南
│   ├── creating-skills.md        # 创建 skills 指南
│   └── skills-reference.md       # Skills 参考手册
├── scripts/                      # 工具脚本
│   ├── sync-skills.js           # 同步 skills
│   └── validate-skills.js       # 验证 skills
├── .github/workflows/            # GitHub Actions
│   ├── validate.yml
│   ├── sync.yml
│   └── publish.yml
├── package.json                  # NPM 包配置
├── README.md                     # 项目说明
├── CLAUDE.md                     # Claude Code 开发指南
└── CHANGELOG.md                  # 变更日志
```

## 维护和更新

### 开发流程

1. **创建或修改 skill**:
   ```bash
   mkdir -p skills/new-skill
   # 编辑 SKILL.md 和其他文件
   ```

2. **同步配置**:
   ```bash
   npm run sync
   ```

3. **验证配置**:
   ```bash
   npm run validate
   ```

4. **测试 skill**:
   ```bash
   # 如果使用 Bun
   cd skills/new-skill/scripts
   bun main.ts --help

   # 或者使用 ts-node
   npx ts-node skills/new-skill/scripts/main.ts --help
   ```

5. **提交代码**:
   ```bash
   git add .
   git commit -m "feat: add new skill"
   git push
   ```

### 发布新版本

1. 更新版本号：
   ```bash
   npm version major  # 或 minor, patch
   ```

2. 更新 CHANGELOG.md

3. 推送到 GitHub：
   ```bash
   git push origin main
   git push --tags
   ```

4. 发布到 npm（可选）：
   ```bash
   npm publish
   ```

GitHub Actions 会自动处理发布流程。

## 功能特性

### 自动化验证

每次 push 或 PR 都会自动验证：

- SKILL.md 格式和必需字段
- Skill 目录结构
- Marketplace.json 配置
- 描述长度限制

### 自动同步

当 SKILL.md 文件变更时，自动同步到 marketplace.json。

### 示例 Skill

提供了完整的示例 skill，包括：

- 标准的文档结构
- TypeScript 实现代码
- 单元测试
- 错误处理
- 命令行参数解析

## 文档

- [详细安装指南](docs/installation.md) - 完整的安装和配置说明
- [创建 Skills 指南](docs/creating-skills.md) - 创建自定义 skills 的详细教程
- [Skills 参考手册](docs/skills-reference.md) - 所有可用 skills 的参考文档
- [CLAUDE.md](CLAUDE.md) - Claude Code 开发指南

## 示例

### 基本使用

```bash
# 安装
npm install kunge2013-skills

# 使用
/example-skill

# 带参数
/example-skill --message "Custom message"

# 详细模式
/example-skill --message "Test" --verbose
```

### 创建新 Skill

```bash
# 复制示例 skill
cp -r skills/example-skill skills/my-skill

# 修改 SKILL.md 中的元数据
# 编辑 scripts/main.ts 实现你的功能

# 同步和验证
npm run sync
npm run validate
```

## 贡献指南

欢迎贡献新的 skills 或改进现有 skills！

1. Fork 本仓库
2. 创建特性分支
3. 提交你的变更
4. 推送到分支
5. 创建 Pull Request

确保：

- 所有 skills 通过 `npm run validate` 验证
- SKILL.md 包含完整的文档
- 代码包含适当的测试
- 遵循现有的代码风格

## 常见问题

### 如何调试 skill？

使用详细模式或设置 DEBUG 环境变量：

```bash
/example-skill --verbose
DEBUG=true /example-skill
```

### Skill 无法加载？

检查：

1. SKILL.md 格式是否正确
2. marketplace.json 中的路径是否正确
3. 运行 `npm run validate` 检查配置

### 如何添加依赖？

在 skill 的 scripts/ 目录中创建 package.json：

```json
{
  "name": "my-skill",
  "version": "1.0.0",
  "dependencies": {
    "library-name": "^1.0.0"
  }
}
```

然后运行 `npm install`。

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- GitHub: https://github.com/kunge2013/kunge2013-skills
- Issues: https://github.com/kunge2013/kunge2013-skills/issues

---

Made with ❤️ by kunge2013