import { ItemCategory, ListingStatus } from "@/generated/prisma/enums"

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  FOOD: "Food",
  TOY: "Toy",
  CLOTH: "Clothing",
  BOOK: "Books",
  FURNITURE: "Furniture",
}

export const STATUS_LABELS: Record<ListingStatus, string> = {
  AVAILABLE: "Available",
  CLAIMED: "Claimed",
  IN_TRANSIT: "In Transit",
  COMPLETED: "Completed",
  EXPIRED: "Expired",
}

export const STATUS_COLORS: Record<ListingStatus, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  CLAIMED: "bg-amber-100 text-amber-800 border-amber-200",
  IN_TRANSIT: "bg-blue-100 text-blue-800 border-blue-200",
  COMPLETED: "bg-[#d9f26b]/40 text-[#17352b] border-[#b8d45a]",
  EXPIRED: "bg-gray-100 text-gray-600 border-gray-200",
}

export const ACTIVE_STATUSES: ListingStatus[] = [
  ListingStatus.AVAILABLE,
  ListingStatus.CLAIMED,
  ListingStatus.IN_TRANSIT,
]

export const PAST_STATUSES: ListingStatus[] = [
  ListingStatus.COMPLETED,
  ListingStatus.EXPIRED,
]

export function parseTags(raw: string): string[] {
  return [
    ...new Set(
      raw
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0 && t.length <= 30)
    ),
  ]
}

export function generateHandoffCode() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "—"
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}
