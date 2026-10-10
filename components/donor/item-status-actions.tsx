"use client"

import { useTransition } from "react"
import { updateItemStatus } from "@/actions/items"
import { ListingStatus } from "@/generated/prisma/enums"
import { Button } from "@/components/ui/button"

const NEXT_ACTIONS: Partial<Record<ListingStatus, { label: string; next: ListingStatus }>> = {
  [ListingStatus.AVAILABLE]: { label: "Mark expired", next: ListingStatus.EXPIRED },
  [ListingStatus.CLAIMED]: { label: "Mark in transit", next: ListingStatus.IN_TRANSIT },
  [ListingStatus.IN_TRANSIT]: { label: "Mark completed", next: ListingStatus.COMPLETED },
}

export function ItemStatusActions({
  itemId,
  status,
}: {
  itemId: string
  status: ListingStatus
}) {
  const [pending, startTransition] = useTransition()
  const action = NEXT_ACTIONS[status]

  if (!action) return null

  function handleClick() {
    startTransition(async () => {
      await updateItemStatus(itemId, action!.next)
    })
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={handleClick}
      className="rounded-full border-[#d7dfd1] text-xs"
    >
      {pending ? "Updating…" : action.label}
    </Button>
  )
}
