import { Role } from "@/generated/prisma/enums"
import { requireRole } from "@/lib/auth-guard"
import { DashboardShell } from "@/components/shared/dashboard-shell"

export default async function DonorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireRole(Role.DONOR_INDIVIDUAL)

  return (
    <DashboardShell role="donor" userName={user.name}>
      {children}
    </DashboardShell>
  )
}
