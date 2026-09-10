"use client";

import Link from "next/link";

export default function ErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary">This screen did not load</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        That is a technical fault, not a comment on your work. Try again, or return to Home for
        the next recommended task.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{error.message}</p>
      <div className="mt-3 flex gap-3">
        <button type="button" className="text-sm underline" onClick={reset}>
          Try this screen again
        </button>
        <Link href="/home" className="text-sm underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
