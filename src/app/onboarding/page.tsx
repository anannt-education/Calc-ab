"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageTitle } from "@/components/AppShell";
import { PracticeItem } from "@/components/PracticeItem";
import { useStudent } from "@/components/StudentProvider";
import { DIAGNOSTIC_ITEM_IDS, ITEM_BY_ID } from "@/lib/content";
import { SKILL_BY_ID } from "@/lib/content/skills";
import { studyGateUrl } from "@/lib/gate";
import { defaultProfile, SCHOOL_TOPICS } from "@/lib/storage";
import type { OnboardingProfile } from "@/lib/types";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading onboarding…</p>}>
      <OnboardingInner />
    </Suspense>
  );
}

function OnboardingInner() {
  const params = useSearchParams();
  const startDiag = params.get("step") === "diagnostic";
  const { state, setState, recordAttempt, log } = useStudent();
  const [step, setStep] = useState<"profile" | "diagnostic">(startDiag ? "diagnostic" : "profile");
  const [form, setStateForm] = useState<OnboardingProfile>(
    state.profile ?? defaultProfile({ skippedOptional: false })
  );
  const [qIndex, setQIndex] = useState(0);
  const [skipOptional, setSkipOptional] = useState(false);

  useEffect(() => {
    if (step === "diagnostic") {
      log("diagnostic_start", { subject: "calculus-ab" });
    }
  }, [step, log]);

  const items = useMemo(() => DIAGNOSTIC_ITEM_IDS.map((id) => ITEM_BY_ID[id]).filter(Boolean), []);
  const current = items[qIndex];

  function saveProfile(next = form) {
    setState((s) => ({ ...s, profile: next }));
  }

  function finishDiagnostic() {
    setState((s) => ({
      ...s,
      profile: { ...(s.profile ?? form), diagnosticCompleted: true },
    }));
    log("diagnostic_completed", { items: items.length, subject: "calculus-ab" });
    window.location.assign(studyGateUrl("u1"));
  }

  if (step === "diagnostic" && current) {
    const findings = summarize(state);
    return (
      <div className="max-w-2xl">
        <PageTitle kicker="Placement" title="Prerequisite diagnostic">
          A short set — it chooses where to start, it does not certify the course. If a topic is new,
          mark “I have not learned this yet.” That is a placement fact for beginners, not a miss.
          Question {qIndex + 1} of {items.length}.
        </PageTitle>
        <PracticeItem
          key={current.id}
          item={current}
          context="diagnostic"
          onSubmit={(p) => {
            recordAttempt({
              itemId: current.id,
              answer: p.answer,
              correct: p.notLearned ? null : p.result.correct,
              assisted: false,
              hintLevel: 0,
              confidence: p.confidence,
              calculatorUsed: p.calculatorUsed,
              scratchwork: p.scratchwork,
              errorClass: (p.result.errorClass as never) ?? undefined,
              notLearned: p.notLearned,
              context: "diagnostic",
            });
          }}
        />
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setQIndex((i) => Math.min(items.length - 1, i + 1))}
          >
            Next check
          </Button>
          {qIndex >= items.length - 1 && (
            <Button type="button" onClick={finishDiagnostic}>
              Show my starting path
            </Button>
          )}
        </div>
        {findings.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold">Skill-level findings so far</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {findings.map((f) => (
                <li key={f.skill}>{f.line}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Anannt Education" title="Before we recommend a first task">
        Target AP Calculus AB for May 2027. School examinations are not assumed to use the AP
        format. Skip anything marked optional. If you are new to calculus, that is expected — the
        diagnostic is built for you, not only for students who already sat limits.
      </PageTitle>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          saveProfile({ ...form, skippedOptional: skipOptional });
          setStep("diagnostic");
        }}
        action="#"
      >
        <Field label="What should we call you?">
          <Input
            value={form.displayName}
            onChange={(e) => setStateForm({ ...form, displayName: e.target.value })}
          />
        </Field>
        <Field label="Target AP exam year">
          <p className="text-sm">2027 (this course version is locked to the May 2027 hybrid digital format).</p>
        </Field>
        <Field label="Current school topic (not the AP exam date)">
          <RadioGroup
            value={form.schoolTopic}
            onValueChange={(v) => setStateForm({ ...form, schoolTopic: v })}
          >
            {SCHOOL_TOPICS.map((t) => (
              <label key={t.id} className="flex items-center gap-2 text-sm">
                <RadioGroupItem value={t.id} />
                {t.label}
              </label>
            ))}
          </RadioGroup>
        </Field>
        <Field label="Prior calculus exposure">
          <RadioGroup
            value={form.priorExposure}
            onValueChange={(v) => setStateForm({ ...form, priorExposure: v as OnboardingProfile["priorExposure"] })}
          >
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="none" /> None yet
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="precalculus" /> Precalculus only
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="limits-only" /> Limits in school
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="full-ab-school" /> Full AB in school
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="repeat" /> Repeating AP
            </label>
          </RadioGroup>
        </Field>
        <Field label="Weekly study time you can actually keep (minutes)">
          <Input
            type="number"
            min={45}
            value={form.weeklyMinutes}
            onChange={(e) => setStateForm({ ...form, weeklyMinutes: Number(e.target.value) })}
          />
        </Field>
        <Field label="Calculator route on exam day">
          <RadioGroup
            value={form.calculatorRoute}
            onValueChange={(v) =>
              setStateForm({ ...form, calculatorRoute: v as OnboardingProfile["calculatorRoute"] })
            }
          >
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="desmos-bluebook" /> Built-in Desmos in Bluebook (official route)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="handheld" /> Approved handheld graphing calculator
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="both" /> Both — I will train both
            </label>
          </RadioGroup>
          <p className="mt-1 text-xs text-muted-foreground">
            A classroom graphing widget in this product is not a replica of the exam calculator. Train
            the route you will actually use.
          </p>
        </Field>
        <fieldset className="rounded-lg border p-3">
          <legend className="text-sm font-medium">Optional — skip if you prefer</legend>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={skipOptional}
              onChange={(e) => setSkipOptional(e.target.checked)}
            />
            Skip optional questions
          </label>
          {!skipOptional && (
            <div className="mt-3 space-y-3">
              <Field label="Optional target score (not a promise)">
                <Input
                  placeholder="e.g. 4 — this is a hope, not an outcome we can promise"
                  value={form.targetScore ?? ""}
                  onChange={(e) => setStateForm({ ...form, targetScore: e.target.value })}
                />
              </Field>
              <Field label="School examination date (if any) — not the AP date">
                <Input
                  type="date"
                  value={form.schoolExamDate ?? ""}
                  onChange={(e) => setStateForm({ ...form, schoolExamDate: e.target.value })}
                />
              </Field>
            </div>
          )}
        </fieldset>
        <Field label="AP Calculus AB examination date (planning)">
          <Input
            type="date"
            value={form.apExamDate}
            onChange={(e) => setStateForm({ ...form, apExamDate: e.target.value })}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Distinct from any school exam date. Confirm the official date with College Board when
            published for 2027.
          </p>
        </Field>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => {
              saveProfile({ ...form, skippedOptional: skipOptional });
              setStep("diagnostic");
            }}
          >
            Continue to diagnostic
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              saveProfile({ ...form, skippedOptional: true });
              setStep("diagnostic");
            }}
          >
            Skip optional and continue
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      {children}
    </div>
  );
}

function summarize(state: { attempts: { skillId: string; notLearned?: boolean; correct: boolean | null }[] }) {
  const bySkill = new Map<string, { unseen: number; wrong: number; right: number }>();
  for (const a of state.attempts.filter((x) => x)) {
    const cur = bySkill.get(a.skillId) ?? { unseen: 0, wrong: 0, right: 0 };
    if (a.notLearned) cur.unseen += 1;
    else if (a.correct) cur.right += 1;
    else cur.wrong += 1;
    bySkill.set(a.skillId, cur);
  }
  return [...bySkill.entries()].map(([skill, c]) => {
    const title = SKILL_BY_ID[skill]?.title ?? skill;
    if (c.unseen && !c.right && !c.wrong) {
      return { skill, line: `${title}: not yet learned (${c.unseen} mark). That is a starting point for a beginner, not a mistake.` };
    }
    return {
      skill,
      line: `${title}: ${c.right} independent-looking hits, ${c.wrong} misses, ${c.unseen} unseen. The evidence count is still small — we will not pretend this is a percentage.`,
    };
  });
}
