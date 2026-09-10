import type { FrqSubmission, FrqTask } from "../types";

export const FRQS: FrqTask[] = [
  {
    id: "frq-tank",
    title: "Rainwater tank (calculator required)",
    calculator: "required",
    stem: "A rainwater tank has height of water $H(t)$ centimetres at time $t$ minutes after 8:00. A sensor gives the selected values in the table. $H$ is twice differentiable. (This is an original Anannt task, not a released College Board question.)",
    parts: [
      {
        id: "a",
        label: "(a)",
        prompt:
          "Use the data to estimate $H'(6)$. Show the difference quotient and include units.",
      },
      {
        id: "b",
        label: "(b)",
        prompt:
          "Is there a time $c$ in $(3,12)$ with $H'(c)=0$? Justify using a theorem, or explain why the theorem does not apply with the given information.",
      },
      {
        id: "c",
        label: "(c)",
        prompt:
          "Water is also leaking according to $L'(t)=-0.4t$ cm/min of height (a model). If $A(x)=\\int_0^x H'(t)\\,dt$, interpret $A(10)$ and compute $A'(10)$ from the table’s estimated $H'(10)$ if $H'(10)\\approx -1.1$.",
      },
    ],
    rubric: [
      { id: "a1", part: "a", points: 1, description: "Difference quotient using an interval containing $t=6$ (e.g. $[3,8]$ or $[6,8]$)." },
      { id: "a2", part: "a", points: 1, description: "Correct numerical estimate with units cm/min." },
      { id: "b1", part: "b", points: 1, description: "Notes that $H$ is differentiable (hence continuous) so MVT or Rolle-type reasoning may apply if a repeated value is found." },
      { id: "b2", part: "b", points: 1, description: "Uses table values: $H(3)=20$, $H(12)=20$ (seeded values) to invoke Rolle/MVT and conclude some $c$ with $H'(c)=0$." },
      { id: "c1", part: "c", points: 1, description: "Interprets $A(10)=H(10)-H(0)$ as net change in height over $10$ minutes." },
      { id: "c2", part: "c", points: 1, description: "States $A'(10)=H'(10)\\approx -1.1$ cm/min." },
    ],
    modelSolution:
      "Table (seeded): $t=0,3,6,8,12$ with $H=24,20,17,16,20$.\n(a) $H'(6)\\approx(16-20)/(8-3)=-0.8$ cm/min, or $(16-17)/(8-6)=-0.5$ cm/min. Either consistent choice with the interval shown.\n(b) $H(3)=H(12)=20$, $H$ differentiable, so Rolle’s theorem gives $c\\in(3,12)$ with $H'(c)=0$.\n(c) $A(10)$ is net change in height from $t=0$ to $t=10$. $A'(10)=H'(10)\\approx -1.1$ cm/min.",
    commonNonCredit: [
      "Units missing on the rate.",
      "Invoking IVT on $H'$ without hypothesising continuity of $H'$.",
      "Treating $A(10)$ as geometric area without the net-change sentence.",
    ],
    status: "published",
    skillIds: ["sk-u4-context", "sk-u5-theorems", "sk-u6-ftc"],
    totalPoints: 6,
  },
  {
    id: "frq-limit",
    title: "A piecewise rate (no calculator)",
    calculator: "none",
    stem: "Let $f(x)=\\begin{cases} \\dfrac{x^2-4}{x-2} & x\\neq 2 \\\\ k & x=2 \\end{cases}$. (Original Anannt task.)",
    parts: [
      {
        id: "a",
        label: "(a)",
        prompt: "Find $\\lim_{x\\to 2}f(x)$, or explain why it does not exist.",
      },
      {
        id: "b",
        label: "(b)",
        prompt: "Find the unique $k$ that makes $f$ continuous at $2$. Explain using the continuity checklist.",
      },
      {
        id: "c",
        label: "(c)",
        prompt: "With that $k$, is $f$ differentiable at $2$? Answer by comparing one-sided derivatives of the simplified expression.",
      },
    ],
    rubric: [
      { id: "a1", part: "a", points: 1, description: "Simplifies to $x+2$ for $x\\neq 2$." },
      { id: "a2", part: "a", points: 1, description: "Limit equals $4$." },
      { id: "b1", part: "b", points: 1, description: "Sets $k=4$ so that $f(2)$ equals the limit." },
      { id: "b2", part: "b", points: 1, description: "Mentions the three continuity conditions." },
      { id: "c1", part: "c", points: 1, description: "After filling the hole, $f(x)=x+2$ everywhere, so $f'(2)=1$." },
    ],
    modelSolution:
      "(a) For $x\\neq 2$, $f(x)=x+2$, so the limit is $4$.\n(b) Need $f(2)=4$, the limit exists, and they agree: $k=4$.\n(c) With $k=4$, $f(x)=x+2$ for all $x$, differentiable, $f'(2)=1$.",
    commonNonCredit: [
      "Saying the limit DNE because $f(2)$ was originally a parameter.",
      "Claiming differentiability fails because of a hole that has been filled.",
    ],
    status: "published",
    skillIds: ["sk-u1-limit-value", "sk-u1-continuity", "sk-u2-differentiability"],
    totalPoints: 5,
  },
];

export const FRQ_BY_ID = Object.fromEntries(FRQS.map((f) => [f.id, f]));

const HANDWRITTEN_PAGE_1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" role="img" aria-labelledby="hw1-title hw1-desc">
  <title id="hw1-title">Priya's handwritten page 1 for the tank FRQ</title>
  <desc id="hw1-desc">Ink-style writing: part a difference quotient (16-20)/(8-3) = -0.8 cm per min. Part b notes H(3)=H(12)=20 and names Rolle.</desc>
  <rect width="400" height="520" fill="#f7f3ea"/>
  <text x="24" y="36" font-size="14" font-family="cursive" fill="#1b3a5f">FRQ tank — Priya S.  page 1/2</text>
  <text x="24" y="70" font-size="13" font-family="cursive" fill="#222">(a) Use [3,8] because 6 is inside.</text>
  <text x="24" y="96" font-size="13" font-family="cursive" fill="#222">H'(6) ≈ (H(8)-H(3))/(8-3)</text>
  <text x="40" y="122" font-size="13" font-family="cursive" fill="#222">= (16-20)/5 = -4/5 = -0.8 cm/min</text>
  <text x="24" y="160" font-size="13" font-family="cursive" fill="#222">The water height is falling at about</text>
  <text x="24" y="184" font-size="13" font-family="cursive" fill="#222">0.8 cm each minute at t=6.</text>
  <text x="24" y="230" font-size="13" font-family="cursive" fill="#222">(b) H(3)=20 and H(12)=20.</text>
  <text x="24" y="256" font-size="13" font-family="cursive" fill="#222">H is twice differentiable so H' exists</text>
  <text x="24" y="282" font-size="13" font-family="cursive" fill="#222">and H is continuous on [3,12].</text>
  <text x="24" y="308" font-size="13" font-family="cursive" fill="#222">Rolle ⇒ some c in (3,12) with H'(c)=0.</text>
  <path d="M30 340 C80 360 140 330 190 350" fill="none" stroke="#1b3a5f" stroke-width="1.2"/>
  <text x="24" y="380" font-size="12" font-family="cursive" fill="#555">sketch: height returns to 20</text>
</svg>`;

const HANDWRITTEN_PAGE_2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" role="img" aria-labelledby="hw2-title hw2-desc">
  <title id="hw2-title">Priya's handwritten page 2 for the tank FRQ</title>
  <desc id="hw2-desc">Part c: A(10) is net change in height. A'(10)=H'(10) approximately -1.1 cm per min. Missing leak-model comparison.</desc>
  <rect width="400" height="520" fill="#f7f3ea"/>
  <text x="24" y="36" font-size="14" font-family="cursive" fill="#1b3a5f">page 2/2</text>
  <text x="24" y="70" font-size="13" font-family="cursive" fill="#222">(c) A(x)=∫ from 0 to x of H'(t) dt</text>
  <text x="24" y="96" font-size="13" font-family="cursive" fill="#222">A(10)=H(10)-H(0)  net change in height</text>
  <text x="24" y="122" font-size="13" font-family="cursive" fill="#222">over the first 10 minutes (cm).</text>
  <text x="24" y="158" font-size="13" font-family="cursive" fill="#222">A'(10)=H'(10)≈ -1.1 cm/min</text>
  <text x="24" y="186" font-size="13" font-family="cursive" fill="#222">by FTC.</text>
  <text x="24" y="230" font-size="13" font-family="cursive" fill="#222">I did not compare this to L'(10).</text>
  <text x="24" y="270" font-size="12" font-family="cursive" fill="#884">(faculty: leak comparison not required</text>
  <text x="24" y="290" font-size="12" font-family="cursive" fill="#884">by the rubric point list.)</text>
</svg>`;

export const DEMO_FACULTY_SUBMISSION: FrqSubmission = {
  id: "sub-priya-tank",
  frqId: "frq-tank",
  studentLabel: "Priya S. (demo)",
  uploadedAt: "2026-09-08T10:15:00.000Z",
  pages: [
    { id: "p1", label: "Page 1", kind: "faculty-demo", svg: HANDWRITTEN_PAGE_1 },
    { id: "p2", label: "Page 2", kind: "faculty-demo", svg: HANDWRITTEN_PAGE_2 },
  ],
  pageMap: [
    { pageIndex: 0, partId: "a" },
    { pageIndex: 0, partId: "b" },
    { pageIndex: 1, partId: "c" },
  ],
  feedbackLevel: "faculty-reviewed",
  awarded: { a1: true, a2: true, b1: true, b2: true, c1: true, c2: true },
  reviewerName: "Samuel Okonkwo",
  reviewerNotes:
    "Clear difference quotient and units — you showed the rate independently, including cm/min. Rolle is named with matching endpoint heights. FTC interpretation of A(10) is present. Award 6/6. This is faculty-reviewed scoring by Anannt Reasoning Studio, not a College Board score.",
  appealHistory: [],
};
