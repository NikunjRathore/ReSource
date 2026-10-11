import Link from "next/link"
import { ArrowRight, Clock3, PackageCheck, Route, Truck } from "lucide-react"
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

  const waitingForDonor = claims.filter((claim) => claim.item.status === "CLAIMED").length
  const inTransit = claims.filter((claim) => claim.item.status === "IN_TRANSIT").length

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#17352b] px-6 py-7 text-white shadow-xl shadow-[#17352b]/10 sm:px-9 sm:py-9">
        <div className="absolute -right-10 -top-24 size-60 rounded-full border-[36px] border-white/[0.06]" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d9f26b]">
              <Route size={15} aria-hidden="true" />
              Your handoffs
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Every delivery, one step closer.
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
              Follow claimed donations and confirm receipt once each item reaches your organization.
            </p>
          </div>
          <Link
            href="/ngo"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#d9f26b] px-5 text-sm font-bold text-[#17352b] transition hover:-translate-y-0.5 hover:bg-[#e5fb91]"
          >
            Browse donations
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-label="Claim progress" className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-[#e4e9dc] bg-white p-5 shadow-sm shadow-[#17352b]/[0.03]">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-800">
            <Clock3 size={21} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-[#748379]">Waiting for donor handoff</p>
            <p className="mt-1 text-2xl font-semibold text-[#17352b]">{waitingForDonor}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-[#e4e9dc] bg-white p-5 shadow-sm shadow-[#17352b]/[0.03]">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-800">
            <Truck size={21} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-[#748379]">In transit to you</p>
            <p className="mt-1 text-2xl font-semibold text-[#17352b]">{inTransit}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-1 border-b border-[#e4e9dc] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#72884c]">Next steps</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#17352b]">Active claims</h2>
        </div>
        <p className="text-sm text-[#829087]">{claims.length} {claims.length === 1 ? "claim" : "claims"}</p>
      </div>

      {claims.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#d7dfd1] bg-white px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-[#eff4e4] text-[#72884c]">
            <PackageCheck size={25} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-semibold text-[#17352b]">No active claims yet</h2>
          <p className="mt-2 text-sm text-[#748379]">
            Find something useful for your community and follow the handoff here.
          </p>
          <Link
            href="/ngo"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#17352b] px-6 text-sm font-semibold text-white transition hover:bg-[#285441]"
          >
            Browse donations
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {claims.map((claim) => (
            <ItemCard
              key={claim.id}
              item={claim.item}
              action={
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#17352b] px-4 py-3 text-center text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">Pickup handoff code</p>
                    <p className="mt-1 text-2xl font-bold tracking-[0.28em]">{claim.handoffCode}</p>
                  </div>
                  <div className="rounded-xl border border-[#e4e9dc] bg-[#f8f9f4] px-3 py-2.5 text-xs text-[#748379]">
                    <p>Donated by <span className="font-semibold text-[#385642]">{claim.item.donor.name}</span></p>
                    <p className="mt-1">Claimed {formatDate(claim.claimedAt)}</p>
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
