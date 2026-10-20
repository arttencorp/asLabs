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
import { WhatsAppContact } from "@/components/whatsapp-contact"

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
  { label: "Fisicoquímica y Bioquímica", href: "/servicios/fisicoquimicos-bioquimicos", summary: "Enzimas, proteínas, lípidos y composición" },
  { label: "Biotecnología Vegetal", href: "/servicios/biotecnologia-vegetal", summary: "Cultivo de tejidos in vitro" },
  { label: "Bacteriología", href: "/servicios/bacteriologia-general", summary: "Cepas, fermentación y bioproductos" },
  { label: "Apoyo a Investigación", href: "/servicios/apoyo-investigacion", summary: "Protocolos y análisis molecular" },
]

type HeroActionsProps = {
  count: number
  theme: ServiceTheme
  whatsappMessage: string
}

export function ServiceHeroActions({ count, theme, whatsappMessage }: HeroActionsProps) {
  const palette = themes[theme]

  return (
    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-wrap gap-2">
        <Link
          href="#catalogo"
          className="inline-flex h-11 items-center gap-2 bg-white px-5 text-xs font-semibold text-[#173c2b] transition hover:bg-[#eaf2ed]"
        >
          Ver catálogo
          <ArrowDown className="h-4 w-4" />
        </Link>
        <WhatsAppContact
          message={whatsappMessage}
          className="inline-flex h-11 items-center gap-2 border border-white/30 bg-white/8 px-5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-[#173c2b]"
        >
          <MessageCircle className="h-4 w-4" />
          Consultar
        </WhatsAppContact>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-white/65">
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
    <div className="relative z-20 border-b border-[#d5ded8] bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-0 overflow-x-auto px-4 [scrollbar-width:none]">
        <Link href="/servicios" className={`shrink-0 border-x border-[#e1e7e3] px-4 py-3 text-[11px] font-semibold ${palette.softText} ${palette.softBg}`}>
          Todos los servicios
        </Link>
        {[
          ["Beneficios", "#beneficios"],
          ["Catálogo", "#catalogo"],
          ["Cómo trabajamos", "#proceso"],
          ["Preguntas", "#preguntas"],
        ].map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 border-r border-[#e1e7e3] px-4 py-3 text-[11px] font-medium text-[#51655b] transition hover:bg-[#edf3ee] hover:text-[#245f3e]">
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
  whatsappMessage: string
  faqs: Array<{ question: string; answer: string }>
}

export function ServiceExperience({ activeHref, theme, title, whatsappMessage, faqs }: ServiceExperienceProps) {
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
      <section id="proceso" className="scroll-mt-28 py-10 md:py-16">
        <ScrollReveal>
          <div className="overflow-hidden bg-[#102f25] text-white">
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-white/15 p-7 md:p-10 lg:border-b-0 lg:border-r">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#a9c9b8]">
                  <ClipboardCheck className="h-4 w-4" />
                  Ruta de la muestra
                </span>
                <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-.03em] md:text-4xl">De la consulta al informe, cada etapa queda clara.</h2>
                <p className="mt-5 text-sm leading-7 text-white/65">
                  Te acompañamos antes, durante y después del análisis de {title.toLowerCase()} para que la muestra llegue correctamente y el resultado sea útil.
                </p>
                <WhatsAppContact message={whatsappMessage} className={`mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 ${palette.bg}`}>
                  Revisar mi caso
                  <ArrowRight className="h-4 w-4" />
                </WhatsAppContact>
              </div>
              <StaggerGroup className="divide-y divide-white/12" staggerDelay={0.06}>
                {steps.map((step, index) => (
                  <StaggerItem key={step.title}>
                    <div className="group grid gap-4 p-6 transition hover:bg-white/[0.05] sm:grid-cols-[38px_46px_1fr] sm:items-center md:px-9">
                      <span className="text-xs font-semibold text-white/35">0{index + 1}</span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/15 bg-white/[0.06] text-white/80">
                        <step.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-white/52">{step.text}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="preguntas" className="scroll-mt-28 border-y border-[#ccd7d0] py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal direction="right">
            <span className={`inline-flex items-center gap-2 text-xs font-semibold ${palette.softText}`}>
              <HelpCircle className="h-4 w-4" />
              Antes de enviar tu muestra
            </span>
            <h2 className="mt-4 text-3xl font-medium tracking-[-.03em] text-[#183c2d] md:text-4xl">Antes de preparar el envío.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#66796f]">Estas respuestas evitan repeticiones de muestreo. Si el caso es especial, el equipo puede revisar contigo la matriz y el objetivo.</p>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.08}>
            <div className="border-t border-[#cad6ce]">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-[#cad6ce] bg-transparent py-5" open={index === 0}>
                  <summary className="grid cursor-pointer list-none grid-cols-[34px_1fr_28px] items-center gap-3 text-sm font-semibold text-[#234436]">
                    <span className="text-[10px] text-[#8a9991]">0{index + 1}</span>
                    <span>{faq.question}</span>
                    <span className={`grid h-7 w-7 shrink-0 place-items-center ${palette.softText} transition group-open:rotate-45`}>+</span>
                  </summary>
                  <p className="pl-[46px] pr-8 pt-4 text-sm leading-7 text-[#687b71]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-12 pt-14 md:pb-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <span className={`text-xs font-semibold ${palette.softText}`}>Conecta este análisis</span>
            <h2 className="mt-2 text-2xl font-medium tracking-[-.02em] text-[#183c2d]">Otras especialidades del laboratorio</h2>
          </div>
          <Link href="/servicios" className="hidden items-center gap-1 text-xs font-semibold text-[#416553] sm:flex">Ver todas <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <StaggerGroup className="grid divide-y divide-[#d2dcd5] border-y border-[#d2dcd5] md:grid-cols-3 md:divide-x md:divide-y-0" staggerDelay={0.08}>
          {related.map((service) => (
            <StaggerItem key={service.href}>
              <Link href={service.href} className={`group flex h-full min-h-28 items-center justify-between gap-4 bg-transparent p-5 transition ${palette.hover}`}>
                <div>
                  <h3 className="text-sm font-semibold text-[#234436]">{service.label}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#74837b]">{service.summary}</p>
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
