import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary">This page is not in the public slice</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The lesson may be unpublished, or the link is from an older map. Unpublished units go to a
        waitlist — they are not missing pages.
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <Link href="/" className="underline">
          Calculus AB home
        </Link>
        <Link href="/lesson/u1-limit-vs-value" className="underline">
          Lesson 1
        </Link>
        <Link href="/lesson/u6-ftc" className="underline">
          Lesson 2
        </Link>
      </div>
    </div>
  );
}
