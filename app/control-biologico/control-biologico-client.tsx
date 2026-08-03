"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bug,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Eye,
  FileCheck2,
  Leaf,
  MessageCircle,
  Microscope,
  PackageCheck,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Users,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const WHATSAPP = "51961996645"

const products = [
  {
    name: "Billaea claripalpis",
    kicker: "Parasitoide especializado",
    target: "Diatraea saccharalis",
    crop: "Caña de azúcar",
    description:
      "Mosca parasitoide utilizada dentro de programas de manejo integrado para el barrenador del tallo en caña de azúcar.",
    benefits: [
      "Intervención biológica orientada al barrenador",
      "Compatible con una estrategia de manejo integrado",
      "Liberación coordinada según evaluación de campo",
      "Acompañamiento técnico para planificar la aplicación",
    ],
    featured: true,
  },
  {
    name: "Trichogramma sp.",
    kicker: "Microavispa parasitoide",
    target: "Huevos de lepidópteros",
    crop: "Diversos cultivos",
    description:
      "Controlador biológico para actuar sobre huevos de lepidópteros plaga antes de que avancen a etapas de mayor daño.",
    benefits: [
      "Acción sobre huevos de insectos objetivo",
      "Aplicación adaptable a distintos cultivos",
      "Liberación práctica dentro del programa de manejo",
      "Seguimiento técnico de la estrategia implementada",
    ],
    featured: false,
  },
]

const process = [
  {
    number: "01",
    title: "Leemos el campo",
    description: "Revisamos cultivo, historial, presión de plaga y condiciones de la zona.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Diseñamos el plan",
    description: "Definimos controlador, oportunidad de liberación y puntos de seguimiento.",
    icon: Target,
  },
  {
    number: "03",
    title: "Acompañamos la liberación",
    description: "Orientamos al equipo para ejecutar la intervención con mayor claridad.",
    icon: Leaf,
  },
  {
    number: "04",
    title: "Observamos la respuesta",
    description: "Revisamos el comportamiento del programa y planteamos los siguientes pasos.",
    icon: Eye,
  },
]

const benefits = [
  {
    title: "Menor presión química",
    description: "Integra herramientas biológicas para reducir la dependencia exclusiva de pesticidas.",
    icon: ShieldCheck,
    className: "md:col-span-2 bg-[#0b3b2a] text-white",
  },
  {
    title: "Decisiones con contexto",
    description: "La recomendación parte de la plaga, el cultivo y la realidad del campo.",
    icon: Microscope,
    className: "bg-[#dff3dc] text-emerald-950",
  },
  {
    title: "Equipo acompañado",
    description: "Capacitación y orientación para que la liberación no sea un paso aislado.",
    icon: Users,
    className: "bg-[#f4ead8] text-emerald-950",
  },
  {
    title: "Agricultura responsable",
    description: "Un manejo que busca equilibrio productivo y ambiental en el tiempo.",
    icon: Sprout,
    className: "md:col-span-2 bg-[#f8faf7] text-emerald-950",
  },
]

const faqs = [
  {
    question: "¿Qué controlador biológico necesito?",
    answer:
      "Depende de la plaga, el cultivo, la etapa del problema y las condiciones del campo. Por eso confirmamos el caso antes de recomendar una liberación.",
  },
  {
    question: "¿Realizan envíos fuera de Trujillo?",
    answer:
      "Coordinamos atención y logística para distintas zonas del Perú. El destino, disponibilidad y condiciones de transporte se confirman en la cotización.",
  },
  {
    question: "¿Incluyen asesoría para la liberación?",
    answer:
      "Sí. Podemos orientar la planificación, liberación y seguimiento de acuerdo con el alcance acordado para el proyecto.",
  },
]

function WhatsAppLink({
  children,
  product,
  className,
}: {
  children: React.ReactNode
  product?: string
  className: string
}) {
  const message = product
    ? `Hola, deseo información y disponibilidad de ${product} para un programa de control biológico.`
    : "Hola, deseo una evaluación y cotización para implementar control biológico en mi cultivo."
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

export function ControlBiologicoClient() {
  return (
    <div className="min-h-screen bg-[#f4f7f2] font-sans text-slate-900">
      <Navbar overlay />
      <main className="overflow-hidden">
        <section
          data-navbar-theme="dark"
          className="relative isolate min-h-[570px] overflow-hidden bg-[#082f22] pb-16 pt-28 text-white sm:min-h-[610px] sm:pt-32"
        >
          <div className="absolute inset-0 -z-30">
            <Image
              src="/control-biologico.png"
              alt="Cultivo atendido con una estrategia de control biológico"
              fill
              priority
              className="object-cover object-center lg:object-[72%_center]"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,42,29,.98)_0%,rgba(5,42,29,.92)_38%,rgba(5,42,29,.48)_68%,rgba(5,42,29,.25)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_10%,rgba(190,242,100,.14),transparent_28%),linear-gradient(to_top,rgba(5,42,29,.72),transparent_42%)]" />
          <div className="absolute inset-0 -z-10 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:62px_62px] [mask-image:linear-gradient(to_right,black,transparent_75%)]" />

          <motion.div
            aria-hidden="true"
            className="absolute right-[8%] top-[24%] -z-10 hidden h-72 w-72 rounded-full border border-white/20 lg:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -left-3 top-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-lime-300 text-emerald-950 shadow-[0_0_32px_rgba(190,242,100,.8)]">
              <Bug className="h-4 w-4" />
            </div>
          </motion.div>

          <div className="mx-auto grid min-h-[430px] max-w-7xl items-center px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-200 backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                Ciencia que trabaja con la naturaleza
              </div>
              <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Control biológico que empieza entendiendo tu campo
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
                Controladores biológicos, diagnóstico y acompañamiento técnico para construir un manejo de plagas más sostenible y mejor planificado.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-lime-300 px-7 text-sm font-bold text-emerald-950 shadow-[0_15px_40px_rgba(190,242,100,.22)] transition-all hover:-translate-y-1 hover:bg-lime-200"
                >
                  Evaluar mi cultivo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </WhatsAppLink>
                <a
                  href="#controladores"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/15"
                >
                  Conocer controladores
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/65">
                {["Orientación técnica", "Atención a nivel nacional", "Manejo integrado"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-lime-300" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-10 grid grid-cols-2 gap-3 self-end lg:mt-0 lg:grid-cols-1 lg:self-center"
            >
              <div className="rounded-[28px] border border-white/15 bg-black/15 p-5 backdrop-blur-2xl">
                <p className="text-3xl font-semibold text-lime-200">2</p>
                <p className="mt-1 text-sm font-bold">Controladores disponibles</p>
                <p className="mt-1 text-xs leading-5 text-white/55">Selección orientada según el objetivo.</p>
              </div>
              <div className="rounded-[28px] border border-white/15 bg-black/15 p-5 backdrop-blur-2xl">
                <p className="text-3xl font-semibold text-lime-200">4</p>
                <p className="mt-1 text-sm font-bold">Etapas de acompañamiento</p>
                <p className="mt-1 text-xs leading-5 text-white/55">Del diagnóstico al seguimiento.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[30px] border border-emerald-950/10 bg-white shadow-[0_22px_70px_rgba(5,46,34,.16)] md:grid-cols-3">
            {[
              [BadgeCheck, "Selección técnica", "No vendemos a ciegas: primero entendemos el caso."],
              [PackageCheck, "Entrega coordinada", "Disponibilidad y transporte se confirman antes del despacho."],
              [FileCheck2, "Acompañamiento", "La liberación forma parte de un programa con seguimiento."],
            ].map(([Icon, title, text], index) => {
              const ItemIcon = Icon as typeof BadgeCheck
              return (
                <div
                  key={String(title)}
                  className={`flex gap-4 p-5 sm:p-6 ${index < 2 ? "border-b border-slate-100 md:border-b-0 md:border-r" : ""}`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-bold text-emerald-950">{String(title)}</h2>
                    <p className="mt-1 text-sm leading-5 text-slate-500">{String(text)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-end gap-7 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Un sistema, no un producto aislado</p>
              <h2 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-emerald-950 sm:text-5xl">
                Del diagnóstico a una estrategia que el equipo puede ejecutar
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end">
              Cada campo presenta una combinación distinta de cultivo, plaga y condiciones. Organizamos la intervención en etapas claras para tomar mejores decisiones.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -7 }}
                className="group relative overflow-hidden rounded-[28px] border border-emerald-950/10 bg-white p-6 shadow-[0_14px_45px_rgba(5,46,34,.06)] transition-shadow hover:shadow-[0_22px_60px_rgba(5,46,34,.12)]"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-black tracking-[0.18em] text-emerald-600">{item.number}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-950 text-lime-200">
                    <item.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="relative mt-8 text-xl font-semibold text-emerald-950">{item.title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="controladores" className="relative bg-white py-20 sm:py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Controladores biológicos</p>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-emerald-950 sm:text-5xl">
                Dos aliados, objetivos diferentes
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Revisa su objetivo principal y consúltanos para validar cuál corresponde a la situación de tu cultivo.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {products.map((product, index) => (
                <motion.article
                  key={product.name}
                  initial={{ opacity: 0, x: index === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.6 }}
                  className={`group relative flex min-h-[610px] flex-col overflow-hidden rounded-[36px] border p-6 sm:p-8 ${
                    product.featured
                      ? "border-emerald-700 bg-emerald-950 text-white shadow-[0_28px_90px_rgba(5,46,34,.2)]"
                      : "border-emerald-950/10 bg-[#f6f9f5] text-emerald-950"
                  }`}
                >
                  <div
                    className={`absolute right-0 top-0 h-72 w-72 rounded-bl-[100%] ${
                      product.featured ? "bg-emerald-800/60" : "bg-emerald-100/70"
                    }`}
                  />
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: index === 0 ? 360 : -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className={`absolute right-8 top-8 h-36 w-36 rounded-full border ${
                      product.featured ? "border-white/12" : "border-emerald-900/10"
                    }`}
                  >
                    <span className={`absolute left-1 top-1/2 h-3 w-3 rounded-full ${product.featured ? "bg-lime-300" : "bg-emerald-600"}`} />
                  </motion.div>

                  <div className="relative flex items-center justify-between gap-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold ${
                        product.featured ? "bg-lime-300 text-emerald-950" : "bg-white text-emerald-800 shadow-sm"
                      }`}
                    >
                      {product.featured ? <Award className="h-4 w-4" /> : <Bug className="h-4 w-4" />}
                      {product.kicker}
                    </span>
                    <CircleDot className={`h-6 w-6 ${product.featured ? "text-lime-300" : "text-emerald-500"}`} />
                  </div>

                  <div className="relative mt-14">
                    <p className={`text-xs font-bold uppercase tracking-[0.18em] ${product.featured ? "text-emerald-200" : "text-emerald-600"}`}>
                      Controlador biológico
                    </p>
                    <h3 className="mt-3 text-4xl font-semibold italic tracking-[-0.035em] sm:text-5xl">{product.name}</h3>
                    <p className={`mt-5 max-w-xl text-base leading-7 ${product.featured ? "text-emerald-50/70" : "text-slate-600"}`}>
                      {product.description}
                    </p>
                  </div>

                  <div className="relative mt-7 grid grid-cols-2 gap-3">
                    <div className={`rounded-2xl p-4 ${product.featured ? "bg-white/[0.08]" : "bg-white"}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${product.featured ? "text-emerald-200/70" : "text-slate-400"}`}>
                        Objetivo
                      </p>
                      <p className="mt-1.5 text-sm font-bold">{product.target}</p>
                    </div>
                    <div className={`rounded-2xl p-4 ${product.featured ? "bg-white/[0.08]" : "bg-white"}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${product.featured ? "text-emerald-200/70" : "text-slate-400"}`}>
                        Cultivo
                      </p>
                      <p className="mt-1.5 text-sm font-bold">{product.crop}</p>
                    </div>
                  </div>

                  <ul className="relative mt-7 space-y-3">
                    {product.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className={`flex gap-3 text-sm leading-5 ${product.featured ? "text-emerald-50/75" : "text-slate-600"}`}
                      >
                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${product.featured ? "text-lime-300" : "text-emerald-600"}`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-auto pt-8">
                    <WhatsAppLink
                      product={product.name}
                      className={`group/button flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl px-5 text-sm font-bold shadow-lg transition-all hover:-translate-y-1 ${
                        product.featured
                          ? "bg-lime-300 text-emerald-950 shadow-lime-950/20 hover:bg-lime-200"
                          : "bg-emerald-700 text-white shadow-emerald-700/20 hover:bg-emerald-800"
                      }`}
                    >
                      Consultar disponibilidad
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </WhatsAppLink>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eaf1e7] py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-stretch gap-7 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative min-h-[500px] overflow-hidden rounded-[38px]"
            >
              <Image
                src="/control-biologico.png"
                alt="Evaluación técnica para manejo integrado de plagas"
                fill
                className="object-cover transition-transform duration-[1400ms] hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-200">Acompañamiento en campo</p>
                <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight">
                  La mejor liberación es la que forma parte de un plan
                </h2>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className={`rounded-[30px] p-6 sm:p-7 ${benefit.className}`}
                >
                  <benefit.icon className="h-7 w-7" />
                  <h3 className="mt-8 text-2xl font-semibold">{benefit.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${benefit.className.includes("text-white") ? "text-white/65" : "text-slate-600"}`}>
                    {benefit.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Antes de empezar</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-emerald-950 sm:text-5xl">
                Preguntas frecuentes
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                Si tu caso necesita una evaluación más específica, escríbenos con el cultivo, la ubicación y la plaga observada.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.details
                  key={faq.question}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-[26px] border border-emerald-950/10 bg-[#f7faf6] p-5 open:bg-emerald-50 sm:p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-emerald-950">
                    {faq.question}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm transition-transform duration-300 group-open:rotate-90">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#0a3a29] px-6 py-14 text-white shadow-[0_28px_90px_rgba(5,46,34,.2)] sm:px-10 lg:px-14">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/[0.04]" />
            <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-200">Conversemos sobre tu cultivo</p>
                <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  Cuéntanos qué estás observando y diseñemos el siguiente paso
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/65">
                  Indica cultivo, ubicación y plaga para que nuestro equipo pueda orientar mejor la conversación.
                </p>
              </div>
              <WhatsAppLink
                className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-lime-300 px-7 text-sm font-bold text-emerald-950 transition-all hover:-translate-y-1 hover:bg-lime-200"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar evaluación
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </WhatsAppLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
