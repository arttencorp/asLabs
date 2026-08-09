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
  FlaskConical,
  Leaf,
  Microscope,
  Sprout,
} from "lucide-react"
import OfferCarousel from "@/components/offer-carousel"
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
  { src: "/RNPv2.png", alt: "Constancia del RNP", type: "Institución" },
]

const products = [
  {
    title: "Banano Invitro ASWG",
    variety: "Banano Cavendish Williams",
    image: "/plantines/pagina19.webp",
    accent: "bg-[#f0a23a]",
  },
  {
    title: "Banano Invitro ASC5",
    variety: "Banano Cavendish Valery",
    image: "/plantines/pagina18.webp",
    accent: "bg-[#8bb56d]",
  },
  {
    title: "Banano Invitro ASBBG",
    variety: "Banano Baby",
    image: "/plantines/bananoBabyBBG.jpeg",
    accent: "bg-[#d3a658]",
  },
  {
    title: "Plátano Invitro ASDG",
    variety: "Plátano Dominico Hartón",
    image: "/plantines/pagina23.webp",
    accent: "bg-[#6b9e78]",
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

      <section data-navbar-theme="dark" className="relative min-h-[680px] bg-[#0a2f20] text-white sm:min-h-[700px] lg:min-h-[720px]">
        <Image
          src="/new/bannerasnuevo.webp"
          alt="Equipo de AS Laboratorios trabajando en biotecnología vegetal"
          fill
          priority
          className="object-cover object-[64%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,36,24,0.98)_0%,rgba(5,36,24,0.88)_42%,rgba(5,36,24,0.18)_76%,rgba(5,36,24,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,36,24,0.7)_0%,transparent_45%)]" />
        <div className="home-grain absolute inset-0 opacity-25" />

        <div className="relative mx-auto flex min-h-[680px] max-w-[1480px] items-center px-5 pb-20 pt-24 sm:min-h-[700px] sm:px-8 sm:pb-24 sm:pt-24 lg:min-h-[720px] lg:px-10 lg:pb-24 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-[780px]"
          >
            <div className="mb-3 inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c7e7b8]">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-[#c7e7b8]/40"><Sprout className="h-3.5 w-3.5" /></span>
              Innovación vegetal con impacto real
            </div>
            <HomeRotatingHeadline />
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:flex sm:flex-row">
              <Link href="/plantines" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#f0a23a] px-4 py-3 text-[12px] font-bold text-[#173428] transition-colors hover:bg-[#ffc56f] sm:w-auto sm:gap-6 sm:px-5 sm:text-[13px]">
                Ver plantines <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/servicios" className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-white hover:text-[#173428] sm:w-auto sm:px-5 sm:text-[13px]">
                Servicios
              </Link>
            </div>

            <div className="mt-4 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/[0.15] p-3 backdrop-blur-sm transition-colors hover:bg-black/30 sm:gap-4 sm:p-3.5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white p-1.5 shadow-lg sm:h-16 sm:w-16 sm:p-2">
                  <Image src="/senasaLogo.png" alt="SENASA" width={64} height={64} className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#ffc56f] sm:text-[10px] sm:tracking-[0.14em]">Registro SENASA</p>
                  <p className="mt-1 text-[10px] font-semibold leading-tight text-white sm:text-xs">Vivero de producción vegetal</p>
                </div>
              </div>
              <a href="https://ntuvrqipgvhnuynjfzbx.supabase.co/storage/v1/object/public/general-web/landing/CONSTANCIA%20DEL%20RNP%20-%20ASLABS.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/[0.15] p-3 backdrop-blur-sm transition-colors hover:bg-black/30 sm:gap-4 sm:p-3.5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white p-1.5 shadow-lg sm:h-16 sm:w-16 sm:p-2">
                  <Image src="/RNPv2.png" alt="RNP" width={64} height={64} className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#ffc56f] sm:text-[10px] sm:tracking-[0.14em]">Proveedor del Estado</p>
                  <p className="mt-1 text-[10px] font-semibold leading-tight text-white sm:text-xs">Registro Nacional de Proveedores del Perú · RNP</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[76px] bg-gradient-to-r from-[#f0a23a]/10 via-[#f0a23a]/35 to-[#f0a23a]/60 [clip-path:polygon(0_92%,100%_0,100%_100%,0_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[3] h-[68px] bg-[#f6f3eb] [clip-path:polygon(0_100%,100%_0,100%_100%,0_100%)]" />
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

      <section data-navbar-theme="light" className="border-y border-[#173428]/10 bg-[#f2f6f1] pb-16 pt-20 sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <ScrollReveal className="mb-9 text-center" distance={18}>
            <SectionLabel>Respaldo</SectionLabel>
            <h2 className="text-2xl tracking-[-0.03em] text-[#173428] sm:text-3xl">Organizaciones que confían en nosotros</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#66756e]">Trabajamos junto a empresas, instituciones académicas y organizaciones que comparten nuestra visión de una agricultura sostenible.</p>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7" staggerDelay={0.07}>
            {trustLogos.map((logo) => (
              <StaggerItem key={logo.alt} className="group flex min-h-[150px] flex-col rounded-2xl border border-[#dce6de] bg-white p-4 shadow-[0_12px_34px_-28px_rgba(14,60,38,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[#aec8b4] hover:shadow-lg" distance={12}>
                <div className="relative flex-1">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain transition-transform duration-300 group-hover:scale-105" sizes="160px" />
                </div>
                <div className="mt-3 border-t border-[#e5ebe6] pt-3">
                  <p className="truncate text-[10px] font-semibold text-[#314d3f]">{logo.alt}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[#819087]"><span className="h-1.5 w-1.5 rounded-full bg-[#5e9a6b]" />{logo.type}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section id="soluciones" data-navbar-theme="dark" className="relative overflow-hidden bg-[#0b3024] py-20 text-white sm:py-24 lg:py-28">
        <div className="home-grain absolute inset-0 opacity-20" />
        <motion.div
          aria-hidden="true"
          className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#3f7548]/30 blur-3xl"
          animate={{ x: [0, -28, 0], y: [0, 22, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <ScrollReveal className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end" distance={20}>
            <div className="max-w-3xl">
              <SectionLabel light>Nuestro catálogo</SectionLabel>
              <h2 className="text-[clamp(2.15rem,4vw,3.75rem)] leading-[1.02] tracking-[-0.04em]">Plantines in vitro para una producción confiable.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/[0.68] sm:text-base">Material vegetal uniforme, con calidad genética y fitosanitaria, producido bajo protocolos especializados y listo para continuar su desarrollo en vivero.</p>
            </div>
            <div className="rounded-[1.65rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  { icon: Microscope, title: "Calidad fitosanitaria", copy: "Protocolos controlados" },
                  { icon: BadgeCheck, title: "Identidad genética", copy: "Material uniforme" },
                  { icon: Sprout, title: "Listos para vivero", copy: "Desarrollo acompañado" },
                ].map((benefit) => {
                  const Icon = benefit.icon
                  return <div key={benefit.title} className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0a23a] text-[#173428]"><Icon className="h-5 w-5" /></span><div><p className="text-xs font-bold text-white">{benefit.title}</p><p className="mt-0.5 text-[10px] text-white/[0.52]">{benefit.copy}</p></div></div>
                })}
              </div>
            </div>
          </ScrollReveal>

          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.32fr_1fr_1fr_1fr]" staggerDelay={0.1} amount={0.16}>
            {products.map((product, index) => (
              <StaggerItem key={product.title} className="h-full" distance={24}>
                <Link href="/plantines" className={`group relative block min-h-[390px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_26px_55px_-26px_rgba(0,0,0,0.85)] ${index === 0 ? "sm:col-span-2 lg:col-span-1 lg:min-h-[475px]" : "lg:min-h-[475px]"}`}>
                  <Image src={product.image} alt={product.title} fill loading="eager" className="object-cover transition-transform duration-700 group-hover:scale-105" sizes={index === 0 ? "(min-width: 1024px) 31vw, 100vw" : "(min-width: 1024px) 23vw, 50vw"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f17] via-[#071f17]/15 to-black/5" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <span className={`rounded-full ${product.accent} px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#173428] shadow-lg`}>En producción</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/15 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-[#173428]"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#ffc56f]">Cultivo in vitro</p>
                    <h3 className={`${index === 0 ? "text-2xl" : "text-xl"} mt-2 font-semibold leading-tight tracking-[-0.03em] text-white`}>{product.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/[0.62]">{product.variety}</p>
                    <div className="mt-5 flex items-center gap-2 border-t border-white/15 pt-4 text-[11px] font-semibold text-white/[0.82]">Ver ficha del plantín <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <ScrollReveal className="mt-8 flex flex-col gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4 sm:flex-row sm:items-center sm:justify-between" distance={14}>
            <p className="text-xs leading-5 text-white/[0.58]">¿Buscas otra variedad o necesitas coordinar volúmenes de producción?</p>
            <Link href="/plantines" className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#173428] transition hover:bg-[#ffc56f]">Explorar todos los plantines <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </ScrollReveal>
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

      <OfferCarousel />
      <HomeResearchSection />
      <TeamMemberSection />
      <Footer />
    </main>
  )
}
