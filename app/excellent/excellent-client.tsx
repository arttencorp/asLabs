"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight, ArrowUpRight, Atom, BadgeCheck, BarChart3, BookOpen, Check, ChevronRight, CircleDot,
  Dna, FileCheck2, FlaskConical, Leaf, Network, ScanSearch, ShieldCheck,
  Sparkles, TestTube2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"

const services = [
  { slug: "diagnostico-molecular-agricola", icon: ScanSearch, number: "01", title: "Diagnóstico molecular agrícola", description: "Detección dirigida de agentes asociados a enfermedades vegetales, desde una muestra correctamente seleccionada.", items: ["Virus y viroides", "Bacterias y fitoplasmas", "Hongos y oomicetos"], tone: "bg-[#e9f6f1] text-[#176d59]" },
  { slug: "identificacion-por-secuenciacion", icon: Dna, number: "02", title: "Identificación por secuenciación", description: "Identificación taxonómica de microorganismos mediante regiones conservadas y comparación bioinformática.", items: ["16S rRNA para bacterias", "ITS para hongos", "Secuenciación Sanger"], tone: "bg-[#eef3ff] text-[#315ba8]" },
  { slug: "genetica-vegetal", icon: Leaf, number: "03", title: "Genética vegetal", description: "Herramientas moleculares para caracterizar, autenticar y estudiar material vegetal de interés productivo.", items: ["Código de barras de ADN", "Identidad genética", "Variabilidad y trazabilidad"], tone: "bg-[#eff7df] text-[#557a18]" },
  { slug: "pcr-qpcr-rtpcr", icon: BarChart3, number: "04", title: "PCR, qPCR y RT-PCR", description: "Ensayos cualitativos y cuantitativos adaptados al objetivo, tipo de muestra y sensibilidad requerida.", items: ["Detección específica", "Cuantificación relativa", "Análisis desde ARN"], tone: "bg-[#f2edff] text-[#6950a7]" },
  { slug: "inocuidad-y-autenticidad", icon: ShieldCheck, number: "05", title: "Inocuidad y autenticidad", description: "Aplicaciones moleculares para complementar el control de materias primas, alimentos y procesos.", items: ["Detección de patógenos", "Confirmación de identidad", "Paneles de vigilancia"], tone: "bg-[#fff2e8] text-[#a95b22]" },
  { slug: "muestras-ambientales", icon: TestTube2, number: "06", title: "Muestras ambientales", description: "Detección e identificación de blancos biológicos en agua, suelo, sustratos y matrices ambientales.", items: ["ADN ambiental", "Monitoreo microbiano", "Confirmación molecular"], tone: "bg-[#e8f6f8] text-[#16707c]" },
  { slug: "investigacion-y-bioinformatica", icon: Network, number: "07", title: "Investigación y bioinformática", description: "Acompañamiento para convertir una pregunta de investigación en un flujo molecular reproducible.", items: ["Diseño de primers", "Optimización de protocolos", "Análisis de secuencias"], tone: "bg-[#f8eef3] text-[#9a4569]" },
  { slug: "desarrollos-a-medida", icon: Atom, number: "08", title: "Desarrollos a medida", description: "Evaluación de factibilidad para blancos, organismos o matrices que requieren una estrategia propia.", items: ["Paneles multiblanco", "Validación técnica", "Proyectos especiales"], tone: "bg-[#edf4f2] text-[#345d54]" },
]

const applications = {
  Agricultura: { eyebrow: "Sanidad y producción vegetal", title: "Respuestas más precisas antes de decidir en campo", description: "Analizamos material vegetal, microorganismos asociados, suelo y sustratos para orientar diagnósticos, selección de material y programas de vigilancia.", tags: ["Hojas", "Raíces", "Tallos", "Frutos", "Semillas", "Suelo y sustrato"], image: "/plant-genetics-research.png" },
  Microbiología: { eyebrow: "Identificación y confirmación", title: "Del aislamiento a una identidad molecular sustentada", description: "Trabajamos con cultivos puros y muestras evaluadas previamente para seleccionar el marcador, la amplificación y el análisis adecuado.", tags: ["Cultivos bacterianos", "Hongos filamentosos", "Levaduras", "Aislados ambientales", "Cepas de investigación"], image: "/laboratory-research.png" },
  "Alimentos y ambiente": { eyebrow: "Vigilancia molecular", title: "Evidencia complementaria para matrices complejas", description: "Diseñamos el abordaje según la matriz, el blanco biológico y el uso previsto del resultado, evaluando interferencias desde el inicio.", tags: ["Agua", "Alimentos", "Materia prima", "Superficies", "Muestras ambientales"], image: "/modern-laboratory-scientists.png" },
  Investigación: { eyebrow: "De la pregunta al dato", title: "Soporte molecular para tesis, proyectos e innovación", description: "Acompañamos la planificación, preparación de muestras, elección de marcadores, generación de datos e interpretación bioinformática.", tags: ["Tesis", "I+D", "Diseño experimental", "Estandarización", "Análisis de secuencias"], image: "/research/research-lab.png" },
} as const

type ApplicationKey = keyof typeof applications

const workflow = [
  ["01", "Cuéntanos el objetivo", "Definimos qué necesitas detectar, identificar, comparar o cuantificar."],
  ["02", "Evaluación de muestra", "Revisamos matriz, conservación, cantidad y condiciones de recepción."],
  ["03", "Estrategia molecular", "Seleccionamos extracción, marcador, controles y técnica analítica."],
  ["04", "Procesamiento", "Ejecutamos el flujo con trazabilidad y controles técnicos por corrida."],
  ["05", "Informe y orientación", "Entregamos resultados claros y explicamos su alcance e interpretación."],
]

const faqs = [
  ["¿Qué tipo de muestra debo enviar?", "Depende del organismo, el síntoma y el objetivo. Antes del envío confirmamos muestra, cantidad, conservación, rotulado y transporte para reducir resultados no concluyentes."],
  ["¿Pueden desarrollar un análisis que no aparece en la lista?", "Sí. Primero evaluamos el blanco molecular, la matriz, las referencias disponibles, los controles necesarios y el uso previsto del resultado."],
  ["¿Trabajan con tesistas y equipos de investigación?", "Sí. Podemos apoyar desde el diseño del flujo experimental hasta primers, estandarización, secuenciación y análisis de datos, según el alcance acordado."],
  ["¿Cuánto demora un análisis molecular?", "El plazo cambia según técnica, número de muestras, controles y secuenciación. La cotización indica el tiempo estimado después de revisar el caso."],
]

export default function ExcellentClient() {
  const [activeApplication, setActiveApplication] = useState<ApplicationKey>("Agricultura")
  const application = applications[activeApplication]

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f7f6] font-[var(--font-poppins)] text-[#142724]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#071815] px-4 pb-20 pt-28 text-white sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(114,215,181,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(114,215,181,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="absolute -left-44 top-1/4 h-[480px] w-[480px] rounded-full bg-[#2ea782]/20 blur-[120px]" /><div className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[#247f69]/20 blur-[130px]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f5f7f6] to-transparent" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[510px] lg:grid-cols-[1.02fr_.98fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#89d8bd]/25 bg-[#79d9ba]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#a5efd6] backdrop-blur-xl sm:text-xs"><Sparkles className="h-3.5 w-3.5" />Nueva marca de AS Laboratorios</div>
              <Image src="/images/excellent-logo-transparent.png" alt="exCELLlent" width={2172} height={724} priority className="mt-7 h-auto w-[178px] brightness-0 invert sm:w-[220px]" />
              <h1 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-.05em] sm:text-5xl lg:text-[58px]">Respuestas precisas, desde el ADN</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base">Diagnóstico, identificación y análisis molecular para agricultura, microbiología, ambiente, alimentos e investigación.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WhatsAppContact message="Hola, quisiera cotizar un análisis molecular con exCELLlent." className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#80dfbf] px-7 text-sm font-bold text-[#09241d] shadow-[0_16px_38px_rgba(75,196,156,.2)] transition hover:-translate-y-1 hover:bg-[#a3efd7]">Evaluar mi muestra<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></WhatsAppContact>
                <Link href="/excellent/catalogo" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-7 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/[.12]">Ver catálogo<BookOpen className="h-4 w-4" /></Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/55">{["Evaluación técnica previa", "Trazabilidad de muestras", "Atención nacional"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#83e2c2]" />{item}</span>)}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12, duration: .85, ease: [0.16, 1, 0.3, 1] }} className="relative h-[330px] sm:h-[400px] lg:h-[470px]">
              <div className="absolute inset-x-0 top-0 h-[86%] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_35px_100px_rgba(0,0,0,.3)] sm:inset-x-8 lg:left-10 lg:right-0">
                <Image src="/research/research-lab.png" alt="Especialista de exCELLlent trabajando en análisis molecular" fill priority className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061713]/80 via-transparent to-[#081c18]/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8ce4c6]">Plataforma molecular</p><p className="mt-1 text-sm font-semibold text-white">Del objetivo al resultado interpretable</p></div><span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xl"><Dna className="h-5 w-5 text-[#95e6ca]" /></span></div>
              </div>
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-0 left-0 w-[45%] overflow-hidden rounded-[22px] border-[5px] border-[#071815] bg-[#163b32] shadow-2xl sm:left-2">
                <div className="relative aspect-[4/3]"><Image src="/plant-genetics-research.png" alt="Investigación genética vegetal" fill className="object-cover" sizes="220px" /><div className="absolute inset-0 bg-gradient-to-t from-[#071815]/80 to-transparent" /><span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-[.16em] text-white">Genética vegetal</span></div>
              </motion.div>
              <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 4.5, repeat: Infinity }} className="absolute right-0 top-7 rounded-2xl border border-white/15 bg-[#0b2c25]/85 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-xl">PCR · qPCR · RT-PCR</motion.div>
              <div className="absolute bottom-7 right-2 rounded-2xl border border-[#8ce4c6]/25 bg-[#102f29]/90 px-4 py-3 backdrop-blur-xl"><strong className="block text-xl font-semibold text-[#96e8cd]">08</strong><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-white/60">líneas de servicio</span></div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid overflow-hidden rounded-[30px] border border-black/[.07] bg-white shadow-[0_24px_80px_rgba(15,50,42,.12)] sm:grid-cols-2 lg:grid-cols-4">
          {[[Dna,"Biología molecular","Estrategias según el blanco"],[FlaskConical,"Múltiples matrices","Agro, micro, alimento y ambiente"],[FileCheck2,"Resultados claros","Informe con alcance definido"],[BadgeCheck,"Soporte experto","Antes, durante y después"]].map(([Icon,title,text], index) => { const ItemIcon=Icon as typeof Dna; return <div key={String(title)} className={`flex gap-4 p-5 sm:p-6 ${index < 3 ? "border-b border-black/[.06] sm:border-r lg:border-b-0" : ""}`}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e7f5f0] text-[#257d65]"><ItemIcon className="h-5 w-5" /></span><div><h2 className="text-sm font-bold">{String(title)}</h2><p className="mt-1 text-xs leading-5 text-[#687a75]">{String(text)}</p></div></div>})}
        </div></section>

        <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <Link href="/excellent/catalogo" className="group relative min-h-[390px] overflow-hidden rounded-[32px] bg-[#123a31] p-7 text-white shadow-[0_20px_70px_rgba(15,55,45,.13)] sm:p-9">
              <Image src="/laboratory-research.png" alt="Catálogo de análisis moleculares exCELLlent" fill className="object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-60" sizes="(min-width:1024px) 58vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#08231d]/95 via-[#08231d]/70 to-transparent" />
              <div className="relative flex h-full max-w-md flex-col">
                <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] backdrop-blur-md">Catálogo general</span>
                <h2 className="mt-auto text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">Explora todas las capacidades moleculares</h2>
                <p className="mt-4 text-sm leading-7 text-white/68">Ocho líneas especializadas, con muestras, técnicas, servicios incluidos y entregables claramente explicados.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#9ae8ce]">Abrir catálogo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              </div>
            </Link>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { href: "/excellent/diagnostico-molecular-agricola", image: "/plant-genetics-research.png", label: "Sanidad vegetal", title: "Diagnóstico molecular agrícola" },
                { href: "/excellent/identificacion-por-secuenciacion", image: "/research/research-lab.png", label: "16S · ITS · Sanger", title: "Identificación por secuenciación" },
              ].map((catalog) => (
                <Link key={catalog.href} href={catalog.href} className="group relative min-h-[187px] overflow-hidden rounded-[28px] bg-[#102e28] p-6 text-white">
                  <Image src={catalog.image} alt={catalog.title} fill className="object-cover opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-55" sizes="(min-width:1024px) 40vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#081e19]/90 via-[#081e19]/55 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8ee2c5]">{catalog.label}</p><h3 className="mt-2 max-w-xs text-xl font-semibold leading-tight">{catalog.title}</h3><ArrowUpRight className="absolute bottom-0 right-0 h-5 w-5 text-white/70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#30866f]">Portafolio molecular</p><h2 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-.045em] text-[#102e28] sm:text-5xl">Una respuesta específica para cada pregunta biológica</h2></div><p className="max-w-xl text-sm leading-7 text-[#647670] lg:justify-self-end sm:text-base">No todas las muestras ni objetivos requieren la misma técnica. Primero entendemos el caso; después definimos el análisis, los controles y el entregable correcto.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((service,index) => <motion.article key={service.number} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-70px"}} transition={{delay:(index%4)*.07,duration:.5}} whileHover={{y:-7}} className="group overflow-hidden rounded-[28px] border border-black/[.07] bg-white shadow-[0_15px_50px_rgba(15,55,45,.055)] transition-shadow hover:shadow-[0_24px_65px_rgba(15,55,45,.12)]"><Link href={`/excellent/${service.slug}`} className="flex min-h-[410px] flex-col p-6"><div className="flex items-center justify-between"><span className={`grid h-12 w-12 place-items-center rounded-2xl ${service.tone}`}><service.icon className="h-5 w-5" /></span><span className="text-xs font-bold tracking-[.18em] text-[#a4b0ac]">{service.number}</span></div><h3 className="mt-7 text-xl font-semibold leading-tight tracking-[-.025em] text-[#15332d]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#697a75]">{service.description}</p><div className="mt-auto space-y-2 border-t border-black/[.06] pt-5">{service.items.map(item => <div key={item} className="flex items-center gap-2 text-xs font-semibold text-[#456159]"><CircleDot className="h-3.5 w-3.5 text-[#45a88a]" />{item}</div>)}</div><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#277861]">Ver ficha completa <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></Link></motion.article>)}</div>
          <div className="mt-8 flex justify-center"><Link href="/excellent/catalogo" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#bad6cd] bg-white px-6 text-sm font-bold text-[#245f50] transition hover:-translate-y-0.5 hover:bg-[#eaf5f1]">Ver los 8 servicios en el catálogo<ArrowRight className="h-4 w-4" /></Link></div>
          <p className="mt-6 text-center text-xs leading-5 text-[#7d8e88]">La disponibilidad, método y alcance se confirman después de revisar el objetivo y las condiciones de la muestra.</p>
        </section>

        <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#0b211d] py-24 text-white sm:py-32"><div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(112,221,184,.18)_0,transparent_54%)]" /><div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#83dfc0]">Un proceso visible</p><h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.045em] sm:text-5xl">De tu pregunta a un resultado interpretable</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">Un buen análisis molecular comienza antes de encender el equipo: empieza con una pregunta clara y una muestra adecuada.</p></div><div className="relative mt-14 grid gap-4 lg:grid-cols-5"><div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[#6fd2b0]/45 to-transparent lg:block" />{workflow.map(([number,title,text],index) => <motion.div key={number} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}} className="relative rounded-[24px] border border-white/10 bg-white/[.055] p-5 backdrop-blur-xl"><span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#88e2c3]/35 bg-[#102f29] text-xs font-bold text-[#94e5c9] shadow-[0_0_0_7px_#0b211d]">{number}</span><h3 className="mt-7 text-base font-bold">{title}</h3><p className="mt-3 text-xs leading-6 text-white/55">{text}</p></motion.div>)}</div></div></section>

        <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#30866f]">Áreas de aplicación</p><h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-.045em] text-[#102e28] sm:text-5xl">Una plataforma, distintos contextos</h2></div><div className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">{(Object.keys(applications) as ApplicationKey[]).map(key => <button key={key} type="button" onClick={() => setActiveApplication(key)} className={`shrink-0 rounded-full px-5 py-3 text-xs font-bold transition sm:text-sm ${activeApplication===key ? "bg-[#143d34] text-white shadow-[0_10px_30px_rgba(20,61,52,.18)]" : "border border-black/[.08] bg-[#f5f7f6] text-[#536a63] hover:bg-[#eaf3f0]"}`}>{key}</button>)}</div>
          <div className="mt-8 overflow-hidden rounded-[34px] border border-black/[.07] bg-[#f3f7f5]"><AnimatePresence mode="wait"><motion.div key={activeApplication} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.32}} className="grid lg:grid-cols-[.88fr_1.12fr]"><div className="relative min-h-[330px] overflow-hidden lg:min-h-[510px]"><Image src={application.image} alt={application.title} fill className="object-cover" sizes="(min-width:1024px) 45vw, 100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a2b23]/65 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-white backdrop-blur-xl">exCELLlent · {activeApplication}</div></div><div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#33836d]">{application.eyebrow}</p><h3 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-.035em] text-[#15332d] sm:text-4xl">{application.title}</h3><p className="mt-5 text-sm leading-7 text-[#60746d] sm:text-base">{application.description}</p><div className="mt-7 flex flex-wrap gap-2">{application.tags.map(tag => <span key={tag} className="rounded-full border border-[#bbd8cf] bg-white px-3.5 py-2 text-xs font-semibold text-[#3e6559]">{tag}</span>)}</div><WhatsAppContact message={`Hola, quisiera evaluar un análisis molecular de ${activeApplication.toLowerCase()} con exCELLlent.`} className="group mt-8 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-[#143d34] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1c5849]">Consultar esta aplicación<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></WhatsAppContact></div></motion.div></AnimatePresence></div>
        </div></section>

        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#30866f]">Antes de enviar</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-[#102e28] sm:text-5xl">Preguntas frecuentes</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#657770] sm:text-base">La muestra correcta protege la calidad del resultado. Nuestro equipo te indicará cómo prepararla antes del envío.</p></div><div className="space-y-3">{faqs.map(([question,answer],index) => <motion.details key={question} initial={{opacity:0,x:18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:index*.06}} className="group rounded-[24px] border border-black/[.07] bg-white p-5 shadow-[0_10px_35px_rgba(15,55,45,.04)] open:bg-[#edf6f3] sm:p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold text-[#17352e] sm:text-base">{question}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e5f3ee] text-[#2d816a] transition-transform duration-300 group-open:rotate-90"><ChevronRight className="h-4 w-4" /></span></summary><p className="max-w-2xl pt-4 text-sm leading-7 text-[#62756e]">{answer}</p></motion.details>)}</div></div></section>

        <section className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8"><div data-navbar-theme="dark" className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#0a241e] px-6 py-14 text-white shadow-[0_30px_100px_rgba(12,54,43,.18)] sm:px-10 sm:py-16 lg:px-14"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[46px] border-[#7ee0be]/[.06]" /><div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8ce4c6]">Empecemos por la muestra</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Cuéntanos qué necesitas descubrir</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Indica el tipo de muestra, el objetivo y el número aproximado de unidades. Te ayudaremos a definir el siguiente paso.</p></div><WhatsAppContact message="Hola, quiero evaluar una muestra para análisis molecular con exCELLlent." className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#83e2c2] px-7 text-sm font-bold text-[#08251e] transition hover:-translate-y-1 hover:bg-[#a3efd7]">Solicitar evaluación<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></WhatsAppContact></div></div></section>
      </main>
      <Footer />
    </div>
  )
}
