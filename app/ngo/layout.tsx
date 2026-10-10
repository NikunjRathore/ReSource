import { Role } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { DashboardShell } from "@/components/shared/dashboard-shell"

export default async function NgoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireRole(Role.NGO_RECIPIENT)

  return (
    <DashboardShell role="ngo" userName={user.name}>
      {children}
    </DashboardShell>
  )
}
