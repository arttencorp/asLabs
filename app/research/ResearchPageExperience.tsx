"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BarChart3,
  Beaker,
  CheckCircle2,
  Dna,
  FlaskConical,
  Leaf,
  Microscope,
  ShieldCheck,
  Sprout,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CategorySection from "@/components/research/category-section"
import LaboratoriesSection from "@/components/research/laboratories-section"
import {
  controlBiologico,
  ingenieriaGenetica,
  investigacionesTerminadas,
  pipelineData,
  secuenciamiento,
} from "@/data/pipeline-data"

const strategicLines = [
  { title: "Control biológico", copy: "Microorganismos para el manejo sostenible de plagas.", icon: ShieldCheck, href: "/control-biologico" },
  { title: "Secuenciamiento", copy: "Lectura y análisis genómico para decisiones precisas.", icon: Microscope, href: "#projects" },
  { title: "Mejoramiento genético", copy: "Selección de materiales vegetales con valor productivo.", icon: Dna, href: "#projects" },
  { title: "Biotecnología molecular", copy: "Herramientas aplicadas al diagnóstico y la producción.", icon: Leaf, href: "#projects" },
]

export default function ResearchPageExperience() {
  const [activeTab, setActiveTab] = useState("overview")
  const totalProjects = pipelineData.reduce((total, category) => total + category.subsections.reduce((subtotal, subsection) => subtotal + subsection.projects.length, 0), 0)
  const activeProjects = pipelineData.reduce((total, category) => category.title === "Investigaciones Terminadas" ? total : total + category.subsections.reduce((subtotal, subsection) => subtotal + subsection.projects.length, 0), 0)
  const completedProjects = investigacionesTerminadas.reduce((total, subsection) => total + subsection.projects.length, 0)
  const totalPlantsProduced = investigacionesTerminadas.reduce((total, subsection) => total + subsection.projects.reduce((subtotal, project) => subtotal + (project.plantsProduced ? Number.parseInt(project.plantsProduced.replace(/[^0-9]/g, "")) : 0), 0), 0)
  const biotecnologiaMolecular = pipelineData.find((item) => item.title === "Biotecnología Molecular")?.subsections || []

  return (
    <main className="overflow-hidden bg-[#f5f7f4] text-[#173428]">
      <section data-navbar-theme="dark" className="relative min-h-[620px] overflow-hidden bg-[#092b20] pt-28 md:min-h-[660px] md:pt-32">
        <div className="absolute inset-0">
          <Image src="/research/research-lab.png" alt="Equipo de AS Laboratorios desarrollando investigación aplicada" fill priority className="object-cover object-[64%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,31,22,.98)_0%,rgba(8,44,31,.94)_42%,rgba(8,44,31,.48)_72%,rgba(8,44,31,.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,28,20,.55),transparent_45%)]" />
        </div>
        <div className="absolute -left-24 bottom-[-7rem] h-80 w-80 rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-28 pt-10 lg:grid-cols-[1.15fr_.7fr] lg:items-end lg:pb-24 lg:pt-16">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#d5e7d8] backdrop-blur-md"><FlaskConical className="h-4 w-4 text-[#f0a23a]" /> Investigación aplicada</div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-.045em] text-white sm:text-5xl md:text-[3.85rem]">
              Ciencia que responde a los desafíos del campo.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.78] md:text-lg">
              Conectamos biotecnología, microbiología y genética para desarrollar soluciones agrícolas medibles, reproducibles y listas para avanzar del laboratorio a la producción.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-[#f0a23a] px-6 py-3.5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc56f]">Explorar proyectos <ArrowRight className="h-4 w-4" /></a>
              <a href="#laboratorios" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">Conocer laboratorios <Microscope className="h-4 w-4" /></a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/15 pt-6">
              <HeroStat value={`${totalProjects}`} label="Proyectos" />
              <HeroStat value="4" label="Líneas" />
              <HeroStat value={`${totalPlantsProduced.toLocaleString()}+`} label="Plantas" />
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-white/15 bg-[#092b20]/45 p-4 shadow-2xl backdrop-blur-xl lg:block">
            <p className="px-2 pb-3 text-[11px] font-bold uppercase tracking-[.2em] text-white/50">Líneas estratégicas</p>
            <div className="space-y-1">
              {strategicLines.map(({ title, icon: Icon }, index) => <a key={title} href={index === 0 ? "/control-biologico" : "#lineas"} className="group flex items-center gap-3 rounded-2xl p-3 text-white transition hover:bg-white/10"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#ffc46f]"><Icon className="h-4 w-4" /></div><span className="flex-1 text-sm font-semibold text-white">{title}</span><ArrowRight className="h-4 w-4 text-white/[0.35] transition group-hover:translate-x-1 group-hover:text-white" /></a>)}
            </div>
          </div>
        </div>
      </section>

      <div data-navbar-theme="light" className="relative z-20 mx-auto -mt-7 w-[calc(100%-2rem)] max-w-5xl">
        <nav aria-label="Secciones de investigación" className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-white bg-white/95 p-2 shadow-[0_20px_55px_-32px_rgba(9,43,32,.55)] backdrop-blur-lg [scrollbar-width:none]">
          {[["Laboratorios", "#laboratorios"], ["Líneas de investigación", "#lineas"], ["Proyectos", "#projects"], ["Impacto", "#impacto-investigacion"]].map(([label, href]) => <a key={href} href={href} className="shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold text-[#5d7066] transition hover:bg-[#edf3ee] hover:text-[#245f3e]">{label}</a>)}
        </nav>
      </div>

      <section data-navbar-theme="light" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard icon={BarChart3} value={totalProjects.toString()} label="Proyectos registrados" />
          <MetricCard icon={Beaker} value={activeProjects.toString()} label="En desarrollo" />
          <MetricCard icon={CheckCircle2} value={completedProjects.toString()} label="Completados" />
          <MetricCard icon={Sprout} value={`${totalPlantsProduced.toLocaleString()}+`} label="Plantas producidas" />
        </div>
      </section>

      <section id="laboratorios" data-navbar-theme="light" className="scroll-mt-28 border-y border-[#e4eae5] bg-white py-3 md:py-7">
        <LaboratoriesSection />
      </section>

      <section id="lineas" data-navbar-theme="light" className="scroll-mt-28 bg-[#edf2ed] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Capacidades científicas" title="Cuatro líneas, un mismo propósito" copy="Organizamos cada proyecto alrededor de problemas reales de sanidad, productividad y calidad agrícola." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {strategicLines.map(({ title, copy, icon: Icon, href }, index) => <Link key={title} href={href} className="group flex min-h-64 flex-col rounded-[1.75rem] border border-[#dce5de] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#9cbdA7] hover:shadow-xl">
              <div className="flex items-center justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf2ec] text-[#245f3e]"><Icon className="h-6 w-6" /></div><span className="font-mono text-xs font-bold text-[#a2afa8]">0{index + 1}</span></div>
              <h3 className="mt-8 text-xl font-bold tracking-[-.02em]">{title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-[#687970]">{copy}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#39714e]">Ver proyectos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>)}
          </div>
        </div>
      </section>

      <section id="projects" data-navbar-theme="light" className="scroll-mt-28 bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Portafolio de investigación" title="Proyectos con avance visible" copy="Consulta el estado, equipo responsable y alcance de las investigaciones activas y terminadas." />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12 space-y-8">
            <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl border border-[#dfe7e1] bg-[#f2f5f2] p-1.5">
              <TabsTrigger value="overview" className="rounded-xl py-3 text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-[#245f3e] data-[state=active]:shadow-sm sm:text-sm">Todas las líneas</TabsTrigger>
              <TabsTrigger value="active" className="rounded-xl py-3 text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-[#245f3e] data-[state=active]:shadow-sm sm:text-sm">En desarrollo</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-xl py-3 text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-[#245f3e] data-[state=active]:shadow-sm sm:text-sm">Completados</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-7">
              <CategorySection title="CONTROL BIOLÓGICO" subsections={controlBiologico} color="green" />
              <CategorySection title="SECUENCIAMIENTO" subsections={secuenciamiento} color="blue" />
              <CategorySection title="MEJORAMIENTO GENÉTICO" subsections={ingenieriaGenetica} color="green" />
              <CategorySection title="BIOTECNOLOGÍA MOLECULAR" subsections={biotecnologiaMolecular} color="orange" />
            </TabsContent>
            <TabsContent value="active" className="space-y-7">
              <CategorySection title="CONTROL BIOLÓGICO" subsections={controlBiologico} color="green" />
              <CategorySection title="SECUENCIAMIENTO" subsections={secuenciamiento} color="blue" />
              <CategorySection title="MEJORAMIENTO GENÉTICO" subsections={ingenieriaGenetica} color="green" />
              <CategorySection title="BIOTECNOLOGÍA MOLECULAR" subsections={biotecnologiaMolecular} color="orange" />
            </TabsContent>
            <TabsContent value="completed"><CategorySection title="INVESTIGACIONES TERMINADAS" subsections={investigacionesTerminadas} color="green" isCompleted /></TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="impacto-investigacion" data-navbar-theme="light" className="scroll-mt-28 bg-[#173f2d] px-4 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#bad7c1]">Impacto medible</p><h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-.03em] text-white md:text-5xl">Investigamos para producir mejores respuestas.</h2><p className="mt-5 text-base leading-7 text-white/[0.68]">Cada resultado fortalece nuestros protocolos, servicios de análisis y capacidades de producción vegetal.</p></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <ImpactCard value={`${completedProjects}`} label="proyectos culminados" />
            <ImpactCard value={`${totalPlantsProduced.toLocaleString()}+`} label="plantas obtenidas" />
            <ImpactCard value="4" label="laboratorios especializados" />
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="bg-[#f5f7f4] px-4 py-20 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-[#dce5de] bg-white p-8 shadow-[0_24px_70px_-48px_rgba(9,43,32,.5)] md:flex-row md:items-center md:p-12">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#4f7d60]">Colaboremos</p><h2 className="mt-3 text-3xl font-bold tracking-[-.03em]">¿Tienes una investigación por desarrollar?</h2><p className="mt-3 text-sm leading-6 text-[#687970] md:text-base">Conversemos sobre análisis, diseño experimental y capacidades de laboratorio para tu proyecto.</p></div>
          <a href="https://wa.me/51961996645?text=Hola%2C%20quisiera%20consultar%20sobre%20un%20proyecto%20de%20investigación" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f0a23a] px-6 py-3.5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc56f]">Consultar proyecto <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  )
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return <div><p className="text-xl font-bold text-white sm:text-2xl">{value}</p><p className="mt-1 text-[11px] font-medium text-white/50 sm:text-xs">{label}</p></div>
}

function MetricCard({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }) {
  return <article className="rounded-[1.5rem] border border-[#dfe7e1] bg-white p-5 md:p-6"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eaf2ec] text-[#245f3e]"><Icon className="h-5 w-5" /></div><p className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">{value}</p><p className="mt-1 text-xs font-semibold text-[#708178] md:text-sm">{label}</p></article>
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#4e7d5f]">{eyebrow}</p><h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-.035em] md:text-5xl">{title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#687970] md:text-lg">{copy}</p></div>
}

function ImpactCard({ value, label }: { value: string; label: string }) {
  return <article className="rounded-[1.5rem] border border-white/10 bg-white/[.07] p-5 text-white backdrop-blur-md"><Award className="h-5 w-5 text-[#f0a23a]" /><p className="mt-8 text-3xl font-bold tracking-tight text-white">{value}</p><p className="mt-2 text-xs leading-5 text-white/[0.6]">{label}</p></article>
}
