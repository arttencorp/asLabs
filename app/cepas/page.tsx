import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Beaker,
  Check,
  ClipboardCheck,
  Dna,
  FileCheck2,
  FlaskConical,
  Globe2,
  MessageCircle,
  Microscope,
  PackageCheck,
  ShieldCheck,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { constructMetadata } from "@/lib/metadata"

export const metadata: Metadata = constructMetadata({
  title: "Banco de Cepas Microbianas y Cepas ATCC",
  description: "Cepas identificadas y microorganismos de referencia ATCC para investigación, docencia, control de calidad y validación de métodos en Perú.",
  keywords: ["cepas microbianas Perú", "cepas ATCC Perú", "cepas bacterianas", "microorganismos de referencia", "control de calidad microbiológico", "banco de cepas"],
  path: "/cepas",
  image: "/lab-header-bg.jpg",
})

const comparison = [
  { label: "Origen", identified: "Colección identificada por AS Laboratorios", atcc: "Colección internacional de referencia" },
  { label: "Uso recomendado", identified: "Investigación, docencia y desarrollo", atcc: "Validación, controles y métodos estandarizados" },
  { label: "Preparación", identified: "Cultivo bajo solicitud", atcc: "Gestión según disponibilidad de la colección" },
  { label: "Documentación", identified: "Identificación y ficha de la cepa", atcc: "Documentación oficial de referencia" },
]

export default function CepasPage() {
  return (
    <>
      <Navbar overlay />
      <main className="overflow-hidden bg-[#f5f7f4] text-[#173428]">
        <section data-navbar-theme="dark" className="relative min-h-[610px] overflow-hidden bg-[#092b20] pt-28 md:min-h-[650px] md:pt-32">
          <div className="absolute inset-0">
            <Image src="/lab-header-bg.jpg" alt="Trabajo microbiológico en laboratorio" fill priority className="object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,31,22,.98)_0%,rgba(8,44,31,.9)_48%,rgba(8,44,31,.45)_78%,rgba(8,44,31,.25)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,28,20,.65),transparent_50%)]" />
          </div>
          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-6 right-14 h-52 w-52 rounded-full border border-white/10" />
          <div className="relative mx-auto flex min-h-[490px] max-w-6xl items-center px-4 pb-24 pt-10 md:min-h-[520px] md:pb-20">
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-[#031d15]/45 p-6 shadow-[0_28px_80px_-36px_rgba(0,0,0,.75)] backdrop-blur-[3px] sm:p-8 md:-ml-8 md:p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#062d21]/75 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-white shadow-lg backdrop-blur-md"><Dna className="h-4 w-4 text-[#ffc66f]" /> Banco de cepas</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-.045em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,.55)] sm:text-5xl md:text-[4rem]">
                Cepas confiables para resultados reproducibles.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.9] drop-shadow-[0_2px_10px_rgba(0,0,0,.45)] md:text-lg">
                Accede a cepas identificadas y microorganismos de referencia ATCC para investigación, docencia, control de calidad y validación de métodos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/cepas/identificadas" className="inline-flex items-center gap-2 rounded-full bg-[#f0a23a] px-6 py-3.5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc56f]">Ver cepas identificadas <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/cepas/atcc" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">Explorar cepas ATCC <Globe2 className="h-4 w-4" /></Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6 text-xs font-semibold text-white/[0.88]">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#b9edc5]" /> Identidad documentada</span>
                <span className="inline-flex items-center gap-2"><Microscope className="h-4 w-4 text-[#b9edc5]" /> Preparación especializada</span>
                <span className="inline-flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-[#b9edc5]" /> Trazabilidad por solicitud</span>
              </div>
            </div>
          </div>
        </section>

        <section data-navbar-theme="light" className="relative z-10 mx-auto -mt-8 max-w-6xl px-4">
          <div className="grid overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_28px_80px_-44px_rgba(9,43,32,.55)] sm:grid-cols-3">
            <TrustItem icon={BadgeCheck} title="Selección definida" copy="Elige según el objetivo de tu método." />
            <TrustItem icon={FlaskConical} title="Preparación técnica" copy="Coordinamos formato y requerimientos." />
            <TrustItem icon={PackageCheck} title="Entrega coordinada" copy="Protegemos la viabilidad del material." />
          </div>
        </section>

        <section data-navbar-theme="light" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#4e7d5f]">Elige tu colección</p><h2 className="mt-4 text-3xl font-bold tracking-[-.035em] md:text-5xl">Dos alternativas según tu aplicación</h2><p className="mt-4 text-base leading-7 text-[#687970] md:text-lg">Te ayudamos a identificar la opción apropiada para el nivel de referencia, documentación y disponibilidad que exige tu trabajo.</p></div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Link href="/cepas/identificadas" className="group relative flex min-h-[500px] flex-col overflow-hidden rounded-[2rem] bg-[#1f5b3a] p-7 text-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-9">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" /><div className="absolute -right-4 top-4 h-36 w-36 rounded-full border border-white/10" />
              <div className="relative flex items-center justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10"><Beaker className="h-7 w-7 text-[#ffd18c]" /></div><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em]">Colección local</span></div>
              <div className="relative mt-16"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#b9d5c0]">Cepas identificadas</p><h3 className="mt-3 text-3xl font-bold tracking-[-.03em] md:text-4xl">Flexibilidad para investigación y desarrollo</h3><p className="mt-4 max-w-xl text-sm leading-6 text-white/68 md:text-base">Cepas cultivadas e identificadas por AS Laboratorios, preparadas bajo solicitud para aplicaciones académicas, técnicas y productivas.</p></div>
              <ul className="relative mt-8 grid gap-3 text-sm text-white/78 sm:grid-cols-2">
                <Feature text="Cultivo bajo solicitud" /><Feature text="Ficha de identificación" /><Feature text="Presentación coordinada" /><Feature text="Asesoría para seleccionar" />
              </ul>
              <span className="relative mt-auto inline-flex items-center gap-2 pt-10 text-sm font-bold text-[#ffd18c]">Abrir catálogo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>

            <Link href="/cepas/atcc" className="group relative flex min-h-[500px] flex-col overflow-hidden rounded-[2rem] border border-[#dce5de] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-9">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#dce5de]" /><div className="absolute -right-4 top-4 h-36 w-36 rounded-full border border-[#e6ece7]" />
              <div className="relative flex items-center justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eaf2ec] text-[#245f3e]"><Globe2 className="h-7 w-7" /></div><span className="rounded-full bg-[#edf3ee] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#4e755d]">Referencia global</span></div>
              <div className="relative mt-16"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#4e7d5f]">Cepas ATCC</p><h3 className="mt-3 text-3xl font-bold tracking-[-.03em] md:text-4xl">Estándares para control y validación</h3><p className="mt-4 max-w-xl text-sm leading-6 text-[#687970] md:text-base">Microorganismos de referencia internacional con documentación oficial para métodos que demandan identidad y trazabilidad estandarizadas.</p></div>
              <ul className="relative mt-8 grid gap-3 text-sm text-[#53685d] sm:grid-cols-2">
                <Feature text="Referencia certificada" dark /><Feature text="Documentación ATCC" dark /><Feature text="Gestión de importación" dark /><Feature text="Consulta de disponibilidad" dark />
              </ul>
              <span className="relative mt-auto inline-flex items-center gap-2 pt-10 text-sm font-bold text-[#245f3e]">Abrir catálogo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </section>

        <section data-navbar-theme="light" className="bg-[#eaf0ea] px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#4e7d5f]">Comparación rápida</p><h2 className="mt-4 text-3xl font-bold tracking-[-.035em] md:text-5xl">Encuentra la opción adecuada</h2></div><p className="max-w-2xl text-base leading-7 text-[#687970] lg:justify-self-end">La elección depende del uso previsto. Para validaciones normativas o controles de referencia, una cepa ATCC suele ser la opción indicada.</p></div>
            <div className="mt-12 hidden overflow-hidden rounded-[2rem] border border-[#d7e1d9] bg-white md:block">
              <div className="grid grid-cols-[.55fr_1fr_1fr] bg-[#173f2d] px-6 py-5 text-xs font-bold uppercase tracking-[.15em] text-white"><span>Criterio</span><span>Cepas identificadas</span><span>Cepas ATCC</span></div>
              {comparison.map((row) => <div key={row.label} className="grid grid-cols-[.55fr_1fr_1fr] border-t border-[#e4ebe5] px-6 py-5 text-sm"><span className="font-bold text-[#31483d]">{row.label}</span><span className="pr-6 leading-6 text-[#687970]">{row.identified}</span><span className="leading-6 text-[#687970]">{row.atcc}</span></div>)}
            </div>
            <div className="mt-10 grid gap-4 md:hidden">{comparison.map((row) => <article key={row.label} className="rounded-2xl border border-[#d7e1d9] bg-white p-5"><h3 className="font-bold">{row.label}</h3><div className="mt-4 grid gap-4 text-sm"><div><p className="text-xs font-bold uppercase tracking-wide text-[#4e7d5f]">Identificadas</p><p className="mt-1 leading-6 text-[#687970]">{row.identified}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-[#4e7d5f]">ATCC</p><p className="mt-1 leading-6 text-[#687970]">{row.atcc}</p></div></div></article>)}</div>
          </div>
        </section>

        <section data-navbar-theme="light" className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#4e7d5f]">Cómo solicitar</p><h2 className="mt-4 text-3xl font-bold tracking-[-.035em] md:text-5xl">Un proceso acompañado de inicio a fin</h2></div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <ProcessCard number="01" icon={ClipboardCheck} title="Define tu necesidad" copy="Indícanos la especie, el uso previsto y los requerimientos de tu protocolo." />
              <ProcessCard number="02" icon={Microscope} title="Validamos disponibilidad" copy="Nuestro equipo revisa la colección, el formato y el tiempo de preparación." />
              <ProcessCard number="03" icon={PackageCheck} title="Preparamos y entregamos" copy="Coordinamos documentación, conservación y entrega del material solicitado." />
            </div>
          </div>
        </section>

        <section data-navbar-theme="light" className="bg-[#f5f7f4] px-4 pb-24">
          <div className="relative mx-auto overflow-hidden rounded-[2rem] bg-[#173f2d] px-7 py-12 text-white md:px-12 md:py-14 lg:max-w-6xl">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b8d5c0]">Asesoría especializada</p><h2 className="mt-3 text-3xl font-bold tracking-[-.03em] md:text-4xl">¿No sabes qué cepa necesita tu método?</h2><p className="mt-3 text-sm leading-6 text-white/65 md:text-base">Cuéntanos tu objetivo y te orientaremos antes de realizar la solicitud.</p></div><a href="https://wa.me/51961996645?text=Hola%2C%20quisiera%20asesoría%20para%20seleccionar%20una%20cepa" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f0a23a] px-6 py-3.5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc56f]"><MessageCircle className="h-4 w-4" /> Consultar por WhatsApp</a></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function TrustItem({ icon: Icon, title, copy }: { icon: React.ComponentType<{ className?: string }>; title: string; copy: string }) {
  return <article className="flex items-start gap-4 border-b border-[#e5ebe6] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:p-6"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#eaf2ec] text-[#245f3e]"><Icon className="h-5 w-5" /></div><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-xs leading-5 text-[#728179]">{copy}</p></div></article>
}

function Feature({ text, dark = false }: { text: string; dark?: boolean }) {
  return <li className="flex items-center gap-2"><span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? "bg-[#eaf2ec] text-[#245f3e]" : "bg-white/10 text-[#ffd18c]"}`}><Check className="h-3 w-3" /></span>{text}</li>
}

function ProcessCard({ number, icon: Icon, title, copy }: { number: string; icon: React.ComponentType<{ className?: string }>; title: string; copy: string }) {
  return <article className="rounded-[1.75rem] border border-[#dfe7e1] bg-[#f8faf8] p-6"><div className="flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e7f0e9] text-[#245f3e]"><Icon className="h-5 w-5" /></div><span className="font-mono text-xs font-bold text-[#a0ada6]">{number}</span></div><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#687970]">{copy}</p></article>
}
