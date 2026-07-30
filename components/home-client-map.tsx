"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Globe2, MapPin, MousePointer2, TrendingUp } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const countries = [
  { id: "PER", name: "Perú", x: 31.522, y: 54.587, featured: true, labelClass: "left-1/2 top-full mt-0.5 -translate-x-1/2" },
  { id: "ARG", name: "Argentina", x: 34.788, y: 69.625, labelClass: "left-full top-1/2 ml-1 -translate-y-1/2" },
  { id: "ECU", name: "Ecuador", x: 30.442, y: 50.123, labelClass: "right-full top-1/2 mr-1 -translate-y-1/2" },
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
    <section data-navbar-theme="light" className="relative overflow-hidden border-b border-[#173428]/10 bg-[#eef3ed] pt-20 sm:pt-24">
      <div className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-[#d4e3d1]/70 blur-3xl" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center" distance={18}>
          <div className="mb-4 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c45f24]"><span className="h-px w-7 bg-current" />Presencia internacional<span className="h-px w-7 bg-current" /></div>
          <h2 className="text-[clamp(2rem,4vw,3.35rem)] leading-[1.04] tracking-[-0.04em] text-[#173428]">Nuestra ciencia llega más lejos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#64746c] sm:text-base">Atendemos clientes dentro y fuera del Perú, conectando soluciones de laboratorio y biotecnología con nuevos mercados.</p>
        </ScrollReveal>

      </div>

      <ScrollReveal className="mt-10 w-full" distance={24} delay={0.08}>
        <div className="w-full border-y border-[#cad9cc] bg-[#f9fbf8] shadow-[0_30px_80px_-52px_rgba(18,59,43,0.48)]">
          <div className="mx-auto flex max-w-[1480px] flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="flex items-center gap-2 text-xs font-semibold text-[#315643]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#dce8dc] text-[#39714d]"><Globe2 className="h-4 w-4" /></span>Países donde confían en nosotros</p>
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#173f2e] px-3 py-2 text-[10px] font-semibold text-white"><MousePointer2 className="h-3.5 w-3.5 text-[#f3ae52]" />Pasa el cursor por Perú</p>
          </div>

          <div className="relative aspect-[1.25/1] min-h-[420px] w-full overflow-hidden border-y border-[#dbe5dc] bg-[radial-gradient(circle_at_42%_48%,#ffffff_0%,#f2f6f1_52%,#e7efe7_100%)] sm:aspect-[1.75/1] sm:min-h-0 lg:aspect-[2.15/1] xl:aspect-[2.35/1]">
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
                  <span className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md sm:h-3.5 sm:w-3.5 ${country.featured ? "bg-[#ef9f38]" : "bg-[#39714d]"}`} />
                  {country.featured && <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-[#ef9f38]/70" />}
                  <span className={`absolute hidden whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-bold shadow-md sm:block ${country.labelClass} ${country.featured ? "bg-[#ef9f38] text-[#173428]" : "bg-white text-[#315643]"}`}>{country.name}</span>
                </div>
              ))}

              <AnimatePresence>
                {showPeru && <motion.div initial={{ opacity: 0, x: 16, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.28 }} className="absolute bottom-6 right-6 z-30 hidden w-[390px] rounded-[1.4rem] border border-[#d3dfd4] bg-white/[0.97] p-4 shadow-[0_26px_65px_-24px_rgba(13,48,36,0.55)] backdrop-blur-md lg:block"><PeruDetail /></motion.div>}
              </AnimatePresence>
          </div>

          <AnimatePresence>
            {showPeru && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="border-b border-[#d3dfd4] bg-white p-5 lg:hidden"><div className="mx-auto max-w-xl"><PeruDetail /></div></motion.div>}
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-2 px-5 py-5 sm:px-8">
            {countries.map((country) => <span key={country.id} className="inline-flex items-center gap-1.5 rounded-full border border-[#d6e1d7] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#315643] sm:text-[11px]"><MapPin className={`h-3 w-3 ${country.featured ? "text-[#d8792e]" : "text-[#39714d]"}`} />{country.name}</span>)}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
