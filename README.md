# Goa Luxury Investor Showcase

Landing page and registration platform for the Think Realty x Luxofy Properties investor event
(9 August 2026, Delhi NCR). Built per `PRD.md` with real Luxofy portfolio data.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4, Framer Motion, Lenis smooth scrolling
- Prisma ORM with SQLite locally (switch `provider` in `prisma/schema.prisma` to `postgresql` for production)
- Zod validation, jose (JWT admin sessions)

## Run it

```bash
npm install
npx prisma migrate dev   # creates prisma/dev.db
npm run dev              # http://localhost:3000
```

Production build: `npm run build && npm start`.

## What is included

| Area | Details |
|---|---|
| Landing page | Hero with background video, trust stats, editorial collage, why Goa (stats + market comparison), full 14-project portfolio in a Villas/Apartments/Upcoming toggle with infinite carousels, investment calculator with PDF export, PRD agenda, hosts, real Google review testimonials, real-imagery gallery, 22 FAQ accordion, CTA banner, serif-wordmark footer |
| Registration | `/register`, 5 steps: basics + OTP, investment profile, buying intent, qualification, review + terms. Server-side Zod validation, duplicate-phone guard, UTM attribution capture |
| OTP | Email OTP via `/api/otp/send` and `/api/otp/verify`, sent through Gmail SMTP (nodemailer) from luxofy.events@gmail.com. Paste the 16 character Gmail app password into `SMTP_PASS` in `.env` and it goes live; without it, dev mode prints the code |
| Lead scoring | Weighted budget (35%), timeline (30%), purpose (20%), occupation (15%). Bands: 80+ Hot, 60 to 79 Warm, below 60 Cold (`lib/scoring.ts`) |
| Automations | After submit: confirmation email (SMTP), Slack sales alert (free webhook), Meta Conversions API event, round-robin salesperson assignment, audit log, free wa.me WhatsApp click-to-chat link on the confirmation page (optional WhatsApp Cloud API adapter included, free tier). Each channel activates only when its env keys exist; otherwise it logs `[dev-*]` to the console |
| Admin | `/admin` (login at `/admin/login`, credentials in `.env`): live-refreshing stats, hot/warm/cold breakdown, attendance prediction, source and campaign breakdowns, team performance, lead table, CSV export |
| Assets | `/api/brochure` (generated PDF), `/api/calendar` (.ics invite), calculator projection PDF (client-side) |
| SEO | Event, Organization, RealEstateAgent and FAQPage JSON-LD, Open Graph and Twitter meta, `sitemap.xml`, `robots.txt` |
| Security | OTP hashing, rate limiting on OTP/register/login, JWT httpOnly admin cookie, security headers, input validation, audit logs, optional Cloudflare Turnstile |

## Integrations (all optional, keyed via `.env`)

Everything runs on free tiers: SMTP email (Gmail app password works), Slack webhook, Meta Pixel +
Conversions API, GA4, GTM, LinkedIn Insight, Cloudflare Turnstile, wa.me WhatsApp links. Set the
corresponding variables in `.env` and the feature switches on; nothing else to change.


## Deploying (Vercel or Render)

SQLite works locally but does not persist on serverless hosts, so production uses
free Postgres:

1. Create a free database at [neon.tech](https://neon.tech) (or Vercel Postgres/Supabase)
   and copy its connection string.
2. In `prisma/schema.prisma` change `provider = "sqlite"` to `provider = "postgresql"`.
3. Push the repo to GitHub and import it in Vercel (or Render as a Node service).
4. Set the environment variables from `.env.example` in the host's dashboard, with
   `DATABASE_URL` pointing at Neon and `NEXT_PUBLIC_SITE_URL` at your deployed URL.
5. Create the tables once: `npx prisma db push` (run locally with the Neon
   `DATABASE_URL`, or in the Render shell).

The build script already runs `prisma generate`, so no extra Vercel config is needed.
Registrations, OTP codes and audit logs all persist in Postgres.

## Admin access (local defaults)

Credentials live in `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`, randomly generated). Rotate them
and `JWT_SECRET` per environment.

## Notes

- The in-memory rate limiter suits a single instance; swap for Redis when scaling out.
- Featured projects (The Pine Cliff, The Azalea, Mmirari House) use real Luxofy collateral from the
  shared asset library, stored in `public/projects/`. Lifestyle imagery is Unsplash and the hero
  video is Pexels; swap in `lib/content.ts` when brand footage is available.
- Every page carries the "Powered by STAIL Realty OS" attribution (realty.stail.co.in).
