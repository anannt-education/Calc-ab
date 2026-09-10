"use client";

import { useState } from "react";
import { PageTitle } from "@/components/AppShell";
import { coverageReport, ITEMS, LESSONS } from "@/lib/content";
import { COURSE } from "@/lib/exam-config";
import { FACULTY } from "@/lib/faculty";
import { Button } from "@/components/ui/button";

export default function CmsPage() {
  const coverage = coverageReport();
  const [message, setMessage] = useState<string | null>(null);
  const draft = LESSONS.find((l) => l.status === "draft") ?? {
    id: "demo-draft-item",
    approval: {
      authorId: "author-anannt-calc",
      authorName: "Meera Krishnan",
      reviewerId: undefined as string | undefined,
      state: "draft" as const,
      cannotSelfPublish: true as const,
    },
  };

  const unpublished = ITEMS.filter((i) => i.status !== "published");

  return (
    <div>
      <PageTitle kicker="Academic CMS (preview)" title="Authoring is not approval">
        An author cannot self-publish an unapproved assessed item. Coverage is listed against required
        AB skills. Faculty names and review dates belong on the public lesson chrome; this page is
        the two-person rule in working form. {COURSE.disclaimer}
      </PageTitle>

      <section className="rounded-xl border p-4">
        <h2 className="font-semibold">Self-publish attempt</h2>
        <p className="text-sm text-muted-foreground">
          Current user: {draft.approval.authorName} ({draft.approval.authorId}). State: draft.
        </p>
        <Button
          type="button"
          className="mt-2"
          variant="outline"
          onClick={() => {
            const samePerson = !draft.approval.reviewerId || draft.approval.reviewerId === draft.approval.authorId;
            if (draft.approval.cannotSelfPublish && samePerson && draft.approval.state !== "approved") {
              setMessage("Blocked: an author cannot self-publish. An academic approver with a different account must move the item to approved, then published.");
            } else {
              setMessage("Would publish (approver is distinct).");
            }
          }}
        >
          Publish as author
        </Button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Coverage report (AB skills)</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-1">Skill</th>
                <th>CED</th>
                <th>Lesson</th>
                <th>Independent item</th>
                <th>Ready</th>
              </tr>
            </thead>
            <tbody>
              {coverage.map((row) => (
                <tr key={row.skillId} className="border-b">
                  <td className="py-1 pr-2">{row.title}</td>
                  <td className="text-xs">{row.ced}</td>
                  <td>{row.teaching[0] ?? "—"}</td>
                  <td>{row.independent[0] ?? "—"}</td>
                  <td>{row.ready ? "yes" : "gap"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 text-sm">
        <h2 className="font-semibold">Faculty on the public chrome</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {FACULTY.map((p) => (
            <li key={p.id}>
              {p.name} · {p.role} · {p.qualifications}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-muted-foreground">
          Review date on published lessons in this slice: 10 Sep 2026. Authors cannot also approve.
        </p>
      </section>

      <section className="mt-6 text-sm">
        <h2 className="font-semibold">Item approval states</h2>
        <p className="text-muted-foreground">
          Published in this slice: {ITEMS.filter((i) => i.status === "published").length}. Unpublished:{" "}
          {unpublished.length}. Lessons: {LESSONS.filter((l) => l.status === "published").length} published.
        </p>
      </section>
    </div>
  );
}
