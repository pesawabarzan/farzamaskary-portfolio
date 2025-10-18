# farzamaskary.ir — Neon Portfolio (Next.js 14)

Premium multi-page portfolio for Farzam Askary.
**UI only** (no backend). Ready to deploy on Vercel/Netlify.

## Quick Start
```bash
npm i
npm run dev
```

## Pages
- `/` — Home (Hero, snapshot)
- `/projects` — Projects grid
- `/order` — Order form (UI only)
- `/contact` — Contact form (mailto)
- `/admin` — Admin panel (demo only)

## Tech
- Next.js 14 (App Router) + TailwindCSS
- Framer Motion + lucide-react
- RTL ready (fa_IR)

## Deploy (Vercel)
- Create a new project from this repo
- Framework: Next.js
- After deploy, add your custom domain `farzamaskary.ir` in Vercel's Domain settings and point DNS accordingly.

## Notes
- Forms are UI-only. When ready, connect `/order` to an API route + database.
- Admin page is demo-only with local state.