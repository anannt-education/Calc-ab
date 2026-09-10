"use client";

import { useMemo } from "react";
import { mathToHtml } from "@/lib/math-html";

export function MathText({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => mathToHtml(text), [text]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
