import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Package,
  PlusCircle,
  Sparkles,
  Truck,
} from "lucide-react"
import { Role } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { db } from "@/lib/db"
import { ACTIVE_STATUSES, formatDate } from "@/lib/item-utils"
import { ItemCard } from "@/components/shared/item-card"
import { ItemStatusActions } from "@/components/donor/item-status-actions"

export default async function DonorItemsPage() {
  const user = await requireRole(Role.DONOR_INDIVIDUAL)

  const items = await db.item.findMany({
    where: {
      donorId: user.id,
      status: { in: ACTIVE_STATUSES },
    },
    include: {
      claim: { include: { ngo: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  const stats = {
    available: items.filter((i) => i.status === "AVAILABLE").length,
    claimed: items.filter((i) => i.status === "CLAIMED").length,
    inTransit: items.filter((i) => i.status === "IN_TRANSIT").length,
  }

  const statCards = [
    {
      label: "Available",
      value: stats.available,
      detail: "Ready to find a new home",
      icon: Package,
      iconStyle: "bg-emerald-100 text-emerald-800",
    },
    {
      label: "Claimed",
      value: stats.claimed,
      detail: "Waiting for your handoff",
      icon: HeartHandshake,
      iconStyle: "bg-amber-100 text-amber-800",
    },
    {
      label: "In transit",
      value: stats.inTransit,
      detail: "Waiting for NGO confirmation",
      icon: Truck,
      iconStyle: "bg-blue-100 text-blue-800",
    },
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#17352b] px-6 py-7 text-white shadow-xl shadow-[#17352b]/10 sm:px-9 sm:py-9">
        <div className="absolute -right-12 -top-24 size-64 rounded-full border-[38px] border-white/[0.06]" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d9f26b]">
              <Sparkles size={15} aria-hidden="true" />
              Your giving journey
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Good things are moving.
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/70 sm:text-base">
              Follow every donation from the moment you list it to the moment it reaches an NGO.
            </p>
          </div>
          <Link
            href="/donor/add"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#d9f26b] px-6 text-sm font-bold text-[#17352b] transition hover:-translate-y-0.5 hover:bg-[#e5fb91]"
          >
            <PlusCircle size={17} aria-hidden="true" />
            Share an item
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-label="Donation summary" className="grid gap-4 sm:grid-cols-3">
        {statCards.map(({ label, value, detail, icon: Icon, iconStyle }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#e4e9dc] bg-white p-5 shadow-sm shadow-[#17352b]/[0.03]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#748379]">{label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-[#17352b]">{value}</p>
              </div>
              <span className={`grid size-11 place-items-center rounded-2xl ${iconStyle}`}>
                <Icon size={20} aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 border-t border-[#edf0e9] pt-3 text-xs text-[#829087]">{detail}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-col gap-2 border-b border-[#e4e9dc] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#72884c]">In progress</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#17352b]">Your active donations</h2>
        </div>
        <p className="text-sm text-[#829087]">
          {items.length} active {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#d7dfd1] bg-white px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-[#eff4e4] text-[#72884c]">
            <Package size={26} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">Your next good thing starts here</h2>
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
            <div key={item.id} className="group space-y-3">
              <ItemCard
                item={item}
                action={
                  <div className="space-y-2">
                    {item.claim && (
                      <div className="rounded-xl border border-[#e4e9dc] bg-[#f8f9f4] px-3 py-3 text-xs">
                        <p className="flex items-center gap-1.5 font-semibold text-[#385642]">
                          <CheckCircle2 size={14} aria-hidden="true" />
                          Claimed by {item.claim.ngo.name}
                        </p>
                        <p className="mt-2 text-[#829087]">
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
