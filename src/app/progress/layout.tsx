import type { Metadata } from "next";
import { gatedMetadata } from "@/lib/seo";

export const metadata: Metadata = gatedMetadata(
  "Progress",
  "Honest Calculus AB progress: exposure, independent evidence, retention. Session required. No score predictions.",
  "/progress"
);

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
