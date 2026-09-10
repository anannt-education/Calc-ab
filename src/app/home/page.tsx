"use client";

import Link from "next/link";
import { PageTitle } from "@/components/AppShell";
import { useStudent } from "@/components/StudentProvider";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildStudyPlan } from "@/lib/recommend";
import { coverageStats } from "@/lib/mastery";

export default function HomePage() {
  const { state } = useStudent();
  const plan = buildStudyPlan(state);
  const stats = coverageStats(state);

  return (
    <div>
      <PageTitle kicker="Today" title={`Hello${state.profile ? `, ${state.profile.displayName}` : ""}`}>
        One recommended next task. The reason is written the way a tutor would say it: why this, why
        now, and what it unlocks. Not a badge for logging in.
      </PageTitle>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Recommended next</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xl font-medium text-primary">{plan.next.title}</p>
          <p className="text-sm">{plan.next.reason}</p>
          <p className="text-xs text-muted-foreground">About {plan.next.minutes} minutes.</p>
          <Link href={plan.next.href} className={buttonVariants()}>
            Begin this session
          </Link>
        </CardContent>
      </Card>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Due review</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {plan.dueReview.length === 0 ? (
              <p className="text-muted-foreground">
                Nothing is marked review due. After you demonstrate a skill independently, we will
                schedule a later check — that is how we see whether it still holds.
              </p>
            ) : (
              <ul className="space-y-2">
                {plan.dueReview.map((t) => (
                  <li key={t.id}>
                    <Link className="text-primary underline-offset-2 hover:underline" href={t.href}>
                      {t.title}
                    </Link>
                    <span className="block text-xs text-muted-foreground">{t.reason}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Nearest milestone</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-medium">{plan.nearestMilestone.title}</p>
            <p className="text-muted-foreground">{plan.nearestMilestone.detail}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Exposure {stats.openedLessons} lessons opened · Independent skills {stats.independent} ·
              Retained {stats.retained}. These counts are evidence, not AP scores, and not a promise.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
