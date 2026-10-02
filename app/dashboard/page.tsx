import { redirect } from "next/navigation"
import { logout } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-6">
      <section className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm">Account role: {user.role.replaceAll("_", " ")}</p>
        </div>
        <form action={logout}>
          <Button type="submit" variant="outline">Sign out</Button>
        </form>
      </section>
    </main>
  )
}