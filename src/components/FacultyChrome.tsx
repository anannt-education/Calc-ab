import Link from "next/link";
import { facultyById } from "@/lib/faculty";
import type { ApprovalRecord } from "@/lib/types";

export function FacultyChrome({
  approval,
  alignment,
}: {
  approval: ApprovalRecord;
  alignment?: string;
}) {
  const author = facultyById(approval.authorId);
  const reviewer = facultyById(approval.reviewerId);
  const authorName = author?.name ?? approval.authorName;
  const reviewerName = reviewer?.name ?? approval.reviewerName;

  return (
    <aside className="mb-6 rounded-lg border border-border bg-card px-3 py-3 text-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Faculty review
      </p>
      <p className="mt-1">
        Written by{" "}
        <span className="font-medium text-primary">{authorName}</span>
        {author ? ` · ${author.qualifications}` : null}
      </p>
      {reviewerName ? (
        <p className="mt-0.5">
          Reviewed by <span className="font-medium text-primary">{reviewerName}</span>
          {reviewer ? ` · ${reviewer.qualifications}` : null}
          {approval.approvedAt ? ` · ${formatReviewDate(approval.approvedAt)}` : null}
        </p>
      ) : (
        <p className="mt-0.5 text-muted-foreground">
          Awaiting a second Anannt academic reviewer. Authors cannot self-publish assessed items.
        </p>
      )}
      {alignment ? <p className="mt-1 text-xs text-muted-foreground">{alignment}</p> : null}
      <p className="mt-2 text-xs">
        <Link href="/faculty" className="text-primary underline-offset-2 hover:underline">
          Review standards
        </Link>
        <span className="mx-2 text-muted-foreground">·</span>
        <a href="#report-math" className="text-primary underline-offset-2 hover:underline">
          Report ambiguous mathematics
        </a>
      </p>
    </aside>
  );
}

function formatReviewDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
