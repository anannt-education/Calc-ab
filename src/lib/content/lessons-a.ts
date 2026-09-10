import type { ApprovalRecord, LessonVersion } from "../types";

const APPROVED: ApprovalRecord = {
  authorId: "author-anannt-calc",
  authorName: "Meera Krishnan",
  reviewerId: "approver-anannt-academic",
  reviewerName: "Arjun Deshpande",
  approvedAt: "2026-09-10",
  state: "published",
  cannotSelfPublish: true,
};

const DRAFT: ApprovalRecord = {
  authorId: "author-anannt-calc",
  authorName: "Meera Krishnan",
  state: "draft",
  cannotSelfPublish: true,
};

function lesson(partial: Omit<LessonVersion, "status" | "approval" | "videoOptional" | "accessibilityStatus"> & { draft?: boolean }): LessonVersion {
  return {
    ...partial,
    status: partial.draft ? "draft" : "published",
    approval: partial.draft ? DRAFT : APPROVED,
    accessibilityStatus: "keyboard graph alternative + table; KaTeX MathML",
    videoOptional: false,
  };
}

export const LESSONS_A: LessonVersion[] = [
  lesson({
    id: "f-notation",
    title: "Function notation and composition",
    unitId: "foundation",
    skillIds: ["sk-f-notation"],
    objective: "Evaluate $f(g(a))$ from formulas or tables, and explain why $f\\circ g$ is not $g\\circ f$ in general.",
    prerequisites: [],
    estimatedMinutes: 18,
    conceptLens:
      "A function is a rule with an input and an output. The notation $f(3)$ does not mean multiplication. Composition $f(g(x))$ means: first apply $g$, then feed that result into $f$. Order matters because the inner function changes the input that the outer function actually sees.",
    workedExample: {
      prompt: "If $f(x)=2x+1$ and $g(x)=x^2$, find $f(g(3))$ and $g(f(3))$.",
      reasoning: [
        "$g(3)=9$, then $f(9)=19$.",
        "$f(3)=7$, then $g(7)=49$.",
        "The two results differ, so composition is not commutative.",
      ],
      conclusion: "$f(g(3))=19$ and $g(f(3))=49$.",
    },
    nonExample:
      "Writing $f(g(x))=2x^2+1$ without substituting the inner expression into every $x$ in $f$, or treating $fg$ as a product.",
    errorClinic:
      "A common algebra slip is $f(x+h)=f(x)+h$. That would be true only for very special $f$. Always replace every input slot: $f(x+h)=2(x+h)+1$.",
    activity: {
      id: "act-notation",
      title: "Name the inner input",
      kind: "chain-annotate",
      prompt: "Before evaluating, write the inner value on paper, then the outer value. Do not skip the intermediate number.",
    },
    hints: [
      { level: 1, label: "Restate", text: "The difficulty is tracking which function acts first." },
      { level: 2, label: "Question", text: "What number does $g$ actually output before $f$ sees anything?" },
      { level: 3, label: "Strategy", text: "Evaluate from the inside. Circle the inner expression." },
      { level: 4, label: "Step", text: "Compute $g(3)$ first, then replace $x$ in $f$ by that number." },
    ],
    checkItemIds: ["f-not-c1", "f-not-c2"],
    independentItemIds: ["f-not-i1"],
    exitItemIds: ["f-not-e1"],
  }),
  lesson({
    id: "f-domain",
    title: "Domain, range, and piecewise graphs",
    unitId: "foundation",
    skillIds: ["sk-f-domain", "sk-f-trig"],
    objective: "State a domain from an expression, read a hole versus a filled point, and evaluate sine and cosine at standard radians.",
    prerequisites: ["sk-f-notation"],
    estimatedMinutes: 20,
    conceptLens:
      "The domain is the set of inputs that the rule is allowed to use. Division by zero and even roots of negatives (in real calculus) are typical blockers. A hole on a graph is an $x$-value that has been removed from the domain even if a simplified formula would have been defined there. Radian measure is the default in calculus: $\\pi$ is a number of radians, not $180$ unless you convert.",
    workedExample: {
      prompt: "State the domain of $h(x)=\\frac{x-2}{x^2-4}$ and evaluate $\\sin(\\pi/6)$.",
      reasoning: [
        "Factor: $x^2-4=(x-2)(x+2)$. The factor $x-2$ cancels for $x\\neq 2$, but $x=2$ is still excluded.",
        "$x=-2$ makes the original denominator zero, so it is also excluded.",
        "$\\sin(\\pi/6)=1/2$.",
      ],
      conclusion: "Domain: all reals except $x=\\pm 2$. $\\sin(\\pi/6)=1/2$.",
    },
    nonExample:
      "Saying the domain is all reals after cancelling $x-2$, as if simplification could restore a missing input.",
    errorClinic:
      "Degree-mode sine values will wreck later derivative work. If $\\sin(\\pi)$ comes out as a messy decimal, the calculator is in the wrong angle mode.",
    activity: {
      id: "act-domain",
      title: "Hole versus filled point",
      kind: "limit-point",
      prompt: "On a piecewise graph, the open circle is not in the domain. The filled circle is. They can sit at different heights on the same vertical line.",
    },
    hints: [
      { level: 1, label: "Restate", text: "You need the inputs that keep every operation defined." },
      { level: 2, label: "Question", text: "Which $x$ make a denominator zero in the original expression?" },
      { level: 3, label: "Strategy", text: "Factor first, then exclude zeros of the original denominator." },
      { level: 4, label: "Step", text: "Set $x^2-4=0$ to find $x=\\pm 2$." },
    ],
    checkItemIds: ["f-dom-c1"],
    independentItemIds: ["f-dom-i1"],
    exitItemIds: ["f-trig-e1"],
  }),
  lesson({
    id: "f-slope",
    title: "Slope, units, and linear change",
    unitId: "foundation",
    skillIds: ["sk-f-slope"],
    objective: "Interpret slope as a rate with units, and write the equation of a line from a point and a rate.",
    prerequisites: [],
    estimatedMinutes: 15,
    conceptLens:
      "Slope is not a decoration on a graph. If $s$ is in metres and $t$ is in seconds, the slope of $s$ versus $t$ is metres per second. A tangent later in the course is the same idea, localised. Units tell you whether a number is a height, a speed, or an acceleration.",
    workedExample: {
      prompt: "A tank holds $V$ litres after $t$ minutes. A linear model has slope $-3$. Interpret the slope and write $V$ if $V(0)=40$.",
      reasoning: [
        "The tank loses $3$ litres each minute.",
        "$V(t)=40-3t$ litres, valid while $V\\ge 0$.",
      ],
      conclusion: "$V(t)=40-3t$. The slope is a signed rate, not an amount of water.",
    },
    nonExample:
      "Calling $-3$ the amount of water left, or dropping the units when stating a rate.",
    errorClinic:
      "Average rate over $[1,4]$ is $\\frac{V(4)-V(1)}{4-1}$, not $V(4)-V(1)$. Forgetting the time interval is an interpretation error, not a calculus error.",
    activity: {
      id: "act-slope",
      title: "Name the units before the number",
      kind: "related-rates",
      prompt: "Write the units of the slope before computing it. If you cannot name the units, you do not yet know what the number means.",
    },
    hints: [
      { level: 1, label: "Restate", text: "Slope is a rate: output units per input units." },
      { level: 2, label: "Question", text: "What happens to $V$ when $t$ increases by $1$?" },
      { level: 3, label: "Strategy", text: "Point-slope: start from the known value at $t=0$." },
      { level: 4, label: "Step", text: "$V(t)=40-3t$." },
    ],
    checkItemIds: ["f-sl-c1"],
    independentItemIds: ["f-sl-i1"],
    exitItemIds: ["f-sl-e1"],
  }),
  lesson({
    id: "u1-limit-vs-value",
    title: "Limit versus function value",
    unitId: "u1",
    skillIds: ["sk-u1-limit-value", "sk-u1-onesided"],
    objective:
      "Explain why $\\lim_{x\\to a}f(x)$ can exist and differ from $f(a)$, and estimate a limit from a graph or table without relying on a filled point.",
    prerequisites: ["sk-f-notation", "sk-f-domain"],
    estimatedMinutes: 40,
    conceptLens:
      "A limit is a claim about nearby behaviour. When we write $\\lim_{x\\to a}f(x)=L$, we mean: as $x$ approaches $a$ through values other than $a$, the outputs $f(x)$ approach $L$. The single number $f(a)$ is allowed to be missing, or present but different. That is why a graph can carry a hole at height $2$ and a filled point at height $4$ on the same vertical line $x=a$. Moving the filled point does not rewrite the nearby curve, so it does not rewrite the limit.\n\nAlgebraically, a removable discontinuity often appears after cancelling a common factor. The cancelled formula describes the nearby curve. The original formula still refuses the excluded input. The limit follows the nearby curve; the function value, if defined by a separate piece, is a different decision.",
    workedExample: {
      prompt:
        "Let $f(x)=\\dfrac{x^2-1}{x-1}$ for $x\\neq 1$, and $f(1)=4$. Find $\\lim_{x\\to 1}f(x)$ and $f(1)$. Explain why they need not match.",
      reasoning: [
        "For $x\\neq 1$, $f(x)=x+1$. That simplified expression matches the original wherever both are defined.",
        "As $x$ approaches $1$, $x+1$ approaches $2$. Nearby points on the graph sit near height $2$.",
        "The extra assignment $f(1)=4$ places a filled point at $(1,4)$. It does not change $f(1.001)$ or $f(0.999)$.",
        "Therefore the limit is $2$ and the function value is $4$. Continuity will fail because these disagree.",
      ],
      conclusion: "$\\lim_{x\\to 1}f(x)=2$, while $f(1)=4$. The limit is not the filled point.",
    },
    nonExample:
      "A student says “the limit is $4$ because that is the filled-in point.” That confuses a single assigned output with nearby behaviour. Another non-example: concluding that the limit does not exist merely because $f(1)$ is undefined. Missing $f(a)$ is compatible with a perfectly ordinary two-sided limit.",
    errorClinic:
      "Error Clinic — three frequent mix-ups.\n\n1. Filled-point worship: treating $f(a)$ as the limit. The lab below is designed to break this. Move the filled point; ask whether nearby heights changed.\n2. One-sided blindness: a jump discontinuity has two different side limits. Then the two-sided limit does not exist, even if both one-sided limits exist.\n3. Table overconfidence: a table that never gets closer than $0.1$ can look like it approaches $2.1$ when the true nearby value is $2$. Tables estimate; they do not finish the argument unless the algebraic structure is used.",
    methodChoice:
      "If the expression is a rational function that is undefined at $a$, try factoring before declaring that the limit does not exist. If a graph is given, read left-hand height, right-hand height, then the filled point, in that order. If a table is given, look at both sides and at whether the inputs are actually approaching $a$.",
    activity: {
      id: "act-limit-point",
      title: "Move the filled point",
      kind: "limit-point",
      prompt:
        "The nearby curve is $y=x+1$ with a hole at $x=1$. Drag the filled point (the declared value of $f(1)$). Predict: which of the limit, the hole height, and $f(1)$ change?",
    },
    hints: [
      { level: 1, label: "Restate", text: "The difficulty is separating “what happens near $a$” from “what is assigned at $a$.”" },
      { level: 2, label: "Question", text: "If you change only $f(1)$, which plotted points actually move?" },
      { level: 3, label: "Strategy", text: "Simplify for $x\\neq 1$, then take the obvious limit of the simplified expression." },
      { level: 4, label: "Step", text: "Cancel $x-1$ for $x\\neq 1$ to get $x+1$, then substitute $x=1$ into $x+1$ to read the limit." },
    ],
    checkItemIds: ["u1-lv-c1", "u1-lv-c2", "u1-lv-c3"],
    independentItemIds: ["u1-lv-i1", "u1-lv-i2"],
    exitItemIds: ["u1-lv-e1"],
  }),
  lesson({
    id: "u1-continuity",
    title: "Continuity before existence",
    unitId: "u1",
    skillIds: ["sk-u1-continuity", "sk-u1-ivt"],
    objective:
      "Use the three-part continuity checklist at a point, and refuse to invoke the Intermediate Value Theorem until continuity on a closed interval is established.",
    prerequisites: ["sk-u1-limit-value"],
    estimatedMinutes: 32,
    conceptLens:
      "Continuity at $a$ is not a vibe from a graph looking connected. It is three conditions: $f(a)$ is defined, $\\lim_{x\\to a}f(x)$ exists, and those two numbers are equal. Existence theorems such as IVT require continuity on a closed interval. If you skip the checklist, you can invent a root that the function never attains, or miss a jump that blocks the theorem.",
    workedExample: {
      prompt:
        "Let $g(x)=x^2-2$ on $[0,2]$. Does IVT guarantee a root in $(0,2)$? What changes if we replace $g$ by a piecewise function that jumps over $0$?",
      reasoning: [
        "$g$ is a polynomial, hence continuous on $[0,2]$. $g(0)=-2<0$ and $g(2)=2>0$. IVT guarantees some $c$ in $(0,2)$ with $g(c)=0$.",
        "If a piecewise version equals $-1$ on $[0,1)$ and $1$ on $[1,2]$, then $g$ never equals $0$, and it is not continuous on $[0,2]$. IVT does not apply, and there is no root.",
      ],
      conclusion: "The sign change is not enough. Continuity on the interval is the missing hypothesis in the second case.",
    },
    nonExample:
      "Applying IVT to $\\tan x$ on $[\\pi/4, 3\\pi/4]$ because the endpoints have opposite signs. $\\tan x$ is not continuous on that closed interval.",
    errorClinic:
      "Students often check endpoint signs and stop. The Error Clinic question is: “Did we verify continuity on the whole closed interval, including interior points where a piecewise definition might jump?”",
    activity: {
      id: "act-ivt",
      title: "Checklist before the theorem",
      kind: "limit-point",
      prompt: "For each candidate function, tick: defined at interior points? two-sided limit exists? equal to the value? Only then talk about IVT.",
    },
    hints: [
      { level: 1, label: "Restate", text: "The theorem is blocked unless the function is continuous on the closed interval." },
      { level: 2, label: "Question", text: "Is there an $x$ in the interval where the piecewise rule jumps?" },
      { level: 3, label: "Strategy", text: "Write the three continuity conditions at the suspicious point first." },
      { level: 4, label: "Step", text: "If left and right values disagree, stop: IVT does not apply." },
    ],
    checkItemIds: ["u1-co-c1", "u1-co-c2"],
    independentItemIds: ["u1-co-i1"],
    exitItemIds: ["u1-co-e1"],
  }),
  lesson({
    id: "u2-derivative-limit",
    title: "The derivative as a rate",
    unitId: "u2",
    skillIds: ["sk-u2-definition", "sk-u2-differentiability"],
    objective: "Write $f'(a)$ as a limit of average rates, interpret it with units, and distinguish a corner from a smooth turning point.",
    prerequisites: ["sk-u1-limit-value", "sk-f-slope"],
    estimatedMinutes: 30,
    conceptLens:
      "The difference quotient $\\frac{f(a+h)-f(a)}{h}$ is the slope of a secant. The derivative is what those slopes approach as $h\\to 0$, if that limit exists. A V-shaped graph can be continuous at the vertex while the left-hand and right-hand difference quotients disagree. Continuity is required for differentiability, but it is not enough.",
    workedExample: {
      prompt: "For $f(x)=x^2$, compute $f'(3)$ from the definition and state its units if $f$ is metres and $x$ is seconds.",
      reasoning: [
        "$\\frac{(3+h)^2-9}{h}=6+h$ for $h\\neq 0$.",
        "The limit as $h\\to 0$ is $6$.",
        "Units: metres per second.",
      ],
      conclusion: "$f'(3)=6$ metres per second in that interpretation.",
    },
    nonExample:
      "Calling $|x|$ differentiable at $0$ because the graph “turns around.” The one-sided derivatives are $-1$ and $1$.",
    errorClinic:
      "Dropping units on $f'(t)$ turns a rate into a mystery number. Another slip: using a symmetric difference with a large step and calling it exact.",
    activity: {
      id: "act-secant",
      title: "Slide the secant",
      kind: "secant",
      prompt: "Move the movable point toward $x=1$ on $y=x^2$. Watch the secant slope approach $2$.",
    },
    hints: [
      { level: 1, label: "Restate", text: "You are looking for a limit of slopes, not a single secant." },
      { level: 2, label: "Question", text: "What happens to the difference quotient as $h$ gets smaller?" },
      { level: 3, label: "Strategy", text: "Expand the numerator before cancelling $h$." },
      { level: 4, label: "Step", text: "After expanding, the $h$ cancels and the limit is the remaining constant term." },
    ],
    checkItemIds: ["u2-df-c1"],
    independentItemIds: ["u2-df-i1"],
    exitItemIds: ["u2-df-e1"],
  }),
  lesson({
    id: "u2-elementary-rules",
    title: "Product and quotient structure",
    unitId: "u2",
    skillIds: ["sk-u2-rules"],
    objective: "Differentiate products and quotients without expanding when expansion would hide structure.",
    prerequisites: ["sk-u2-definition"],
    estimatedMinutes: 25,
    conceptLens:
      "The product rule is not “differentiate each factor and multiply.” It is $f'g+fg'$. The extra term exists because both factors can be changing. Quotients are similar: the denominator’s change appears with a minus sign.",
    workedExample: {
      prompt: "Differentiate $y=(x^2+1)e^x$.",
      reasoning: [
        "Identify $f=x^2+1$ and $g=e^x$.",
        "$y'=(2x)e^x+(x^2+1)e^x=e^x(x^2+2x+1)=e^x(x+1)^2$.",
      ],
      conclusion: "The factored form is a useful check, not a requirement.",
    },
    nonExample: "Writing $((x^2+1)e^x)'=2x\\cdot e^x$ and stopping.",
    errorClinic: "Quotient rule sign errors usually come from reversing $f'g-fg'$. Write the formula once, then substitute.",
    activity: {
      id: "act-product",
      title: "Name both changing factors",
      kind: "chain-annotate",
      prompt: "Before differentiating a product, write a one-line reason: both pieces depend on $x$.",
    },
    hints: [
      { level: 1, label: "Restate", text: "Two factors are changing, so two terms appear." },
      { level: 2, label: "Question", text: "What is the derivative of each factor separately?" },
      { level: 3, label: "Strategy", text: "Write $f'g+fg'$ with the names filled in." },
      { level: 4, label: "Step", text: "$2x e^x + (x^2+1)e^x$." },
    ],
    checkItemIds: ["u2-ru-c1"],
    independentItemIds: ["u2-ru-i1"],
    exitItemIds: ["u2-ru-e1"],
  }),
  lesson({
    id: "u3-chain",
    title: "Nested functions and the chain rule",
    unitId: "u3",
    skillIds: ["sk-u3-chain"],
    objective: "Annotate the inner function, differentiate the outer, then multiply by the inner derivative.",
    prerequisites: ["sk-u2-rules"],
    estimatedMinutes: 28,
    conceptLens:
      "Composition has layers. If $y=\\sin(x^2)$, the outer function is sine and the inner is $x^2$. The chain rule says: derivative of the outer, evaluated at the inner, times the inner’s derivative. Missing the extra factor is the signature error of this unit, and it returns in the FTC with upper limit $x^2$.",
    workedExample: {
      prompt: "Differentiate $y=\\cos(3x)$.",
      reasoning: [
        "Inner: $u=3x$. Outer: $\\cos u$.",
        "$\\frac{dy}{dx}=-\\sin(3x)\\cdot 3=-3\\sin(3x)$.",
      ],
      conclusion: "The $3$ is the chain factor from $u'$.",
    },
    nonExample: "Writing $\\frac{d}{dx}\\cos(3x)=-\\sin(3x)$ and dropping the $3$.",
    errorClinic: "If the inner function is itself a product, you will need product and chain together. Do not freeze the inner piece.",
    activity: {
      id: "act-chain",
      title: "Annotate before differentiating",
      kind: "chain-annotate",
      prompt: "Write $u=\\ldots$ above the inner expression, then differentiate.",
    },
    hints: [
      { level: 1, label: "Restate", text: "An extra factor appears because the inside is not just $x$." },
      { level: 2, label: "Question", text: "What would the derivative be if the inside were a single letter $u$?" },
      { level: 3, label: "Strategy", text: "Multiply by $u'$ after differentiating the outer." },
      { level: 4, label: "Step", text: "$-\\sin(3x)$ times $3$." },
    ],
    checkItemIds: ["u3-ch-c1"],
    independentItemIds: ["u3-ch-i1"],
    exitItemIds: ["u3-ch-e1"],
  }),
  lesson({
    id: "u3-implicit",
    title: "Implicit relations and inverse slopes",
    unitId: "u3",
    skillIds: ["sk-u3-implicit", "sk-u3-inverse"],
    objective: "Differentiate an implicit relation and evaluate $dy/dx$ at a point; state the inverse-function derivative as a reciprocal slope.",
    prerequisites: ["sk-u3-chain"],
    estimatedMinutes: 28,
    conceptLens:
      "An equation $F(x,y)=0$ can define $y$ as a function of $x$ near a point even if we never solve for $y$. Differentiating both sides, every $y$ produces a $y'$ by the chain rule. Inverse functions swap input and output, so their slopes multiply to $1$ at corresponding points, provided $f'(b)\\neq 0$.",
    workedExample: {
      prompt: "If $x^2+y^2=25$, find $dy/dx$ at $(3,4)$.",
      reasoning: [
        "$2x+2y y'=0$, so $y'=-x/y$.",
        "At $(3,4)$, $y'=-3/4$.",
      ],
      conclusion: "The tangent to the circle is perpendicular to the radius, which matches $-3/4$.",
    },
    nonExample: "Solving for $y=\\sqrt{25-x^2}$ and then using the wrong sign for the lower semicircle.",
    errorClinic: "Forgetting to multiply by $y'$ when differentiating $y^2$ is a chain-rule error inside implicit work.",
    activity: {
      id: "act-implicit",
      title: "Mark every $y$ with a chain factor",
      kind: "chain-annotate",
      prompt: "Circle each $y$, then write $\\times y'$ beside it after differentiating.",
    },
    hints: [
      { level: 1, label: "Restate", text: "$y$ depends on $x$, so its derivative does not vanish." },
      { level: 2, label: "Question", text: "What is $\\frac{d}{dx}(y^2)$?" },
      { level: 3, label: "Strategy", text: "Differentiate, then collect $y'$ terms." },
      { level: 4, label: "Step", text: "$y'=-x/y$." },
    ],
    checkItemIds: ["u3-im-c1"],
    independentItemIds: ["u3-im-i1"],
    exitItemIds: ["u3-im-e1"],
  }),
  lesson({
    id: "u4-context",
    title: "Reading a derivative in a situation",
    unitId: "u4",
    skillIds: ["sk-u4-context", "sk-u4-linear"],
    objective: "Translate a verbal rate into a signed quantity with units, and use a tangent line as a local estimate.",
    prerequisites: ["sk-u2-definition"],
    estimatedMinutes: 24,
    conceptLens:
      "If $P(t)$ is people and $t$ is hours, $P'(3)=-120$ means: at $t=3$ hours, the population is decreasing at $120$ people per hour. The sign is the story. A local linear approximation uses the tangent, which is reliable nearby and not a promise far away.",
    workedExample: {
      prompt: "$H(t)$ is the height in cm of water at time $t$ minutes. $H(4)=30$ and $H'(4)=-2$. Estimate $H(4.5)$ and interpret $H'(4)$.",
      reasoning: [
        "Interpretation: at $4$ minutes, height is falling at $2$ cm per minute.",
        "Linear: $H(4.5)\\approx 30-2(0.5)=29$ cm.",
      ],
      conclusion: "The estimate is a tangent estimate, not a measurement.",
    },
    nonExample: "Saying “the water is $2$ cm deep at $t=4$” from $H'(4)=-2$.",
    errorClinic: "Positive derivatives of a remaining-quantity function still confuse people. Read the name of the function first.",
    activity: {
      id: "act-context",
      title: "Write the sentence with units",
      kind: "related-rates",
      prompt: "Before computing, write: “At $t=\\ldots$, $\\ldots$ is increasing/decreasing at $\\ldots$ per $\\ldots$.”",
    },
    hints: [
      { level: 1, label: "Restate", text: "The derivative is a rate, not a height." },
      { level: 2, label: "Question", text: "Is the quantity rising or falling at that instant?" },
      { level: 3, label: "Strategy", text: "Use $H(a)+H'(a)\\Delta t$." },
      { level: 4, label: "Step", text: "$30-2(0.5)=29$." },
    ],
    checkItemIds: ["u4-cx-c1"],
    independentItemIds: ["u4-cx-i1"],
    exitItemIds: ["u4-cx-e1"],
  }),
  lesson({
    id: "u4-related-rates",
    title: "Related rates: equation before numbers",
    unitId: "u4",
    skillIds: ["sk-u4-related"],
    objective: "Write a relating equation, differentiate with respect to time, then substitute the instantaneous data.",
    prerequisites: ["sk-u3-chain", "sk-u4-context"],
    estimatedMinutes: 28,
    conceptLens:
      "Related rates fail when numbers are substituted too early, turning a changing quantity into a constant before differentiation. The diagram and the equation come first. Time derivatives appear via the chain rule. Instantaneous measurements are plugged in last.",
    workedExample: {
      prompt: "A circular oil slick has radius $r$ metres increasing at $0.2$ m/s. How fast is the area increasing when $r=5$?",
      reasoning: [
        "$A=\\pi r^2$. Do not put $r=5$ yet.",
        "$\\frac{dA}{dt}=2\\pi r\\frac{dr}{dt}$.",
        "Now $r=5$, $dr/dt=0.2$, so $dA/dt=2\\pi(5)(0.2)=2\\pi$ square metres per second.",
      ],
      conclusion: "Area grows at $2\\pi$ m$^2$/s at that instant.",
    },
    nonExample: "Substituting $r=5$ into $A=\\pi r^2$ first, obtaining a constant, then concluding $dA/dt=0$.",
    errorClinic: "The zero-rate disaster is almost always premature substitution, not a misunderstanding of area.",
    activity: {
      id: "act-related",
      title: "Equation, then differentiate, then numbers",
      kind: "related-rates",
      prompt: "Write the three-line template before any arithmetic.",
    },
    hints: [
      { level: 1, label: "Restate", text: "A geometric relation is changing in time." },
      { level: 2, label: "Question", text: "Which equation links the quantities before any of them is a number?" },
      { level: 3, label: "Strategy", text: "Differentiate with respect to $t$, then substitute." },
      { level: 4, label: "Step", text: "$dA/dt=2\\pi r\\,dr/dt$." },
    ],
    checkItemIds: ["u4-rr-c1"],
    independentItemIds: ["u4-rr-i1"],
    exitItemIds: ["u4-rr-e1"],
  })
];
