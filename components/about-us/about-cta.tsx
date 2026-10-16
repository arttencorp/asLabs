"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { WhatsAppContact } from "@/components/whatsapp-contact"

export default function AboutCTA() {
  return (
    <section data-navbar-theme="light" className="border-y border-[#d5ddd7] bg-white py-14 sm:py-16">
      <ScrollReveal className="mx-auto grid max-w-[1360px] gap-7 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><p className="text-[11px] font-semibold text-[#0b7a55]">Hablemos de tu proyecto</p><h2 className="mt-3 max-w-[800px] text-[clamp(2rem,3.5vw,3.4rem)] font-medium leading-[1.04] tracking-[-.04em] text-[#17211d]">Una necesidad técnica merece una conversación clara.</h2></div>
        <div className="flex flex-wrap gap-3 lg:justify-end"><WhatsAppContact message="Hola, quisiera conversar sobre una solución de biotecnología para mi operación agrícola" className="inline-flex h-11 items-center gap-2 bg-[#062b22] px-5 text-xs font-semibold text-white hover:bg-[#0b4a39]"><MessageCircle className="h-4 w-4" />Hablar con un asesor</WhatsAppContact><Link href="/servicios" className="group inline-flex h-11 items-center gap-3 border border-[#bcc9c1] px-5 text-xs font-semibold text-[#173d2e] hover:bg-[#f2f5f2]">Ver servicios <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
      </ScrollReveal>
    </section>
  )
}
