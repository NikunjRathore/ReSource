"use client"

import { useState, useTransition } from "react"
import { HandHeart } from "lucide-react"
import { claimItem } from "@/actions/claims"
import { Button } from "@/components/ui/button"

export function ClaimButton({ itemId }: { itemId: string }) {
  const [pending, startTransition] = useTransition()
  const [handoffCode, setHandoffCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleClaim() {
    setError(null)
    startTransition(async () => {
      const result = await claimItem(itemId)
      if (result.success && result.handoffCode) {
        setHandoffCode(result.handoffCode)
      } else {
        setError(result.message)
      }
    })
  }

  if (handoffCode) {
    return (
      <div className="rounded-xl bg-[#17352b] px-3 py-2 text-center text-white">
        <p className="text-xs text-white/70">Handoff code</p>
        <p className="text-lg font-bold tracking-widest">{handoffCode}</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <Button
        type="button"
        disabled={pending}
        onClick={handleClaim}
        className="h-10 w-full rounded-full bg-[#17352b] text-white hover:bg-[#285441]"
      >
        <HandHeart size={16} />
        {pending ? "Claiming…" : "Claim item"}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
