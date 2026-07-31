'use client'

import {
  Award,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FlaskConical,
  LockKeyhole,
  Microscope,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

const standards = [
  {
    code: "ISO 17025",
    title: "Competencia de Laboratorios",
    status: "En proceso",
    description: "Criterios técnicos para sostener resultados precisos, trazables y respaldados por métodos controlados.",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YCba0MyktuTUp6gwsWXXaRnnNyODEt.png",
    accent: "#2e7048",
    features: ["Métodos validados", "Equipos calibrados", "Trazabilidad total", "Incertidumbre documentada"],
  },
  {
    code: "ISO 9001",
    title: "Gestión de Calidad",
    status: "En auditoría",
    description: "Una estructura de procesos documentados que ordena la operación y promueve la mejora permanente.",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mma4x2E80gLnLGbvIOK7f35xiE08tJ.png",
    accent: "#315f80",
    features: ["Procesos documentados", "Control continuo", "Auditorías sistemáticas", "Mejora permanente"],
  },
  {
    code: "B Corp",
    title: "Responsabilidad Corporativa",
    status: "En proceso",
    description: "Principios de desempeño social, ambiental y transparencia aplicados a una empresa con propósito.",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ghcauR6JAQ8vD7Kq0sNVviX8xKRV42.png",
    accent: "#b66e33",
    features: ["Sostenibilidad", "Responsabilidad social", "Ética empresarial", "Transparencia operativa"],
  },
]

const principles = [
  { icon: BarChart3, title: "Trazabilidad", description: "Cada muestra conserva un código único desde la recepción hasta el informe." },
  { icon: UsersRound, title: "Responsabilidad", description: "Cada fase queda asociada al personal capacitado que la ejecuta y revisa." },
  { icon: Microscope, title: "Métodos validados", description: "Los análisis siguen protocolos reconocidos y criterios técnicos verificables." },
  { icon: ShieldCheck, title: "Incertidumbre", description: "Los resultados se interpretan considerando sus límites y controles aplicables." },
  { icon: LockKeyhole, title: "Confidencialidad", description: "La información del cliente permanece protegida mediante accesos restringidos." },
  { icon: TrendingUp, title: "Mejora continua", description: "Las revisiones periódicas convierten hallazgos en acciones de optimización." },
]

const qualityFlow = [
  { icon: PackageCheck, num: "01", name: "Recepción", desc: "Identificamos y registramos la muestra." },
  { icon: FlaskConical, num: "02", name: "Preparación", desc: "Aplicamos condiciones definidas para su matriz." },
  { icon: Microscope, num: "03", name: "Análisis", desc: "Ejecutamos el método y documentamos cada dato." },
  { icon: ClipboardCheck, num: "04", name: "Control QA", desc: "Revisamos criterios, controles y consistencia." },
  { icon: FileCheck2, num: "05", name: "Reporte", desc: "Autorizamos y entregamos el resultado final." },
]

export default function AboutISO() {
  return (
    <section id="estandares" data-navbar-theme="light" className="w-full scroll-mt-32 overflow-hidden bg-[#f5f8f5] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c9d9cd] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2e7048] shadow-sm">
              <Award className="h-4 w-4" />
              Calidad que puede seguirse
            </span>
            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.035em] text-[#17392b] sm:text-5xl">
              Rigor Científico y Responsabilidad
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#64766d] sm:text-lg">
              Integramos criterios técnicos, documentación y revisión en cada etapa para que un resultado no sea solo un dato, sino información confiable para decidir.
            </p>
          </div>

          <div className="rounded-[26px] border border-[#d8e4da] bg-white p-5 shadow-[0_24px_60px_-38px_rgba(21,66,45,0.48)] sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#73857b]">Lo que protegemos en cada análisis</p>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { value: "01", label: "Identidad de muestra" },
                { value: "02", label: "Integridad del dato" },
                { value: "03", label: "Claridad del informe" },
              ].map((item) => (
                <div key={item.value} className="rounded-2xl bg-[#eef4ef] p-3.5 sm:p-4">
                  <strong className="text-lg text-[#2e7048]">{item.value}</strong>
                  <p className="mt-2 text-[10px] font-semibold leading-4 text-[#5d7167] sm:text-[11px]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3" staggerDelay={0.1}>
          {standards.map((standard) => (
            <StaggerItem key={standard.code} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#dce5de] bg-white shadow-[0_18px_45px_-34px_rgba(20,61,43,0.42)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-34px_rgba(20,61,43,0.5)]">
                <div className="h-1.5 w-full" style={{ backgroundColor: standard.accent }} />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col items-start gap-2">
                      <span className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: standard.accent, backgroundColor: `${standard.accent}12` }}>
                        {standard.code}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e1e8e2] bg-[#f8faf8] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#63766c]">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: standard.accent }} />
                        {standard.status}
                      </span>
                    </div>
                    <div className="grid h-16 w-24 place-items-center rounded-2xl border border-[#e3e9e4] bg-[#fafbfa] p-2.5">
                      <img src={standard.logo} alt={`Referencia ${standard.code}`} className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-black leading-tight text-[#203e31]">{standard.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6a7b72]">{standard.description}</p>

                  <div className="mt-6 grid grid-cols-2 gap-2 border-t border-[#e5ebe6] pt-5">
                    {standard.features.map((feature) => (
                      <span key={feature} className="flex items-start gap-2 text-[11px] font-semibold leading-4 text-[#52665b]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: standard.accent }} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-16 overflow-hidden rounded-[32px] bg-[#11392a] px-5 py-8 text-white shadow-[0_34px_80px_-45px_rgba(8,44,28,.75)] sm:px-8 sm:py-10 lg:px-10">
          <ScrollReveal className="grid gap-6 border-b border-white/10 pb-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a8d0b0]">Cómo sostenemos la calidad</span>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.025em] sm:text-4xl">Pilares del Cumplimiento</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/65 md:justify-self-end sm:text-base">
              Seis controles que conectan a las personas, los métodos y la información para conservar la integridad de cada análisis.
            </p>
          </ScrollReveal>

          <StaggerGroup className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <StaggerItem key={principle.title} className="h-full">
                  <article className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.1]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#245b3e] shadow-lg transition group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#8ebc98]">{String(index + 1).padStart(2, "0")}</span>
                        <h4 className="text-sm font-black uppercase tracking-[0.08em] text-white">{principle.title}</h4>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-white/60">{principle.description}</p>
                    </div>
                  </article>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>

        <ScrollReveal className="mt-16">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2e7048]">De la muestra al informe</span>
            <h3 className="mt-3 text-3xl font-black tracking-[-0.025em] text-[#17392b] sm:text-4xl">Flujo de Control de Calidad</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#66786f] sm:text-base">Cada etapa deja evidencia y prepara la siguiente, reduciendo vacíos y facilitando una revisión completa.</p>
          </div>

          <div className="rounded-[30px] border border-[#d9e3db] bg-white p-4 shadow-[0_24px_60px_-40px_rgba(21,66,45,.46)] sm:p-6 lg:p-8">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
              {qualityFlow.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.num} className="contents">
                    <article className="group relative rounded-2xl border border-[#e0e8e2] bg-[#f9fbf9] p-4 transition hover:-translate-y-1 hover:border-[#aec7b3] hover:bg-white hover:shadow-lg sm:p-5">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e2eee4] text-[#2e7048]"><Icon className="h-5 w-5" /></span>
                        <span className="text-xl font-black text-[#d5e2d8]">{step.num}</span>
                      </div>
                      <h4 className="mt-4 text-sm font-black text-[#244534]">{step.name}</h4>
                      <p className="mt-2 text-[11px] leading-5 text-[#6a7b72]">{step.desc}</p>
                    </article>
                    {index < qualityFlow.length - 1 && (
                      <div className="flex items-center justify-center py-1 text-[#8daf94] lg:py-0">
                        <ChevronRight className="h-5 w-5 rotate-90 lg:rotate-0" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#edf4ee] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#2e7048] text-white"><Award className="h-5 w-5" /></span>
                <div><p className="text-sm font-black text-[#244534]">Nuestro compromiso</p><p className="mt-1 text-xs leading-5 text-[#62746a]">Resultados respaldados por trazabilidad, revisión técnica y responsabilidad operativa.</p></div>
              </div>
              <span className="shrink-0 rounded-full border border-[#bfd2c2] bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-[#2e7048]">Calidad en cada etapa</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
