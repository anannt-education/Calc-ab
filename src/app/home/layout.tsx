import type { Metadata } from "next";
import { gatedMetadata } from "@/lib/seo";

export const metadata: Metadata = gatedMetadata(
  "Today’s next task",
  "Recommended next Calculus AB task after the study gate. Session required. Evidence, not a score prediction.",
  "/home"
);

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
