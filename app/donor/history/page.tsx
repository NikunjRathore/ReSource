import { History } from "lucide-react"
import { Role } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { db } from "@/lib/db"
import { PAST_STATUSES, formatDate } from "@/lib/item-utils"
import { ItemCard } from "@/components/shared/item-card"

export default async function DonorHistoryPage() {
  const user = await requireRole(Role.DONOR_INDIVIDUAL)

  const items = await db.item.findMany({
    where: {
      donorId: user.id,
      status: { in: PAST_STATUSES },
    },
    include: {
      claim: { include: { ngo: { select: { name: true } } } },
    },
    orderBy: { updatedAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#72884c]">
          History
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[#17352b]">
          Past donations
        </h1>
        <p className="mt-2 text-sm text-[#748379]">
          Completed and expired items from your giving journey.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7dfd1] bg-white py-20 text-center">
          <History size={40} className="text-[#b8d45a]" />
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">No past donations yet</h2>
          <p className="mt-2 text-sm text-[#748379]">
            Completed donations will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              action={
                item.claim ? (
                  <div className="rounded-xl bg-[#f0f2e8] px-3 py-2 text-xs text-[#567065]">
                    <p>
                      Received by <span className="font-medium">{item.claim.ngo.name}</span>
                    </p>
                    {item.claim.completedAt && (
                      <p>Completed {formatDate(item.claim.completedAt)}</p>
                    )}
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
