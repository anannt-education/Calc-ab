import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Ask Anannt",
  description:
    "Ask Anannt faculty hint ladder for AP Calculus AB: restate, question, strategy, then one step. Not an unrestricted chatbot.",
  path: "/ask",
});

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return children;
}
