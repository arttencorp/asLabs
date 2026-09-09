"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, ChevronRight, CircleDot, Dna, FileCheck2, FlaskConical, Layers3, Microscope, Search, ShieldCheck, Sprout, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import EcuadorFooter from "@/components/ecuador-footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"

export type EcuadorServiceItem = {
  title: string
  category: string
  summary: string
  scope: string[]
}

type EcuadorServiceClientProps = {
  kind: "molecular" | "formulations"
  eyebrow: string
  title: string
  description: string
  image: string
  services: EcuadorServiceItem[]
  methods: string[]
  deliverables: string[]
}

const relatedServices = [
  { href: "/ecuador/biologia-molecular", title: "Biología molecular", text: "Diagnóstico, identificación y secuenciamiento.", icon: Dna },
  { href: "/ecuador/formulaciones-bacterianas", title: "Formulaciones bacterianas", text: "Desarrollo, estandarización y control.", icon: FlaskConical },
  { href: "/ecuador/plantines-in-vitro", title: "Plantines in vitro", text: "Material vegetal y manejo preventivo.", icon: Sprout },
  { href: "/ecuador/cepas", title: "Cepas identificadas", text: "Colección microbiológica con cotización en USD.", icon: Microscope },
]

const serviceFaqs = {
  molecular: [
    ["¿Qué información necesitan para cotizar?", "Tipo y cantidad de muestras, objetivo del análisis, organismo esperado y entregable requerido. Si aún no tienes definido el método, podemos orientar la selección."],
    ["¿Todos los análisis se realizan en Quito?", "La recepción y coordinación se gestionan desde Quito. Según el servicio y el alcance técnico, algunas etapas especializadas se realizan en nuestros laboratorios del Perú."],
    ["¿Puedo enviar muestras desde otra ciudad?", "Sí. Primero validamos la matriz, condiciones de conservación, embalaje y documentación para coordinar un envío adecuado."],
    ["¿Entregan archivos de secuencia?", "Cuando forman parte del alcance contratado, se entregan los archivos y resultados bioinformáticos correspondientes junto con el informe."],
  ],
  formulations: [
    ["¿Pueden trabajar con mi propia cepa?", "Sí, sujeto a una revisión técnica inicial de identidad, pureza, condiciones de crecimiento, bioseguridad y objetivo de aplicación."],
    ["¿Desarrollan formulaciones multicepa?", "Podemos evaluar consorcios cuando exista compatibilidad biológica y una justificación técnica para la aplicación propuesta."],
    ["¿El servicio incluye pruebas de estabilidad?", "La estabilidad puede incorporarse al alcance con condiciones, tiempos y criterios de evaluación previamente acordados."],
    ["¿Pueden apoyar el escalamiento?", "Sí. Evaluamos parámetros críticos desde laboratorio y piloto para construir una ruta de escalamiento técnicamente documentada."],
  ],
} as const

export default function EcuadorServiceClient({ kind, eyebrow, title, description, image, services, methods, deliverables }: EcuadorServiceClientProps) {
  const Icon = kind === "molecular" ? Dna : FlaskConical
  const otherServices = relatedServices.filter(item => !item.href.includes(kind === "molecular" ? "biologia-molecular" : "formulaciones-bacterianas"))
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [query, setQuery] = useState("")
  const [selectedService, setSelectedService] = useState<EcuadorServiceItem | null>(null)
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(services.map(service => service.category)))], [services])
  const visibleServices = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es")
    return services.filter(service => {
      const matchesCategory = activeCategory === "Todos" || service.category === activeCategory
      const haystack = `${service.title} ${service.summary} ${service.scope.join(" ")}`.toLocaleLowerCase("es")
      return matchesCategory && (!normalized || haystack.includes(normalized))
    })
  }, [activeCategory, query, services])

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
            <div className="grid gap-5 rounded-[27px] border border-[#d7e2db] bg-white p-5 shadow-[0_24px_70px_-32px_rgba(10,47,32,.4)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fee9cb] text-[#a85a13]">🇵🇪</span><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#b5651d]">Procesamiento especializado en Perú</p><h2 className="mt-2 text-base font-bold">Algunos análisis moleculares se realizan en nuestros laboratorios del Perú</h2><p className="mt-2 text-xs leading-6 text-[#65776e]">Según el alcance, puede incluir secuenciamiento de genoma completo, identificación mediante 16S rRNA e ITS, PCR, qPCR, RT-PCR o secuenciamiento Sanger. La recepción y coordinación del proyecto se gestiona desde Quito.</p></div><ShieldCheck className="hidden h-7 w-7 text-[#347a64] sm:block" /></div>
          </section>
        ) : (
          <section className="relative z-10 mx-auto -mt-5 max-w-6xl px-5 sm:px-8"><div className="grid gap-4 rounded-[27px] border border-[#d7e2db] bg-white p-5 shadow-[0_24px_70px_-32px_rgba(10,47,32,.4)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e7f4ed] text-[#347a64]"><FlaskConical className="h-5 w-5" /></span><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#347a64]">Desarrollo técnico</p><h2 className="mt-2 text-base font-bold">Cada formulación parte del microorganismo, la aplicación y el resultado esperado</h2><p className="mt-2 text-xs leading-6 text-[#65776e]">Definimos viabilidad, concentración, pureza, estabilidad y escala de trabajo antes de establecer el alcance.</p></div></div></section>
        )}

        <section id="servicios" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#32836c]">Lista de servicios</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">{kind === "molecular" ? "Análisis moleculares disponibles" : "Servicios para desarrollar y controlar formulaciones"}</h2></div><p className="text-sm leading-7 text-[#667870]">El servicio final se configura después de revisar el objetivo, la muestra o microorganismo, el número de unidades y el uso previsto del resultado.</p></div>
          <div className="mt-10 rounded-[27px] border border-[#d9e4dc] bg-white p-3 shadow-[0_18px_55px_rgba(15,55,45,.07)] sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative min-w-0 flex-1"><span className="sr-only">Buscar un servicio</span><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#70847a]" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar análisis, técnica o resultado" className="h-12 w-full rounded-2xl border border-[#dce6df] bg-[#f7f9f6] pl-11 pr-4 text-xs outline-none transition focus:border-[#6ba58e] focus:bg-white" /></label>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">{categories.map(category => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`h-11 shrink-0 rounded-xl px-4 text-[10px] font-bold transition ${activeCategory === category ? "bg-[#173f32] text-white shadow-md" : "bg-[#edf3ef] text-[#48655a] hover:bg-[#dfeae3]"}`}>{category}</button>)}</div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between"><p className="text-xs font-semibold text-[#697b72]">{visibleServices.length} servicios disponibles</p><p className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-[#87968f] sm:block">Selecciona una ficha para ver el alcance</p></div>
          <motion.div layout className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleServices.map((service, index) => <motion.button type="button" key={service.title} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 8) * .045 }} onClick={() => setSelectedService(service)} className="group flex min-h-[255px] flex-col rounded-[25px] border border-black/[.07] bg-white p-5 text-left shadow-[0_12px_38px_rgba(15,55,45,.05)] transition duration-300 hover:-translate-y-1.5 hover:border-[#abcbbd] hover:shadow-[0_20px_48px_rgba(15,55,45,.1)]"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f5f0] text-[#2d7d66] transition group-hover:bg-[#173f32] group-hover:text-white"><CircleDot className="h-4 w-4" /></span><span className="text-2xl font-semibold text-[#143229]/10">{String(index + 1).padStart(2, "0")}</span></div><span className="mt-6 w-fit rounded-full bg-[#f0f4f1] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[.14em] text-[#557166]">{service.category}</span><h3 className="mt-3 text-base font-bold leading-6">{service.title}</h3><p className="mt-3 line-clamp-3 text-xs leading-6 text-[#697b72]">{service.summary}</p><span className="mt-auto flex items-center gap-2 pt-6 text-[10px] font-bold uppercase tracking-[.12em] text-[#2f7b65]">Ver alcance<ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></motion.button>)}</motion.div>
          {!visibleServices.length && <div className="mt-5 rounded-[26px] border border-dashed border-[#cbdad1] bg-white py-14 text-center"><Search className="mx-auto h-7 w-7 text-[#879a90]" /><h3 className="mt-4 text-base font-bold">No encontramos coincidencias</h3><button type="button" onClick={() => { setQuery(""); setActiveCategory("Todos") }} className="mt-4 text-xs font-bold text-[#327a64]">Limpiar búsqueda</button></div>}
        </section>

        <section className="bg-white py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2"><div className="rounded-[30px] border border-black/[.07] bg-[#f2f7f4] p-6 sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#2d7d66] shadow-sm"><Microscope className="h-5 w-5" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#37866f]">Métodos y controles</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Cómo construimos el análisis</h2><p className="mt-4 text-xs leading-6 text-[#697b72]">Cada etapa se selecciona según el objetivo técnico; no aplicamos una ruta idéntica a todas las muestras.</p><div className="mt-7 space-y-3">{methods.map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-black/[.06] bg-white px-4 py-3 text-sm font-semibold"><BadgeCheck className="h-4 w-4 shrink-0 text-[#33836d]" />{item}</div>)}</div></div><div className="rounded-[30px] border border-black/[.07] bg-[#102f28] p-6 text-white sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[#f0d475]"><FileCheck2 className="h-5 w-5" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#91dfc4]">Entregables</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Información lista para revisar</h2><p className="mt-4 text-xs leading-6 text-white/52">La documentación depende del alcance contratado y se organiza para mantener la trazabilidad del proyecto.</p><div className="mt-7 space-y-3">{deliverables.map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-sm font-semibold text-white/80"><BadgeCheck className="h-4 w-4 shrink-0 text-[#8ce3c6]" />{item}</div>)}</div></div></div></section>

        <section className="border-y border-[#dce5df] bg-[#eef4f0] py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#37856e]">Antes de solicitar</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Preguntas frecuentes</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#677970]">Resolvemos las dudas más comunes antes de revisar una muestra o iniciar un desarrollo.</p></div><div className="space-y-3">{serviceFaqs[kind].map(([question, answer], index) => <motion.details key={question} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="group rounded-[22px] border border-[#d8e3dc] bg-white p-5 open:border-[#9fc6b5] open:bg-[#f8fbf8] sm:p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold leading-6"><span>{question}</span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#edf4ef] text-[#356e5a] transition group-open:rotate-90 group-open:bg-[#173f32] group-open:text-white"><ChevronRight className="h-4 w-4" /></span></summary><p className="max-w-2xl pt-4 text-xs leading-6 text-[#65776e]">{answer}</p></motion.details>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"><div className="mb-8 flex items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#37856e]">Servicios relacionados</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Construye una solución más completa</h2></div><Layers3 className="hidden h-7 w-7 text-[#38816a] sm:block" /></div><div className="grid gap-4 sm:grid-cols-2">{otherServices.map(item => <Link key={item.href} href={item.href} className="group flex items-center gap-5 rounded-[26px] border border-[#d5e2da] bg-white p-6 shadow-[0_15px_55px_rgba(15,55,45,.06)] transition hover:-translate-y-1"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e9f4ee] text-[#337a64]"><item.icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><strong className="block text-base">{item.title}</strong><span className="mt-1 block text-xs leading-5 text-[#687a72]">{item.text}</span></span><ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>)}</div></section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-28"><div data-navbar-theme="dark" className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[36px] bg-[#0a2a21] p-7 text-white sm:p-12 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f0c66c]">Evaluación previa</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Empecemos por tu objetivo, no por una lista genérica</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Envíanos el tipo de muestra o microorganismo, cantidad aproximada y qué necesitas determinar.</p></div><WhatsAppContact mode="modal" message={`Hola, quisiera evaluar un servicio de ${eyebrow.toLowerCase()}.`} className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#f0a23a] px-7 text-sm font-bold text-[#173428] transition hover:-translate-y-1 hover:bg-[#ffc56f]">Solicitar evaluación<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></WhatsAppContact></div></section>
      </main>
      <AnimatePresence>{selectedService && <motion.div className="fixed inset-0 z-[10020] flex items-end justify-center bg-[#061d15]/70 p-3 backdrop-blur-md sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) setSelectedService(null) }}><motion.section role="dialog" aria-modal="true" aria-label={`Detalle de ${selectedService.title}`} initial={{ opacity: 0, y: 40, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .98 }} transition={{ duration: .28, ease: [.16, 1, .3, 1] }} className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[30px] bg-[#f7f9f6] shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dbe5de] bg-white/95 p-5 backdrop-blur-xl sm:px-7"><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#42806b]">{selectedService.category}</p><p className="mt-1 text-xs text-[#6e7f77]">Servicio sujeto a evaluación técnica</p></div><button type="button" onClick={() => setSelectedService(null)} aria-label="Cerrar detalle" className="grid h-10 w-10 place-items-center rounded-full bg-[#edf2ee] transition hover:bg-[#dfe8e2]"><X className="h-4 w-4" /></button></div><div className="p-6 sm:p-8"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#173f32] text-[#9be1c7]"><Icon className="h-5 w-5" /></span><h2 className="mt-6 text-balance text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{selectedService.title}</h2><p className="mt-5 text-sm leading-7 text-[#62746b]">{selectedService.summary}</p><div className="mt-7 rounded-[24px] border border-[#d8e4dc] bg-white p-5"><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#4b7d6b]">Alcance a evaluar</p><div className="mt-4 space-y-3">{selectedService.scope.map(item => <div key={item} className="flex items-start gap-3 text-xs font-semibold leading-5 text-[#385448]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#35826b]" />{item}</div>)}</div></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><WhatsAppContact mode="modal" message={`Hola, quisiera evaluar el servicio: ${selectedService.title}.`} className="group inline-flex min-h-13 flex-1 items-center justify-center gap-3 rounded-full bg-[#173f32] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#245a48]">Consultar este servicio<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></WhatsAppContact><button type="button" onClick={() => setSelectedService(null)} className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#d2dfd7] bg-white px-6 text-sm font-bold text-[#385548] transition hover:bg-[#edf3ef]">Seguir explorando</button></div></div></motion.section></motion.div>}</AnimatePresence>
      <EcuadorFooter />
    </div>
  )
}
