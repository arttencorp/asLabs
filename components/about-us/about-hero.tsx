"use client"

import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="w-full pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 text-center">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.15em] mb-2">
              Nuestra Historia
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
              Biotecnología al Servicio
            </h1>
          </div>
          <p className="text-base text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            En AS Laboratorios transformamos la agricultura peruana a través de la investigación científica, control biológico sostenible y educación de excelencia.
          </p>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Desde 2015 innovando en biotecnología</p>
          </div>
        </div>
      </div>
    </section>
  )
}
