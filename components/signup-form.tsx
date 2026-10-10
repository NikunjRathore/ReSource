"use client"

import { useActionState } from "react"
import Link from "next/link"
import { signup } from "@/actions/auth"
import { Role } from "@/generated/prisma/enums"
import { cn } from "cn"
import { ArrowRight, HeartHandshake, Leaf, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  defaultRole,
  ...props
}: React.ComponentProps<"div"> & { defaultRole?: Role }) {
  const [state, formAction, pending] = useActionState(signup, {
    message: "",
    success: false,
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="mb-1 flex items-center justify-between px-1"><Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[-0.04em] text-[#294536]"><Leaf size={18} className="text-[#789345]" aria-hidden="true" />resource</Link><span className="hidden text-xs font-medium uppercase tracking-[0.16em] text-[#829087] sm:block">Join the circle</span></div>
      <Card className="overflow-hidden rounded-4xl border border-[#e4e9dc] bg-white p-0 shadow-[0_30px_90px_-35px_rgba(23,53,43,0.28)]">
        <div className="grid md:grid-cols-[0.82fr_1fr]"><div className="relative hidden overflow-hidden bg-[#17352b] p-10 text-white md:flex md:flex-col md:justify-between"><div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-[#d9f26b]/15 blur-2xl" aria-hidden="true" /><div className="relative"><span className="grid size-12 place-items-center rounded-2xl bg-[#f4e7d3] text-[#73522f]"><HeartHandshake size={23} aria-hidden="true" /></span><p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#d0e798]">Make the next connection count</p><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tighter">There&apos;s a better place for surplus.</h2><p className="mt-5 text-sm leading-7 text-white/65">Join people making it easier to share useful resources with their communities.</p></div><div className="relative flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-white/70"><ShieldCheck size={18} className="text-[#d9f26b]" aria-hidden="true" />Trusted, simple, connected</div></div><div>
        <CardHeader className="px-7 pt-7 sm:px-10 sm:pt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#72884c]">Get started</p>
          <CardTitle className="mt-2 text-3xl font-semibold tracking-[-0.055em] text-[#17352b]">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-7 pb-7 sm:px-10 sm:pb-10">
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-[#294536]" htmlFor="name">Full name</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="Your name" className="h-11 border-[#d7dfd1] bg-[#fbfcf8] px-3 focus-visible:border-[#789345] focus-visible:ring-[#d9f26b]/60" required />
              </Field>
              <Field>
                <FieldLabel className="text-[#294536]" htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 border-[#d7dfd1] bg-[#fbfcf8] px-3 focus-visible:border-[#789345] focus-visible:ring-[#d9f26b]/60"
                  required
                />
              </Field>
              <Field>
                <FieldLabel className="text-[#294536]" htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" minLength={8} className="h-11 border-[#d7dfd1] bg-[#fbfcf8] px-3 focus-visible:border-[#789345] focus-visible:ring-[#d9f26b]/60" required />
                <FieldDescription className="text-[#829087]">Use at least 8 characters.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel className="text-[#294536]" htmlFor="role">Account role</FieldLabel>
                <select
                  id="role"
                  name="role"
                  className="h-11 w-full rounded-lg border border-[#d7dfd1] bg-[#fbfcf8] px-3 text-sm text-[#234334] outline-none focus-visible:border-[#789345] focus-visible:ring-3 focus-visible:ring-[#d9f26b]/60"
                  defaultValue={defaultRole ?? ""}
                  required
                >
                  <option value="" disabled={!defaultRole}>Select a role</option>
                  <option value={Role.DONOR_INDIVIDUAL}>Donor</option>
                  <option value={Role.NGO_RECIPIENT}>NGO recipient</option>
                </select>
              </Field>
              <Field>
                <Button type="submit" disabled={pending} className="h-12 rounded-full bg-[#17352b] text-white hover:bg-[#285441]">
                  {pending ? "Creating account..." : "Create account"}
                  {!pending && <ArrowRight size={17} aria-hidden="true" />}
                </Button>
                {state.message && (
                  <p
                    aria-live="polite"
                    className={state.success ? "text-sm text-[#4f793d]" : "text-sm text-red-700"}
                    role={state.success ? "status" : "alert"}
                  >
                    {state.message}
                  </p>
                )}
                <FieldDescription className="text-center text-[#829087]">
                  Already have an account? <Link href="/login" className="font-semibold text-[#567065]">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent></div></div>
      </Card>
    </div>
  )
}
