"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { MathText } from "@/components/MathText";
import { useStudent } from "@/components/StudentProvider";
import { FRQS, DEMO_FACULTY_SUBMISSION } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";

export default function FrqIndexPage() {
  const { state } = useStudent();
  return (
    <div>
      <PageTitle kicker="Anannt Reasoning Studio" title="Handwritten arguments, point-level rubrics">
        Faculty ask you to show the reason, not only the last line. Three labelled feedback levels:
        self-review, provisional, faculty-reviewed. Self-review is not a faculty result. Mocks remain
        self-administered unless a mentor sits with you.
      </PageTitle>
      <ul className="space-y-3">
        {FRQS.map((frq) => (
          <li key={frq.id} className="rounded-xl border bg-card p-4">
            <h2 className="font-semibold">{frq.title}</h2>
            <p className="text-xs text-muted-foreground">
              Calculator {frq.calculator === "required" ? "required" : "not permitted"} · {frq.totalPoints}{" "}
              rubric points
            </p>
            <p className="mt-2 text-sm">
              <MathText text={frq.stem} />
            </p>
            <Link href={`/frq/${frq.id}`} className={buttonVariants({ className: "mt-3" })}>
              Open this FRQ
            </Link>
          </li>
        ))}
      </ul>
      <section className="mt-8 rounded-xl border p-4">
        <h2 className="font-semibold">Demo faculty-reviewed response</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {DEMO_FACULTY_SUBMISSION.studentLabel} · {DEMO_FACULTY_SUBMISSION.feedbackLevel} · mapped pages
        </p>
        <Link href="/mentor" className={buttonVariants({ variant: "outline", className: "mt-3" })}>
          Open in mentor queue
        </Link>
        {state.frqSubmissions.length > 0 && (
          <p className="mt-2 text-sm">{state.frqSubmissions.length} of your own uploads are stored locally.</p>
        )}
      </section>
    </div>
  );
}
