"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Beaker,
  Binary,
  Building2,
  Check,
  Dna,
  FlaskConical,
  Leaf,
  Microscope,
  Network,
  Sprout,
} from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const projects = [
  ["AMB-01 · Biotecnología ambiental", "Cianobacterias para biorremediación de suelos mineros", "Etapa de pruebas", "Pruebas"],
  ["AGR-02 · Sanidad vegetal", "Control de Lasiodiplodia con consorcios bacterianos", "Etapa de pruebas", "Pruebas"],
  ["AMB-03 · Biotecnología ambiental", "Cianobacterias para degradación de hidrocarburos", "Selección de cepas", "Selección"],
  ["VEG-04 · Biotecnología vegetal", "Medio de cultivo de tejidos para caña de azúcar", "Desarrollo experimental", "Desarrollo"],
  ["GEN-05 · Genómica vegetal", "Caracterización de variedades de banano y plátano", "Pruebas moleculares finales", "Validación"],
  ["GEN-06 · Genómica microbiana", "Secuenciamiento genómico de microorganismos", "Línea activa", "Desarrollo"],
]

const capabilities = [
  { icon: Microscope, title: "Microbiología aplicada", text: "Aislamiento, caracterización y evaluación funcional de microorganismos para agricultura, alimentos, ambiente y procesos productivos." },
  { icon: Dna, title: "Biología molecular y genómica", text: "Extracción de ADN, PCR, identificación molecular, secuenciamiento y análisis bioinformático según el alcance del proyecto." },
  { icon: Beaker, title: "Bioquímica y enzimas", text: "Estudio de actividad enzimática, proteínas, lípidos, azúcares y otros indicadores para investigación y desarrollo." },
  { icon: Sprout, title: "Biotecnología vegetal", text: "Cultivo de tejidos, micropropagación, sanidad vegetal y evaluación de material para sistemas de producción confiables." },
]

const platforms = [
  {
    name: "Microbiología",
    icon: Microscope,
    title: "Descubrir, comparar y seleccionar microorganismos.",
    text: "Estudiamos microorganismos desde su recuperación hasta la evaluación funcional, conectando el aislamiento con una pregunta productiva o científica concreta.",
    methods: ["Aislamiento y cultivo", "Caracterización fenotípica", "Ensayos de actividad", "Conservación y control de pureza"],
    results: ["Registro de aislados", "Resultados comparativos", "Cultivos seleccionados", "Informe técnico"],
    href: "/servicios/aislamiento-seleccion-cepas",
  },
  {
    name: "Genómica",
    icon: Dna,
    title: "Entender la identidad y el potencial desde el ADN.",
    text: "Integramos extracción, control de calidad, secuenciamiento y bioinformática para responder preguntas de identificación, variación y capacidad funcional.",
    methods: ["Extracción y QC de ADN", "PCR e identificación", "WGS y secuenciamiento", "Análisis comparativo y filogenético"],
    results: ["Archivos FASTQ", "Ensamblaje", "Anotación de genes", "Certificado e interpretación"],
    href: "/excellent",
  },
  {
    name: "Biotecnología vegetal",
    icon: Leaf,
    title: "Material vegetal confiable, medible y trazable.",
    text: "Desarrollamos flujos de cultivo de tejidos y evaluación vegetal para propagación, saneamiento, conservación y validación de respuestas en planta.",
    methods: ["Introducción in vitro", "Multiplicación y enraizamiento", "Saneamiento", "Aclimatación y evaluación"],
    results: ["Registro por etapa", "Material propagado", "Observaciones de calidad", "Trazabilidad del proceso"],
    href: "/servicios/biotecnologia-vegetal",
  },
  {
    name: "Bioquímica",
    icon: FlaskConical,
    title: "Traducir una reacción biológica en datos comparables.",
    text: "Medimos actividad enzimática y composición para estudiar procesos biológicos, materias primas, alimentos, extractos y respuestas experimentales.",
    methods: ["Actividad enzimática", "Proteínas", "Lípidos", "Azúcares y composición"],
    results: ["Datos normalizados", "Comparación de tratamientos", "Curvas y cálculos", "Informe de resultados"],
    href: "/servicios/fisicoquimicos-bioquimicos",
  },
]

const process = [
  ["01", "Pregunta", "Delimitamos la decisión que los datos deben sostener."],
  ["02", "Diseño", "Definimos muestras, controles, réplicas y entregables."],
  ["03", "Ejecución", "Procesamos con registro de cada etapa y observación."],
  ["04", "Lectura", "Ordenamos, comparamos e interpretamos los resultados."],
]

export default function CentroInvestigacionClient() {
  const [activePlatform, setActivePlatform] = useState(0)
  const platform = platforms[activePlatform]

  return (
    <>
      <Navbar overlay />
      <main className="bg-[#f4f6f3] font-[var(--font-poppins)] text-[#17211d]">
        <section data-navbar-theme="dark" className="relative min-h-[480px] overflow-hidden bg-[#09281f] pt-24 md:min-h-[530px]">
          <Image src="/new/bannerasnuevo.webp" alt="Investigación aplicada en AS Laboratorios" fill priority className="object-cover object-center opacity-65" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,27,20,.98)_0%,rgba(4,34,24,.88)_43%,rgba(4,34,24,.32)_76%,rgba(4,34,24,.2)_100%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative z-10 mx-auto flex min-h-[380px] max-w-[1380px] items-end px-5 pb-12 pt-12 md:min-h-[430px] md:px-10 md:pb-14">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[790px]">
              <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.24em] text-[#b7d8c8]"><span className="h-px w-12 bg-[#7eb99a]" />Ciencia aplicada · desde 1997</div>
              <h1 className="max-w-[760px] text-4xl font-medium leading-[1.04] tracking-[-.045em] text-white sm:text-5xl md:text-[3.6rem]">Centro de Investigación</h1>
              <p className="mt-6 max-w-[700px] text-base leading-7 text-white/80 md:text-lg md:leading-8">Convertimos preguntas científicas en protocolos, datos y soluciones que pueden aplicarse en laboratorio, campo y procesos productivos.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/research" className="inline-flex items-center gap-3 bg-[#d8ac5a] px-5 py-3 text-sm font-semibold text-[#173128]">Ver investigaciones en curso <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/servicios/apoyo-investigacion" className="inline-flex items-center gap-3 border border-white/35 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#173128]">Desarrollar un proyecto</Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section data-navbar-theme="light" className="border-b border-[#cbd6ce] bg-white px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1380px]">
            <header className="grid gap-7 border-b border-[#c7d2ca] pb-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
              <div><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#47705d]">Radar de investigación</p><h2 className="mt-3 max-w-2xl text-3xl font-medium leading-[1.06] tracking-[-.04em] md:text-5xl">Seis líneas, cada una en una fase verificable.</h2></div>
              <div className="flex flex-col gap-5 lg:items-end"><p className="max-w-2xl text-sm leading-6 text-[#586b61] md:text-base">Este es el panorama ejecutivo. En Investigaciones puedes revisar el objetivo, el trabajo en curso y el detalle de cada proyecto.</p><Link href="/research#portafolio" className="group inline-flex w-fit items-center gap-3 bg-[#123f2e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d5c43]">Abrir todas las investigaciones <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
            </header>
            <div className="divide-y divide-[#d2dbd4] border-b border-[#d2dbd4]">
              {projects.map(([code, title, phase, tag]) => (
                <Link key={code} href="/research#portafolio" className="group grid gap-4 py-6 transition-colors hover:bg-[#f4f7f4] md:grid-cols-[.7fr_1.5fr_.7fr_auto] md:items-center md:px-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#698076]">{code}</span>
                  <strong className="text-base font-medium tracking-[-.02em] md:text-lg">{title}</strong>
                  <span><span className="block text-[9px] font-semibold uppercase tracking-[.16em] text-[#829087]">Fase actual</span><span className="mt-1 block text-xs text-[#4f6258]">{phase}</span></span>
                  <span className="w-fit rounded-full border border-[#bfcfc4] px-3 py-1.5 text-[10px] font-semibold text-[#315d47]">{tag}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section data-navbar-theme="light" className="border-b border-[#ccd8d0] bg-[#e8eee9]">
          <div className="mx-auto grid max-w-[1380px] divide-y divide-[#ccd8d0] px-5 md:grid-cols-[1.1fr_.9fr_.9fr] md:divide-x md:divide-y-0 md:px-10">
            {[['Enfoque', 'Investigación aplicada con trazabilidad técnica'], ['Conexión', 'Laboratorio, bioinformática y validación en campo'], ['Usuarios', 'Empresas, universidades e investigadores']].map(([label, value], index) => <div key={label} className={`py-6 ${index === 0 ? 'md:pr-8' : index === 1 ? 'md:px-8' : 'md:pl-8'}`}><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#60766c]">{label}</p><p className="mt-2 text-sm font-medium">{value}</p></div>)}
          </div>
        </section>

        <section data-navbar-theme="light" className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1380px]">
            <ScrollReveal className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#4f7664]">Capacidades científicas</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-.035em] md:text-5xl">Una plataforma, varias disciplinas.</h2></div><p className="max-w-2xl text-base leading-7 text-[#52675e] lg:justify-self-end">Integramos técnicas microbiológicas, moleculares, bioquímicas y vegetales para abordar cada problema desde más de una escala de análisis.</p></ScrollReveal>
            <div className="mt-12 divide-y divide-[#cbd7cf] border-y border-[#cbd7cf]">
              {capabilities.map(({ icon: Icon, title, text }, index) => <ScrollReveal key={title}><article className="group grid gap-5 py-7 transition-colors hover:bg-white/65 md:grid-cols-[70px_70px_1fr_1.25fr] md:items-center md:px-5"><span className="text-xs font-semibold tracking-[.18em] text-[#769083]">0{index + 1}</span><span className="grid h-11 w-11 place-items-center border border-[#b8cbbf] bg-white text-[#246447] transition group-hover:border-[#246447] group-hover:bg-[#246447] group-hover:text-white"><Icon className="h-5 w-5" /></span><h3 className="text-lg font-medium">{title}</h3><p className="text-sm leading-6 text-[#586b61]">{text}</p></article></ScrollReveal>)}
            </div>
          </div>
        </section>

        <section id="plataformas" data-navbar-theme="dark" className="scroll-mt-24 overflow-hidden bg-[#071f18] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-semibold text-[#9dc7b1]">Plataformas de investigación</p><h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-.04em] md:text-5xl">Un problema puede necesitar más de una disciplina.</h2></div><p className="max-w-2xl text-sm leading-7 text-white/60 lg:justify-self-end md:text-base">Selecciona una plataforma para revisar qué preguntas aborda, cómo se trabaja y qué tipo de evidencia puede entregar.</p></div>
            <div className="mt-8 grid border border-white/15 lg:grid-cols-[.38fr_1fr]">
              <div className="border-b border-white/15 bg-white/[0.025] lg:border-b-0 lg:border-r">
                {platforms.map(({ name, icon: Icon }, index) => <button key={name} type="button" onClick={() => setActivePlatform(index)} className={`grid w-full grid-cols-[38px_1fr] items-center gap-3 border-b border-white/10 px-5 py-5 text-left transition last:border-b-0 ${activePlatform === index ? 'bg-[#dfeae3] text-[#12372b]' : 'text-white/68 hover:bg-white/[0.06] hover:text-white'}`}><Icon className="h-5 w-5" /><span className="text-sm font-semibold">{name}</span></button>)}
              </div>
              <motion.div key={platform.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-9">
                <h3 className="max-w-2xl text-2xl font-medium tracking-[-.03em] md:text-3xl">{platform.title}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">{platform.text}</p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {[['Métodos y operaciones', platform.methods], ['Resultados que pueden formar parte del proyecto', platform.results]].map(([label, items]) => <div key={label as string} className="border border-white/15 p-5"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#9fc8b2]">{label as string}</p><div className="mt-4 space-y-2">{(items as string[]).map(item => <div key={item} className="flex items-center gap-2 text-xs text-white/72"><Check className="h-3.5 w-3.5 text-[#d8ac5a]" />{item}</div>)}</div></div>)}
                </div>
                <Link href={platform.href} className="mt-7 inline-flex items-center gap-3 bg-[#dfeae3] px-5 py-3 text-xs font-semibold text-[#12372b]">Explorar esta capacidad <ArrowRight className="h-4 w-4" /></Link>
              </motion.div>
            </div>
            <div className="grid border-x border-b border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {process.map(([number, title, text]) => <div key={number} className="min-h-48 border-b border-r border-white/15 p-5 last:border-r-0 sm:border-b-0"><span className="text-[10px] text-[#d8ac5a]">{number}</span><h3 className="mt-8 text-base font-medium">{title}</h3><p className="mt-3 text-xs leading-5 text-white/55">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#0b3024] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="absolute right-[-6rem] top-[-7rem] h-[28rem] w-[28rem] rounded-full border border-white/10" /><div className="absolute right-[3rem] top-[2rem] h-[15rem] w-[15rem] rounded-full border border-[#8ab79e]/20" />
          <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <ScrollReveal><div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.22em] text-[#9fc8b2]"><Network className="h-4 w-4" />Modelo de colaboración</div><h2 className="mt-5 max-w-xl text-3xl font-medium leading-tight tracking-[-.035em] md:text-5xl">Del objetivo experimental a evidencia utilizable.</h2><p className="mt-6 max-w-xl text-base leading-7 text-white/70">Cada proyecto parte de una pregunta concreta. El alcance, las técnicas y los entregables se definen antes de iniciar para que los resultados respondan al objetivo científico o productivo.</p></ScrollReveal>
            <div className="border-l border-t border-white/15">{["Diseño metodológico y definición del alcance", "Desarrollo y adaptación de protocolos", "Ejecución experimental y trazabilidad", "Interpretación técnica de resultados", "Datos, informes y soporte para publicación"].map((item, index) => <div key={item} className="grid grid-cols-[48px_1fr] border-b border-r border-white/15 p-4"><span className="text-xs text-[#d8ac5a]">0{index + 1}</span><span className="text-sm text-white/80">{item}</span></div>)}</div>
          </div>
        </section>

        <section data-navbar-theme="light" className="bg-white px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-2">
            <ScrollReveal className="relative min-h-[410px] overflow-hidden bg-[#dfe9e2]"><Image src="/research/research-lab.png" alt="Análisis e interpretación de datos científicos en AS Laboratorios" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#09281f]/80 via-transparent to-transparent" /><div className="absolute bottom-0 p-7 text-white md:p-10"><Binary className="mb-4 h-6 w-6" /><h3 className="text-2xl font-medium">Datos con contexto</h3><p className="mt-2 max-w-md text-sm leading-6 text-white/75">Resultados organizados para facilitar interpretación, comparación y toma de decisiones.</p></div></ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {[{ icon: Building2, title: 'Proyectos de empresa', text: 'Evaluación de prototipos, procesos, formulaciones, microorganismos y materias primas.' }, { icon: Dna, title: 'Investigación académica', text: 'Soporte técnico para tesis y proyectos, desde el diseño hasta la interpretación.' }, { icon: Network, title: 'Laboratorios centrales', text: 'Procesamiento especializado, biotecnología vegetal, microbiología y soporte científico en Ca. 30, Urb. San Isidro II, Trujillo 13001.' }].map(({ icon: Icon, title, text }) => <div key={title} className="border border-[#cbd6ce] bg-[#f7f9f7] p-6 last:sm:col-span-2"><Icon className="h-5 w-5 text-[#246447]" /><h3 className="mt-8 text-lg font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-[#5a6b62]">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section data-navbar-theme="dark" className="bg-[#1a251f] px-5 py-16 text-white md:px-10 md:py-20"><div className="mx-auto flex max-w-[1380px] flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#9bb5a7]">Inicia una colaboración</p><h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-.03em] md:text-4xl">Cuéntanos qué necesitas investigar.</h2></div><Link href="/servicios/apoyo-investigacion" className="group inline-flex w-fit items-center gap-4 bg-white px-6 py-4 text-sm font-semibold text-[#17372b] transition hover:bg-[#dce9df]">Presentar un proyecto<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div></section>
      </main>
      <Footer />
    </>
  )
}
