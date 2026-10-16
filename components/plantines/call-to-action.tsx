"use client"

import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function CallToActionSection() {
  return (
    <section data-navbar-theme="dark" className="bg-[#062b22] py-16 text-white sm:py-20">
      <ScrollReveal className="mx-auto grid max-w-[1360px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
        <div><p className="text-[11px] font-semibold text-[#a8d8c1]">Planifica tu pedido</p><h2 className="mt-3 max-w-[800px] text-[clamp(2rem,4vw,3.8rem)] font-medium leading-[1.03] tracking-[-.045em]">Confirma variedad, cantidad y fecha con el equipo técnico.</h2><p className="mt-5 max-w-[680px] text-sm leading-7 text-white/60">La recomendación depende del cultivo, zona, objetivo productivo y etapa de entrega requerida.</p></div>
        <div className="border-t border-white/15 pt-5 lg:justify-self-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="space-y-3">{["Disponibilidad confirmada antes del pedido", "Orientación para elegir la variedad", "Coordinación de entrega y soporte técnico"].map((item) => <p key={item} className="flex items-start gap-3 text-xs leading-5 text-white/70"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d5a34f]" />{item}</p>)}</div>
          <WhatsAppContact message="Hola, quisiera coordinar un pedido de plantines in vitro" className="group mt-6 inline-flex h-11 items-center gap-3 bg-[#d5a34f] px-5 text-xs font-semibold text-[#10251e] hover:bg-[#e4b866]"><MessageCircle className="h-4 w-4" />Hablar con el equipo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></WhatsAppContact>
        </div>
      </ScrollReveal>
    </section>
  )
}
