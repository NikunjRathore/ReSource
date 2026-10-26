"use client"

import { useEffect, useState } from "react"
import { LayoutGrid } from "lucide-react"
import { ClaimButton } from "@/components/ngo/claim-button"
import { ItemCard, type ItemCardData } from "@/components/shared/item-card"

type ApiItem = Omit<ItemCardData, "createdAt" | "expiryDate"> & {
  createdAt: string
  expiryDate: string | null
}

type ItemsResponse = {
  items: ApiItem[]
  totalPages: number
  currentPage: number
  totalCount: number
}

export function NgoItemBrowser({
  query,
  activeTags,
}: {
  query: string
  activeTags: string[]
}) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ItemsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const tagsParam = activeTags.join(",")

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({ page: String(page) })
    if (query) params.set("q", query)
    if (tagsParam) params.set("tags", tagsParam)

    async function loadItems() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/ngo/items?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        })
        const result = (await response.json()) as ItemsResponse & {
          error?: string
        }
        if (!response.ok) {
          throw new Error(result.error ?? "Unable to load donations.")
        }

        setData(result)
        setPage(result.currentPage)
      } catch (cause) {
        if (controller.signal.aborted) return
        setError(
          cause instanceof Error ? cause.message : "Unable to load donations."
        )
        setData(null)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadItems()
    return () => controller.abort()
  }, [page, query, tagsParam])

  const items =
    data?.items.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      expiryDate: item.expiryDate ? new Date(item.expiryDate) : null,
    })) ?? []

  return (
    <>
      <div className="flex flex-col gap-1 border-b border-[#e4e9dc] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#72884c]">
            The giving shelf
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#17352b]">
            Available donations
          </h2>
        </div>
        <p className="text-sm text-[#829087]" aria-live="polite">
          <span className="font-semibold text-[#385642]">
            {data?.totalCount ?? 0}
          </span>{" "}
          {(data?.totalCount ?? 0) === 1 ? "item" : "items"} found
          {activeTags.length > 0 && ` · filtered by ${activeTags.join(", ")}`}
        </p>
      </div>

      {error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      ) : loading && !data ? (
        <p className="py-10 text-center text-sm text-[#748379]">
          Loading donations…
        </p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#d7dfd1] bg-white px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-[#eff4e4] text-[#72884c]">
            <LayoutGrid size={25} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">
            {query || activeTags.length > 0
              ? "No donations match those filters"
              : "The giving shelf is quiet for now"}
          </h2>
          <p className="mt-2 text-sm text-[#748379]">
            {query || activeTags.length > 0
              ? "Try a different search or remove a filter to see more donations."
              : "Check back soon. New donations from the community will appear here."}
          </p>
        </div>
      ) : (
        <>
          <div
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            aria-busy={loading}
          >
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                compact
                action={<ClaimButton itemId={item.id} />}
              />
            ))}
          </div>
          {data && data.totalPages > 0 && (
            <nav
              aria-label="Donation pages"
              className="flex items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => setPage((current) => current - 1)}
                disabled={page <= 1 || loading}
                className="rounded-full border border-[#cbd6be] px-4 py-2 text-sm font-semibold text-[#234a39] transition hover:bg-[#eff4e4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-[#748379]" aria-live="polite">
                Page {data.currentPage} of {data.totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                disabled={page >= data.totalPages || loading}
                className="rounded-full border border-[#cbd6be] px-4 py-2 text-sm font-semibold text-[#234a39] transition hover:bg-[#eff4e4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </>
  )
}
