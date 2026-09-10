import Link from "next/link";
import { COLLEGE_BOARD_LINE, NAP_LINE, SITE_URL, STUDIO_LINE } from "@/lib/site";
import { whatsappHelpUrl } from "@/lib/gate";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/lesson/u1-limit-vs-value", label: "Lesson 1: limits" },
  { href: "/lesson/u6-ftc", label: "Lesson 2: FTC" },
  { href: "/exam/2027", label: "2027 exam guide" },
  { href: "/course", label: "Course map" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/about", label: "How we teach" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-footer px-4 py-8 text-xs text-[#f4efe4]">
      <div className="mx-auto max-w-6xl space-y-3">
        <p className="font-[family-name:var(--font-playfair)] text-sm tracking-tight">Anannt Education · Study</p>
        <p>{COLLEGE_BOARD_LINE}</p>
        <p>{STUDIO_LINE}</p>
        <p>{NAP_LINE}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-2 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`${SITE_URL}/start?subject=calculus-ab`} className="underline-offset-2 hover:underline">
                After two lessons
              </a>
            </li>
            <li>
              <a href={whatsappHelpUrl("doubts")} className="underline-offset-2 hover:underline">
                WhatsApp Burjuman
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
