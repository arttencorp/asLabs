"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Dna, FlaskConical, Search, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { excellentServices } from "@/data/excellent-catalog"

export default function ExcellentCatalogClient() {
  return (
    <div className="min-h-screen bg-[#f4f7f6] font-[var(--font-poppins)] text-[#132c27]">
      <Navbar overlay />
      <main>
        <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#071b17] px-4 pb-20 pt-28 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-8">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(112,213,178,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(112,213,178,.08)_1px,transparent_1px)] [background-size:55px_55px]" />
          <div className="absolute right-[-12%] top-[-60%] h-[620px] w-[620px] rounded-full border-[80px] border-[#59c39f]/[.07]" />
          <div className="relative mx-auto max-w-7xl">
            <Link href="/excellent" className="inline-flex items-center gap-2 text-xs font-bold text-white/60 transition hover:text-white"><ArrowLeft className="h-4 w-4" />Volver a exCELLlent</Link>
            <div className="mt-9 grid items-end gap-10 lg:grid-cols-[1fr_.55fr]">
              <div>
                <Image src="/images/excellent-logo-transparent.png" alt="exCELLlent" width={2172} height={724} className="h-auto w-[190px] brightness-0 invert sm:w-[230px]" priority />
                <p className="mt-7 text-xs font-bold uppercase tracking-[.22em] text-[#89e0c2]">Catálogo molecular</p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Encuentra el análisis que responde a tu objetivo</h1>
              </div>
              <p className="max-w-lg text-sm leading-7 text-white/60 sm:text-base">Ocho líneas especializadas, organizadas por aplicación. Si tu caso no encaja exactamente, evaluamos un desarrollo a medida.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="flex flex-col justify-between gap-5 border-b border-black/[.08] pb-7 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#31836d]">8 líneas de servicio</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Portafolio exCELLlent</h2></div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[.07] bg-white px-4 py-2.5 text-xs font-semibold text-[#5d716a]"><Search className="h-4 w-4 text-[#3a9279]" />Selecciona una ficha para ver el detalle</div>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {excellentServices.map((service, index) => (
              <motion.article key={service.slug} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:(index%2)*.08}} className="group overflow-hidden rounded-[30px] border border-black/[.07] bg-white shadow-[0_15px_50px_rgba(14,54,44,.06)]">
                <Link href={`/excellent/${service.slug}`} className="grid min-h-[330px] sm:grid-cols-[.42fr_.58fr]">
                  <div className="relative min-h-[220px] overflow-hidden sm:min-h-full"><Image src={service.image} alt={service.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width:768px) 30vw, 100vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#09271f]/50 to-transparent" /><span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[10px] font-black tracking-[.2em] text-white backdrop-blur-xl">{service.number}</span></div>
                  <div className="flex flex-col p-6 sm:p-7"><p className="text-[10px] font-bold uppercase tracking-[.18em]" style={{color:service.accent}}>{service.eyebrow}</p><h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-.03em]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#687a74]">{service.description}</p><div className="mt-5 flex flex-wrap gap-2">{service.techniques.slice(0,3).map(item => <span key={item} className="rounded-full bg-[#eef4f2] px-3 py-1.5 text-[10px] font-bold text-[#547067]">{item}</span>)}</div><span className="mt-auto flex items-center gap-2 pt-7 text-xs font-bold text-[#1d6653]">Abrir ficha técnica <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8"><div data-navbar-theme="dark" className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[38px] bg-[#0a2a23] p-7 text-white sm:p-12 lg:flex-row lg:items-center"><div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[35px] border-white/[.04]" /><div className="relative"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#8de2c6]"><Sparkles className="h-4 w-4" />Orientación molecular</div><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">¿No sabes qué análisis corresponde?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Envíanos el objetivo, tipo de muestra y número aproximado. Nosotros te ayudamos a definir el camino.</p></div><WhatsAppContact message="Hola, necesito ayuda para elegir un análisis del catálogo exCELLlent." className="relative inline-flex min-h-14 shrink-0 items-center gap-3 rounded-full bg-[#8ce3c6] px-7 text-sm font-bold text-[#09251e] transition hover:-translate-y-1">Orientar mi caso<FlaskConical className="h-4 w-4" /></WhatsAppContact></div></section>
      </main>
      <Footer />
    </div>
  )
}
