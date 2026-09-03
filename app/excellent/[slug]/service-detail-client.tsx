"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Dna, FileText, FlaskConical, Layers3, Microscope, PackageCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import type { ExcellentService } from "@/data/excellent-catalog"

export default function ExcellentServiceDetail({ service, related }: { service: ExcellentService; related: ExcellentService[] }) {
  const blocks = [
    { icon: Microscope, title: "Servicios incluidos", items: service.services },
    { icon: PackageCheck, title: "Muestras evaluables", items: service.samples },
    { icon: FlaskConical, title: "Técnicas aplicables", items: service.techniques },
    { icon: FileText, title: "Entregables", items: service.deliverables },
  ]
  return (
    <div className="min-h-screen bg-[#f4f7f6] font-[var(--font-poppins)] text-[#132d27]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#071b17] px-4 pb-20 pt-28 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-8">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(112,213,178,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(112,213,178,.08)_1px,transparent_1px)] [background-size:58px_58px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_.8fr]">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}}>
              <div className="flex flex-wrap items-center gap-4"><Link href="/excellent/catalogo" className="inline-flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-white"><ArrowLeft className="h-4 w-4" />Catálogo</Link><span className="h-1 w-1 rounded-full bg-white/25" /><span className="text-xs font-bold uppercase tracking-[.2em] text-[#8ce2c5]">Ficha {service.number}</span></div>
              <Image src="/images/excellent-logo-transparent.png" alt="exCELLlent" width={2172} height={724} className="mt-8 h-auto w-[160px] brightness-0 invert sm:w-[190px]" priority />
              <p className="mt-7 text-xs font-bold uppercase tracking-[.2em]" style={{color:service.accent}}>{service.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">{service.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><WhatsAppContact message={`Hola, quisiera cotizar ${service.title} con exCELLlent.`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#8de2c5] px-7 text-sm font-bold text-[#09251e] transition hover:-translate-y-1">Cotizar este análisis<ArrowRight className="h-4 w-4" /></WhatsAppContact><a href="#alcance" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-7 text-sm font-bold text-white">Ver alcance<Layers3 className="h-4 w-4" /></a></div>
            </motion.div>
            <motion.div initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{delay:.15}} className="relative min-h-[320px] overflow-hidden rounded-[34px] border border-white/15 sm:min-h-[430px]"><Image src={service.image} alt={service.title} fill className="object-cover" sizes="(min-width:1024px) 42vw,100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#061c17]/75 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/15 bg-black/25 p-5 backdrop-blur-xl"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><Dna className="h-5 w-5 text-[#91e5c8]" /></span><div><p className="text-xs font-bold">Evaluación previa obligatoria</p><p className="mt-1 text-[11px] text-white/55">Confirmamos muestra, conservación y alcance antes de procesar.</p></div></div></div></motion.div>
          </div>
        </section>

        <section id="alcance" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"><div className="grid gap-5 md:grid-cols-2">{blocks.map((block,index) => <motion.article key={block.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:(index%2)*.08}} className="rounded-[30px] border border-black/[.07] bg-white p-6 shadow-[0_16px_50px_rgba(14,54,44,.055)] sm:p-8"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8f4f0] text-[#2e8069]"><block.icon className="h-5 w-5" /></span><h2 className="text-xl font-semibold tracking-[-.025em]">{block.title}</h2></div><ul className="mt-7 grid gap-3 sm:grid-cols-2">{block.items.map(item => <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#5f746d]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#40a584]" />{item}</li>)}</ul></motion.article>)}</div>
          <div className="mt-8 rounded-[30px] border border-[#a9d5c7] bg-[#eaf5f1] p-6 sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#307d68]"><ClipboardCheck className="h-5 w-5" /></span><div><h2 className="font-bold">El alcance se confirma en la cotización</h2><p className="mt-1 text-sm leading-6 text-[#58736a]">La técnica, límites, controles, plazo y entregables pueden variar según la matriz y el objetivo. Esta ficha presenta posibilidades de servicio, no un método único para todos los casos.</p></div></div></div>
        </section>

        <section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#32826d]">También puede interesarte</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Explora otras líneas</h2></div><Link href="/excellent/catalogo" className="hidden items-center gap-2 text-xs font-bold text-[#256d59] sm:flex">Ver catálogo completo<ArrowRight className="h-4 w-4" /></Link></div><div className="mt-8 grid gap-4 md:grid-cols-3">{related.map(item => <Link key={item.slug} href={`/excellent/${item.slug}`} className="group rounded-[24px] border border-black/[.07] bg-[#f5f8f7] p-5 transition hover:-translate-y-1 hover:bg-[#edf5f2]"><span className="text-[10px] font-black tracking-[.18em] text-[#82948e]">{item.number}</span><h3 className="mt-5 text-lg font-semibold">{item.title}</h3><span className="mt-6 flex items-center gap-2 text-xs font-bold text-[#2c755f]">Abrir ficha<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>
      </main>
      <Footer />
    </div>
  )
}
