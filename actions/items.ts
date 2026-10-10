"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireRole } from "@/lib/auth-guard"
import { parseTags } from "@/lib/item-utils"
import { ItemCategory, ListingStatus, Role } from "@/generated/prisma/enums"

export type ActionState = {
  message: string
  success: boolean
}

function getString(formData: FormData, field: string) {
  const value = formData.get(field)
  return typeof value === "string" ? value.trim() : ""
}

async function upsertTags(tagNames: string[]) {
  const tags = await Promise.all(
    tagNames.map((name) =>
      db.tag.upsert({
        where: { name },
        create: { name },
        update: {},
      })
    )
  )
  return tags
}

export async function createItem(
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireRole(Role.DONOR_INDIVIDUAL)

  const title = getString(formData, "title")
  const description = getString(formData, "description")
  const category = getString(formData, "category")
  const quantity = Number(formData.get("quantity"))
  const unit = getString(formData, "unit")
  const expiryRaw = getString(formData, "expiryDate")
  const imageUrl = getString(formData, "imageUrl")
  const tagsRaw = getString(formData, "tags")

  if (!title || title.length < 3) {
    return { message: "Title must be at least 3 characters.", success: false }
  }
  if (!Object.values(ItemCategory).includes(category as ItemCategory)) {
    return { message: "Select a valid category.", success: false }
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { message: "Quantity must be at least 1.", success: false }
  }
  if (!unit) {
    return { message: "Unit is required (e.g. kg, pieces).", success: false }
  }

  const tagNames = parseTags(tagsRaw)
  if (tagNames.length === 0) {
    return { message: "Add at least one tag.", success: false }
  }

  let expiryDate: Date | null = null
  if (expiryRaw) {
    expiryDate = new Date(expiryRaw)
    if (Number.isNaN(expiryDate.getTime())) {
      return { message: "Invalid expiry date.", success: false }
    }
  }

  try {
    const tags = await upsertTags(tagNames)

    await db.item.create({
      data: {
        title,
        description: description || null,
        imageUrl: imageUrl || null,
        category: category as ItemCategory,
        quantity,
        unit,
        expiryDate,
        donorId: user.id,
        tags: {
          create: tags.map((tag) => ({ tagId: tag.id })),
        },
      },
    })

    revalidatePath("/donor")
    revalidatePath("/ngo")
    return { message: "Item listed successfully!", success: true }
  } catch {
    return { message: "Unable to create item. Please try again.", success: false }
  }
}

export async function updateItemStatus(
  itemId: string,
  status: ListingStatus
): Promise<ActionState> {
  const user = await requireRole(Role.DONOR_INDIVIDUAL)

  const item = await db.item.findUnique({
    where: { id: itemId },
    include: { claim: true },
  })

  if (!item || item.donorId !== user.id) {
    return { message: "Item not found.", success: false }
  }

  const allowed: Record<ListingStatus, ListingStatus[]> = {
    [ListingStatus.AVAILABLE]: [ListingStatus.EXPIRED],
    [ListingStatus.CLAIMED]: [ListingStatus.IN_TRANSIT, ListingStatus.EXPIRED],
    [ListingStatus.IN_TRANSIT]: [ListingStatus.COMPLETED],
    [ListingStatus.COMPLETED]: [],
    [ListingStatus.EXPIRED]: [],
  }

  if (!allowed[item.status]?.includes(status)) {
    return { message: "This status change is not allowed.", success: false }
  }

  try {
    await db.$transaction(async (tx) => {
      await tx.item.update({
        where: { id: itemId },
        data: { status },
      })

      if (status === ListingStatus.COMPLETED && item.claim) {
        await tx.claim.update({
          where: { id: item.claim.id },
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
