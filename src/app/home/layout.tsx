import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Today’s next task",
  description:
    "Your recommended next Calculus AB task, with a tutor-style reason: why this, why now, and what it unlocks.",
  path: "/home",
  noIndex: true,
});

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
