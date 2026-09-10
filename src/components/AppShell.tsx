"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { COLLEGE_BOARD_AP, COLLEGE_BOARD_PSAT, NAP_LINE, STUDIO_SUPPLEMENT } from "@/lib/legal";
import { PUBLIC_LESSON_META, STUDY_ORIGIN, studyStartUrl } from "@/lib/gate";

const PUBLIC_NAV = [
  { href: "/", label: "Studio" },
  { href: PUBLIC_LESSON_META["u1-limit-vs-value"].href, label: "Lesson 1" },
  { href: PUBLIC_LESSON_META["u6-ftc"].href, label: "Lesson 2" },
  { href: "/exam/2027", label: "2027 guide" },
  { href: "/faq", label: "FAQ" },
];

const PUBLIC_FOOTER = [
  { href: "/", label: "Calculus AB" },
  { href: PUBLIC_LESSON_META["u1-limit-vs-value"].href, label: "Limit vs value" },
  { href: PUBLIC_LESSON_META["u6-ftc"].href, label: "FTC accumulation" },
  { href: "/exam/2027", label: "2027 exam guide" },
  { href: "/about", label: "How we teach" },
  { href: "/faculty", label: "Faculty" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const hideNav = path.startsWith("/mock/sit");

  return (
    <div className="flex min-h-full flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <header className="border-b bg-card/90 backdrop-blur" style={{ borderBottomColor: "#E4A31A" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a
            href={STUDY_ORIGIN}
            className="flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className="flex size-8 items-center justify-center rounded-md text-sm font-semibold text-primary-foreground"
              style={{ background: "#1639A8" }}
              aria-hidden
            >
              ∫
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight" style={{ color: "#1639A8" }}>
                Anannt Study
              </span>
              <span className="block text-xs text-muted-foreground">Calculus AB · May 2027</span>
            </span>
          </a>
          {!hideNav && (
            <nav aria-label="Public Calculus AB" className="hidden sm:block">
              <ul className="flex items-center gap-1">
                {PUBLIC_NAV.map((n) => {
                  const active = path === n.href;
                  return (
                    <li key={n.href}>
                      <Link
                        href={n.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-md px-2.5 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-ring",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {n.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <a
            href={studyStartUrl()}
            className="text-xs text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Study gate
          </a>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {children}
      </main>
      <footer className="mt-auto px-4 py-8 text-xs leading-relaxed text-primary-foreground" style={{ background: "#0F245C" }}>
        <div className="mx-auto max-w-6xl space-y-3">
          <p className="font-medium">{COLLEGE_BOARD_AP}</p>
          <p>{COLLEGE_BOARD_PSAT}</p>
          <p>{STUDIO_SUPPLEMENT}</p>
          <p>{NAP_LINE}</p>
          <nav aria-label="Footer" className="pt-2">
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-primary-foreground/80">
              {PUBLIC_FOOTER.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-2 hover:text-primary-foreground hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function PageTitle({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 max-w-3xl">
      {kicker && (
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{kicker}</p>
      )}
      <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        {title}
      </h1>
      {children && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
    </div>
  );
}

export function FacultyLink() {
  return (
    <Link href="/faculty" className="inline-flex items-center gap-1 text-sm text-primary">
      Faculty and review standards
    </Link>
  );
}
