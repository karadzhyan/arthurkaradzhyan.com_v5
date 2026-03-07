# arthurkaradzhyan.com

Personal website and analytical platform for Arthur Karadzhyan — California employment defense attorney specializing in PAGA representative actions, wage-and-hour class actions, and workplace investigations.

## Project Structure

```
app/
  layout.jsx                    — Root layout (fonts, metadata, JSON-LD)
  globals.css                   — All CSS
  page.jsx                      — Main landing page (client component)
  insights/[slug]/
    page.jsx                    — 12 publication pages (SSG)
  cases/[slug]/
    page.jsx                    — 12 case law analysis pages (SSG)
  industries/[slug]/
    page.jsx                    — 6 industry intelligence pages (SSG)
  tools/[slug]/
    page.jsx                    — 8 interactive tool pages (SSG + client)
    ToolPageClient.jsx          — Client component wrapper for tools
  commentary/
    page.jsx                    — Commentary index (reverse chronological)
    [slug]/
      page.jsx                  — Individual commentary pieces (SSG)
components/
  S.jsx                         — Outfit font helper
  Counter.jsx                   — Animated counter
  Typer.jsx                     — Typewriter text
  tools/                        — 8 interactive tools ("use client")
    PagaCalc.jsx                — Combined Exposure Estimator
    RegRateCalc.jsx             — Regular Rate Calculator
    CapQualifier.jsx            — Penalty Cap Qualifier
    SOLCalc.jsx                 — Statute of Limitations Calculator
    RecoverCheck.jsx            — Recoverability Checker
    DerivativeMapper.jsx        — Derivative Penalty Mapper
    DecisionTree.jsx            — PAGA Reform Decision Tree
    WageStmtCheck.jsx           — Wage Statement Compliance Checker
data/
  insights.js                   — 12 publications with slugs
  caseLaw.js                    — 12 case law analyses with slugs + previews
  industries.js                 — 6 industry profiles with full content
  tools.js                      — 8 tool metadata, descriptions, cross-refs
  commentary.js                 — Commentary pieces (growing over time)
  slugify.js                    — URL slug generator
public/
  robots.txt                    — Crawler directives
  sitemap.xml                   — 44 URLs for search engine indexing
```

## Pages Generated (47 total)

| Route | Count | Type |
|-------|-------|------|
| `/` | 1 | Homepage |
| `/insights/[slug]` | 12 | Publications |
| `/cases/[slug]` | 12 | Case law analyses |
| `/industries/[slug]` | 6 | Industry intelligence |
| `/tools/[slug]` | 8 | Interactive tools |
| `/commentary` | 1 | Commentary index |
| `/commentary/[slug]` | 4 | Commentary pieces |

## Deployment

Static export via `next build` → `out/` directory. Deploy to Vercel via Git push.

```bash
npm install
npx next build
```

## Adding New Commentary

1. Add entry to `data/commentary.js` with title, date, summary, content, tags, and related cross-references
2. Regenerate `public/sitemap.xml` (or update manually)
3. Commit and push to deploy
