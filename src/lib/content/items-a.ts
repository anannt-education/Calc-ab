import type { ItemPublic } from "../types";

function item(p: ItemPublic): ItemPublic {
  return p;
}

const rights = "Original Anannt Education item. Not a College Board released question.";

export const ITEMS_A: ItemPublic[] = [
  item({
    id: "diag-01",
    familyId: "fam-f-notation",
    skillId: "sk-f-notation",
    stem: "If $f(x)=3x-1$ and $g(x)=x^2$, what is $f(g(2))$?",
    type: "mcq",
    choices: [
      { id: "a", text: "$11$" },
      { id: "b", text: "$25$" },
      { id: "c", text: "$5$" },
      { id: "d", text: "$35$" },
    ],
    calculator: "none",
    representation: "analytic",
    difficulty: 1,
    unitId: "foundation",
    protectedMock: false,
    allowNotLearned: true,
    status: "published",
    authorId: "author-anannt-calc",
    reviewerId: "approver-anannt-academic",
    rights,
    pool: "diagnostic",
  }),
];
