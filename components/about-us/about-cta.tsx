'use client'

import Link from "next/link"

export default function AboutCTA() {
  const whatsappUrl = "https://wa.me/51961996645?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios"

  return (
    <section className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f5f7f5] via-[#f8f5ef] to-[#eef6f1]">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Trabajemos Juntos</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones innovadoras en biotecnología pueden transformar tu operación agrícola
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-[#2f7a57] to-[#245f45] text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 inline-block"
          >
            Contactar Ahora
          </a>
          <Link
            href="/servicios"
            className="px-8 py-3 bg-gradient-to-r from-[#c27737] to-[#9e5b25] text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 inline-block"
          >
            Ver Servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
