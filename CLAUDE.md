# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

Milestones M1–M3 are done (scaffold + design system, TinaCMS with 3 collections, Salonized + cookie consent). M4 (SEO/perf/a11y pass and Cloudflare Pages deploy) is next. See `README.md` for the current state per milestone.

Source-of-truth documents:

- `project-brief.md` — **authoritative spec**. Tech stack, page requirements, design system, CMS schema, SEO/perf budgets, build order. Read it before making architectural decisions. Where the brief and the shipped code disagree, the code wins — flag the delta and update the brief in the same change.
- `websitecontent.md` — raw content from the old site (Dutch). Source for the TinaCMS seeds and the hardcoded pages per the brief's §7 content-migration table.

When scaffolding net-new work, follow the build order in §12 of the brief.

## Non-obvious constraints that are easy to violate

**Language: Dutch only.** All UI strings, form labels, errors, TinaCMS field labels, and page slugs are Dutch (`nl-BE`). English phrases appear only as intentional accent taglines (e.g. *"Your me-time starts with... me"*) — do not translate these and do not add English elsewhere. Slugs are Dutch: `/over-mij`, `/behandelingen`, `/afspraak`, `/cadeaubon`, `/algemene-voorwaarden`.

**Static export, not edge runtime.** Use `output: 'export'` in `next.config`. Do not reach for `@cloudflare/next-on-pages`, SSR, route handlers for dynamic data, or ISR — the brief rejects them explicitly (§2). There is no contact form backend — all inquiries route through Salonized or direct phone/email.

**No contact form.** `/contact` is purely informational (address, phone, email, opening hours) plus a Salonized booking CTA. Don't reintroduce a form component, Resend/Formspree endpoint, or Cloudflare Worker for form submissions — bookings go through Salonized, everything else is phone/email.

**Design direction is "therapist, not spa".** Palette, type, and imagery in §5 are deliberate. Do not introduce candles / stones / lotus / soft-focus massage stock; do not swap Fraunces+Inter for generic "wellness" fonts; no pill buttons; borders over shadows. Tokens (`#FAF7F2`, `#2F5D5A`, etc.) must be exposed as both Tailwind theme tokens **and** CSS custom properties.

**Salonized is external-only.** All booking CTAs open Salonized in a new tab — no in-app iframe, modal, or embed script. This sidesteps the "Salonized tanks LCP" problem and means there's nothing third-party to gate on consent. If you're ever tempted to inline-embed the widget, don't — and if you must, defer load until interaction AND gate behind cookie consent.

**Cookie consent is DIY, not iubenda.** A home-grown client-side banner in `CookieConsent.tsx` stores `{ necessary, analytics, marketing }` in localStorage under `sorelax-consent` (versioned) and emits `sorelax-consent-change` events. Use `useConsent()` before loading any future third-party script that sets cookies or reads device info. The privacy and cookie policy pages are hardcoded Dutch copy in `src/app/privacy/` and `src/app/cookies/` — have them lawyer-reviewed before launch. Do not reintroduce iubenda/Cookiebot/similar without a real reason.

**TinaCMS owns exactly three collections.** `treatments`, `testimonials`, `settings` (schemas in §6). Don't add more fields or collections "for flexibility" — every field is a maintenance tax for a solo non-technical editor. Anything outside those three is hardcoded (see §7 migration table) even if it looks editable.

**No blog, no custom booking, no voucher checkout, no multilingual, no accounts, no newsletter, no chatbot, no A/B** (§1). If a task seems to imply one of these, confirm before building.

**Per-treatment pages are intentionally absent.** All 8 treatments live on a single `/behandelingen` page with accordion/expand cards. Do not generate `/behandelingen/[slug]` routes.

**Accessibility and performance are acceptance criteria, not aspirations.** WCAG 2.1 AA, Lighthouse mobile ≥95 across the board, SEO=100, LCP<2.0s, CLS<0.05, JS budget <100KB on home excluding deferred Salonized (§8, §10). Verify before declaring work done.

## Content migration rule of thumb

If content appears in `websitecontent.md` and the brief's §7 table marks it "Hardcoded", put it directly in the component/page — do not wire it through TinaCMS. If it's one of the three CMS collections, seed it from `websitecontent.md` into the Tina JSON file. The "Cupping article" is discarded (no blog).

## Open items blocking full completion

Listed in §13 — real Salonized widget URLs, social handles, real photos, domain DNS, giftcard payment decision, lawyer review of the hardcoded privacy + cookie policies. Stub these with env vars / placeholders and flag in the README; do not invent values.
