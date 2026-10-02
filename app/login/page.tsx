import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f6f7ef] px-6 py-10 sm:px-10">
      <div className="absolute -left-24 -top-28 size-80 rounded-full bg-[#e7efc9] blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-24 size-96 rounded-full bg-[#f4e4c5] blur-3xl" aria-hidden="true" />
      <div className="relative w-full max-w-5xl">
        <LoginForm />
      </div>
    </main>
  )
}
