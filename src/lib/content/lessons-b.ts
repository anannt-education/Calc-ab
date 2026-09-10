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

export const LESSONS_B: LessonVersion[] = [
  lesson({
    id: "u5-extrema",
    title: "Candidates, sign changes, and hypotheses",
    unitId: "u5",
    skillIds: ["sk-u5-theorems", "sk-u5-extrema"],
    objective: "Locate critical points, use $f'$ sign changes to classify extrema, and refuse theorems whose hypotheses fail.",
    prerequisites: ["sk-u2-rules", "sk-u1-continuity"],
    estimatedMinutes: 28,
    conceptLens:
      "$f'(c)=0$ is not a synonym for “maximum.” A horizontal inflection can have a zero derivative with no extreme value. Classification uses the sign of $f'$ on both sides, or a second-derivative test when that derivative exists and is nonzero. Closed-interval problems also include endpoints.",
    workedExample: {
      prompt: "For $f(x)=x^3$ on $[-1,2]$, find absolute extrema.",
      reasoning: [
        "$f'(x)=3x^2$, zero at $0$, but $f'$ does not change sign.",
        "Endpoint values: $f(-1)=-1$, $f(2)=8$, $f(0)=0$.",
        "Absolute minimum $-1$, absolute maximum $8$.",
      ],
      conclusion: "The critical point is not an extremum.",
    },
    nonExample: "Reporting $x=0$ as a local maximum because $f'(0)=0$.",
    errorClinic: "MVT requires differentiability on the open interval. A corner inside blocks the theorem even if the function is continuous.",
    activity: {
      id: "act-extrema",
      title: "Sign chart before the word maximum",
      kind: "f-from-fp",
      prompt: "Draw $f'$ signs on intervals, then write increase/decrease words, then name extrema.",
    },
    hints: [
      { level: 1, label: "Restate", text: "Zeros of $f'$ are candidates, not conclusions." },
      { level: 2, label: "Question", text: "Does $f'$ change sign at that candidate?" },
      { level: 3, label: "Strategy", text: "Compare endpoint values on a closed interval." },
      { level: 4, label: "Step", text: "Evaluate $f$ at critical points and endpoints." },
    ],
    checkItemIds: ["u5-ex-c1"],
    independentItemIds: ["u5-ex-i1"],
    exitItemIds: ["u5-ex-e1"],
  }),
  lesson({
    id: "u5-from-derivative",
    title: "Reconstructing $f$ from $f'$",
    unitId: "u5",
    skillIds: ["sk-u5-extrema", "sk-u5-optimisation"],
    objective: "From a graph of $f'$, describe intervals of increase, concavity, and possible graphs of $f$.",
    prerequisites: ["sk-u5-extrema"],
    estimatedMinutes: 24,
    conceptLens:
      "Where $f'$ is positive, $f$ increases. Where $f'$ is increasing, $f$ is concave up. A zero of $f'$ is a horizontal tangent of $f$. Many graphs of $f$ can share the same $f'$ if they differ by a constant; the shape is determined, the vertical placement is not, unless a point is given.",
    workedExample: {
      prompt: "$f'$ is positive on $(-2,1)$ and negative on $(1,4)$, with $f'(1)=0$. Describe $f$.",
      reasoning: [
        "$f$ increases on $[-2,1]$ and decreases on $[1,4]$ (assuming $f'$ exists throughout).",
        "A local maximum occurs at $x=1$.",
      ],
      conclusion: "The graph of $f$ rises then falls, with a crest at $x=1$.",
    },
    nonExample: "Assuming $f(1)=0$ merely because $f'(1)=0$.",
    errorClinic: "Students sketch $f$ looking like $f'$. That would mean they drew the derivative again. Heights of $f'$ are slopes of $f$.",
    activity: {
      id: "act-from-fp",
      title: "Slopes become heights of the next sketch",
      kind: "f-from-fp",
      prompt: "Read a few slopes off $f'$ and mark corresponding tangent steepness on $f$.",
    },
    hints: [
      { level: 1, label: "Restate", text: "$f'$ tells you slopes of $f$, not heights of $f$." },
      { level: 2, label: "Question", text: "Where is $f'$ positive?" },
      { level: 3, label: "Strategy", text: "Increase/decrease first; concavity second." },
      { level: 4, label: "Step", text: "Local max where $f'$ changes from $+$ to $-$." },
    ],
    checkItemIds: ["u5-fp-c1"],
    independentItemIds: ["u5-fp-i1"],
    exitItemIds: ["u5-fp-e1"],
  }),
  lesson({
    id: "u6-ftc",
    title: "Accumulation functions and the FTC",
    unitId: "u6",
    skillIds: ["sk-u6-accumulation", "sk-u6-ftc"],
    objective:
      "Define $A(x)=\\int_a^x f(t)\\,dt$, predict whether $A$ increases when $f$ is negative, and differentiate accumulation with a variable upper limit, including $x^2$.",
    prerequisites: ["sk-u6-accumulation", "sk-u3-chain"],
    estimatedMinutes: 45,
    conceptLens:
      "Fix a continuous function $f$ and a starting input $a$. Define $A(x)=\\int_a^x f(t)\\,dt$. Then $A(x)$ is the signed accumulation of $f$ from $a$ to $x$. If $f$ is negative on an interval, you are accumulating negative contributions, so $A$ decreases there even if a geometric-area picture looks “positive” after taking absolute values. The Fundamental Theorem says $A'(x)=f(x)$: the rate at which accumulation grows is the current height of $f$.\n\nIf the upper limit is not $x$ but a function $u(x)$, the chain rule returns. $\\frac{d}{dx}\\int_a^{x^2} f(t)\\,dt = f(x^2)\\cdot 2x$. The $f(x^2)$ factor is the FTC; the $2x$ is the chain. Feedback in this lesson treats a sign error (believing negative $f$ still raises $A$) as a different misconception from a missing chain factor.",
    workedExample: {
      prompt:
        "Let $f(t)=t-2$ and $A(x)=\\int_0^x f(t)\\,dt$. (1) For $0<x<2$, is $A$ increasing? (2) Compute $A'(x)$. (3) Compute $\\frac{d}{dx}\\int_0^{x^2} f(t)\\,dt$.",
      reasoning: [
        "On $(0,2)$, $f(t)<0$, so the integrand is negative. $A(x)$ is adding negative signed area, so $A$ is decreasing. (A prediction is required before looking at the graph of $A$.)",
        "Directly, $A(x)=\\int_0^x(t-2)\\,dt=\\frac{x^2}{2}-2x$, so $A'(x)=x-2=f(x)$, matching the FTC.",
        "Let $u=x^2$. Then $\\frac{d}{dx}\\int_0^{u(x)} f= f(u) u' = (x^2-2)(2x)$.",
      ],
      conclusion:
        "$A$ decreases while $f$ is negative. $A'(x)=x-2$. The $x^2$ limit produces an extra $2x$. Missing $2x$ is not the same error as the sign misconception.",
    },
    nonExample:
      "Claiming $A$ must rise because “area is positive.” Signed accumulation can fall. Another non-example: $\\frac{d}{dx}\\int_0^{x^2} f(t)\\,dt = f(x^2)$ with no chain factor. A third: differentiating under the integral by replacing $t$ with $x$ inside $f$ while keeping the limits, which is not the FTC statement.",
    errorClinic:
      "Error Clinic — two named misconceptions.\n\nSign misconception: “$A$ increases whenever there is area under a curve.” If $f$ is below the axis, $A$ is heading down. The lab asks you to predict this before the $A$ graph appears.\n\nMissing chain factor: students remember $A'(x)=f(x)$ and then replace $x$ by $x^2$ without multiplying by $2x$. The later table/graph check uses the same skill with a different representation, so a memorised formula for this one prompt will not transfer automatically.",
    methodChoice:
      "If the upper limit is $x$, FTC gives $f(x)$ (lower limit constant). If the upper limit is $u(x)$, multiply by $u'(x)$. If the lower limit is the variable, reverse the sign. If both limits vary, split at a constant.",
    activity: {
      id: "act-ftc",
      title: "Predict accumulation before the reveal",
      kind: "ftc-accumulation",
      prompt:
        "A graph of $f$ is shown, including an interval where $f$ is negative. Predict whether $A(x)=\\int_0^x f$ is increasing there. Only then reveal $A$. Next, differentiate an accumulation whose upper limit is $x^2$.",
    },
    hints: [
      { level: 1, label: "Restate", text: "The difficulty is connecting the sign of $f$ to whether $A$ is currently rising." },
      { level: 2, label: "Question", text: "If you add a negative number to a running total, does the total go up or down?" },
      { level: 3, label: "Strategy", text: "FTC: $A'(x)=f(x)$. The sign of $A'$ is the sign of $f$." },
      { level: 4, label: "Step", text: "On $(0,2)$, $f(x)=x-2<0$, so $A'(x)<0$ and $A$ is decreasing. For the $x^2$ limit, multiply by $2x$." },
    ],
    checkItemIds: ["u6-ftc-c1", "u6-ftc-c2", "u6-ftc-c3"],
    independentItemIds: ["u6-ftc-i1", "u6-ftc-i2"],
    exitItemIds: ["u6-ftc-e1"],
  }),
  lesson({
    id: "u6-antiderivatives",
    title: "Antiderivatives and substitution",
    unitId: "u6",
    skillIds: ["sk-u6-antiderivative", "sk-u6-accumulation"],
    objective: "Undo elementary derivatives and use substitution when an inner derivative is present. Integration by parts is labelled BC-optional and excluded from AB mastery.",
    prerequisites: ["sk-u2-rules", "sk-u3-chain"],
    estimatedMinutes: 26,
    conceptLens:
      "An antiderivative undoes a derivative. Substitution is the chain rule in reverse: you need $u$ and $du$ to match what you see. Integration by parts, partial fractions, and improper integrals are not required for AB mastery; if they appear as optional notes they do not count toward AB readiness.",
    workedExample: {
      prompt: "Evaluate $\\int 2x\\cos(x^2)\\,dx$.",
      reasoning: [
        "$u=x^2$, $du=2x\\,dx$.",
        "The integral is $\\sin(x^2)+C$.",
      ],
      conclusion: "The $2x$ was the chain factor waiting to be $du$.",
    },
    nonExample: "Integrating $\\cos(x^2)$ as $\\sin(x^2)$ without the $2x$ partner. That inner function does not have an elementary antiderivative in AB techniques.",
    errorClinic: "Dropping $+C$ on an indefinite integral is incomplete. On a definite integral, $+C$ is not used.",
    activity: {
      id: "act-sub",
      title: "Find $du$ before integrating",
      kind: "chain-annotate",
      prompt: "Mark $u$ and $du$. If $du$ is not sitting in the integrand, substitution is not ready.",
    },
    hints: [
      { level: 1, label: "Restate", text: "You are undoing a chain rule." },
      { level: 2, label: "Question", text: "What inner piece has a derivative sitting next to it?" },
      { level: 3, label: "Strategy", text: "Set $u=$ inner, replace $2x\\,dx$ by $du$." },
      { level: 4, label: "Step", text: "$\\int \\cos u\\,du=\\sin u+C$." },
    ],
    checkItemIds: ["u6-ad-c1"],
    independentItemIds: ["u6-ad-i1"],
    exitItemIds: ["u6-ad-e1"],
  }),
  lesson({
    id: "u7-slope-fields",
    title: "Slope fields and verifying solutions",
    unitId: "u7",
    skillIds: ["sk-u7-verify", "sk-u7-slope"],
    objective: "Verify a proposed solution of a differential equation and match a particular curve to a slope field.",
    prerequisites: ["sk-u2-rules"],
    estimatedMinutes: 24,
    conceptLens:
      "A differential equation says what the slope must be at each point. A slope field draws those tiny slopes. A solution curve must be tangent to the field at every point it passes through. Euler’s method and logistic models are BC-optional and excluded from AB mastery.",
    workedExample: {
      prompt: "Show that $y=3e^{2x}$ solves $y'=2y$ with $y(0)=3$.",
      reasoning: [
        "$y'=6e^{2x}=2(3e^{2x})=2y$.",
        "$y(0)=3$. Both the DE and the initial condition hold.",
      ],
      conclusion: "Verification is substitution, not solving from scratch.",
    },
    nonExample: "Choosing a curve that crosses the field rather than following the tick marks.",
    errorClinic: "Checking the initial condition but not the DE, or vice versa, is incomplete.",
    activity: {
      id: "act-slopefield",
      title: "Follow the ticks",
      kind: "slope-field",
      prompt: "Given a field for $y'=x$, choose the parabola opening sideways versus the exponential. Justify with two sample slopes.",
    },
    hints: [
      { level: 1, label: "Restate", text: "The proposed $y$ must satisfy both the DE and the initial condition." },
      { level: 2, label: "Question", text: "What is $y'$ from the formula, and what does $2y$ equal?" },
      { level: 3, label: "Strategy", text: "Differentiate, substitute, then plug $x=0$." },
      { level: 4, label: "Step", text: "$y'=6e^{2x}=2y$, and $y(0)=3$." },
    ],
    checkItemIds: ["u7-sf-c1"],
    independentItemIds: ["u7-sf-i1"],
    exitItemIds: ["u7-sf-e1"],
  }),
  lesson({
    id: "u7-separation",
    title: "Separable equations with an initial condition",
    unitId: "u7",
    skillIds: ["sk-u7-separate"],
    objective: "Separate variables, integrate both sides, and apply an initial condition to find a particular solution.",
    prerequisites: ["sk-u6-antiderivative"],
    estimatedMinutes: 24,
    conceptLens:
      "If $dy/dx=g(x)h(y)$ and $h(y)\\neq 0$, write $\\frac{1}{h(y)}\\,dy=g(x)\\,dx$ and integrate. The constant is fixed by the initial condition. Exponential change $y'=ky$ is the model you must be fluent with. Logistic equations are BC-optional.",
    workedExample: {
      prompt: "Solve $y'=3y$ with $y(0)=2$, $y>0$.",
      reasoning: [
        "$\\frac{dy}{y}=3\\,dx$.",
        "$\\ln|y|=3x+C$, so $y=Ae^{3x}$.",
        "$y(0)=2$ gives $A=2$.",
      ],
      conclusion: "$y=2e^{3x}$.",
    },
    nonExample: "Writing $y=e^{3x}+C$ instead of a multiplicative constant.",
    errorClinic: "Losing the absolute value too early can drop a negative family, but an initial condition $y(0)=2>0$ selects the positive branch.",
    activity: {
      id: "act-sep",
      title: "Separate, integrate, then apply $y(x_0)$",
      kind: "slope-field",
      prompt: "Do not plug the initial condition into the DE before integrating.",
    },
    hints: [
      { level: 1, label: "Restate", text: "Move $y$ with $dy$ and $x$ with $dx$." },
      { level: 2, label: "Question", text: "What is $\\int dy/y$?" },
      { level: 3, label: "Strategy", text: "Exponentiate after integrating, then use $y(0)$." },
      { level: 4, label: "Step", text: "$A=2$ from $y(0)=2$." },
    ],
    checkItemIds: ["u7-sp-c1"],
    independentItemIds: ["u7-sp-i1"],
    exitItemIds: ["u7-sp-e1"],
  }),
  lesson({
    id: "u8-avg-net",
    title: "Average value and net change",
    unitId: "u8",
    skillIds: ["sk-u8-average", "sk-u8-area"],
    objective: "Compute average value of a function on $[a,b]$ and distinguish net change from total variation when a rate changes sign.",
    prerequisites: ["sk-u6-accumulation"],
    estimatedMinutes: 24,
    conceptLens:
      "Average value is $\\frac{1}{b-a}\\int_a^b f(x)\\,dx$, the height of a rectangle with the same signed area. If $v(t)$ is velocity, $\\int_a^b v$ is net displacement. Total distance is $\\int_a^b |v|$. Those two requests are not interchangeable.",
    workedExample: {
      prompt: "$v(t)=t-2$ on $[0,3]$. Find net displacement and total distance.",
      reasoning: [
        "Net: $\\int_0^3(t-2)\\,dt=\\frac{3}{2}-6=-4.5$.",
        "Split at $t=2$: $\\int_0^2(2-t)\\,dt+\\int_2^3(t-2)\\,dt=2+0.5=2.5$.",
      ],
      conclusion: "Net $-4.5$, total distance $2.5$.",
    },
    nonExample: "Reporting $4.5$ as displacement because distance “cannot be negative.” Displacement can be negative.",
    errorClinic: "Using a single integral of $v$ when the question asked how far the particle travelled.",
    activity: {
      id: "act-avg",
      title: "Name net versus total before integrating",
      kind: "slice",
      prompt: "Underline the request: “where is it?” versus “how far did it travel?”",
    },
    hints: [
      { level: 1, label: "Restate", text: "Signed integral versus integral of absolute value." },
      { level: 2, label: "Question", text: "Where is $v$ negative?" },
      { level: 3, label: "Strategy", text: "Split the integral at the zero of $v$." },
      { level: 4, label: "Step", text: "Zero at $t=2$." },
    ],
    checkItemIds: ["u8-an-c1"],
    independentItemIds: ["u8-an-i1"],
    exitItemIds: ["u8-an-e1"],
  }),
  lesson({
    id: "u8-volume",
    title: "Slices, disks, and washers",
    unitId: "u8",
    skillIds: ["sk-u8-volume"],
    objective: "Draw a representative slice, write the cross-sectional area, and form a volume integral. Arc length is BC-optional.",
    prerequisites: ["sk-u8-area"],
    estimatedMinutes: 26,
    conceptLens:
      "Volume from known cross-sections is $\\int A(x)\\,dx$. Disks and washers are the special case $A=\\pi R^2$ or $\\pi(R^2-r^2)$. The representative slice is drawn first so the radius is a function, not a guess. Arc length, parametric, polar, and vector calculus are not AB mastery content.",
    workedExample: {
      prompt: "Region bounded by $y=\\sqrt{x}$, $x=0$, $y=0$, $x=4$, rotated about the $x$-axis. Find the volume.",
      reasoning: [
        "Disk, radius $\\sqrt{x}$.",
        "$V=\\pi\\int_0^4 x\\,dx=8\\pi$.",
      ],
      conclusion: "$8\\pi$ cubic units.",
    },
    nonExample: "Using radius $x$ instead of $\\sqrt{x}$ because the bounds involve $x=4$.",
    errorClinic: "Washer mistakes are usually swapped $R$ and $r$, or rotating about a different axis than stated.",
    activity: {
      id: "act-slice",
      title: "Draw the slice first",
      kind: "slice",
      prompt: "Sketch one disk. Label the radius as a function of the integration variable.",
    },
    hints: [
      { level: 1, label: "Restate", text: "The radius is the distance from the axis to the curve." },
      { level: 2, label: "Question", text: "In terms of $x$, how far is $y=\\sqrt{x}$ from the $x$-axis?" },
      { level: 3, label: "Strategy", text: "$V=\\pi\\int R(x)^2\\,dx$." },
      { level: 4, label: "Step", text: "$R(x)=\\sqrt{x}$, so $R^2=x$." },
    ],
    checkItemIds: ["u8-vo-c1"],
    independentItemIds: ["u8-vo-i1"],
    exitItemIds: ["u8-vo-e1"],
  }),
];
