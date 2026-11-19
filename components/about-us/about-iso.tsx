"use client"

import { ArrowRight, CheckCircle2, ClipboardCheck, FileCheck2, FlaskConical, LockKeyhole, Microscope, PackageCheck, ShieldCheck, TrendingUp, UsersRound } from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

const standards = [
  { code: "ISO/IEC 17025", title: "Competencia técnica", status: "Implementación en curso", text: "Métodos controlados, trazabilidad metrológica, revisión de resultados y evidencia técnica para cada etapa del análisis." },
  { code: "ISO 9001", title: "Gestión de procesos", status: "Preparación para auditoría", text: "Responsabilidades, registros y puntos de control definidos para sostener una operación ordenada y medible." },
  { code: "Impacto", title: "Responsabilidad corporativa", status: "Evaluación continua", text: "Criterios sociales, ambientales y de transparencia incorporados a las decisiones y relaciones de largo plazo." },
]

const principles = [
  { icon: ClipboardCheck, title: "Trazabilidad", text: "Código único desde la recepción hasta el informe." },
  { icon: UsersRound, title: "Responsabilidad", text: "Cada fase registra quién ejecuta y quién revisa." },
  { icon: Microscope, title: "Métodos", text: "Protocolos y criterios técnicos verificables." },
  { icon: LockKeyhole, title: "Confidencialidad", text: "Información protegida mediante accesos definidos." },
  { icon: TrendingUp, title: "Mejora", text: "Los hallazgos se convierten en acciones medibles." },
  { icon: ShieldCheck, title: "Integridad", text: "Controles para conservar la consistencia del dato." },
]

const qualityFlow = [
  { icon: PackageCheck, num: "01", name: "Recepción" },
  { icon: FlaskConical, num: "02", name: "Preparación" },
  { icon: Microscope, num: "03", name: "Análisis" },
  { icon: ClipboardCheck, num: "04", name: "Revisión" },
  { icon: FileCheck2, num: "05", name: "Informe" },
]

export default function AboutISO() {
  return (
    <section id="estandares" data-navbar-theme="light" className="scroll-mt-28 border-y border-[#d5ddd7] bg-[#f7f8f5] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <ScrollReveal className="grid gap-7 border-b border-[#ccd6cf] pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="text-[11px] font-semibold text-[#0b7a55]">Calidad y trazabilidad</p><h2 className="mt-3 max-w-[760px] text-[clamp(2rem,3.8vw,3.8rem)] font-medium leading-[1.03] tracking-[-.045em] text-[#17211d]">Sistemas de trabajo que hacen visible la calidad.</h2></div>
          <p className="max-w-[590px] text-sm leading-7 text-[#5d6c64] lg:justify-self-end">La calidad se sostiene con registros, responsables y decisiones que pueden seguirse. Nuestras hojas de ruta ordenan esa evolución sin presentar procesos en curso como certificaciones concluidas.</p>
        </ScrollReveal>

        <StaggerGroup className="mt-8 grid border-l border-t border-[#ccd6cf] lg:grid-cols-3" staggerDelay={0.08}>
          {standards.map((standard, index) => <StaggerItem key={standard.code} className="h-full"><article className="flex h-full min-h-[290px] flex-col border-b border-r border-[#ccd6cf] bg-white p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><span className="text-[10px] font-semibold text-[#0b7a55]">{standard.code}</span><span className="text-3xl font-medium tracking-[-.05em] text-[#dbe3dd]">0{index + 1}</span></div><h3 className="mt-10 text-2xl font-medium tracking-[-.03em] text-[#203d30]">{standard.title}</h3><p className="mt-3 text-xs leading-6 text-[#65756c]">{standard.text}</p><div className="mt-auto flex items-center gap-2 border-t border-[#e0e6e2] pt-5 text-[10px] font-semibold text-[#8a6735]"><span className="h-2 w-2 bg-[#d5a34f]" />{standard.status}</div></article></StaggerItem>)}
        </StaggerGroup>

        <div className="mt-10 grid overflow-hidden bg-[#0a3327] text-white lg:grid-cols-[.72fr_1.28fr]">
          <ScrollReveal className="border-b border-white/15 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10"><p className="text-[10px] font-semibold text-[#9fcbb5]">Principios operativos</p><h3 className="mt-4 text-3xl font-medium leading-tight tracking-[-.035em]">El resultado importa. También importa cómo se obtuvo.</h3><p className="mt-4 text-xs leading-6 text-white/58">Personas, métodos y datos permanecen conectados para facilitar la revisión y proteger la información del cliente.</p></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">{principles.map((principle) => <article key={principle.title} className="border-b border-r border-white/15 p-5 sm:min-h-[160px] sm:p-6"><principle.icon className="h-4 w-4 text-[#d5a34f]" /><h4 className="mt-7 text-sm font-semibold">{principle.title}</h4><p className="mt-2 text-[11px] leading-5 text-white/52">{principle.text}</p></article>)}</div>
        </div>

        <ScrollReveal className="mt-10 border-y border-[#ccd6cf] py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-[10px] font-semibold text-[#0b7a55]">Flujo documentado</p><h3 className="mt-2 text-xl font-medium tracking-[-.025em] text-[#203d30]">De la muestra al informe</h3></div><div className="grid flex-1 grid-cols-2 gap-px bg-[#ccd6cf] sm:grid-cols-5 lg:max-w-[830px]">{qualityFlow.map((step, index) => <div key={step.num} className="group relative flex min-h-[92px] items-center gap-3 bg-[#f7f8f5] p-3.5"><span className="grid h-8 w-8 shrink-0 place-items-center border border-[#bdcbc1] text-[#0b7a55]"><step.icon className="h-3.5 w-3.5" /></span><div><p className="text-[8px] font-semibold text-[#9a6b2f]">{step.num}</p><p className="mt-1 text-[10px] font-semibold text-[#334b3f]">{step.name}</p></div>{index < qualityFlow.length - 1 && <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 bg-[#f7f8f5] text-[#88a191] sm:block" />}</div>)}</div></div>
          <div className="mt-5 flex items-start gap-3 bg-[#eaf1eb] p-4 text-xs leading-6 text-[#4c6256]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0b7a55]" />Resultados respaldados por trazabilidad, revisión técnica y responsabilidad operativa.</div>
        </ScrollReveal>
      </div>
    </section>
  )
}
