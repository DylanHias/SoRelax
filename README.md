# So'Relax — Massagetherapie Website

Production marketing site for So'Relax, a solo massage therapy practice in
Aarschot, Belgium. Built with Next.js 15 (static export), Tailwind CSS v4,
TypeScript strict. See `project-brief.md` for the full spec and `CLAUDE.md`
for the non-obvious constraints that keep this codebase aligned with the
design direction.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export to ./out
pnpm typecheck
pnpm lint
```

Node 20+ required (see `.nvmrc`). Package manager pinned to `pnpm@10`.

## Project layout

```
src/
  app/                    # 10 routes (home + 9 pages) + sitemap, robots
  components/
    ui/                   # Button, Card, Container, Section, PullQuote, Accordion, Icons…
    sections/             # Home-page sections (Hero, Specializations, …)
    Nav.tsx / Footer.tsx / FloatingBookingButton.tsx
  content/                # Placeholder data that matches the future TinaCMS schema
    treatments.ts
    testimonials.ts
    settings.ts
  lib/
    fonts.ts              # next/font self-hosted Fraunces + Inter
    site.ts               # siteConfig, nav structure
    format.ts
```

Design tokens live in **both** `src/app/globals.css` (as CSS custom properties
under `:root`) **and** the Tailwind `@theme inline` block in the same file.
Don't add a token to one without the other.

## Environment

Copy `.env.example` → `.env.local` and fill in what you have. Everything is
optional during M1 — unset variables fall back to reasonable placeholders so
the site still builds and renders.

| Variable | Needed for | Phase |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs in metadata, sitemap, OG tags | Always |
| `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN` | TinaCMS admin + reads | M2 |
| `NEXT_PUBLIC_IUBENDA_SITE_ID`, `NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID` | Privacy + cookie policy embeds, cookie banner | M3 |
| `NEXT_PUBLIC_SALONIZED_WIDGET_URL`, `NEXT_PUBLIC_SALONIZED_GIFTCARD_URL` | Booking widget, gift-card CTA | M3 (moves to CMS) |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL` | Footer social links | M3 (moves to CMS) |
| `RESEND_API_KEY`, `CONTACT_FORM_TO` | Contact-form delivery | M3 (server-only) |

## Content

- **Dutch only** (`nl-BE`). Slugs are Dutch (`/over-mij`, `/behandelingen`, …).
  The only English text is the intentional accent tagline `Your me-time
  starts with... me` on the hero — do not translate or multiply it.
- Data files in `src/content/` mirror the TinaCMS schemas in brief §6 so M2
  can swap the reader functions (`getTreatments`, `getTestimonials`,
  `getSettings`) without touching any consumer code.
- Hardcoded content (per brief §7) lives directly in components/pages and
  was migrated from `websitecontent.md`. The old Cupping article is
  intentionally discarded.

## What's done (M1)

- Next.js 15 + Tailwind v4 scaffold with `output: 'export'`
- Design system (palette, radii, Fraunces + Inter, reduced-motion support)
- Core UI primitives and home-page sections
- All 10 routes rendered with migrated content
- `sitemap.ts`, `robots.ts`, per-page `generateMetadata`
- Contact form UI (no backend yet — submits to an in-memory stub)
- Static map with explicit "load interactive map" opt-in

## What's next (out of scope for M1)

- **M2 — TinaCMS.** Wire the 3 collections (`treatments`, `testimonials`,
  `settings`), move the `src/content/*.ts` placeholders into
  `content/**/*.json`, install `/admin`, configure Tina Cloud, set up the
  commit → Cloudflare rebuild webhook.
- **M3 — Third-party integrations.** Salonized widgets (lazy-load: floating
  button on idle/interaction, inline on `/afspraak`, per-service CTAs);
  iubenda privacy/cookie policy + consent banner gating Salonized; contact
  form → Cloudflare Worker + Resend (preferred) or Formspree.
- **M4 — SEO, performance, a11y, deploy.** JSON-LD (`LocalBusiness`,
  `Service`, `Person`), image optimization pass, axe + Lighthouse audits
  against brief §8 (mobile ≥ 95 Perf/A11y/BP, SEO = 100, LCP < 2.0s),
  Cloudflare Pages + custom domain + TinaCMS → build webhook, Dutch editor
  guide for Tanja.

## Open items blocking full completion (brief §13)

Flagged as placeholders or stubs in the current code — needs client input:

- **Photography.** Hero and about-page imagery are currently abstract
  gradient placeholders (per brief §5: warm, abstract, *not* massage stock).
  Replace with real photos of Tanja and the salon interior.
- **Salonized widget URLs.** Main booking widget, gift-card checkout, and
  per-service custom widgets. Set env vars for now; migrate to
  `settings.json` in M2.
- **iubenda account + policy IDs.** Privacy policy site ID + cookie policy
  ID. Until these are configured, `/privacy` and `/cookies` show a
  placeholder and the cookie banner is absent.
- **Social handles.** Instagram and Facebook URLs (optional).
- **Opening hours.** Currently seeded Mon–Fri 09:00–18:00, Sat on request,
  Sun closed — confirm with Tanja.
- **Gift-card payment flow.** If Tanja doesn't configure Mollie/Stripe
  inside Salonized, `/cadeaubon` falls back to a contact CTA — already
  handled by the current code (env-var switch).
- **Domain.** `sorelaxmassage.be` registered and DNS pointing to Cloudflare
  Pages.
- **`sorelaxmassage.be` favicon and OG image.** `public/favicon.ico` is the
  Next.js default; replace with a real favicon set + 1200×630 OG image.

## Deploy (coming in M4)

Target: Cloudflare Pages (static hosting on the free tier, EU edge). Build
command `pnpm build`, output directory `out`. Custom domain
`sorelaxmassage.be`. TinaCMS will be configured to call a Cloudflare build
webhook so that content edits rebuild the site in ~60–90 s.

## Conventions

- **Dutch throughout** — field labels, form errors, slugs, `<html lang="nl-BE">`.
- **No pill buttons**, 8 px / 16 px / 24 px radius scale, borders over shadows.
- **Performance**: `next/font` self-hosts Fraunces + Inter; no client-side
  JS frameworks beyond React; `output: 'export'` → plain static files.
- **Accessibility**: every page has a skip link, nav is keyboard-reachable,
  `prefers-reduced-motion` is respected via `globals.css`.
