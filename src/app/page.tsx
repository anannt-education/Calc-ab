import Link from "next/link";
import type { Metadata } from "next";
import { AcademicMethod } from "@/components/AcademicMethod";
import { buttonVariants } from "@/components/ui/button";
import { LESSON_1_ID, LESSON_2_ID } from "@/lib/gate";
import { buildMetadata } from "@/lib/site";
import { PUBLIC_DESCRIPTIONS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculus AB · two free lessons",
  description: PUBLIC_DESCRIPTIONS.home,
  path: "/",
});

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
        Self-prep studio · May 2027 exams
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        Calculus AB, two honest lessons first.
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">
        Nobody should have to guess what to study tonight. These guides walk you through one idea, a
        short check, and what to do next — written by people who have sat with Dubai students. The
        first two lessons are open. No account. No pitch.
      </p>
      <p className="mt-3 text-sm text-ink-muted">
        We would rather you learn the limit than buy a package. A mentor in Burjuman is here if you
        want one later.
      </p>

      <ol className="mt-10 space-y-4">
        <li className="rounded-2xl border border-rule bg-paper-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Lesson 1 · public</p>
          <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-ink">
            Limit versus function value
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            A limit describes nearby behaviour, not the filled point. Move the hole and keep the
            nearby graph fixed — then say what actually changed.
          </p>
          <Link href={`/lesson/${LESSON_1_ID}`} className={`${buttonVariants()} mt-4 inline-flex bg-ink text-paper hover:bg-navy`}>
            Start lesson 1 — free, no account
          </Link>
        </li>
        <li className="rounded-2xl border border-rule bg-paper-soft p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Lesson 2 · public</p>
          <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-ink">
            FTC and accumulation
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Accumulation is signed. Predict whether the running integral rises when the integrand is
            negative, then check it.
          </p>
          <Link href={`/lesson/${LESSON_2_ID}`} className={`${buttonVariants({ variant: "outline" })} mt-4 inline-flex`}>
            Open lesson 2
          </Link>
        </li>
      </ol>

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
          Honesty map (two lessons open)
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
