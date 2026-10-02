"use server"

import { randomBytes, scrypt, timingSafeEqual } from "node:crypto"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { createSession, destroySession } from "@/lib/session"
import { Role } from "@/generated/prisma/enums"

export type AuthActionState = {
  message: string
  success: boolean
}

function getString(formData: FormData, field: string) {
  const value = formData.get(field)
  return typeof value === "string" ? value : ""
}

function derivePasswordHash(password: string, salt: string) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) reject(error)
      else resolve(derivedKey)
    })
  })
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = await derivePasswordHash(password, salt)
  return `scrypt$${salt}$${hash.toString("hex")}`
}

async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, hashHex] = storedHash.split("$")
  if (algorithm !== "scrypt" || !salt || !hashHex || !/^[a-f\d]{128}$/i.test(hashHex)) {
    return false
  }

  const expectedHash = Buffer.from(hashHex, "hex")
  const actualHash = await derivePasswordHash(password, salt)
  return timingSafeEqual(expectedHash, actualHash)
}

export async function login(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = getString(formData, "email").trim().toLowerCase()
  const password = getString(formData, "password")

  if (!email || !password) {
    return { message: "Enter your email and password.", success: false }
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    })

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return { message: "Email or password is incorrect.", success: false }
    }

    await createSession(user.id)
  } catch {
    return { message: "Unable to sign in right now. Please try again.", success: false }
  }

  redirect("/dashboard")
}

export async function signup(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const name = getString(formData, "name").trim()
  const email = getString(formData, "email").trim().toLowerCase()
  const password = getString(formData, "password")
  const role = getString(formData, "role")

  if (!name || !email || !password || !role) {
    return { message: "Complete every field to create your account.", success: false }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: "Enter a valid email address.", success: false }
  }
  if (password.length < 8) {
    return { message: "Password must be at least 8 characters long.", success: false }
  }
  if (!Object.values(Role).includes(role as Role)) {
    return { message: "Select a valid account role.", success: false }
  }
  if (role === Role.ADMIN) {
    return { message: "Admin accounts must be created by an administrator.", success: false }
  }

  try {
    const passwordHash = await hashPassword(password)
    await db.user.create({
      data: { name, email, passwordHash, role: role as Role },
    })

    return { message: "Account created. You can now sign in.", success: true }
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { message: "An account with this email already exists.", success: false }
    }

    return { message: "Unable to create your account right now. Please try again.", success: false }
  }
}

export async function logout() {
  await destroySession()
  redirect("/login")
}
