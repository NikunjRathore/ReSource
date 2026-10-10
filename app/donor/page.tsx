import Link from "next/link"
import { PlusCircle, Package } from "lucide-react"
import { Role } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { db } from "@/lib/db"
import { ACTIVE_STATUSES, formatDate } from "@/lib/item-utils"
import { ItemCard } from "@/components/shared/item-card"
import { ItemStatusActions } from "@/components/donor/item-status-actions"
import { Badge } from "@/components/ui/badge"

export default async function DonorItemsPage() {
  const user = await requireRole(Role.DONOR_INDIVIDUAL)

  const items = await db.item.findMany({
    where: {
      donorId: user.id,
      status: { in: ACTIVE_STATUSES },
    },
    include: {
      tags: { include: { tag: true } },
      claim: { include: { ngo: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  const stats = {
    available: items.filter((i) => i.status === "AVAILABLE").length,
    claimed: items.filter((i) => i.status === "CLAIMED").length,
    inTransit: items.filter((i) => i.status === "IN_TRANSIT").length,
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#72884c]">
            Your donations
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[#17352b]">
            Track your items
          </h1>
          <p className="mt-2 text-sm text-[#748379]">
            Monitor status and coordinate handoffs with NGOs.
          </p>
        </div>
        <Link
          href="/donor/add"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#17352b] px-6 text-sm font-semibold text-white transition hover:bg-[#285441]"
        >
          <PlusCircle size={16} />
          Add item
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Available", value: stats.available, color: "bg-emerald-100 text-emerald-800" },
          { label: "Claimed", value: stats.claimed, color: "bg-amber-100 text-amber-800" },
          { label: "In transit", value: stats.inTransit, color: "bg-blue-100 text-blue-800" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#e4e9dc] bg-white p-5"
          >
            <p className="text-sm text-[#829087]">{label}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-[#17352b]">
              {value}
            </p>
            <Badge className={`mt-2 ${color}`}>{label}</Badge>
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7dfd1] bg-white py-20 text-center">
          <Package size={40} className="text-[#b8d45a]" />
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">No active items yet</h2>
          <p className="mt-2 max-w-sm text-sm text-[#748379]">
            List your first donation and help it reach someone who needs it.
          </p>
          <Link
            href="/donor/add"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#d9f26b] px-6 text-sm font-semibold text-[#17352b]"
          >
            <PlusCircle size={16} />
            Add your first item
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="space-y-3">
              <ItemCard
                item={item}
                action={
                  <div className="space-y-2">
                    {item.claim && (
                      <div className="rounded-xl bg-[#f0f2e8] px-3 py-2 text-xs">
                        <p className="font-medium text-[#385642]">
                          Claimed by {item.claim.ngo.name}
                        </p>
                        <p className="text-[#829087]">
                          Handoff code:{" "}
                          <span className="font-mono font-bold tracking-wider text-[#17352b]">
                            {item.claim.handoffCode}
                          </span>
                        </p>
                        <p className="text-[#829087]">
                          Claimed {formatDate(item.claim.claimedAt)}
                        </p>
                      </div>
                    )}
                    <ItemStatusActions itemId={item.id} status={item.status} />
                  </div>
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
