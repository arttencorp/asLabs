'use client'

import Link from "next/link"

export default function AboutCTA() {
  const whatsappUrl = "https://wa.me/51961996645?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios"

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#eaf3f8] via-[#edf5f5] to-[#e8f4ec] py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-y-0 right-[-12%] w-[46%] bg-[radial-gradient(circle_at_center,rgba(79,147,97,0.36)_0%,rgba(79,147,97,0.16)_35%,rgba(79,147,97,0)_74%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-[clamp(2.2rem,5.2vw,3.8rem)] font-bold leading-[1.05] tracking-tight text-[#071a40]">
          Trabajemos Juntos
        </h2>
        <p className="mt-7 text-[clamp(1rem,1.5vw,1.32rem)] leading-relaxed text-[#233d62] max-w-3xl mx-auto">
          Descubre cómo nuestras soluciones innovadoras en biotecnología pueden transformar tu operación agrícola
        </p>

        <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-w-[206px] rounded-xl bg-[#1f7a31] px-10 py-4 text-base font-bold text-white shadow-[0_18px_30px_-22px_rgba(31,122,49,0.95)] transition-colors hover:bg-[#196227]"
          >
            Contactar Ahora
          </a>
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center min-w-[206px] rounded-xl bg-[#d84f00] px-10 py-4 text-base font-bold text-white shadow-[0_18px_30px_-22px_rgba(216,79,0,0.95)] transition-colors hover:bg-[#b94100]"
          >
            Ver Servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
