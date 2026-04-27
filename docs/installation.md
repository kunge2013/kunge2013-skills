# 详细安装指南

本文档提供 Kunge2013 Skills Hub 的详细安装说明。

## 系统要求

- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0
- Claude Code 已安装并配置

## 安装方法

### 方法一：通过 npm 安装

这是最简单和推荐的安装方式：

```bash
npm install kunge2013-skills
```

安装后，skills 会被放置在 `node_modules/kunge2013-skills/` 目录下。

#### 开发环境安装

如果你想在开发环境中使用：

```bash
# 克隆仓库
git clone https://github.com/kunge2013/kunge2013-skills.git
cd kunge2013-skills

# 安装依赖
npm install

# 链接到本地环境（可选）
npm link
```

### 方法二：通过 GitHub 直接安装

直接从 GitHub 仓库安装，不需要发布到 npm：

```bash
# 安装最新版本
npm install github:kunge2013/kunge2013-skills

# 安装特定版本
npm install github:kunge2013/kunge2013-skills#v1.0.0

# 安装特定分支
npm install github:kunge2013/kunge2013-skills#main
```

### 方法三：通过 Claude Code 安装

使用 Claude Code 内置的插件管理功能：

```bash
# 添加 marketplace
/plugin marketplace add kunge2013/kunge2013-skills

# 浏览并安装插件
/plugin marketplace browse kunge2013-skills

# 或者直接安装
/plugin install kunge2013-skills
```

## 安装验证

### 验证安装

安装完成后，验证 skills 是否正确安装：

```bash
# 在 Claude Code 中
/skills

# 或者检查文件系统
ls -la node_modules/kunge2013-skills/skills/
```

### 测试 Skill

测试一个具体的 skill：

```bash
# 假设有一个 test-skill
/test-skill --help
```

## 配置环境

### 环境变量配置

某些 skills 可能需要环境变量配置。创建 `.env` 文件：

```bash
# 在项目根目录创建 .env
cat > .env << EOF
# 示例环境变量
OPENAI_API_KEY=your_api_key_here
CUSTOM_CONFIG=value
EOF
```

### 配置文件位置

Skills 的配置文件通常位于：

- 全局配置: `$HOME/.kunge2013-skills/config.json`
- 项目配置: `.kunge2013-skills/config.json`
- 环境配置: `.env`

## 更新 Skills

### 更新到最新版本

```bash
# 如果通过 npm 安装
npm update kunge2013-skills

# 如果通过 GitHub 安装
npm install github:kunge2013/kunge2013-skills#main
```

### 查看更新日志

```bash
# 查看最新变更
npm view kunge2013-skills changelog

# 或者查看 CHANGELOG.md
cat CHANGELOG.md
```

## 卸载

### 完全卸载

```bash
# 通过 npm
npm uninstall kunge2013-skills

# 删除配置文件（可选）
rm -rf $HOME/.kunge2013-skills
```

### 清理缓存

```bash
# 清理 npm 缓存
npm cache clean --force

# 或者清理特定包
npm cache clean kunge2013-skills
```

## 常见问题

### 问题 1: 安装失败

```bash
# 清理 npm 缓存
npm cache clean --force

# 重新安装
npm install kunge2013-skills
```

### 问题 2: 找不到 Skills

检查 `.claude-plugin/marketplace.json` 是否存在并包含正确的 skills 配置：

```bash
cat node_modules/kunge2013-skills/.claude-plugin/marketplace.json
```

### 问题 3: 权限问题

如果遇到权限问题，使用 `sudo`（不推荐）或修复 npm 权限：

```bash
# 修复 npm 权限（推荐）
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### 问题 4: 网络问题

如果网络连接问题导致安装失败，使用国内镜像：

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 或者临时使用
npm install kunge2013-skills --registry=https://registry.npmmirror.com
```

## 开发者模式

### 本地开发和测试

1. 克隆仓库：
```bash
git clone https://github.com/kunge2013/kunge2013-skills.git
cd kunge2013-skills
```

2. 安装依赖：
```bash
npm install
```

3. 创建测试 skill：
```bash
mkdir -p skills/test-skill
# 创建 SKILL.md 等文件
```

4. 验证：
```bash
npm run validate
```

### 调试安装

如果需要调试安装过程：

```bash
# 详细安装输出
npm install kunge2013-skills --verbose

# 查看安装路径
npm root -g
npm list kunge2013-skills
```

## 下一步

安装完成后，查看以下文档以开始使用：

- [创建自定义 Skills](creating-skills.md)
- [Skills 参考手册](skills-reference.md)
- [开发指南](../CLAUDE.md)

## 需要帮助？

如果遇到问题：

1. 查看 [常见问题](#常见问题) 部分
2. 检查 GitHub Issues: https://github.com/kunge2013/kunge2013-skills/issues
3. 提交新的 Issue 或 Pull Request