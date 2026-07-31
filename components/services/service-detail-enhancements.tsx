"use client"

import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FlaskConical,
  HelpCircle,
  MessageCircle,
  PackageCheck,
  Send,
} from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

export type ServiceTheme = "orange" | "emerald" | "blue" | "teal" | "purple" | "sky"

const themes = {
  orange: {
    text: "text-orange-700",
    softText: "text-orange-600",
    bg: "bg-orange-500",
    softBg: "bg-orange-50",
    border: "border-orange-200",
    hover: "hover:border-orange-300 hover:bg-orange-50",
    ring: "ring-orange-100",
  },
  emerald: {
    text: "text-emerald-700",
    softText: "text-emerald-600",
    bg: "bg-emerald-500",
    softBg: "bg-emerald-50",
    border: "border-emerald-200",
    hover: "hover:border-emerald-300 hover:bg-emerald-50",
    ring: "ring-emerald-100",
  },
  blue: {
    text: "text-blue-700",
    softText: "text-blue-600",
    bg: "bg-blue-500",
    softBg: "bg-blue-50",
    border: "border-blue-200",
    hover: "hover:border-blue-300 hover:bg-blue-50",
    ring: "ring-blue-100",
  },
  teal: {
    text: "text-teal-700",
    softText: "text-teal-600",
    bg: "bg-teal-500",
    softBg: "bg-teal-50",
    border: "border-teal-200",
    hover: "hover:border-teal-300 hover:bg-teal-50",
    ring: "ring-teal-100",
  },
  purple: {
    text: "text-purple-700",
    softText: "text-purple-600",
    bg: "bg-purple-500",
    softBg: "bg-purple-50",
    border: "border-purple-200",
    hover: "hover:border-purple-300 hover:bg-purple-50",
    ring: "ring-purple-100",
  },
  sky: {
    text: "text-sky-700",
    softText: "text-sky-600",
    bg: "bg-sky-500",
    softBg: "bg-sky-50",
    border: "border-sky-200",
    hover: "hover:border-sky-300 hover:bg-sky-50",
    ring: "ring-sky-100",
  },
} as const

const servicePages = [
  { label: "Fitopatología", href: "/servicios/fitopatologia", summary: "Patógenos en plantas y suelos" },
  { label: "Medio Ambiente", href: "/servicios/medio-ambiente", summary: "Agua, aire y superficies" },
  { label: "Microbiológicos", href: "/servicios/microbiologicos", summary: "Alimentos y control industrial" },
  { label: "Biotecnología Vegetal", href: "/servicios/biotecnologia-vegetal", summary: "Cultivo de tejidos in vitro" },
  { label: "Bacteriología", href: "/servicios/bacteriologia-general", summary: "Cepas, fermentación y bioproductos" },
  { label: "Apoyo a Investigación", href: "/servicios/apoyo-investigacion", summary: "Protocolos y análisis molecular" },
]

type HeroActionsProps = {
  count: number
  theme: ServiceTheme
  whatsappHref: string
}

export function ServiceHeroActions({ count, theme, whatsappHref }: HeroActionsProps) {
  const palette = themes[theme]

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-wrap gap-2">
        <Link
          href="#catalogo"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#173c2b] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-white/90"
        >
          Ver catálogo
          <ArrowDown className="h-4 w-4" />
        </Link>
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-11 items-center gap-2 rounded-full border border-white/35 px-5 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 ${palette.bg}`}
        >
          <MessageCircle className="h-4 w-4" />
          Consultar
        </Link>
      </div>
      <div className="flex items-center gap-2 text-sm text-white/80">
        <span className="font-bold text-white">{count}</span>
        servicios disponibles
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/50" />
        atención técnica
      </div>
    </div>
  )
}

type SectionNavProps = {
  activeHref: string
  theme: ServiceTheme
}

export function ServiceSectionNav({ activeHref, theme }: SectionNavProps) {
  const palette = themes[theme]

  return (
    <div className="relative z-20 mx-auto -mt-5 w-[calc(100%-2rem)] max-w-7xl">
      <div className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-white/90 bg-white/85 p-2 shadow-[0_18px_45px_-24px_rgba(15,55,38,0.42)] backdrop-blur-2xl [scrollbar-width:none]">
        <Link href="/servicios" className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold ${palette.softText} ${palette.softBg}`}>
          Todos los servicios
        </Link>
        {[
          ["Beneficios", "#beneficios"],
          ["Catálogo", "#catalogo"],
          ["Cómo trabajamos", "#proceso"],
          ["Preguntas", "#preguntas"],
        ].map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 rounded-xl px-3.5 py-2 text-xs font-medium text-[#51655b] transition hover:bg-[#edf3ee] hover:text-[#245f3e]">
            {label}
          </Link>
        ))}
        <span className="ml-auto hidden shrink-0 items-center gap-2 px-3 text-[11px] text-[#7b8b82] md:flex">
          <CheckCircle2 className={`h-4 w-4 ${palette.softText}`} />
          Especialidad seleccionada: {servicePages.find((service) => service.href === activeHref)?.label}
        </span>
      </div>
    </div>
  )
}

type ServiceExperienceProps = {
  activeHref: string
  theme: ServiceTheme
  title: string
  whatsappHref: string
  faqs: Array<{ question: string; answer: string }>
}

export function ServiceExperience({ activeHref, theme, title, whatsappHref, faqs }: ServiceExperienceProps) {
  const palette = themes[theme]
  const related = servicePages.filter((service) => service.href !== activeHref).slice(0, 3)
  const steps = [
    { icon: Send, title: "Cuéntanos tu necesidad", text: "Indica el tipo de muestra, objetivo y contexto para orientarte desde el inicio." },
    { icon: PackageCheck, title: "Coordinamos la muestra", text: "Te confirmamos cantidad, condiciones de conservación y forma de entrega." },
    { icon: FlaskConical, title: "Analizamos y verificamos", text: "Aplicamos el método adecuado y controles internos durante el procesamiento." },
    { icon: FileCheck2, title: "Recibes el resultado", text: "Entregamos un informe claro y soporte técnico para resolver tus consultas." },
  ]

  return (
    <>
      <section id="proceso" className="scroll-mt-28 py-5 md:py-8">
        <ScrollReveal>
          <div className={`overflow-hidden rounded-[1.75rem] border ${palette.border} bg-white shadow-[0_22px_70px_-42px_rgba(10,55,36,0.45)]`}>
            <div className="grid gap-7 p-6 md:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${palette.softText}`}>
                  <ClipboardCheck className="h-4 w-4" />
                  Proceso de atención
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-[#183c2d] md:text-3xl">De la consulta al informe, sin incertidumbre</h2>
                <p className="mt-3 text-sm leading-6 text-[#66796f]">
                  Te acompañamos antes, durante y después del análisis de {title.toLowerCase()} para que la muestra llegue correctamente y el resultado sea útil.
                </p>
                <Link href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 ${palette.bg}`}>
                  Revisar mi caso
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <StaggerGroup className="grid gap-3 sm:grid-cols-2" staggerDelay={0.08}>
                {steps.map((step, index) => (
                  <StaggerItem key={step.title}>
                    <div className={`group h-full rounded-2xl border border-[#e4ebe6] bg-[#fbfcfb] p-4 transition ${palette.hover}`}>
                      <div className="flex items-start gap-3">
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${palette.softBg} ${palette.softText}`}>
                          <step.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${palette.softText}`}>Paso {index + 1}</span>
                          <h3 className="mt-0.5 text-sm font-bold text-[#234436]">{step.title}</h3>
                          <p className="mt-1 text-xs leading-5 text-[#6d7e75]">{step.text}</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="preguntas" className="scroll-mt-28 py-7 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal direction="right">
            <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${palette.softText}`}>
              <HelpCircle className="h-4 w-4" />
              Antes de enviar tu muestra
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#183c2d] md:text-3xl">Preguntas frecuentes</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#66796f]">Estas respuestas te ayudan a preparar la solicitud. Si tu caso es especial, nuestro equipo puede revisarlo contigo.</p>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.08}>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details key={faq.question} className={`group rounded-2xl border border-[#dfe7e1] bg-white px-5 py-4 open:ring-4 ${palette.ring}`} open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#234436]">
                    {faq.question}
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${palette.softBg} ${palette.softText} transition group-open:rotate-45`}>+</span>
                  </summary>
                  <p className="pt-3 text-sm leading-6 text-[#687b71]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-7 pt-2 md:pb-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <span className={`text-xs font-bold uppercase tracking-[0.18em] ${palette.softText}`}>También puede interesarte</span>
            <h2 className="mt-2 text-xl font-bold text-[#183c2d]">Otras especialidades del laboratorio</h2>
          </div>
          <Link href="/servicios" className="hidden items-center gap-1 text-xs font-semibold text-[#416553] sm:flex">Ver todas <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <StaggerGroup className="grid gap-3 md:grid-cols-3" staggerDelay={0.08}>
          {related.map((service) => (
            <StaggerItem key={service.href}>
              <Link href={service.href} className={`group flex h-full items-center justify-between gap-4 rounded-2xl border border-[#dfe7e1] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg ${palette.hover}`}>
                <div>
                  <h3 className="text-sm font-bold text-[#234436]">{service.label}</h3>
                  <p className="mt-1 text-xs text-[#74837b]">{service.summary}</p>
                </div>
                <ArrowRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${palette.softText}`} />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  )
}
