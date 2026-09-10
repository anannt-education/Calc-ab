import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Practice",
  description:
    "Mixed AP Calculus AB practice: current learning, due review, and transfer. Protected mock items stay out of this pool.",
  path: "/practice",
});

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
