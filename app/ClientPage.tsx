"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Beaker,
  Check,
  Dna,
  FlaskConical,
  Gauge,
  Leaf,
  Microscope,
  PackageSearch,
  Sprout,
  TestTubes,
} from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import HomeRotatingHeadline from "@/components/home-rotating-headline"
import HomeClientMap from "@/components/home-client-map"
import HomeResearchSection from "@/components/home-research-section"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const trustLogos = [
  { src: "/trustUs/soldelaredo.jpg", alt: "Sol de Laredo" },
  { src: "/trustUs/CGIAR.jpeg", alt: "Centro Internacional de la Papa" },
  { src: "/trustUs/manuelita.jpg", alt: "Manuelita" },
  { src: "/trustUs/skyeast.jpg", alt: "Skyeast" },
  { src: "/trustUs/CCLL.png", alt: "Cámara de Comercio de La Libertad" },
  { src: "/trustUs/untLogo.png", alt: "Universidad Nacional de Trujillo" },
  { src: "/trustUs/arttencorp.jpg", alt: "ArttenCorp" },
  { src: "/partners/cavbio.png", alt: "CavBio" },
]

const capabilities = [
  { code: "ANL", title: "Análisis fisicoquímicos y microbiológicos", description: "Agua, alimentos, ambiente, superficies y sanidad vegetal.", image: "/research/research-lab.png", href: "/servicios", icon: TestTubes },
  { code: "GEN", title: "Biología molecular y genómica", description: "PCR, identificación molecular, secuenciamiento y WGS.", image: "/new/bannerasnuevo.webp", href: "/excellent", icon: Dna },
  { code: "CUL", title: "Cepas microbianas CULTIQ", description: "Colección identificada molecularmente y con trazabilidad.", image: "/cepas/identified/escherichia-coli.jpg", href: "/cepas/identificadas", icon: Microscope },
  { code: "INV", title: "Plantines in vitro", description: "Material clonal uniforme y producido bajo control técnico.", image: "/new/HEADER.webp", href: "/plantines", icon: Sprout },
  { code: "SUP", title: "Kits, reactivos y medios de cultivo", description: "Suministros seleccionados para rutinas de laboratorio.", image: "/offer/insumosLab.jpeg", href: "/kits-reactivos", icon: FlaskConical },
  { code: "EQP", title: "Equipos de laboratorio", description: "Instrumentación y consumibles para investigación y control.", image: "/lab-equipment.png", href: "/kits-reactivos/equipos-de-laboratorio", icon: Gauge },
  { code: "ALI", title: "Análisis enzimáticos y de alimentos", description: "Evaluación de calidad, composición y procesos alimentarios.", image: "/servicios/image.png", href: "/servicios/microbiologicos", icon: Beaker },
  { code: "DEV", title: "Aislamiento y selección de cepas", description: "Aislados, evaluación funcional, identificación y seguimiento.", image: "/new/BiotecnologiaVegetal.webp", href: "/servicios/aislamiento-seleccion-cepas", icon: PackageSearch },
]

const divisions = [
  { name: "exCELLent", label: "Molecular diagnostics", text: "Análisis moleculares, genómica e identificación para investigación y decisiones de alta precisión.", href: "/excellent", image: "/research/research-lab.png" },
  { name: "CULTIQ", label: "Microbial culture collection", text: "Cepas identificadas molecularmente, trazables y preparadas para investigación aplicada.", href: "/cepas/identificadas", image: "/cepas/identified/escherichia-coli.jpg" },
  { name: "In Vitro Solutions", label: "Plant biotechnology", text: "Programas de propagación clonal para cultivos que necesitan uniformidad, sanidad y escala.", href: "/plantines", image: "/new/HEADER.webp" },
]

function EvidenceItem({ icon: Icon, title, children }: { icon: typeof BadgeCheck; title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[38px_1fr] items-center gap-3 border-l border-[#c9d3cd] px-4 first:border-l-0 sm:px-5">
      <span className="grid h-8 w-8 place-items-center border border-[#c8d3cc] text-[#0b7a55]"><Icon className="h-4 w-4" /></span>
      <div className="min-w-0"><p className="text-[10px] font-semibold text-[#17211d]">{title}</p><p className="mt-0.5 text-[9px] leading-4 text-[#69776f]">{children}</p></div>
    </div>
  )
}

export default function ClientPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const reduceMotion = useReducedMotion()
  const selectedCapability = capabilities[activeCapability]

  return (
    <main className="home-redesign overflow-hidden bg-[#f5f7f4] font-[var(--font-poppins)] text-[#17211d]">
      <Navbar overlay />

      <section data-navbar-theme="dark" className="relative min-h-[690px] overflow-hidden bg-[#062b22] text-white lg:min-h-[720px]">
        <div className="home-lab-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[690px] max-w-[1480px] lg:min-h-[720px] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 pb-44 pt-28 sm:px-8 lg:px-12 lg:pb-40 lg:pt-32 xl:px-16">
            <motion.div initial={reduceMotion ? false : { opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="max-w-[700px]">
              <div className="mb-6 flex items-center gap-3 text-[11px] font-medium text-[#b8d8c8]"><span className="h-2 w-2 bg-[#d5a34f]" aria-hidden="true" />Ciencia aplicada desde 1997<span className="h-px max-w-28 flex-1 bg-white/15" aria-hidden="true" /></div>
              <HomeRotatingHeadline />
              <p className="mt-6 max-w-[580px] text-[13px] leading-6 text-white/66 sm:text-sm sm:leading-7">Integramos laboratorio, biotecnología vegetal, microbiología y genómica para convertir una muestra en una decisión técnica y una decisión en producción confiable.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="#capacidades" className="group inline-flex h-11 items-center gap-3 bg-[#d5a34f] px-5 text-xs font-semibold text-[#10251e] transition-colors hover:bg-[#e4b866] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Explorar capacidades <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                <Link href="/servicios" className="inline-flex h-11 items-center border border-white/24 px-5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#062b22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Ver servicios</Link>
              </div>
            </motion.div>
          </div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 min-h-[410px] lg:relative lg:min-h-0">
            <Image src="/new/HEADER.webp" alt="Laboratorio de biotecnología vegetal de AS Laboratorios" fill priority className="object-cover object-[58%_center] lg:object-center" sizes="(min-width:1024px) 55vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,43,34,.98)_0%,rgba(6,43,34,.88)_52%,rgba(6,43,34,.4)_100%)] lg:hidden" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#062b22_0%,rgba(6,43,34,.35)_18%,rgba(6,43,34,0)_48%)] max-lg:hidden" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#062b22_0%,rgba(6,43,34,0)_44%)] lg:bg-[linear-gradient(0deg,rgba(6,43,34,.72)_0%,rgba(6,43,34,0)_35%)]" />
            <div className="absolute bottom-9 left-5 right-5 border-y border-white/25 bg-[#062b22]/68 px-4 py-3 backdrop-blur-md sm:left-8 sm:right-8 lg:bottom-12 lg:left-auto lg:right-10 lg:w-[330px]">
              <div className="flex items-center justify-between gap-4"><div><p className="text-[9px] font-semibold text-[#b8d8c8]">Unidad activa</p><p className="mt-1 text-xs font-medium text-white">Biotecnología vegetal · Trujillo</p></div><span className="flex items-center gap-2 text-[9px] text-white/65"><span className="h-2 w-2 bg-[#6ed29b] shadow-[0_0_0_4px_rgba(110,210,155,.14)]" /> Operativa</span></div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#082f25]/94 backdrop-blur-lg">
          <div className="mx-auto grid max-w-[1480px] grid-cols-2 divide-x divide-y divide-white/10 lg:grid-cols-4 lg:divide-y-0">
            {[{ label: "Plantines", note: "Propagación in vitro", href: "/plantines" }, { label: "Kits y reactivos", note: "Catálogo científico", href: "/kits-reactivos" }, { label: "Cepas CULTIQ", note: "Colección microbiana", href: "/cepas/identificadas" }, { label: "Análisis", note: "Servicios de laboratorio", href: "/servicios" }].map((item) => (
              <Link key={item.label} href={item.href} className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.07] sm:px-7"><span><strong className="block text-[11px] font-semibold text-white">{item.label}</strong><span className="mt-0.5 block text-[9px] text-white/45">{item.note}</span></span><ArrowUpRight className="h-4 w-4 text-[#d5a34f] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            ))}
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="border-b border-[#d9e0db] bg-white">
        <div className="mx-auto grid max-w-[1480px] lg:grid-cols-[260px_1fr]">
          <div className="flex items-center border-b border-[#d9e0db] px-5 py-4 lg:border-b-0 lg:border-r lg:px-8"><p className="text-[10px] font-medium leading-4 text-[#53645c]">Organizaciones que confían en nuestro trabajo</p></div>
          <div className="grid grid-cols-4 divide-x divide-y divide-[#e5e9e6] lg:grid-cols-8 lg:divide-y-0">
            {trustLogos.map((logo) => <div key={logo.alt} className="group relative h-[74px] bg-white px-3 sm:h-[82px]"><Image src={logo.src} alt={logo.alt} fill className="object-contain p-3 opacity-65 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0" sizes="150px" /></div>)}
          </div>
        </div>
      </section>

      <section id="capacidades" data-navbar-theme="light" className="relative bg-[#f5f7f4] py-16 sm:py-20 lg:py-24">
        <div className="home-sample-line absolute left-1/2 top-0 hidden h-full lg:block" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
          <ScrollReveal className="grid gap-6 border-b border-[#cfd8d2] pb-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div><p className="text-[11px] font-semibold text-[#0b7a55]">Un ecosistema científico conectado</p><h2 className="mt-3 max-w-[760px] text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#17211d]">De la muestra a una respuesta que se puede aplicar.</h2></div>
            <p className="max-w-[520px] text-sm leading-7 text-[#5c6c64] lg:justify-self-end">Ocho capacidades, un solo flujo técnico. Selecciona una línea para conocer cómo puede integrarse a tu investigación, control o producción.</p>
          </ScrollReveal>

          <div className="mt-10 grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div className="relative min-h-[380px] overflow-hidden bg-[#dfe7e1] sm:min-h-[520px] lg:sticky lg:top-28 lg:h-[610px]">
              <Image key={selectedCapability.image} src={selectedCapability.image} alt={selectedCapability.title} fill className="object-cover" sizes="(min-width:1024px) 46vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/88 via-[#062b22]/5 to-transparent" />
              <motion.div key={selectedCapability.code} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7"><div className="flex items-center gap-3 text-[10px] text-[#c8dfd3]"><span className="h-px w-8 bg-[#d5a34f]" />{selectedCapability.code}</div><h3 className="mt-3 max-w-lg text-2xl font-medium leading-tight tracking-[-0.025em] sm:text-3xl">{selectedCapability.title}</h3><p className="mt-2 max-w-lg text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">{selectedCapability.description}</p></motion.div>
            </div>

            <div className="border-t border-[#cfd8d2]">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon
                const active = index === activeCapability
                return <Link key={capability.code} href={capability.href} onMouseEnter={() => setActiveCapability(index)} onFocus={() => setActiveCapability(index)} className={`group grid grid-cols-[40px_1fr_28px] items-start gap-3 border-b border-[#cfd8d2] py-4 transition-colors sm:grid-cols-[54px_1fr_32px] sm:gap-4 sm:py-5 ${active ? "bg-white" : "hover:bg-white/70"}`}><span className={`ml-2 grid h-9 w-9 place-items-center border transition-colors sm:h-10 sm:w-10 ${active ? "border-[#0b7a55] bg-[#0b7a55] text-white" : "border-[#cbd6cf] text-[#35604d]"}`}><Icon className="h-4 w-4" /></span><span><span className="text-[9px] font-semibold text-[#829087]">{capability.code}</span><strong className="mt-1 block text-sm font-semibold tracking-[-0.015em] text-[#17211d] sm:text-base">{capability.title}</strong><span className={`mt-1 block overflow-hidden text-[11px] leading-5 text-[#627168] transition-all sm:text-xs ${active ? "max-h-12 opacity-100" : "max-h-0 opacity-0 lg:group-hover:max-h-12 lg:group-hover:opacity-100"}`}>{capability.description}</span></span><ArrowUpRight className={`mt-5 h-4 w-4 transition ${active ? "text-[#0b7a55]" : "text-[#9aa59e] group-hover:text-[#0b7a55]"}`} /></Link>
              })}
            </div>
          </div>
        </div>
      </section>

      <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#062b22] py-16 text-white sm:py-20 lg:py-24">
        <div className="home-lab-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8"><ScrollReveal className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr]"><div><p className="text-[11px] font-semibold text-[#a8d8c1]">Método integrado</p><h2 className="mt-3 text-[clamp(2rem,3.3vw,3.5rem)] font-medium leading-[1.03] tracking-[-0.04em]">Una cadena científica, no servicios aislados.</h2></div><div className="grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">{[
          { title: "Muestrear", text: "Trazabilidad desde el origen y el contexto productivo." },
          { title: "Caracterizar", text: "Análisis físico, microbiológico, molecular o genómico." },
          { title: "Validar", text: "Resultados comparables, controlados y documentados." },
          { title: "Aplicar", text: "Decisiones técnicas, material vegetal o soluciones productivas." },
        ].map((step, index) => <div key={step.title} className="relative border-b border-r border-white/15 p-5 sm:min-h-[205px] sm:p-6"><span className="text-[10px] text-[#d5a34f]">0{index + 1}</span><h3 className="mt-10 text-lg font-medium">{step.title}</h3><p className="mt-2 text-[11px] leading-5 text-white/55">{step.text}</p><span className="absolute -left-[4px] top-4 h-2 w-2 bg-[#d5a34f]" aria-hidden="true" /></div>)}</div></ScrollReveal></div>
      </section>

      <section data-navbar-theme="light" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <ScrollReveal className="flex flex-col gap-4 border-b border-[#d6ddd8] pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[11px] font-semibold text-[#0b7a55]">Divisiones especializadas</p><h2 className="mt-3 text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-tight tracking-[-0.04em]">Tres plataformas. Un mismo estándar.</h2></div><Link href="/servicios" className="group inline-flex items-center gap-3 text-xs font-semibold text-[#0b7a55]">Ver ecosistema completo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></ScrollReveal>
          <div className="mt-7 grid border-l border-t border-[#d6ddd8] lg:grid-cols-3">
            {divisions.map((division) => <Link key={division.name} href={division.href} className="group border-b border-r border-[#d6ddd8] bg-[#f8faf8]"><div className="relative aspect-[1.42/1] overflow-hidden"><Image src={division.image} alt={division.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(min-width:1024px) 33vw, 100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/45 to-transparent" /></div><div className="p-5 sm:p-6"><p className="text-[9px] font-medium text-[#65736b]">{division.label}</p><div className="mt-2 flex items-center justify-between gap-4"><h3 className="text-xl font-medium tracking-[-0.025em] text-[#17211d]">{division.name}</h3><ArrowUpRight className="h-4 w-4 text-[#0b7a55] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><p className="mt-3 text-xs leading-5 text-[#5d6b64]">{division.text}</p></div></Link>)}
          </div>
        </div>
      </section>

      <HomeResearchSection />
      <HomeClientMap />

      <section data-navbar-theme="light" className="border-t border-[#d6ddd8] bg-[#eef2ee] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ScrollReveal className="relative min-h-[380px] overflow-hidden sm:min-h-[500px]"><Image src="/new/AlternativasSosteniblesParaeLFuturo.jpeg" alt="Equipo de AS Laboratorios en el área de biotecnología vegetal" fill className="object-cover" sizes="(min-width:1024px) 45vw, 100vw" /><div className="absolute bottom-0 left-0 bg-[#062b22] px-5 py-4 text-white sm:px-7"><p className="text-3xl font-medium tracking-[-0.04em]">29 años</p><p className="mt-1 text-[10px] text-white/55">de ciencia aplicada</p></div></ScrollReveal>
          <ScrollReveal className="lg:pl-10" delay={0.08}><p className="text-[11px] font-semibold text-[#0b7a55]">AS Laboratorios</p><h2 className="mt-3 text-[clamp(2rem,4vw,3.8rem)] font-medium leading-[1.03] tracking-[-0.045em]">La precisión del laboratorio debe sentirse en el campo.</h2><p className="mt-6 max-w-[640px] text-sm leading-7 text-[#5a6961]">Desde 1997 conectamos análisis, investigación, producción vegetal y acompañamiento técnico. Trabajamos con empresas, productores, universidades e investigadores que necesitan resultados comprensibles y soluciones con aplicación real.</p><div className="mt-7 grid gap-0 border-y border-[#c8d3cc] sm:grid-cols-2">{["Laboratorio, vivero y campo en un mismo flujo", "Soporte para empresas, productores e investigación", "Registro SENASA para producción vegetal", "Registro Nacional de Proveedores del Estado"].map((item) => <div key={item} className="flex gap-3 border-b border-[#d5ddd7] py-3 pr-4 text-xs leading-5 text-[#31483d] sm:odd:border-r sm:odd:pr-5 sm:even:pl-5 sm:[&:nth-last-child(-n+2)]:border-b-0"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0b7a55]" />{item}</div>)}</div><div className="mt-8 flex flex-wrap items-center gap-3"><Link href="/sobre-nosotros" className="group inline-flex h-11 items-center gap-3 bg-[#062b22] px-5 text-xs font-semibold text-white hover:bg-[#0b4a39]">Conoce AS Laboratorios <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><div className="grid grid-cols-2"><EvidenceItem icon={Leaf} title="SENASA">Producción vegetal</EvidenceItem><EvidenceItem icon={BadgeCheck} title="RNP">Proveedor del Estado</EvidenceItem></div></div></ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
