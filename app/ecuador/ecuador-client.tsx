"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight, Atom, BadgeCheck, Beaker, Building2, ChevronDown, CircleDot, Dna,
  FileCheck2, FlaskConical, Leaf, MapPin, Microscope, ScanLine, ShieldCheck,
  Sparkles, Sprout, TestTube2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import EcuadorFooter from "@/components/ecuador-footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"

const solutions = [
  { href: "/ecuador/biologia-molecular", icon: Dna, eyebrow: "Diagnóstico, identificación y genética", title: "Biología molecular", description: "Análisis moleculares diseñados según tu muestra, objetivo y nivel de resolución requerido.", image: "/research/research-lab.png", tags: ["PCR / qPCR", "16S e ITS", "Secuenciación", "ADN y ARN"], accent: "#93e6ca" },
  { href: "/ecuador/formulaciones-bacterianas", icon: FlaskConical, eyebrow: "Desarrollo y biotecnología microbiana", title: "Formulaciones bacterianas", description: "Desarrollo, estandarización y control de formulaciones para aplicaciones productivas y proyectos especiales.", image: "/servicios/image.png", tags: ["Fermentación", "Bioinsumos", "Viabilidad", "Control de calidad"], accent: "#f0d477" },
]

const process = [
  { number: "01", icon: ScanLine, title: "Cuéntanos el reto", text: "Definimos objetivo, muestra y resultado esperado." },
  { number: "02", icon: TestTube2, title: "Diseñamos el alcance", text: "Seleccionamos métodos, controles y entregables." },
  { number: "03", icon: Microscope, title: "Ejecutamos", text: "Procesamiento técnico con trazabilidad por etapa." },
  { number: "04", icon: FileCheck2, title: "Entregamos claridad", text: "Resultados organizados para facilitar decisiones." },
]

const applications = [
  { icon: Sprout, title: "Agricultura", text: "Sanidad vegetal, genética, microorganismos y desarrollo de soluciones biológicas." },
  { icon: Beaker, title: "Industria y alimentos", text: "Evaluaciones moleculares y proyectos de microbiología aplicada." },
  { icon: Leaf, title: "Ambiente", text: "Caracterización e identificación de microorganismos de interés." },
  { icon: Atom, title: "Investigación", text: "Soporte técnico para universidades, empresas y desarrollos experimentales." },
]

const faqs = [
  { question: "¿Qué servicios están disponibles en Ecuador?", answer: "La sede Ecuador está especializada exclusivamente en biología molecular y formulaciones bacterianas. Al seleccionar Ecuador, la web muestra solo estas capacidades." },
  { question: "¿Dónde se reciben las muestras?", answer: "Coordinamos la recepción en nuestra sede de Quito: Edificio Carolina Millenium, Andrade Marin 24, 170518 Quito, Ecuador." },
  { question: "¿Pueden evaluar un requerimiento especial?", answer: "Sí. Antes de cotizar revisamos el objetivo, el tipo de muestra, la cantidad y el entregable esperado para plantear un alcance técnicamente coherente." },
  { question: "¿Cómo inicio una solicitud?", answer: "Puedes elegir una de las dos áreas o escribirnos por WhatsApp. Un asesor recopilará la información mínima necesaria para evaluar el proyecto." },
]

export default function EcuadorClient() {
  const reduceMotion = useReducedMotion()
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3f6f2] font-[var(--font-poppins)] text-[#122f26]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#061c17] px-5 pb-16 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-32">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(114,215,181,.075)_1px,transparent_1px),linear-gradient(90deg,rgba(114,215,181,.075)_1px,transparent_1px)] [background-size:58px_58px]" />
          <motion.div animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }} className="absolute -right-32 top-16 h-[460px] w-[460px] rounded-full border border-[#83dfc0]/10 before:absolute before:inset-16 before:rounded-full before:border before:border-[#83dfc0]/10 after:absolute after:inset-32 after:rounded-full after:border after:border-[#e6c452]/10" />
          <div className="absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#1e8f72]/20 blur-[120px]" />
          <div className="absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-[#e5bd45]/10 blur-[130px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[570px] lg:grid-cols-[1.02fr_.98fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [.16, 1, .3, 1] }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e5bd45]/30 bg-[#e5bd45]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#f2d77e]"><span>🇪🇨</span>Nueva sede · Quito</div>
              <p className="mt-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#92e3c7]"><Sparkles className="h-4 w-4" />AS Labs Ecuador</p>
              <h1 className="mt-4 max-w-3xl text-balance text-[2.75rem] font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[4.35rem]">Precisión molecular para avanzar con confianza</h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">Biología molecular y formulaciones bacterianas desde Quito, con una experiencia diseñada para convertir necesidades técnicas en respuestas claras.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#capacidades" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#8ce3c6] px-7 text-sm font-bold text-[#09261f] shadow-[0_16px_35px_-18px_#8ce3c6] transition hover:-translate-y-1 hover:bg-[#a9efd8]">Explorar capacidades<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                <WhatsAppContact mode="modal" message="Hola, quisiera evaluar un requerimiento con AS Labs Ecuador." className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/[.07] px-7 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[.12]">Evaluar mi requerimiento</WhatsAppContact>
              </div>
              <div className="mt-9 grid max-w-xl grid-cols-3 gap-2 border-t border-white/10 pt-6">
                {[{ value: "02", label: "áreas especializadas" }, { value: "Quito", label: "atención local" }, { value: "360°", label: "trazabilidad técnica" }].map(item => <div key={item.label}><strong className="block text-base text-white sm:text-lg">{item.value}</strong><span className="mt-1 block text-[9px] leading-4 text-white/45 sm:text-[10px]">{item.label}</span></div>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: .12, duration: .85, ease: [.16, 1, .3, 1] }} className="relative h-[440px] sm:h-[510px]">
              <div className="absolute inset-x-0 top-0 h-[88%] overflow-hidden rounded-[32px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,.38)] sm:left-9">
                <Image src="/modern-laboratory-scientists.png" alt="Equipo de biología molecular de AS Labs Ecuador" fill priority className="object-cover" sizes="(min-width:1024px) 46vw,100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041712]/85 via-transparent to-[#17362d]/10" />
                <motion.div animate={reduceMotion ? undefined : { y: ["-10%", "720%"] }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }} className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b3f4de] to-transparent shadow-[0_0_20px_4px_rgba(140,227,198,.35)]" />
                <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white/75 backdrop-blur-xl">Laboratorio · Quito</div>
              </div>
              <motion.div animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 left-0 right-7 rounded-[25px] border border-white/15 bg-[#0b3028]/92 p-5 shadow-2xl backdrop-blur-xl sm:right-auto sm:w-[320px]">
                <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#f2d77e]">Sede Ecuador</p>
                <div className="mt-3 flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#8ce3c6]" /><div><strong className="block text-sm">Edificio Carolina Millenium</strong><span className="mt-1 block text-xs leading-5 text-white/60">Andrade Marin 24<br />170518 Quito, Ecuador</span></div></div>
              </motion.div>
              <div className="absolute -left-3 top-14 hidden rounded-2xl border border-white/15 bg-[#123b31]/85 p-3.5 backdrop-blur-xl sm:block"><Dna className="h-5 w-5 text-[#91e3c7]" /><span className="mt-2 block text-[9px] font-bold uppercase tracking-[.15em] text-white/55">Análisis<br />molecular</span></div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 -mt-px border-b border-[#dbe5dd] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f4ee] text-[#2f7f68]"><ShieldCheck className="h-4 w-4" /></span><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#779087]">Experiencia AS Labs</p><p className="text-xs font-semibold">Ciencia aplicada desde 1997</p></div></div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold text-[#60756c]">{["Evaluación técnica previa", "Trazabilidad de muestras", "Atención para Ecuador"].map(item => <span key={item} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#38856f]" />{item}</span>)}</div>
          </div>
        </section>

        <section id="capacidades" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-7 lg:grid-cols-[1fr_.62fr] lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#33836d]">Portafolio Ecuador</p><h2 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">Dos capacidades que se complementan</h2></div>
            <p className="border-l border-[#b9d4c7] pl-5 text-sm leading-7 text-[#65766f]">Desde comprender qué ocurre a nivel molecular hasta desarrollar una formulación bacteriana con parámetros definidos.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {solutions.map((solution, index) => (
              <motion.article key={solution.href} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .1, duration: .6 }} className="group relative overflow-hidden rounded-[34px] border border-black/[.07] bg-white shadow-[0_20px_65px_rgba(15,55,45,.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(15,55,45,.13)]">
                <Link href={solution.href} className="block">
                  <div className="relative h-[285px] overflow-hidden sm:h-[330px]">
                    <Image src={solution.image} alt={solution.title} fill className="object-cover transition duration-1000 group-hover:scale-[1.06]" sizes="(min-width:1024px) 48vw,100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08241d] via-[#08241d]/10 to-transparent" />
                    <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-[#0a3027]/70 text-white backdrop-blur-xl"><solution.icon className="h-5 w-5" /></span>
                    <span className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-xl"><CircleDot className="h-3 w-3" style={{ color: solution.accent }} />Disponible en Ecuador</span>
                    <div className="absolute bottom-5 left-5 right-5"><p className="text-[9px] font-bold uppercase tracking-[.18em]" style={{ color: solution.accent }}>{solution.eyebrow}</p><h3 className="mt-2 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">{solution.title}</h3></div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="max-w-xl text-sm leading-7 text-[#687a73]">{solution.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">{solution.tags.map(tag => <span key={tag} className="rounded-full bg-[#edf5f1] px-3 py-2 text-[10px] font-bold text-[#3e695d]">{tag}</span>)}</div>
                    <div className="mt-8 flex items-center justify-between border-t border-[#e4ebe6] pt-5"><span className="text-sm font-bold text-[#256d59]">Explorar capacidad</span><span className="grid h-10 w-10 place-items-center rounded-full bg-[#163e32] text-white transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"><ArrowRight className="h-4 w-4" /></span></div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0a2a22] py-20 text-white sm:py-28">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(143,226,198,.25)_1px,transparent_0)] [background-size:26px_26px]" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e8ca66]">Una ruta clara</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">De una necesidad técnica a una respuesta útil</h2><p className="mt-5 text-sm leading-7 text-white/58">Simplificamos el inicio sin perder rigor: primero entendemos el problema y después construimos el alcance.</p></div>
            <div className="relative mt-14 grid gap-4 lg:grid-cols-4">
              <div className="absolute left-[9%] right-[9%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[#80dabc]/40 to-transparent lg:block" />
              {process.map((step, index) => <motion.div key={step.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="relative rounded-[25px] border border-white/10 bg-white/[.055] p-5 backdrop-blur-sm transition hover:bg-white/[.09]"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#10382e] text-[#8ce3c6]"><step.icon className="h-5 w-5" /></span><span className="text-3xl font-semibold tracking-[-.05em] text-white/10">{step.number}</span></div><h3 className="mt-7 text-base font-bold">{step.title}</h3><p className="mt-3 text-xs leading-6 text-white/50">{step.text}</p></motion.div>)}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#33836d]">Aplicaciones</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Ciencia conectada con tu sector</h2></div><p className="max-w-2xl text-sm leading-7 text-[#65766f]">Cada proyecto parte de una pregunta diferente. Adaptamos la evaluación al contexto de uso, sin convertir el servicio en un paquete genérico.</p></div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{applications.map((item, index) => <motion.div key={item.title} initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .07 }} whileHover={{ y: -7 }} className="group rounded-[27px] border border-[#dce7e0] bg-[#f6f8f5] p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#317d67] shadow-sm transition group-hover:bg-[#173f32] group-hover:text-white"><item.icon className="h-5 w-5" /></span><h3 className="mt-6 text-lg font-bold">{item.title}</h3><p className="mt-3 text-xs leading-6 text-[#687971]">{item.text}</p></motion.div>)}</div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
            <div className="relative min-h-[480px]">
              <div className="absolute inset-y-0 left-0 right-8 overflow-hidden rounded-[34px]"><Image src="/microscope-scientist.png" alt="Trabajo especializado de laboratorio en AS Labs Ecuador" fill className="object-cover" sizes="(min-width:1024px) 44vw,100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#09251e]/75 via-transparent to-transparent" /></div>
              <div className="absolute bottom-5 left-5 right-0 rounded-[24px] border border-white bg-white/95 p-5 shadow-[0_25px_65px_rgba(15,55,45,.18)] backdrop-blur-xl sm:left-auto sm:w-[300px]"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e9f5f0] text-[#2f8069]"><MapPin className="h-4 w-4" /></span><div><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#778b82]">Nueva sede</p><p className="mt-1 text-sm font-bold">Quito, Ecuador</p></div></div></div>
            </div>
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#33836d]">Presencia local</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Una sede pensada para acercar la ciencia</h2><p className="mt-6 text-sm leading-7 text-[#61736b]">Nuestro punto de atención en Quito conecta tus requerimientos con un flujo técnico especializado y una comunicación más cercana durante el proyecto.</p>
              <div className="mt-8 rounded-[28px] border border-[#d5e3da] bg-white p-6 shadow-[0_18px_60px_rgba(15,55,45,.06)] sm:p-8"><div className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#173f32] text-[#e5bd45]"><Building2 className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#6e8077]">Sede Ecuador</p><h3 className="mt-2 text-xl font-bold">Edificio Carolina Millenium</h3><p className="mt-3 text-sm leading-7 text-[#5f736a]">Andrade Marin 24<br />170518 Quito, Ecuador</p></div></div><div className="mt-6 grid gap-3 border-t border-[#e1e9e4] pt-6 sm:grid-cols-2"><div className="flex items-center gap-2 text-xs font-semibold"><BadgeCheck className="h-4 w-4 text-[#35836d]" />Coordinación de muestras</div><div className="flex items-center gap-2 text-xs font-semibold"><BadgeCheck className="h-4 w-4 text-[#35836d]" />Evaluación de proyectos</div></div></div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr]">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#33836d]">Antes de empezar</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Preguntas frecuentes</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#667870]">La información esencial sobre la nueva operación en Ecuador.</p></div>
            <div className="space-y-3">{faqs.map((faq, index) => { const active = openFaq === index; return <div key={faq.question} className={`overflow-hidden rounded-[22px] border transition ${active ? "border-[#a9cdbd] bg-[#f1f7f3]" : "border-[#dce5df] bg-white"}`}><button type="button" onClick={() => setOpenFaq(active ? -1 : index)} aria-expanded={active} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"><span className="text-sm font-bold leading-6">{faq.question}</span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${active ? "rotate-180 bg-[#173f32] text-white" : "bg-[#eef4f0] text-[#315e4e]"}`}><ChevronDown className="h-4 w-4" /></span></button><AnimatePresence initial={false}>{active && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .28 }}><p className="px-5 pb-6 text-xs leading-6 text-[#61746b] sm:px-6">{faq.answer}</p></motion.div>}</AnimatePresence></div>})}</div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <div data-navbar-theme="dark" className="relative mx-auto max-w-7xl overflow-hidden rounded-[38px] bg-[#09281f] p-7 text-white shadow-[0_32px_90px_rgba(9,40,31,.24)] sm:p-12 lg:p-14">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[42px] border-[#e5bd45]/[.07]" /><div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#3ba486]/10 blur-[70px]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f0d477]">AS Labs Ecuador</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-.045em] sm:text-5xl">Empecemos por entender tu proyecto</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Cuéntanos qué necesitas analizar o desarrollar. Revisaremos la viabilidad técnica y te indicaremos el siguiente paso.</p></div><WhatsAppContact mode="modal" message="Hola, quisiera evaluar un proyecto con AS Labs Ecuador." className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#e5bd45] px-7 text-sm font-bold text-[#173428] transition hover:-translate-y-1 hover:bg-[#f2d77e]">Conversar con un asesor<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></WhatsAppContact></div>
          </div>
        </section>
      </main>
      <EcuadorFooter />
    </div>
  )
}
