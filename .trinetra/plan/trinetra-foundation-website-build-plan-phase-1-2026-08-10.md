# TRINETRA Foundation — Website Build Plan (Phase 1)

A full public-facing website for TRINETRA FOUNDATION, modelled on the layered, overlapping-section, scroll-driven feel of the Wix non-profit reference — sections slide over one another, imagery moves with parallax, numbers count up, cards lift on hover. Not a flat static page.

## Brand and design direction

- Palette: deep saffron/orange (primary), forest green (secondary), deep navy/charcoal (dark), warm off-white background, gold accent — pulled from the logo.
- Typography: large serif display headings paired with a clean humanist sans for body. Generous white space, big type, restrained motion.
- Logo used in navbar and footer.
- Fully responsive, keyboard accessible, high contrast, reduced-motion respected.

## Pages

- **Home** — cinematic hero ("Building a Better Tomorrow, Together."), two CTAs, focus strip (Food / Education / Healthcare / Livelihood / Environment / Humanity), What We Stand For (Compassion, Empowerment, Sustainability, Dignity & Rights), Areas of Work preview, Featured Campaigns, Impact, "How Your Support Creates Change" flow, Student Empowerment teaser, Stories preview, donate CTA band.
- **About** — Who We Are, Mission, Vision, Values, What We Do, Where We Work, Governance.
- **Our Work** — index plus 12 detail pages: Food & Nutrition, Education & Literacy, Student Empowerment, Healthcare, Livelihood, Animal Welfare, Environment, Disaster Relief, Rural & Community Development, Human Rights & Social Justice, Culture & Sports, Research & Innovation.
- **Impact** — animated counters and program breakdown, driven by data (see Honesty rule below).
- **Campaigns** — listing plus campaign detail with progress bars.
- **Stories** and **Events** — card listings with detail pages.
- **Get Involved** — Donate, Volunteer (full application form), Partner With Us.
- **Transparency** — MOA, reports, financials, policies, donation-utilisation messaging.
- **Contact** — form, map area, and official details.
- **Policies** — Privacy, Terms, Donation Policy, Volunteer Policy.

Navbar with "Our Work" and "Get Involved" dropdowns, always-visible DONATE NOW button, and a mobile drawer (☰ / TRINETRA / Donate). Footer with the four-column structure requested.

## Honesty rule (important)

No fabricated statistics. Impact counters, campaign totals and beneficiary numbers render from data; where no real figures exist yet the section shows an honest "programs launching — figures published as activities begin" state instead of invented numbers. No 80G/CSR/tax-exemption claims until you confirm the certificates exist.

## Contact details used

CIN U88900BR2026NPL084393 · Mob. 7562891937 · trinetrafoundationofficially@gmail.com · TV Centre, Block Road, Forbesganj (Araria) 854318 · Registered Office: Bihar

## Imagery

AI-generated cinematic community/humanitarian photography, colour-graded to the brand palette: hero, each of the 12 work areas, student initiative, campaigns, stories.

## Phase 1 scope vs later

Phase 1 delivers every public page above with full design, content and animation, plus working Volunteer / Contact / Partner forms and campaign & story content stored in Lovable Cloud so they are editable rather than hardcoded.

Real payments and the admin dashboard follow in Phase 2. Setting up a live payment gateway requires a Stripe account created through Lovable (or a India-specific gateway you already hold keys for) — once Phase 1 is approved I'll walk you through that. Until then the Donate page presents amount tiers, one-time/monthly toggle and the donor-details form, and records the donation intent.

## Technical notes

- Built on this project's stack: TanStack Start (React 19, SSR) + Vite + Tailwind v4 + shadcn/ui, with Motion for scroll reveals, parallax, counters and page transitions. Next.js is not applicable here; the stack delivers the same capabilities.
- Design tokens defined in `src/styles.css` (oklch), no hardcoded colours in components.
- One route file per page under `src/routes/`, each with its own SEO title/description/OG tags.
- Lovable Cloud (Postgres + auth + storage + RLS) enabled for campaigns, stories, events, volunteers, contact/partner submissions, impact metrics and documents; public reads via narrow anon SELECT policies, writes validated with Zod.
- Shared components: Navbar, Footer, SectionReveal, StatCounter, CampaignCard, WorkAreaCard, StoryCard, DonateBand, floating donate CTA.
