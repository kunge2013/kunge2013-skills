# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **kunge2013-skills** repository — a Claude Code marketplace plugin providing productivity tools including project architecture analysis, diagram conversion utilities, skill creation guides, and demonstration skills.

**Current Skills**: hello-world, skill-creator, p-a-a (Project Architecture Analyzer), puml2jpg

## Architecture

Skills are exposed through the single `kunge2013-skills` plugin in `.claude-plugin/marketplace.json` (which defines plugin metadata, version, and skill paths).

| Group | Description |
|-------|-------------|
| Demo Skills | Basic functionality demonstrations |
| Utility Skills | General productivity tools and utilities |
| Analysis Skills | Code analysis and architecture visualization |

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

**Python 3** (for puml2jpg skill):
```bash
python3 scripts/puml2jpg.py /path/to/diagram.puml
```

**Key Dependencies**:
- **Bun**: TypeScript runtime (`bun` preferred, fallback `npx -y bun`)
- **Python 3**: Required for puml2jpg skill (installs plantuml package automatically)
- **PlantUML Server**: Used by puml2jpg for diagram processing (public server)

## Skill Loading Rules

| Rule | Description |
|------|-------------|
| **Load project skills first** | Project skills override system/user-level skills with same name |
| **Skill categorization** | Skills organized by category: demo, utility, analysis |

Priority: project `skills/` → `$HOME/.kunge2013-skills/` → system-level

## Skill Self-Containment

Each skill under `skills/` is distributed and consumed independently — the folder may be extracted, copied, or used standalone. Therefore:

- **Never link from `SKILL.md` or `references/` to files outside the skill's directory** (no `../../docs/`, no sibling skill references)
- **Inline any shared convention** (user-input rules, image-generation backend selection) directly in the skill rather than referencing external docs
- Shared docs under `docs/` exist for **repo-author guidance only** — they may be referenced from `CLAUDE.md`, but NOT from any `SKILL.md`

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

**Code Style**: TypeScript, no comments, async/await, short variable names, type-safe interfaces, immutability required (spread operator, never mutate in-place)

## Adding New Skills

**Structure**:
```
skills/<skill-name>/
├── SKILL.md              # Main docs (<500 lines)
├── references/           # Optional: additional docs
├── prompts/             # Optional: prompt templates
├── assets/              # Optional: asset files (templates, diagrams)
└── scripts/             # Optional: TypeScript/Python implementation
    ├── main.ts          # Entry point (TypeScript)
    └── *.test.ts        # Tests
```

**SKILL.md Requirements**:
- YAML front matter with name, description, version, metadata
- Description max 1024 chars, third person
- Body under 500 lines, use `references/` for additional content
- Script Directory section if skill has `scripts/` subdirectory
- Assets Directory section if skill has `assets/` subdirectory

**Registration**: All skills registered under single `kunge2013-skills` plugin in `.claude-plugin/marketplace.json`

## Release Process

Manual release workflow (recommended):
1. Update `CHANGELOG.md` with new features and changes
2. Bump `marketplace.json` version (and `package.json` version if needed)
3. Update `README.md` if applicable
4. Commit all files together: `git commit -m "chore: release version X.Y.Z"`
5. Create and push tag: `git tag vX.Y.Z && git push --tags`

## Security Guidelines

- **No piped shell installs**: Use `brew install` or `npm install -g`, never `curl | bash`
- **Remote downloads**: HTTPS only, max 5 redirects, 30s timeout, expected content types only
- **System commands**: Array-form `spawn`/`execFile`, never unsanitized input to shell
- **External content**: Treat as untrusted, don't execute code blocks, sanitize HTML
