"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Beaker,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Dna,
  ExternalLink,
  FileCheck2,
  FlaskConical,
  Globe2,
  GraduationCap,
  Handshake,
  Leaf,
  LineChart,
  Mail,
  MapPin,
  Microscope,
  Network,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  TestTube2,
  TrendingUp,
  Users,
} from "lucide-react"

const capabilities = [
  {
    id: "analisis",
    icon: ScanSearch,
    label: "Análisis",
    short: "Decisiones basadas en evidencia",
    title: "Diagnóstico fisicoquímico y microbiológico",
    text: "Convertimos muestras en información accionable para cultivos, procesos, investigación y control de calidad.",
    items: ["Muestras agrícolas y ambientales", "Identificación microbiológica", "Trazabilidad de resultados"],
    color: "#f0a23a",
  },
  {
    id: "biotecnologia",
    icon: Sprout,
    label: "Biotecnología vegetal",
    short: "Material vegetal confiable",
    title: "Propagación in vitro y calidad genética",
    text: "Integramos selección, multiplicación y aclimatación para iniciar cultivos con material homogéneo y trazable.",
    items: ["Clones in vitro", "Protocolos por cultivo", "Escalamiento productivo"],
    color: "#85c96d",
  },
  {
    id: "biocontrol",
    icon: FlaskConical,
    label: "Control biológico",
    short: "Soluciones desde la microbiología",
    title: "Microorganismos con propósito agrícola",
    text: "Estudiamos cepas y formulaciones orientadas a desafíos productivos concretos y validación en condiciones de uso.",
    items: ["Selección de microorganismos", "Ensayos y caracterización", "Validación aplicada"],
    color: "#66c8af",
  },
  {
    id: "investigacion",
    icon: Dna,
    label: "I+D aplicada",
    short: "Conocimiento que se transfiere",
    title: "Investigación conectada con el territorio",
    text: "Articulamos capacidades científicas, aliados y productores para convertir preguntas relevantes en soluciones transferibles.",
    items: ["Diseño experimental", "Alianzas técnico-científicas", "Transferencia y formación"],
    color: "#a9d650",
  },
]

const fundingRoutes = [
  {
    icon: Rocket,
    title: "ProInnóvate",
    label: "Innovación y validación",
    text: "Instrumentos para proyectos de innovación, desarrollo productivo, digitalización, calidad y sostenibilidad.",
    fit: ["Prototipos y pilotos", "Validación técnica", "Capacidad productiva"],
  },
  {
    icon: Microscope,
    title: "Fondos de CTI",
    label: "Investigación aplicada",
    text: "Convocatorias de ciencia, tecnología e innovación para generar evidencia, propiedad intelectual y capacidades.",
    fit: ["Biocontrol", "Genética e in vitro", "Equipamiento científico"],
  },
  {
    icon: Handshake,
    title: "Alianzas productivas",
    label: "Escalamiento territorial",
    text: "Concursos y mecanismos de cofinanciamiento articulados con redes productivas, academia y entidades públicas.",
    fit: ["Paquetes tecnológicos", "Adopción en campo", "Transferencia regional"],
  },
]

const roadmap = [
  {
    year: "2026",
    phase: "Estructurar",
    title: "Portafolio listo para competir",
    text: "Priorización de proyectos, línea base, madurez tecnológica, socios y expedientes por instrumento.",
    outputs: ["Ficha técnica", "Presupuesto", "Indicadores"],
  },
  {
    year: "2027",
    phase: "Validar",
    title: "Pilotos con evidencia",
    text: "Ejecución de ensayos, fortalecimiento de procesos y generación de resultados verificables.",
    outputs: ["Pilotos", "Protocolos", "Validación"],
  },
  {
    year: "2028",
    phase: "Escalar",
    title: "Capacidad y trazabilidad",
    text: "Mejora de infraestructura, calidad, producción y despliegue con aliados en nuevos territorios.",
    outputs: ["Calidad", "Escala", "Cobertura"],
  },
  {
    year: "2029",
    phase: "Transferir",
    title: "Impacto replicable",
    text: "Paquetes tecnológicos, formación, adopción y medición de resultados productivos y ambientales.",
    outputs: ["Transferencia", "Adopción", "Impacto"],
  },
]

const allocation = [
  { label: "Validación y pilotos", value: 35, color: "#f0a23a" },
  { label: "Equipamiento y escala", value: 25, color: "#5fb678" },
  { label: "Talento e I+D", value: 20, color: "#93cf7b" },
  { label: "Calidad y regulación", value: 12, color: "#66c8af" },
  { label: "Transferencia e impacto", value: 8, color: "#d7e8a6" },
]

const impact = [
  { label: "Validación científica", value: 94, note: "Evidencia y protocolos" },
  { label: "Productividad agrícola", value: 88, note: "Soluciones aplicables" },
  { label: "Sostenibilidad", value: 84, note: "Menor presión ambiental" },
  { label: "Transferencia", value: 78, note: "Capacidad local" },
]

const chapterLinks = [
  ["01", "Tesis", "#tesis"],
  ["02", "Plataforma", "#plataforma"],
  ["03", "Evidencia", "#evidencia"],
  ["04", "Fondos", "#fondos"],
  ["05", "Roadmap", "#roadmap"],
  ["06", "Contacto", "#contacto-fondos"],
]

export default function PitchDeckExperience() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const [activeCapability, setActiveCapability] = useState(capabilities[0])
  const ActiveCapabilityIcon = activeCapability.icon

  return (
    <main className="overflow-hidden bg-[#f2f6f2] text-[#153328]">
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-[#f0a23a] via-[#8bd07a] to-[#49a47c]"
        style={{ scaleX: progress }}
      />

      <section
        data-navbar-theme="dark"
        className="relative isolate min-h-[760px] overflow-hidden bg-[#041f17] pb-28 pt-32 text-white sm:min-h-[820px] sm:pt-36"
      >
        <Image
          src="/new/bannerasnuevo.webp"
          alt="AS Laboratorios, ciencia aplicada al agro"
          fill
          priority
          className="absolute inset-0 -z-30 object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,25,18,.99)_0%,rgba(5,36,25,.94)_45%,rgba(5,36,25,.67)_72%,rgba(3,25,18,.88)_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_78%)]" />

        <motion.div
          aria-hidden
          className="absolute right-[8%] top-[20%] -z-10 hidden h-[420px] w-[420px] rounded-full border border-white/10 lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-9 top-11 h-4 w-4 rounded-full bg-[#ffc56f] shadow-[0_0_34px_rgba(255,197,111,.9)]" />
          <span className="absolute bottom-12 right-7 h-3 w-3 rounded-full bg-[#8fe5aa] shadow-[0_0_30px_rgba(143,229,170,.8)]" />
          <div className="absolute inset-14 rounded-full border border-dashed border-white/10" />
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_.65fr] lg:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#dff7e5] backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-[#ffc66f]" /> Pitch de innovación
              </span>
              <span className="rounded-full border border-[#ffc66f]/35 bg-[#f0a23a]/15 px-4 py-2 text-xs font-bold text-[#ffd59a]">
                Cofinanciamiento no dilutivo
              </span>
            </div>
            <h1 className="mt-7 max-w-5xl text-balance text-4xl font-bold leading-[1.01] tracking-[-.05em] sm:text-6xl lg:text-[4.6rem]">
              Ciencia que convierte desafíos agrícolas en soluciones escalables.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.82] sm:text-lg">
              AS Laboratorios integra análisis, biotecnología vegetal, microbiología e investigación aplicada para llevar innovación útil desde el laboratorio hasta el territorio.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#tesis" className="inline-flex items-center gap-2 rounded-full bg-[#f0a23a] px-6 py-3.5 text-sm font-bold text-[#183428] transition hover:-translate-y-0.5 hover:bg-[#ffc56f]">
                Explorar la propuesta <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#fondos" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/15">
                Ruta de financiamiento <CircleDollarSign className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.16, duration: 0.72 }}
            className="relative rounded-[34px] border border-white/15 bg-[#082d21]/72 p-6 shadow-[0_35px_100px_-42px_rgba(0,0,0,.9)] backdrop-blur-xl sm:p-7"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a8dab5]">Tesis de financiamiento</p>
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
                <ShieldCheck className="h-5 w-5 text-[#ffc66f]" />
              </div>
            </div>
            <p className="mt-8 text-3xl font-bold tracking-[-.035em]">Crecer sin ceder participación accionaria.</p>
            <p className="mt-4 text-sm leading-6 text-white/[0.7]">
              Buscamos concursos financiados, fondos de innovación y alianzas que aceleren validación, equipamiento y transferencia tecnológica.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-white/12 pt-6">
              {[
                ["1997", "trayectoria"],
                ["6", "países"],
                ["3", "capacidades"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[.12em] text-white/[0.5]">{label}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Capítulos del pitch" className="flex snap-x gap-1 overflow-x-auto rounded-t-[26px] border-x border-t border-white/10 bg-[#031a13]/85 p-2 backdrop-blur-xl">
              {chapterLinks.map(([number, label, href]) => (
                <a key={href} href={href} className="group flex min-w-[145px] flex-1 snap-start items-center justify-between rounded-[18px] px-4 py-3 text-xs font-bold text-white/[0.62] transition hover:bg-white/10 hover:text-white">
                  <span><span className="mr-2 text-[#ffc66f]">{number}</span>{label}</span>
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section id="tesis" data-navbar-theme="light" className="scroll-mt-24 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            number="01"
            eyebrow="La oportunidad"
            title="El agro no necesita más piezas aisladas. Necesita una ruta completa."
            copy="Diagnóstico, material vegetal, soluciones biológicas y validación suelen operar por separado. Nuestra ventaja es conectarlos dentro de una misma plataforma científica."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_.85fr]">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[34px] bg-[#173f2d] p-7 text-white sm:p-9"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#b5dabe]">Problema sistémico</p>
              <h3 className="mt-5 max-w-xl text-3xl font-bold tracking-[-.035em] sm:text-4xl">La brecha está entre saber qué ocurre y poder actuar con confianza.</h3>
              <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  [TestTube2, "Datos dispersos", "Resultados sin una ruta clara de aplicación."],
                  [Sprout, "Calidad variable", "Material de inicio con trazabilidad desigual."],
                  [Network, "Innovación fragmentada", "Poca conexión entre ciencia y territorio."],
                ].map(([Icon, title, text]) => {
                  const CardIcon = Icon as typeof TestTube2
                  return (
                    <div key={String(title)} className="rounded-[22px] border border-white/10 bg-white/[0.07] p-5">
                      <CardIcon className="h-5 w-5 text-[#ffc66f]" />
                      <p className="mt-6 font-bold">{String(title)}</p>
                      <p className="mt-2 text-xs leading-5 text-white/[0.62]">{String(text)}</p>
                    </div>
                  )
                })}
              </div>
            </motion.article>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <InsightCard icon={Target} label="Nuestra respuesta" title="Una plataforma conectada" text="Cada capacidad alimenta a la siguiente y mejora la calidad de las decisiones." />
              <InsightCard icon={TrendingUp} label="Potencial" title="Escala por proyectos" text="El crecimiento se estructura en módulos financiables, medibles y transferibles." accent />
            </div>
          </div>
        </div>
      </section>

      <section id="plataforma" data-navbar-theme="dark" className="scroll-mt-24 bg-[#092f23] px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            dark
            number="02"
            eyebrow="La plataforma"
            title="Cuatro capacidades. Un mismo ciclo de innovación."
            copy="Selecciona una capacidad para entender cómo se integra dentro de la propuesta."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
            <div className="grid gap-2">
              {capabilities.map((item, index) => {
                const Icon = item.icon
                const active = activeCapability.id === item.id
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCapability(item)}
                    onMouseEnter={() => setActiveCapability(item)}
                    whileHover={{ x: 4 }}
                    className={`group flex w-full items-center gap-4 rounded-[22px] border p-4 text-left transition ${
                      active ? "border-white/20 bg-white text-[#173428]" : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.09]"
                    }`}
                  >
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${active ? "bg-[#e8f3ea] text-[#245f3e]" : "bg-white/10 text-[#bce6c6]"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`text-[10px] font-bold uppercase tracking-[.15em] ${active ? "text-[#5e7b69]" : "text-white/[0.48]"}`}>0{index + 1}</span>
                      <span className="mt-1 block font-bold">{item.label}</span>
                      <span className={`mt-0.5 block truncate text-xs ${active ? "text-[#65776e]" : "text-white/[0.56]"}`}>{item.short}</span>
                    </span>
                    <ArrowRight className={`h-4 w-4 transition ${active ? "translate-x-0 text-[#245f3e]" : "-translate-x-1 text-white/40 group-hover:translate-x-0"}`} />
                  </motion.button>
                )
              })}
            </div>

            <motion.article
              key={activeCapability.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38 }}
              className="relative min-h-[470px] overflow-hidden rounded-[34px] border border-white/12 bg-[#041f17] p-7 sm:p-10"
            >
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_80%_10%,rgba(149,219,123,.45),transparent_28%)]" />
              <motion.div
                aria-hidden
                className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-[20px]" style={{ backgroundColor: `${activeCapability.color}22`, color: activeCapability.color }}>
                  <ActiveCapabilityIcon className="h-7 w-7" />
                </div>
                <p className="mt-10 text-xs font-bold uppercase tracking-[.18em]" style={{ color: activeCapability.color }}>{activeCapability.label}</p>
                <h3 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-.035em] sm:text-4xl">{activeCapability.title}</h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/[0.7] sm:text-base">{activeCapability.text}</p>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {activeCapability.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.055] p-4 text-sm font-semibold text-white/[0.82]">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10">
                        <Check className="h-3.5 w-3.5" style={{ color: activeCapability.color }} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a8dab5]">Ciclo conectado</p>
            <div className="mt-7 grid gap-3 md:grid-cols-5">
              {[
                [Beaker, "Muestra"],
                [ScanSearch, "Diagnóstico"],
                [ClipboardCheck, "Protocolo"],
                [FlaskConical, "Solución"],
                [BadgeCheck, "Validación"],
              ].map(([Icon, label], index) => {
                const FlowIcon = Icon as typeof Beaker
                return (
                  <div key={String(label)} className="relative flex items-center gap-3 md:flex-col md:items-start">
                    <motion.span
                      initial={{ scale: 0.75, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 }}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#bde8c8]"
                    >
                      <FlowIcon className="h-5 w-5" />
                    </motion.span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#ffc66f]">0{index + 1}</span>
                      <p className="font-bold">{String(label)}</p>
                    </div>
                    {index < 4 && <span className="absolute left-[22px] top-12 hidden h-px w-[calc(100%-12px)] bg-gradient-to-r from-[#8bcf9b] to-transparent md:block" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="evidencia" data-navbar-theme="light" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            number="03"
            eyebrow="Base para crecer"
            title="Trayectoria, registros y alcance que reducen la distancia hacia el impacto."
            copy="El valor no parte de cero: se apoya en experiencia operativa, capacidades instaladas y una red en expansión."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <EvidenceCard value="1997" label="Año de origen" text="Experiencia acumulada en el sector agroindustrial." icon={Building2} />
            <EvidenceCard value="6" label="Países alcanzados" text="Clientes y relaciones en Latinoamérica y Europa." icon={Globe2} />
            <EvidenceCard value="SENASA" label="Registro de vivero" text="Base formal para nuestra operación de material vegetal." icon={ShieldCheck} small />
            <EvidenceCard value="RNP" label="Proveedor nacional" text="Capacidad para participar en oportunidades del Estado." icon={FileCheck2} small />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <article className="rounded-[34px] border border-[#dce6de] bg-[#f5f8f5] p-7 sm:p-9">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-[#4e7d5f]">Mapa de impacto</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-.03em] sm:text-3xl">Prioridades del portafolio</h3>
                </div>
                <span className="text-xs text-[#819087]">Índice conceptual · no financiero</span>
              </div>
              <div className="mt-9 space-y-6">
                {impact.map((item, index) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="mt-0.5 text-xs text-[#7a8c82]">{item.note}</p>
                      </div>
                      <span className="text-xs font-bold text-[#3c7451]">{item.value >= 90 ? "Crítica" : item.value >= 82 ? "Alta" : "Estratégica"}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#dfe8e1]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#245f3e] via-[#4f9b65] to-[#9bcc79]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[34px] bg-[#e6efe8] p-7 sm:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#c8dbcD]" />
              <LineChart className="h-7 w-7 text-[#2d744a]" />
              <h3 className="mt-8 text-2xl font-bold tracking-[-.03em]">Una propuesta medible desde el diseño</h3>
              <p className="mt-4 text-sm leading-7 text-[#607369]">Cada postulación se formula con resultados, hitos, medios de verificación y una ruta de sostenibilidad adecuada a las bases del concurso.</p>
              <div className="relative mt-9 grid gap-3 sm:grid-cols-2">
                {["Madurez tecnológica", "Resultados de piloto", "Personas beneficiarias", "Adopción y transferencia"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-[18px] bg-white/80 p-4"
                  >
                    <span className="text-[10px] font-bold text-[#89a093]">0{index + 1}</span>
                    <p className="mt-2 text-sm font-bold">{item}</p>
                  </motion.div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="fondos" data-navbar-theme="dark" className="scroll-mt-24 bg-[#071f18] px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.78fr] lg:items-end">
            <SectionIntro
              dark
              number="04"
              eyebrow="Tesis de financiamiento"
              title="Competimos por fondos. Conservamos la empresa."
              copy="La ruta prioritaria es el cofinanciamiento no reembolsable y la colaboración estratégica, no una ronda a cambio de acciones."
            />
            <div className="rounded-[26px] border border-[#f0a23a]/30 bg-[#f0a23a]/10 p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f0a23a] text-[#173428]"><ShieldCheck className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffd59a]">Principio de la propuesta</p>
                  <p className="mt-1 font-bold text-white">Sin oferta de participación accionaria</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {fundingRoutes.map((route, index) => (
              <motion.article
                key={route.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-[30px] border border-white/10 bg-white/[0.06] p-7 transition hover:border-white/20 hover:bg-white/[0.085]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-13 w-13 place-items-center rounded-[18px] bg-white/10 p-3.5 text-[#bde8c8]">
                    <route.icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs font-bold text-white/30">0{index + 1}</span>
                </div>
                <p className="mt-9 text-xs font-bold uppercase tracking-[.16em] text-[#ffc66f]">{route.label}</p>
                <h3 className="mt-3 text-2xl font-bold">{route.title}</h3>
                <p className="mt-4 min-h-[72px] text-sm leading-6 text-white/[0.66]">{route.text}</p>
                <div className="mt-7 space-y-2 border-t border-white/10 pt-6">
                  {route.fit.map((item) => <p key={item} className="flex items-center gap-2 text-sm font-semibold text-white/[0.82]"><Check className="h-4 w-4 text-[#8fd3a0]" /> {item}</p>)}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 rounded-[34px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <FundingDonut />
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#a8dab5]">Asignación referencial</p>
              <h3 className="mt-4 text-3xl font-bold tracking-[-.035em]">Los recursos se convierten en hitos verificables.</h3>
              <p className="mt-4 text-sm leading-7 text-white/[0.65]">La distribución final se adapta a cada instrumento, sus topes, categorías elegibles y exigencias de contrapartida.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {allocation.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 rounded-[16px] bg-white/[0.055] px-4 py-3">
                    <span className="flex items-center gap-2 text-xs font-semibold text-white/[0.76]"><i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.label}</span>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-white/[0.42]">
            La compatibilidad, elegibilidad y disponibilidad de cada instrumento dependen de sus bases y convocatorias vigentes. Esta presentación no afirma una adjudicación ni una convocatoria abierta.
          </p>
        </div>
      </section>

      <section id="roadmap" data-navbar-theme="light" className="scroll-mt-24 bg-[#edf3ee] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            number="05"
            eyebrow="Roadmap propuesto"
            title="De una buena postulación a una capacidad que permanece."
            copy="La línea de tiempo organiza una visión de ejecución; cada proyecto definirá sus propios plazos, entregables y metas."
          />
          <div className="relative mt-16">
            <div className="absolute bottom-0 left-[23px] top-0 w-px bg-[#c5d7c9] lg:bottom-auto lg:left-0 lg:right-0 lg:top-[31px] lg:h-px lg:w-auto" />
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[23px] top-0 h-full w-px origin-top bg-gradient-to-b from-[#245f3e] via-[#65ad76] to-[#f0a23a] lg:hidden"
            />
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-[31px] hidden h-px origin-left bg-gradient-to-r from-[#245f3e] via-[#65ad76] to-[#f0a23a] lg:block"
            />
            <div className="grid gap-8 lg:grid-cols-4">
              {roadmap.map((item, index) => (
                <motion.article
                  key={item.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.14 }}
                  className="relative pl-16 lg:pl-0"
                >
                  <div className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-2xl border-4 border-[#edf3ee] bg-[#245f3e] text-xs font-bold text-white shadow-md lg:relative lg:mb-8">
                    0{index + 1}
                  </div>
                  <div className="rounded-[26px] border border-[#d5e1d7] bg-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#245f3e]">{item.year}</span>
                      <span className="rounded-full bg-[#edf4ee] px-3 py-1 text-[10px] font-bold uppercase tracking-[.13em] text-[#5c7565]">{item.phase}</span>
                    </div>
                    <h3 className="mt-7 text-xl font-bold tracking-[-.02em]">{item.title}</h3>
                    <p className="mt-3 min-h-[96px] text-sm leading-6 text-[#65776e]">{item.text}</p>
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-[#e4ebe5] pt-5">
                      {item.outputs.map((output) => <span key={output} className="rounded-full bg-[#edf4ee] px-3 py-1.5 text-[10px] font-bold text-[#4e6b59]">{output}</span>)}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#4e7d5f]">Modelo de ejecución</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-.04em] sm:text-5xl">Un expediente sólido es solo el comienzo.</h2>
            <p className="mt-5 text-base leading-7 text-[#65776e]">Diseñamos el proyecto para que la gobernanza, la evidencia y la transferencia acompañen todo el ciclo.</p>
            <Link href="/research" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#245f3e]">
              Conocer nuestra investigación <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ExecutionCard icon={Users} title="Gobernanza" text="Responsables, aliados y decisiones claramente definidos." />
            <ExecutionCard icon={BarChart3} title="Seguimiento" text="Hitos, presupuesto e indicadores revisados periódicamente." />
            <ExecutionCard icon={GraduationCap} title="Transferencia" text="Formación y adopción incluidas dentro del proyecto." />
            <ExecutionCard icon={Leaf} title="Sostenibilidad" text="Continuidad técnica y operativa más allá del financiamiento." />
          </div>
        </div>
      </section>

      <section id="contacto-fondos" data-navbar-theme="dark" className="scroll-mt-24 relative overflow-hidden bg-[#092f23] px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-8 top-12 h-64 w-64 rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#b9e3c4]"><Handshake className="h-4 w-4" /> Construyamos la postulación</p>
            <h2 className="mt-6 max-w-4xl text-balance text-4xl font-bold tracking-[-.045em] sm:text-6xl">Una buena convocatoria merece una propuesta a su altura.</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.7]">Buscamos entidades, universidades, redes productivas y equipos que quieran articular proyectos de innovación con impacto medible.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:ventas@aslaboratorios.com?subject=Alianza%20para%20fondo%20concursable" className="inline-flex items-center gap-2 rounded-full bg-[#f0a23a] px-6 py-3.5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc66f]">
                <Mail className="h-4 w-4" /> Conversar sobre una convocatoria
              </a>
              <a href="https://wa.me/51961996645?text=Hola%2C%20quisiera%20conversar%20sobre%20una%20convocatoria%20o%20fondo%20concursable." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold backdrop-blur-xl transition hover:bg-white/15">
                WhatsApp <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <aside className="rounded-[30px] border border-white/12 bg-[#041f17]/65 p-6 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#a8dab5]">AS Laboratorios</p>
            <div className="mt-6 space-y-4 text-sm">
              <p className="flex gap-3 text-white/[0.78]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffc66f]" /> MZ J1 San Isidro II Etapa<br />Trujillo, La Libertad, Perú</p>
              <p className="flex items-center gap-3 text-white/[0.78]"><Mail className="h-4 w-4 shrink-0 text-[#ffc66f]" /> ventas@aslaboratorios.com</p>
            </div>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-xs leading-5 text-white/[0.48]">Presentación institucional para fondos y concursos de innovación. No constituye oferta de valores ni de participación societaria.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

function SectionIntro({
  number,
  eyebrow,
  title,
  copy,
  dark = false,
}: {
  number: string
  eyebrow: string
  title: string
  copy: string
  dark?: boolean
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[.25fr_1fr_.66fr] lg:items-end">
      <div className={`font-mono text-5xl font-bold tracking-[-.06em] ${dark ? "text-white/[0.13]" : "text-[#d4e0d6]"}`}>{number}</div>
      <div>
        <p className={`text-xs font-bold uppercase tracking-[.2em] ${dark ? "text-[#a8dab5]" : "text-[#4e7d5f]"}`}>{eyebrow}</p>
        <h2 className={`mt-5 text-balance text-3xl font-bold tracking-[-.04em] sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-[#173428]"}`}>{title}</h2>
      </div>
      <p className={`text-base leading-7 ${dark ? "text-white/[0.65]" : "text-[#65776e]"}`}>{copy}</p>
    </div>
  )
}

function InsightCard({
  icon: Icon,
  label,
  title,
  text,
  accent = false,
}: {
  icon: typeof Target
  label: string
  title: string
  text: string
  accent?: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`rounded-[30px] border p-7 ${accent ? "border-[#f2d4a8] bg-[#fff3e3]" : "border-[#dce6de] bg-white"}`}
    >
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${accent ? "bg-[#f0a23a] text-[#173428]" : "bg-[#e8f2ea] text-[#245f3e]"}`}><Icon className="h-6 w-6" /></div>
      <p className="mt-8 text-xs font-bold uppercase tracking-[.17em] text-[#6d8575]">{label}</p>
      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#65776e]">{text}</p>
    </motion.article>
  )
}

function EvidenceCard({
  value,
  label,
  text,
  icon: Icon,
  small = false,
}: {
  value: string
  label: string
  text: string
  icon: typeof Globe2
  small?: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="rounded-[28px] border border-[#dce6de] bg-white p-6 shadow-[0_20px_60px_-42px_rgba(18,78,48,.42)]"
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-[#3c8b58]" />
        <BadgeCheck className="h-4 w-4 text-[#9caf9f]" />
      </div>
      <p className={`mt-9 font-bold tracking-[-.04em] text-[#245f3e] ${small ? "text-3xl" : "text-5xl"}`}>{value}</p>
      <p className="mt-3 font-bold">{label}</p>
      <p className="mt-2 text-xs leading-5 text-[#728279]">{text}</p>
    </motion.article>
  )
}

function FundingDonut() {
  let cumulative = 0
  const radius = 82
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative mx-auto grid h-[300px] w-[300px] place-items-center">
      <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90" role="img" aria-label="Asignación referencial de los fondos">
        <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="22" />
        {allocation.map((item, index) => {
          const offset = -((cumulative / 100) * circumference)
          const length = (item.value / 100) * circumference
          cumulative += item.value
          return (
            <motion.circle
              key={item.label}
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="22"
              strokeLinecap="butt"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={offset}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.1 }}
            />
          )
        })}
      </svg>
      <div className="absolute text-center">
        <CircleDollarSign className="mx-auto h-7 w-7 text-[#ffc66f]" />
        <p className="mt-2 text-2xl font-bold">100%</p>
        <p className="text-[10px] uppercase tracking-[.16em] text-white/50">por proyecto</p>
      </div>
    </div>
  )
}

function ExecutionCard({ icon: Icon, title, text }: { icon: typeof Users; title: string; text: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-[26px] border border-[#dce6de] bg-[#f6f9f6] p-6"
    >
      <Icon className="h-6 w-6 text-[#3c8b58]" />
      <h3 className="mt-8 text-lg font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#65776e]">{text}</p>
    </motion.article>
  )
}
