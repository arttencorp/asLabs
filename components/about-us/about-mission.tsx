"use client"

import Image from "next/image"

export default function AboutMission() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-[#01283c] mb-6">Nuestra Historia</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              AS Laboratorios Control Biológico fue fundada en el año 2000 como un pequeño laboratorio especializado en cultivo in vitro de plantas de banano. A lo largo de más de 20 años, hemos crecido y evolucionado.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Hoy somos una empresa integral que ofrece soluciones en biotecnología vegetal, control biológico, servicios de diagnóstico agrícola y materiales educativos de primera calidad para universidades peruanas.
            </p>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#01283c]">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Desarrollar y proveer soluciones biotecnológicas innovadoras y sostenibles para la agricultura peruana, contribuyendo a la seguridad alimentaria, conservación ambiental y formación de nuevos científicos.
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/scientist-laptop.png"
                alt="Equipo de AS Laboratorios"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
