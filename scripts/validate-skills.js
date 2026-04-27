#!/usr/bin/env node

/**
 * Validate Skills Script
 * 检查所有 skills 的配置和结构是否正确
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(process.cwd(), 'skills');
const MARKETPLACE_FILE = path.join(process.cwd(), '.claude-plugin', 'marketplace.json');

function validateSkillMD(filePath) {
  const errors = [];
  let content;

  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return {
      valid: false,
      errors: [`Cannot read SKILL.md: ${error.message}`]
    };
  }

  // 检查 YAML 前置数据
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    errors.push('Missing YAML front matter');
    return { valid: false, errors };
  }

  const frontMatter = frontMatterMatch[1];

  // 检查必需字段
  const requiredFields = ['name', 'description', 'version'];
  for (const field of requiredFields) {
    if (!frontMatter.includes(`${field}:`)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // 检查描述长度
  const descriptionMatch = frontMatter.match(/description:\s*(.+)/);
  if (descriptionMatch && descriptionMatch[1].length > 1024) {
    errors.push('Description exceeds 1024 characters');
  }

  // 检查文档长度
  const bodyContent = content.replace(frontMatterMatch[0], '');
  const lineCount = bodyContent.split('\n').length;
  if (lineCount > 500) {
    errors.push(`SKILL.md body exceeds 500 lines (current: ${lineCount})`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function validateSkillStructure(skillPath) {
  const errors = [];

  // 检查 SKILL.md
  const skillMdPath = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) {
    errors.push('Missing SKILL.md');
  } else {
    const validation = validateSkillMD(skillMdPath);
    if (!validation.valid) {
      errors.push(...validation.errors);
    }
  }

  // 可选目录检查
  const optionalDirs = ['scripts', 'prompts', 'references'];
  for (const dir of optionalDirs) {
    const dirPath = path.join(skillPath, dir);
    if (fs.existsSync(dirPath) && !fs.statSync(dirPath).isDirectory()) {
      errors.push(`${dir} exists but is not a directory`);
    }
  }

  // 检查 scripts 目录中的文件
  const scriptsDir = path.join(skillPath, 'scripts');
  if (fs.existsSync(scriptsDir)) {
    const files = fs.readdirSync(scriptsDir);
    if (files.includes('main.ts') || files.includes('main.js')) {
      // main 文件存在，检查是否可执行
      const mainFile = path.join(scriptsDir, files.includes('main.ts') ? 'main.ts' : 'main.js');
      try {
        fs.accessSync(mainFile, fs.constants.R_OK);
      } catch (error) {
        errors.push('main file is not readable');
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function validateMarketplace() {
  const errors = [];

  if (!fs.existsSync(MARKETPLACE_FILE)) {
    return {
      valid: false,
      errors: ['marketplace.json not found']
    };
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(MARKETPLACE_FILE, 'utf8'));
  } catch (error) {
    return {
      valid: false,
      errors: [`Cannot parse marketplace.json: ${error.message}`]
    };
  }

  // 检查必需字段
  if (!config.name || !config.version) {
    errors.push('Missing required fields in marketplace.json (name, version)');
  }

  // 检查 skills 数组
  if (!Array.isArray(config.skills)) {
    errors.push('skills must be an array');
  }

  // 验证每个 skill
  for (const skill of config.skills) {
    if (!skill.name || !skill.path) {
      errors.push(`Skill missing required fields (name, path): ${skill.name || 'unnamed'}`);
    }

    // 检查 skill 目录是否存在
    const skillPath = path.join(process.cwd(), skill.path);
    if (!fs.existsSync(skillPath)) {
      errors.push(`Skill directory does not exist: ${skill.path}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function main() {
  console.log('Validating Skills...\n');

  // 验证 marketplace.json
  console.log('📋 Validating marketplace.json...');
  const marketplaceResult = validateMarketplace();
  if (!marketplaceResult.valid) {
    console.error('❌ marketplace.json validation failed:');
    marketplaceResult.errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }
  console.log('✅ marketplace.json is valid\n');

  // 读取 marketplace 配置
  const config = JSON.parse(fs.readFileSync(MARKETPLACE_FILE, 'utf8'));

  // 验证每个 skill
  let totalErrors = 0;
  for (const skill of config.skills) {
    console.log(`🔍 Validating skill: ${skill.name}`);
    const skillPath = path.join(process.cwd(), skill.path);

    const result = validateSkillStructure(skillPath);
    if (!result.valid) {
      console.error(`❌ ${skill.name} validation failed:`);
      result.errors.forEach(error => console.error(`   - ${error}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ ${skill.name} is valid`);
    }
    console.log();
  }

  // 检查是否有未注册的 skills
  if (fs.existsSync(SKILLS_DIR)) {
    const allSkills = fs.readdirSync(SKILLS_DIR).filter(item => {
      const itemPath = path.join(SKILLS_DIR, item);
      return fs.statSync(itemPath).isDirectory() && fs.existsSync(path.join(itemPath, 'SKILL.md'));
    });

    const registeredSkills = config.skills.map(s => s.name);
    const unregisteredSkills = allSkills.filter(skillName => !registeredSkills.includes(skillName));

    if (unregisteredSkills.length > 0) {
      console.log('⚠️  Found unregistered skills:');
      unregisteredSkills.forEach(skill => console.log(`   - ${skill}`));
      console.log('  These skills are not in marketplace.json\n');
    }
  }

  if (totalErrors > 0) {
    console.error(`\n❌ Validation failed with ${totalErrors} error(s)`);
    process.exit(1);
  } else {
    console.log('✅ All validations passed!');
    process.exit(0);
  }
}

main();