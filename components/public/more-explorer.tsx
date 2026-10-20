"use client"

import Link from "next/link"
import { ArrowUpRight, BriefcaseBusiness, ClipboardCheck, FlaskConical, Presentation, Scale, ShieldCheck } from "lucide-react"

const destinations = [
  { href: "/research", label: "Investigación", icon: FlaskConical },
  { href: "/control-biologico", label: "Control biológico", icon: ShieldCheck },
  { href: "/seguimiento", label: "Seguimiento", icon: ClipboardCheck },
  { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros", icon: BriefcaseBusiness },
  { href: "/legal", label: "Legal", icon: Scale },
  { href: "/pitch-deck", label: "Pitch Deck", icon: Presentation },
]

type Detail = { label: string; text: string }

export function MoreExplorer({ current, title, description, details, action }: {
  current: string
  title: string
  description: string
  details: Detail[]
  action?: { href: string; label: string }
}) {
  return (
    <section data-navbar-theme="light" className="border-y border-[#cbd7cf] bg-[#eef2ee] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#c4d1c8] pb-4 [scrollbar-width:none]" aria-label="Explorar otras áreas">
          <span className="mr-2 shrink-0 text-[11px] font-semibold text-[#62766c]">Explorar</span>
          {destinations.map(({ href, label, icon: Icon }) => {
            const active = current === href
            return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`inline-flex h-9 shrink-0 items-center gap-2 border px-3 text-[11px] font-semibold transition-colors ${active ? "border-[#184c38] bg-[#184c38] text-white" : "border-[#c7d3cb] bg-white/60 text-[#496458] hover:border-[#7e9d8b] hover:bg-white hover:text-[#184c38]"}`}><Icon className="h-3.5 w-3.5" />{label}</Link>
          })}
        </div>
        <div className="grid gap-8 pt-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div><h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-.035em] text-[#15392b] md:text-3xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6f65]">{description}</p></div>
          <div className="grid border-y border-[#bfcfc5] sm:grid-cols-3 sm:divide-x sm:divide-[#c7d3cb] lg:justify-self-end">
            {details.map((detail) => <div key={detail.label} className="border-b border-[#c7d3cb] py-4 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0 lg:max-w-[220px]"><p className="text-[10px] font-semibold text-[#3d6a54]">{detail.label}</p><p className="mt-2 text-xs leading-5 text-[#60736a]">{detail.text}</p></div>)}
          </div>
        </div>
        {action && <div className="mt-7 flex justify-end"><Link href={action.href} className="group inline-flex items-center gap-3 text-xs font-semibold text-[#174c38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#174c38]">{action.label}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>}
      </div>
    </section>
  )
}
