import { Clock } from "lucide-react"
import { Role, ListingStatus } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { db } from "@/lib/db"
import { formatDate } from "@/lib/item-utils"
import { ItemCard } from "@/components/shared/item-card"

export default async function NgoHistoryPage() {
  const user = await requireRole(Role.NGO_RECIPIENT)

  const claims = await db.claim.findMany({
    where: {
      ngoId: user.id,
      item: { status: { in: [ListingStatus.COMPLETED, ListingStatus.EXPIRED] } },
    },
    include: {
      item: {
        include: {
          donor: { select: { name: true } },
        },
      },
    },
    orderBy: { completedAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#72884c]">
          History
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[#17352b]">
          Past donations received
        </h1>
        <p className="mt-2 text-sm text-[#748379]">
          A record of completed and expired claims.
        </p>
      </div>

      {claims.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7dfd1] bg-white py-20 text-center">
          <Clock size={40} className="text-[#b8d45a]" />
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">No history yet</h2>
          <p className="mt-2 text-sm text-[#748379]">
            Completed donations will show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {claims.map((claim) => (
            <ItemCard
              key={claim.id}
              item={claim.item}
              action={
                <div className="rounded-xl bg-[#f0f2e8] px-3 py-2 text-xs text-[#567065]">
                  <p>From {claim.item.donor.name}</p>
                  {claim.completedAt ? (
                    <p>Completed {formatDate(claim.completedAt)}</p>
                  ) : (
                    <p>Expired</p>
                  )}
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
