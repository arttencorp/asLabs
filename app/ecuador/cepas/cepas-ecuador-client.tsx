"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, Check, Dna, FlaskConical, Microscope, PackageCheck, Search, ShieldCheck, ShoppingCart, Trash2, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import EcuadorFooter from "@/components/ecuador-footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { cepasIdentificadas } from "@/app/cepas/identificadas/identificadas-client"
import { cepasATCC } from "@/app/cepas/atcc/atcc-client"

const USD_RATE = 3.75

type CatalogStrain = {
  id: string
  nombre: string
  codigo: string
  cientifico: string
  bsl: string
  categoria: string
  productFormat: string
  cantidad: string
  precioUsd: number
  collection: "Identificada" | "ATCC"
  identificationMethod?: string
}

const catalog: CatalogStrain[] = [
  ...cepasIdentificadas.map((strain) => ({
    ...strain,
    precioUsd: Math.ceil(strain.precioSinEnvio / USD_RATE),
    collection: "Identificada" as const,
    identificationMethod: strain.nombre.startsWith("Trichoderma")
      ? "Secuenciación de la región ITS"
      : "Secuenciación del gen 16S rRNA",
  })),
  ...cepasATCC.map((strain) => ({ ...strain, precioUsd: Math.ceil(strain.precioSinEnvio / USD_RATE), collection: "ATCC" as const })),
]

export default function CepasEcuadorClient() {
  const [collection, setCollection] = useState<"Todas" | "Identificada" | "ATCC">("Todas")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<CatalogStrain[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return catalog.filter((strain) => {
      const matchesCollection = collection === "Todas" || strain.collection === collection
      const matchesSearch = !term || [strain.nombre, strain.codigo, strain.cientifico, strain.categoria].some((value) => value.toLowerCase().includes(term))
      return matchesCollection && matchesSearch
    })
  }, [collection, query])

  const toggleSelected = (strain: CatalogStrain) => {
    setSelected((current) => current.some((item) => item.id === strain.id) ? current.filter((item) => item.id !== strain.id) : [...current, strain])
  }

  const quoteMessage = selected.length
    ? `Hola, quisiera cotizar estas cepas para Ecuador:\n${selected.map((item) => `• ${item.nombre} — ${item.codigo} — US$ ${item.precioUsd}`).join("\n")}\nPor favor confirmar disponibilidad, documentación y logística.`
    : "Hola, quisiera recibir orientación sobre el catálogo de cepas para Ecuador."

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3f6f2] font-[var(--font-poppins)] text-[#15362b]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative min-h-[610px] overflow-hidden bg-[#082c22] text-white sm:min-h-[670px]">
          <Image src="/lab-header-bg.jpg" alt="Cultivos microbiológicos de referencia" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,31,23,.98)_0%,rgba(5,31,23,.89)_49%,rgba(5,31,23,.18)_84%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061f18]/80 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(151,226,199,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(151,226,199,.18)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative mx-auto flex min-h-[610px] max-w-7xl items-center px-5 pb-24 pt-28 sm:min-h-[670px] sm:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72 }} className="max-w-[820px]">
              <Link href="/ecuador" className="inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-white"><ArrowLeft className="h-4 w-4" />Volver al inicio</Link>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#91dfc4]/25 bg-[#91dfc4]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#9de6cc]"><Dna className="h-4 w-4" />Catálogo microbiológico</div>
              <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.55rem,5vw,4.75rem)] font-medium leading-[1.01] tracking-[-.052em]">Cepas para investigación y control de calidad</h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">Colecciones identificadas por AS Labs y referencias ATCC con documentación, acompañamiento técnico y cotización en dólares.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#catalogo" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#e5c55e] px-7 text-sm font-bold text-[#173428] transition hover:-translate-y-1 hover:bg-[#f2dc8c]">Explorar catálogo<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a><WhatsAppContact mode="modal" message="Hola, quisiera orientación para seleccionar una cepa en Ecuador." className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/28 bg-black/10 px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#173428]">Pedir orientación</WhatsAppContact></div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold text-white/66">{["6 cepas identificadas", "24 referencias ATCC", "Precios en USD"].map(item => <span key={item} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#91dfc4]" />{item}</span>)}</div>
            </motion.div>
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[66px] bg-[#f3f6f2] [clip-path:polygon(0_100%,100%_0,100%_100%,0_100%)]" />
        </section>

        <section className="relative z-10 mx-auto -mt-4 max-w-6xl px-5 sm:px-8"><div className="grid gap-4 rounded-[26px] border border-[#d7e3dc] bg-white p-5 shadow-[0_24px_70px_-32px_rgba(10,47,32,.38)] sm:grid-cols-3 sm:p-7">{[{ icon: Microscope, title: "Identificadas", text: "Colección AS Labs caracterizada" }, { icon: ShieldCheck, title: "ATCC", text: "Material de referencia internacional" }, { icon: PackageCheck, title: "Entrega coordinada", text: "Logística y documentación cotizadas" }].map(item => <div key={item.title} className="flex items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eaf4ef] text-[#327963]"><item.icon className="h-5 w-5" /></span><div><h2 className="text-sm font-bold">{item.title}</h2><p className="mt-1 text-[10px] leading-4 text-[#708079]">{item.text}</p></div></div>)}</div></section>

        <section id="catalogo" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#33836d]">Catálogo completo</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Encuentra la cepa adecuada</h2></div><p className="text-sm leading-7 text-[#65766f]">Los valores se muestran como referencia en USD. La propuesta final confirma disponibilidad, cantidad, documentación y logística internacional.</p></div>

          <div className="sticky top-[84px] z-20 mt-10 rounded-[26px] border border-[#d8e4dc] bg-white/92 p-3 shadow-[0_20px_55px_rgba(15,55,45,.1)] backdrop-blur-xl sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e8278]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, código o aplicación" className="h-12 w-full rounded-2xl border border-[#dce6df] bg-[#f7f9f6] pl-11 pr-4 text-xs outline-none transition focus:border-[#6ca78f] focus:bg-white" /></div>
              <div className="grid grid-cols-3 gap-2">{(["Todas", "Identificada", "ATCC"] as const).map(item => <button key={item} type="button" onClick={() => setCollection(item)} className={`h-11 rounded-xl px-3 text-[10px] font-bold transition sm:px-5 ${collection === item ? "bg-[#173f32] text-white shadow-md" : "bg-[#edf3ef] text-[#456359] hover:bg-[#dfeae3]"}`}>{item === "Identificada" ? "Identificadas" : item}</button>)}</div>
              <button type="button" onClick={() => setCartOpen(true)} className="relative inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#e5c55e] px-5 text-[11px] font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#f0d77f]"><ShoppingCart className="h-4 w-4" />Cotización {selected.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#173f32] px-1 text-[9px] text-white">{selected.length}</span>}</button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between"><p className="text-xs font-semibold text-[#65776f]">{results.length} resultados</p><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#87968f]">Valores referenciales · USD</p></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((strain, index) => {
              const active = selected.some((item) => item.id === strain.id)
              return <motion.article key={strain.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 8) * .035 }} className={`group flex min-h-[330px] flex-col rounded-[27px] border bg-white p-6 shadow-[0_16px_48px_rgba(15,55,45,.055)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,55,45,.11)] ${active ? "border-[#5d9c83] ring-2 ring-[#5d9c83]/12" : "border-[#dce5df]"}`}>
                <div className="flex items-center justify-between gap-4"><span className={`rounded-full px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em] ${strain.collection === "ATCC" ? "bg-[#fff4d4] text-[#8a6112]" : "bg-[#e8f4ee] text-[#2c745d]"}`}>{strain.collection}</span><span className="rounded-full bg-[#f2f5f2] px-3 py-2 text-[9px] font-bold text-[#62766d]">{strain.bsl}</span></div>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[.16em] text-[#4f8c78]">{strain.codigo}</p><h3 className="mt-2 text-xl font-bold italic leading-7 tracking-[-.025em]">{strain.nombre}</h3><p className="mt-2 line-clamp-2 text-[11px] italic leading-5 text-[#728179]">{strain.cientifico}</p>
                {strain.identificationMethod && <div className="mt-4 rounded-2xl border border-[#d8e8df] bg-[#f0f7f3] px-4 py-3"><span className="block text-[8px] font-bold uppercase tracking-[.14em] text-[#6b8278]">Identificado molecularmente por:</span><strong className="mt-1.5 block text-[10px] font-bold text-[#2e745d]">{strain.identificationMethod}</strong></div>}
                <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-lg bg-[#f3f6f3] px-2.5 py-1.5 text-[9px] font-semibold text-[#61736b]">{strain.categoria}</span>{strain.productFormat && <span className="rounded-lg bg-[#f3f6f3] px-2.5 py-1.5 text-[9px] font-semibold text-[#61736b]">{strain.productFormat}</span>}</div>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#e5ebe7] pt-5"><div><p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#87958e]">Desde</p><p className="mt-1 text-2xl font-bold tracking-[-.04em] text-[#1c674e]">US$ {strain.precioUsd}</p><p className="mt-1 text-[9px] text-[#87958e]">{strain.cantidad}</p></div><button type="button" onClick={() => toggleSelected(strain)} aria-label={`${active ? "Quitar" : "Agregar"} ${strain.nombre} de la cotización`} className={`grid h-12 w-12 place-items-center rounded-full transition ${active ? "bg-[#e5c55e] text-[#173428]" : "bg-[#173f32] text-white hover:rotate-[-7deg] hover:scale-105"}`}>{active ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-4 w-4" />}</button></div>
              </motion.article>
            })}
          </div>
          {results.length === 0 && <div className="mt-5 rounded-[28px] border border-dashed border-[#cbdad1] bg-white px-6 py-16 text-center"><FlaskConical className="mx-auto h-8 w-8 text-[#789187]" /><h3 className="mt-4 text-lg font-bold">No encontramos coincidencias</h3><p className="mt-2 text-xs text-[#6c7d75]">Prueba con otro nombre, código o colección.</p></div>}
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-24"><div data-navbar-theme="dark" className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-[38px] bg-[#0a2d22] p-8 text-white sm:p-12 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e5c55e]">¿No encuentras una referencia?</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-.045em] sm:text-5xl">Solicita una búsqueda personalizada</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">Indícanos microorganismo, aplicación y formato requerido. Revisaremos opciones y disponibilidad.</p></div><WhatsAppContact mode="modal" message="Hola, necesito una cepa que no aparece en el catálogo para Ecuador." className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#e5c55e] px-7 text-sm font-bold text-[#173428] transition hover:-translate-y-1 hover:bg-[#f0d77f]">Solicitar búsqueda<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></WhatsAppContact></div></section>
      </main>

      <AnimatePresence>{cartOpen && <motion.div className="fixed inset-0 z-[10001] bg-[#061d15]/70 p-3 backdrop-blur-md sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}><motion.aside role="dialog" aria-modal="true" aria-label="Solicitud de cotización" initial={{ opacity: 0, x: 50, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: .28 }} className="ml-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-[30px] bg-[#f7f9f6] shadow-2xl"><div className="flex items-center justify-between border-b border-[#dce5df] bg-white p-5"><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#56806f]">Pre-cotización</p><h2 className="mt-1 text-xl font-bold">Cepas seleccionadas</h2></div><button type="button" onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-[#edf2ee] transition hover:bg-[#dfe8e2]" aria-label="Cerrar"><X className="h-4 w-4" /></button></div><div className="flex-1 space-y-3 overflow-y-auto p-4">{selected.length === 0 ? <div className="grid h-full place-items-center text-center"><div><ShoppingCart className="mx-auto h-8 w-8 text-[#83938c]" /><p className="mt-4 text-sm font-bold">Aún no agregaste cepas</p><p className="mt-2 text-xs text-[#73827b]">Selecciona una o más fichas del catálogo.</p></div></div> : selected.map(item => <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-[#dce5df] bg-white p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8f3ed] text-[#367b65]"><FlaskConical className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{item.nombre}</p><p className="mt-1 text-[9px] text-[#73827b]">{item.codigo} · US$ {item.precioUsd}</p></div><button type="button" onClick={() => toggleSelected(item)} aria-label={`Quitar ${item.nombre}`} className="grid h-9 w-9 place-items-center rounded-full text-[#a04c3e] transition hover:bg-[#fff0ed]"><Trash2 className="h-4 w-4" /></button></div>)}</div><div className="border-t border-[#dce5df] bg-white p-5"><p className="mb-4 text-[10px] leading-5 text-[#718078]">El precio final puede variar por disponibilidad, documentación y logística. Un asesor confirmará la propuesta.</p><WhatsAppContact mode="modal" disabled={selected.length === 0} message={quoteMessage} className={`inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full px-6 text-sm font-bold transition ${selected.length ? "bg-[#173f32] text-white hover:-translate-y-0.5 hover:bg-[#205642]" : "cursor-not-allowed bg-[#dce4df] text-[#8b9992]"}`}>Solicitar cotización<ArrowRight className="h-4 w-4" /></WhatsAppContact></div></motion.aside></motion.div>}</AnimatePresence>
      <EcuadorFooter />
    </div>
  )
}
