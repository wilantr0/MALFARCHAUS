import Link from "next/link"

type Crumb = {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  console.log(items)
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-amber-800">
        {items.map((item, index) => {
          const isLast = index === items.length-1

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:underline text-amber-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-amber-900">
                  {item.label}
                </span>
              )}

              {!isLast && <span className="text-amber-500">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}