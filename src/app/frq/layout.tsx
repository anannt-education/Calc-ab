import type { Metadata } from "next";
import { gatedMetadata } from "@/lib/seo";

export const metadata: Metadata = gatedMetadata(
  "FRQ Reasoning Studio",
  "Original Calculus AB free-response tasks after the two public lessons. Session required. Not released College Board items.",
  "/frq"
);

export default function FrqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
