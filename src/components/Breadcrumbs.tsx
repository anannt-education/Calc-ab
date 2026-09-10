import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? (
              <span className="text-foreground" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-foreground hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
