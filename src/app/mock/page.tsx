"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { EXAM_BLUEPRINT, EXAM_PARTS, SHORT_DRILL_COUNTS } from "@/lib/exam-config";
import { buttonVariants } from "@/components/ui/button";
import { nowISO } from "@/lib/storage";
import { appPath } from "@/lib/gate";
import type { MockSitting } from "@/lib/types";

export default function MockCentrePage() {
  const { state, setState } = useStudent();
  const last = state.mockSittings[0];

  function start(mode: MockSitting["mode"]) {
    const sitting: MockSitting = {
      id: `mock-${Date.now()}`,
      mode,
      effectiveYear: 2027,
      startedAt: nowISO(state),
      status: "in_progress",
      currentPart: "IA",
      partStartedAt: {},
      partEndsAt: {},
      acknowledged: {},
      selfAdministered: true,
    };
    setState((s) => ({
      ...s,
      mockSittings: [sitting, ...s.mockSittings],
      currentContext: { ...s.currentContext, mockSittingId: sitting.id, assessmentMode: "mock" },
    }));
    window.location.href = appPath(`/mock/sit/${sitting.id}`);
  }

  return (
    <div>
      <PageTitle kicker="Mock centre · effective year 2027" title="Hybrid digital AP Calculus AB rehearsal">
        Four parts with verified counts and durations. This sitting is <strong>self-administered</strong>
        unless a mentor is present. Anannt Exam Review afterwards discusses pacing and missing evidence.
        The practice composite is an internal percentage, not an AP score or prediction. Do not use a
        2026 45-question template.
      </PageTitle>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left text-sm">
          <caption className="bg-muted/50 px-3 py-2 text-left text-xs text-muted-foreground">
            {EXAM_BLUEPRINT.notes}
          </caption>
          <thead>
            <tr className="border-b">
              <th className="px-3 py-2">Part</th>
              <th>Questions</th>
              <th>Time</th>
              <th>Calculator</th>
            </tr>
          </thead>
          <tbody>
            {EXAM_PARTS.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-3 py-2">{p.label}</td>
                <td>{p.questions}</td>
                <td>{p.minutes} min</td>
                <td>{p.calculator === "required" ? "Required" : "Not permitted"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold">Short labelled drill</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Reduced counts for demo UX: I A {SHORT_DRILL_COUNTS.IA.questions} items / {SHORT_DRILL_COUNTS.IA.minutes}{" "}
            min; I B {SHORT_DRILL_COUNTS.IB.questions} / {SHORT_DRILL_COUNTS.IB.minutes}; II A {SHORT_DRILL_COUNTS.IIA.questions} FRQ /{" "}
            {SHORT_DRILL_COUNTS.IIA.minutes}; II B {SHORT_DRILL_COUNTS.IIB.questions} / {SHORT_DRILL_COUNTS.IIB.minutes}. This is not
            full-length.
          </p>
          <button type="button" className={buttonVariants({ className: "mt-3" })} onClick={() => start("short-drill")}>
            Equipment check, then start drill
          </button>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold">Full 2027 structure</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Official 29 + 13 MCQ and 2 + 4 FRQ timers. Some later items are labelled placeholders you may
            skip. Structure and timing are real.
          </p>
          <button type="button" className={buttonVariants({ className: "mt-3" })} onClick={() => start("full-2027")}>
            Equipment check, then start full structure
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border p-4 text-sm">
        <h2 className="font-semibold">Anannt Exam Review (after you submit)</h2>
        <p className="mt-1">
          We will not predict an AP score. After the sitting you will see raw part outcomes, an
          internal practice composite, and a next priority. Optional faculty counselling is offered
          then — never during the timer.{" "}
          <Link href="/exam/2027" className="text-primary underline-offset-2 hover:underline">
            2027 exam guide
          </Link>
        </p>
      </section>

      <section className="mt-6 rounded-xl border p-4 text-sm">
        <h2 className="font-semibold">Eligibility and equipment</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>You have finished at least one independent check in this slice, or you accept that this is rehearsal not certification.</li>
          <li>Calculator route: {state.profile?.calculatorRoute ?? "choose in onboarding"} — train the exam route, not a classroom replica.</li>
          <li>Hints, Ask Anannt, and answer keys are off until the sitting is submitted.</li>
          <li>Refresh does not reset a part timer once the part has started (clock stored on the sitting).</li>
        </ul>
      </section>

      {last && (
        <p className="mt-4 text-sm">
          Last sitting: {last.mode} · {last.status}
          {last.composite != null && (
            <>
              {" "}
              · Anannt practice composite {last.composite}% (internal).{" "}
              <Link href="/progress" className="underline">
                Progress
              </Link>
            </>
          )}
        </p>
      )}
    </div>
  );
}
