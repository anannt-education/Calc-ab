import Link from "next/link";
import type { Metadata } from "next";
import { AcademicMethod } from "@/components/AcademicMethod";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { PUBLIC_LESSON_1, PUBLIC_LESSON_2 } from "@/lib/gate";
import { buildMetadata, PUBLIC_SEO } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: PUBLIC_SEO.home.title,
  description: PUBLIC_SEO.home.description,
  path: PUBLIC_SEO.home.path,
});

export default function Home() {
  return (
    <article className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Anannt Education · self-study
      </p>
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        Calculus AB, two lessons you can start today
      </h1>
      <p className="mt-3 text-base leading-relaxed">
        Prepare on your own. Anannt wrote these guides because we care. A mentor in Burjuman can help
        if you get stuck after two lessons. This is a self-study supplement for May 2027 planning — not
        a predicted AP score.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href={`/lesson/${PUBLIC_LESSON_1}`}
          className="rounded-xl border bg-card p-4 hover:border-primary"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Lesson 1 · public
          </p>
          <h2 className="mt-1 text-lg font-semibold text-primary">Limit vs function value</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Nearby behaviour is not the filled point. No account needed.
          </p>
        </Link>
        <Link
          href={`/lesson/${PUBLIC_LESSON_2}`}
          className="rounded-xl border bg-card p-4 hover:border-primary"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Lesson 2 · public
          </p>
          <h2 className="mt-1 text-lg font-semibold text-primary">FTC accumulation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed area, and why A falls when f is negative. No account needed.
          </p>
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/onboarding?step=diagnostic" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
          Start the diagnostic
        </Link>
        <Link href="/exam/2027" className="rounded-md border px-4 py-2">
          2027 exam guide
        </Link>
        <Link href="/faq" className="rounded-md border px-4 py-2">
          FAQ
        </Link>
      </div>

      <p className="mt-4 text-sm">
        Want a person after you have tried the two lessons?{" "}
        <WhatsAppLink sku="u1">WhatsApp Anannt in Burjuman</WhatsAppLink>.
      </p>

      <div className="mt-10">
        <AcademicMethod />
      </div>
    </article>
  );
}
