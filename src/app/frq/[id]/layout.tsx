import type { Metadata } from "next";
import { FRQ_BY_ID } from "@/lib/content";
import { buildMetadata, plainText } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const frq = FRQ_BY_ID[id];
  if (!frq) {
    return buildMetadata({
      title: "FRQ",
      description: "Reasoning Studio task.",
      path: `/frq/${id}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: frq.id === "frq-tank" ? "FRQ: rainwater tank" : "FRQ: piecewise rate",
    description: plainText(`${frq.title}. ${frq.stem} Anannt Reasoning Studio, original task.`),
    path: `/frq/${id}`,
    type: "article",
    noIndex: true,
  });
}

export default function FrqItemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
