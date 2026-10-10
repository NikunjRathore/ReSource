"use client"

import { useTransition } from "react"
import { updateClaimStatus } from "@/actions/claims"
import { ListingStatus } from "@/generated/prisma/enums"
import { Button } from "@/components/ui/button"

const NEXT_ACTIONS: Partial<Record<ListingStatus, { label: string; next: ListingStatus }>> = {
  [ListingStatus.CLAIMED]: { label: "Mark in transit", next: ListingStatus.IN_TRANSIT },
  [ListingStatus.IN_TRANSIT]: { label: "Confirm received", next: ListingStatus.COMPLETED },
}

export function ClaimStatusActions({
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
      await updateClaimStatus(itemId, action!.next)
    })
  }

  return (
    <Button
      type="button"
      size="sm"
      disabled={pending}
      onClick={handleClick}
      className="rounded-full bg-[#17352b] text-white hover:bg-[#285441]"
    >
      {pending ? "Updating…" : action.label}
    </Button>
  )
}
