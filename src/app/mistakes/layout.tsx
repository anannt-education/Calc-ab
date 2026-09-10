import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mistake notebook",
  description:
    "Classified calculus mix-ups with a next step and a scheduled fresh question. Same-family repeats do not add mastery evidence.",
  path: "/mistakes",
  noIndex: true,
});

export default function MistakesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
