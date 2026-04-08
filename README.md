# Revya Next.js Clone

Next.js app-router telehealth site for Revya.

This version uses the `Revya` branding, reuses the same public-funnel and portal content structure, and keeps all backend wiring inside local NextAuth plus Supabase scaffolding rather than depending on any private Revya systems.

## Setup

```bash
npm install
npm run build
npm run dev
```

Production commands:

```bash
npm run build
npm run start
```

## Route Structure

- `/`
  - Public multi-vertical landing page
- `/weight-loss`
  - GLP-1 / weight-loss funnel with pricing cards, estimator, FAQs, and doctor sections
- `/quiz`
  - Premium single-question Revya intake with branching, autosave, review, and route-based eligibility results
- `/welcome`
  - Public onboarding guide that documents refills, labs, dosage, billing, and transfer workflows
- `/login`
  - Google-auth-ready sign-in flow plus a demo preview code path
- `/dashboard`
  - Portal shell that loads a signed-in member profile from Supabase when auth is configured, or falls back to preview scaffolding

## Project Structure

- `app/`
  - Next.js app-router entrypoints for each required route
- `components/`
  - Reusable marketing, login, FAQ, and dashboard components
- `lib/site-data.js`
  - Shared mock content and route data ported from the static clone
- `lib/auth.js`
  - Central NextAuth/Auth.js configuration, Google provider gating, and server session helper
- `lib/supabase/`
  - Browser/server/admin Supabase REST helpers used for profile scaffolding
- `supabase/setup.sql`
  - Minimal table needed for Google member profile scaffolding
- `lib/quiz/`
  - Quiz schema, branching/recommendation routing, and local autosave helpers
- `app/globals.css`
  - Global styles adapted from the static implementation

## Environment

Copy `.env.local.example` to `.env.local` and provide the values you plan to use locally.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `AUTH_SECRET`
- `NEXTAUTH_URL`

Google sign-in stays disabled until `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `AUTH_SECRET` are all present. When those values are missing, the login page keeps the demo preview flow available instead of breaking auth.

## Supabase Setup

Run the SQL in `supabase/setup.sql` against your Supabase project to create the minimal `patient_profiles` table used by the dashboard scaffold. The server uses the service-role key to upsert a row for each Google user on sign-in and to resolve the member portal shell on `/dashboard`.

## Quiz System

The `/quiz` route is a production-ready, schema-driven intake flow for the Revya weight-loss journey. It now presents one question at a time with animated transitions, a premium glassmorphism UI, local autosave, a review step, and route-based results. The step definitions still live in `lib/quiz/schema.js`, recommendation logic is handled in `lib/quiz/routing.js`, and progress persists through `lib/quiz/storage.js`.

## Mocking and Inference

- Branding is intentionally placeholder and not copied from the real product.
- The portal shell, tasks, and care workflow remain scaffolded, but Google sessions and member profile lookup now support Supabase-backed wiring.
- Copy is paraphrased and adapted from the static reference rather than wired to any private backend.
- No private Revya APIs or internal services are used.

## Demo Behavior

- Login demo code: `483920`
- Dashboard actions such as refill submission, document uploads, and care-team messages still update local client state inside the portal shell.
- When Google auth env vars are configured, `/dashboard` redirects unauthenticated users back to `/login`.
- The preview code flow opens `/dashboard?preview=1` so QA and demos still work even before Google credentials are supplied.

## Verification Completed Here

- `npm run build`
- `node --check next.config.mjs`
- `node --check lib/site-data.js`
- `node --input-type=module -e "import('./lib/site-data.js')"`
