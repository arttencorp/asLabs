"use client"

import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="w-full pt-40 pb-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-8 text-center">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.15em] mb-4">
              Nuestra Historia
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-gray-900 leading-tight">
              Biotecnología<br />al Servicio
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            En AS Laboratorios transformamos la agricultura peruana a través de la investigación 
            científica, control biológico sostenible y educación de excelencia.
          </p>
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">Desde 2015 innovando en biotecnología</p>
          </div>
        </div>
      </div>
    </section>
  )
}
