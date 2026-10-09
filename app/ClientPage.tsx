"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
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
import TeamMemberSection from "@/components/team-member-section"
import HomeResearchSection from "@/components/home-research-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import HomeRotatingHeadline from "@/components/home-rotating-headline"
import HomeClientMap from "@/components/home-client-map"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

const trustLogos = [
  { src: "/trustUs/soldelaredo.jpg", alt: "Sol de Laredo", type: "Agroindustria" },
  { src: "/trustUs/CGIAR.jpeg", alt: "Centro Internacional de la Papa", type: "Investigación" },
  { src: "/trustUs/manuelita.jpg", alt: "Manuelita", type: "Agroindustria" },
  { src: "/trustUs/skyeast.jpg", alt: "Skyeast", type: "Empresa" },
  { src: "/trustUs/CCLL.png", alt: "Cámara de Comercio de La Libertad", type: "Institución" },
  { src: "/trustUs/untLogo.png", alt: "Universidad Nacional de Trujillo", type: "Academia" },
  { src: "/trustUs/arttencorp.jpg", alt: "ArttenCorp", type: "Empresa" },
  { src: "/partners/cavbio.png", alt: "CavBio", type: "Biotecnología" },
]

const capabilities = [
  {
    eyebrow: "Diagnóstico y calidad",
    title: "Análisis fisicoquímicos y microbiológicos",
    description: "Agua, alimentos, ambiente, superficies y sanidad vegetal con soporte técnico.",
    image: "/lab-scientists.png",
    href: "/servicios",
    icon: TestTubes,
    featured: true,
  },
  {
    eyebrow: "Precisión molecular",
    title: "Biología molecular y genómica",
    description: "PCR, identificación molecular, secuenciamiento y análisis genómico especializado.",
    image: "/microscope-scientist.png",
    href: "/excellent",
    icon: Dna,
    featured: true,
  },
  {
    eyebrow: "Colección microbiana",
    title: "Cepas CULTIQ",
    description: "Cultivos puros identificados molecularmente y con trazabilidad.",
    image: "/microorganismos-preview.png",
    href: "/cepas/identificadas",
    icon: Microscope,
  },
  {
    eyebrow: "Biotecnología vegetal",
    title: "Plantines in vitro",
    description: "Banano, plátano, piña, pitahaya y otros materiales clonales.",
    image: "/plantines/pagina19.webp",
    href: "/plantines",
    icon: Sprout,
  },
  {
    eyebrow: "Suministro especializado",
    title: "Kits, reactivos y medios",
    description: "Referencias para biología molecular, microbiología y cultivo.",
    image: "/offer/insumosLab.jpeg",
    href: "/kits-reactivos",
    icon: FlaskConical,
  },
  {
    eyebrow: "Infraestructura científica",
    title: "Equipos de laboratorio",
    description: "Instrumentación y consumibles para investigación y control de calidad.",
    image: "/lab-equipment.png",
    href: "/kits-reactivos/equipos-de-laboratorio",
    icon: Gauge,
  },
  {
    eyebrow: "Industria alimentaria",
    title: "Análisis enzimáticos y de alimentos",
    description: "Evaluación especializada para procesos, composición y calidad.",
    image: "/servicios/image.png",
    href: "/servicios/microbiologicos",
    icon: Microscope,
  },
  {
    eyebrow: "Desarrollo para empresas",
    title: "Aislamiento y selección de cepas",
    description: "Hasta 30 aislados, evaluación funcional, identificación y seguimiento.",
    image: "/research/research-lab.png",
    href: "/servicios/aislamiento-seleccion-cepas",
    icon: PackageSearch,
  },
]

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#f0b867]" : "text-[#c45f24]"}`}>
      <span className="h-px w-7 bg-current" />
      {children}
    </div>
  )
}

export default function ClientPage() {
  return (
    <main className="home-redesign overflow-hidden bg-[#f6f3eb] font-[var(--font-poppins)] text-[#173428]">
      <Navbar overlay />

      <section data-navbar-theme="dark" className="relative min-h-[620px] overflow-hidden bg-[#082a20] text-white sm:min-h-[650px] lg:min-h-[660px]">
        <Image
          src="/new/bannerasnuevo.webp"
          alt="Equipo de AS Laboratorios trabajando en biotecnología vegetal"
          fill
          priority
          className="object-cover object-[66%_center] contrast-[1.04] saturate-[.88]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,31,22,0.99)_0%,rgba(4,31,22,0.94)_39%,rgba(4,31,22,0.48)_69%,rgba(4,31,22,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,27,19,0.84)_0%,rgba(3,27,19,0.12)_52%,rgba(3,27,19,0.22)_100%)]" />
        <div className="home-grain absolute inset-0 opacity-20" />
        <div aria-hidden="true" className="absolute inset-y-0 left-[7%] hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent xl:block" />

        <div className="relative mx-auto grid min-h-[620px] max-w-[1420px] items-center gap-9 px-5 pb-20 pt-24 sm:min-h-[650px] sm:px-8 sm:pb-24 sm:pt-24 lg:min-h-[660px] lg:grid-cols-[minmax(0,1fr)_350px] lg:px-10 lg:pb-24 lg:pt-20 xl:grid-cols-[minmax(0,1fr)_385px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-[790px]"
          >
            <div className="mb-4 flex max-w-[660px] items-center gap-3 text-[11px] font-medium text-[#c7dfcf] sm:text-xs">
              <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center" aria-hidden="true">
                <span className="absolute h-2.5 w-2.5 rounded-full bg-[#f0b867]/30" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#f0b867]" />
              </span>
              Laboratorio, biotecnología e investigación aplicada
              <span className="hidden h-px flex-1 bg-gradient-to-r from-white/25 to-transparent sm:block" aria-hidden="true" />
            </div>
            <HomeRotatingHeadline />
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-row">
              <Link href="#soluciones" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#f0b867] px-4 py-3 text-[12px] font-bold text-[#173428] shadow-[0_14px_36px_-18px_rgba(240,184,103,.85)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#ffd28f] sm:w-auto sm:px-5 sm:text-[13px]">
                Explorar capacidades <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/plantines" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.05] px-4 py-3 text-[12px] font-semibold text-white backdrop-blur-sm transition-[background-color,color,border-color] hover:border-white hover:bg-white hover:text-[#173428] sm:w-auto sm:px-5 sm:text-[13px]">
                Plantines in vitro
              </Link>
            </div>

            <div className="mt-5 grid max-w-[690px] grid-cols-2 border-y border-white/15 bg-[#041f17]/25 backdrop-blur-[3px]">
              <div className="flex min-w-0 items-center gap-2.5 py-3 pr-2 sm:gap-3 sm:py-3.5 sm:pr-5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white p-1 shadow-[0_8px_24px_-12px_rgba(0,0,0,.7)] sm:h-10 sm:w-10">
                  <Image src="/senasaLogo.png" alt="SENASA" width={40} height={40} className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold text-[#f0c783] sm:text-[10px]">Registro SENASA</p>
                  <p className="mt-0.5 text-[9px] leading-[0.85rem] text-white/75 sm:text-[10px] sm:leading-4">Vivero de producción vegetal</p>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-2.5 border-l border-white/15 py-3 pl-3 sm:gap-3 sm:py-3.5 sm:pl-5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#f0b867]/30 bg-[#f0b867]/12 text-[#f0b867] sm:h-10 sm:w-10">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold text-[#f0c783] sm:text-[10px]">Proveedor del Estado</p>
                  <p className="mt-0.5 text-[9px] leading-[0.85rem] text-white/75 sm:text-[10px] sm:leading-4">Registro Nacional de Proveedores · RNP</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden overflow-hidden border-y border-white/18 bg-[#061f17]/48 py-2 shadow-[0_30px_70px_-38px_rgba(0,0,0,.85)] backdrop-blur-md lg:block"
            aria-label="Accesos rápidos por necesidad"
          >
            <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-[#f0b867]/80 to-transparent" />
            <div className="flex items-end justify-between px-5 pb-4 pt-3">
              <div>
                <p className="text-[11px] font-semibold text-white">Índice de capacidades</p>
                <p className="mt-1 text-[10px] leading-4 text-white/50">Accesos directos por necesidad</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-medium text-[#b9d9c3]"><span className="h-1.5 w-1.5 rounded-full bg-[#7ad89d] shadow-[0_0_0_4px_rgba(122,216,157,.12)]" /> Disponible</span>
            </div>
            {[
              { code: "AN", label: "Analizar una muestra", note: "Agua, alimentos, suelo y sanidad", href: "/servicios", icon: TestTubes },
              { code: "BV", label: "Propagar material vegetal", note: "Clones in vitro para producción", href: "/plantines", icon: Sprout },
              { code: "MG", label: "Identificar una cepa", note: "Genómica y caracterización", href: "/excellent", icon: Dna },
              { code: "SU", label: "Abastecer un laboratorio", note: "Reactivos, medios y equipos", href: "/kits-reactivos", icon: FlaskConical },
            ].map((entry) => {
              const Icon = entry.icon
              return (
                <Link key={entry.label} href={entry.href} className="group grid grid-cols-[28px_34px_minmax(0,1fr)_16px] items-center gap-3 border-t border-white/10 px-5 py-3.5 transition-colors hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f0b867]">
                  <span className="text-[9px] font-semibold text-white/35 transition-colors group-hover:text-[#f0b867]">{entry.code}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-[#c8dfd0] transition-colors group-hover:border-[#f0b867]/50 group-hover:text-[#f0b867]"><Icon className="h-3.5 w-3.5" /></span>
                  <span className="min-w-0"><strong className="block text-[11px] font-semibold text-white">{entry.label}</strong><span className="mt-0.5 block truncate text-[9px] text-white/45">{entry.note}</span></span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f0b867]" />
                </Link>
              )
            })}
          </motion.aside>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[72px] bg-gradient-to-r from-[#f0b867]/15 via-[#f0b867]/45 to-[#f0b867]/70 [clip-path:polygon(0_91%,100%_18%,100%_100%,0_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[3] h-[62px] bg-[#f6f3eb] [clip-path:polygon(0_100%,100%_12%,100%_100%,0_100%)]" />
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-[1240px] px-5 sm:-mt-10 sm:px-8">
        <StaggerGroup className="grid grid-cols-3 divide-x divide-[#173428]/10 overflow-hidden rounded-2xl border border-[#173428]/10 bg-white shadow-[0_24px_70px_-32px_rgba(10,47,32,0.45)]" staggerDelay={0.12} amount={0.35}>
          {[
            { value: "29+", label: "años al servicio del Perú", icon: Award },
            { value: "13", label: "programas de clonación", icon: Leaf },
            { value: "04", label: "programas de investigación", icon: FlaskConical },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <StaggerItem key={stat.label} className="flex items-center justify-center gap-4 px-2 py-5 sm:px-6 sm:py-7" distance={14}>
                <span className="hidden h-10 w-10 place-items-center rounded-full bg-[#dce7d2] text-[#27613e] sm:grid"><Icon className="h-4.5 w-4.5" /></span>
                <div className="text-center sm:text-left">
                  <p className="text-2xl tracking-[-0.04em] text-[#1f6a3c] sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 max-w-[125px] text-[9px] leading-4 text-[#62736b] sm:text-[11px]">{stat.label}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </section>

      <section data-navbar-theme="light" className="border-y border-[#173428]/10 bg-[#f2f6f1] py-14 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <ScrollReveal className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" distance={18}>
            <div>
              <SectionLabel>Respaldo</SectionLabel>
              <h2 className="text-2xl tracking-[-0.03em] text-[#173428] sm:text-[2rem]">Organizaciones que confían en nosotros</h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-[#66756e] sm:text-right">Empresa, academia e investigación conectadas por una agricultura más sostenible.</p>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-2 overflow-hidden rounded-[1.35rem] border border-[#d4e1d7] bg-white shadow-[0_20px_55px_-42px_rgba(14,60,38,.55)] sm:grid-cols-4 lg:grid-cols-8" staggerDelay={0.05}>
            {trustLogos.map((logo) => (
              <StaggerItem key={logo.alt} className="group flex min-h-[108px] flex-col border-b border-r border-[#e2e9e3] bg-white p-3 transition-colors hover:bg-[#f5f8f4] sm:min-h-[118px]" distance={10}>
                <div className="relative flex-1 min-h-[54px]">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain transition-transform duration-300 group-hover:scale-105" sizes="160px" />
                </div>
                <p className="mt-2 truncate text-center text-[9px] font-medium text-[#607168]">{logo.alt}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section id="soluciones" data-navbar-theme="dark" className="relative overflow-hidden bg-[#0b3024] py-14 text-white sm:py-16 lg:py-20">
        <div className="home-grain absolute inset-0 opacity-20" />
        <div className="home-specimen-grid absolute inset-0 opacity-35" />
        <motion.div
          aria-hidden="true"
          className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#3f7548]/30 blur-3xl"
          animate={{ x: [0, -28, 0], y: [0, 22, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <ScrollReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between" distance={20}>
            <div className="max-w-[760px]">
              <SectionLabel light>Todo en un solo lugar</SectionLabel>
              <h2 className="text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.02] tracking-[-0.04em]">Capacidades que trabajan juntas.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/[0.68]">Del diagnóstico a la producción: explora el ecosistema científico de AS Laboratorios sin perderte entre divisiones.</p>
            </div>
            <Link href="/servicios" className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/18 bg-white/[0.07] px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#173428]">
              Ver todas las soluciones <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>

          <StaggerGroup className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12" staggerDelay={0.055} amount={0.1}>
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
              <StaggerItem key={capability.title} className={`h-full ${capability.featured ? "lg:col-span-6" : "lg:col-span-4"}`} distance={16}>
                <Link href={capability.href} className={`group relative grid overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)] ${capability.featured ? "min-h-[245px] sm:min-h-[270px]" : "min-h-[198px] sm:min-h-[215px]"}`}>
                  <Image src={capability.image} alt={capability.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,28,20,0.06)_0%,rgba(4,28,20,0.88)_70%,rgba(4,28,20,0.98)_100%)]" />
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#0a2f20]/55 text-white backdrop-blur-md transition group-hover:bg-[#f0a23a] group-hover:text-[#173428]">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                  <div className="relative mt-auto p-4 sm:p-5">
                    <div className="mb-2 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-[#ffc56f]"><Icon className="h-3.5 w-3.5" />{capability.eyebrow}</div>
                    <h3 className={`${capability.featured ? "text-xl sm:text-[1.35rem]" : "text-lg"} font-semibold leading-tight tracking-[-0.025em] text-white`}>{capability.title}</h3>
                    <p className="mt-1.5 max-w-[48ch] text-[11px] leading-[1.05rem] text-white/[0.66]">{capability.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            )})}
          </StaggerGroup>
        </div>
      </section>

      <HomeClientMap />

      <section data-navbar-theme="light" className="relative overflow-hidden bg-[#f6f3eb] py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#dce7d2]/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <ScrollReveal direction="right" className="relative min-h-[440px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-42px_rgba(10,47,32,0.55)] sm:min-h-[570px]" distance={28}>
            <Image src="/new/AlternativasSosteniblesParaeLFuturo.jpeg" alt="Alternativas sostenibles desarrolladas por AS Laboratorios" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b3024]/70 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#173428]/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">Desde 1997</div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md sm:left-8 sm:right-auto sm:max-w-[300px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffc56f]">Nuestro propósito</p>
              <p className="mt-2 text-lg leading-snug">Alternativas sostenibles para el futuro de la agricultura.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:pl-10" distance={28} delay={0.08}>
            <SectionLabel>Nuestra historia</SectionLabel>
            <h2 className="text-[clamp(2.25rem,4vw,3.7rem)] leading-[1.03] tracking-[-0.04em] text-[#173428]">La ciencia funciona mejor cuando llega al campo.</h2>
            <p className="mt-6 text-sm leading-7 text-[#596a62] sm:text-base">
              AS Laboratorios nació con la misión de mejorar el germoplasma nacional y responder a los desafíos de la agricultura peruana. Hoy desarrollamos clones vegetales de alta calidad, investigamos microorganismos benéficos y promovemos el control biológico para reducir el uso de plaguicidas.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#596a62] sm:text-base">
              Nuestro trabajo integra laboratorio, vivero, campo y asesoría técnica. Así acompañamos a productores, empresas, universidades y estudiantes desde la investigación inicial hasta la aplicación de soluciones concretas.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Clonación de plantas con alta calidad genética y fitosanitaria",
                "Control biológico para una agricultura más sostenible",
                "Asesoría técnica y apoyo especializado a la investigación",
                "Vínculo entre laboratorio, vivero y aplicación productiva",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#dce5dc] bg-white/70 p-4 text-sm font-medium leading-6 text-[#264c3b]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#2f7046] text-white"><Check className="h-3 w-3" /></span>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/sobre-nosotros" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#173428] px-5 py-3 text-[13px] font-semibold text-white">
              Conoce más sobre AS Labs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section data-navbar-theme="dark" className="relative overflow-hidden border-y border-white/10 bg-[#123b2b] py-16 text-white sm:py-20">
        <div className="home-grain absolute inset-0 opacity-[0.15]" />
        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
          <ScrollReveal className="mb-9 text-center">
            <SectionLabel light>Cómo trabajamos</SectionLabel>
            <h2 className="text-2xl tracking-[-0.03em] text-white sm:text-3xl">Una misma visión, del diagnóstico a la solución</h2>
          </ScrollReveal>
        <StaggerGroup className="grid gap-4 sm:grid-cols-3" staggerDelay={0.12}>
          {[
            { icon: Microscope, title: "Investigación aplicada", text: "Proyectos orientados a enfermedades, genética y productividad agrícola." },
            { icon: Leaf, title: "Producción sostenible", text: "Soluciones que protegen el cultivo y reducen el impacto ambiental." },
            { icon: FlaskConical, title: "Acompañamiento técnico", text: "Especialistas que conectan el diagnóstico con una respuesta viable." },
          ].map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title} className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10" distance={18}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#dce7d2] text-[#2f7046]"><Icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="text-base text-white">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-white/60">{item.text}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
        </div>
      </section>

      <HomeResearchSection />
      <TeamMemberSection />
      <Footer />
    </main>
  )
}
