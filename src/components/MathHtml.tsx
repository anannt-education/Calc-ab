import { mathToHtml } from "@/lib/math-html";

/** Server-safe mathematics. KaTeX emits MathML alongside HTML. */
export function MathHtml({ text, className }: { text: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: mathToHtml(text) }} />;
}
