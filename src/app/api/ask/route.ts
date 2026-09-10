import { NextResponse } from "next/server";
import { LESSON_BY_ID } from "@/lib/content/lessons";
import { getSolution } from "@/lib/content/item-keys";
import { ITEM_BY_ID } from "@/lib/content/items";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    lessonId?: string;
    itemId?: string;
    level?: number;
    mockActive?: boolean;
    wantSolution?: boolean;
  };

  if (body.mockActive) {
    return NextResponse.json({
      blocked: true,
      text: "Ask Anannt is turned off during a mock — exam isolation, not a refusal to teach. After you submit, Exam Review can talk about the four parts. Protected answers stay withheld until then.",
    });
  }

  const lesson = body.lessonId ? LESSON_BY_ID[body.lessonId] : undefined;
  const item = body.itemId ? ITEM_BY_ID[body.itemId] : undefined;
  const level = Math.min(4, Math.max(1, body.level ?? 1)) as 1 | 2 | 3 | 4;

  if (body.wantSolution) {
    if (!body.itemId) {
      return NextResponse.json({
        assisted: true,
        text: "A full solution is available only for the current practice item, in learning mode. Asking for it marks the attempt assisted. That is still learning; it cannot by itself certify independent mastery.",
      });
    }
    const sol = getSolution(body.itemId);
    return NextResponse.json({
      assisted: true,
      text: sol ?? "No released solution for this item.",
      itemId: body.itemId,
    });
  }

  const hint = lesson?.hints.find((h) => h.level === level);
  const fallback: Record<number, string> = {
    1: `Let us name what the question is actually asking — often a nearby behaviour, a rate, or a signed accumulation — not the most recently written formula. ${item ? `This item is tagged ${item.representation}.` : ""}`,
    2: "What quantity would still be defined if a single filled point, or a single formula, were removed?",
    3: "Name the theorem or rule, then check its hypotheses (continuity, matching inner derivative, units). That sentence is the method choice.",
    4: "Write the first algebraic or graphical step only. Stop before the last line if you can finish it — that is the evidence we want to see you produce.",
  };

  return NextResponse.json({
    blocked: false,
    level,
    label: hint?.label ?? ["Restate", "Question", "Strategy", "Step"][level - 1],
    text: hint?.text ?? fallback[level],
    lessonId: lesson?.id ?? null,
  });
}
