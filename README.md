# Anannt AP Calculus AB Mastery Platform

Student product slice for **Anannt Education**. Planning baseline: May 2027 AP Calculus AB (hybrid digital: 42 MCQ in 100 minutes + 6 FRQ in 90 minutes, four parts).

The product promise: understand the idea, apply it independently, explain your reasoning, and demonstrate that you can still do it later.

This is not affiliated with or endorsed by College Board. Anannt practice composites are internal percentages, not official AP scores or predictions. Mocks are labelled self-administered.

## What this repo is

A Next.js App Router app with a quiet learning interface:

- Onboarding and a short prerequisite diagnostic (“I have not learned this yet”)
- Home with one recommended next task and a published reason
- Course map for the eight official units plus a foundation bridge
- Lesson workspace, including two deep lessons (limit vs function value; FTC accumulation)
- Practice with server-side marking (answer keys stay off the client)
- Mistake notebook, FRQ studio, 2027 mock centre, progress, Ask Anannt hint ladder
- Demo mentor queue (mapped handwritten FRQ) and an academic CMS preview (authors cannot self-publish)
- Public About, Faculty, 2027 exam guide, FAQ, and privacy pages

Curriculum is original Anannt-authored. Do not copy College Board released items into this bank.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev
```

The dev server binds `0.0.0.0:4327`. Open [http://127.0.0.1:4327](http://127.0.0.1:4327).

```bash
npm run build
npm start
```

Progress is stored in the browser (`localStorage` key `anannt-ab-student-v1`). There is no login wall. A demo student can onboard immediately.

Public pages (academic approach, faculty, 2027 exam guide, FAQ, privacy, unit and lesson articles) are server-rendered for search engines. Students who have finished the diagnostic are sent to `/home` after the landing HTML is produced.

## SEO and canonical host

`metadataBase` is `https://apcalc.anannt.education` (placeholder production origin until DNS is attached). Canonical URLs, Open Graph, Twitter cards, `robots.txt`, and `sitemap.xml` use that origin.

- Titles follow `{page} | Anannt AP Calculus AB`
- JSON-LD: Organization, Course, EducationalOccupationalProgram, BreadcrumbList, FAQ
- Do not claim College Board endorsement, accreditation, or AP score predictions in metadata or copy

## Exam configuration (2027)

| Part | Questions | Time | Calculator |
|---|---:|---:|---|
| I A | 29 | 62 min | not permitted |
| I B | 13 | 38 min | required |
| II A | 2 FRQ | 30 min | required |
| II B | 4 FRQ | 60 min | not permitted |

The mock centre offers a **short labelled drill** and a **full 2027 structure** mode (official counts and timers; some later items may be skippable placeholders).

Practice composite: `50 * MCQ_correct/42 + 50 * FRQ_points/FRQ_available`.

## Mastery (pilot)

States: unknown → learning → developing → independently demonstrated → retained. Failed later retrieval becomes **review due**. Assisted attempts and same-item-family repeats cannot independently satisfy mastery. Sparse evidence is **insufficient evidence**, never a fake percentage.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, KaTeX. No extra component libraries, no database, no unrestricted AI chat.
