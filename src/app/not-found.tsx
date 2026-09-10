import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary">This page is not in the studio</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The two public lessons are still here. Later units sit behind the study gate.
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <Link href="/" className="underline">
          Calculus AB start
        </Link>
        <Link href="/lesson/u1-limit-vs-value" className="underline">
          Lesson 1
        </Link>
        <Link href="/lesson/u6-ftc" className="underline">
          Lesson 2
        </Link>
        <a href="https://study.anannt.ae/" className="underline">
          Study home
        </a>
      </div>
    </div>
  );
}
