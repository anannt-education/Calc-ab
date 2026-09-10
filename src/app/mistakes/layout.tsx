import type { Metadata } from "next";
import { gatedMetadata } from "@/lib/seo";

export const metadata: Metadata = gatedMetadata(
  "Mistake notebook",
  "Classified calculus mix-ups after the two public lessons. Session required. Same-family repeats do not add evidence.",
  "/mistakes"
);

export default function MistakesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
