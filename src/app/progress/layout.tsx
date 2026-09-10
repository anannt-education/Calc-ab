import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Progress",
  description:
    "Honest AP Calculus AB progress: exposure, independent evidence, retention, and review due. No fake percentages or score predictions.",
  path: "/progress",
});

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
