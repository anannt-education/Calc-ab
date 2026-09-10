"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathText } from "./MathText";

function A(x: number) {
  return (x * x) / 2 - 2 * x;
}

export function FtcLab() {
  const [predicted, setPredicted] = useState<"up" | "down" | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <figure className="rounded-xl border bg-card p-4">
      <figcaption className="mb-3 text-sm font-medium text-primary">
        Signature activity — predict accumulation before the reveal
      </figcaption>
      <p className="mb-3 text-sm">
        Let $f(t)=t-2$ and $A(x)=\int_0^x f(t)\,dt$. On $(0,2)$, $f$ is negative. Before the graph of
        $A$ appears, decide whether $A$ is rising.
      </p>
      <svg viewBox="0 0 320 160" className="mb-3 w-full max-w-lg" role="img" aria-labelledby="f-title f-desc">
        <title id="f-title">Graph of f(t)=t-2</title>
        <desc id="f-desc">A line crossing the t-axis at 2, negative on the left of 2.</desc>
        <line x1="20" y1="80" x2="300" y2="80" stroke="currentColor" />
        <line x1="40" y1="10" x2="40" y2="150" stroke="currentColor" />
        <line x1="40" y1="120" x2="280" y2="20" stroke="#1B3A5F" strokeWidth="2" />
        <text x="250" y="28" fontSize="12">
          f
        </text>
        <text x="200" y="96" fontSize="11">
          t=2
        </text>
      </svg>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={predicted === "up" ? "default" : "outline"}
          onClick={() => setPredicted("up")}
        >
          A is increasing
        </Button>
        <Button
          type="button"
          variant={predicted === "down" ? "default" : "outline"}
          onClick={() => setPredicted("down")}
        >
          A is decreasing
        </Button>
        <Button type="button" variant="secondary" disabled={!predicted} onClick={() => setRevealed(true)}>
          Reveal A
        </Button>
      </div>
      {predicted && !revealed && (
        <p className="mt-2 text-sm text-muted-foreground">Prediction locked. Reveal when you are ready.</p>
      )}
      {revealed && (
        <div className="mt-4 space-y-2 text-sm">
          <svg viewBox="0 0 320 160" className="w-full max-w-lg" role="img" aria-labelledby="a-title a-desc">
            <title id="a-title">Graph of A(x)</title>
            <desc id="a-desc">A parabola opening upward, decreasing on 0 to 2, then increasing.</desc>
            <line x1="20" y1="80" x2="300" y2="80" stroke="currentColor" />
            <line x1="40" y1="10" x2="40" y2="150" stroke="currentColor" />
            {Array.from({ length: 24 }, (_, i) => {
              const x = i * 0.2;
              const y = A(x);
              const px = 40 + x * 50;
              const py = 80 - y * 18;
              return <circle key={i} cx={px} cy={py} r="2" fill="#1B3A5F" />;
            })}
            <text x="250" y="50" fontSize="12">
              A
            </text>
          </svg>
          {predicted === "down" ? (
            <p>
              Your prediction matches the FTC: when $f$ is negative, $A$ decreases on $(0,2)$. You
              treated accumulation as signed. Geometric “area” pictures are a different question.
            </p>
          ) : (
            <p>
              This is the sign mix-up, and it is a very common one: area pictures look positive after
              taking absolute values, but $A$ is a running signed total. Negative $f$ makes $A$
              decrease. Next: say that $A$ follows the sign of $f$ before the graph appears.
            </p>
          )}
          <p>
            <MathText text="Next: $\\dfrac{d}{dx}\\int_0^{x^2}(t-2)\,dt = (x^2-2)\\cdot 2x$. The $2x$ is the chain factor. Leaving it out is a different error from the sign misconception." />
          </p>
        </div>
      )}
    </figure>
  );
}
