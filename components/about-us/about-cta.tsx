'use client'

import Link from "next/link"

export default function AboutCTA() {
  return (
    <section className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-5xl font-light text-gray-900 mb-6">Trabajemos Juntos</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones en biotecnología pueden transformar tu operación agrícola
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/contacto"
            className="px-8 py-3 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors inline-block"
          >
            Contactar
          </Link>
          <Link
            href="/servicios"
            className="px-8 py-3 bg-white text-gray-900 border border-gray-900 font-light hover:bg-gray-50 transition-colors inline-block"
          >
            Explorar Servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
