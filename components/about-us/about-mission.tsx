"use client"

import Image from "next/image"

export default function AboutMission() {
  return (
    <section id="mision" className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-green-100 opacity-20 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Text Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-[0.2em] bg-green-50 px-4 py-2 rounded-full">
                  Nuestra Trayectoria
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">Nuestra Historia</h2>
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

            <div className="pt-12 border-t-2 border-green-200 space-y-6">
              <div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#2e7d32] rounded-full"></span>
                  Misión
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  Desarrollar y proveer soluciones biotecnológicas innovadoras y sostenibles para la agricultura 
                  peruana, contribuyendo a la seguridad alimentaria, conservación ambiental y formación de nuevos científicos.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#e65100] rounded-full"></span>
                  Visión
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  Ser líderes en biotecnología agrícola en América Latina, reconocidos por nuestra investigación 
                  de calidad, innovación continua y compromiso con la sostenibilidad.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg">
              <div className="space-y-10">
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
