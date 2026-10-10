import { Route } from "lucide-react"
import { Role } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { db } from "@/lib/db"
import { ACTIVE_STATUSES, formatDate } from "@/lib/item-utils"
import { ItemCard } from "@/components/shared/item-card"
import { ClaimStatusActions } from "@/components/ngo/claim-status-actions"

export default async function NgoTrackingPage() {
  const user = await requireRole(Role.NGO_RECIPIENT)

  const claims = await db.claim.findMany({
    where: {
      ngoId: user.id,
      item: { status: { in: ACTIVE_STATUSES.filter((s) => s !== "AVAILABLE") } },
    },
    include: {
      item: {
        include: {
          tags: { include: { tag: true } },
          donor: { select: { name: true } },
        },
      },
    },
    orderBy: { claimedAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#72884c]">
          Active claims
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[#17352b]">
          Track your claims
        </h1>
        <p className="mt-2 text-sm text-[#748379]">
          Coordinate pickup and confirm when items arrive.
        </p>
      </div>

      {claims.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7dfd1] bg-white py-20 text-center">
          <Route size={40} className="text-[#b8d45a]" />
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">No active claims</h2>
          <p className="mt-2 text-sm text-[#748379]">
            Browse available items and claim what you need.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {claims.map((claim) => (
            <ItemCard
              key={claim.id}
              item={claim.item}
              action={
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#17352b] px-3 py-2 text-center text-white">
                    <p className="text-xs text-white/70">Handoff code</p>
                    <p className="text-lg font-bold tracking-widest">{claim.handoffCode}</p>
                  </div>
                  <div className="text-xs text-[#829087]">
                    <p>Donor: {claim.item.donor.name}</p>
                    <p>Claimed {formatDate(claim.claimedAt)}</p>
                  </div>
                  <ClaimStatusActions
                    itemId={claim.item.id}
                    status={claim.item.status}
                  />
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
