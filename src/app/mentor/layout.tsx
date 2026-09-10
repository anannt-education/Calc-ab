import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mentor review queue",
  description: "Demo Anannt mentor queue for a faculty-reviewed handwritten Calculus AB FRQ.",
  path: "/mentor",
  noIndex: true,
});

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
