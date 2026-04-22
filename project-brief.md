# Project Brief — So'Relax Massagetherapie Website

## 1. Context & Goal

Build a production-ready marketing website for **So'Relax**, a solo massage therapy practice in Aarschot, Belgium, owned by Tanja (certified pain coach, BMF-recognized therapist). The site positions her as a **credible therapist specializing in chronic pain** — not as a luxury spa.

**Primary business goals (priority order):**
1. Convert visitors into booked appointments via embedded Salonized widget.
2. Establish trust through credentials, specializations, and client testimonials.
3. Allow Tanja (non-technical) to update **prices, testimonials, and opening hours** via a simple admin UI.
4. Rank for local Dutch-language search ("massage Aarschot", "pijncoach", "fibromyalgie massage", etc.).

**Explicitly out of scope (do not build):**
- No blog (removed — she won't maintain it).
- No custom booking system (Salonized handles it).
- No custom gift voucher checkout (Salonized handles it via external link).
- No symptom checker (outbound link to pijngids.nl only).
- No multilingual support (Dutch only; keep existing English slogans as accent phrases).
- No user accounts, newsletters, chatbots, or A/B testing.

---

## 2. Tech Stack (fixed)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router, TypeScript strict) | Static-first |
| Output | `output: 'export'` (fully static) | No SSR needed — simpler Cloudflare deploy |
| Styling | **Tailwind CSS v4** | Custom tokens, see §5 |
| CMS | **TinaCMS** (Tina Cloud free tier) | Git-backed, edits 3 collections only |
| Hosting | **Cloudflare Pages** | Free tier, EU edge |
| Booking | **Salonized** embed | Inline on `/afspraak`, floating button sitewide |
| Gift vouchers | **Salonized giftcard widget** | External link only |
| Legal | Hardcoded Dutch copy | Privacy + Cookie Policy on `/privacy` and `/cookies`, lawyer-reviewed before launch |
| Cookie consent | **DIY client-side banner** | GDPR-compliant, localStorage-backed, 3 categories (noodzakelijk / analyse / marketing) |
| Analytics | **Cloudflare Web Analytics** | Free, cookieless, no banner needed for it |
| Forms | **Cloudflare Workers + Resend** or **Formspree** free tier | Contact form only |
| Fonts | `next/font` self-hosted | See §5 |

**Why static export instead of `@cloudflare/next-on-pages`:**
Without a blog, SSR, or dynamic data from a live CMS, there's no benefit to the edge runtime. Static export → plain HTML/CSS/JS → Cloudflare CDN → fastest and simplest. Content rebuilds are triggered by TinaCMS commits via a Cloudflare build webhook.

**TinaCMS caveat to know upfront:**
Tina Cloud free tier = 2 users, 1000 docs, no branching, may change. For a solo therapist this is fine indefinitely. If free tier ever becomes restrictive, fallback is Decap CMS (fully free, git-based, clunkier UI). Don't self-host Tina — operational cost isn't worth it for this scale.

---

## 3. Site Structure

```
/                        Home
/over-mij                About Tanja
/behandelingen           All treatments (therapeutic + relaxation)
/afspraak                Booking page (inline Salonized widget)
/cadeaubon               Gift voucher info → external Salonized link
/contact                 Contact info + form + map
/algemene-voorwaarden    Terms
/privacy                 Privacy Policy (hardcoded)
/cookies                 Cookie Policy (hardcoded) + "Cookie-instellingen" button
/admin                   TinaCMS admin (auth-protected)
```

**Floating Salonized booking button** appears on every public page except `/admin` and legal pages.

**No individual `/behandelingen/[slug]` pages** — everything fits on one treatments page with expandable cards. Simpler, better for a small service list, no SEO loss for 8 services.

---

## 4. Page-by-Page Requirements

### 4.1 Home (`/`)

Sections in order:

1. **Hero** — Full viewport minus header. Background: soft warm abstract imagery (stock/AI — clay, linen, morning light; NOT massage stock photos). Overlay: name, English accent tagline *"Your me-time starts with... me"* (italic serif), Dutch subheadline ("Massagetherapie & pijncoaching in Aarschot"), primary CTA "Afspraak maken" → `/afspraak`, secondary "Ontdek behandelingen" → `/behandelingen`.

2. **Credentials strip** — Horizontal band: "Erkend Therapeut bij BMF" · "Gecertificeerd pijncoach" · "Natuurlijke CHI-producten" · "Behandeling op maat". Icon + label.

3. **About teaser** — Two-column: photo of Tanja (client-provided) + short intro ending in link to `/over-mij`. Text: first two paragraphs of "Over mezelf" from source.

4. **Specializations** — Three cards: "Spieren & gewrichten" / "Nek, schouder & rug" / "Fibromyalgie". Brief description + anchor link to the relevant treatment on `/behandelingen`. **Lead with this** — it's her differentiator.

5. **Treatments preview** — Grouped (therapeutisch / ontspanning) with names and starting prices. Pulled from TinaCMS. Links to full treatments page.

6. **Waarom massage?** — Editorial section with content from source ("Massagetherapie helpt niet alleen om pijn..."). Styled as pull-quote + body, not sales pitch.

7. **Testimonials** — 4-5 reviews in a clean grid or simple carousel. Editable in TinaCMS.

8. **CTA band** — "Klaar om verlichting te vinden?" + booking button.

9. **Footer** — see §4.9.

### 4.2 Over mij (`/over-mij`)

- Full "Welkom bij So'Relax" text (hardcoded — she won't edit).
- Credentials list.
- Photo(s) of Tanja and/or salon.
- Pull quote: *"Als we onze adem vrijlaten, ontspannen we onze emoties en laten we spanningen in ons lichaam los."*
- CTA to `/afspraak`.

### 4.3 Behandelingen (`/behandelingen`)

Two sections, therapeutic first (her positioning):

**Therapeutische massages:**
- Rug-, nek-, schoudermassage — €55
- Voetreflexologie — €70
- Deep tissue of Cupping — vanaf €45
- Lymfedrainage / Cellulite / Fibromassage — vanaf €40
- Triggerpoints — vanaf €45

**Ontspanningsmassages:**
- Zweedse massage — vanaf €70
- Hotstone massage — €95
- Balinese / Swastha massage — €80

Each as a card with: name, short description, price, indications. Expandable for longer detail (accordion or inline reveal — no separate pages). Per-card "Boek nu" CTA using Salonized custom widget link for that specific service where possible.

Below the treatments: link-out card for "Pijnklachten? Zoek op pijngids.nl →" linking to https://www.pijngids.nl/ (new tab, `rel="noopener"`).

### 4.4 Afspraak (`/afspraak`)

- Short intro paragraph.
- **Inline Salonized booking widget**, full-width, min-height 700px.
- Practical info below: address, hours (from CMS), cancellation policy excerpt.

### 4.5 Cadeaubon (`/cadeaubon`)

- Explanation of vouchers.
- 2-year validity note.
- CTA → Salonized giftcard widget URL (external). Tanja configures Mollie/Stripe inside Salonized herself.
- Note: if Tanja doesn't set up payments, this page becomes a "Neem contact op" CTA to email her — build it so switching the CTA URL is trivial.

### 4.6 Contact (`/contact`)

- Address: Rillaarse Baan 398, 3200 Aarschot (clickable → maps)
- Phone: 0488 09 75 09 (`tel:`)
- Email: info@sorelaxmassage.be (`mailto:`)
- BTW: BE 1001 031 585
- Static map image by default (no JS, no cookies). Optional "Toon interactieve kaart" button loads Google Maps iframe on click.
- Simple contact form (name, email, message) → Cloudflare Worker + Resend or Formspree.
- Opening hours (from CMS).
- Social links (placeholder — client to provide).

### 4.7 Algemene Voorwaarden (`/algemene-voorwaarden`)

Full content from source's "Reservaties / Betaalmethoden / Cadeaubonnen / Hygiëne / Gezondheid / Eten & Drinken / Respect". Hardcoded — she won't edit.

### 4.8 Privacy & Cookies

Pages contain hardcoded Dutch policy text reflecting what the site actually does: contact form, Salonized redirect (external), Cloudflare Web Analytics (cookieless), TinaCMS, Resend. The baseline copy in `src/app/privacy/` and `src/app/cookies/` must be reviewed by a Belgian lawyer before launch. `/cookies` also exposes a "Cookie-instellingen openen" button wired to `openCookiePreferences()`.

### 4.9 Footer (all pages)

- Logo + short tagline
- Quick links column
- Contact column (address, phone, email, BTW)
- Social icons
- Opening hours (from CMS)
- Legal links (Privacy, Cookies, AV)
- Subtle "Website door [X]" credit (optional)

---

## 5. Design System (Direction B — "Therapist, not Spa")

### Positioning intent

Her reviews emphasize competence ("gouden handen", "pijn onder controle", "professioneel") — not ambiance. Design must convey **clinical calm**: credible, warm, precise. Think high-end physiotherapy practice crossed with a well-designed editorial brand. Avoid: candles, rose petals, stone stacks, soft-focus hands, lotus flowers, generic "zen" clichés.

### Color palette

```
Background:       #FAF7F2  (warm ivory)
Surface:          #FFFFFF
Text primary:     #1F2A2E  (deep teal-black)
Text secondary:   #5C6A6E
Border / divider: #E5DFD4
Accent primary:   #2F5D5A  (deep teal — trust, calm, competence)
Accent warm:      #C87D5A  (muted clay — sparingly, for CTAs on dark sections)
Success / tag:    #7B9E89  (muted sage)
```

Expose as Tailwind theme tokens AND CSS custom properties.

### Typography

- **Display / Headings:** `Fraunces` (variable, self-hosted via next/font), weights 400–600. Used for h1–h3, pull quotes, English accent phrases.
- **Body:** `Inter` (variable, self-hosted), weights 400/500/600. Body 16–17px, 1.65 line-height.
- **Pull-quotes:** Fraunces italic, 1.5–2× body size, generous margin.

### Layout principles

- Max content width 1200px; body text columns max 680px.
- Vertical rhythm ≥ 96px between major sections on desktop.
- Symmetric grid on marketing pages (trust signal), slight asymmetry only in hero.
- Rounded corners: 8px small, 16px cards, 24px hero imagery. No pill buttons.
- Borders over shadows for separation. Subtle shadow only: `0 1px 2px rgba(0,0,0,0.04)`.
- Imagery: warm-toned, soft contrast, abstract textures (linen, clay, plaster, warm light) over literal massage scenes.

### Motion

- Respect `prefers-reduced-motion`.
- Subtle fade/rise on scroll for section entrances (Intersection Observer, no heavy lib).
- Button hover: 150ms color transition, no scale transforms.
- No parallax, no autoplaying video.

### Accessibility (non-negotiable)

- WCAG 2.1 AA.
- Verify accent teal on ivory contrast.
- Keyboard nav, skip link, visible focus rings.
- Image alt text required in TinaCMS schema.
- Dutch form labels and error messages.

---

## 6. TinaCMS Configuration

Three collections only. Keep schema minimal — every extra field is a maintenance tax.

### `treatments.json` (single file, ordered array)

```ts
{
  treatments: [
    {
      id: "rug-nek-schouder",
      name: string,
      category: "therapeutic" | "relaxation",
      shortDescription: string,   // max ~200 chars
      longDescription: string,    // rich text, optional
      indications: string[],      // "goed voor" tags
      priceAmount: number,
      priceType: "from" | "fixed",
      duration: string,           // e.g. "60 min"
      salonizedLink: string,      // per-service Salonized widget URL
      order: number
    }
  ]
}
```

Seed with the 8 treatments from §4.3.

### `testimonials.json` (single file, ordered array)

```ts
{
  testimonials: [
    {
      clientName: string,
      body: string,
      featured: boolean,          // show on home
      order: number
    }
  ]
}
```

Seed with 6 testimonials from source (Brigitte, Yanne, Cliff, Karine, Birgitta, Roger).

### `settings.json` (single-document collection)

```ts
{
  openingHours: [
    { day: "Maandag", hours: "09:00 – 18:00" | "Gesloten" },
    // ... seven days
  ],
  salonizedOpenWidgetUrl: string,
  salonizedGiftcardUrl: string,
  socialLinks: {
    instagram?: string,
    facebook?: string
  }
}
```

### TinaCMS setup

- Deploy admin at `/admin` (Tina's Next.js integration).
- Tina Cloud free tier, GitHub OAuth for auth.
- Tanja = editor role. Developer = admin.
- Git commits on save → Cloudflare Pages deploy webhook → site rebuilds in ~60-90s.
- Preview mode enabled so Tanja sees changes before publishing.

### Editor UX notes (important)

- Field labels in **Dutch** in the Tina admin UI.
- Clear help text under each field ("Prijs vanaf of vaste prijs?", "Laat uit op homepagina?").
- Validation: price > 0, required fields marked.
- Don't expose schema fields she doesn't need (no `id`, `order` as drag-reorder not number input).

---

## 7. Content Migration

All source content from `websitecontent.md` migrated during build:

| Content | Destination |
|---|---|
| "Welkom bij So'Relax" intro | Hardcoded in `/over-mij` + homepage component |
| 8 treatments with prices | `treatments.json` seed |
| 6 testimonials | `testimonials.json` seed |
| Algemene Voorwaarden text | Hardcoded in `/algemene-voorwaarden` |
| Contact details (address, phone, email, BTW) | Hardcoded in footer component and `/contact` |
| Opening hours | `settings.json` seed |
| Pull quote about breath | Hardcoded on `/over-mij` |
| Cupping article | **Discarded** (no blog) |

Content that's hardcoded can still be changed later — she'd just ask the developer. Matches reality.

---

## 8. SEO & Performance

### SEO

- `<html lang="nl-BE">`.
- Unique metadata per page via Next.js `generateMetadata`.
- OG + Twitter card metadata.
- JSON-LD:
  - `LocalBusiness` on home and `/contact` (address, hours, geo, phone, priceRange).
  - `Service` for each treatment (inline on treatments page).
  - `Person` for Tanja on `/over-mij`.
- `sitemap.xml` generated at build.
- `robots.txt` allowing all, pointing to sitemap.
- Canonical URLs on every page.
- Target keywords (integrate naturally, don't stuff):
  - "massage Aarschot"
  - "massagetherapie Aarschot"
  - "pijncoach Vlaams-Brabant"
  - "fibromyalgie massage"
  - "deep tissue massage Aarschot"
  - "rug- en nekmassage"

### Performance budget

- Lighthouse mobile: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- LCP < 2.0s, CLS < 0.05, INP < 150ms.
- Max 2 web font files (one variable for each family).
- **Defer Salonized widget script** — load only on interaction or when user scrolls near a booking CTA. Third-party script eager-loaded will tank LCP.
- `next/image` with proper `sizes` everywhere.
- Total JS budget on home: < 100KB compressed (excluding deferred Salonized).

---

## 9. Third-Party Integrations

### Salonized (external-only)
- **All booking CTAs open Salonized in a new tab.** No in-app iframe, modal, or embed script. This is a deliberate simplification: it sidesteps the LCP cost of their embed and leaves nothing third-party to gate on consent.
- **Per-treatment CTAs:** `BookingButton` resolves per-service `salonizedLink` from the CMS when provided, else the default `salonizedOpenWidgetUrl`.
- **Giftcards:** external link from `/cadeaubon` to `salonizedGiftcardUrl`.
- Widget URLs stored in TinaCMS `settings.json` (with env-var fallback) — Tanja can update if her account changes.

### Cookie consent (DIY)
- Client-side banner (`src/components/CookieConsent.tsx`) with three categories: Noodzakelijk (always on) / Analyse / Marketing.
- Choice stored in `localStorage` under `sorelax-consent` (versioned). `useConsent()` hook + `sorelax-consent-change` event for gating future scripts.
- `openCookiePreferences()` re-opens the banner — wired to the `/cookies` preferences button.
- Privacy + cookie policy pages are hardcoded Dutch copy; lawyer review before launch.
- Cloudflare Web Analytics does NOT need consent (cookieless, no PII).

### Maps
- Static map image on `/contact` by default (PNG/WebP, lazy-loaded).
- Interactive Google Maps iframe loads only on explicit user click ("Toon interactieve kaart").

### Contact form backend
- Cloudflare Worker + Resend API (preferred — stays in ecosystem, free tier).
- Alternative: Formspree free tier if Worker is overkill for the agent to set up.
- Honeypot field + rate limiting. No CAPTCHA (privacy-friendly).

---

## 10. Deliverables & Acceptance Criteria

### Deliverables
1. GitHub repo with Next.js 15 + TinaCMS + Tailwind v4.
2. Deployed preview on Cloudflare Pages (`.pages.dev` URL).
3. TinaCMS Cloud project configured, seeded with migrated content.
4. README: local dev setup, env vars, deployment, CMS access for Tanja.
5. Short NL-language **editor guide** for Tanja (markdown, ~2 pages) — how to log in, update a price, add a testimonial, change opening hours. Screenshots encouraged.
6. Custom domain setup steps for `sorelaxmassage.be` on Cloudflare Pages.

### Acceptance criteria
- All 10 pages render correctly, prices/testimonials/hours from CMS.
- Salonized floating button + inline widget function on mobile and desktop.
- TinaCMS edit → commit → Cloudflare rebuild pipeline works end to end (demonstrate with a price change).
- Lighthouse scores hit §8 budget on mobile (test with real 4G throttling).
- Dutch spellcheck passes on all static strings (run `cspell` with NL dictionary).
- Contact form delivers to `info@sorelaxmassage.be`.
- Cookie banner shows on first visit, stores the user's choice, and can be re-opened via `/cookies`. No third-party scripts load on our origin (Salonized is external-only), so there is nothing to script-gate today; the banner is a legal notice plus future-proofing.
- Zero axe critical/serious accessibility issues.
- Site works without JavaScript enabled (graceful degradation — content visible, booking falls back to phone/email CTA).

---

## 11. Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://sorelaxmassage.be
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
RESEND_API_KEY=                    # if using Worker+Resend
CONTACT_FORM_TO=info@sorelaxmassage.be
```

No Salonized env vars needed — URLs are CMS-managed.

---

## 12. Build Order (recommended)

1. Next.js 15 + Tailwind v4 + TypeScript strict, static export configured.
2. Design system: tokens, typography, core components (Button, Card, Container, Section, Nav, Footer).
3. Static page layouts and routing, hardcoded placeholder content.
4. TinaCMS setup: schema, seed data, `/admin` route.
5. Wire TinaCMS reads into treatments / testimonials / settings consumers.
6. Salonized integration (floating button lazy-load + inline + per-service).
7. Cookie consent (DIY banner + hardcoded privacy/cookie policy pages).
8. Contact form backend.
9. SEO pass: metadata, JSON-LD, sitemap, robots.
10. Performance pass: image optimization, font loading, third-party deferral.
11. Accessibility audit + fixes.
12. Deploy to Cloudflare Pages, configure custom domain, set rebuild webhook from TinaCMS.
13. Write Tanja's editor guide.

---

## 13. Open Items for Client (flag in README)

- Actual Salonized widget URLs (main + giftcard + per-service custom widgets).
- Social media handles (Instagram, Facebook).
- Real photos of Tanja and the salon interior.
- Lawyer review of the hardcoded privacy + cookie policy copy on `/privacy` and `/cookies` (Dutch, Belgian jurisdiction). Update `LAST_UPDATED` when the text changes.
- Confirm `sorelaxmassage.be` domain is registered and DNS can point to Cloudflare.
- Whether Tanja will configure Mollie/Stripe in Salonized for giftcards (if no → switch `/cadeaubon` to contact CTA).
