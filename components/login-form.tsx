"use client"

import { useActionState } from "react"
import Link from "next/link"
import { login } from "@/actions/auth"
import { cn } from "cn"
import { ArrowRight, HeartHandshake, Leaf, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, pending] = useActionState(login, {
    message: "",
    success: false,
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="mb-1 flex items-center justify-between px-1">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[-0.04em] text-[#294536]"><Leaf size={18} className="text-[#789345]" aria-hidden="true" />resource</Link>
        <span className="hidden text-xs font-medium uppercase tracking-[0.16em] text-[#829087] sm:block">A better way to pass it on</span>
      </div>
      <Card className="overflow-hidden rounded-[2rem] border border-[#e4e9dc] bg-white p-0 shadow-[0_30px_90px_-35px_rgba(23,53,43,0.28)]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={formAction} className="p-7 sm:p-10 md:p-12">
            <FieldGroup>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#72884c]">Welcome back</p>
                <h1 className="text-3xl font-semibold tracking-[-0.055em] text-[#17352b] sm:text-4xl">Continue your good work.</h1>
                <p className="max-w-sm text-sm leading-6 text-[#718076]">
                  Sign in to keep surplus moving to the people and places that need it.
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" disabled={pending} className="h-12 rounded-full bg-[#17352b] text-white hover:bg-[#285441]">
                  {pending ? "Signing in..." : "Sign in"}
                  {!pending && <ArrowRight size={17} aria-hidden="true" />}
                </Button>
              </Field>
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
                Don&apos;t have an account? <Link href="/signup" className="font-semibold text-[#567065]">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden overflow-hidden bg-[#17352b] p-10 text-white md:flex md:flex-col md:justify-between">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-[#d9f26b]/15 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#d9f26b] text-[#17352b]"><HeartHandshake size={23} aria-hidden="true" /></span>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#d0e798]">One thoughtful connection</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em]">Small actions can carry a long way.</h2>
              <p className="mt-5 text-sm leading-7 text-white/65">ReSource gives donors and verified NGOs one clear place to coordinate useful handoffs.</p>
            </div>
            <div className="relative flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-white/70"><ShieldCheck size={18} className="text-[#d9f26b]" aria-hidden="true" />Built for thoughtful giving</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
