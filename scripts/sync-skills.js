#!/usr/bin/env node

/**
 * Sync Skills Script
 * 同步 skills 到 marketplace.json
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(process.cwd(), 'skills');
const MARKETPLACE_FILE = path.join(process.cwd(), '.claude-plugin', 'marketplace.json');

function parseSkillMD(skillPath) {
  const skillMdPath = path.join(skillPath, 'SKILL.md');

  if (!fs.existsSync(skillMdPath)) {
    return null;
  }

  const content = fs.readFileSync(skillMdPath, 'utf8');
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontMatterMatch) {
    return null;
  }

  const frontMatter = frontMatterMatch[1];

  // 解析 YAML 前置数据
  const skillInfo = {};

  const nameMatch = frontMatter.match(/name:\s*(.+)/);
  const descMatch = frontMatter.match(/description:\s*(.+)/);
  const versionMatch = frontMatter.match(/version:\s*(.+)/);
  const categoryMatch = frontMatter.match(/category:\s*(.+)/);

  if (nameMatch) skillInfo.name = nameMatch[1].trim();
  if (descMatch) skillInfo.description = descMatch[1].trim();
  if (versionMatch) skillInfo.version = versionMatch[1].trim();
  if (categoryMatch) skillInfo.category = categoryMatch[1].trim();

  if (!skillInfo.name || !skillInfo.description || !skillInfo.version) {
    return null;
  }

  const skillName = skillInfo.name;
  const relativePath = `skills/${path.basename(skillPath)}`;

  return {
    name: skillName,
    path: relativePath,
    description: skillInfo.description,
    version: skillInfo.version,
    category: skillInfo.category
  };
}

function syncSkills() {
  console.log('Syncing skills to marketplace.json...\n');

  // 读取现有配置
  let config;
  try {
    config = JSON.parse(fs.readFileSync(MARKETPLACE_FILE, 'utf8'));
  } catch (error) {
    console.error('Cannot read marketplace.json:', error);
    process.exit(1);
  }

  // 扫描 skills 目录
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log('Skills directory does not exist. Creating...');
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
  }

  const directories = fs.readdirSync(SKILLS_DIR).filter(item => {
    const itemPath = path.join(SKILLS_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });

  // 收集所有 skills
  const newSkills = [];
  const existingSkillNames = new Set(config.skills.map(s => s.name));

  for (const dir of directories) {
    const skillPath = path.join(SKILLS_DIR, dir);
    const skillInfo = parseSkillMD(skillPath);

    if (skillInfo) {
      if (!existingSkillNames.has(skillInfo.name)) {
        console.log(`🆕 Found new skill: ${skillInfo.name}`);
        newSkills.push(skillInfo);
      }
    }
  }

  // 检查已删除的 skills
  const currentSkillNames = new Set(
    directories
      .map(dir => {
        const skillPath = path.join(SKILLS_DIR, dir);
        const skillInfo = parseSkillMD(skillPath);
        return skillInfo ? skillInfo.name : null;
      })
      .filter(Boolean)
  );

  const removedSkills = config.skills.filter(skill => !currentSkillNames.has(skill.name));
  if (removedSkills.length > 0) {
    console.log('\n🗑️  Removing deleted skills from marketplace.json:');
    removedSkills.forEach(skill => console.log(`   - ${skill.name}`));
  }

  // 更新配置
  config.skills = config.skills.filter(skill => currentSkillNames.has(skill.name));
  config.skills.push(...newSkills);

  // 写回配置文件
  fs.writeFileSync(MARKETPLACE_FILE, JSON.stringify(config, null, 2));

  console.log(`\n✅ Synced ${config.skills.length} skill(s) to marketplace.json`);

  if (newSkills.length > 0) {
    console.log('\n📝 Don\'t forget to update marketplace.json version if needed!');
  }
}

function main() {
  try {
    syncSkills();
    process.exit(0);
  } catch (error) {
    console.error('Error syncing skills:', error);
    process.exit(1);
  }
}

main();