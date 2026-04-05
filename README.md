# Medvi Next.js Clone

Next.js app-router reconstruction of the static Medvi-style clone from `/Users/aditya/.openclaw/workspace-aviral/projects/medvi-clone`.

This version keeps the placeholder `MediVia` branding, reuses the same public-funnel and mock-portal content structure, and clearly labels mocked or inferred behavior instead of depending on any private Medvi systems.

## Setup

```bash
npm install
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
- `/welcome`
  - Public onboarding guide that documents refills, labs, dosage, billing, and transfer workflows
- `/login`
  - Demo identifier-first sign-in flow with an inferred OTP-style verification step
- `/dashboard`
  - Mock patient portal with overview, treatment, appointments, messages, documents, and billing tabs

## Project Structure

- `app/`
  - Next.js app-router entrypoints for each required route
- `components/`
  - Reusable marketing, login, FAQ, and dashboard components
- `lib/site-data.js`
  - Shared mock content and route data ported from the static clone
- `app/globals.css`
  - Global styles adapted from the static implementation

## Mocking and Inference

- Branding is intentionally placeholder and not copied from the real product.
- Portal behavior, verification flow, and patient data are mocked.
- Copy is paraphrased and adapted from the static reference rather than wired to any private backend.
- No private Medvi APIs, credentials, or authenticated services are used.

## Demo Behavior

- Login demo code: `483920`
- Dashboard actions such as refill submission, document uploads, and care-team messages update only local client state.
- The dashboard is accessible directly at `/dashboard` because authentication is intentionally mocked.

## Environment Notes

This repository was scaffolded in a restricted sandbox. Dependency installation could not be completed here because:

```bash
npm install --fetch-timeout=5000 --fetch-retries=0
# npm error code ENOTFOUND
# npm error network request to https://registry.npmjs.org/next failed
```

The repo is still ready to install locally with:

```bash
npm install
npm run build
```

If those commands fail, check:

1. Node.js 18.18+ or newer is installed.
2. Network access to the npm registry is available.
3. The `next`, `react`, and `react-dom` dependencies from `package.json` were installed successfully.

## Verification Completed Here

- `node --check next.config.mjs`
- `node --check lib/site-data.js`
- `node --input-type=module -e "import('./lib/site-data.js')"`

## Verification Blocked Here

- `npm install`
- `npm run build`

Those commands are blocked only by npm registry access in this sandbox, not by missing project files.
