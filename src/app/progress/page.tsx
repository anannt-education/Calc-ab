"use client";

import NextLink from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { SKILLS, UNITS } from "@/lib/content";
import { coverageStats } from "@/lib/mastery";
import { buildStudyPlan } from "@/lib/recommend";
import { Button } from "@/components/ui/button";
import { nowISO } from "@/lib/storage";

export default function ProgressPage() {
  const { state, setState, log } = useStudent();
  const stats = coverageStats(state);
  const plan = buildStudyPlan(state);
  const lastMock = state.mockSittings.find((m) => m.status === "submitted");
  const recentIndependent = state.attempts.filter((a) => a.context === "independent").slice(-5).reverse();

  return (
    <div>
      <PageTitle kicker="Progress" title="Coverage, independence, retention">
        Exposure is not independence. Independence is not retention. Provisional mock composites are
        not faculty scores and not AP predictions. If evidence is missing, the row says so — we will
        not invent a percentage to look finished.
      </PageTitle>

      <dl className="grid gap-3 sm:grid-cols-4">
        <Stat label="Lessons opened (exposure)" value={String(stats.openedLessons)} />
        <Stat label="Skills independently demonstrated" value={String(stats.independent)} />
        <Stat label="Skills retained" value={String(stats.retained)} />
        <Stat label="Review due" value={String(stats.reviewDue)} />
      </dl>

      {lastMock && (
        <section className="mt-6 rounded-xl border p-4">
          <h2 className="font-semibold">Latest self-administered mock</h2>
          <p className="text-sm">
            Effective year {lastMock.effectiveYear} · {lastMock.mode}. Anannt practice composite{" "}
            <strong>{lastMock.composite}%</strong> = 50 × {lastMock.mcqCorrect}/{lastMock.mcqTotal} + 50 ×{" "}
            {lastMock.frqPoints}/{lastMock.frqAvailable}. This is an internal rehearsal percentage, not an
            AP score and not a prediction.
          </p>
        </section>
      )}

      <section className="mt-6">
        <h2 className="font-semibold">Skill evidence</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-1">Skill</th>
                <th>Unit</th>
                <th>State</th>
                <th>Eligible independent</th>
              </tr>
            </thead>
            <tbody>
              {SKILLS.map((sk) => {
                const m = state.mastery[sk.id];
                return (
                  <tr key={sk.id} className="border-b">
                    <td className="py-1 pr-3">{sk.title}</td>
                    <td>{UNITS.find((u) => u.id === sk.unitId)?.number}</td>
                    <td>{(m?.state ?? "unknown").replaceAll("_", " ")}</td>
                    <td>
                      {m ? `${m.independentCorrect}/${m.independentTotal} · ${m.families.length} families` : "insufficient evidence"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Recent independent results</h2>
        {recentIndependent.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No independent checks yet. That is a starting point, not a score of zero. Finish a lesson
            independent check — a fresh question without hints — when you are ready.
          </p>
        ) : (
          <ul className="mt-2 list-disc pl-5 text-sm">
            {recentIndependent.map((a) => (
              <li key={a.id}>
                {a.itemId}: {a.correct ? "correct" : "incorrect"}
                {a.assisted ? " (assisted)" : ""} · {a.confidence} confidence
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 rounded-xl border p-4">
        <h2 className="font-semibold">Next priorities</h2>
        <p className="text-sm">{plan.next.title} — {plan.next.reason}</p>
        <NextLink href={plan.next.href} className="mt-2 inline-block text-sm text-primary underline">
          Continue this priority
        </NextLink>
      </section>

      <section className="mt-6 rounded-xl border p-4 text-sm">
        <h2 className="font-semibold">Note for a parent or mentor</h2>
        <p className="mt-1 text-muted-foreground">
          {stats.independent === 0
            ? "We have not yet seen independent work on a skill. Time in the course is not treated as learning. The useful next step is one focused lesson and a fresh question without hints."
            : `Independent evidence exists on ${stats.independent} skill${stats.independent === 1 ? "" : "s"}. ${stats.retained} ${stats.retained === 1 ? "has" : "have"} also passed a delayed check. ${stats.reviewDue ? `${stats.reviewDue} need a fresh review item.` : "Nothing is marked review due."} Login time is not part of this summary.`}
        </p>
      </section>

      <section className="mt-6 rounded-xl border p-4 text-sm">
        <h2 className="font-semibold">Anannt Exam Review</h2>
        <p className="text-muted-foreground">
          After a sitting, we discuss pacing, calculator transitions, and which evidence is still
          missing. We do not turn a practice composite into an AP score. Optional counselling sits here
          — after a report — never inside a timed mock.
        </p>
      </section>

      <section className="mt-6 rounded-xl border p-4 text-sm">
        <h2 className="font-semibold">Optional faculty feedback</h2>
        <p className="text-muted-foreground">
          After a meaningful report — not during a timed task — you can request a faculty-reviewed FRQ
          in Reasoning Studio. This is an invitation, not a score wall, and it does not hide the
          results you already have.
        </p>
        <NextLink href="/frq" className="mt-2 inline-block text-primary underline">
          Open FRQ studio
        </NextLink>
      </section>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setState((s) => ({ ...s, demoClockOffsetDays: s.demoClockOffsetDays + 7 }));
            log("review_due", { demo: true });
          }}
        >
          Advance demo clock 7 days
        </Button>
        <p className="text-xs text-muted-foreground" suppressHydrationWarning>
          Now {nowISO(state)}. Use this to practise delayed retrieval.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-semibold text-primary">{value}</dd>
    </div>
  );
}
