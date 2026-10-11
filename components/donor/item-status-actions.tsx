"use client"

import { useState, useTransition } from "react"
import { ArrowRight, CircleCheck, Clock3 } from "lucide-react"
import { updateItemStatus, type ActionState } from "@/actions/items"
import { ListingStatus } from "@/generated/prisma/enums"
import { Button } from "@/components/ui/button"

const NEXT_ACTIONS: Partial<Record<ListingStatus, { label: string; next: ListingStatus }>> = {
  [ListingStatus.AVAILABLE]: { label: "Mark expired", next: ListingStatus.EXPIRED },
  [ListingStatus.CLAIMED]: { label: "Mark in transit", next: ListingStatus.IN_TRANSIT },
}

export function ItemStatusActions({
  itemId,
  status,
}: {
  itemId: string
  status: ListingStatus
}) {
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<ActionState | null>(null)
  const action = NEXT_ACTIONS[status]

  if (status === ListingStatus.IN_TRANSIT) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs leading-relaxed text-blue-900">
        <Clock3 size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>On its way. The receiving NGO will confirm when it arrives.</span>
      </div>
    )
  }

  if (!action) return null
  const nextStatus = action.next

  function handleClick() {
    setResult(null)
    startTransition(async () => {
      const response = await updateItemStatus(itemId, nextStatus)
      setResult(response)
    })
  }

  return (
    <div className="space-y-2">
      {status === ListingStatus.CLAIMED && (
        <p className="text-xs leading-relaxed text-[#748379]">
          Once you have handed the item over, mark it in transit. The receiving NGO will confirm delivery.
        </p>
      )}
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={pending}
        onClick={handleClick}
        className="h-10 w-full rounded-full border-[#d7dfd1] text-xs font-semibold text-[#234a39] hover:bg-[#eff4e4]"
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
