"use client"

import { useState, useTransition } from "react"
import { ArrowRight, CircleCheck, Clock3 } from "lucide-react"
import { updateClaimStatus } from "@/actions/claims"
import type { ActionState } from "@/actions/items"
import { ListingStatus } from "@/generated/prisma/enums"
import { Button } from "@/components/ui/button"

const NEXT_ACTIONS: Partial<Record<ListingStatus, { label: string; next: ListingStatus }>> = {
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
  const [result, setResult] = useState<ActionState | null>(null)
  const action = NEXT_ACTIONS[status]

  if (status === ListingStatus.CLAIMED) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
        <Clock3 size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>Waiting for the donor to hand over the item and mark it in transit.</span>
      </div>
    )
  }

  if (!action) return null
  const nextStatus = action.next

  function handleClick() {
    setResult(null)
    startTransition(async () => {
      const response = await updateClaimStatus(itemId, nextStatus)
      setResult(response)
    })
  }

  return (
    <div className="space-y-2">
      <p className="text-xs leading-relaxed text-[#748379]">
        Confirm only after the donation has arrived at your organization.
      </p>
      <Button
        type="button"
        size="sm"
        disabled={pending}
        onClick={handleClick}
        className="h-10 w-full rounded-full bg-[#17352b] text-white hover:bg-[#285441]"
      >
        {pending ? "Updating…" : action.label}
        {!pending && <ArrowRight size={15} aria-hidden="true" />}
      </Button>
      {result && (
        <p
          role={result.success ? "status" : "alert"}
          className={`flex items-center gap-1.5 text-xs ${result.success ? "text-emerald-700" : "text-red-700"}`}
        >
          {result.success && <CircleCheck size={14} aria-hidden="true" />}
          {result.message}
        </p>
      )}
    </div>
  )
}
