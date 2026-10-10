import { Suspense } from "react"
import { LayoutGrid } from "lucide-react"
import { Role, ListingStatus } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { db } from "@/lib/db"
import { ItemCard } from "@/components/shared/item-card"
import { TagFilter } from "@/components/ngo/tag-filter"
import { ClaimButton } from "@/components/ngo/claim-button"

type SearchParams = Promise<{ tags?: string; q?: string }>

export default async function NgoBrowsePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  await requireRole(Role.NGO_RECIPIENT)
  const params = await searchParams
  const activeTags = params.tags?.split(",").filter(Boolean) ?? []
  const query = params.q?.trim() ?? ""

  const allTags = await db.tag.findMany({
    orderBy: { name: "asc" },
    select: { name: true },
  })

  const items = await db.item.findMany({
    where: {
      status: ListingStatus.AVAILABLE,
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" as const } },
              { description: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {}),
      ...(activeTags.length > 0
        ? {
              tags: { some: { tag: { name: { in : activeTags} } } },
          }
        : {}),
    },
    include: {
      tags: { include: { tag: true } },
      donor: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#72884c]">
          Discover
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tighter text-[#17352b]">
          Available donations
        </h1>
        <p className="mt-2 text-sm text-[#748379]">
          Browse items from donors and claim what your community needs.
        </p>
      </div>

      <Suspense fallback={null}>
        <TagFilter allTags={allTags.map((t) => t.name)} />
      </Suspense>

      <p className="text-sm text-[#829087]">
        {items.length} item{items.length !== 1 ? "s" : ""} found
        {activeTags.length > 0 && ` · filtered by ${activeTags.join(", ")}`}
      </p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7dfd1] bg-white py-20 text-center">
          <LayoutGrid size={40} className="text-[#b8d45a]" />
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">No items match</h2>
          <p className="mt-2 text-sm text-[#748379]">
            Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              compact
              action={<ClaimButton itemId={item.id} />}
            />
          ))}
        </div>
      )}
    </div>
  )
}
