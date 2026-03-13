"use client"

import Image from "next/image"

export default function AboutMission() {
  return (
    <section id="mision" className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold text-[#2e7d32] uppercase tracking-[0.15em] mb-4">
                Fundación
              </p>
              <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Fundada en 2015, AS Laboratorios nació como una visión de aplicar biotecnología avanzada 
                al servicio de la agricultura peruana. Comenzamos como un pequeño laboratorio especializado 
                en cultivo in vitro de plantas de banano.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hoy somos una empresa integral con soluciones en biotecnología vegetal, control biológico 
                sostenible, diagnóstico agrícola y educación científica de excelencia.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Misión</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Desarrollar y proveer soluciones biotecnológicas innovadoras y sostenibles para la agricultura 
                peruana, contribuyendo a la seguridad alimentaria, conservación ambiental y formación de nuevos científicos.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Visión</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ser líderes en biotecnología agrícola en América Latina, reconocidos por nuestra investigación 
                de calidad, innovación continua y compromiso con la sostenibilidad.
              </p>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <p className="text-5xl font-light text-gray-900 mb-2">9+</p>
                <p className="text-lg text-gray-600 font-light">Años innovando</p>
              </div>
              <div className="pb-6 border-b border-gray-200">
                <p className="text-5xl font-light text-gray-900 mb-2">4</p>
                <p className="text-lg text-gray-600 font-light">Áreas de especialización</p>
              </div>
              <div className="pb-6 border-b border-gray-200">
                <p className="text-5xl font-light text-gray-900 mb-2">30+</p>
                <p className="text-lg text-gray-600 font-light">Profesionales del equipo</p>
              </div>
              <div>
                <p className="text-5xl font-light text-gray-900 mb-2">100%</p>
                <p className="text-lg text-gray-600 font-light">Compromiso con sostenibilidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
