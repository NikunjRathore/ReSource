import Image from "next/image"
import { ItemCategory, ListingStatus } from "@/generated/prisma/enums"
import { CATEGORY_LABELS, formatDate } from "@/lib/item-utils"
import { StatusBadge } from "@/components/shared/status-badge"
import { ItemPlaceholder } from "@/components/shared/item-placeholder"
import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

export type ItemCardData = {
  id: string
  title: string
  description: string | null
  imageUrl: string | null
  category: ItemCategory
  quantity: number
  unit: string
  status: ListingStatus
  expiryDate: Date | null
  createdAt: Date
  tags: { tag: { name: string } }[]
  donor?: { name: string }
}

export function ItemCard({
  item,
  action,
  compact = false,
}: {
  item: ItemCardData
  action?: React.ReactNode
  compact?: boolean
}) {
  const tagNames = item.tags.map((t) => t.tag.name)

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-[#e4e9dc] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#17352b]/5",
        compact ? "h-full" : ""
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f2e8]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition group-hover:scale-105"
            unoptimized={item.imageUrl.startsWith("data:")}
          />
        ) : (
          <ItemPlaceholder category={item.category} />
        )}
        <div className="absolute left-2 top-2">
          <StatusBadge status={item.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[#789345]">
          {CATEGORY_LABELS[item.category]}
        </p>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold tracking-[-0.02em] text-[#17352b]">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#748379]">
            {item.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-1">
          {tagNames.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              className="border-[#e4e9dc] bg-[#f0f2e8] text-[#567065]"
            >
              {tag}
            </Badge>
          ))}
          {tagNames.length > 4 && (
            <Badge className="border-[#e4e9dc] bg-[#f0f2e8] text-[#829087]">
              +{tagNames.length - 4}
            </Badge>
          )}
        </div>

        <div className="mt-auto space-y-2 pt-4">
          <div className="flex items-center justify-between text-xs text-[#829087]">
            <span>
              {item.quantity} {item.unit}
            </span>
            {item.expiryDate && (
              <span>Exp: {formatDate(item.expiryDate)}</span>
            )}
          </div>
          {item.donor && (
            <p className="text-xs text-[#829087]">By {item.donor.name}</p>
          )}
          {action}
        </div>
      </div>
    </article>
  )
}

export function ItemCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[#e4e9dc] bg-white">
      <div className="aspect-[4/3] bg-[#e4e9dc]" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-16 rounded bg-[#e4e9dc]" />
        <div className="h-5 w-3/4 rounded bg-[#e4e9dc]" />
        <div className="h-4 w-full rounded bg-[#e4e9dc]" />
      </div>
    </div>
  )
}
