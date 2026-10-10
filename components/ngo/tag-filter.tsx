"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { cn } from "cn"

type TagFilterProps = {
  allTags: string[]
}

export function TagFilter({ allTags }: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTags = searchParams.get("tags")?.split(",").filter(Boolean) ?? []
  const query = searchParams.get("q") ?? ""

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    router.push(`/ngo?${params.toString()}`)
  }

  function toggleTag(tag: string) {
    const next = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag]
    updateParams({ tags: next.length > 0 ? next.join(",") : null })
  }

  function clearFilters() {
    router.push("/ngo")
  }

  return (
    <div className="space-y-4 rounded-3xl border border-[#e4e9dc] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#829087]"
          />
          <input
            type="search"
            placeholder="Search items…"
            defaultValue={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParams({ q: (e.target as HTMLInputElement).value || null })
              }
            }}
            className="h-11 w-full rounded-full border border-[#d7dfd1] bg-[#fbfcf8] pl-10 pr-4 text-sm outline-none focus-visible:border-[#789345] focus-visible:ring-3 focus-visible:ring-[#d9f26b]/60"
          />
        </div>
        {(activeTags.length > 0 || query) && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#d7dfd1] px-4 py-2 text-sm font-medium text-[#567065] transition hover:bg-[#eff4e4]"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      {allTags.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#829087]">
            Filter by tags
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const active = activeTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    active
                      ? "border-[#17352b] bg-[#17352b] text-white"
                      : "border-[#e4e9dc] bg-[#f0f2e8] text-[#567065] hover:border-[#789345]"
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
