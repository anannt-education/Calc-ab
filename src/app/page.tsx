import Link from "next/link";
import type { Metadata } from "next";
import { AcademicMethod } from "@/components/AcademicMethod";
import { PUBLIC_LESSON_META, studyStartUrl } from "@/lib/gate";
import { buildMetadata, PUBLIC_DESCRIPTIONS } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Calculus AB · two open lessons",
  description: PUBLIC_DESCRIPTIONS.home,
  path: "/",
});

export default function Home() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Self-prep studio · Calculus AB · May 2027
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl leading-[1.12] tracking-tight text-primary sm:text-5xl">
        Start with why a limit is not a function value
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/90">
        Two lessons are public on purpose. No account. Work one idea, a short check, and what to do
        next. After the second lesson we send you to the study desk for an email and a parent
        WhatsApp — that form is not here.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        We would rather you learn the limit than buy a package. A mentor in Burjuman is here if you
        want one later.
      </p>

      <ol className="mt-10 space-y-4">
        <li className="rounded-xl border bg-card p-5" style={{ borderColor: "#E4A31A" }}>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lesson 1 · open</p>
          <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-primary">
            {PUBLIC_LESSON_META["u1-limit-vs-value"].title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            Nearby behaviour is not the filled-in point. Move the point, keep the neighbourhood, and
            say what changed.
          </p>
          <Link
            href={PUBLIC_LESSON_META["u1-limit-vs-value"].href}
            className="mt-4 inline-flex rounded-md px-4 py-2 text-sm font-medium text-primary-foreground"
            style={{ background: "#1639A8" }}
          >
            Open lesson 1 — free, no account
          </Link>
        </li>
        <li className="rounded-xl border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lesson 2 · open</p>
          <h2 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-primary">
            {PUBLIC_LESSON_META["u6-ftc"].title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            Accumulation is signed. Geometric area is a related but different request. The
            Fundamental Theorem connects a running integral to the original function.
          </p>
          <Link
            href={PUBLIC_LESSON_META["u6-ftc"].href}
            className="mt-4 inline-flex rounded-md border px-4 py-2 text-sm font-medium text-primary"
          >
            Open lesson 2
          </Link>
        </li>
      </ol>

      <section className="mt-12 space-y-3 text-sm leading-relaxed">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl text-primary">
          How the two open lessons work
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Open a lesson. Stay honest with the independent check.</li>
          <li>Finish both. No login on these two pages.</li>
          <li>
            Tell us where you got stuck. If you want a human after that, we are in Burjuman. If you
            do not, keep going.
          </li>
        </ol>
        <p className="text-muted-foreground">
          The rest of the eight-unit map is still being written. Unpublished units go to a waitlist
          on the study desk — they do not 404.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/exam/2027" className="text-primary underline-offset-2 hover:underline">
          2027 exam guide
        </Link>
        <Link href="/onboarding" className="text-primary underline-offset-2 hover:underline">
          Start a short diagnostic
        </Link>
        <a href={studyStartUrl({ intent: "waitlist" })} className="text-primary underline-offset-2 hover:underline">
          Ask when later units are ready
        </a>
      </div>

      <div className="mt-12">
        <AcademicMethod />
      </div>
    </article>
  );
}
