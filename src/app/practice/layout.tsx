import type { Metadata } from "next";
import { gatedMetadata } from "@/lib/seo";

export const metadata: Metadata = gatedMetadata(
  "Practice",
  "Mixed Calculus AB practice after the two public lessons. Session required. Mock items stay out of this pool.",
  "/practice"
);

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
