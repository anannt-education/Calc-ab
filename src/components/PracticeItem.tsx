"use client";

import { useState } from "react";
import type { Confidence, ItemPublic } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MathText } from "./MathText";
import { Flag } from "lucide-react";
import { mentorNotLearned, mentorOnMiss, mentorOnSuccess } from "@/lib/mentor-copy";
import { apiUrl } from "@/lib/gate";

export type MarkResult = {
  correct: boolean | null;
  withheld?: boolean;
  feedback?: string;
  explanation?: string;
  errorClass?: string | null;
  misconception?: "sign" | "missing_chain" | null;
  distractorNote?: string | null;
  solution?: string | null;
};

export function PracticeItem({
  item,
  context,
  mockActive,
  onSubmit,
  onReport,
}: {
  item: ItemPublic;
  context: "diagnostic" | "lesson" | "independent" | "practice" | "review" | "mock";
  mockActive?: boolean;
  onSubmit: (payload: {
    answer: string;
    confidence: Confidence;
    calculatorUsed: boolean;
    scratchwork: string;
    assisted: boolean;
    hintLevel: 0 | 1 | 2 | 3 | 4;
    notLearned?: boolean;
    result: MarkResult;
  }) => void;
  onReport?: (note: string) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const [calc, setCalc] = useState(item.calculator === "required");
  const [scratch, setScratch] = useState("");
  const [notLearned, setNotLearned] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<MarkResult | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportNote, setReportNote] = useState("");

  async function submit(opts?: { notLearned?: boolean }) {
    setPending(true);
    if (opts?.notLearned) {
      const data: MarkResult = {
        correct: null,
        feedback:
          "Recorded as not yet learned — a starting point, not a careless error. This does not count as a miss.",
      };
      setResult(data);
      setPending(false);
      onSubmit({
        answer: "not-learned",
        confidence,
        calculatorUsed: calc,
        scratchwork: scratch,
        assisted: false,
        hintLevel: 0,
        notLearned: true,
        result: data,
      });
      return;
    }
    const payload = {
      itemId: item.id,
      answer,
      context,
      mockActive: Boolean(mockActive),
    };
    const res = await fetch(apiUrl("/api/mark"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as MarkResult;
    setResult(data);
    setPending(false);
    onSubmit({
      answer,
      confidence,
      calculatorUsed: calc,
      scratchwork: scratch,
      assisted: false,
      hintLevel: 0,
      notLearned: false,
      result: data,
    });
  }

  return (
    <article className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{item.representation}</span>
        <span aria-hidden>·</span>
        <span>
          Calculator: {item.calculator === "none" ? "not permitted for this item" : item.calculator}
        </span>
        {item.protectedMock && <span>· protected mock pool</span>}
      </div>
      <div className="prose-math text-base">
        <MathText text={item.stem} />
      </div>

      {item.choices && !notLearned && (
        <RadioGroup className="mt-4 gap-2" value={answer} onValueChange={setAnswer}>
          {item.choices.map((c) => (
            <div key={c.id} className="flex items-start gap-2 rounded-md border p-2">
              <RadioGroupItem value={c.id} id={`${item.id}-${c.id}`} />
              <Label htmlFor={`${item.id}-${c.id}`} className="font-normal">
                <span className="mr-2 font-medium uppercase">{c.id}.</span>
                <MathText text={c.text} />
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {(item.type === "numeric" || item.type === "short") && !notLearned && (
        <div className="mt-4">
          <Label htmlFor={`${item.id}-ans`}>Response</Label>
          <Input
            id={`${item.id}-ans`}
            className="mt-1 max-w-xs"
            inputMode={item.type === "numeric" ? "decimal" : "text"}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      )}

      {item.allowNotLearned && (
        <label className="mt-3 flex items-center gap-2 text-sm">
          <Checkbox checked={notLearned} onCheckedChange={(v) => setNotLearned(Boolean(v))} />
          I have not learned this yet
        </label>
      )}

      {!mockActive && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm">Confidence</p>
            <RadioGroup value={confidence} onValueChange={(v) => setConfidence(v as Confidence)} className="flex gap-3">
              {(["low", "medium", "high"] as const).map((c) => (
                <label key={c} className="flex items-center gap-1 text-sm">
                  <RadioGroupItem value={c} />
                  {c}
                </label>
              ))}
            </RadioGroup>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={calc} onCheckedChange={(v) => setCalc(Boolean(v))} />
            I used a calculator
          </label>
        </div>
      )}

      {!mockActive && (
        <div className="mt-3">
          <Label htmlFor={`${item.id}-scratch`}>Scratchwork (optional)</Label>
          <Textarea
            id={`${item.id}-scratch`}
            className="mt-1"
            rows={3}
            value={scratch}
            onChange={(e) => setScratch(e.target.value)}
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" disabled={pending || (!notLearned && !answer)} onClick={() => submit({ notLearned })}>
          {notLearned ? "Record as not yet learned" : "Check my reasoning"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setReportOpen((o) => !o)}>
          <Flag className="size-3.5" /> Report ambiguous mathematics
        </Button>
      </div>

      {reportOpen && (
        <div className="mt-3 rounded-md border p-3">
          <Label htmlFor={`${item.id}-rep`}>What is ambiguous?</Label>
          <Textarea id={`${item.id}-rep`} className="mt-1" value={reportNote} onChange={(e) => setReportNote(e.target.value)} />
          <Button
            type="button"
            className="mt-2"
            size="sm"
            onClick={() => {
              onReport?.(reportNote);
              setReportOpen(false);
              setReportNote("");
            }}
          >
            Send report
          </Button>
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-md bg-muted/60 p-3 text-sm" role="status">
          {result.withheld ? (
            <p>{result.feedback}</p>
          ) : notLearned ? (
            <p>{mentorNotLearned()}</p>
          ) : result.correct ? (
            <p>{mentorOnSuccess({ confidence, context })}</p>
          ) : (
            <p>{mentorOnMiss(result.errorClass)}</p>
          )}
          {result.misconception === "sign" && (
            <p className="mt-1">
              This matches the sign mix-up: treating geometric area as if the accumulation function must
              rise. Next: remember that negative <MathText text="$f$" /> makes <MathText text="$A$" /> decrease.
              That is a different error from dropping a chain factor.
            </p>
          )}
          {result.misconception === "missing_chain" && (
            <p className="mt-1">
              This matches a missing chain factor on a variable upper limit. You had the FTC idea; the
              inner derivative is the extra piece. It is not the same as the sign mix-up.
            </p>
          )}
          {result.distractorNote && <p className="mt-1">{result.distractorNote}</p>}
          {result.explanation && !result.withheld && context !== "mock" && (
            <p className="mt-2 text-muted-foreground">
              <MathText text={result.explanation} />
            </p>
          )}
        </div>
      )}
    </article>
  );
}
