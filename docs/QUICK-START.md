# 🎯 在 Claude Code 中使用 Skills - 快速开始

## ✅ 当前可用的 Skills

你的项目已经配置好了 2 个 skills：

1. **hello-world** - 简单的问候技能，适合测试和学习
2. **skill-creator** - 创建自定义 skills 的指南

## 🚀 立即开始使用

### 方式 1: 直接在对话中使用

在当前的 Claude Code 对话中，直接输入：

```bash
# 试试 hello-world skill
/hello-world

# 带参数使用
/hello-world --name "你的名字"
```

### 方式 2: 自然语言调用

直接告诉 Claude 你想做什么：

```
"请用 hello-world skill 向我打招呼"
"使用 skill-creator 帮我创建一个新 skill"
```

### 方式 3: 查看技能信息

```bash
# 查看所有可用技能
/skills

# 查看特定技能详情
/skills hello-world
```

## 📝 实际使用示例

### 基础示例

```bash
# 1. 简单问候
/hello-world

# 2. 自定义名字
/hello-world --name "张三"

# 3. 自定义问候语和名字
/hello-world --greeting "你好" --name "李四"

# 4. 详细模式
/hello-world --verbose
```

### 对话中的使用

```
"请用 hello-world skill 生成一个个性化的问候"
"我需要向客户打招呼，用 hello-world skill"
```

## 🔧 创建你的第一个 Skill

### 快速步骤

1. **复制 hello-world 作为模板**：
```bash
cp -r skills/hello-world skills/my-skill
```

2. **修改 SKILL.md**：
```bash
# 修改 name 和 description
vim skills/my-skill/SKILL.md
```

3. **同步到配置**：
```bash
npm run sync
```

4. **验证配置**：
```bash
npm run validate
```

5. **使用新 skill**：
```bash
/my-skill
```

## 📚 参考文档

- **[hello-world 文档](skills/hello-world/SKILL.md)** - 详细使用说明
- **[skill-creator 指南](skills/skill-creator/SKILL.md)** - 创建自定义技能的完整流程
- **[使用指南](docs/using-skills-in-claude-code.md)** - 在 Claude Code 中使用 skills 的详细说明
- **[创建指南](docs/creating-skills.md)** - 从零开始创建 skills
- **[快速开始](docs/QUICK-START.md)** - 快速参考

## 🎨 高级用法

### 组合使用

```bash
# 先用一个 skill 处理，再用另一个
/hello-world --name "用户A"
# 然后基于结果做其他处理
```

### 批量处理

```bash
# 处理多个名字
/hello-world --name "张三"
/hello-world --name "李四"
/hello-world --name "王五"
```

### 在工作流中使用

```bash
# 1. 生成内容
"请生成一段欢迎词"

# 2. 用 skill 处理
/hello-world --greeting "欢迎" --name "新用户"

# 3. 继续优化
"请优化这个问候语"
```

## ❓ 常见问题

### Q: 如何查看所有 skills？

```bash
/skills
# 或查看配置文件
cat .claude-plugin/marketplace.json
```

### Q: Skill 不起作用？

```bash
# 验证配置
npm run validate

# 检查文档
cat skills/hello-world/SKILL.md

# 使用详细模式
/hello-world --verbose
```

### Q: 如何调试？

```bash
# 启用调试模式
DEBUG=true /hello-world

# 使用 verbose 标志
/hello-world --verbose
```

### Q: 如何添加新 skill？

参考 [创建自定义 Skills 指南](docs/creating-skills.md) 或直接复制现有 skill 作为模板。

## 🎉 现在就开始吧！

在当前的 Claude Code 对话中试试：

```bash
/hello-world --name "你的名字"
```

或者直接说：

```
"请用 hello-world skill 向我打个招呼"
```

Claude 会自动识别并执行相应的 skill！🚀