"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, CircleDot, Dna, FileCheck2, FlaskConical, Layers3, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import EcuadorFooter from "@/components/ecuador-footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"

type EcuadorServiceClientProps = {
  kind: "molecular" | "formulations"
  eyebrow: string
  title: string
  description: string
  image: string
  services: string[]
  methods: string[]
  deliverables: string[]
}

export default function EcuadorServiceClient({ kind, eyebrow, title, description, image, services, methods, deliverables }: EcuadorServiceClientProps) {
  const Icon = kind === "molecular" ? Dna : FlaskConical
  const relatedHref = kind === "molecular" ? "/ecuador/formulaciones-bacterianas" : "/ecuador/biologia-molecular"
  const relatedTitle = kind === "molecular" ? "Formulaciones bacterianas" : "Biología molecular"

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f7f4] font-[var(--font-poppins)] text-[#143229]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#071d18] px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-32">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(114,215,181,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(114,215,181,.08)_1px,transparent_1px)] [background-size:58px_58px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[450px] lg:grid-cols-[1fr_.9fr]">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
              <Link href="/ecuador" className="inline-flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-white"><ArrowLeft className="h-4 w-4" />AS Labs Ecuador</Link>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#e5bd45]/25 bg-[#e5bd45]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#f0d475]">🇪🇨 {eyebrow}</div>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-.05em] sm:text-6xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><WhatsAppContact mode="modal" message={`Hola, quisiera información sobre ${title.toLowerCase()} en AS Labs Ecuador.`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#8ce3c6] px-7 text-sm font-bold text-[#09261f] transition hover:-translate-y-1">Evaluar mi requerimiento<ArrowRight className="h-4 w-4" /></WhatsAppContact><a href="#alcance" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-7 text-sm font-bold text-white">Ver alcance<Layers3 className="h-4 w-4" /></a></div>
            </motion.div>
            <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{delay:.12,duration:.75}} className="relative min-h-[330px] overflow-hidden rounded-[30px] border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,.3)] lg:min-h-[420px]"><Image src={image} alt={`${title} en AS Labs Ecuador`} fill priority className="object-cover" sizes="(min-width:1024px) 44vw,100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#061a15]/80 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 flex items-center justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#f0d475]">Disponible en Ecuador</p><p className="mt-1 text-sm font-semibold">Quito · Edificio Carolina Millenium</p></div><span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xl"><Icon className="h-5 w-5 text-[#9ae7cd]" /></span></div></motion.div>
          </div>
        </section>

        <section id="alcance" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#32836c]">Alcance del servicio</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Capacidades disponibles en Ecuador</h2><p className="mt-5 text-sm leading-7 text-[#667870]">La estrategia final se define después de conocer el objetivo, la muestra o microorganismo y el uso previsto del resultado.</p><div className="mt-7 flex gap-3 rounded-[22px] border border-[#d6e4dc] bg-white p-5"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#2e7c65]" /><div><p className="text-xs font-bold">Recepción en Quito</p><p className="mt-1 text-xs leading-5 text-[#687971]">Andrade Marin 24, Edificio Carolina Millenium, 170518 Quito.</p></div></div></div><div className="grid gap-4 sm:grid-cols-2">{services.map((service,index)=><motion.div key={service} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:(index%2)*.07}} className="rounded-[24px] border border-black/[.07] bg-white p-5 shadow-[0_12px_38px_rgba(15,55,45,.05)]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f5f0] text-[#2d7d66]"><CircleDot className="h-4 w-4" /></span><h3 className="mt-5 text-sm font-bold leading-6">{service}</h3></motion.div>)}</div></div>
        </section>

        <section className="bg-white py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2"><div className="rounded-[30px] border border-black/[.07] bg-[#f2f7f4] p-6 sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#2d7d66] shadow-sm"><Icon className="h-5 w-5" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#37866f]">Métodos y controles</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.035em]">Cómo lo abordamos</h2><div className="mt-7 space-y-3">{methods.map(item=><div key={item} className="flex items-center gap-3 rounded-2xl border border-black/[.06] bg-white px-4 py-3 text-sm font-semibold"><BadgeCheck className="h-4 w-4 shrink-0 text-[#33836d]" />{item}</div>)}</div></div><div className="rounded-[30px] border border-black/[.07] bg-[#102f28] p-6 text-white sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[#f0d475]"><FileCheck2 className="h-5 w-5" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#91dfc4]">Entregables</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.035em]">Qué recibe tu proyecto</h2><div className="mt-7 space-y-3">{deliverables.map(item=><div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-sm font-semibold text-white/80"><BadgeCheck className="h-4 w-4 shrink-0 text-[#8ce3c6]" />{item}</div>)}</div></div></div></section>

        <section className="px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[34px] border border-[#d5e2da] bg-white p-7 shadow-[0_20px_70px_rgba(15,55,45,.07)] sm:p-10 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#37856e]">También en Ecuador</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{relatedTitle}</h2></div><Link href={relatedHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173f32] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5">Explorar esta área<ArrowRight className="h-4 w-4" /></Link></div></section>
      </main>
      <EcuadorFooter />
    </div>
  )
}
