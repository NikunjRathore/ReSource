import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, HandHeart, LayoutGrid, Sparkles } from "lucide-react"
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
      <section className="relative overflow-hidden rounded-[2rem] bg-[#e8eddd] px-6 py-7 sm:px-9 sm:py-9">
        <div className="absolute -right-12 -top-20 size-56 rounded-full bg-[#d9f26b]/45 blur-2xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#72884c]">
              <Sparkles size={15} aria-hidden="true" />
              Find what your community needs
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-[#17352b] sm:text-4xl">
              Useful things, ready for a new home.
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#61746a] sm:text-base">
              Discover thoughtful donations from people nearby. Claim a good fit and coordinate a trusted handoff.
            </p>
          </div>
          <Link
            href="/ngo/tracking"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#cbd6be] bg-white/75 px-5 text-sm font-semibold text-[#234a39] transition hover:border-[#9ab184] hover:bg-white"
          >
            <HandHeart size={16} aria-hidden="true" />
            Your claims
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Suspense fallback={null}>
        <TagFilter allTags={allTags.map((t) => t.name)} />
      </Suspense>

      <div className="flex flex-col gap-1 border-b border-[#e4e9dc] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#72884c]">The giving shelf</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#17352b]">Available donations</h2>
        </div>
        <p className="text-sm text-[#829087]" aria-live="polite">
          <span className="font-semibold text-[#385642]">{items.length}</span>{" "}
          {items.length === 1 ? "item" : "items"} found
          {activeTags.length > 0 && ` · filtered by ${activeTags.join(", ")}`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#d7dfd1] bg-white px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-[#eff4e4] text-[#72884c]">
            <LayoutGrid size={25} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">
            {query || activeTags.length > 0 ? "No donations match those filters" : "The giving shelf is quiet for now"}
          </h2>
          <p className="mt-2 text-sm text-[#748379]">
            {query || activeTags.length > 0
              ? "Try a different search or remove a filter to see more donations."
              : "Check back soon. New donations from the community will appear here."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
