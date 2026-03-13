"use client"

import Link from "next/link"

export default function AboutCTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#01283c] mb-4">¿Quieres conocer más?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Contáctanos para descubrir cómo nuestras soluciones pueden impulsar tu negocio agrícola
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="bg-[#2e7d32] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e5a24] transition-colors inline-block"
          >
            Contactar
          </Link>
          <Link
            href="/servicios"
            className="bg-white text-[#2e7d32] border-2 border-[#2e7d32] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors inline-block"
          >
            Conocer Servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
