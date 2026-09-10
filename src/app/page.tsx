import Link from "next/link";
import { AcademicMethod } from "@/components/AcademicMethod";
import { RedirectIfOnboarded } from "@/components/RedirectIfOnboarded";
import { SITE } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <RedirectIfOnboarded />
      <main className="relative min-h-screen overflow-hidden bg-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' fill='none' stroke='%231a3a5c' stroke-width='0.4' opacity='0.12'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
          <header className="flex items-center justify-between gap-4">
            <div className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight text-ink">
              {SITE.brand}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/faculty" className="text-ink-muted hover:text-ink">
                Faculty
              </Link>
              <Link href="/home" className="text-ink-muted hover:text-ink">
                Continue
              </Link>
              <Link
                href="/onboarding"
                className="rounded-full bg-ink px-4 py-2 font-medium text-paper hover:bg-navy"
              >
                Begin
              </Link>
            </div>
          </header>

          <section className="mt-16 grid flex-1 gap-12 lg:mt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                {SITE.course} · {SITE.examYear} exam
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl leading-[1.08] tracking-tight text-ink sm:text-6xl">
                {SITE.tagline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                {SITE.description} Built for students who want a serious, structured path — not another
                question dump.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/onboarding"
                  className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-soft"
                >
                  Start the diagnostic
                </Link>
                <Link
                  href="/course"
                  className="rounded-full border border-rule px-6 py-3 text-sm font-medium text-ink hover:bg-paper-soft"
                >
                  Browse the course
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-rule bg-paper-soft p-6 shadow-[0_24px_80px_-48px_rgba(26,58,92,0.55)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">The method</p>
              <ul className="mt-4 space-y-4 text-sm text-ink">
                <li>
                  <span className="font-semibold">Mastery before volume.</span> Skills stay locked until the
                  diagnostic and spaced review say you’re ready.
                </li>
                <li>
                  <span className="font-semibold">Exam-shaped practice.</span> MCQ, FRQ, and calculator
                  policy are taught as they appear on the {SITE.examYear} paper.
                </li>
                <li>
                  <span className="font-semibold">A tutor who remembers you.</span> Ask Anannt about a
                  stuck skill — the thread stays attached to that lesson.
                </li>
              </ul>
            </div>
          </section>

          <AcademicMethod />

          <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6 text-xs text-ink-muted">
            <p>
              {SITE.legalName} · Independent AP Calculus AB platform · Not affiliated with College Board
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-ink">
                Privacy
              </Link>
              <Link href="/faq" className="hover:text-ink">
                FAQ
              </Link>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
