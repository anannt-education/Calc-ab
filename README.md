# Anannt Calculus AB (study.anannt.ae/calculus-ab)

Student product slice for **Anannt Education**, mounted at `https://study.anannt.ae/calculus-ab`.

Two public lessons, no account:

1. Limit versus function value (`/lesson/u1-limit-vs-value`)
2. FTC and accumulation (`/lesson/u6-ftc`)

After lesson 2, a diagnostic submit, or a visit to `/practice`, `/frq`, or `/mock`, this app redirects to `https://study.anannt.ae/start?subject=calculus-ab` (with `unit` when known). The study shell owns the gate form (first name, email OTP, parent WhatsApp required, role, age band, sitting May 2027, school type, intent, consent). Remaining units, mocks, and FRQ need the `anannt_study_session` cookie and are `noindex`.

This is not affiliated with or endorsed by College Board. Practice composites are internal percentages, not official AP scores. The eight-unit map is still being written.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev
```

Dev server: `0.0.0.0:4327`. With `basePath: '/calculus-ab'`, open [http://127.0.0.1:4327/calculus-ab](http://127.0.0.1:4327/calculus-ab).

```bash
npm run build
npm start
```

Progress is stored in the browser (`localStorage` key `anannt-ab-student-v1`).

## SEO

`metadataBase` / canonical / OG origin: `https://study.anannt.ae`. Public URLs are under `/calculus-ab`. `robots.txt` allows the subject home and lessons 1–2; it disallows `/mock`, `/api`, `/keys`. The sitemap lists public URLs only.

Curriculum is original Anannt-authored. Do not copy College Board released items into this bank.

## Stack

Next.js 16 App Router (`proxy.ts` for the study gate), TypeScript, Tailwind CSS, shadcn/ui, KaTeX.
