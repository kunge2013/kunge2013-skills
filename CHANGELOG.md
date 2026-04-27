# Changelog

English | [中文](./CHANGELOG.zh.md)

## 1.113.0 - 2026-04-25

### Features
- `kunge2013-imagine`: add DashScope Wan 2.7 image model support (`wan2.7-image-pro` and `wan2.7-image`) directly through the official Aliyun (Bailian) API. Supports text-to-image, image editing, and multi-image fusion with up to 9 reference images, with documented `[1:8, 8:1]` aspect ratio validation and per-mode pixel-budget rules. Forces `parameters.n: 1` to match kunge2013-imagine's single-image save semantics and explicitly rejects `--n > 1` to prevent silent multi-image billing (the API defaults to `n=4` in non-collage mode). Allows `--provider dashscope --ref ...` opt-in for Wan 2.7 reference workflows.

## 1.112.0 - 2026-04-24

### Features
- `kunge2013-article-illustrator`: make `hand-drawn-edu` (infographic + sketch-notes + macaron) the universal fallback preset when content analysis surfaces no strong signal — warm cream paper, black hand-drawn lines, soft pastel section blocks. Elevate `sketch-notes` to primary style across infographic / flowchart / comparison / framework auto-selection; rewrite the sketch-notes style spec (macaron palette, canonical single-page layout, diagram-only rule); add matching prompt block and workflow defaults.
- `kunge2013-article-illustrator`: add `hand-drawn-edu-flow` (flowchart) and `hand-drawn-edu-compare` (comparison) presets for the same warm educational style.

### Breaking Changes
- `kunge2013-article-illustrator`: `hand-drawn-edu` preset now maps to `infographic` instead of `flowchart`. Users relying on the previous flowchart behavior should switch to the new `hand-drawn-edu-flow` preset.

### Fixes
- `kunge2013-post-to-x`: add entry point guard to `scripts/md-to-html.ts` so that importing `parseMarkdown` from `x-article.ts` no longer triggers the CLI entry point. Mirrors the same fix applied to `kunge2013-post-to-weibo`.

## 1.111.1 - 2026-04-21

### Documentation
- Add a top-level `## Confirmation Policy` section to every image-generating skill (`kunge2013-infographic`, `kunge2013-cover-image`, `kunge2013-slide-deck`, `kunge2013-image-cards`, `kunge2013-xhs-images`, `kunge2013-article-illustrator`) as a single source of truth: explicit skill invocation, keyword shortcuts, EXTEND.md defaults, and auto-recommendations are recommendation inputs only — they never authorize skipping the confirmation step. Opt-out requires an explicit current-request signal (`--no-confirm` / `--quick` / `--yes` / "直接生成" / equivalent).
- `kunge2013-infographic`: consolidate the scattered reminders (previously repeated across Step 5, Step 6, Default combination, Keyword Shortcuts, and the preferences docs) into a single policy section referenced from Step 4's hard gate.

## 1.111.0 - 2026-04-21

### Refactor
- Unify image-backend resolution across all image-consuming skills (`kunge2013-infographic`, `kunge2013-comic`, `kunge2013-cover-image`, `kunge2013-image-cards`, `kunge2013-article-illustrator`, `kunge2013-slide-deck`, `kunge2013-xhs-images`): add a single `preferred_image_backend` preference field (`auto | ask | <backend-id>`) and replace the stateless ask-once rule with a 4-step resolution (current-request override → saved preference → auto-select → ask). Runtime-native tools (Codex `imagegen`, Hermes `image_generate`) are preferred by default; existing `EXTEND.md` files without the field are treated as `auto` with no schema bump.
- Add a top-level `## Changing Preferences` section to each image-consuming skill as a first-class surface for pinning the backend and editing common one-line preferences.

## 1.110.0 - 2026-04-21

### Features
- `kunge2013-imagine`: add `gpt-image-2` support for OpenAI image generation and edits, make it the default OpenAI model, and document the official size/quality mapping, custom-size constraints, and Azure deployment guidance

## 1.109.0 - 2026-04-21

### Features
- `kunge2013-url-to-markdown`: vendor the `kunge2013-fetch` runtime into `scripts/lib` and run it through a local `scripts/kunge2013-fetch` CLI so published skill installs are self-contained

### Fixes
- `kunge2013-fetch`: extract playable X/Twitter video MP4 variants for single posts and X Articles, choosing the highest-bitrate MP4 and rendering article videos as `[video](...)`
- `sync-clawhub`: publish from the shared release file list so extensionless CLI entrypoints, `bun.lock`, and vendored `scripts/lib` files are uploaded

### Maintenance
- Upgrade `defuddle` to 0.17.0 and `jsdom` to 29.0.2; override `@xmldom/xmldom` to 0.8.13 to keep the Defuddle dependency chain vulnerability-free

## 1.108.0 - 2026-04-19

### Refactor
- Refactor skills into focused reference files for better maintainability
- Use npm packages for shared skill code across skills

## 1.107.0 - 2026-04-15

### Features
- `kunge2013-diagram`: add SVG-to-PNG @2x conversion script — auto-converts generated SVG diagrams to @2x PNG using Sharp; consolidate reference files and add `{baseDir}` path resolution for portable skill loading

### Fixes
- `claude-plugin`: allow inline marketplace manifest (#130)

## 1.106.0 - 2026-04-14

### Features
- `kunge2013-diagram`: add architecture enrichment rules — automatically expand architecture diagrams with multiple client types, per-service tech stacks, database tiers, message buses, and color-coded categories; add full structural layout patterns, architecture-specific pitfalls, network topology templates, and layout math for complex diagrams

## 1.105.0 - 2026-04-13

### Features
- `kunge2013-diagram`: unify to analyze→confirm→generate workflow — remove single/multi mode split; skill now analyzes any input material, recommends diagram types and splitting strategy, confirms once, then generates all diagrams

## 1.104.0 - 2026-04-13

### Features
- `kunge2013-diagram`: add Mermaid sketch step (6d-0) before SVG generation — write a Mermaid code block as structural intent; add Mermaid–SVG consistency check in step 6f

### Fixes
- `kunge2013-post-to-wechat`: verify editor focus before paste and type operations to prevent silent paste failures

## 1.103.1 - 2026-04-13

### Fixes
- `kunge2013-markdown-to-html`: decode HTML entities and strip tags from article summary
- `kunge2013-post-to-weibo`: decode HTML entities and strip tags from article summary

## 1.103.0 - 2026-04-12

### Features
- `kunge2013-diagram`: add multi-diagram mode — analyze article content and generate multiple diagrams at identified positions; new `--density` option (`minimal`, `balanced`, `per-section`, `rich`) and `--mode` option (`single`, `multi`, `auto`); auto-detects mode from input (file path → multi, short topic → single); inserts diagram image links into article; output structure `diagram/{article-slug}/NN-{type}-{slug}/`

### Fixes
- `kunge2013-article-illustrator`: prevent color names and hex codes from appearing as visible text in generated images — add semantic constraint to all palette references and prompt construction rules
- `kunge2013-cover-image`: prevent color names and hex codes from appearing as visible text in generated images — add constraint to all palette references and prompt template
- `kunge2013-image-cards`: prevent color names from appearing as visible text in generated images
- `kunge2013-post-to-wechat`: decode HTML entities and strip HTML tags from article summary before using as WeChat article digest

## 1.102.0 - 2026-04-12

### Features
- `kunge2013-imagine`: add OpenAI-compatible image API dialect — new `--imageApiDialect` flag, `OPENAI_IMAGE_API_DIALECT` env var, and `default_image_api_dialect` config for gateways that expect aspect-ratio `size` plus `metadata.resolution` instead of pixel `size`

## 1.101.0 - 2026-04-12

### Features
- `kunge2013-imagine`: improve Replicate provider compatibility — route models through family-specific input builders and validators (nano-banana, Seedream 4.5, Seedream 5 Lite, Wan 2.7 Image); update default model to `google/nano-banana-2`; fix Seedream 4.5 custom size encoding to use width/height schema; fix aspect-ratio default inheritance for unsupported Replicate models; block multi-output requests before they reach the API (by @justnode)

## 1.100.0 - 2026-04-12

### Features
- `kunge2013-imagine`: add Z.AI GLM-Image provider — supports `glm-image` and `cogview-4-250304` models via the Z.AI sync image API; configure with `ZAI_API_KEY` (or `BIGMODEL_API_KEY` for backward compatibility)

## 1.99.1 - 2026-04-11

### Fixes
- `kunge2013-article-illustrator`: omit `model` field from batch tasks when `--model` is not specified, letting `kunge2013-imagine` resolve the default from env/config

## 1.99.0 - 2026-04-10

### Features
- `kunge2013-diagram`: add new skill for generating publication-ready SVG diagrams — flowcharts, structural/architecture diagrams, and illustrative intuition diagrams. Claude writes real SVG code directly following a cohesive design system; output is a single self-contained `.svg` file with embedded styles and auto dark-mode, ready to embed in articles, WeChat posts, slides, and docs

## 1.98.0 - 2026-04-10

### Features
- `kunge2013-xhs-images`: Restore as active skill (remove deprecated warning)
- `kunge2013-xhs-images`: Add `sketch-notes` style — hand-drawn educational infographic with macaron pastels, wobble lines, and warm cream background
- `kunge2013-xhs-images`: Add palette system (`macaron`, `warm`, `neon`) as optional `--palette` color override dimension
- `kunge2013-xhs-images`: Add 3 new presets: `hand-drawn-edu`, `sketch-card`, `sketch-summary`

## 1.97.1 - 2026-04-09

### Fixes
- `kunge2013-image-cards`: rename palette color roles from "Zone N" to "Block Color" to prevent AI rendering labels as visible text in images

## 1.97.0 - 2026-04-09

### Features
- `kunge2013-image-cards`: add `sketch-notes` style, palette system (`macaron`, `warm`, `neon`), and 3 new presets (`hand-drawn-edu`, `sketch-card`, `sketch-summary`)

### Fixes
- `kunge2013-xhs-images`: improve deprecated skill description for better routing

## 1.96.0 - 2026-04-09

### Features
- `kunge2013-image-cards`: add image card series skill migrated from `kunge2013-xhs-images`, decoupled from Xiaohongshu platform
- `kunge2013-xhs-images`: deprecated, migrated to `kunge2013-image-cards`

## 1.95.1 - 2026-04-09

### Fixes
- `kunge2013-slide-deck`: add `pptxgenjs` dependency and detect image format by magic bytes instead of file extension in PDF merge

## 1.95.0 - 2026-04-08

### Features
- `kunge2013-infographic`: add `hand-drawn-edu` style — macaron pastels, hand-drawn wobble, stick figures
- `kunge2013-slide-deck`: add `hand-drawn-edu` preset and `macaron` mood dimension with pastel color palette

## 1.94.0 - 2026-04-08

### Features
- `kunge2013-cover-image`: add macaron palette and hand-drawn-edu style preset

## 1.93.0 - 2026-04-08

### Features
- `kunge2013-article-illustrator`: add `hand-drawn-edu` preset — flowchart + sketch-notes + macaron combination for hand-drawn educational diagrams

### Refactor
- `kunge2013-article-illustrator`: extract palette as independent third dimension in Type × Style × Palette system

### Fixes
- `kunge2013-article-illustrator`: add explicit style file loading step in workflow

## 1.92.0 - 2026-04-08

### Features
- `kunge2013-article-illustrator`: add `macaron` style — soft macaron pastel color blocks (blue, mint, lavender, peach) on warm cream background with optional hand-drawn mode; add `edu-visual` preset

## 1.90.1 - 2026-04-05

### Fixes
- `kunge2013-post-to-wechat`: detect actual image format from buffer magic bytes to fix CDN content-type mismatches (e.g. WebP served for .png URLs); treat WebP as PNG-preferred for transparency handling

## 1.89.1 - 2026-04-01

### Features
- `kunge2013-chrome-cdp`: add `gracefulKillChrome` that waits for Chrome to exit and release its port; fix `killChrome` to use `exitCode`/`signalCode` instead of `.killed` for reliable process state detection
- `kunge2013-fetch`: auto-detect login state before extraction in interaction wait mode

### Maintenance
- Sync vendor kunge2013-chrome-cdp across CDP skills
- `kunge2013-url-to-markdown`: sync vendor kunge2013-fetch with login auto-detect

## 1.89.0 - 2026-03-31

### Features
- `kunge2013-fetch`: add X session cookie sidecar to persist login across runs, graceful Chrome shutdown via Browser.close, and stale profile lock auto-recovery
- `kunge2013-article-illustrator`: add warm palette variant for vector-illustration style with new `warm-knowledge` preset
- `kunge2013-post-to-x`: add X session persistence after login, Chrome lock recovery, and graceful shutdown

### Documentation
- `kunge2013-post-to-weibo`: add post type auto-selection rules and safer CDP kill instructions

### Refactor
- `kunge2013-danger-gemini-web`: use graceful Chrome shutdown instead of hard kill
- `kunge2013-danger-x-to-markdown`: use graceful Chrome shutdown instead of hard kill

### Fixes
- Sync npm lockfile and root node tests

### Maintenance
- `kunge2013-url-to-markdown`: sync vendor kunge2013-fetch with session and lifecycle changes
- Update bun.lock files

## 1.88.0 - 2026-03-27

### Features
- `kunge2013-fetch`: new URL reader CLI package with Chrome CDP and site-specific adapters (X/Twitter, YouTube, Hacker News, generic)

### Refactor
- `kunge2013-url-to-markdown`: replace custom CDP/converter pipeline with `kunge2013-fetch` CLI
- `shared-skill-packages`: add `package.json` `files` allowlist support and filter test files, changelogs, and `.changeset` dirs during vendor sync

### Fixes
- `kunge2013-md`: rename test image paths from `images/` to `imgs/`

## 1.87.2 - 2026-03-26

### Refactor
- `kunge2013-translate`: simplify translation prompts from 15+ verbose principles to 7 concise ones, consolidate analysis and review steps in workflow references

## 1.87.1 - 2026-03-26

### Maintenance
- Add deprecation notice to `kunge2013-image-gen` SKILL.md redirecting users to `kunge2013-imagine`
- Document deprecated skills policy in CLAUDE.md

## 1.87.0 - 2026-03-26

### Maintenance
- Remove deprecated `kunge2013-image-gen` redirect skill and plugin manifest entry — migration to `kunge2013-imagine` is complete

## 1.86.0 - 2026-03-25

### Features
- `kunge2013-translate`: enrich translation prompt with full analysis context — source voice assessment, structured figurative language mapping, comprehension challenge reasoning, structural/creative challenges, and chunk position context for subagents

## 1.85.0 - 2026-03-25

### Features
- `kunge2013-imagine`: auto-migrate legacy `kunge2013-image-gen` EXTEND.md config path at runtime
- Add `kunge2013-image-gen` deprecation redirect skill to guide users to install `kunge2013-imagine` and remove the old skill

## 1.84.0 - 2026-03-25

### Features
- Rename `kunge2013-image-gen` skill to `kunge2013-imagine` — shorter command name, all references updated across docs, configs, and dependent skills

## 1.83.0 - 2026-03-25

### Features
- `kunge2013-image-gen`: add MiniMax provider (`image-01` / `image-01-live`) with subject_reference for character/portrait consistency, custom sizes, and aspect ratio support

## 1.82.0 - 2026-03-24

### Features
- `kunge2013-url-to-markdown`: add browser fallback strategy — headless first, automatic retry in visible Chrome on technical failure; new `--browser auto|headless|headed` flag with `--headless`/`--headed` shortcuts
- `kunge2013-url-to-markdown`: add content cleaner module for HTML preprocessing before extraction (remove ads, base64 images, scripts, styles)
- `kunge2013-url-to-markdown`: support base64 data URI images in media localizer alongside remote URLs
- `kunge2013-url-to-markdown`: capture final URL from browser to track redirects for output path generation
- `kunge2013-url-to-markdown`: add agent quality gate documentation for post-capture content validation

### Dependencies
- `kunge2013-url-to-markdown`: upgrade defuddle ^0.12.0 → ^0.14.0

### Tests
- `kunge2013-url-to-markdown`: add unit tests for content-cleaner, html-to-markdown, legacy-converter, media-localizer

## 1.81.0 - 2026-03-24

### Features
- `kunge2013-youtube-transcript`: add yt-dlp fallback when YouTube blocks direct InnerTube API, with alternate client identity retry and cookie support via `YOUTUBE_TRANSCRIPT_COOKIES_FROM_BROWSER` env var

### Refactor
- `kunge2013-youtube-transcript`: split monolithic script into typed modules (youtube, transcript, storage, shared, types) and add unit tests

## 1.80.1 - 2026-03-24

### Fixes
- `kunge2013-image-gen`: use correct `prompt` field name for Jimeng API request

## 1.80.0 - 2026-03-24

### Features
- `kunge2013-image-gen`: add Azure OpenAI as independent image generation provider with flexible endpoint parsing, deployment-name resolution, quality mapping, and reference image validation

## 1.79.2 - 2026-03-23

### Fixes
- `kunge2013-cover-image`: simplify reference image handling — use `--ref` when model supports it, only create description files for models without reference image support
- `kunge2013-post-to-weibo`: add no-theme rule for article markdown-to-HTML conversion

### Tests
- Fix Node-compatible parser tests and add parser test dependencies

## 1.79.1 - 2026-03-23

### Fixes
- Consolidate to single plugin to prevent duplicate skill registration (by @TyrealQ)
- `kunge2013-article-illustrator`: remove opacity parameter from watermark prompt
- `kunge2013-comic`: fix Doraemon naming spacing and remove opacity from watermark prompt
- `kunge2013-xhs-images`: remove opacity from watermark prompt and fix CJK spacing

### Documentation
- Update project documentation to reflect single-plugin architecture

## 1.79.0 - 2026-03-22

### Features
- `kunge2013-post-to-wechat`: improve credential loading with multi-source resolution, priority ordering, and diagnostics for skipped incomplete sources

## 1.78.0 - 2026-03-22

### Features
- `kunge2013-url-to-markdown`: add URL-specific parser layer for X/Twitter and archive.ph sites
- `kunge2013-url-to-markdown`: improved slug generation with stop words removal and subdirectory output structure

### Fixes
- `kunge2013-url-to-markdown`: preserve anchor elements containing media in legacy converter
- `kunge2013-url-to-markdown`: smarter title deduplication to avoid redundant headings

## 1.77.0 - 2026-03-22

### Features
- `kunge2013-youtube-transcript`: add end times to chapter data (by @jzOcb)

### Fixes
- `sync-clawhub`: skip failed skills instead of aborting

## 1.76.1 - 2026-03-21

### Documentation
- `kunge2013-youtube-transcript`: fix zsh glob issue — always single-quote YouTube URLs when running the script

## 1.76.0 - 2026-03-21

### Features
- `kunge2013-youtube-transcript`: add title heading, description summary, and cover image to markdown output

### Fixes
- `kunge2013-markdown-to-html`: use process.execPath and tsx import in test runner

## 1.75.0 - 2026-03-21

### Features
- `kunge2013-youtube-transcript`: new skill — download YouTube video transcripts/subtitles and cover images with multi-language, chapters, and speaker identification support

## 1.74.1 - 2026-03-21

### Fixes
- `kunge2013-image-gen`: align OpenRouter image generation with current API, harden image support, and narrow Gemini aspect ratios (by @cwandev)
- `kunge2013-image-gen`: broaden OpenRouter model detection and aspect ratio validation

## 1.74.0 - 2026-03-20

### Features
- `kunge2013-markdown-to-html`: CLI now supports all rendering options — color, font-family, font-size, code-theme, mac-code-block, line-number, count, legend

### Fixes
- `kunge2013-markdown-to-html`: fix CSS custom property regex to handle quoted values; grace/simple themes now layer default CSS

## 1.73.3 - 2026-03-20

### Fixes
- `kunge2013-post-to-wechat`: fix placeholder replacement to avoid shorter placeholders matching longer numbered variants

## 1.73.2 - 2026-03-20

### Fixes
- `kunge2013-post-to-wechat`: fix body image upload to correctly use media/uploadimg API with format and size validation (by @AICreator-Wind)

### Refactor
- `kunge2013-post-to-wechat`: extract image processor module for local format conversion (WebP/BMP/GIF → JPEG/PNG) instead of material API fallback

## 1.73.1 - 2026-03-18

### Refactor
- `kunge2013-danger-x-to-markdown`: migrate tests from bun:test to node:test

## 1.73.0 - 2026-03-18

### Features
- `kunge2013-danger-x-to-markdown`: add video media support for X articles with poster image and video link rendering

## 1.72.0 - 2026-03-18

### Features
- `kunge2013-danger-x-to-markdown`: add MARKDOWN entity support for rendering embedded markdown/code blocks in X articles

## 1.71.0 - 2026-03-17

### Features
- `kunge2013-image-gen`: add Seedream reference image support for 5.0/4.5/4.0 models with model-specific size validation

## 1.70.0 - 2026-03-17

### Features
- `kunge2013-format-markdown`: optimize title generation with formula-based recommendations and straightforward alternatives
- `kunge2013-format-markdown`: auto-generate dual summaries (`summary` + `description`) in frontmatter

## 1.69.1 - 2026-03-16

### Fixes
- `kunge2013-chrome-cdp`: tighten chrome auto-connect logic to reduce false positives

## 1.69.0 - 2026-03-16

### Features
- `kunge2013-chrome-cdp`: support connecting to existing Chrome session (by @bviews)

### Fixes
- `kunge2013-chrome-cdp`: support Chrome 146 native remote debugging in approval mode (by @bviews)
- `kunge2013-chrome-cdp`: keep HTTP validation in findExistingChromeDebugPort (by @bviews)
- `kunge2013-danger-gemini-web`: reuse openPageSession and fix orphaned tab leak (by @bviews)
- `kunge2013-danger-gemini-web`: respect explicit profile config over auto-discovery (by @bviews)
- `kunge2013-danger-gemini-web`: respect kunge2013_CHROME_PROFILE_DIR in auto-discovery skip (by @bviews)
- `kunge2013-post-to-wechat`: improve browser publishing reliability (by @cfh-7598)

### Documentation
- `kunge2013-cover-image`: clarify people reference image workflow and interactive confirmation

## 1.68.0 - 2026-03-14

### Features
- `kunge2013-article-illustrator`: add configurable output directory (`default_output_dir`) with 4 options — `imgs-subdir`, `same-dir`, `illustrations-subdir`, `independent`
- `kunge2013-cover-image`: add character preservation from reference images — use `usage: direct` to pass people references to model for stylized likeness

## 1.67.0 - 2026-03-13

### Features
- `kunge2013-image-gen`: add qwen-image-2.0-pro model support for DashScope provider with free-form sizes and text rendering (by @JianJang2017)

## 1.66.1 - 2026-03-13

### Tests
- Migrate test files from centralized `tests/` directory to colocate with source code
- Convert tests from `.mjs` to TypeScript (`.test.ts`) with `tsx` runner
- Add npm workspaces configuration and npm cache to CI workflow

## 1.66.0 - 2026-03-13

### Features
- `kunge2013-image-gen`: add Jimeng (即梦) and Seedream (豆包) image generation providers (by @lindaifeng)

### Fixes
- `kunge2013-image-gen`: tighten Jimeng provider behavior

### Refactor
- `kunge2013-image-gen`: export functions for testability and add module entry guard

### Documentation
- `kunge2013-image-gen`: add Jimeng and Seedream provider documentation to SKILL.md and READMEs

### Tests
- Add test infrastructure with CI workflow and image-gen unit tests

## 1.65.1 - 2026-03-13

### Refactor
- `kunge2013-translate`: replace remark/unified with markdown-it for chunk parsing, add main.ts CLI entry point

## 1.65.0 - 2026-03-13

### Features
- `kunge2013-post-to-wechat`: add placeholder image upload support with deduplication for markdown-embedded images

### Fixes
- `kunge2013-post-to-wechat`: fix frontmatter parsing to allow leading whitespace and optional trailing newline

### Refactor
- `kunge2013-post-to-wechat`: replace `renderMarkdownToHtml` with `renderMarkdownWithPlaceholders` for structured output

## 1.64.0 - 2026-03-13

### Features
- `kunge2013-image-gen`: add OpenRouter provider with support for image generation, reference images, and configurable models

## 1.63.0 - 2026-03-13

### Features
- `kunge2013-url-to-markdown`: add hosted `defuddle.md` API fallback when local browser capture fails
- `kunge2013-url-to-markdown`: extract YouTube transcript/caption text into markdown output
- `kunge2013-url-to-markdown`: materialize shadow DOM content for better web-component page conversion
- `kunge2013-url-to-markdown`: include language hint in markdown front matter when available

### Refactor
- `kunge2013-url-to-markdown`: split monolithic converter into defuddle, legacy, and shared modules

### Documentation
- Fix Claude Code marketplace repo casing in READMEs

## 1.62.0 - 2026-03-12

### Features
- `kunge2013-infographic`: support flexible aspect ratios with custom W:H values (e.g., 3:4, 4:3, 2.35:1) in addition to named presets

### Fixes
- Set strict mode on plugins to prevent duplicated slash commands

### Documentation
- `kunge2013-post-to-wechat`: replace credential-like placeholders

## 1.61.0 - 2026-03-11

### Features
- `kunge2013-post-to-wechat`: add multi-account support with `--account` CLI arg, EXTEND.md accounts block, isolated Chrome profiles, and credential resolution chain

### Fixes
- Exclude `out/dist/build` dirs and `bun.lockb` from skill release files
- Use proper MIME types in skill publish to fix ClawhHub rejection

## 1.60.0 - 2026-03-11

### Features
- `kunge2013-url-to-markdown`: support reusing existing Chrome CDP instances and fix port detection order

### Fixes
- `kunge2013-post-to-x`: add missing `fs` import in x-article

### Refactor
- Unify all CDP skills to use shared `kunge2013-chrome-cdp` package with vendored copies
- Simplify CLAUDE.md, move detailed documentation to `docs/` directory
- Publish skills directly from synced vendor, removing separate artifact preparation step

## 1.59.1 - 2026-03-11

### Fixes
- `kunge2013-translate`: improve short text annotation density rule and add explicit style preset passing to 02-prompt.md
- `kunge2013-post-to-x`: remove `--disable-blink-features=AutomationControlled` Chrome flag

### Refactor
- `kunge2013-post-to-weibo`: add entry point guard to md-to-html.ts for module import compatibility
- Replace clawhub CLI with local sync-clawhub.mjs script

### Documentation
- Update CLAUDE.md to reflect v1.59.0 codebase state (by @jackL1020)

## 1.59.0 - 2026-03-09

### Features
- `kunge2013-image-gen`: add batch parallel image generation and provider-level throttling (by @SeamoonAO)

### Fixes
- `kunge2013-image-gen`: restore Google as default provider when multiple keys available

### Documentation
- Improve skill documentation clarity (by @SeamoonAO)

## 1.58.0 - 2026-03-08

### Features
- Add XDG config path support for EXTEND.md (by @liby)

### Fixes
- `kunge2013-post-to-wechat`: surface agent-browser startup errors
- `kunge2013-post-to-wechat`: harden agent-browser command and eval handling (by @luojiyin1987)
- `kunge2013-image-gen`: use execFileSync for google curl requests (by @luojiyin1987)
- `kunge2013-format-markdown`: use spawnSync for autocorrect command (by @luojiyin1987)

### Documentation
- Fix CLAUDE dependency statement (by @luojiyin1987)
- Add markdown-to-html to README utility skills (by @luojiyin1987)

## 1.57.0 - 2026-03-08

### Features
- Add ClawHub/OpenClaw publishing support with sync script and README documentation

### Refactor
- Add openclaw metadata to all skill frontmatter for ClawHub registry compatibility
- Rename `SKILL_DIR` to `baseDir` across all skills for consistency
- `kunge2013-danger-gemini-web`, `kunge2013-danger-x-to-markdown`: dynamic script path in usage display
- `kunge2013-comic`, `kunge2013-xhs-images`: use skill interface instead of direct script invocation for image generation

## 1.56.1 - 2026-03-08

### Fixes
- `kunge2013-post-to-weibo`: simplify article image insertion with Backspace-based placeholder deletion for ProseMirror compatibility

## 1.56.0 - 2026-03-08

### Features
- `kunge2013-article-illustrator`: preset-first selection flow with categorized style presets by content type
- `kunge2013-xhs-images`: streamline workflow from 6 to 4 steps with Smart Confirm (Quick/Customize/Detailed paths)

### Fixes
- `kunge2013-post-to-wechat`: improve image upload reliability with file chooser interception and fallback

## 1.55.0 - 2026-03-08

### Features
- `kunge2013-article-illustrator`: add screen-print style and `--preset` flag for quick type + style selection
- `kunge2013-cover-image`: add screen-print rendering and duotone palette with 5 new style presets
- `kunge2013-xhs-images`: add screen-print style and `--preset` flag with 23 built-in presets

### Documentation
- Add credits section to both READMEs acknowledging open source inspirations

## 1.54.1 - 2026-03-07

### Fixes
- `kunge2013-post-to-x`: keep composed posts open in Chrome so users can review and publish manually

### Documentation
- `kunge2013-post-to-x`: document default post type selection and manual publishing flow
- `README`: add Star History charts to the English and Chinese READMEs

## 1.54.0 - 2026-03-06

### Features
- `kunge2013-format-markdown`: improve title and summary generation with style-differentiated candidates, prohibited patterns, and hook-first principles
- `kunge2013-markdown-to-html`: add `--cite` option to convert ordinary external links to numbered bottom citations
- `kunge2013-post-to-wechat`: enable bottom citations by default for markdown input, add `--no-cite` flag to disable
- `kunge2013-translate`: support external glossary files via `glossary_files` in EXTEND.md (markdown table or YAML)
- `kunge2013-translate`: add frontmatter transformation rules to rename source metadata fields with `source` prefix

## 1.53.0 - 2026-03-06

### Features
- `kunge2013-url-to-markdown`: save rendered HTML snapshot as `-captured.html` alongside markdown output
- `kunge2013-url-to-markdown`: Defuddle-first markdown conversion with automatic fallback to legacy Readability/selector extractor

## 1.52.0 - 2026-03-06

### Features
- `kunge2013-post-to-weibo`: add video upload support via `--video` flag (max 18 files total)
- `kunge2013-post-to-weibo`: switch from clipboard paste to `DOM.setFileInputFiles` for more reliable uploads

### Fixes
- `kunge2013-post-to-weibo`: add Chrome health check with auto-restart for unresponsive instances
- `kunge2013-post-to-weibo`: add navigation check to ensure Weibo home page before posting

## 1.51.2 - 2026-03-06

### Fixes
- `release-skills`: replace explicit language filename patterns (e.g. `CHANGELOG.de.md`) with generic pattern to avoid Gen Agent Trust Hub URL scanner false positive
- `kunge2013-infographic`: add credential/secret stripping instructions to address Snyk W007 insecure credential handling audit

## 1.51.1 - 2026-03-06

### Refactor
- Unify Chrome CDP profile path — all skills now share `kunge2013-skills/chrome-profile` instead of per-skill directories
- Fix `kunge2013-post-to-weibo` incorrectly reusing `x-browser-profile` path

### Fixes
- Remove `curl | bash` remote code execution pattern from all install instructions
- Enforce HTTPS-only for remote image downloads in `md-to-html` scripts
- Add redirect limit (max 5) to prevent infinite redirect loops
- Add Security Guidelines section to CLAUDE.md

## 1.51.0 - 2026-03-06

### Features
- `kunge2013-post-to-weibo`: new skill for posting to Weibo — supports text posts with images and headline articles (头条文章) via Chrome CDP
- `kunge2013-format-markdown`: add title/summary multi-candidate selection — generates 3 candidates for user to pick, with `auto_select` EXTEND.md support

## 1.50.0 - 2026-03-06

### Features
- `kunge2013-translate`: expand translation style presets from 4 to 9 — add academic, business, humorous, conversational, and elegant styles
- `kunge2013-translate`: add `--style` CLI flag for per-invocation style override
- `kunge2013-translate`: integrate style instructions into subagent prompt template

## 1.49.0 - 2026-03-06

### Features
- `kunge2013-format-markdown`: add reader-perspective content analysis phase — analyzes highlights, structure, and formatting issues before applying formatting
- `kunge2013-format-markdown`: restructure workflow from 8 steps to 7 with explicit do/don't formatting principles and completion report
- `kunge2013-translate`: extract Step 2 workflow mechanics to separate reference file for cleaner SKILL.md
- `kunge2013-translate`: expand trigger keywords (改成中文, 快翻, 本地化, etc.) for better skill activation
- `kunge2013-translate`: add proactive warning for long content in quick mode
- `kunge2013-translate`: save frontmatter to `chunks/frontmatter.md` during chunking

## 1.48.2 - 2026-03-06

### Features
- `kunge2013-translate`: add figurative language & emotional fidelity review steps to refined workflow critique and revision stages
- `kunge2013-translate`: enhance quick mode to enforce meaning-first translation principles for figurative language

## 1.48.1 - 2026-03-05

### Features
- `kunge2013-translate`: add figurative language & metaphor mapping to analysis step — interprets metaphors, idioms, and implied meanings before translation instead of translating literally
- `kunge2013-translate`: add "meaning over words", "figurative language", and "emotional fidelity" translation principles to SKILL.md, refined workflow, and subagent prompt template

## 1.48.0 - 2026-03-05

### Features
- `kunge2013-translate`: add `--output-dir` option to chunk.ts — chunks now write to the translation output directory instead of the source file directory
- `kunge2013-translate`: improve refined workflow — split Review into Critical Review + Revision (5→6 steps), add Europeanized language diagnosis for CJK targets

## 1.47.0 - 2026-03-05

### Features
- Add `kunge2013-translate` skill — three-mode translation (quick/normal/refined) with custom glossaries, audience-aware translation, and parallel chunked translation for long documents
- Add cross-platform PowerShell support for EXTEND.md preference checks across all skills

## 1.46.0 - 2026-03-05

### Features
- Add `--output-dir` option to url-to-markdown for custom output directory with auto-generated filenames

## 1.45.1 - 2026-03-05

### Refactor
- Replace hardcoded `npx -y bun` with `${BUN_X}` runtime variable across all skills — prefers native `bun`, falls back to `npx -y bun`
- Add Runtime Detection section to CLAUDE.md and Script Directory instructions in all SKILL.md files

## 1.45.0 - 2026-03-05

### Features
- `kunge2013-post-to-x`: add post-composition verification for X Articles — automatically checks remaining placeholders and image count after all images are inserted
- `kunge2013-post-to-x`: increase CDP timeout to 60s and add 3s DOM stabilization delay between image insertions for long articles

## 1.44.0 - 2026-03-05

### Features
- `kunge2013-url-to-markdown`: add `--download-media` flag to download images and videos to local directories, rewriting markdown links to local paths
- `kunge2013-url-to-markdown`: extract cover image from page meta (og:image) into YAML front matter `coverImage` field
- `kunge2013-url-to-markdown`: handle `data-src` lazy loading for WeChat and similar sites
- `kunge2013-url-to-markdown`: add EXTEND.md preferences with first-time setup for media download behavior

## 1.43.2 - 2026-03-05

### Refactor
- `kunge2013-url-to-markdown`: replace custom HTML extraction (linkedom + Readability + Turndown) with defuddle library for cleaner content extraction and markdown conversion

## 1.43.1 - 2026-03-02

### Features
- `kunge2013-post-to-x`: auto-detect WSL environment and resolve Chrome profile to Windows-native path for stable login persistence
- `kunge2013-post-to-wechat`: auto-detect WSL environment and resolve Chrome profile to Windows-native path for stable login persistence
- `kunge2013-danger-gemini-web`: WSL auto-detection for Chrome profile path; add `GEMINI_WEB_DEBUG_PORT` env var for fixed debug port
- `kunge2013-danger-x-to-markdown`: WSL auto-detection for Chrome profile path; add `X_DEBUG_PORT` env var for fixed debug port

## 1.43.0 - 2026-03-02

### Features
- `kunge2013-post-to-wechat`: support env var overrides for browser debug port (`WECHAT_BROWSER_DEBUG_PORT`) and profile directory (`WECHAT_BROWSER_PROFILE_DIR`)
- `kunge2013-post-to-x`: support env var overrides for browser debug port (`X_BROWSER_DEBUG_PORT`) and profile directory (`X_BROWSER_PROFILE_DIR`)

## 1.42.3 - 2026-03-02

### Fixes
- `kunge2013-image-gen`: use standard size presets for DashScope aspect ratio mapping instead of free-form calculation

## 1.42.2 - 2026-03-01

### Features
- `kunge2013-markdown-to-html`: inline rendering pipeline (no subprocess), fix CJK emphasis order, enhance modern theme with GFM alerts and improved typography
- `kunge2013-post-to-wechat`: internalize markdown conversion with modular renderer, add color support, simplify publishing workflow

## 1.42.1 - 2026-02-28

### Features
- `kunge2013-markdown-to-html`: modularize render.ts into cli, constants, extend-config, html-builder, renderer, themes, and types modules; bundle code highlighting themes locally

## 1.42.0 - 2026-02-28

### Features
- `kunge2013-markdown-to-html`: consolidate heritage and warm into single modern theme, add per-theme color defaults (default→blue, grace→purple, simple→green, modern→orange)
- `kunge2013-post-to-wechat`: add default color preference support in EXTEND.md, add modern theme option to first-time setup

## 1.41.0 - 2026-02-28

### Features
- `kunge2013-markdown-to-html`: rename themes (red→heritage, orange→warm), add 13 named color presets, serif-cjk font family, and per-theme style defaults

## 1.40.1 - 2026-02-28

### Features
- `kunge2013-image-gen`: clarify model resolution priority (EXTEND.md overrides env vars) and display current model with switch hints during generation

## 1.40.0 - 2026-02-28

### Features
- `kunge2013-image-gen`: support OpenAI chat completions endpoint for image generation (by @zhao-newname)
- `kunge2013-markdown-to-html`: add CLI customization options (--color, --font-family, --font-size, --code-theme, --mac-code-block, --line-number, --cite, --count, --legend) and EXTEND.md config support

## 1.39.0 - 2026-02-28

### Features
- `kunge2013-markdown-to-html`: add red theme (traditional calligraphy style with red-gold palette and serif typography) and orange theme (warm modern style with rounded corners and relaxed line height)

## 1.38.0 - 2026-02-28

### Features
- `kunge2013-danger-x-to-markdown`: render embedded tweets in articles as blockquotes with author info and text summary
- `kunge2013-danger-x-to-markdown`: reuse existing markdown when `--download-media` targets already-converted URLs
- `kunge2013-danger-x-to-markdown`: upgrade Twitter image downloads to 4096x4096 high resolution

### Fixes
- `kunge2013-danger-x-to-markdown`: improve entity resolution with logical key lookup for reliable media and link mapping
- `kunge2013-danger-x-to-markdown`: support trailing media for all block types (headings, lists, blockquotes)

## 1.37.1 - 2026-02-27

### Fixes
- `kunge2013-danger-gemini-web`: sync model headers with upstream and update model list (by @xkcoding)

## 1.37.0 - 2026-02-27

### Features
- `kunge2013-danger-x-to-markdown`: add inline link rendering for X article content, mapping LINK/MEDIA entities to markdown links
- `kunge2013-danger-x-to-markdown`: use content-based slug in output directory path for meaningful folder names
- `kunge2013-danger-x-to-markdown`: add atomic media queue for blocks without direct media references

## 1.36.0 - 2026-02-27

### Features
- `kunge2013-image-gen`: add `gemini-3.1-flash-image-preview` model support for Google multimodal image generation
- `kunge2013-image-gen`: improve first-time setup with blocking preferences flow and guided configuration

### Fixes
- `kunge2013-image-gen`: use curl fallback for Google API when HTTP proxy is detected (by @liye71023326)

## 1.35.0 - 2026-02-24

### Features
- `kunge2013-image-gen`: add Replicate provider support with configurable models (by @justnode)
- `kunge2013-infographic`: add `dense-modules` layout and 3 new styles (`morandi-journal`, `pop-laboratory`, `retro-pop-grid`) for high-density infographics. Add keyword shortcuts for auto-selection. Prompt credit: [AJ](https://waytoagi.feishu.cn/wiki/YG0zwalijihRREkgmPzcWRInnUg)

### Documentation
- `kunge2013-image-gen`: add Replicate model configuration documentation

## 1.34.2 - 2026-02-25

### Documentation
- `kunge2013-markdown-to-html`: clarify theme resolution order with local and cross-skill EXTEND.md fallbacks before prompting user.
- `kunge2013-post-to-wechat`: align markdown conversion theme handling with deterministic fallback (`CLI --theme` -> EXTEND.md `default_theme` -> `default`) and require explicit `--theme` parameter.

## 1.34.1 - 2026-02-20

### Fixes
- `kunge2013-post-to-wechat`: fix upload progress check crashing on second iteration (by @LyInfi)

## 1.34.0 - 2026-02-17

### Features
- `kunge2013-xhs-images`: add reference image chain for visual consistency across multi-image series (by @jeffrey94)

### Refactor
- `kunge2013-article-illustrator`: enforce prompt file creation as blocking step before image generation, add structured prompt quality requirements (ZONES / LABELS / COLORS / STYLE / ASPECT) and verification checklist.

## 1.33.1 - 2026-02-14

### Refactor
- `kunge2013-post-to-x`: replace hand-rolled markdown parser with marked ecosystem for X Articles HTML conversion.

### Documentation
- `kunge2013-post-to-x`: remove `--submit` flag from all scripts; clarify that scripts only fill content into browser for manual review and publish.

## 1.33.0 - 2026-02-13

### Features
- `kunge2013-post-to-x`: add pre-flight environment check script (`check-paste-permissions.ts`); add troubleshooting section for Chrome debug port conflicts; replace fixed sleep with image upload verification polling up to 15s.
- `kunge2013-post-to-wechat`: add pre-flight environment check script (`check-permissions.ts`) covering Chrome, profile isolation, Bun, Accessibility, clipboard, paste keystroke, API credentials.

## 1.32.0 - 2026-02-12

### Features
- `kunge2013-danger-x-to-markdown`: add `--download-media` flag to download images/videos locally and rewrite markdown links to relative paths; add media localization module; add first-time setup with EXTEND.md preferences; add `coverImage` to frontmatter output.

### Refactor
- `kunge2013-danger-x-to-markdown`: use camelCase for frontmatter keys (`tweetCount`, `coverImage`, `requestedUrl`, etc.).
- `kunge2013-format-markdown`: rename `featureImage` to `coverImage` as primary frontmatter key (with `featureImage` as accepted alias).
- `kunge2013-post-to-wechat`: prioritize `coverImage` over `featureImage` in cover image frontmatter lookup order.

## 1.31.2 - 2026-02-10

### Fixes
- `kunge2013-post-to-wechat`: fix PowerShell clipboard copy failing on Windows due to `param()`/`-Path` not working with `-Command`.
- `kunge2013-post-to-x`: fix PowerShell clipboard copy on Windows (same issue); fix `getScriptDir()` returning invalid path on Windows (`/C:/...` prefix).

## 1.31.1 - 2026-02-10

### Features
- `kunge2013-post-to-wechat`: adapt to new WeChat UI — rename 图文 to 贴图; add ProseMirror editor support with old editor fallback; add fallback file input selector; add upload progress monitoring; improve save button detection with toast verification.

### Fixes
- `kunge2013-post-to-wechat`: truncate digest > 120 chars at punctuation boundary; fix cover image relative path resolution.
- `kunge2013-post-to-x`: fix Chrome launch on macOS via `open -na`; fix cover image relative path resolution.

## 1.31.0 - 2026-02-07

### Features
- `kunge2013-post-to-wechat`: add comment control settings (`need_open_comment`, `only_fans_can_comment`); add cover image fallback chain (CLI → frontmatter → `imgs/cover.png` → first inline image); add author resolution priority; add first-time setup flow with EXTEND.md preferences.

## 1.30.3 - 2026-02-06

### Refactor
- `kunge2013-article-illustrator`: optimize SKILL.md from 197 to 150 lines (24% reduction); apply progressive disclosure pattern with concise overview and detailed references.

## 1.30.2 - 2026-02-06

### Refactor
- `kunge2013-cover-image`: optimize SKILL.md from 532 to 233 lines (56% reduction); extract reference image handling to `references/workflow/reference-images.md`; condense galleries to value-only tables with links.

## 1.30.1 - 2026-02-06

### Features
- `kunge2013-image-gen`: add OpenAI GPT Image edits support for reference images (`--ref`); auto-select Google or OpenAI when ref provided.

### Fixes
- `kunge2013-image-gen`: change ref-related warnings to explicit errors with fix hints; add reference image validation.
- `kunge2013-cover-image`: enhance reference image analysis with deep extraction template; require MUST INCORPORATE section for concrete visual elements.

## 1.30.0 - 2026-02-06

### Features
- `kunge2013-cover-image`: add font dimension with 4 typography styles (clean, handwritten, serif, display); includes auto-selection rules, compatibility matrix, and `warm-flat` style preset.

## 1.29.0 - 2026-02-06

### Features
- `kunge2013-image-gen`: add EXTEND.md configuration support, including schema documentation and runtime preference loading in scripts (by @kingdomad).

### Fixes
- `kunge2013-post-to-wechat`: fix duplicated title and ordered-list numbering in WeChat article publishing (by @NantesCheval).
- `kunge2013-url-to-markdown`: replace regex-only conversion with multi-strategy content extraction and Turndown conversion; improve noise filtering for Substack-style pages.

## 1.28.4 - 2026-02-03

### Features
- `kunge2013-markdown-to-html`: add author and description meta tags to generated HTML from YAML frontmatter; strip quotes from frontmatter values (supports both English and Chinese quotation marks).

### Fixes
- `kunge2013-post-to-wechat`: remove extra empty lines after image paste; fix summary field timing to fill after content paste (prevents being overwritten).

## 1.28.3 - 2026-02-03

### Fixes
- `kunge2013-post-to-wechat`: fix placeholder matching issue where `WECHATIMGPH_1` incorrectly matched `WECHATIMGPH_10`.

## 1.28.2 - 2026-02-03

### Fixes
- `kunge2013-post-to-x`: reuse existing Chrome instance when available; fix placeholder matching issue where `XIMGPH_1` incorrectly matched `XIMGPH_10`; improve image sorting by placeholder index; use `execCommand` for more reliable placeholder deletion.

## 1.28.1 - 2026-02-02

### Refactor
- `kunge2013-article-illustrator`: simplify main SKILL.md by extracting detailed procedures to `workflow.md`; add Core Styles tier (vector, minimal-flat, sci-fi, hand-drawn, editorial, scene) for quick selection; add `vector-illustration` as recommended default style; add Illustration Purpose (information/visualization/imagination) for better type/style recommendations; add default composition requirements, character rendering guidelines, and text styling rules to prompt construction.

## 1.28.0 - 2026-02-01

### Features
- `kunge2013-cover-image`: add reference image support (`--ref` parameter) with direct/style/palette usage types; add visual elements library with icon vocabulary by topic.
- `kunge2013-article-illustrator`: add reference image support with direct/style/palette usage types.
- `kunge2013-post-to-wechat`: add `newspic` article type for image-text posts.

### Refactor
- `kunge2013-cover-image`, `kunge2013-article-illustrator`, `kunge2013-comic`, `kunge2013-xhs-images`: enforce first-time setup as blocking operation before any other workflow steps.
- `kunge2013-cover-image`: remove character limits from titles, use original source titles.

## 1.26.1 - 2026-01-29

### Features
- `kunge2013-article-illustrator`, `kunge2013-comic`, `kunge2013-cover-image`, `kunge2013-infographic`, `kunge2013-slide-deck`, `kunge2013-xhs-images`: add backup rules for existing files—automatically renames source, prompt, and image files with timestamp suffix before overwriting.

### Fixes
- `kunge2013-xhs-images`: remove `notebook` style (10 styles remaining).

## 1.26.0 - 2026-01-29

### Features
- `kunge2013-xhs-images`: add `notebook` style (hand-drawn infographic with watercolor rendering and Morandi palette) and `study-notes` style (realistic handwritten photo aesthetic).
- `kunge2013-xhs-images`: add `mindmap` (center radial) and `quadrant` (four-section grid) layouts.

## 1.25.4 - 2026-01-29

### Fixes
- `kunge2013-markdown-to-html`: generate proper `<img>` tags with `data-local-path` attribute instead of text placeholders.
- `kunge2013-post-to-wechat`: fix API publishing to read image paths from `data-local-path` attribute; fix title/cover extraction from corresponding `.md` frontmatter when publishing HTML files.
- `kunge2013-post-to-wechat`: fix CLI argument parsing to handle unknown parameters gracefully; add `--summary` parameter support.
- `kunge2013-post-to-wechat`: fix browser publishing to convert `<img>` tags back to text placeholders before paste.

## 1.25.3 - 2026-01-28

### Features
- `kunge2013-format-markdown`: add content type detection with user confirmation for markdown files; add CJK punctuation handling to move paired punctuation outside emphasis markers.

## 1.25.2 - 2026-01-28

### Documentation
- `kunge2013-post-to-wechat`: add WeChat API credentials configuration guide to README.

## 1.25.1 - 2026-01-28

### Features
- `kunge2013-markdown-to-html`: add pre-check step for CJK content to suggest formatting with `kunge2013-format-markdown` before conversion.

## 1.25.0 - 2026-01-28

### Features
- `kunge2013-format-markdown`: add markdown formatter skill with frontmatter, typography, and CJK spacing support.
- `kunge2013-markdown-to-html`: add markdown to HTML converter with WeChat-compatible themes, code highlighting, math, PlantUML, and alerts.
- `kunge2013-post-to-wechat`: add API-based publishing method and external theme support.

## 1.24.4 - 2026-01-28

### Fixes
- `kunge2013-post-to-x`: fix Apply button click for cover image modal; add retry logic and wait for modal close.

## 1.24.3 - 2026-01-28

### Documentation
- Emphasize updating prompt files before regenerating images in modification workflows (article-illustrator, slide-deck, xhs-images, cover-image, comic).

## 1.24.2 - 2026-01-28

### Refactor
- `kunge2013-image-gen`: default to sequential generation; parallel available on request.

## 1.24.1 - 2026-01-28

### Features
- `kunge2013-image-gen`: add Aliyun Tongyi Wanxiang (DashScope) text-to-image model support (by @JianJang2017).

### Documentation
- Add Aliyun text-to-image model configuration to README.

## 1.24.0 - 2026-01-27

### Features
- `kunge2013-post-to-wechat`: reuse existing Chrome browser instead of requiring all windows closed (by @AliceLJY).

### Fixes
- `kunge2013-post-to-wechat`: improves title extraction to support h1/h2 headings; adds summary auto-fill and content verification after paste/type; supports flexible HTML meta tag attribute ordering.

### Documentation
- `release-skills`: adds third-party contributor attribution rules to changelog workflow.
- Backfills missing third-party contributor attributions across historical changelog entries.

## 1.23.1 - 2026-01-27

### Fixes
- `kunge2013-compress-image`: rename original file as `_original` backup instead of deleting after compression.

## 1.23.0 - 2026-01-26

### Refactor
- `kunge2013-cover-image`: replaces 20 fixed styles with 5-dimension system (Type × Palette × Rendering × Text × Mood). 9 color palettes × 6 rendering styles = 54 combinations. Adds style presets for backward compatibility, v2→v3 schema migration, and new reference structure (`palettes/`, `renderings/`, `workflow/`).

## 1.22.0 - 2026-01-25

### Features
- `kunge2013-article-illustrator`: adds `imgs-subdir` output directory option; improves style selection to always ask and show preferred_style from EXTEND.md.
- `kunge2013-cover-image`: adds `default_output_dir` preference supporting `same-dir`, `imgs-subdir`, and `independent` options with Step 1.5 for output directory selection.
- `kunge2013-post-to-wechat`: adds theme selection (default/grace/simple) with AskUserQuestion before posting; adds HTML preview step; simplifies image placeholders to `WECHATIMGPH_N` format; refactors copy/paste to cross-platform helpers.

### Refactor
- `kunge2013-post-to-x`: simplifies image placeholders from `[[IMAGE_PLACEHOLDER_N]]` to `XIMGPH_N` format.

## 1.21.4 - 2026-01-25

### Fixes
- `kunge2013-post-to-wechat`: adds Windows compatibility—uses `fileURLToPath` for correct path resolution, replaces system-dependent copy/paste tools (osascript/xdotool) with CDP keyboard events for cross-platform support (by @JadeLiang003).
- `kunge2013-post-to-wechat`: fixes regressions from Windows compatibility PR—corrects broken `-fixed` filename references, restores frontmatter quote stripping, restores `--title` CLI parameter, fixes summary extraction to skip headings/quotes/lists, fixes argument parsing for single-dash flags, removes debug logs.
- `kunge2013-article-illustrator`, `kunge2013-cover-image`, `kunge2013-xhs-images`: removes opacity option from watermark configuration.

## 1.21.3 - 2026-01-24

### Refactor
- `kunge2013-article-illustrator`: simplifies SKILL.md by extracting content to reference files—adds `references/usage.md` for command syntax, `references/prompt-construction.md` for prompt templates. Reorganizes workflow from 5 to 6 steps with new Pre-check phase. Adds `default_output_dir` preference option.

## 1.21.2 - 2026-01-24

### Features
- `kunge2013-image-gen`: adds parallel generation documentation with recommended 4 concurrent subagents for batch operations.

### Documentation
- `release-skills`: adds skill/module grouping workflow and user confirmation step before release.

## 1.21.1 - 2026-01-24

### Documentation
- `kunge2013-comic`: adds character sheet compression step after generation to reduce token usage when used as reference image.

## 1.21.0 - 2026-01-24

### Features
- `kunge2013-cover-image`: expands aspect ratio options—adds 4:3, 3:2, 3:4 ratios; changes default from 2.35:1 to 16:9 for better versatility. Aspect ratio is now always confirmed unless explicitly specified via `--aspect` flag.
- `kunge2013-image-gen`: refactors Google provider to support both Gemini multimodal and Imagen models with unified API. Adds `--imageSize` parameter support (1K/2K/4K) for Gemini models.

## 1.20.0 - 2026-01-24

### Features
- `kunge2013-cover-image`: upgrades from Type × Style two-dimension system to **4-dimension system**—adds `--text` dimension (none, title-only, title-subtitle, text-rich) for text density control and `--mood` dimension (subtle, balanced, bold) for emotional intensity. New `--quick` flag skips confirmation and uses auto-selection.

### Documentation
- `kunge2013-cover-image`: adds dimension reference files—`references/dimensions/text.md` (text density levels) and `references/dimensions/mood.md` (mood intensity levels).
- `kunge2013-cover-image`: updates base-prompt, first-time-setup, and preferences-schema to support new 4-dimension system with v2 schema.
- `README.md`, `README.zh.md`: updates kunge2013-cover-image documentation to reflect new 4-dimension system with `--text`, `--mood`, and `--quick` options.

## 1.19.0 - 2026-01-24

### Features
- `kunge2013-comic`: adds partial workflow options—`--storyboard-only`, `--prompts-only`, `--images-only`, and `--regenerate N` for flexible workflow control.
- `kunge2013-image-gen`: adds `--imageSize` parameter for Google providers (1K/2K/4K), changes default quality to 2k.
- `kunge2013-image-gen`: adds `GEMINI_API_KEY` as alias for `GOOGLE_API_KEY`.

### Refactor
- `kunge2013-comic`: extracts detailed workflow to `references/workflow.md`, reduces SKILL.md by ~400 lines while preserving functionality.
- `kunge2013-comic`: extracts content signal analysis to `references/auto-selection.md` and partial workflow docs to `references/partial-workflows.md`.
- `kunge2013-image-gen`: modularizes code—extracts types to `types.ts`, provider implementations to `providers/google.ts` and `providers/openai.ts`.

### Documentation
- `kunge2013-comic`: improves ohmsha preset documentation with explicit default Doraemon character definitions and visual descriptions.

## 1.18.3 - 2026-01-23

### Documentation
- `kunge2013-comic`: improves character reference handling with explicit Strategy A/B selection—Strategy A uses `--ref` parameter for skills that support it, Strategy B embeds character descriptions in prompts for skills that don't. Includes concrete code examples for both approaches.

### Fixes
- `kunge2013-image-gen`: removes unsupported Gemini models (`gemini-2.0-flash-exp-image-generation`, `gemini-2.5-flash-preview-native-audio-dialog`) from multimodal model list.

## 1.18.2 - 2026-01-23

### Refactor
- Streamline SKILL.md documentation across 7 skills (`kunge2013-compress-image`, `kunge2013-danger-gemini-web`, `kunge2013-danger-x-to-markdown`, `kunge2013-image-gen`, `kunge2013-post-to-wechat`, `kunge2013-post-to-x`, `kunge2013-url-to-markdown`) following official best practices—reduces total documentation by ~300 lines while preserving all functionality.

### Documentation
- `CLAUDE.md`: adds official skill authoring best practices link, skill loading rules, description writing guidelines, and progressive disclosure patterns.

## 1.18.1 - 2026-01-23

### Documentation
- `kunge2013-slide-deck`: adds detailed sub-steps (1.1-1.3) to progress checklist, marks Step 1.3 as required with explicit Bash check command for existing directory detection.

## 1.18.0 - 2026-01-23

### Features
- `kunge2013-slide-deck`: introduces dimension-based style system—replaces monolithic style definitions with modular 4-dimension architecture: **Texture** (clean, grid, organic, pixel, paper), **Mood** (professional, warm, cool, vibrant, dark, neutral), **Typography** (geometric, humanist, handwritten, editorial, technical), and **Density** (minimal, balanced, dense). 16 presets map to specific dimension combinations, with "Custom dimensions" option for full flexibility.
- `kunge2013-slide-deck`: adds two-round confirmation workflow—Round 1 asks style/audience/slides/review preferences, Round 2 (optional) collects custom dimension choices when user selects "Custom dimensions".
- `kunge2013-slide-deck`: adds conditional outline and prompt review—users can skip reviews for faster generation or enable them for more control.

### Documentation
- `kunge2013-slide-deck`: adds dimension reference files—`references/dimensions/texture.md`, `references/dimensions/mood.md`, `references/dimensions/typography.md`, `references/dimensions/density.md`, and `references/dimensions/presets.md` (preset → dimension mapping).
- `kunge2013-slide-deck`: adds design guidelines—`references/design-guidelines.md` with audience principles, visual hierarchy, content density, color selection, typography, and font recommendations.
- `kunge2013-slide-deck`: adds layout reference—`references/layouts.md` with layout options and selection tips.
- `kunge2013-slide-deck`: adds preferences schema—`references/config/preferences-schema.md` for EXTEND.md configuration.

## 1.17.1 - 2026-01-23

### Refactor
- `kunge2013-infographic`: simplifies SKILL.md documentation—removes redundant content, streamlines workflow description, and improves readability.
- `kunge2013-xhs-images`: improves Step 0 (Load Preferences) documentation—adds clearer first-time setup flow with visual tables and explicit path checking instructions.

### Improvements
- `kunge2013-infographic`: enhances `craft-handmade` style with strict hand-drawn enforcement—requires all imagery to maintain cartoon/illustrated aesthetic, no realistic or photographic elements.

## 1.17.0 - 2026-01-23

### Features
- `kunge2013-cover-image`: adds user preferences support via EXTEND.md—configure watermark (content, position, opacity), preferred type/style, default aspect ratio, and custom styles. New Step 0 checks for preferences at project (`.kunge2013-skills/`) or user (`~/.kunge2013-skills/`) level with first-time setup flow.

### Refactor
- `kunge2013-cover-image`: restructures to Type × Style two-dimension system—adds 6 types (`hero`, `conceptual`, `typography`, `metaphor`, `scene`, `minimal`) that control visual composition, while 20 styles control aesthetics. New `--type` and `--aspect` options, Type × Style compatibility matrix, and structured workflow with progress checklist.

### Documentation
- `kunge2013-cover-image`: adds three reference documents—`references/config/preferences-schema.md` (EXTEND.md YAML schema), `references/config/first-time-setup.md` (setup flow), `references/config/watermark-guide.md` (watermark configuration).
- `README.md`, `README.zh.md`: updates kunge2013-cover-image documentation to reflect new Type × Style system with `--type` and `--aspect` options.

## 1.16.0 - 2026-01-23

### Features
- `kunge2013-article-illustrator`: adds user preferences support via EXTEND.md—configure watermark (content, position, opacity), preferred type/style, and custom styles. New Step 1.1 checks for preferences at project (`.kunge2013-skills/`) or user (`~/.kunge2013-skills/`) level with first-time setup flow.

### Refactor
- `kunge2013-article-illustrator`: restructures to Type × Style two-dimension system—replaces 20+ single-dimension styles with modular Type (infographic, scene, flowchart, comparison, framework, timeline) × Style (notion, elegant, warm, minimal, blueprint, watercolor, editorial, scientific) architecture. Adds `--type` and `--density` options, Type × Style compatibility matrix, and structured prompt construction templates.

### Documentation
- `kunge2013-article-illustrator`: adds three reference documents—`references/styles.md` (style gallery and compatibility matrix), `references/config/preferences-schema.md` (EXTEND.md YAML schema), `references/config/first-time-setup.md` (setup flow).
- `README.md`, `README.zh.md`: updates kunge2013-article-illustrator documentation to reflect new Type × Style system with `--type` and `--style` options.

## 1.15.3 - 2026-01-23

### Refactor
- `kunge2013-comic`: restructures style system into 3-dimension architecture—replaces 10 monolithic style files with modular `art-styles/` (5 styles: ligne-claire, manga, realistic, ink-brush, chalk), `tones/` (7 moods: neutral, warm, dramatic, romantic, energetic, vintage, action), and `presets/` (3 shortcuts: ohmsha, wuxia, shoujo). New art × tone × layout system enables flexible combinations while presets preserve special rules for specific genres.

### Documentation
- `release-skills`: adds Step 5 (Check README Updates)—ensures README documentation stays in sync with code changes during releases.
- `README.md`, `README.zh.md`: updates kunge2013-comic documentation to reflect new `--art` and `--tone` options replacing `--style`.

## 1.15.2 - 2026-01-23

### Documentation
- `release-skills`: comprehensive SKILL.md rewrite—adds multi-language changelog support, .releaserc.yml configuration, dry-run mode, language detection rules, and section title translations for 7 languages.

## 1.15.1 - 2026-01-22

### Refactor
- `kunge2013-xhs-images`: restructures reference documents into modular architecture—reorganizes scattered files into `config/` (settings), `elements/` (visual building blocks), `presets/` (style definitions), and `workflows/` (process guides) directories for improved maintainability.

## 1.15.0 - 2026-01-22

### Features
- `kunge2013-xhs-images`: adds user preferences support via EXTEND.md—configure watermark (content, position, opacity), preferred style, preferred layout, and custom styles. New Step 0 checks for preferences at project (`.kunge2013-skills/`) or user (`~/.kunge2013-skills/`) level with first-time setup flow.

### Documentation
- `kunge2013-xhs-images`: adds three reference documents—`preferences-schema.md` (YAML schema), `watermark-guide.md` (position and opacity guide), `first-time-setup.md` (setup flow).

## 1.14.0 - 2026-01-22

### Fixes
- `kunge2013-post-to-x`: improves video ready detection for more reliable video posting (by @fkysly).

### Documentation
- `kunge2013-slide-deck`: comprehensive SKILL.md enhancement—adds slide count guidance (recommended 8-25, max 30), audience guidelines table with audience-specific principles, style selection principles with content-type recommendations, layout selection tips with common mistakes to avoid, visual hierarchy principles, content density guidelines (McKinsey-style high-density principles), color selection guide, typography principles with font recommendations (English and Chinese fonts with multilingual pairing), and visual elements reference (backgrounds, typography treatments, geometric accents).

## 1.13.0 - 2026-01-21

### Features
- `kunge2013-url-to-markdown`: new utility skill for fetching any URL via Chrome CDP and converting to clean markdown. Supports two capture modes—auto (immediate capture on page load) and wait (user-controlled capture for login-required pages).

### Improvements
- `kunge2013-xhs-images`: updates style recommendations—replaces `tech` references with `notion` and `chalkboard` for technical and educational content.

## 1.12.0 - 2026-01-21

### Features
- `kunge2013-post-to-x`: adds quote tweet support (by @threehotpot-bot).

### Refactor
- `kunge2013-post-to-x`: extracts shared utilities to `x-utils.ts`—consolidates Chrome detection, CDP connection, clipboard operations, and helper functions from `x-article.ts`, `x-browser.ts`, `x-quote.ts`, and `x-video.ts` into a single reusable module.

## 1.11.0 - 2026-01-21

### Features
- `kunge2013-image-gen`: new AI SDK-based image generation skill using official OpenAI and Google APIs. Supports text-to-image, reference images (Google multimodal), aspect ratios, and quality presets (`normal`, `2k`). Auto-detects provider based on available API keys.
- `kunge2013-slide-deck`: adds Layout Gallery with 24 layout types—10 slide-specific layouts (`title-hero`, `quote-callout`, `key-stat`, `split-screen`, `icon-grid`, `two-columns`, `three-columns`, `image-caption`, `agenda`, `bullet-list`) and 14 infographic-derived layouts (`linear-progression`, `binary-comparison`, `comparison-matrix`, `hierarchical-layers`, `hub-spoke`, `bento-grid`, `funnel`, `dashboard`, `venn-diagram`, `circular-flow`, `winding-roadmap`, `tree-branching`, `iceberg`, `bridge`).

### Documentation
- `README.md`, `README.zh.md`: adds kunge2013-image-gen documentation with usage examples, options table, and environment variables; adds Environment Configuration section for API key setup.

## 1.10.0 - 2026-01-21

### Features
- `kunge2013-post-to-x`: adds video posting support—new `x-video.ts` script for posting text with video files (MP4, MOV, WebM). Supports preview mode and handles video processing timeouts (by @fkysly).

## 1.9.0 - 2026-01-20

### Features
- `kunge2013-xhs-images`: adds `chalkboard` style—black chalkboard background with colorful chalk drawings for education and tutorial content.
- `kunge2013-comic`: adds `chalkboard` style—educational chalk drawings on black chalkboard for tutorials, explainers, and knowledge comics.

### Improvements
- `kunge2013-article-illustrator`, `kunge2013-cover-image`, `kunge2013-infographic`: updates `chalkboard` style with enhanced visual guidelines.

### Breaking Changes
- `kunge2013-xhs-images`: removes `tech` style (use `minimal` or `notion` for technical content).

### Documentation
- `README.md`, `README.zh.md`: adds style and layout preview galleries for xhs-images (9 styles, 6 layouts).

## 1.8.0 - 2026-01-20

### Features
- `kunge2013-infographic`: new skill for professional infographic generation with 20 layout types (bridge, circular-flow, comparison-table, do-dont, equation, feature-list, fishbone, funnel, grid-cards, iceberg, journey-path, layers-stack, mind-map, nested-circles, priority-quadrants, pyramid, scale-balance, timeline-horizontal, tree-hierarchy, venn) and 17 visual styles. Analyzes content, recommends layout×style combinations, and generates publication-ready infographics.

### Fixes
- `kunge2013-danger-gemini-web`: improves cookie validation by verifying actual Gemini session readiness instead of just checking cookie presence.

## 1.7.0 - 2026-01-19

### Features
- `kunge2013-comic`: adds `shoujo` style—classic shoujo manga style with large sparkling eyes, flowers, sparkles, and soft pink/lavender palette. Best for romance, coming-of-age, friendship, and emotional drama.

## 1.6.0 - 2026-01-19

### Features
- `kunge2013-cover-image`: adds `flat-doodle` style—bold black outlines, bright pastel colors, simple flat shapes with cute rounded proportions. Best for productivity, SaaS, and workflow content.
- `kunge2013-article-illustrator`: adds `flat-doodle` style—same visual aesthetic for article illustrations.

## 1.5.0 - 2026-01-19

### Features
- `kunge2013-article-illustrator`: expands style library to 20 styles—extracts styles to `references/styles/` directory and adds 11 new styles (`blueprint`, `chalkboard`, `editorial`, `fantasy-animation`, `flat`, `intuition-machine`, `pixel-art`, `retro`, `scientific`, `sketch-notes`, `vector-illustration`, `vintage`, `watercolor`).

### Breaking Changes
- `kunge2013-article-illustrator`: removes `tech`, `bold`, and `isometric` styles.
- `kunge2013-cover-image`: removes `bold` style (use `bold-editorial` for bold editorial content).

### Documentation
- `README.md`, `README.zh.md`: adds style preview gallery for article-illustrator (20 styles).

## 1.4.2 - 2026-01-19

### Documentation
- `kunge2013-danger-gemini-web`: adds supported browsers list (Chrome, Chromium, Edge) and proxy configuration guide.

## 1.4.1 - 2026-01-18

### Fixes
- `kunge2013-post-to-x`: supports multi-language UI selectors for X Articles (by @ianchenx).

## 1.4.0 - 2026-01-18

### Features
- `kunge2013-cover-image`: expands style library from 8 to 19 styles with 12 new additions—`blueprint`, `bold-editorial`, `chalkboard`, `dark-atmospheric`, `editorial-infographic`, `fantasy-animation`, `intuition-machine`, `notion`, `pixel-art`, `sketch-notes`, `vector-illustration`, `vintage`, `watercolor`.
- `kunge2013-slide-deck`: adds `chalkboard` style—black chalkboard background with colorful chalk drawings for education and tutorials.

### Breaking Changes
- `kunge2013-cover-image`: removes `tech` style (use `blueprint` or `editorial-infographic` for technical content).

### Documentation
- `README.md`, `README.zh.md`: updates style preview screenshots for cover-image and slide-deck.

## 1.3.0 - 2026-01-18

### Features
- `kunge2013-comic`: adds `wuxia` style—Hong Kong martial arts comic style with ink brush strokes, dynamic combat poses, and qi energy effects. Best for wuxia/xianxia and Chinese historical fiction.
- `kunge2013-comic`: adds style and layout preview screenshots for all 8 styles and 6 layouts in README.

### Refactor
- `kunge2013-comic`: removes `tech` style (replaced by `ohmsha` for technical content).

## 1.2.0 - 2026-01-18

### Features
- Session-independent output directories: each generation session creates a new directory (`<skill-suffix>/<topic-slug>/`), even for the same source file. Conflicts resolved by appending timestamp.
- Multi-source file support: source files now saved as `source-{slug}.{ext}`, supporting multiple inputs (text, images, files from conversation).

### Documentation
- `CLAUDE.md`: updates Output Path Convention with new session-independent directory structure and multi-source file naming.
- Multiple skills: updates file management sections to reflect new directory and source file conventions.
  - `kunge2013-slide-deck`, `kunge2013-article-illustrator`, `kunge2013-cover-image`, `kunge2013-xhs-images`, `kunge2013-comic`

## 1.1.0 - 2026-01-18

### Features
- `kunge2013-compress-image`: new utility skill for cross-platform image compression. Converts to WebP by default with PNG-to-PNG support. Uses system tools (sips, cwebp, ImageMagick) with Sharp fallback.

### Refactor
- Marketplace structure: reorganizes plugins into three categories—`content-skills`, `ai-generation-skills`, and `utility-skills`—for better organization.

### Documentation
- `CLAUDE.md`, `README.md`, `README.zh.md`: updates skill architecture documentation to reflect the new three-category structure.

## 1.0.1 - 2026-01-18

### Refactor
- Code structure improvements for better readability and maintainability.
- `kunge2013-slide-deck`: unified style reference file formats.

### Other
- Screenshots: converted from PNG to WebP format for smaller file sizes; added screenshots for new styles.

## 1.0.0 - 2026-01-18

### Features
- `kunge2013-danger-x-to-markdown`: new skill to convert X/Twitter posts and threads to Markdown format.

### Breaking Changes
- `kunge2013-gemini-web` renamed to `kunge2013-danger-gemini-web` to indicate potential risks of using reverse-engineered APIs.

## 0.11.0 - 2026-01-18

### Features
- `kunge2013-danger-gemini-web`: adds disclaimer consent check flow—requires user acceptance before first use, with persistent consent storage per platform.

## 0.10.0 - 2026-01-18

### Features
- `kunge2013-slide-deck`: expands style library from 10 to 15 styles with 8 new additions—`dark-atmospheric`, `editorial-infographic`, `fantasy-animation`, `intuition-machine`, `pixel-art`, `scientific`, `vintage`, `watercolor`.

### Breaking Changes
- `kunge2013-slide-deck`: removes 3 styles (`playful`, `storytelling`, `warm`); changes default style from `notion` to `blueprint`.

## 0.9.0 - 2026-01-17

### Features
- Extension support: all skills now support customization via `EXTEND.md` files. Check `.kunge2013-skills/<skill-name>/EXTEND.md` (project) or `~/.kunge2013-skills/<skill-name>/EXTEND.md` (user) for custom styles and configurations.

### Other
- `.gitignore`: adds `.kunge2013-skills/` directory for user extension files.

## 0.8.2 - 2026-01-17

### Refactor
- `kunge2013-danger-gemini-web`: reorganizes script architecture—moves modular files into `gemini-webapi/` subdirectory and updates SKILL.md with `${SKILL_DIR}` path references.

## 0.8.1 - 2026-01-17

### Refactor
- `kunge2013-danger-gemini-web`: refactors script architecture—consolidates 10 separate files into a structured `gemini-webapi/` module (TypeScript port of gemini_webapi Python library).

## 0.8.0 - 2026-01-17

### Features
- `kunge2013-xhs-images`: adds content analysis framework (`analysis-framework.md`, `outline-template.md`) for structured content breakdown and outline generation.

### Documentation
- `CLAUDE.md`: adds Output Path Convention (directory structure, backup rules) and Image Naming Convention (format, slug rules) to standardize image generation outputs.
- Multiple skills: updates file management conventions to use unified directory structure (`[source-name-no-ext]/<skill-suffix>/`).
  - `kunge2013-article-illustrator`, `kunge2013-comic`, `kunge2013-cover-image`, `kunge2013-slide-deck`, `kunge2013-xhs-images`

## 0.7.0 - 2026-01-17

### Features
- `kunge2013-comic`: adds `--aspect` (3:4, 4:3, 16:9) and `--lang` options; introduces multi-variant storyboard workflow (chronological, thematic, character-centric) with user selection.

### Enhancements
- `kunge2013-comic`: adds `analysis-framework.md` and `storyboard-template.md` for structured content analysis and variant generation.
- `kunge2013-slide-deck`: adds `analysis-framework.md`, `content-rules.md`, `modification-guide.md`, and `outline-template.md` references for improved outline quality.
- `kunge2013-article-illustrator`, `kunge2013-cover-image`, `kunge2013-xhs-images`: enhanced SKILL.md documentation with clearer workflows.

### Documentation
- Multiple skills: restructured SKILL.md files—moved detailed content to `references/` directory for maintainability.
- `kunge2013-slide-deck`: simplified SKILL.md, consolidated style descriptions.

## 0.6.1 - 2026-01-17

- `kunge2013-slide-deck`: adds `scripts/merge-to-pdf.ts` to export generated slides into a single PDF; docs updated with pptx/pdf outputs.
- `kunge2013-comic`: adds `scripts/merge-to-pdf.ts` to merge cover/pages into a PDF; docs clarify character reference handling (image vs text).
- Docs conventions: adds a “Script Directory” template to `CLAUDE.md`; aligns `kunge2013-danger-gemini-web` / `kunge2013-slide-deck` / `kunge2013-comic` docs to use `${SKILL_DIR}` in commands so agents can run scripts from any install location.

## 0.6.0 - 2026-01-17

- `kunge2013-slide-deck`: adds `scripts/merge-to-pptx.ts` to merge slide images into a PPTX and attach `prompts/` content as speaker notes.
- `kunge2013-slide-deck`: reshapes/expands the style library (adds `blueprint` / `bold-editorial` / `sketch-notes` / `vector-illustration`, and adjusts/replaces some older styles).
- `kunge2013-comic`: adds a `realistic` style reference.
- Docs: refreshes `README.md` / `README.zh.md`.

## 0.5.3 - 2026-01-17

- `kunge2013-post-to-x` (X Articles): makes image placeholder replacement more reliable (selection retry + verification; deletes via Backspace and verifies deletion before pasting), reducing mis-insertions/failures.

## 0.5.2 - 2026-01-16

- `kunge2013-danger-gemini-web`: adds `--sessionId` (local persisted sessions, plus `--list-sessions`) for multi-turn conversations and consistent multi-image generation.
- `kunge2013-danger-gemini-web`: adds `--reference/--ref` for reference images (vision input), plus stronger timeout handling and cookie refresh recovery.
- Docs: `kunge2013-xhs-images` / `kunge2013-slide-deck` / `kunge2013-comic` document session usage (reuse one `sessionId` per set) to improve visual consistency.

## 0.5.1 - 2026-01-16

- `kunge2013-comic`: adds creation templates/references (character template, Ohmsha guide, outline template) to speed up “characters → storyboard → generation”.

## 0.5.0 - 2026-01-16

- Adds `kunge2013-comic`: a knowledge-comic generator with `style × layout` and a full set of style/layout references for more stable output.
- `kunge2013-xhs-images`: moves style/layout details into `references/styles/*` and `references/layouts/*`, and migrates the base prompt into `references/base-prompt.md` for easier maintenance/reuse.
- `kunge2013-slide-deck` / `kunge2013-cover-image`: similarly split base prompt and style references into `references/`, reducing SKILL.md complexity and making style expansion easier.
- Docs: updates `README.md` / `README.zh.md` skill list and examples.

## 0.4.2 - 2026-01-15

- `kunge2013-danger-gemini-web`: updates description to clarify it as the image-generation backend for other skills (e.g. `cover-image`, `xhs-images`, `article-illustrator`).

## 0.4.1 - 2026-01-15

- `kunge2013-post-to-x` / `kunge2013-post-to-wechat`: adds `scripts/paste-from-clipboard.ts` to send a “real paste” keystroke (Cmd/Ctrl+V), avoiding sites ignoring CDP synthetic events.
- `kunge2013-post-to-x`: adds docs for X Articles/regular posts, and switches image upload to prefer real paste (with a CDP fallback).
- `kunge2013-post-to-wechat`: docs add script-location guidance and `${SKILL_DIR}` path usage for reliable agent execution.
- Docs: adds `screenshots/update-plugins.png` for the marketplace update flow.

## 0.4.0 - 2026-01-15

- Adds `kunge2013-` prefix to skill directories and updates marketplace paths/docs accordingly to reduce naming collisions.

## 0.3.1 - 2026-01-15

- `xhs-images`: upgrades docs to a Style × Layout system (adds `--layout`, auto layout selection, and a `notion` style), with more complete usage examples.
- `article-illustrator` / `cover-image`: docs no longer hard-code `gemini-web`; instead they instruct the agent to pick an available image-generation skill.
- `slide-deck`: docs add the `notion` style and update auto-style mapping.
- Tooling/docs: adds `.DS_Store` to `.gitignore`; refreshes `README.md` / `README.zh.md`.

## 0.3.0 - 2026-01-14

- Adds `post-to-wechat`: Chrome CDP automation for WeChat Official Account posting (image-text + full article), including Markdown → WeChat HTML conversion and multiple themes.
- Adds `CLAUDE.md`: repository structure, running conventions, and “add new skill” guidelines.
- Docs: updates `README.md` / `README.zh.md` install/update/usage instructions.

## 0.2.0 - 2026-01-13

- Adds new skills: `post-to-x` (real Chrome/CDP automation for posts and X Articles), `article-illustrator`, `cover-image`, and `slide-deck`.
- `xhs-images`: adds multi-style support (`--style`) with auto style selection and updates the base prompt (e.g. language follows input, hand-drawn infographic constraints).
- Docs: adds `README.zh.md` and improves `README.md` and `.gitignore`.

## 0.1.1 - 2026-01-13

- Marketplace refactor: introduces `metadata` (including `version`), renames the plugin entry to `content-skills` and explicitly lists installable skills; removes legacy `.claude-plugin/plugin.json`.
- Adds `xhs-images`: Xiaohongshu infographic series generator (outline + per-image prompts).
- `gemini-web`: adds `--promptfiles` to build prompts from multiple files (system/content separation).
- Docs: adds `README.md`.

## 0.1.0 - 2026-01-13

- Initial release: `.claude-plugin/marketplace.json` plus `gemini-web` (text/image generation, browser login + cookie cache).
