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

- **Static site**: `next.config.js` sets `output: 'export'`. All 57 pages are pre-rendered at build time.
- **Homepage** (`app/page.jsx`): Slim landing page with preview cards linking to dedicated section pages. Client component for Counter animation and IntersectionObserver on stats.
- **Index pages**: `/tools`, `/insights`, `/cases`, `/industries`, `/matters`, `/about`, `/resources` — server components showing full content grids. Each links to individual sub-pages.
- **Content sub-pages**: SSG via `generateStaticParams()`. Routes: `/insights/[slug]`, `/cases/[slug]`, `/industries/[slug]`, `/tools/[slug]`, `/commentary/[slug]`, `/resources/[slug]`.
- **Shared components**: `SiteNav` (client, sticky nav with mobile hamburger) and `SiteFooter` (client, includes privacy modal) used across all pages.
- **Interactive tools** (`components/tools/`): 8 client components loaded only on `/tools/[slug]` pages, not on homepage.
- **Data layer** (`data/`): Plain JS files exporting arrays — `insights.js`, `caseLaw.js`, `industries.js`, `tools.js`, `commentary.js`, `matters.js`, `resources.js`. Content lives here, not in a CMS.
- **Styling**: Single `app/globals.css` file. Mobile-first responsive with breakpoints at 480px, 768px, 900px. Fonts: Libre Baskerville (serif, body) + Outfit (sans-serif, UI).
- **SEO**: Schema.org JSON-LD (Attorney type) in layout, `sitemap.xml` with all routes, `robots.txt`. Each index page has `generateMetadata`.

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
