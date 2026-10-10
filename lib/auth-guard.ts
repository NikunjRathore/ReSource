import { redirect } from "next/navigation"
import { Role } from "@/generated/prisma/enums"
import { getCurrentUser } from "@/lib/session"

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return user
}

export async function requireRole(...roles: Role[]) {
  const user = await requireUser()
  if (!roles.includes(user.role as Role)) {
    if (user.role === Role.DONOR_INDIVIDUAL) redirect("/donor")
    if (user.role === Role.NGO_RECIPIENT) redirect("/ngo")
    redirect("/dashboard")
  }
  return user
}
