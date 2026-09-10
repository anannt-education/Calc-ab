import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary">This page is not in the course</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The lesson or item may be unpublished, or the link is from an older map. Your next step is
        the course map or Home — not a blank screen.
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <Link href="/course" className="underline">
          Course map
        </Link>
        <Link href="/home" className="underline">
          Home
        </Link>
        <Link href="/" className="underline">
          Anannt landing
        </Link>
      </div>
    </div>
  );
}
