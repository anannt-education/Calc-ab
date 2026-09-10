"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { MathText } from "./MathText";

export function LimitLab() {
  const [y, setY] = useState(4);
  const hole = 2;

  return (
    <figure className="rounded-xl border bg-card p-4">
      <figcaption className="mb-3 text-sm font-medium text-primary">
        Signature activity — move the filled point
      </figcaption>
      <p className="mb-3 text-sm text-muted-foreground">
        Nearby curve: $y=x+1$ with a hole at $x=1$. The filled point is the declared $f(1)$. Use the
        slider or arrow keys. Nearby behaviour does not follow the filled point.
      </p>
      <svg viewBox="0 0 320 200" className="w-full max-w-lg" role="img" aria-labelledby="lim-title lim-desc">
        <title id="lim-title">Limit versus function value</title>
        <desc id="lim-desc">
          A line of slope 1 with a hole at x=1, y=2. A filled point at x=1 can move vertically. The
          limit stays 2.
        </desc>
        <line x1="20" y1="180" x2="300" y2="180" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="10" x2="40" y2="180" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="160" x2="280" y2="40" stroke="#1B3A5F" strokeWidth="2" />
        <circle cx="160" cy={160 - hole * 24} r="6" fill="#faf8f3" stroke="#1B3A5F" strokeWidth="2" />
        <circle cx="160" cy={160 - y * 24} r="6" fill="#C4A35A" />
        <text x="168" y={160 - y * 24 - 8} fontSize="11" fill="#1B3A5F">
          f(1)={y.toFixed(1)}
        </text>
        <text x="150" y="194" fontSize="11">
          x=1
        </text>
      </svg>
      <label className="mt-3 block text-sm">
        Height of the filled point $f(1)$: {y.toFixed(1)}
        <Slider
          className="mt-2"
          min={-1}
          max={6}
          step={0.1}
          value={[y]}
          onValueChange={(v) => {
            const n = Array.isArray(v) ? v[0] : v;
            setY(typeof n === "number" ? n : 4);
          }}
          aria-label="Height of f of 1"
        />
      </label>
      <div className="mt-3 space-y-1 text-sm">
        <p>
          <MathText text={`$\\lim_{x\\to 1} f(x)=2$ (unchanged)`} />
        </p>
        <p>
          <MathText text={`$f(1)=${y.toFixed(1)}$ (this is what you moved)`} />
        </p>
        <p className="text-muted-foreground">
          Continuity fails unless the filled point sits at height 2. Moving it never rewrites the
          limit.
        </p>
      </div>
    </figure>
  );
}
