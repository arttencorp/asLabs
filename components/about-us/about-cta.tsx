'use client'

import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { btnPrimary, btnAccent } from "@/components/ui/button-styles"

export default function AboutCTA() {
  return (
    <section data-navbar-theme="light" className="relative w-full overflow-hidden bg-gradient-to-br from-[#e8f5e9] via-white to-orange-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#2e7d32]/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#e65100]/10 blur-3xl"></div>
      <ScrollReveal className="max-w-4xl mx-auto text-center space-y-8 relative">
        <div>
          <h2 className="mb-6 text-3xl font-serif font-bold text-gray-900 sm:text-4xl md:text-5xl">Convirtamos una necesidad en una solución</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones innovadoras en biotecnología pueden transformar tu operación agrícola
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="https://wa.me/51961996645"
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Contactar Ahora
          </a>
          <Link href="/servicios" className={btnAccent}>
            Ver Servicios
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
