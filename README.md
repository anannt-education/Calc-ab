# Calculus AB on Anannt Study

Student product slice for **Anannt Education**, mounted at `https://study.anannt.ae/calculus-ab`.

Planning baseline: May 2027 AP Calculus AB (hybrid digital: 42 MCQ in 100 minutes + 6 FRQ in 90 minutes, four parts).

Two lessons are public without an account:

1. Limit vs function value (`/lesson/u1-limit-vs-value`)
2. FTC accumulation (`/lesson/u6-ftc`)

After those two (lesson 2 complete, diagnostic submit, or a visit to `/practice` `/frq` `/mock`), this app sends the student to `https://study.anannt.ae/start?subject=calculus-ab` (with `&unit=` when known). The gate form lives in the `study` repo.

Mocks, FRQ studio, and remaining units require the `anannt_study_session` cookie and are `noindex`. Answer keys stay on the server (`src/lib/content/item-keys.ts`).

This is not affiliated with or endorsed by College Board. Anannt practice composites are internal percentages, not AP scores. The eight-unit map is still being written.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev
```

The dev server binds `0.0.0.0:4327`. With `basePath: '/calculus-ab'`, open [http://127.0.0.1:4327/calculus-ab](http://127.0.0.1:4327/calculus-ab).

```bash
npm run build
npm start
```

Progress is stored in the browser (`localStorage` key `anannt-ab-student-v1`).

## SEO

`metadataBase` / canonical origin is `https://study.anannt.ae/calculus-ab`.

- Public URLs are indexed (subject home, exam guide, FAQ, privacy, about, lesson 1, lesson 2, diagnostic start)
- `robots.ts` disallows `/mock`, `/api`, and gated internals
- `sitemap.ts` lists public URLs only

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, KaTeX. No payments. No extra hosts.
