"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, CircleDot, Dna, FileCheck2, FlaskConical, Layers3, Microscope, ShieldCheck, Sprout } from "lucide-react"
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

const relatedServices = [
  { href: "/ecuador/biologia-molecular", title: "Biología molecular", text: "Diagnóstico, identificación y secuenciamiento.", icon: Dna },
  { href: "/ecuador/formulaciones-bacterianas", title: "Formulaciones bacterianas", text: "Desarrollo, estandarización y control.", icon: FlaskConical },
  { href: "/ecuador/plantines-in-vitro", title: "Plantines in vitro", text: "Material vegetal y manejo preventivo.", icon: Sprout },
]

export default function EcuadorServiceClient({ kind, eyebrow, title, description, image, services, methods, deliverables }: EcuadorServiceClientProps) {
  const Icon = kind === "molecular" ? Dna : FlaskConical
  const otherServices = relatedServices.filter(item => !item.href.includes(kind === "molecular" ? "biologia-molecular" : "formulaciones-bacterianas"))

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f6f2] font-[var(--font-poppins)] text-[#143229]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative min-h-[640px] overflow-hidden bg-[#082b20] text-white sm:min-h-[680px]">
          <Image src={image} alt={`${eyebrow} en AS Labs`} fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,31,22,.98)_0%,rgba(4,31,22,.90)_44%,rgba(4,31,22,.28)_76%,rgba(4,31,22,.12)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082a20]/75 via-transparent to-transparent" />
          <div className="home-grain absolute inset-0 opacity-20" />
          <div className="relative mx-auto flex min-h-[640px] max-w-[1480px] items-center px-5 pb-24 pt-28 sm:min-h-[680px] sm:px-8 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, ease: [.16, 1, .3, 1] }} className="max-w-[780px]">
              <Link href="/ecuador" className="inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-white"><ArrowLeft className="h-4 w-4" />Volver al inicio</Link>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#e9bb54]/35 bg-black/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#ffd57d] backdrop-blur-sm"><Icon className="h-4 w-4" />{eyebrow}</div>
              <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.35rem,4.8vw,4.35rem)] font-medium leading-[1.01] tracking-[-.05em]">{title}</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">{description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#servicios" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f0a23a] px-7 text-sm font-bold text-[#173428] transition hover:bg-[#ffc56f]">Ver servicios<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a><WhatsAppContact mode="modal" message={`Hola, quisiera información sobre ${eyebrow.toLowerCase()}.`} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-black/10 px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#173428]">Evaluar mi requerimiento</WhatsAppContact></div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold text-white/65">{["Evaluación técnica previa", "Alcance personalizado", "Trazabilidad del servicio"].map(item => <span key={item} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#9ae0b0]" />{item}</span>)}</div>
            </motion.div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[66px] bg-[#f4f6f2] [clip-path:polygon(0_100%,100%_0,100%_100%,0_100%)]" />
        </section>

        {kind === "molecular" ? (
          <section className="relative z-10 mx-auto -mt-5 max-w-6xl px-5 sm:px-8">
            <div className="grid gap-5 rounded-[27px] border border-[#d7e2db] bg-white p-5 shadow-[0_24px_70px_-32px_rgba(10,47,32,.4)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fee9cb] text-[#a85a13]">🇵🇪</span><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#b5651d]">Procesamiento especializado en Perú</p><h2 className="mt-2 text-base font-bold">Los análisis moleculares se realizan en nuestros laboratorios del Perú</h2><p className="mt-2 text-xs leading-6 text-[#65776e]">Incluye secuenciamiento de genoma completo, identificación mediante 16S rRNA e ITS, PCR, qPCR, RT-PCR y secuenciamiento Sanger. La recepción y coordinación del proyecto se gestiona desde Quito.</p></div><ShieldCheck className="hidden h-7 w-7 text-[#347a64] sm:block" /></div>
          </section>
        ) : (
          <section className="relative z-10 mx-auto -mt-5 max-w-6xl px-5 sm:px-8"><div className="grid gap-4 rounded-[27px] border border-[#d7e2db] bg-white p-5 shadow-[0_24px_70px_-32px_rgba(10,47,32,.4)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e7f4ed] text-[#347a64]"><FlaskConical className="h-5 w-5" /></span><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#347a64]">Desarrollo técnico</p><h2 className="mt-2 text-base font-bold">Cada formulación parte del microorganismo, la aplicación y el resultado esperado</h2><p className="mt-2 text-xs leading-6 text-[#65776e]">Definimos viabilidad, concentración, pureza, estabilidad y escala de trabajo antes de establecer el alcance.</p></div></div></section>
        )}

        <section id="servicios" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#32836c]">Lista de servicios</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">{kind === "molecular" ? "Análisis moleculares disponibles" : "Servicios para desarrollar y controlar formulaciones"}</h2></div><p className="text-sm leading-7 text-[#667870]">El servicio final se configura después de revisar el objetivo, la muestra o microorganismo, el número de unidades y el uso previsto del resultado.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map((service, index) => <motion.article key={service} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 4) * .06 }} className="group flex min-h-[190px] flex-col rounded-[25px] border border-black/[.07] bg-white p-5 shadow-[0_12px_38px_rgba(15,55,45,.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(15,55,45,.1)]"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f5f0] text-[#2d7d66] transition group-hover:bg-[#173f32] group-hover:text-white"><CircleDot className="h-4 w-4" /></span><span className="text-2xl font-semibold text-[#143229]/10">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-auto pt-8 text-sm font-bold leading-6">{service}</h3></motion.article>)}</div>
        </section>

        <section className="bg-white py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2"><div className="rounded-[30px] border border-black/[.07] bg-[#f2f7f4] p-6 sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#2d7d66] shadow-sm"><Microscope className="h-5 w-5" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#37866f]">Métodos y controles</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Cómo construimos el análisis</h2><p className="mt-4 text-xs leading-6 text-[#697b72]">Cada etapa se selecciona según el objetivo técnico; no aplicamos una ruta idéntica a todas las muestras.</p><div className="mt-7 space-y-3">{methods.map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-black/[.06] bg-white px-4 py-3 text-sm font-semibold"><BadgeCheck className="h-4 w-4 shrink-0 text-[#33836d]" />{item}</div>)}</div></div><div className="rounded-[30px] border border-black/[.07] bg-[#102f28] p-6 text-white sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[#f0d475]"><FileCheck2 className="h-5 w-5" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#91dfc4]">Entregables</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Información lista para revisar</h2><p className="mt-4 text-xs leading-6 text-white/52">La documentación depende del alcance contratado y se organiza para mantener la trazabilidad del proyecto.</p><div className="mt-7 space-y-3">{deliverables.map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-sm font-semibold text-white/80"><BadgeCheck className="h-4 w-4 shrink-0 text-[#8ce3c6]" />{item}</div>)}</div></div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><div className="mb-8 flex items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#37856e]">Servicios relacionados</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Construye una solución más completa</h2></div><Layers3 className="hidden h-7 w-7 text-[#38816a] sm:block" /></div><div className="grid gap-4 sm:grid-cols-2">{otherServices.map(item => <Link key={item.href} href={item.href} className="group flex items-center gap-5 rounded-[26px] border border-[#d5e2da] bg-white p-6 shadow-[0_15px_55px_rgba(15,55,45,.06)] transition hover:-translate-y-1"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e9f4ee] text-[#337a64]"><item.icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><strong className="block text-base">{item.title}</strong><span className="mt-1 block text-xs leading-5 text-[#687a72]">{item.text}</span></span><ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>)}</div></section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-28"><div data-navbar-theme="dark" className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[36px] bg-[#0a2a21] p-7 text-white sm:p-12 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f0c66c]">Evaluación previa</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Empecemos por tu objetivo, no por una lista genérica</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Envíanos el tipo de muestra o microorganismo, cantidad aproximada y qué necesitas determinar.</p></div><WhatsAppContact mode="modal" message={`Hola, quisiera evaluar un servicio de ${eyebrow.toLowerCase()}.`} className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#f0a23a] px-7 text-sm font-bold text-[#173428] transition hover:-translate-y-1 hover:bg-[#ffc56f]">Solicitar evaluación<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></WhatsAppContact></div></section>
      </main>
      <EcuadorFooter />
    </div>
  )
}
