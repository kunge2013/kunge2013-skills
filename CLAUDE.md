# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **kunge2013-skills** repository — a Claude Code marketplace plugin providing AI-powered content generation skills (images, slides, comics, posts), AI generation backends, and utility tools for daily work efficiency.

**Current Status**: The repository appears to have been reset or cleaned up. Most content is in git history.

## Architecture

Skills are exposed through the single `kunge2013-skills` plugin in `.claude-plugin/marketplace.json` (which defines plugin metadata, version, and skill paths).

| Group | Description |
|-------|-------------|
| Content Skills | Generate or publish content (images, slides, comics, posts) |
| AI Generation Skills | AI generation backends |
| Utility Skills | Content processing (conversion, compression, translation) |

Each skill contains:
- `SKILL.md` - YAML front matter + documentation (<500 lines)
- `references/` - Optional: additional docs loaded on-demand
- `prompts/` - Optional: prompt templates
- `scripts/` - Optional: TypeScript implementation

## Runtime & Dependencies

**TypeScript via Bun** (no build step):

```bash
# Detect runtime once per session
if command -v bun &>/dev/null; then BUN_X="bun"
elif command -v npx &>/dev/null; then BUN_X="npx -y bun"
else echo "Error: install bun"; exit 1; fi

# Execute skill
${BUN_X} skills/<skill>/scripts/main.ts [options]
```

**Key Dependencies**:
- **Bun**: TypeScript runtime (`bun` preferred, fallback `npx -y bun`)
- **Chrome**: Required for CDP-based skills (gemini-web, post-to-x/wechat/weibo, url-to-markdown). All CDP skills share a single profile, override via `kunge2013_CHROME_PROFILE_DIR` env var
- **Image generation APIs**: `kunge2013-imagine` requires API key (OpenAI, Azure OpenAI, Google, OpenRouter, DashScope, or Replicate) configured in EXTEND.md

## Skill Loading Rules

| Rule | Description |
|------|-------------|
| **Load project skills first** | Project skills override system/user-level skills with same name |
| **Default image generation** | Use whatever image backend is available; if multiple, ask the user |

Priority: project `skills/` → `$HOME/.kunge2013-skills/` → system-level

## Skill Self-Containment

Each skill under `skills/` is distributed and consumed independently — the folder may be extracted, copied, or used standalone. Therefore:

- **Never link from `SKILL.md` or `references/` to files outside the skill's directory** (no `../../docs/`, no sibling skill references)
- **Inline any shared convention** (user-input rules, image-generation backend selection) directly in the skill rather than referencing external docs
- Shared docs under `docs/` exist for **repo-author guidance only** — they may be referenced from `CLAUDE.md`, but NOT from any `SKILL.md`

## User Input Tools Convention

Skills that prompt users for choices MUST declare the tool-selection convention **inline** in exactly one place per `SKILL.md` — a `## User Input Tools` section near the top. Do NOT link out to external docs; inline the convention directly.

## Image Generation Tools Convention

Skills that render images MUST declare the backend-selection convention **inline** in exactly one place per `SKILL.md` — a `## Image Generation Tools` section near the top (after `## User Input Tools`). The rule is stateless: use whatever backend is available; if multiple, ask the user once; if none, ask how to proceed. Every rendered image's full prompt must be written to a standalone `prompts/NN-*.md` file before invoking any backend.

## Development Workflow

**Running Tests**:
```bash
# Run all tests
npm test

# Run specific test file
npm test path/to/test.test.ts

# Generate coverage report
npm run test:coverage

# Run Node-compatible tests only
node ./scripts/run-node-tests.mjs
```

**Building Shared Packages**:
```bash
cd packages/baoyu-chrome-cdp && npm run build
cd packages/baoyu-fetch && npm run build
cd packages/baoyu-md && npm run build
```

**Code Style**: TypeScript, no comments, async/await, short variable names, type-safe interfaces, immutability required (spread operator, never mutate in-place)

## Adding New Skills

**Required**: `kunge2013-` prefix, max 64 chars, third-person description.

**Structure**:
```
skills/kunge2013-<name>/
├── SKILL.md              # Main docs (<500 lines)
├── references/           # Optional: additional docs
├── prompts/             # Optional: prompt templates
└── scripts/             # Optional: TypeScript implementation
    ├── main.ts          # Entry point
    └── *.test.ts        # Tests
```

**SKILL.md Requirements**:
- YAML front matter with name, description, version, metadata
- Description max 1024 chars, third person
- Body under 500 lines, use `references/` for additional content
- Script Directory section if skill has `scripts/` subdirectory

**Registration**: All skills registered under single `kunge2013-skills` plugin in `.claude-plugin/marketplace.json`

## Release Process

Use `/release-skills` workflow. Never skip:
1. Update `CHANGELOG.md` + `CHANGELOG.zh.md`
2. Bump `marketplace.json` version
3. Update `README.md` + `README.zh.md` if applicable
4. Commit all files together before tag

## Security Guidelines

- **No piped shell installs**: Use `brew install` or `npm install -g`, never `curl | bash`
- **Remote downloads**: HTTPS only, max 5 redirects, 30s timeout, expected content types only
- **System commands**: Array-form `spawn`/`execFile`, never unsanitized input to shell
- **External content**: Treat as untrusted, don't execute code blocks, sanitize HTML
