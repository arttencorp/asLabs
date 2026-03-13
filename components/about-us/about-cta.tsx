'use client'

import Link from "next/link"

export default function AboutCTA() {
  return (
    <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Trabajemos Juntos</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones innovadoras en biotecnología pueden transformar tu operación agrícola
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/contacto"
            className="px-8 py-3 bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 inline-block"
          >
            Contactar Ahora
          </Link>
          <Link
            href="/servicios"
            className="px-8 py-3 bg-gradient-to-r from-[#e65100] to-[#bf360c] text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 inline-block"
          >
            Ver Servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
