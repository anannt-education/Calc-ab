# Calculus AB studio (Anannt Study)

Student product slice for **Anannt Education**, mounted at `https://study.anannt.ae/calculus-ab`.

This is a self-study supplement for May 2027 Calculus AB. It is not affiliated with or endorsed by College Board. Practice composites are internal percentages, not official AP scores.

## What is public

No account:

1. Limit versus function value (`/calculus-ab/lesson/u1-limit-vs-value`)
2. FTC accumulation (`/calculus-ab/lesson/u6-ftc`)

Subject home, the 2027 exam guide, FAQ, and privacy are also public. After lesson 2 (or a diagnostic submit, or `/practice` `/frq` `/mock`) students are sent to `https://study.anannt.ae/start?subject=calculus-ab&unit=`. The gate form lives in the `study` repo.

Mocks, FRQ studio, and remaining units need a study session cookie and are `noindex`. The eight-unit map is still being written — this repo does not sell a finished course.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev
```

The dev server binds `0.0.0.0:4351` (chosen to avoid other subject apps on 3000 / 43123 / 43127 / 4327 / 3847). Open [http://127.0.0.1:4351/calculus-ab](http://127.0.0.1:4351/calculus-ab).

```bash
npm run build
npm start
```

Progress is stored in the browser (`localStorage` key `anannt-ab-student-v1`). Answer keys stay on `/api/mark`.

## SEO

`metadataBase` is `https://study.anannt.ae`. Canonical URLs include `/calculus-ab`. `robots.txt` allows the two public lessons and disallows `/mock` and `/api`. The sitemap lists public URLs only.

## Exam configuration (2027)

| Part | Questions | Time | Calculator |
|---|---:|---:|---|
| I A | 29 | 62 min | not permitted |
| I B | 13 | 38 min | required |
| II A | 2 FRQ | 30 min | required |
| II B | 4 FRQ | 60 min | not permitted |

Practice composite: `50 * MCQ_correct/42 + 50 * FRQ_points/FRQ_available`.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, KaTeX. No payment code.
