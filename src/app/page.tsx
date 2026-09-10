import Link from "next/link";
import { AcademicMethod } from "@/components/AcademicMethod";
import { LESSON_1_ID, LESSON_2_ID } from "@/lib/gate";
import { PUBLIC_META, buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  title: PUBLIC_META.home.title,
  description: PUBLIC_META.home.description,
  path: PUBLIC_META.home.path,
});

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
        Self-prep studio · May 2027 exams
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-serif)] text-4xl leading-[1.12] tracking-tight text-primary sm:text-5xl">
        In college you will prepare on your own. This is that practice, with a desk that cares.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Nobody should have to guess what to study tonight. These two Calculus AB lessons walk you
        through one idea, a short check, and what to do next — written by people who have sat with
        Dubai students who felt behind in March and still made the exam. The first two lessons are
        open. No account. No pitch.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        We would rather you learn the limit than buy a package. A mentor in Burjuman is here if you
        want one later.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/lesson/${LESSON_1_ID}`}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Start lesson 1 — limit vs function value
        </Link>
        <Link
          href={`/lesson/${LESSON_2_ID}`}
          className="rounded-full border px-6 py-3 text-sm font-medium hover:bg-muted"
        >
          Lesson 2 — FTC accumulation
        </Link>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Two deep lessons. The eight-unit map is still being written. After lesson 2, the study desk
        at{" "}
        <a className="underline-offset-2 hover:underline" href="https://study.anannt.ae/">
          study.anannt.ae
        </a>{" "}
        asks for email and a parent WhatsApp. That form is not here.
      </p>

      <section className="mt-12 rounded-2xl border bg-card p-5">
        <h2 className="text-lg font-semibold text-primary">How the two free lessons work</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
          <li>Open this subject. Two lessons are public on purpose.</li>
          <li>Finish two lessons. No login. Stay honest with the independent check.</li>
          <li>
            Tell us where you got stuck. If you want a human after that, we are in Burjuman. If you
            do not, keep going.
          </li>
        </ol>
      </section>

      <p className="mt-8 rounded-xl border border-dashed p-4 text-sm">
        This is written for a student with a quiet hour in Dubai, Sharjah, Abu Dhabi, or anywhere. If
        today is a bad brain day, stop after the worked example. Come back tomorrow. The path will
        still be here.
      </p>

      <div className="mt-10">
        <AcademicMethod />
      </div>

      <p className="mt-8 text-sm">
        <Link href="/exam/2027" className="text-primary underline-offset-2 hover:underline">
          2027 exam guide
        </Link>
        <span className="mx-2">·</span>
        <Link href="/course" className="text-primary underline-offset-2 hover:underline">
          What is open
        </Link>
        <span className="mx-2">·</span>
        <Link href="/onboarding" className="text-primary underline-offset-2 hover:underline">
          Start the diagnostic
        </Link>
      </p>
    </div>
  );
}
