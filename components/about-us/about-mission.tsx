"use client"

import Image from "next/image"

export default function AboutMission() {
  return (
    <section id="mision" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div className="space-y-12">
          {/* Left - Text Content */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.2em] bg-[#e8f5e9] px-5 py-3 rounded-full border border-[#2e7d32]/20">
                  Nuestra Trayectoria
                </span>
              </div>
              <div>
                <h2 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 leading-tight mb-2">Nuestra</h2>
                <h2 className="text-6xl md:text-7xl font-serif font-bold text-[#2e7d32] leading-tight">Historia</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Fundada en 1997, AS Laboratorios nació como una visión de aplicar biotecnología avanzada 
                al servicio de la agricultura peruana. Comenzamos como un pequeño laboratorio especializado 
                en cultivo in vitro de plantas de banano.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Hoy somos una empresa integral con soluciones en biotecnología vegetal, control biológico 
                sostenible, diagnóstico agrícola y educación científica de excelencia, transformando la agricultura en toda la región.
              </p>
            </div>

            <div className="pt-12 border-t-2 border-gray-200 space-y-10">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#e8f5e9] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-serif text-[#2e7d32]">◆</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Misión</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-medium pl-16">
                  Desarrollar y proveer soluciones biotecnológicas innovadoras y sostenibles para la agricultura 
                  peruana, contribuyendo a la seguridad alimentaria, conservación ambiental y formación de nuevos científicos.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-serif text-[#e65100]">◆</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Visión</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-medium pl-16">
                  Ser líderes en biotecnología agrícola en América Latina, reconocidos por nuestra investigación 
                  de calidad, innovación continua y compromiso con la sostenibilidad.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-full min-h-[600px]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGROINDUSTRIAL%20ANALISIS-ObbdnPOmz6huCECzNFRd8h6eOPR2nr.webp"
              alt="Investigadores de AS Laboratorios en acción"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
