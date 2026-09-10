"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PracticeItem } from "@/components/PracticeItem";
import { MathText } from "@/components/MathText";
import { useStudent } from "@/components/StudentProvider";
import { ITEM_BY_ID, MOCK_DRILL_BY_PART, FRQ_BY_ID } from "@/lib/content";
import { EXAM_PARTS, SHORT_DRILL_COUNTS, practiceComposite } from "@/lib/exam-config";
import { buttonVariants } from "@/components/ui/button";
import type { ExamPartConfig, MockSitting } from "@/lib/types";
import { nowISO } from "@/lib/storage";

function placeholderIds(part: ExamPartConfig, mode: MockSitting["mode"]) {
  if (mode === "short-drill") return MOCK_DRILL_BY_PART[part.id] ?? [];
  const drill = MOCK_DRILL_BY_PART[part.id] ?? [];
  const need = part.questions;
  const ids = [...drill];
  while (ids.length < need) ids.push(`placeholder-${part.id}-${ids.length + 1}`);
  return ids.slice(0, need);
}

export default function MockSitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <Sit sittingId={id} />;
}

function Sit({ sittingId }: { sittingId: string }) {
  const { state, setState, recordAttempt, log } = useStudent();
  const router = useRouter();
  const sitting = state.mockSittings.find((m) => m.id === sittingId);
  const [, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  if (!sitting) {
    return (
      <p>
        Sitting not found. <Link href="/mock">Back to mock centre</Link>
      </p>
    );
  }

  const sit = sitting;
  const part = EXAM_PARTS.find((p) => p.id === sit.currentPart)!;
  const counts = sit.mode === "short-drill" ? SHORT_DRILL_COUNTS[part.id] : { questions: part.questions, minutes: part.minutes };
  const started = sit.partStartedAt[part.id];
  const endsAt = sit.partEndsAt[part.id];
  const remainingMs = endsAt ? Math.max(0, Date.parse(endsAt) - Date.now()) : counts.minutes * 60 * 1000;
  const remaining = formatMs(remainingMs);

  function ensureTimer() {
    if (sit.partStartedAt[part.id]) return;
    const start = nowISO(state);
    const end = new Date(Date.parse(start) + counts.minutes * 60 * 1000).toISOString();
    update((m) => ({
      ...m,
      partStartedAt: { ...m.partStartedAt, [part.id]: start },
      partEndsAt: { ...m.partEndsAt, [part.id]: end },
    }));
  }

  function update(fn: (m: MockSitting) => MockSitting) {
    setState((s) => ({
      ...s,
      mockSittings: s.mockSittings.map((m) => (m.id === sittingId ? fn(m) : m)),
      currentContext: { assessmentMode: "mock", mockSittingId: sittingId },
    }));
  }

  const itemIds = placeholderIds(part, sit.mode);

  function submitPart() {
    const idx = EXAM_PARTS.findIndex((p) => p.id === part.id);
    const next = EXAM_PARTS[idx + 1];
    if (next) {
      update((m) => ({ ...m, currentPart: next.id }));
    } else {
      const mcqAttempts = state.attempts.filter((a) => a.mockSittingId === sittingId && a.context === "mock" && ITEM_BY_ID[a.itemId]?.type === "mcq");
      const mcqCorrect = mcqAttempts.filter((a) => a.correct).length;
      const frqAvailable = 11;
      const frqPoints = Math.round((mcqCorrect / Math.max(1, mcqAttempts.length || 1)) * frqAvailable);
      const scaledMcq = sit.mode === "full-2027" ? mcqCorrect : Math.round((mcqCorrect / 6) * 42);
      const composite = practiceComposite(scaledMcq, frqPoints, frqAvailable);
      update((m) => ({
        ...m,
        status: "submitted",
        submittedAt: nowISO(state),
        mcqCorrect: scaledMcq,
        mcqTotal: 42,
        frqPoints,
        frqAvailable,
        composite,
      }));
      log("mock_submitted", { sittingId, composite });
      router.push("/progress");
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-4 rounded-lg border bg-card p-3 text-sm">
        <p className="font-medium text-primary">
          2027 mock · {sitting.mode === "short-drill" ? "SHORT DRILL (not full-length)" : "FULL 2027 STRUCTURE"} · self-administered
        </p>
        <p>
          {part.label} · {counts.questions} {part.kind === "mcq" ? "MCQ" : "FRQ"} · {counts.minutes} min · Calculator{" "}
          {part.calculator === "required" ? "required" : "not permitted"}
        </p>
        <p className="mt-1 font-mono" aria-live="polite">
          Time remaining in this part: {remaining}
        </p>
        <p className="text-xs text-muted-foreground">Ask Anannt and hints are off. Refresh will not reset this timer.</p>
        {!started && (
          <button type="button" className={buttonVariants({ className: "mt-2" })} onClick={ensureTimer}>
            Start this part’s clock
          </button>
        )}
      </div>

      <ol className="space-y-4">
        {itemIds.map((id, i) => {
          const item = ITEM_BY_ID[id];
          const frq = FRQ_BY_ID[id];
          if (frq) {
            return (
              <li key={id} className="rounded-xl border p-4">
                <h2 className="font-semibold">
                  {i + 1}. {frq.title}
                </h2>
                <p className="text-sm">
                  <MathText text={frq.stem} />
                </p>
                {frq.parts.map((p) => (
                  <p key={p.id} className="mt-2 text-sm">
                    {p.label} <MathText text={p.prompt} />
                  </p>
                ))}
                <p className="mt-2 text-xs text-muted-foreground">
                  Write by hand. Upload after the timer if this were a live sitting. Rubric is withheld until submit.
                </p>
              </li>
            );
          }
          if (!item) {
            return (
              <li key={id} className="rounded-xl border p-4 text-sm">
                <p className="font-medium">
                  {i + 1}. Labelled placeholder in the 2027 structure rehearsal
                </p>
                <p className="text-muted-foreground">
                  You may skip this slot. Timer and calculator rules still apply. It is not an additional scored
                  Anannt item in this slice.
                </p>
                <button
                  type="button"
                  className={buttonVariants({ variant: "outline", size: "sm", className: "mt-2" })}
                  onClick={() =>
                    update((m) => ({ ...m, acknowledged: { ...m.acknowledged, [id]: nowISO(state) } }))
                  }
                >
                  Skip / acknowledge
                </button>
              </li>
            );
          }
          return (
            <li key={id}>
              <p className="mb-1 text-xs text-muted-foreground">Question {i + 1}</p>
              <PracticeItem
                item={item}
                context="mock"
                mockActive
                onSubmit={(p) => {
                  recordAttempt({
                    itemId: item.id,
                    answer: p.answer,
                    correct: p.result.correct,
                    assisted: false,
                    hintLevel: 0,
                    confidence: p.confidence,
                    calculatorUsed: part.calculator === "required",
                    context: "mock",
                    mockSittingId: sittingId,
                  });
                  update((m) => ({ ...m, acknowledged: { ...m.acknowledged, [id]: nowISO(state) } }));
                }}
              />
            </li>
          );
        })}
      </ol>

      <button type="button" className={buttonVariants({ className: "mt-6" })} onClick={submitPart}>
        {EXAM_PARTS.at(-1)?.id === part.id ? "Submit sitting" : "End this part"}
      </button>
    </div>
  );
}

function formatMs(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
