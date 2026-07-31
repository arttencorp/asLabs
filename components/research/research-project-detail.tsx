"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  Beaker,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleDot,
  Clock3,
  Dna,
  FlaskConical,
  Layers3,
  MapPin,
  Microscope,
  Network,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"
import type { ResearchProjectDetail, ResearchMilestoneStatus } from "@/data/research-project-details"
import { researchProjectList } from "@/data/research-project-details"

const themeStyles = {
  leaf: {
    solid: "#2e8b57",
    bright: "#9ce6ad",
    soft: "#e9f5eb",
    border: "#cfe5d4",
    gradient: "from-[#0b402b] via-[#135638] to-[#276947]",
  },
  cyan: {
    solid: "#18868b",
    bright: "#8fe4de",
    soft: "#e7f7f5",
    border: "#c9e8e5",
    gradient: "from-[#083b3a] via-[#0b5152] to-[#147477]",
  },
  blue: {
    solid: "#3477a5",
    bright: "#9dd7f3",
    soft: "#eaf4f9",
    border: "#cee3ee",
    gradient: "from-[#102f4e] via-[#184f75] to-[#287399]",
  },
  indigo: {
    solid: "#5369a5",
    bright: "#b7c4ff",
    soft: "#eef0fb",
    border: "#d9def3",
    gradient: "from-[#172d51] via-[#294570] to-[#4b5f91]",
  },
  violet: {
    solid: "#6c5b91",
    bright: "#d3bff1",
    soft: "#f2eef8",
    border: "#e1d8ed",
    gradient: "from-[#2e2447] via-[#4d3c6f] to-[#705b91]",
  },
} as const

const milestoneLabel: Record<ResearchMilestoneStatus, string> = {
  completed: "Completado",
  active: "En desarrollo",
  pending: "Siguiente etapa",
}

export default function ResearchProjectDetail({ project }: { project: ResearchProjectDetail }) {
  const theme = themeStyles[project.theme]
  const related = researchProjectList.filter((item) => item.slug !== project.slug).slice(0, 3)

  return (
    <>
      <Navbar overlay />
      <main className="overflow-hidden bg-[#f4f7f4] text-[#18392b]">
        <section
          data-navbar-theme="dark"
          className={`relative min-h-[690px] overflow-hidden bg-gradient-to-br ${theme.gradient} pb-20 pt-28 text-white sm:pt-32 lg:min-h-[730px]`}
        >
          <div className="absolute inset-0">
            <Image
              src={project.heroImage}
              alt={project.heroImageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,25,18,.97)_0%,rgba(5,32,23,.91)_47%,rgba(5,32,23,.44)_78%,rgba(5,32,23,.24)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,28,20,.78),transparent_52%)]" />
          </div>

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,.8) 1px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -right-24 top-28 h-[420px] w-[420px] rounded-full border border-white/[0.14]"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute left-10 top-20 h-3 w-3 rounded-full shadow-[0_0_22px_currentColor]"
              style={{ backgroundColor: theme.bright, color: theme.bright }}
            />
            <span className="absolute bottom-16 right-16 h-2 w-2 rounded-full bg-white/70" />
          </motion.div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-end lg:px-8 lg:pt-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.1] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-lg">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: theme.bright }} />
                  {project.eyebrow}
                </span>
                <span className="rounded-full border border-white/15 bg-black/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/75 backdrop-blur-lg">
                  {project.code}
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.55rem,6.2vw,5.45rem)] font-black leading-[.98] tracking-[-.055em] text-white">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                {project.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#resumen"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#143629] shadow-[0_16px_35px_-18px_rgba(0,0,0,.65)] transition duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: theme.bright }}
                >
                  Explorar proyecto <ArrowDown className="h-4 w-4" />
                </a>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.1] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/[0.18]"
                >
                  Todas las investigaciones <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[28px] border border-white/15 bg-[#071f18]/60 p-5 shadow-[0_32px_80px_-36px_rgba(0,0,0,.85)] backdrop-blur-xl sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-white">
                  <span
                    className="relative flex h-2.5 w-2.5"
                    style={{ color: theme.bright }}
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
                  </span>
                  {project.status}
                </span>
                <span className="text-xs font-black" style={{ color: theme.bright }}>{project.progress}%</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(project.progress, 2)}%` }}
                  transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: theme.bright }}
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-white/90">{project.phase}</p>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <HeroFact icon={CalendarDays} label="Periodo" value={project.period} />
                <HeroFact icon={MapPin} label="Ubicación" value={project.location} />
                <HeroFact icon={Layers3} label="Línea" value={project.line} />
                <HeroFact icon={Target} label="Enfoque" value={project.scientificFocus} />
              </div>
            </motion.aside>
          </div>
        </section>

        <div data-navbar-theme="light" className="relative z-30 mx-auto -mt-7 w-[calc(100%-2rem)] max-w-5xl">
          <nav
            aria-label="Secciones del proyecto"
            className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-white bg-white/95 p-2 shadow-[0_20px_55px_-32px_rgba(9,43,32,.58)] backdrop-blur-xl [scrollbar-width:none]"
          >
            {[
              ["Resumen", "#resumen"],
              ["Objetivos", "#objetivos"],
              ["Metodología", "#metodologia"],
              ["Avances", "#avances"],
              ["Equipo", "#equipo"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold text-[#607168] transition hover:bg-[#edf3ee] hover:text-[#245f3e]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <section id="resumen" data-navbar-theme="light" className="scroll-mt-28 px-4 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)]">
            <ScrollReveal className="rounded-[32px] border border-[#dbe5dd] bg-white p-6 shadow-[0_28px_70px_-50px_rgba(15,60,38,.48)] sm:p-9">
              <SectionKicker icon={Microscope}>El desafío científico</SectionKicker>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-[1.05] tracking-[-.035em] text-[#173b2b] sm:text-4xl">
                Comprender primero. Diseñar una respuesta después.
              </h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {project.context.map((paragraph, index) => (
                  <p key={paragraph} className={`text-sm leading-7 text-[#64766d] ${index === 0 ? "md:border-r md:border-[#e1e8e2] md:pr-5" : ""}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="relative overflow-hidden rounded-[32px] p-7 text-white sm:p-9" direction="left">
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/15" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.12]">
                  <Dna className="h-6 w-6" style={{ color: theme.bright }} />
                </div>
                <p className="mt-10 text-[10px] font-bold uppercase tracking-[.17em] text-white/[0.55]">Pregunta central</p>
                <p className="mt-3 text-xl font-black leading-snug text-white">{project.scientificFocus}</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="text-xs leading-6 text-white/[0.65]">
                    El proyecto se comunica como investigación en curso. Sus productos se presentan como resultados esperados hasta completar la validación correspondiente.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="objetivos" data-navbar-theme="light" className="scroll-mt-28 border-y border-[#dee7e0] bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
              <div>
                <SectionKicker icon={Target}>Dirección del proyecto</SectionKicker>
                <h2 className="mt-5 text-3xl font-black leading-[1.05] tracking-[-.035em] text-[#173b2b] sm:text-5xl">
                  Objetivos claros, evidencia verificable.
                </h2>
              </div>
              <div className="rounded-[26px] border p-6 sm:p-7" style={{ backgroundColor: theme.soft, borderColor: theme.border }}>
                <p className="text-[10px] font-black uppercase tracking-[.16em]" style={{ color: theme.solid }}>Objetivo general</p>
                <p className="mt-3 text-base font-semibold leading-7 text-[#294b3a] sm:text-lg">{project.objective}</p>
              </div>
            </ScrollReveal>

            <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
              {project.specificObjectives.map((objective, index) => (
                <StaggerItem key={objective} className="h-full">
                  <article className="group flex h-full items-start gap-4 rounded-[24px] border border-[#dce5de] bg-[#f8faf8] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-6">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-black"
                      style={{ color: theme.solid, backgroundColor: theme.soft }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-sm font-semibold leading-6 text-[#4e6559]">{objective}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section id="metodologia" data-navbar-theme="light" className="scroll-mt-28 bg-[#edf2ed] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="max-w-3xl">
              <SectionKicker icon={FlaskConical}>Ruta metodológica</SectionKicker>
              <h2 className="mt-5 text-3xl font-black leading-[1.05] tracking-[-.035em] text-[#173b2b] sm:text-5xl">
                Del material biológico a una conclusión defendible.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#66786f]">
                Cada etapa produce controles y registros que preparan la siguiente, reduciendo pérdidas de información.
              </p>
            </ScrollReveal>

            <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
              {project.methodology.map((method, index) => {
                const MethodIcon = [Dna, Microscope, Beaker, Network][index % 4]
                return (
                  <StaggerItem key={method.title} className="h-full">
                    <article className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[28px] border border-[#d8e3da] bg-white p-6 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-40px_rgba(17,57,42,.65)]">
                      <div className="flex items-start justify-between">
                        <span
                          className="grid h-12 w-12 place-items-center rounded-2xl transition duration-300 group-hover:scale-105"
                          style={{ color: theme.solid, backgroundColor: theme.soft }}
                        >
                          <MethodIcon className="h-6 w-6" />
                        </span>
                        <span className="text-4xl font-black text-[#e4ebe5]">0{index + 1}</span>
                      </div>
                      <h3 className="mt-10 text-xl font-black tracking-[-.02em] text-[#224333]">{method.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#687970]">{method.description}</p>
                      <div className="mt-auto pt-6">
                        <div className="h-1 w-10 rounded-full transition-all duration-500 group-hover:w-20" style={{ backgroundColor: theme.solid }} />
                      </div>
                    </article>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </section>

        <section id="avances" data-navbar-theme="light" className="scroll-mt-28 bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <ScrollReveal>
              <SectionKicker icon={Clock3}>Avances del proyecto</SectionKicker>
              <h2 className="mt-5 text-3xl font-black leading-[1.05] tracking-[-.035em] text-[#173b2b] sm:text-5xl">
                Un proceso visible, etapa por etapa.
              </h2>
              <p className="mt-5 text-base leading-7 text-[#66786f]">
                El estado diferencia actividades completadas, trabajo en desarrollo y próximas fases.
              </p>
              <div className="mt-8 rounded-[24px] border p-5" style={{ backgroundColor: theme.soft, borderColor: theme.border }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-[#426052]">Progreso general comunicado</span>
                  <strong className="text-2xl" style={{ color: theme.solid }}>{project.progress}%</strong>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(project.progress, 2)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: theme.solid }}
                  />
                </div>
              </div>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute bottom-8 left-[19px] top-8 w-px bg-[#dbe5dd] sm:left-[27px]" />
              <StaggerGroup className="space-y-4" staggerDelay={0.1}>
                {project.milestones.map((milestone, index) => (
                  <StaggerItem key={milestone.title}>
                    <article className="relative flex gap-4 sm:gap-6">
                      <MilestoneMarker status={milestone.status} color={theme.solid} soft={theme.soft} />
                      <div className="flex-1 rounded-[24px] border border-[#dce5de] bg-[#f9fbf9] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-base font-black text-[#244534]">{milestone.title}</p>
                          <span
                            className="rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em]"
                            style={{
                              color: milestone.status === "pending" ? "#66766e" : theme.solid,
                              backgroundColor: milestone.status === "pending" ? "#e9eeea" : theme.soft,
                            }}
                          >
                            {milestoneLabel[milestone.status]}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[#6a7b72]">{milestone.description}</p>
                        <span className="mt-4 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9aaba1]">Etapa {String(index + 1).padStart(2, "0")}</span>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>

        <section data-navbar-theme="dark" className={`bg-gradient-to-br ${theme.gradient} px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8`}>
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[.18em]" style={{ color: theme.bright }}>Resultados esperados</span>
                <h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-.035em] text-white sm:text-5xl">
                  Lo que este proyecto busca habilitar.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-white/[0.65] lg:justify-self-end sm:text-base">
                Estos productos representan metas de investigación. Su comunicación final dependerá de la validación técnica y documental de los resultados.
              </p>
            </ScrollReveal>
            <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-3" staggerDelay={0.1}>
              {project.expectedOutputs.map((output, index) => {
                const OutputIcon = [CircleDot, Target, Sparkles][index % 3]
                return (
                  <StaggerItem key={output.title} className="h-full">
                    <article className="group flex h-full min-h-[230px] flex-col rounded-[28px] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.11] sm:p-7">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.1]" style={{ color: theme.bright }}>
                        <OutputIcon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-8 text-xl font-black text-white">{output.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/60">{output.description}</p>
                    </article>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </section>

        <section id="equipo" data-navbar-theme="light" className="scroll-mt-28 bg-[#f4f7f4] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionKicker icon={UsersRound}>Responsables</SectionKicker>
                <h2 className="mt-5 text-3xl font-black tracking-[-.035em] text-[#173b2b] sm:text-5xl">Equipo del proyecto</h2>
              </div>
              <a
                href="mailto:info@aslaboratorios.com"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#cad8cc] bg-white px-5 py-3 text-sm font-bold text-[#29573e] transition hover:-translate-y-0.5 hover:border-[#91b199]"
              >
                Contactar al equipo <ArrowRight className="h-4 w-4" />
              </a>
            </ScrollReveal>
            <StaggerGroup className={`mt-10 grid gap-4 ${project.team.length === 1 ? "max-w-2xl" : "md:grid-cols-2"}`}>
              {project.team.map((member) => (
                <StaggerItem key={member.name} className="h-full">
                  <article className="flex h-full gap-5 rounded-[28px] border border-[#dbe5dd] bg-white p-6 shadow-[0_20px_50px_-40px_rgba(16,57,40,.55)] sm:p-7">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-black" style={{ backgroundColor: theme.soft, color: theme.solid }}>
                      {member.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
                    </span>
                    <div>
                      <h3 className="text-lg font-black leading-snug text-[#244534]">{member.name}</h3>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[.14em]" style={{ color: theme.solid }}>{member.role}</p>
                      <p className="mt-4 text-sm leading-6 text-[#687970]">{member.focus}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section data-navbar-theme="light" className="border-t border-[#dfe7e1] bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#4e7d5f]">Portafolio científico</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-[#173b2b]">Otras investigaciones</h2>
              </div>
              <Link href="/research" className="hidden items-center gap-2 text-sm font-bold text-[#39714e] sm:inline-flex">Ver todas <ArrowRight className="h-4 w-4" /></Link>
            </ScrollReveal>
            <StaggerGroup className="mt-9 grid gap-4 md:grid-cols-3" staggerDelay={0.08}>
              {related.map((item) => (
                <StaggerItem key={item.slug} className="h-full">
                  <Link href={`/research/${item.slug}`} className="group flex h-full flex-col rounded-[24px] border border-[#dce5de] bg-[#f8faf8] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#a9c3af] hover:bg-white hover:shadow-lg">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[9px] font-black uppercase tracking-[.14em] text-[#6e8076]">{item.line}</span>
                      <ArrowRight className="h-4 w-4 text-[#9aaba1] transition group-hover:translate-x-1 group-hover:text-[#39714e]" />
                    </div>
                    <h3 className="mt-6 text-lg font-black text-[#244534]">{item.shortTitle}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#6a7b72]">{item.summary}</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function HeroFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
      <Icon className="h-4 w-4 text-white/[0.45]" />
      <p className="mt-3 text-[9px] font-bold uppercase tracking-[.12em] text-white/40">{label}</p>
      <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-white/80">{value}</p>
    </div>
  )
}

function SectionKicker({
  icon: Icon,
  children,
}: {
  icon: typeof Microscope
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#d4e1d6] bg-white px-3.5 py-2 text-[10px] font-black uppercase tracking-[.15em] text-[#39714e] shadow-sm">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  )
}

function MilestoneMarker({
  status,
  color,
  soft,
}: {
  status: ResearchMilestoneStatus
  color: string
  soft: string
}) {
  return (
    <span
      className="relative z-10 mt-5 grid h-10 w-10 shrink-0 place-items-center rounded-full border-[5px] border-white shadow-sm sm:h-14 sm:w-14"
      style={{
        color: status === "pending" ? "#809087" : color,
        backgroundColor: status === "pending" ? "#e8eeea" : soft,
      }}
    >
      {status === "completed" ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : status === "active" ? <CircleDot className="h-4 w-4 sm:h-5 sm:w-5" /> : <Clock3 className="h-4 w-4 sm:h-5 sm:w-5" />}
    </span>
  )
}
