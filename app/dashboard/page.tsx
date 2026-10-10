import { redirect } from "next/navigation"
import { Role } from "@/generated/prisma/enums"
import { getCurrentUser } from "@/lib/session"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  if (user.role === Role.DONOR_INDIVIDUAL) redirect("/donor")
  if (user.role === Role.NGO_RECIPIENT) redirect("/ngo")

  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f8f7f1] p-6">
      <section className="w-full max-w-md space-y-4 rounded-3xl border border-[#e4e9dc] bg-white p-8 text-center">
        <h1 className="text-2xl font-semibold text-[#17352b]">Welcome, {user.name}</h1>
      </section>
    </main>
  )
}