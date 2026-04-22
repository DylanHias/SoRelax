# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

Greenfield. No code yet — only two source-of-truth documents:

- `project-brief.md` — **authoritative spec**. Tech stack, page requirements, design system, CMS schema, SEO/perf budgets, build order. Read it before making architectural decisions.
- `websitecontent.md` — raw content from the old site (Dutch). Source for migration into TinaCMS seeds and hardcoded pages per the brief's §7 content-migration table.

When scaffolding, follow the build order in §12 of the brief.

## Non-obvious constraints that are easy to violate

**Language: Dutch only.** All UI strings, form labels, errors, TinaCMS field labels, and page slugs are Dutch (`nl-BE`). English phrases appear only as intentional accent taglines (e.g. *"Your me-time starts with... me"*) — do not translate these and do not add English elsewhere. Slugs are Dutch: `/over-mij`, `/behandelingen`, `/afspraak`, `/cadeaubon`, `/algemene-voorwaarden`.

**Static export, not edge runtime.** Use `output: 'export'` in `next.config`. Do not reach for `@cloudflare/next-on-pages`, SSR, route handlers for dynamic data, or ISR — the brief rejects them explicitly (§2). The contact form is the one exception and lives in a separate Cloudflare Worker (or Formspree), not a Next.js route.

**Design direction is "therapist, not spa".** Palette, type, and imagery in §5 are deliberate. Do not introduce candles / stones / lotus / soft-focus massage stock; do not swap Fraunces+Inter for generic "wellness" fonts; no pill buttons; borders over shadows. Tokens (`#FAF7F2`, `#2F5D5A`, etc.) must be exposed as both Tailwind theme tokens **and** CSS custom properties.

**Salonized must be deferred.** The third-party booking script tanks LCP if eager-loaded. Load the floating button only on first interaction or ~3s idle; load the inline widget on `/afspraak` via interaction/scroll. All Salonized scripts must be gated behind iubenda cookie consent — do not load them pre-consent.

**TinaCMS owns exactly three collections.** `treatments`, `testimonials`, `settings` (schemas in §6). Don't add more fields or collections "for flexibility" — every field is a maintenance tax for a solo non-technical editor. Anything outside those three is hardcoded (see §7 migration table) even if it looks editable.

**No blog, no custom booking, no voucher checkout, no multilingual, no accounts, no newsletter, no chatbot, no A/B** (§1). If a task seems to imply one of these, confirm before building.

**Per-treatment pages are intentionally absent.** All 8 treatments live on a single `/behandelingen` page with accordion/expand cards. Do not generate `/behandelingen/[slug]` routes.

**Accessibility and performance are acceptance criteria, not aspirations.** WCAG 2.1 AA, Lighthouse mobile ≥95 across the board, SEO=100, LCP<2.0s, CLS<0.05, JS budget <100KB on home excluding deferred Salonized (§8, §10). Verify before declaring work done.

## Content migration rule of thumb

If content appears in `websitecontent.md` and the brief's §7 table marks it "Hardcoded", put it directly in the component/page — do not wire it through TinaCMS. If it's one of the three CMS collections, seed it from `websitecontent.md` into the Tina JSON file. The "Cupping article" is discarded (no blog).

## Open items blocking full completion

Listed in §13 — real Salonized widget URLs, iubenda IDs, social handles, real photos, domain DNS, giftcard payment decision. Stub these with env vars / placeholders and flag in the README; do not invent values.
