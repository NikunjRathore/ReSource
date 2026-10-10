import { ListingStatus } from "@/generated/prisma/enums"
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/item-utils"
import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

export function StatusBadge({
  status,
  className,
}: {
  status: ListingStatus
  className?: string
}) {
  return (
    <Badge className={cn(STATUS_COLORS[status], className)}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
