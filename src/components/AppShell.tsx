"use client";

import { useEffect, useState } from "react";
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
import { SiteFooter } from "./SiteFooter";
import { SITE_URL } from "@/lib/site";
import { SESSION_COOKIE } from "@/lib/gate";

const SESSION_NAV = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/course", label: "Course", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/mistakes", label: "Mistakes", icon: NotebookPen },
  { href: "/frq", label: "FRQ studio", icon: PenLine },
  { href: "/mock", label: "Mock centre", icon: Timer },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/ask", label: "Ask Anannt", icon: MessageCircle },
];

const PUBLIC_NAV = [
  { href: "/", label: "Studio", icon: Home },
  { href: "/lesson/u1-limit-vs-value", label: "Lesson 1", icon: BookOpen },
  { href: "/lesson/u6-ftc", label: "Lesson 2", icon: BookOpen },
  { href: "/exam/2027", label: "Exam guide", icon: ClipboardList },
  { href: "/faq", label: "FAQ", icon: NotebookPen },
];

function readSessionCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((part) => {
    const [name, value] = part.trim().split("=");
    return name === SESSION_COOKIE && Boolean(value) && value !== "0";
  });
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { state, setState } = useStudent();
  const [hasSession, setHasSession] = useState(false);
  const hideNav = path.startsWith("/mock/sit");
  const nav = hasSession ? SESSION_NAV : PUBLIC_NAV;

  useEffect(() => {
    setHasSession(readSessionCookie());
  }, [path]);

  useEffect(() => {
    if (path.startsWith("/mock/sit")) return;
    if (state.currentContext.assessmentMode !== "mock") return;
    setState((s) => ({
      ...s,
      currentContext: { ...s.currentContext, assessmentMode: "learning" },
    }));
  }, [path, setState, state.currentContext.assessmentMode]);

  return (
    <div className="flex min-h-full flex-col bg-paper">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <header className="border-b border-rule bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <a
              href={SITE_URL}
              className="flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className="flex size-9 items-center justify-center rounded-md bg-ink text-gold"
                aria-hidden
              >
                ∫
              </span>
              <span>
                <span className="block text-sm font-semibold tracking-tight text-navy">Anannt Education</span>
                <span className="block text-xs font-medium text-navy">Study</span>
              </span>
            </a>
            <Link href="/" className="hidden text-sm text-ink-muted sm:block">
              Calculus AB
            </Link>
          </div>
          {!hideNav && (
            <p className="hidden text-xs text-ink-muted md:block">Self-prep · May 2027 · not a College Board score</p>
          )}
          <Link
            href="/faculty"
            className="text-xs text-ink-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Faculty
          </Link>
        </div>
        {!hideNav && (
          <nav aria-label="Student" className="mx-auto max-w-6xl overflow-x-auto px-2 pb-2">
            <ul className="flex min-w-max gap-1">
              {nav.map((n) => {
                const active = path === n.href || (n.href !== "/" && path.startsWith(n.href + "/"));
                const Icon = n.icon;
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-ink text-paper"
                          : "text-ink-muted hover:bg-paper-soft hover:text-ink"
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
      <SiteFooter />
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
      <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
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
