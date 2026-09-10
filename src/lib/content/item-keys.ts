import "server-only";
import type { ErrorClass, ResponseRule } from "../types";

export const ITEM_KEYS: Record<string, ResponseRule> = {
  "diag-01": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "$g(2)=4$, then $f(4)=11$. Option B is $g(f(2))$.",
    distractorNotes: {
      b: "That is $g(f(2))=25$. Composition order reversed.",
      c: "That is $f(2)$.",
      d: "Product $f(2)g(2)$, not composition.",
    },
    errorClassByChoice: { b: "method", c: "concept", d: "notation" },
  },
  "diag-02": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "Original denominator zero at $x=\\pm 1$. Cancellation does not restore $x=1$.",
    errorClassByChoice: { a: "algebra", b: "algebra", d: "concept" },
  },
  "diag-03": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "On the unit circle, $\\pi$ radians is the point $(-1,0)$.",
    errorClassByChoice: { a: "concept", b: "notation", d: "notation" },
  },
  "diag-04": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Slope is a rate: litres per minute, signed.",
    errorClassByChoice: { a: "interpretation", c: "interpretation", d: "interpretation" },
  },
  "diag-05": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "The limit follows nearby height $3$. The filled point is $f(2)$, a different fact.",
    errorClassByChoice: { a: "concept", c: "concept", d: "notation" },
  },
  "diag-06": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "Derivative units are output units per input units.",
    errorClassByChoice: { a: "interpretation", b: "interpretation", d: "interpretation" },
  },
  "diag-07": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "Power rule: $3x^2$. D is an antiderivative.",
    errorClassByChoice: { b: "algebra", c: "algebra", d: "method" },
  },
  "diag-08": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Chain rule: $\\cos(2x)\\cdot 2$. Missing $2$ is a chain-factor error.",
    errorClassByChoice: { a: "method", c: "algebra", d: "algebra" },
  },
  "diag-09": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "The definite integral is signed. Negative $f$ yields a negative integral.",
    errorClassByChoice: { a: "concept", c: "concept", d: "concept" },
  },
  "diag-10": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "FTC: derivative of accumulation from a constant to $x$ is $f(x)$.",
    errorClassByChoice: { b: "concept", c: "method", d: "method" },
  },
  "diag-11": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "$f'(c)=0$ makes $c$ a critical point. Extremum needs a sign change or endpoint comparison.",
    errorClassByChoice: { a: "concept", b: "concept", d: "concept" },
  },
  "diag-12": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "Differentiate: $y'=3e^{3x}=3y$. No initial condition was required for this yes/no.",
    errorClassByChoice: { b: "method", c: "concept", d: "algebra" },
  },
  "f-not-c1": { kind: "numeric", numeric: { value: 49, tolerance: 0 }, explanation: "$f(3)=7$, then $g(7)=49$." },
  "f-not-c2": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "Replace every $x$ by $x+h$: $(x+h)^2=x^2+2xh+h^2$.",
    errorClassByChoice: { a: "algebra", b: "algebra", d: "concept" },
  },
  "f-not-i1": { kind: "numeric", numeric: { value: 3, tolerance: 0 }, explanation: "$g(2)=7$, then $f(7)=3$." },
  "f-not-e1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Composition is not commutative in general.",
  },
  "f-dom-c1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Even root in reals needs $x-3\\ge 0$.",
    errorClassByChoice: { a: "algebra", c: "algebra", d: "algebra" },
  },
  "f-dom-i1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "The filled point is the function value. The open circle is not $f(1)$.",
    errorClassByChoice: { a: "concept", c: "concept", d: "concept" },
  },
  "f-trig-e1": { kind: "numeric", numeric: { value: 1, tolerance: 0 }, explanation: "$\\sin(\\pi/2)=1$." },
  "f-sl-c1": { kind: "choice", correctChoiceId: "a", explanation: "Point-slope from $(0,40)$ with slope $-3$." },
  "f-sl-i1": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "Output units per input units: metres per hour.",
    errorClassByChoice: { a: "interpretation", b: "interpretation", d: "interpretation" },
  },
  "f-sl-e1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Average rate divides change in output by change in input, $4-1=3$.",
    errorClassByChoice: { a: "interpretation", c: "method", d: "algebra" },
  },
  "u1-lv-c1": {
    kind: "numeric",
    numeric: { value: 2, tolerance: 0 },
    explanation: "For $x\\neq 1$, $f(x)=x+1\\to 2$. The filled point is irrelevant to the limit.",
  },
  "u1-lv-c2": {
    kind: "numeric",
    numeric: { value: 4, tolerance: 0 },
    explanation: "$f(1)$ is assigned as $4$. That is not the limit.",
  },
  "u1-lv-c3": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "Only the declared value $f(1)$ moves. Nearby behaviour, hence the limit, stays fixed.",
    errorClassByChoice: { a: "concept", b: "concept", d: "concept" },
  },
  "u1-lv-i1": {
    kind: "numeric",
    numeric: { value: 4, tolerance: 0.05 },
    explanation: "Values approach $4$ from both sides. Undefined at $2$ does not block the limit.",
  },
  "u1-lv-i2": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Both sides approach $0+1=1$. The filled value $4$ is $p(0)$, not the limit.",
    errorClassByChoice: { a: "concept", c: "concept", d: "concept" },
  },
  "u1-lv-e1": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "The definition of the limit never evaluates $f$ at $a$.",
  },
  "u1-co-c1": { kind: "choice", correctChoiceId: "c", explanation: "Three-part checklist." },
  "u1-co-c2": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "$\\tan x$ has a vertical asymptote at $\\pi/2$, inside the interval.",
    errorClassByChoice: { b: "concept", c: "concept", d: "notation" },
  },
  "u1-co-i1": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "Polynomials are continuous. Sign change of a continuous function on $[1,2]$ guarantees a root in $(1,2)$, not a specific location or multiplicity.",
  },
  "u1-co-e1": { kind: "choice", correctChoiceId: "a", explanation: "That equality is the definition of continuity at $a$ once $f(a)$ and the limit exist." },
  "u2-df-c1": { kind: "choice", correctChoiceId: "b", explanation: "The derivative is a limit of difference quotients." },
  "u2-df-i1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Continuous at $0$; one-sided derivatives $-1$ and $1$ disagree.",
    errorClassByChoice: { a: "concept", c: "concept", d: "concept" },
  },
  "u2-df-e1": { kind: "choice", correctChoiceId: "c", explanation: "Rate units: litres per minute." },
  "u2-ru-c1": { kind: "choice", correctChoiceId: "b", explanation: "Product rule $f'g+fg'$." },
  "u2-ru-i1": {
    kind: "numeric",
    numeric: { value: 0.25, tolerance: 0.001 },
    explanation: "$y'=(1(x+1)-x(1))/(x+1)^2=1/(x+1)^2$, so $y'(1)=1/4$.",
  },
  "u2-ru-e1": {
    kind: "numeric",
    numeric: { value: 0, tolerance: 0 },
    explanation: "$(2x e^x+x^2 e^x)$ at $0$ is $0$.",
  },
  "u3-ch-c1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Outer cosine, inner $3x$, multiply by $3$. Missing $3$ is the chain error.",
    errorClassByChoice: { a: "method", c: "algebra", d: "algebra" },
  },
  "u3-ch-i1": {
    kind: "numeric",
    numeric: { value: 8, tolerance: 0 },
    explanation: "$y'=4(2x+1)^3\\cdot 2$, at $0$ is $4(1)^3\\cdot 2=8$.",
  },
  "u3-ch-e1": { kind: "choice", correctChoiceId: "a", explanation: "The inner input is not the identity." },
  "u3-im-c1": { kind: "choice", correctChoiceId: "a", explanation: "$2x+2y y'=0$ so $y'=-x/y$." },
  "u3-im-i1": {
    kind: "numeric",
    numeric: { value: 0.25, tolerance: 0 },
    explanation: "$(f^{-1})'(5)=1/f'(2)=1/4$.",
  },
  "u3-im-e1": { kind: "choice", correctChoiceId: "b", explanation: "Treat $y$ as a function of $x$." },
  "u4-cx-c1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Negative derivative means the named quantity is falling.",
    errorClassByChoice: { a: "interpretation", c: "interpretation", d: "interpretation" },
  },
  "u4-cx-i1": { kind: "numeric", numeric: { value: 29, tolerance: 0 }, explanation: "$30-2(0.5)=29$." },
  "u4-cx-e1": { kind: "choice", correctChoiceId: "a", explanation: "Linearisation is local." },
  "u4-rr-c1": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "Differentiate first; do not freeze $r$.",
    errorClassByChoice: { b: "method", c: "method", d: "algebra" },
  },
  "u4-rr-i1": {
    kind: "numeric",
    numeric: { value: 2, tolerance: 0.01 },
    explanation: "$dA/dt=2\\pi(5)(0.2)=2\\pi$, so the number asked is $2$.",
  },
  "u4-rr-e1": { kind: "choice", correctChoiceId: "a", explanation: "Premature substitution freezes $A$." },
  "u5-ex-c1": { kind: "choice", correctChoiceId: "c", explanation: "$f'$ does not change sign." },
  "u5-ex-i1": { kind: "numeric", numeric: { value: 8, tolerance: 0 }, explanation: "Endpoints: $f(2)=8$ is larger than $f(-1)=-1$." },
  "u5-ex-e1": { kind: "choice", correctChoiceId: "a", explanation: "Standard MVT hypotheses." },
  "u5-fp-c1": { kind: "choice", correctChoiceId: "b", explanation: "First derivative test: $+$ to $-$ is a local max." },
  "u5-fp-i1": { kind: "choice", correctChoiceId: "b", explanation: "$f$ is determined by $f'$ only up to a constant." },
  "u5-fp-e1": { kind: "choice", correctChoiceId: "b", explanation: "The graph of $f'$ is a slope graph for $f$." },
  "u6-ftc-c1": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "Sign misconception is option A. Negative $f$ means $A'<0$, so $A$ decreases.",
    errorClassByChoice: { a: "concept", c: "concept", d: "concept" },
    signMisconceptionChoice: "a",
  },
  "u6-ftc-c2": { kind: "choice", correctChoiceId: "a", explanation: "FTC: $A'(x)=f(x)=x-2$." },
  "u6-ftc-c3": {
    kind: "choice",
    correctChoiceId: "b",
    explanation: "$f(x^2)\\cdot 2x=(x^2-2)2x$. Option A is the missing-chain-factor misconception.",
    errorClassByChoice: { a: "method", c: "method", d: "method" },
    missingChainChoice: "a",
  },
  "u6-ftc-i1": {
    kind: "numeric",
    numeric: { value: -2, tolerance: 0 },
    explanation: "$B'(2)=f(2)=-2$. The table representation of the same FTC skill.",
  },
  "u6-ftc-i2": {
    kind: "numeric",
    numeric: { value: -4, tolerance: 0 },
    explanation: "$C'(x)=f(x^2)\\cdot 2x$, so $C'(2)=f(4)\\cdot 4=(-1)\\cdot 4=-4$. Missing $2x$ would produce $-1$.",
  },
  "u6-ftc-e1": { kind: "choice", correctChoiceId: "b", explanation: "Signed integral equals area only when $f$ does not go below the axis." },
  "u6-ad-c1": { kind: "choice", correctChoiceId: "a", explanation: "$u=x^2$, $du=2x\\,dx$." },
  "u6-ad-i1": { kind: "choice", correctChoiceId: "a", explanation: "Antiderivatives differ by a constant." },
  "u6-ad-e1": { kind: "choice", correctChoiceId: "b", explanation: "AB scope protection." },
  "u7-sf-c1": { kind: "choice", correctChoiceId: "a", explanation: "Both the DE and the initial condition hold." },
  "u7-sf-i1": { kind: "numeric", numeric: { value: 2, tolerance: 0 }, explanation: "Slope equals $x$-coordinate: $2$." },
  "u7-sf-e1": { kind: "choice", correctChoiceId: "b", explanation: "AB scope protection: Euler is BC-optional." },
  "u7-sp-c1": { kind: "choice", correctChoiceId: "a", explanation: "Separable exponential with multiplicative constant $2$." },
  "u7-sp-i1": { kind: "numeric", numeric: { value: 2, tolerance: 0 }, explanation: "$e^0=1$." },
  "u7-sp-e1": { kind: "choice", correctChoiceId: "b", explanation: "Logistic models are BC-optional." },
  "u8-an-c1": {
    kind: "numeric",
    numeric: { value: -4.5, tolerance: 0.01 },
    explanation: "$\\int_0^3(t-2)\\,dt=[t^2/2-2t]_0^3=4.5-6=-4.5$.",
  },
  "u8-an-i1": {
    kind: "numeric",
    numeric: { value: 2.5, tolerance: 0.01 },
    explanation: "Split at $t=2$: $2+0.5=2.5$.",
  },
  "u8-an-e1": { kind: "choice", correctChoiceId: "b", explanation: "Definition of average value." },
  "u8-vo-c1": { kind: "choice", correctChoiceId: "a", explanation: "$R=\\sqrt{x}$ so $R^2=x$." },
  "u8-vo-i1": { kind: "numeric", numeric: { value: 8, tolerance: 0 }, explanation: "$\\pi\\int_0^4 x\\,dx=8\\pi$." },
  "u8-vo-e1": { kind: "choice", correctChoiceId: "b", explanation: "Arc length is BC-optional." },
  "tr-01": { kind: "choice", correctChoiceId: "b", explanation: "$A'(3)=f(3)$." },
  "tr-02": { kind: "choice", correctChoiceId: "c", explanation: "Two-sided limit requires matching sides." },
  "mock-ia-1": {
    kind: "choice",
    correctChoiceId: "c",
    explanation: "Expand: $(x^2+4x+4-4)/x=x+4\\to 4$.",
  },
  "mock-ia-2": { kind: "choice", correctChoiceId: "a", explanation: "$f'(x)=3x^2-3$, $f'(1)=0$." },
  "mock-ia-3": { kind: "choice", correctChoiceId: "b", explanation: "Chain rule, factor $5$." },
  "mock-ia-4": { kind: "choice", correctChoiceId: "a", explanation: "FTC, lower limit constant." },
  "mock-ib-1": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "$f'(x)=3x^2-3=0$ at $x=\\pm 1$. $f(-2)=-1$, $f(-1)=3$, $f(1)=-1$, $f(2)=3$. Wait — $f(-2)=-8+6+1=-1$, $f(1)=-1$. Absolute min is $-1$? Let me recalculate: $x^3-3x+1$ at $-2$: $-8+6+1=-1$. At $1$: $1-3+1=-1$. At $2$: $8-6+1=3$. At $-1$: $-1+3+1=3$. So abs min is $-1$. Correct choice should be b.",
  },
  "mock-ib-2": {
    kind: "choice",
    correctChoiceId: "a",
    explanation: "$\\int_0^1 e^{-x^2}\\,dx\\approx 0.746$, so average value $\\approx 0.75$.",
  },
};

// Fix mock-ib-1: I noticed the explanation contradicts. Absolute min is -1, choice b.
ITEM_KEYS["mock-ib-1"] = {
  kind: "choice",
  correctChoiceId: "b",
  explanation:
    "$f'(x)=3x^2-3=0$ at $x=\\pm 1$. Values: $f(-2)=-1$, $f(-1)=3$, $f(1)=-1$, $f(2)=3$. Absolute minimum on $[-2,2]$ is $-1$.",
};

export function markAnswer(itemId: string, answer: string): {
  correct: boolean;
  explanation: string;
  errorClass?: ErrorClass;
  misconception?: "sign" | "missing_chain" | null;
  distractorNote?: string;
} {
  const key = ITEM_KEYS[itemId];
  if (!key) {
    return { correct: false, explanation: "This item is not yet in the marking key." };
  }
  const raw = answer.trim();
  if (key.kind === "choice" || key.kind === "predict") {
    const correct = raw === key.correctChoiceId;
    const errorClass = !correct ? key.errorClassByChoice?.[raw] : undefined;
    let misconception: "sign" | "missing_chain" | null = null;
    if (!correct && key.signMisconceptionChoice === raw) misconception = "sign";
    if (!correct && key.missingChainChoice === raw) misconception = "missing_chain";
    return {
      correct,
      explanation: key.explanation,
      errorClass,
      misconception,
      distractorNote: key.distractorNotes?.[raw],
    };
  }
  if (key.kind === "numeric" && key.numeric) {
    const n = Number(raw);
    if (!Number.isFinite(n)) {
      return { correct: false, explanation: "Enter a number. Ambiguous input is not marked as a confident error.", errorClass: "notation" };
    }
    const correct = Math.abs(n - key.numeric.value) <= key.numeric.tolerance;
    return { correct, explanation: key.explanation, errorClass: correct ? undefined : "algebra" };
  }
  if (key.kind === "short" && key.shortAccept) {
    const normalised = raw.replace(/\s+/g, "").toLowerCase();
    const correct = key.shortAccept.some((s) => s.replace(/\s+/g, "").toLowerCase() === normalised);
    return { correct, explanation: key.explanation };
  }
  return { correct: false, explanation: key.explanation };
}

export function getSolution(itemId: string) {
  const key = ITEM_KEYS[itemId];
  return key?.explanation ?? null;
}
