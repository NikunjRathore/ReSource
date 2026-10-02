import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Check,
  HeartHandshake,
  Leaf,
  PackageCheck,
  Salad,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ReSource | Put Surplus Food & Medicine to Good Use",
  description:
    "ReSource helps food and medicine donors connect with verified NGOs to coordinate safe, timely surplus redistribution and support the communities that need it.",
  keywords: [
    "surplus food donation",
    "food redistribution platform",
    "medicine donation",
    "NGO donations",
    "surplus redistribution",
    "reduce food waste",
  ],
  openGraph: {
    title: "ReSource | Put Surplus Food & Medicine to Good Use",
    description:
      "A clearer way for donors and verified NGOs to coordinate surplus food and essential medicine redistribution.",
    type: "website",
    siteName: "ReSource",
  },
};

const steps = [
  {
    number: "01",
    title: "Share what you can",
    description:
      "Donors list surplus food or essential medicines, with the details recipients need to make an informed claim.",
    icon: PackageCheck,
  },
  {
    number: "02",
    title: "Connect with an NGO",
    description:
      "Verified NGO recipients can find available donations and coordinate a timely handoff with the donor.",
    icon: HeartHandshake,
  },
  {
    number: "03",
    title: "Complete the handoff",
    description:
      "Keep each claim and pickup organized in one place, from the first listing through completion.",
    icon: Truck,
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf6] text-[#17352b]">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-full bg-white px-5 py-3 font-semibold text-[#17352b] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" aria-label="ReSource home" className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#d9f26b] text-[#17352b]">
            <Leaf size={21} strokeWidth={2.3} aria-hidden="true" />
          </span>
          <span className="text-xl font-bold tracking-[-0.06em]">re<span className="text-[#789345]">source</span></span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium text-[#567065] md:flex">
          <a className="transition hover:text-[#17352b]" href="#how-it-works">How it works</a>
          <a className="transition hover:text-[#17352b]" href="#who-its-for">Who it&apos;s for</a>
          <Link className="transition hover:text-[#17352b]" href="/login">Sign in</Link>
        </nav>

        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-[#17352b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#285441] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17352b]"
        >
          Get started <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <section
        id="main-content"
        aria-labelledby="hero-title"
        className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.03fr_0.97fr] lg:px-10 lg:pb-28 lg:pt-16"
      >
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce6d2] bg-white/80 px-4 py-2 text-sm font-medium text-[#456448] shadow-sm shadow-[#17352b]/5">
            <Sparkles size={15} className="text-[#8aaa3c]" aria-hidden="true" />
            Less waste. More good, passed on.
          </div>
          <h1 id="hero-title" className="text-[clamp(3.35rem,7vw,6.25rem)] leading-[0.98] font-semibold tracking-[-0.075em] text-[#17352b]">
            Good things
            <br />
            shouldn&apos;t go
            <br />
            <span className="relative inline-block text-[#698c3b]">
              to waste.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 270 14" fill="none" aria-hidden="true">
                <path d="M4 9.5C75 2 190 1 264 7" stroke="#D9F26B" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#60746a] sm:text-xl sm:leading-9">
            ReSource brings surplus food and essential medicines closer to the
            people who need them—connecting donors with verified NGOs for a
            more thoughtful handoff.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup?role=DONOR"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#17352b] px-7 text-base font-semibold text-white shadow-lg shadow-[#17352b]/10 transition hover:-translate-y-0.5 hover:bg-[#285441] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17352b]"
            >
              I have a donation <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/signup?role=NGO_RECIPIENT"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#d7dfd1] bg-white px-7 text-base font-semibold text-[#234a39] transition hover:-translate-y-0.5 hover:border-[#9ab184] hover:bg-[#f6f8ef] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17352b]"
            >
              I&apos;m an NGO <ArrowDownRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-5 text-sm text-[#74857b]">
            A simple place to turn surplus into support.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-147.5 lg:ml-auto">
          <div className="absolute -right-8 -top-10 size-48 rounded-full bg-[#e7efc9] blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-12 -left-8 size-48 rounded-full bg-[#f4e4c5] blur-3xl" aria-hidden="true" />
          <div className="relative rounded-4xl border border-white/80 bg-[#eff2e7] p-3 shadow-[0_30px_90px_-35px_rgba(23,53,43,0.28)] sm:p-5">
            <div className="overflow-hidden rounded-3xl bg-white">
              <div className="flex items-center justify-between border-b border-[#edf0e9] px-5 py-4 sm:px-7">
                <div>
                  <p className="text-sm font-semibold text-[#244334]">A better way to pass it on</p>
                  <p className="mt-1 text-xs text-[#89968d]">A glimpse of the ReSource flow</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-[#f1f6e6] text-[#719046]">
                  <HeartHandshake size={20} aria-hidden="true" />
                </span>
              </div>

              <div className="space-y-3 p-4 sm:p-6">
                <div className="rounded-2xl border border-[#e9eee4] p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f4f5e8] text-[#788a45]">
                        <Salad size={21} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-[#294536]">Surplus food</p>
                        <p className="mt-1 text-sm text-[#85938a]">Share useful details with NGOs</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#f3f6e9] px-3 py-1 text-xs font-semibold text-[#66823d]">Food</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-[#eff1eb] pt-3 text-xs font-medium text-[#829087]">
                    <Check size={14} className="text-[#789345]" aria-hidden="true" />
                    Clear details help people coordinate
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e9eee4] p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f8eee2] text-[#a97943]">
                        <ShieldCheck size={21} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-[#294536]">Essential medicines</p>
                        <p className="mt-1 text-sm text-[#85938a]">Keep important information in view</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#faf2e8] px-3 py-1 text-xs font-semibold text-[#a27442]">Medicine</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-[#eff1eb] pt-3 text-xs font-medium text-[#829087]">
                    <Check size={14} className="text-[#789345]" aria-hidden="true" />
                    Coordinate claims and handoffs in one place
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-[#17352b] px-4 py-4 text-white sm:px-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-[#d9f26b]">
                    <BadgeCheck size={20} aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-6 text-white/85">
                    <span className="font-semibold text-white">One thoughtful connection at a time.</span>
                    {" "}Designed for donors and verified NGO recipients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="ReSource mission" className="border-y border-[#e9ecdf] bg-[#f4f5ed]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#647866]">
            <span className="grid size-9 place-items-center rounded-full bg-[#e5edcf] text-[#63813d]">
              <Leaf size={17} aria-hidden="true" />
            </span>
            A more connected way to give
          </p>
          <p className="max-w-xl text-sm leading-6 text-[#718076] sm:text-right">
            Make surplus easier to share, easier to find, and easier to hand off.
          </p>
        </div>
      </section>

      <section id="how-it-works" aria-labelledby="steps-title" className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#72884c]">How ReSource works</p>
          <h2 id="steps-title" className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-[#17352b] sm:text-5xl">
            From extra to essential.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#718076]">
            A clear, considered flow helps donors and NGOs coordinate each step.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <li key={number} className="rounded-[1.75rem] border border-[#e7eadf] bg-white p-7 shadow-sm shadow-[#17352b]/3 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-[0.14em] text-[#8da16b]">{number}</span>
                <span className="grid size-11 place-items-center rounded-2xl bg-[#f0f4e5] text-[#688545]">
                  <Icon size={21} aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em] text-[#234334]">{title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#748379]">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="who-its-for" aria-labelledby="audience-title" className="bg-[#17352b]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d0e798]">Built for giving and receiving</p>
            <h2 id="audience-title" className="mt-4 max-w-lg text-4xl font-semibold leading-tight tracking-[-0.055em] text-white sm:text-5xl">
              Good work is better when we work together.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
              ReSource brings both sides of redistribution into one shared space, so it&apos;s easier to make a useful connection.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 sm:p-7">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#d9f26b] text-[#17352b]">
                <PackageCheck size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">For donors</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                List surplus food or essential medicines and manage claims through a straightforward workflow.
              </p>
              <Link href="/signup?role=DONOR" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d9f26b] hover:text-white">
                Give as a donor <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 sm:p-7">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#f4e7d3] text-[#73522f]">
                <HeartHandshake size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">For NGO recipients</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Find donations shared for redistribution and coordinate collection with the donor.
              </p>
              <Link href="/signup?role=NGO_RECIPIENT" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d9f26b] hover:text-white">
                Join as an NGO <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="closing-title" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#72884c]">Make the next connection count</p>
          <h2 id="closing-title" className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-[#17352b] sm:text-5xl">
            There&apos;s a better place for surplus.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#718076]">
            Join the people making it easier to share useful resources with the communities around them.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#17352b] px-7 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#285441] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17352b]"
          >
            Get started with ReSource <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#e6e9df] bg-[#f4f5ed]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[-0.04em] text-[#294536]">
            <Leaf size={17} className="text-[#789345]" aria-hidden="true" />
            resource
          </Link>
          <p className="text-sm text-[#829087]">A little less waste. A lot more possibility.</p>
          <Link href="/login" className="text-sm font-medium text-[#567065] transition hover:text-[#17352b]">
            Sign in
          </Link>
        </div>
      </footer>
    </main>
  );
}
