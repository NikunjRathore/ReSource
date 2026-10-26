import { NextResponse, type NextRequest } from "next/server"
import { ListingStatus, Role } from "@/generated/prisma/enums"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

const pageSize = 50

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }
  if (user.role !== Role.NGO_RECIPIENT) {
    return NextResponse.json({ error: "NGO access required." }, { status: 403 })
  }

  const params = request.nextUrl.searchParams
  const rawPage = Number(params.get("page") ?? "1")
  const requestedPage =
    Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1
  const query = params.get("q")?.trim() ?? ""
  const activeTags = params.get("tags")?.split(",").filter(Boolean) ?? []
  const where = {
    status: ListingStatus.AVAILABLE,
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" as const } },
            { description: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(activeTags.length > 0
      ? {
          tags: { hasSome: activeTags },
        }
      : {}),
  }

  const totalCount = await db.item.count({ where })
  const totalPages = Math.ceil(totalCount / pageSize)
  const currentPage = Math.min(requestedPage, Math.max(totalPages, 1))
  const items = await db.item.findMany({
    where,
    include: {
      donor: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })

  return NextResponse.json({ items, totalPages, currentPage, totalCount })
}
