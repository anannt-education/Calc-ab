import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Practice",
  description:
    "Mixed Calculus AB practice: current learning, due review, and transfer. Protected mock items stay out of this pool.",
  path: "/practice",
  noIndex: true,
});

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
