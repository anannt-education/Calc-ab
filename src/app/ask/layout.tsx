import type { Metadata } from "next";
import { gatedMetadata } from "@/lib/seo";

export const metadata: Metadata = gatedMetadata(
  "Ask Anannt",
  "Hint ladder for Calculus AB after the two public lessons. Session required. Not an unrestricted chatbot.",
  "/ask"
);

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return children;
}
