"use client"

import Image from "next/image"

export default function AboutMission() {
  return (
    <section id="mision" className="w-full py-40 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#2e7d32] opacity-4 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
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

          {/* Right - Stats */}
          <div className="space-y-8 lg:pt-6">
            <div className="bg-gradient-to-br from-[#f8f6f1] to-[#f0ebe5] rounded-3xl p-12 shadow-xl border border-gray-200/50">
              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-serif font-bold text-[#2e7d32] leading-none">27</div>
                  <div>
                    <p className="font-bold text-gray-900">Años</p>
                    <p className="text-gray-600 text-sm mt-1">De trayectoria en biotecnología</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-gray-300 to-transparent"></div>

                <div className="flex items-start gap-6">
                  <div className="text-5xl font-serif font-bold text-[#e65100] leading-none">4</div>
                  <div>
                    <p className="font-bold text-gray-900">Áreas</p>
                    <p className="text-gray-600 text-sm mt-1">De especialización técnica</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-gray-300 to-transparent"></div>

                <div className="flex items-start gap-6">
                  <div className="text-5xl font-serif font-bold text-purple-600 leading-none">30+</div>
                  <div>
                    <p className="font-bold text-gray-900">Profesionales</p>
                    <p className="text-gray-600 text-sm mt-1">Equipo dedicado a la excelencia</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-gray-300 to-transparent"></div>

                <div className="flex items-start gap-6">
                  <div className="text-5xl font-serif font-bold text-blue-600 leading-none">100%</div>
                  <div>
                    <p className="font-bold text-gray-900">Sostenible</p>
                    <p className="text-gray-600 text-sm mt-1">Compromiso con el ambiente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
