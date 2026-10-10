"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Clock,
  History,
  LayoutGrid,
  Leaf,
  LogOut,
  Package,
  PlusCircle,
  Route,
} from "lucide-react"
import { logout } from "@/actions/auth"
import { cn } from "cn"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

type DashboardShellProps = {
  role: "donor" | "ngo"
  userName: string
  children: React.ReactNode
}

const DONOR_NAV: NavItem[] = [
  { href: "/donor", label: "My Items", icon: Package },
  { href: "/donor/add", label: "Add Item", icon: PlusCircle },
  { href: "/donor/history", label: "Past Donations", icon: History },
]

const NGO_NAV: NavItem[] = [
  { href: "/ngo", label: "Browse Items", icon: LayoutGrid },
  { href: "/ngo/tracking", label: "Track Claims", icon: Route },
  { href: "/ngo/history", label: "Past Donations", icon: Clock },
]

export function DashboardShell({ role, userName, children }: DashboardShellProps) {
  const pathname = usePathname()
  const nav = role === "donor" ? DONOR_NAV : NGO_NAV
  const title = role === "donor" ? "Donor Dashboard" : "NGO Dashboard"

  return (
    <div className="min-h-svh bg-[#f8f7f1] text-[#17352b]">
      <div className="mx-auto flex w-full max-w-7xl">
        <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-[#e4e9dc] bg-white px-4 py-6 lg:flex">
          <Link href="/" className="mb-8 flex items-center gap-2.5 px-2">
            <span className="grid size-9 place-items-center rounded-xl bg-[#d9f26b] text-[#17352b]">
              <Leaf size={18} strokeWidth={2.4} />
            </span>
            <span className="text-lg font-bold tracking-[-0.06em]">
              re<span className="text-[#789345]">source</span>
            </span>
          </Link>

          <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#829087]">
            {title}
          </p>
          <p className="mb-6 px-2 text-sm text-[#61746a]">{userName}</p>

          <nav className="flex flex-1 flex-col gap-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-[#17352b] text-white shadow-sm"
                      : "text-[#567065] hover:bg-[#eff4e4] hover:text-[#17352b]"
                  )}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              )
            })}
          </nav>

          <form action={logout} className="mt-auto pt-4">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#829087] transition hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </form>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e4e9dc] bg-[#f8f7f1]/90 px-4 py-4 backdrop-blur-sm lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[-0.04em]">
              <Leaf size={16} className="text-[#789345]" />
              resource
            </Link>
            <form action={logout}>
              <button type="submit" className="text-sm text-[#829087]">Sign out</button>
            </form>
          </header>

          <nav className="flex gap-1 overflow-x-auto border-b border-[#e4e9dc] bg-white px-4 py-2 lg:hidden">
            {nav.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition",
                    active
                      ? "bg-[#17352b] text-white"
                      : "bg-[#f0f2e8] text-[#567065]"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
