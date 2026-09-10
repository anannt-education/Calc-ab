"use client";

import { PageTitle } from "@/components/AppShell";
import { DEMO_FACULTY_SUBMISSION, FRQ_BY_ID } from "@/lib/content";
import { MathText } from "@/components/MathText";

export default function MentorPage() {
  const sub = DEMO_FACULTY_SUBMISSION;
  const frq = FRQ_BY_ID[sub.frqId]!;
  const earned = frq.rubric.filter((r) => sub.awarded[r.id]).reduce((s, r) => s + r.points, 0);

  return (
    <div>
      <PageTitle kicker="Mentor review queue (demo)" title="Mapped handwritten FRQ">
        Visible to assigned Anannt mentors in a real deployment. This slice seeds one faculty-reviewed
        submission with page mapping and rubric points. Feedback level is labelled faculty-reviewed —
        not self-review, not an AP score. Samuel Okonkwo’s notes stay attached to the original pages.
      </PageTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm">
            {sub.studentLabel} · uploaded{" "}
            <span suppressHydrationWarning>{new Date(sub.uploadedAt).toLocaleString()}</span> · {sub.feedbackLevel}
          </p>
          {sub.pages.map((p) => (
            <figure key={p.id} className="rounded-xl border bg-[#f7f3ea] p-2">
              <figcaption className="px-2 py-1 text-xs text-muted-foreground">{p.label}</figcaption>
              {p.svg && <div dangerouslySetInnerHTML={{ __html: p.svg }} />}
            </figure>
          ))}
        </div>
        <aside className="space-y-4">
          <section className="rounded-xl border p-4 text-sm">
            <h2 className="font-semibold">{frq.title}</h2>
            <p className="mt-2">
              <MathText text={frq.stem} />
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Page map:{" "}
              {sub.pageMap
                .map((m) => `page ${m.pageIndex + 1} → (${m.partId})`)
                .join("; ")}
            </p>
          </section>
          <section className="rounded-xl border p-4 text-sm">
            <h2 className="font-semibold">Rubric points</h2>
            <ul className="mt-2 space-y-1">
              {frq.rubric.map((r) => (
                <li key={r.id} className="flex gap-2">
                  <span aria-hidden>{sub.awarded[r.id] ? "✓" : "○"}</span>
                  <span>
                    {r.part} · {r.points} — {r.description}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-medium">
              Awarded {earned}/{frq.totalPoints} (faculty-reviewed)
            </p>
            <p className="mt-2 text-muted-foreground">{sub.reviewerNotes}</p>
            <p className="mt-2 text-xs">Reviewer: {sub.reviewerName}</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
