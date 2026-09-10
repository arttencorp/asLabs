"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, Biohazard, ChevronRight, Dna, FlaskConical, Leaf, Microscope, ShieldCheck, Sprout } from "lucide-react"
import { Navbar } from "@/components/navbar"
import EcuadorFooter from "@/components/ecuador-footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"

const varieties = [
  { code: "ASC5", name: "Cavendish Valery", image: "/plantines/pagina18.webp", type: "Banano in vitro" },
  { code: "ASWG", name: "Cavendish Williams", image: "/plantines/pagina19.webp", type: "Banano in vitro" },
  { code: "ASBBG", name: "Banano Baby", image: "/plantines/bananoBabyBBG.jpeg", type: "Banano in vitro" },
  { code: "ASDG", name: "Dominico Hartón", image: "/plantines/pagina23.webp", type: "Plátano in vitro" },
]

const preventiveFlow = [
  { icon: Dna, title: "Origen trazable", text: "Identificación del material y control de lotes desde la etapa in vitro." },
  { icon: Microscope, title: "Evaluación sanitaria", text: "Definición de controles según variedad, destino y riesgo del proyecto." },
  { icon: ShieldCheck, title: "Bioseguridad", text: "Recomendaciones para recepción, aclimatación, traslado e instalación en campo." },
  { icon: FlaskConical, title: "Manejo integrado", text: "Articulación con diagnóstico molecular y soluciones biológicas cuando corresponda." },
]

const plantinServices = [
  "Micropropagación clonal de banano y plátano",
  "Producción de lotes por programación",
  "Identificación y trazabilidad por código",
  "Verificación de identidad genética según alcance",
  "Evaluación fitosanitaria del material",
  "Diagnóstico molecular de patógenos agrícolas",
  "Plan preventivo frente a Fusarium",
  "Coordinación de aclimatación y entrega",
  "Orientación para recepción y bioseguridad",
  "Acompañamiento técnico posterior a la entrega",
]

const plantinFaqs = [
  ["¿Qué información necesitan para evaluar un pedido?", "Variedad, volumen aproximado, ubicación del proyecto, fecha prevista de instalación y etapa de entrega requerida."],
  ["¿Los plantines eliminan por sí solos el riesgo de Fusarium?", "No. El material in vitro mejora control de origen y uniformidad, pero debe integrarse con diagnóstico, bioseguridad, manejo de suelo, agua, herramientas y monitoreo."],
  ["¿Puedo programar lotes por etapas?", "Sí. La programación puede organizarse por volúmenes y fechas, sujeta a disponibilidad, capacidad productiva y cronograma técnico."],
  ["¿Cómo se coordina la entrega?", "Antes de confirmar se revisan destino, volumen, estado del material, transporte, recepción y necesidades de aclimatación."],
]

export default function PlantinesEcuadorClient() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f6f1] font-[var(--font-poppins)] text-[#16352a]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative min-h-[650px] overflow-hidden bg-[#0a3022] text-white sm:min-h-[690px]">
          <Image src="/new/HEADER.webp" alt="Sala de cultivo de plantines in vitro de AS Labs Perú" fill priority className="object-cover object-[62%_center]" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,37,25,.98)_0%,rgba(5,37,25,.90)_44%,rgba(5,37,25,.20)_78%,rgba(5,37,25,.08)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08261b]/75 via-transparent to-transparent" />
          <div className="relative mx-auto flex min-h-[650px] max-w-[1480px] items-center px-5 pb-24 pt-28 sm:min-h-[690px] sm:px-8 lg:px-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72 }} className="max-w-[760px]">
              <Link href="/ecuador" className="inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-white"><ArrowLeft className="h-4 w-4" />Volver al inicio</Link>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#efad4e]/35 bg-[#efad4e]/12 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#ffd28c]"><Sprout className="h-4 w-4" />Biotecnología vegetal</div>
              <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,4.7vw,4.25rem)] font-medium leading-[1.01] tracking-[-.048em]">Plantines in vitro para empezar con mayor control</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">Material vegetal uniforme y trazable para proyectos de banano y plátano que integran prevención, bioseguridad y manejo frente a Fusarium.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#servicios" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f0a23a] px-7 text-sm font-bold text-[#173428] transition hover:bg-[#ffc56f]">Ver servicios<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a><WhatsAppContact mode="modal" message="Hola, quisiera consultar disponibilidad de plantines in vitro para Ecuador." className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-black/10 px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#173428]">Consultar disponibilidad</WhatsAppContact></div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold text-white/65">{["Producción controlada", "Identificación por código", "Orientación técnica"].map(item => <span key={item} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#9ae0b0]" />{item}</span>)}</div>
            </motion.div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[66px] bg-[#f4f6f1] [clip-path:polygon(0_100%,100%_0,100%_100%,0_100%)]" />
        </section>

        <section className="relative z-10 mx-auto -mt-5 max-w-6xl px-5 sm:px-8">
          <div className="grid gap-4 rounded-[26px] border border-[#d9e4dc] bg-white p-5 shadow-[0_24px_70px_-32px_rgba(10,47,32,.35)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1dd] text-[#a75a13]"><Biohazard className="h-5 w-5" /></span><div><h2 className="text-sm font-bold">Un componente de una estrategia integral</h2><p className="mt-2 text-xs leading-6 text-[#64766d]">El cultivo in vitro ayuda a controlar el origen y la uniformidad del material. La prevención frente a Fusarium también requiere diagnóstico, bioseguridad, manejo de suelo, agua, herramientas y monitoreo continuo.</p></div></div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-5 pb-6 pt-20 sm:px-8 sm:pt-28">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b5651d]">Lista de servicios</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Servicios para planificar el material desde el origen</h2></div><p className="text-sm leading-7 text-[#65766f]">El volumen, variedad, etapa de entrega y cronograma se definen antes de iniciar la programación del lote.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{plantinServices.map((service, index) => <motion.div key={service} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 3) * .07 }}><WhatsAppContact mode="modal" ariaLabel={`Consultar ${service}`} message={`Hola, quisiera información sobre el servicio de plantines: ${service}.`} className="group flex min-h-[190px] w-full flex-col rounded-[24px] border border-[#dce6df] bg-white p-5 text-left shadow-[0_12px_38px_rgba(15,55,45,.05)] transition hover:-translate-y-1.5 hover:border-[#accdbf] hover:shadow-[0_20px_48px_rgba(15,55,45,.1)]"><div className="flex w-full items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf5ef] text-[#387e66] transition group-hover:bg-[#173f32] group-hover:text-white"><Sprout className="h-4 w-4" /></span><span className="text-2xl font-semibold text-[#16352a]/10">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-auto pt-7 text-sm font-bold leading-6">{service}</h3><span className="mt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.13em] text-[#33705c]">Consultar servicio<ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></WhatsAppContact></motion.div>)}</div>
        </section>

        <section id="variedades" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b5651d]">Selección inicial</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Material disponible para evaluar en Ecuador</h2></div><p className="text-sm leading-7 text-[#65766f]">La disponibilidad, etapa de entrega, volumen mínimo y programación se confirman para cada proyecto. Todas las solicitudes pasan por una revisión técnica previa.</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{varieties.map((item, index) => <motion.article key={item.code} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="group overflow-hidden rounded-[28px] border border-black/[.07] bg-white shadow-[0_16px_50px_rgba(15,55,45,.07)] transition duration-500 hover:-translate-y-2"><div className="relative h-[280px] overflow-hidden"><Image src={item.image} alt={`${item.type} ${item.name}`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width:1024px) 24vw,(min-width:640px) 48vw,100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b2b22]/80 via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-[.15em] text-white backdrop-blur-xl">{item.code}</span><div className="absolute bottom-4 left-4 right-4 text-white"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#ffc56f]">{item.type}</p><h3 className="mt-2 text-xl font-bold">{item.name}</h3></div></div><WhatsAppContact mode="modal" ariaLabel={`Consultar disponibilidad de ${item.name}`} message={`Hola, quisiera evaluar disponibilidad del plantín ${item.name} (${item.code}) para Ecuador.`} className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[#edf5ef]"><span className="text-xs font-bold text-[#33705c]">Evaluar disponibilidad</span><ArrowRight className="h-4 w-4 text-[#33705c] transition group-hover:translate-x-1" /></WhatsAppContact></motion.article>)}</div>
        </section>

        <section className="relative overflow-hidden bg-[#0b2e23] py-20 text-white sm:py-28">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(139,225,173,.3)_1px,transparent_0)] [background-size:26px_26px]" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f0b466]">Enfoque preventivo</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">El control comienza antes de la siembra</h2><p className="mt-5 text-sm leading-7 text-white/60">Integramos el material vegetal con decisiones técnicas que ayudan a reducir riesgos desde el inicio.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{preventiveFlow.map((item, index) => <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-[24px] border border-white/10 bg-white/[.055] p-6 backdrop-blur-sm"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#164435] text-[#9ae0b0]"><item.icon className="h-5 w-5" /></span><h3 className="mt-6 text-base font-bold">{item.title}</h3><p className="mt-3 text-xs leading-6 text-white/52">{item.text}</p></motion.div>)}</div></div>
        </section>

        <section className="bg-white py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center"><div className="relative min-h-[440px] overflow-hidden rounded-[34px]"><Image src="/new/SobreASLaboratorios.webp" alt="Plantines producidos en las instalaciones de AS Labs Perú" fill className="object-cover" sizes="(min-width:1024px) 48vw,100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a2d23]/65 to-transparent" /></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b5651d]">Producción AS Labs</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Del laboratorio a un establecimiento mejor planificado</h2><p className="mt-6 text-sm leading-7 text-[#62746b]">Coordinamos variedad, volumen, estado del material, destino y fecha prevista de instalación. Así podemos orientar mejor la aclimatación, el transporte y la recepción.</p><div className="mt-7 space-y-3">{["Material identificado por código", "Programación según disponibilidad", "Orientación para recepción y aclimatación", "Integración con diagnóstico molecular"].map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#dce6df] bg-[#f6f8f5] px-4 py-3 text-xs font-semibold"><Leaf className="h-4 w-4 text-[#38816a]" />{item}</div>)}</div></div></div></section>

        <section className="border-y border-[#dce5df] bg-[#eef4f0] py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b5651d]">Antes de programar</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Preguntas frecuentes</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#667870]">Información esencial para planificar el material, la recepción y el establecimiento.</p></div><div className="space-y-3">{plantinFaqs.map(([question, answer], index) => <motion.details key={question} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="group rounded-[22px] border border-[#d8e3dc] bg-white p-5 open:border-[#a9c8b8] open:bg-[#f9fbf9] sm:p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold leading-6"><span>{question}</span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#edf4ef] text-[#356e5a] transition group-open:rotate-90 group-open:bg-[#173f32] group-open:text-white"><ChevronRight className="h-4 w-4" /></span></summary><p className="max-w-2xl pt-4 text-xs leading-6 text-[#65776e]">{answer}</p></motion.details>)}</div></div></section>

        <section className="px-5 py-20 sm:px-8 sm:py-24"><div data-navbar-theme="dark" className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[38px] bg-[#0a2b21] p-7 text-white shadow-[0_30px_90px_rgba(9,40,31,.2)] sm:p-12 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f0b466]">Proyecto en Ecuador</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-.045em] sm:text-5xl">Cuéntanos qué variedad y volumen necesitas</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Revisaremos disponibilidad, cronograma y condiciones técnicas antes de confirmar la propuesta.</p></div><WhatsAppContact mode="modal" message="Hola, quisiera evaluar un pedido de plantines in vitro para Ecuador." className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#f0a23a] px-7 text-sm font-bold text-[#173428] transition hover:-translate-y-1 hover:bg-[#ffc56f]">Solicitar evaluación<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></WhatsAppContact></div></section>
      </main>
      <EcuadorFooter />
    </div>
  )
}
