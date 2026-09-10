# Anannt Calculus AB (study.anannt.ae/calculus-ab)

Student product slice for **Anannt Education**. Mounted at `https://study.anannt.ae/calculus-ab`. Planning baseline: May 2027 Calculus AB (hybrid digital: 42 MCQ in 100 minutes + 6 FRQ in 90 minutes, four parts).

This is a self-study supplement. It does not predict an official AP score and is not Bluebook or AP Classroom. Anannt is not affiliated with or endorsed by the College Board.

## Public without an account

- Subject home
- 2027 exam guide, FAQ, privacy
- **Lesson 1** — limit vs function value (`/lesson/u1-limit-vs-value`)
- **Lesson 2** — FTC accumulation (`/lesson/u6-ftc`)
- Diagnostic start

After lesson 2 is finished, or the diagnostic is submitted, or you open `/practice`, `/frq`, or `/mock`, the app sends you to:

`https://study.anannt.ae/start?subject=calculus-ab&unit={unit}`

Lesson 3+, mocks, the FRQ mentor queue, and progress require the study session cookie (`anannt_study_session`).

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev
```

The dev server binds `0.0.0.0:4327` with `basePath` `/calculus-ab`. Open [http://127.0.0.1:4327/calculus-ab](http://127.0.0.1:4327/calculus-ab).

```bash
npm run build
npm start
```

Local progress is stored in the browser (`localStorage` key `anannt-ab-student-v1`).

## SEO and canonical host

`metadataBase` is `https://study.anannt.ae`. Canonical URLs, Open Graph, `robots.txt`, and `sitemap.xml` use that origin plus `basePath` `/calculus-ab`.

- Sitemap lists the live home and the two public lessons only
- `robots.txt` allows public lessons and disallows `/mock`, `/api`, and `/keys`
- Do not claim College Board endorsement or AP score predictions

## Exam configuration (2027)

| Part | Questions | Time | Calculator |
|---|---:|---:|---|
| I A | 29 | 62 min | not permitted |
| I B | 13 | 38 min | required |
| II A | 2 FRQ | 30 min | required |
| II B | 4 FRQ | 60 min | not permitted |

Practice composite: `50 * MCQ_correct/42 + 50 * FRQ_points/FRQ_available`. Internal percentage only.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, KaTeX. No payments, no subject subdomain, no unrestricted AI chat.
