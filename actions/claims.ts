"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireRole } from "@/lib/auth-guard"
import { generateHandoffCode } from "@/lib/item-utils"
import { ListingStatus, Role } from "@/generated/prisma/enums"
import type { ActionState } from "@/actions/items"

export async function claimItem(itemId: string): Promise<ActionState & { handoffCode?: string }> {
  const user = await requireRole(Role.NGO_RECIPIENT)

  const item = await db.item.findUnique({
    where: { id: itemId },
    include: { claim: true },
  })

  if (!item) {
    return { message: "Item not found.", success: false }
  }
  if (item.status !== ListingStatus.AVAILABLE || item.claim) {
    return { message: "This item is no longer available.", success: false }
  }

  const handoffCode = generateHandoffCode()

  try {
    await db.$transaction([
      db.claim.create({
        data: {
          itemId,
          ngoId: user.id,
          handoffCode,
        },
      }),
      db.item.update({
        where: { id: itemId },
        data: { status: ListingStatus.CLAIMED },
      }),
    ])

    revalidatePath("/donor")
    revalidatePath("/ngo")
    return {
      message: `Item claimed! Handoff code: ${handoffCode}`,
      success: true,
      handoffCode,
    }
  } catch {
    return { message: "Unable to claim item. It may have been taken.", success: false }
  }
}

export async function updateClaimStatus(
  itemId: string,
  status: ListingStatus
): Promise<ActionState> {
  const user = await requireRole(Role.NGO_RECIPIENT)

  const claim = await db.claim.findFirst({
    where: { itemId, ngoId: user.id },
    include: { item: true },
  })

  if (!claim) {
    return { message: "Claim not found.", success: false }
  }

  const allowed: Record<ListingStatus, ListingStatus[]> = {
    [ListingStatus.AVAILABLE]: [],
    [ListingStatus.CLAIMED]: [ListingStatus.IN_TRANSIT],
    [ListingStatus.IN_TRANSIT]: [ListingStatus.COMPLETED],
    [ListingStatus.COMPLETED]: [],
    [ListingStatus.EXPIRED]: [],
  }

  if (!allowed[claim.item.status]?.includes(status)) {
    return { message: "This status change is not allowed.", success: false }
  }

  try {
    await db.$transaction(async (tx) => {
      await tx.item.update({
        where: { id: itemId },
        data: { status },
      })

      if (status === ListingStatus.COMPLETED) {
        await tx.claim.update({
          where: { id: claim.id },
          data: { completedAt: new Date() },
        })
      }
    })

    revalidatePath("/donor")
    revalidatePath("/ngo")
    return { message: `Status updated to ${status.replaceAll("_", " ").toLowerCase()}.`, success: true }
  } catch {
    return { message: "Unable to update status.", success: false }
  }
}
