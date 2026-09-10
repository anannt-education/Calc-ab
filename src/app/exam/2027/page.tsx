import Link from "next/link";
import type { Metadata } from "next";
import { ExamFormatTable } from "@/components/ExamFormatTable";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { COURSE } from "@/lib/exam-config";
import { buildMetadata, PUBLIC_SEO } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: PUBLIC_SEO.exam.title,
  description: PUBLIC_SEO.exam.description,
  path: PUBLIC_SEO.exam.path,
  keywords: [
    "Calculus AB 2027",
    "hybrid digital Calculus AB",
    "42 MCQ",
    "FRQ practice",
    "Anannt Education",
    "calculator policy",
  ],
});

export default function Exam2027Page() {
  return (
    <article className="max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "2027 exam guide", path: "/exam/2027" },
        ])}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Anannt Exam Review · commentary
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        2027 AP Calculus AB exam guide
      </h1>
      <p className="mt-3 text-base leading-relaxed">
        This page is Anannt faculty commentary on the May 2027 AP Calculus AB administration, written so
        a student knows what to practise and what not to assume. It is not a College Board document.
        When a count, timer, or calculator rule matters for an official sitting, follow the dated
        official source — not a third-party summary, including ours if it ever lags.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">The four parts, as we rehearse them</h2>
        <p className="mt-2 text-sm">
          For 2027, College Board specifies a hybrid digital examination: multiple-choice answers are
          digital; free-response prompts are displayed digitally and answered by hand. The multiple-choice
          section is 42 questions in 100 minutes. The free-response section remains six questions in 90
          minutes. Each section contributes 50% of the official score. Total working time is 190 minutes,
          excluding breaks.
        </p>
        <div className="mt-4">
          <ExamFormatTable />
        </div>
        <p className="mt-3 text-sm">
          Do not rehearse a 2026 45-question multiple-choice template. Anannt’s mock centre stores a
          2027 blueprint; a short labelled drill exists for pacing practice and is not full-length.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">Calculator rules we train</h2>
        <p className="mt-2 text-sm">
          Parts I B and II A require a calculator. Parts I A and II B do not permit one. College
          Board’s current policy provides built-in Desmos in Bluebook for calculator-required Calculus
          parts and also permits approved handheld graphing calculators. Anannt classroom graphs are
          teaching tools; they are not replicas of the exam calculator. Train the route you will
          actually use on the day.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">What Anannt will not tell you</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
          <li>We will not convert an Anannt practice composite into a predicted AP score.</li>
          <li>Home mocks are labelled self-administered unless a mentor is present.</li>
          <li>Hints and Ask Anannt stay off during a timed sitting.</li>
          <li>We do not scrape or republish released College Board items in this bank.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-primary">Official sources we defer to</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
          {COURSE.sources.map((s) => (
            <li key={s.url}>
              <a className="text-primary underline-offset-2 hover:underline" href={s.url}>
                {s.title}
              </a>
              <span className="text-muted-foreground">
                {" "}
                — retrieved {s.retrieved}. {s.notes}
              </span>
            </li>
          ))}
          <li>
            <a
              className="text-primary underline-offset-2 hover:underline"
              href="https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/exam-policies/calculator-policy"
            >
              Official calculator policy
            </a>
          </li>
        </ul>
      </section>

      <p className="mt-8 text-sm">
        <Link href="/mock" className="text-primary underline-offset-2 hover:underline">
          Open the mock centre
        </Link>
        <span className="mx-2">·</span>
        <Link href="/frq" className="text-primary underline-offset-2 hover:underline">
          Reasoning Studio
        </Link>
        <span className="mx-2">·</span>
        <Link href="/course" className="text-primary underline-offset-2 hover:underline">
          Course map
        </Link>
      </p>
    </article>
  );
}
