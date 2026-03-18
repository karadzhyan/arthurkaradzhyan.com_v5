# CLAUDE.md — arthurkaradzhyan.com

## Project

Personal website and analytical platform for Arthur Karadzhyan — California employment defense attorney. Next.js 15, React 19, static export to Vercel. No external UI libraries, no Tailwind, no state management libraries. Vanilla React + custom CSS.

## Build & Deploy

```bash
npm install
npx next build          # static export → out/
# Deploy: push to main → Vercel auto-deploys
```

There are no tests, no linter, and no CI pipeline. The build succeeding (`next build` exits 0) is the only quality gate right now.

## Architecture

- **Static site**: `next.config.js` sets `output: 'export'`. Every page is pre-rendered at build time.
- **Homepage** (`app/page.jsx`): Large client component (~102KB). Manages navigation, scroll tracking, section visibility, tool state, accordion expansion. All in one file.
- **Content pages**: SSG via `generateStaticParams()` pulling from data files. Routes: `/insights/[slug]`, `/cases/[slug]`, `/industries/[slug]`, `/tools/[slug]`, `/commentary/[slug]`.
- **Interactive tools** (`components/tools/`): 8 client components — PAGA Calc, Regular Rate Calc, Cap Qualifier, SOL Calc, Recoverability Checker, Derivative Mapper, Decision Tree, Wage Statement Checker.
- **Data layer** (`data/`): Plain JS files exporting arrays of objects. Content lives here, not in a CMS.
- **Styling**: Single `app/globals.css` file. Fonts: Libre Baskerville (serif, body) + Outfit (sans-serif, UI).
- **SEO**: Schema.org JSON-LD (Attorney type) in layout, `sitemap.xml`, `robots.txt`.

## Content workflow

Adding content (e.g., new commentary, case analysis, insight):
1. Add entry to the relevant `data/*.js` file
2. Update `public/sitemap.xml` with the new URL
3. Commit and push

## Conventions

- No TypeScript. All files are `.jsx` or `.js`.
- No component library. UI is hand-built with inline styles and `globals.css` classes.
- Client components use `"use client"` directive. Server components are the default.
- Data files export plain arrays — no schemas, no validation, no types.
- Zero external dependencies beyond React and Next.js. Keep it that way unless there's a strong reason.
- The site is a professional presence — tone is authoritative, precise, and understated. No casual language in content.

## gstack

Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /review, /ship, /browse, /qa, /qa-only, /setup-browser-cookies, /retro, /document-release.
If skills aren't working, run: cd ~/.claude/skills/gstack && ./setup
