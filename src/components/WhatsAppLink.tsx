"use client";

import { whatsappHelpUrl } from "@/lib/gate";
import { useStudent } from "./StudentProvider";

export function WhatsAppLink({
  sku,
  children,
  className,
}: {
  sku: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { log } = useStudent();
  return (
    <a
      href={whatsappHelpUrl(sku)}
      className={className ?? "text-primary underline-offset-2 hover:underline"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => log("wa_click", { sku, subject: "calculus-ab" })}
    >
      {children ?? "WhatsApp Anannt in Burjuman"}
    </a>
  );
}
