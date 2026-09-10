import { NextResponse } from "next/server";
import { markAnswer, getSolution } from "@/lib/content/item-keys";
import { ITEM_BY_ID } from "@/lib/content/items";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    itemId?: string;
    answer?: string;
    context?: string;
    revealSolution?: boolean;
    mockActive?: boolean;
    hintLevel?: number;
  };

  const itemId = body.itemId ?? "";
  const item = ITEM_BY_ID[itemId];
  if (!item) {
    return NextResponse.json({ error: "Unknown item." }, { status: 404 });
  }

  if (body.mockActive && !body.revealSolution) {
    return NextResponse.json({
      recorded: true,
      withheld: true,
      correct: null,
      feedback:
        "Hints, keys and tutor retrieval are withheld until this mock sitting is submitted. The attempt is stored without showing whether it is right.",
    });
  }

  const result = markAnswer(itemId, String(body.answer ?? ""));
  const solution =
    body.revealSolution && body.context !== "mock" ? getSolution(itemId) : undefined;

  return NextResponse.json({
    recorded: true,
    withheld: false,
    correct: result.correct,
    feedback: result.explanation,
    errorClass: result.errorClass ?? null,
    misconception: result.misconception ?? null,
    distractorNote: result.distractorNote ?? null,
    solution: solution ?? null,
    itemMeta: {
      skillId: item.skillId,
      familyId: item.familyId,
      representation: item.representation,
    },
  });
}
