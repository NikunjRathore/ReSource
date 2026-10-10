import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Check,
  Heart,
  HeartHandshake,
  Leaf,
  MoveUpRight,
  PackageCheck,
  Sparkles,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ReSource | Small gifts. Big change.",
  description:
    "Give useful things a new purpose. ReSource connects everyday donors with verified NGOs so every thoughtful contribution can reach someone who needs it.",
  keywords: ["donate goods", "NGO donations", "community giving", "ReSource"],
  openGraph: {
    title: "ReSource | Small gifts. Big change.",
    description:
      "One useful thing from you can become a meaningful beginning for someone else.",
    type: "website",
    siteName: "ReSource",
  },
};

const steps = [
  { number: "01", title: "Share what can help", description: "Tell us about something useful that is ready for a new home.", icon: PackageCheck },
  { number: "02", title: "We find the right hands", description: "Verified NGOs discover contributions that match their community's needs.", icon: HeartHandshake },
  { number: "03", title: "Watch it move forward", description: "Coordinate a simple, trusted handoff and see your kindness continue.", icon: Truck },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f1] text-[#17352b]">
      <a href="#main-content" className="sr-only z-50 rounded-full bg-white px-5 py-3 font-semibold text-[#17352b] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" aria-label="ReSource home" className="flex items-center gap-2.5"><span className="grid size-10 place-items-center rounded-[14px] bg-[#d9f26b] text-[#17352b] shadow-sm"><Leaf size={20} strokeWidth={2.4} aria-hidden="true" /></span><span className="text-xl font-bold tracking-[-0.07em]">re<span className="text-[#789345]">source</span></span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium text-[#60746a] md:flex"><a className="transition hover:text-[#17352b]" href="#how-it-works">How it works</a><a className="transition hover:text-[#17352b]" href="#why-resource">Why ReSource</a><Link className="transition hover:text-[#17352b]" href="/login">Sign in</Link></nav>
        <div className="flex items-center gap-3"><Link href="/login" className="hidden px-3 py-2 text-sm font-medium text-[#60746a] transition hover:text-[#17352b] sm:inline-block">Sign in</Link><Link href="/signup?role=DONOR" className="inline-flex items-center gap-2 rounded-full bg-[#17352b] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#285441]">Start giving <ArrowRight size={16} aria-hidden="true" /></Link></div>
      </header>

      <section id="main-content" aria-labelledby="hero-title" className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-12 sm:pt-16 lg:grid-cols-[0.94fr_1.06fr] lg:px-10 lg:pb-28 lg:pt-20">
        <div className="relative z-10 max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dfe6d6] bg-white/80 px-4 py-2 text-sm font-medium text-[#55705b] shadow-sm"><Sparkles size={15} className="text-[#8aaa3c]" aria-hidden="true" />A better life for the things you already have</div>
          <h1 id="hero-title" className="text-[clamp(3.7rem,7.2vw,6.7rem)] font-semibold leading-[0.91] tracking-[-0.085em] text-[#17352b]">Small gifts.<br /><span className="text-[#718f45]">Big change.</span></h1>
          <p className="mt-8 max-w-lg text-lg leading-8 text-[#61746a] sm:text-xl sm:leading-9">That thing sitting quietly at home could be exactly what someone else needs to take their next step. ReSource makes the connection simple, trusted, and human.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/signup?role=DONOR" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#17352b] px-7 text-base font-semibold text-white shadow-xl shadow-[#17352b]/15 transition hover:-translate-y-0.5 hover:bg-[#285441]">Give something useful <ArrowRight size={18} aria-hidden="true" /></Link><Link href="#how-it-works" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#d7dfd1] bg-white px-7 text-base font-semibold text-[#234a39] transition hover:-translate-y-0.5 hover:border-[#9ab184]">See how it works <MoveUpRight size={17} aria-hidden="true" /></Link></div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#718279]"><span className="flex items-center gap-2"><Check size={16} className="text-[#789345]" aria-hidden="true" />Free to give</span><span className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#789345]" aria-hidden="true" />Verified NGOs</span></div>
        </div>

        <div className="relative mx-auto w-full max-w-[39rem] lg:ml-auto"><div className="absolute -right-10 top-5 size-56 rounded-full bg-[#dceba4] blur-3xl" aria-hidden="true" /><div className="absolute -bottom-10 left-4 size-48 rounded-full bg-[#efd8bd] blur-3xl" aria-hidden="true" /><div className="relative min-h-[31rem] overflow-hidden rounded-[2.6rem] bg-[#e7eddc] p-4 shadow-[0_30px_90px_-35px_rgba(23,53,43,0.3)] sm:p-6"><div className="absolute -right-12 -top-12 size-48 rounded-full border-[34px] border-[#d9f26b]/60" aria-hidden="true" /><div className="relative flex h-full min-h-[28rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#d1dfc1] p-6 sm:p-8">
          <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.19em] text-[#597255]">The ReSource idea</p><p className="mt-2 max-w-[13rem] text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#17352b]">What leaves your shelf can open a door.</p></div><span className="grid size-12 place-items-center rounded-full bg-[#f8f7f1]/75 text-[#55734f]"><Heart size={20} fill="currentColor" aria-hidden="true" /></span></div>
          <div className="relative mx-auto my-5 flex w-full max-w-[20rem] items-center justify-center py-5"><div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bdd09c]" aria-hidden="true" /><div className="relative rotate-[-6deg] rounded-[1.4rem] bg-[#d8a36d] px-8 py-10 shadow-[12px_18px_0_#b77d50]"><Box size={92} strokeWidth={1.15} className="text-[#805530]" aria-hidden="true" /><span className="absolute -right-8 -top-5 grid size-14 rotate-[13deg] place-items-center rounded-full bg-[#d9f26b] text-[#17352b] shadow-lg"><Leaf size={25} aria-hidden="true" /></span></div><span className="absolute -bottom-1 left-0 rotate-[-8deg] rounded-full bg-[#f8f7f1] px-4 py-2 text-xs font-bold text-[#557255] shadow-sm">ready to help</span></div>
          <div className="flex items-center gap-3 rounded-2xl bg-[#17352b] px-4 py-4 text-white"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#d9f26b] text-[#17352b]"><HeartHandshake size={20} aria-hidden="true" /></span><div><p className="text-sm font-semibold">One thoughtful handoff</p><p className="mt-0.5 text-xs text-white/65">A useful beginning for someone else.</p></div></div>
        </div></div></div>
      </section>

      <section aria-label="ReSource promise" className="border-y border-[#e1e6d9] bg-[#f0f2e8]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-10"><p className="max-w-xl text-base font-medium leading-7 text-[#385642]">Good things should keep moving. We help them find the people and places where they matter most.</p><div className="flex items-center gap-3 text-sm font-semibold text-[#70884d]"><span className="size-2 rounded-full bg-[#8aaa3c]" />Give with confidence</div></div></section>

      <section id="how-it-works" aria-labelledby="steps-title" className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10"><div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#72884c]">Simple by design</p><h2 id="steps-title" className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[#17352b] sm:text-5xl">From your hands to a new beginning.</h2></div><ol className="mt-14 grid gap-5 md:grid-cols-3">{steps.map(({ number, title, description, icon: Icon }) => <li key={number} className="rounded-[2rem] border border-[#e5e8df] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#17352b]/5 sm:p-8"><div className="flex items-center justify-between"><span className="text-sm font-bold tracking-[0.14em] text-[#9aaa7b]">{number}</span><span className="grid size-12 place-items-center rounded-2xl bg-[#eff4e4] text-[#688545]"><Icon size={22} aria-hidden="true" /></span></div><h3 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-[#234334]">{title}</h3><p className="mt-3 text-[15px] leading-7 text-[#748379]">{description}</p></li>)}</ol></section>

      <section id="why-resource" aria-labelledby="why-title" className="bg-[#17352b] text-white"><div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-10"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d0e798]">The promise</p><h2 id="why-title" className="mt-4 max-w-lg text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">A little generosity can travel a long way.</h2><p className="mt-5 max-w-lg text-base leading-7 text-white/65">ReSource brings donors and trusted NGOs into one thoughtful flow, so giving feels less like letting go and more like passing something forward.</p><Link href="/signup?role=DONOR" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d9f26b] hover:text-white">Make your first contribution <ArrowRight size={15} aria-hidden="true" /></Link></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-white/[0.07] p-7"><Leaf className="text-[#d9f26b]" size={25} aria-hidden="true" /><h3 className="mt-6 text-xl font-semibold">More than decluttering</h3><p className="mt-3 text-sm leading-6 text-white/60">It is a practical, hopeful way to make room for someone else to move forward.</p></div><div className="rounded-3xl border border-white/10 bg-white/[0.07] p-7"><BadgeCheck className="text-[#f1d2a7]" size={25} aria-hidden="true" /><h3 className="mt-6 text-xl font-semibold">Rooted in trust</h3><p className="mt-3 text-sm leading-6 text-white/60">Every connection is built around verified organizations and clear handoffs.</p></div></div></div></section>

      <section aria-labelledby="closing-title" className="px-6 py-24 sm:py-32"><div className="mx-auto max-w-3xl text-center"><span className="mx-auto grid size-12 place-items-center rounded-full bg-[#d9f26b] text-[#17352b]"><Heart size={21} fill="currentColor" aria-hidden="true" /></span><h2 id="closing-title" className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-[#17352b] sm:text-6xl">Someone is waiting for what you can give.</h2><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#718076]">Start with one useful thing. Let it become part of something bigger.</p><Link href="/signup?role=DONOR" className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#17352b] px-8 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#285441]">Give something useful <ArrowRight size={18} aria-hidden="true" /></Link></div></section>

      <footer className="border-t border-[#e3e7dd] bg-[#f0f2e8]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10"><Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[-0.04em] text-[#294536]"><Leaf size={17} className="text-[#789345]" aria-hidden="true" /> resource</Link><p className="text-sm text-[#829087]">A little less waste. A lot more possibility.</p><div className="flex items-center gap-6"><Link href="/login" className="text-sm font-medium text-[#567065] hover:text-[#17352b]">Sign in</Link><Link href="/signup" className="text-sm font-medium text-[#567065] hover:text-[#17352b]">Sign up</Link></div></div></footer>
    </main>
  );
}
