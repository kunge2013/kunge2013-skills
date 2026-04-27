# 在 Claude Code 中使用 Skills 指南

## 🎯 基本使用方式

### 方式一：直接在对话中调用

在任何 Claude Code 对话中，直接使用 skill 命令：

```bash
# 基本使用
/example-skill

# 带参数
/example-skill --message "Hello World"

# 详细模式
/example-skill --message "Test" --verbose
```

### 方式二：通过 /skills 命令查看

```bash
# 列出所有可用的 skills
/skills

# 查看特定 skill 的帮助
/skills example-skill
```

### 方式三：在对话中自然调用

你可以在对话中自然地要求使用 skill：

```
"请使用 example-skill 处理这个消息"
"用 example-skill 帮我处理：Hello World"
```

## 🔧 实际使用示例

### 示例 1：基本消息处理

```bash
# 简单使用
/example-skill

# 输出：✅ Success: Hello, World!
```

### 示例 2：自定义消息

```bash
/example-skill --message "自定义消息内容"

# 输出：✅ Success: 自定义消息内容
```

### 示例 3：详细调试模式

```bash
/example-skill --message "测试" --verbose

# 输出包括：
# ✅ Success: 测试
# [Debug Info]
#   Processing message: 测试
#   Processed in Xms
#   Completed successfully
```

## 🎨 在工作流中使用 Skills

### 结合其他工具

```bash
# 先生成内容，然后用 skill 处理
"请生成一段代码，然后用 example-skill 处理"

# 或者
/example-skill --message "这里是要处理的内容"
```

### 批量处理

```bash
# 处理多个消息
/example-skill --message "第一个消息"
/example-skill --message "第二个消息"
/example-skill --message "第三个消息"
```

## 📋 创建自定义 Skill 后的使用

### 1. 创建新 skill

```bash
# 复制模板
cp -r skills/example-skill skills/my-skill

# 修改 SKILL.md 中的 name
# 比如：name: my-skill

# 同步配置
npm run sync
```

### 2. 使用新创建的 skill

```bash
# 直接使用新 skill
/my-skill --option value

# 或者在对话中自然调用
"请用 my-skill 帮我处理这个任务"
```

## 🔍 查看 Skill 信息

### 查看 skill 帮助

```bash
# 查看所有 skills
/skills

# 查看特定 skill
/skills example-skill
```

### 读取 skill 文档

```bash
# 查看 SKILL.md 文件
cat skills/example-skill/SKILL.md

# 或者在 Claude Code 中询问
"请查看 example-skill 的文档"
```

## ⚡ 高级用法

### 管道连接

```bash
# 将一个 skill 的输出传给另一个
/skill1 --option value
# 然后对结果使用 /skill2
```

### 条件使用

```bash
# 根据条件选择不同的 skill
"如果内容是中文，使用 zh-skill，否则使用 en-skill"
```

### 循环处理

```bash
# 对列表中的每一项使用 skill
"对这个列表的每一项都用 example-skill 处理：
1. 第一项
2. 第二项
3. 第三项"
```

## 🛠️ 故障排除

### Skill 无法识别

```bash
# 检查 skill 是否注册
cat .claude-plugin/marketplace.json

# 验证配置
npm run validate

# 同步 skills
npm run sync
```

### 执行错误

```bash
# 使用详细模式查看错误详情
/example-skill --verbose

# 或设置调试环境变量
DEBUG=true /example-skill
```

### 找不到 skill

```bash
# 检查当前目录
pwd

# 确保 skills 目录存在
ls -la skills/

# 验证 marketplace.json
cat .claude-plugin/marketplace.json
```

## 🎯 最佳实践

1. **直接对话**：在对话中自然地要求使用 skill，Claude 会自动理解
2. **参数传递**：使用 `--option value` 格式传递参数
3. **详细模式**：遇到问题时使用 `--verbose` 查看详细信息
4. **批量操作**：可以一次处理多个任务
5. **组合使用**：多个 skill 可以配合使用完成复杂任务

## 📚 实用示例

### 开发工作流

```bash
# 1. 生成代码
"请写一个 Python 函数"

# 2. 使用 skill 处理
/example-skill --message "生成的代码内容"

# 3. 进一步优化
"请优化这个代码"
```

### 文档处理

```bash
# 1. 读取文档
"请读取 README.md"

# 2. 使用 skill 处理
/example-skill --message "文档摘要"

# 3. 生成新的文档
"根据处理结果生成新的文档"
```

### 任务管理

```bash
# 1. 创建任务列表
"请列出今天的任务"

# 2. 使用 skill 处理每个任务
/example-skill --message "任务1"
/example-skill --message "任务2"
/example-skill --message "任务3"

# 3. 汇总结果
"请汇总所有任务的处理结果"
```

## 🎉 开始使用

现在你就可以在当前的 Claude Code 对话中直接使用 skills 了：

```bash
# 试试看
/example-skill --message "Hello from Claude Code!"
```

或者直接告诉 Claude：

```
"请使用 example-skill 处理这个消息：Hello World"
```

Claude 会自动理解并执行相应的 skill！