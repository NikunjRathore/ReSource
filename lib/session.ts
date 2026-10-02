import { createHash, randomBytes } from "node:crypto"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

const cookieName = "resource_session"
const sessionLifetimeSeconds = 60 * 60 * 24 * 7

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex")
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url")
  const expiresAt = new Date(Date.now() + sessionLifetimeSeconds * 1000)

  await db.session.deleteMany({ where: { expiresAt: { lte: new Date() } } })
  await db.session.create({
    data: { tokenHash: hashToken(token), userId, expiresAt },
  })

  const cookieStore = await cookies()
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieName)?.value
  if (!token) return null

  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    select: {
      id: true,
      expiresAt: true,
      user: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  })

  if (!session || session.expiresAt <= new Date()) {
    if (session) await db.session.delete({ where: { id: session.id } })
    cookieStore.delete(cookieName)
    return null
  }

  return session.user
}

export async function destroySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieName)?.value

  if (token) {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } })
  }
  cookieStore.delete(cookieName)
}