"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Home,
  MessageCircle,
  NotebookPen,
  PenLine,
  Timer,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudent } from "./StudentProvider";
import { TRUST_LINE } from "@/lib/site";

const NAV = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/course", label: "Course", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/mistakes", label: "Mistakes", icon: NotebookPen },
  { href: "/frq", label: "FRQ studio", icon: PenLine },
  { href: "/mock", label: "Mock centre", icon: Timer },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/ask", label: "Ask Anannt", icon: MessageCircle },
];

const PUBLIC_FOOTER = [
  { href: "/", label: "Home" },
  { href: "/course", label: "Course map" },
  { href: "/lesson/u1-limit-vs-value", label: "Sample: limits" },
  { href: "/lesson/u6-ftc", label: "Sample: FTC" },
  { href: "/exam/2027", label: "2027 exam guide" },
  { href: "/about", label: "Academic approach" },
  { href: "/faculty", label: "Faculty" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { state, setState } = useStudent();
  const hideNav = path.startsWith("/mock/sit") || path.startsWith("/onboarding");
  const homeHref = state.profile?.diagnosticCompleted ? "/home" : "/";

  useEffect(() => {
    if (path.startsWith("/mock/sit")) return;
    if (state.currentContext.assessmentMode !== "mock") return;
    setState((s) => ({
      ...s,
      currentContext: { ...s.currentContext, assessmentMode: "learning" },
    }));
  }, [path, setState, state.currentContext.assessmentMode]);

  return (
    <div className="flex min-h-full flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <header className="border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href={homeHref} className="flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground" aria-hidden>
              ∫
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">Anannt Education</span>
              <span className="block text-xs text-muted-foreground">AP Calculus AB · 2027</span>
            </span>
          </Link>
          {!hideNav && (
            <p className="hidden text-xs text-muted-foreground sm:block">
              Independent prep · not a College Board score
            </p>
          )}
          <Link
            href="/faculty"
            className="text-xs text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Faculty
          </Link>
        </div>
        {!hideNav && (
          <nav aria-label="Student" className="mx-auto max-w-6xl overflow-x-auto px-2 pb-2">
            <ul className="flex min-w-max gap-1">
              {NAV.map((n) => {
                const active = path === n.href || (n.href !== "/home" && path.startsWith(n.href + "/"));
                const Icon = n.icon;
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {children}
      </main>
      <footer className="border-t px-4 py-6 text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl">
          <p className="text-center font-medium text-foreground/80">{TRUST_LINE}</p>
          <nav aria-label="Footer" className="mt-3">
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {PUBLIC_FOOTER.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-2 hover:text-foreground hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-3 text-center">
            Practice composites are internal percentages, not AP score predictions.{" "}
            <Link href="/cms" className="underline-offset-2 hover:underline">
              Academic CMS
            </Link>
            <span className="mx-2">·</span>
            <Link href="/mentor" className="underline-offset-2 hover:underline">
              Mentor queue
            </Link>
          </p>
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
      <h1 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
        {title}
      </h1>
      {children && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
    </div>
  );
}

export function FacultyLink() {
  return (
    <Link href="/faculty" className="inline-flex items-center gap-1 text-sm text-primary">
      <GraduationCap className="size-4" /> Faculty and review standards
    </Link>
  );
}
