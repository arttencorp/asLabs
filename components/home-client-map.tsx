"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Building2, Globe2, MapPin, MousePointer2, TrendingUp } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const countries = [
  { id: "PER", name: "Perú", x: 31.522, y: 54.587, featured: true, labelClass: "left-1/2 top-full mt-0.5 -translate-x-1/2" },
  { id: "ARG", name: "Argentina", x: 34.788, y: 69.625, labelClass: "left-full top-1/2 ml-1 -translate-y-1/2" },
  { id: "ECU", name: "Ecuador", x: 30.442, y: 50.123, office: true, labelClass: "right-full top-1/2 mr-1 -translate-y-1/2" },
  { id: "MEX", name: "México", x: 25.14, y: 35.454, labelClass: "right-full bottom-1/2 mr-1 mb-0.5" },
  { id: "GBR", name: "Reino Unido", x: 49.399, y: 18.289, labelClass: "left-full top-1/2 ml-1 -translate-y-1/2" },
  { id: "COL", name: "Colombia", x: 31.786, y: 47.018, labelClass: "left-full bottom-1/2 ml-1 mb-0.5" },
]

const regions = [
  { name: "Piura", x: 16.617, y: 29.817 },
  { name: "La Libertad", x: 26.135, y: 44.128 },
  { name: "Lima", x: 37.935, y: 63.603 },
  { name: "Arequipa", x: 70.625, y: 85.486, left: true },
]

const offices = [
  {
    city: "Trujillo, Perú",
    name: "Laboratorios centrales",
    address: "Ca. 30, Urb. San Isidro II · 13001 Trujillo",
    detail: "Biotecnología vegetal, microbiología, análisis y soporte científico.",
    image: "/new/SobreASLaboratorios.webp",
    href: "/sobre-nosotros",
    flag: "🇵🇪",
  },
  {
    city: "Quito, Ecuador",
    name: "Sede Ecuador",
    address: "Andrade Marín 24 · Edificio Carolina Millenium",
    detail: "Biología molecular, formulaciones bacterianas y soluciones especializadas.",
    image: "/ecuador/carolina-millenium.jpg",
    href: "/ecuador/sobre-nosotros",
    flag: "🇪🇨",
  },
]

function PeruDetail() {
  return (
    <div className="grid grid-cols-[0.72fr_1fr] items-center gap-3">
      <div className="relative mx-auto aspect-[320/390] w-full max-w-[156px]">
        <img src="/peru-sales-map.svg" alt="Mapa del Perú" className="absolute inset-0 h-full w-full object-contain" />
        {regions.map((region, index) => (
          <div key={region.name} className="absolute" style={{ left: `${region.x}%`, top: `${region.y}%` }}>
            <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-white bg-[#ef9f38] shadow-[0_0_0_4px_rgba(239,159,56,0.18)]" />
            <motion.span
              initial={{ opacity: 0, x: region.left ? 5 : -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.06 }}
              className={`absolute top-1/2 whitespace-nowrap rounded-full bg-[#173f2e] px-2 py-1 text-[9px] font-semibold text-white shadow-md ${region.left ? "right-2" : "left-2"} -translate-y-1/2`}
            >
              {region.name}
            </motion.span>
          </div>
        ))}
      </div>
      <div>
        <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#c66b28]"><TrendingUp className="h-3.5 w-3.5" /> Mayor concentración</p>
        <h3 className="mt-2 text-xl tracking-[-0.03em] text-[#173428]">Ventas en Perú</h3>
        <p className="mt-2 text-xs leading-5 text-[#64746c]">La mayor presencia comercial se concentra en la costa norte, Lima y el sur del país.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {regions.map((region) => <span key={region.name} className="rounded-full border border-[#d7e3d9] bg-white px-2 py-1 text-[9px] font-semibold text-[#315643]">{region.name}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function HomeClientMap() {
  const [showPeru, setShowPeru] = useState(false)

  return (
    <section data-navbar-theme="light" className="relative overflow-hidden border-b border-[#d6ddd8] bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pt-24">
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <ScrollReveal className="grid gap-5 border-b border-[#cbd5ce] pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end" distance={18}>
          <div><p className="text-[11px] font-semibold text-[#0b7a55]">Presencia internacional</p><h2 className="mt-3 text-[clamp(2rem,4vw,3.7rem)] font-medium leading-[1.03] tracking-[-0.045em] text-[#17211d]">Ciencia conectada con cada territorio.</h2></div>
          <p className="max-w-2xl text-sm leading-7 text-[#5d6c64] lg:justify-self-end">Atendemos clientes dentro y fuera del Perú y acercamos nuestras capacidades especializadas a Ecuador desde nuestra sede en Quito.</p>
        </ScrollReveal>

      </div>

      <ScrollReveal className="mt-8 w-full" distance={24} delay={0.08}>
        <div className="w-full border-y border-[#cad9cc] bg-[#f9fbf8]">
          <div className="mx-auto flex max-w-[1480px] flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="flex items-center gap-2 text-xs font-semibold text-[#315643]"><span className="grid h-8 w-8 place-items-center border border-[#c9d7ce] text-[#39714d]"><Globe2 className="h-4 w-4" /></span>Países donde confían en nosotros</p>
            <div className="flex flex-wrap items-center gap-2"><Link href="/ecuador" className="inline-flex items-center gap-2 border border-[#cfc786] bg-[#fffbea] px-3 py-2 text-[10px] font-bold text-[#625414] transition hover:bg-[#fff4bf]">🇪🇨 Nueva sede en Quito<ArrowRight className="h-3.5 w-3.5" /></Link><p className="inline-flex w-fit items-center gap-2 bg-[#173f2e] px-3 py-2 text-[10px] font-semibold text-white"><MousePointer2 className="h-3.5 w-3.5 text-[#f3ae52]" />Pasa el cursor por Perú</p></div>
          </div>

          <div className="relative h-[300px] w-full overflow-hidden border-y border-[#dbe5dc] bg-[radial-gradient(circle_at_42%_48%,#ffffff_0%,#f2f6f1_52%,#e7efe7_100%)] sm:h-auto sm:aspect-[1.9/1] lg:aspect-[2.15/1] xl:aspect-[2.35/1]">
            <div className="absolute left-1/2 top-1/2 aspect-[2/1] w-[600px] -translate-x-1/2 -translate-y-1/2 sm:w-[105%] lg:w-full">
              <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(49,86,67,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(49,86,67,.055)_1px,transparent_1px)] [background-size:42px_42px]" />
              <img src="/world-clients-map.svg" alt="Mapamundi con los países de origen de nuestros clientes" className="absolute inset-0 h-full w-full object-contain" />
              {countries.map((country) => (
                <div
                  key={country.id}
                  role={country.featured ? "img" : undefined}
                  aria-label={country.featured ? "Perú. Pasa el cursor para ver las zonas con mayores ventas." : undefined}
                  tabIndex={country.featured ? 0 : undefined}
                  onMouseEnter={country.featured ? () => setShowPeru(true) : undefined}
                  onMouseLeave={country.featured ? () => setShowPeru(false) : undefined}
                  onFocus={country.featured ? () => setShowPeru(true) : undefined}
                  onBlur={country.featured ? () => setShowPeru(false) : undefined}
                  className={`absolute z-20 h-10 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none ${country.featured ? "cursor-default focus-visible:ring-2 focus-visible:ring-[#ef9f38]" : "pointer-events-none"}`}
                  style={{ left: `${country.x}%`, top: `${country.y}%` }}
                >
                  <span className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md sm:h-3.5 sm:w-3.5 ${country.featured ? "bg-[#ef9f38]" : country.office ? "bg-[#d5b72c]" : "bg-[#39714d]"}`} />
                  {country.featured && <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-[#ef9f38]/70" />}
                  {country.office && <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d5b72c]/70" />}
                  <span className={`absolute hidden whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-bold shadow-md sm:block ${country.labelClass} ${country.featured ? "bg-[#ef9f38] text-[#173428]" : country.office ? "bg-[#fff3b5] text-[#655412]" : "bg-white text-[#315643]"}`}>{country.name}{country.office ? " · nueva sede" : ""}</span>
                </div>
              ))}

              <AnimatePresence>
                {showPeru && <motion.div initial={{ opacity: 0, x: -16, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.28 }} className="absolute left-[36%] top-1/2 z-30 hidden w-[390px] -translate-y-1/2 rounded-[1.4rem] border border-[#d3dfd4] bg-white/[0.97] p-4 shadow-[0_26px_65px_-24px_rgba(13,48,36,0.55)] backdrop-blur-md lg:block"><PeruDetail /></motion.div>}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {showPeru && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="border-b border-[#d3dfd4] bg-white p-5 lg:hidden"><div className="mx-auto max-w-xl"><PeruDetail /></div></motion.div>}
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-2 px-5 py-4 sm:px-8">
            {countries.map((country) => <span key={country.id} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold sm:text-[11px] ${country.office ? "border-[#dac75f] bg-[#fff8d8] text-[#665715]" : "border-[#d6e1d7] bg-white text-[#315643]"}`}><MapPin className={`h-3 w-3 ${country.featured ? "text-[#d8792e]" : country.office ? "text-[#b59b19]" : "text-[#39714d]"}`} />{country.name}{country.office ? " · Sede" : ""}</span>)}
          </div>
        </div>
      </ScrollReveal>

      <div className="relative mx-auto mt-5 max-w-[1320px] px-5 sm:px-8">
        <ScrollReveal className="grid overflow-hidden border border-[#cad9cc] bg-white lg:grid-cols-[220px_1fr_1fr]" distance={18}>
          <div className="flex items-center gap-3 border-b border-[#dbe5dc] bg-[#173f2e] px-5 py-5 text-white lg:border-b-0 lg:border-r">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#f0b867]"><Building2 className="h-5 w-5" /></span>
            <div><p className="text-[10px] font-semibold text-white/60">Nuestras sedes</p><p className="mt-1 text-sm font-semibold">Dos países, una misma ciencia</p></div>
          </div>
          {offices.map((office) => (
            <Link key={office.name} href={office.href} className="group grid grid-cols-[92px_1fr] gap-4 border-b border-[#dbe5dc] p-3 transition-colors hover:bg-[#f4f7f3] last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <div className="relative min-h-[104px] overflow-hidden bg-[#dfe7df]">
                <Image src={office.image} alt={`Sede de AS Laboratorios en ${office.city}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="92px" />
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs shadow-sm backdrop-blur">{office.flag}</span>
              </div>
              <div className="flex min-w-0 flex-col justify-center py-1">
                <p className="text-[9px] font-semibold text-[#c66b28]">{office.city}</p>
                <h3 className="mt-1 text-sm font-semibold text-[#173428]">{office.name}</h3>
                <p className="mt-1 text-[10px] leading-4 text-[#566a60]">{office.address}</p>
                <p className="mt-1.5 line-clamp-2 text-[9px] leading-4 text-[#7a8981]">{office.detail}</p>
              </div>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
