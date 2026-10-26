import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, HandHeart, Sparkles } from "lucide-react"
import { Role } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { db } from "@/lib/db"
import { TagFilter } from "@/components/ngo/tag-filter"
import { NgoItemBrowser } from "@/components/ngo/item-browser"

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

  const tagRows = await db.item.findMany({
    select: { tags: true },
  })
  const allTags = [
    ...new Set(tagRows.flatMap((item) => item.tags ?? [])),
  ].sort((a, b) => a.localeCompare(b))

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
        <TagFilter allTags={allTags} />
      </Suspense>

      <NgoItemBrowser
        key={`${query}|${activeTags.join(",")}`}
        query={query}
        activeTags={activeTags}
      />
    </div>
  )
}
