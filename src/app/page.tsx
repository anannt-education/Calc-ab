import Link from "next/link";
import type { Metadata } from "next";
import { AcademicMethod } from "@/components/AcademicMethod";
import { buttonVariants } from "@/components/ui/button";
import { GATED_HONESTY, GATED_LESSON_META, LESSON_1_ID, LESSON_2_ID } from "@/lib/gate";
import { buildMetadata } from "@/lib/site";
import { PUBLIC_DESCRIPTIONS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why a limit is not a function value",
  description: PUBLIC_DESCRIPTIONS.home,
  path: "/",
});

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
        Anannt Education · May 2027
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        Why a limit is not a function value.
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">
        College will not wait while you find last year’s notes. These pages are the work we already
        do with students in Burjuman — one idea, a check, the next page. Start with the hole in the
        graph. No account to begin.
      </p>
      <p className="mt-3 text-sm text-ink-muted">
        If you want a person in the room later, we are at Office 105, Bank Street Building, Burjuman
        Metro Exit 2. You do not need us to begin.
      </p>

      <ol className="mt-10 space-y-4">
        <li className="rounded-2xl border border-rule bg-paper-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Lesson 1</p>
          <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-ink">
            Limit versus function value
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            A limit describes nearby behaviour, not the filled point. Move the hole and keep the
            nearby graph fixed — then say what actually changed.
          </p>
          <Link href={`/lesson/${LESSON_1_ID}`} className={`${buttonVariants()} mt-4 inline-flex bg-ink text-paper hover:bg-navy`}>
            Start here
          </Link>
        </li>
        <li className="rounded-2xl border border-rule bg-paper-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Lesson 2</p>
          <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-ink">
            FTC and accumulation
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Accumulation is signed. Predict whether the running integral rises when the integrand is
            negative, then check it.
          </p>
          <Link href={`/lesson/${LESSON_2_ID}`} className={`${buttonVariants({ variant: "outline" })} mt-4 inline-flex`}>
            Open FTC and accumulation
          </Link>
        </li>
      </ol>

      <ol className="mt-4 space-y-4" aria-label="Later sittings">
        {GATED_LESSON_META.map((lesson) => (
          <li key={lesson.id} className="rounded-2xl border border-dashed border-rule bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Later sitting</p>
            <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-ink">{lesson.title}</h2>
            <p className="mt-2 text-sm text-ink-muted">{lesson.blurb}</p>
            <Link
              href={`/lesson/${lesson.id}`}
              className={`${buttonVariants({ variant: "outline" })} mt-4 inline-flex`}
            >
              Open {lesson.title.toLowerCase()}
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-ink-muted">{GATED_HONESTY}</p>

      <p className="mt-8 rounded-xl border border-rule bg-card p-4 text-sm text-ink-muted">
        This is written for a student with a quiet hour in Dubai, Sharjah, Abu Dhabi, or anywhere. If
        today is a bad brain day, stop after the worked example. Come back tomorrow. The path will
        still be here.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/exam/2027" className="text-navy underline-offset-2 hover:underline">
          2027 exam guide
        </Link>
        <Link href="/course" className="text-navy underline-offset-2 hover:underline">
          Honesty map
        </Link>
        <Link href="/onboarding" className="text-navy underline-offset-2 hover:underline">
          Start a short diagnostic
        </Link>
      </div>

      <div className="mt-12">
        <AcademicMethod />
      </div>
    </div>
  );
}
