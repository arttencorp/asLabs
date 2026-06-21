"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Bug, Microscope, Beaker, Settings, ArrowRight } from "lucide-react"
import Image from "next/image"

interface Laboratory {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  darkColor: string
  borderColor: string
  description: string
  capabilities: string[]
  images: string[]
  status: "active" | "construction"
  director: string
  staff?: string[]
}

const laboratories: Laboratory[] = [
  {
    id: "biotecnologia-vegetal",
    name: "Laboratorio de Biotecnología Vegetal",
    icon: <Leaf className="w-8 h-8" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    darkColor: "from-green-600 to-green-700",
    borderColor: "border-green-200",
    description:
      "Especializado en técnicas avanzadas de cultivo de tejidos, micropropagación y clonación de plantas. Producimos plantas in vitro con tecnología de punta para mejoramiento genético y producción masiva.",
    capabilities: [
      "Cultivo de tejidos y micropropagación",
      "Clonación de plantas in vitro",
      "Producción de plantas libres de patógenos",
      "Optimización de protocolos de regeneración",
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BIOTECNOLOGIA%20VEG-GyhXkB27VJsVbo3cdugMjcKoWihfwr.webp"],
    status: "active",
    director: "Mblga. Melissa Torres Medina",
  },
  {
    id: "control-biologico",
    name: "Laboratorio de Control Biológico",
    icon: <Bug className="w-8 h-8" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    darkColor: "from-orange-600 to-orange-700",
    borderColor: "border-orange-200",
    description:
      "Dedicado al desarrollo y producción de agentes de control biológico. Producimos hongos, bacterias y microorganismos para el control sostenible de plagas agrícolas.",
    capabilities: [
      "Producción de Trichoderma harzianum",
      "Cultivo de Beauveria bassiana",
      "Producción de bacterias entomopatógenas",
      "Formulación de biopreparados",
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CONTROL%20BIOLOGICO-PBIfuHXR9abP20GJwXF3zEylDr3QKZ.webp"],
    status: "active",
    director: "Blga. Natasha Escobar Arana",
  },

  {
    id: "analisis-agroindustriales",
    name: "Laboratorio de Análisis Industriales",
    icon: <Beaker className="w-8 h-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    darkColor: "from-purple-600 to-purple-700",
    borderColor: "border-purple-200",
    description:
      "Especializado en análisis físico-químicos de productos agroindustriales con estándares internacionales. Realizamos caracterización de suelos, aguas, fertilizantes y productos finales.",
    capabilities: [
      "Análisis de composición de suelos",
      "Determinación de nutrientes",
      "Análisis de aguas de riego",
      "Evaluación de calidad de productos agrícolas",
    ],
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGROINDUSTRIAL%20ANALISIS-ZHa0j4mU8ZtZY7Jn8PXyrP82dLfCwb.webp"],
    status: "active",
    director: "Ing. Agroind. Renzo Tarrillo",
    staff: ["Mblga. Rosa Nancy Mejia"],
  },
  {
    id: "bioprocesos-industriales",
    name: "Laboratorio de Bioprocesos Industriales",
    icon: <Settings className="w-8 h-8" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    darkColor: "from-red-600 to-red-700",
    borderColor: "border-red-200",
    description:
      "Laboratorio dedicado a la formulación de bacterias, cianobacterias y microorganismos para aplicaciones industriales y agroindustriales. Desarrollamos bioprocesos innovadores para soluciones sostenibles.",
    capabilities: [
      "Formulación de bacterias benéficas",
      "Cultivo de cianobacterias",
      "Desarrollo de bioprocesos",
      "Aplicaciones industriales y agroindustriales",
    ],
    images: [],
    status: "active",
    director: "Mblga Rosa Nancy Mejia Malabrigo",
    staff: [
      "Practicante: Helem Iveth Guevara Nuñez",
      "Practicante: Andy Hassan Espinales Gutierrez",
      "Practicante: Luis Alonso Flores Ramirez",
    ],
  },
]

export default function LaboratoriesSection() {
  return (
    <section className="py-20 md:py-24 px-4 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl -ml-40"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Premium Header */}
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-widest">Infraestructura Especializada</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Laboratorios</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Laboratorios de investigación de clase mundial equipados con tecnología de punta y liderados por expertos en biotecnología
          </p>
          
          {/* Admin Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-gray-900">Dirección General:</span> 
              <span className="text-emerald-600 font-semibold ml-2">Guevara Escobar Antonio</span>
            </p>
          </div>
        </div>

        {/* Laboratories Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {laboratories.map((lab) => (
            <a
              key={lab.id}
              href={`/laboratorios/${lab.id}`}
              className="group relative h-full"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200 group-hover:border-emerald-300 transition-all duration-300 group-hover:shadow-2xl"></div>

              <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 group-hover:border-emerald-300 transition-all duration-300 group-hover:shadow-2xl bg-white">
                {/* Image or Icon Banner */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br group-hover:shadow-inner transition-all">
                  {lab.images && lab.images.length > 0 ? (
                    <>
                      <img
                        src={lab.images[0]}
                        alt={lab.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                    </>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${lab.darkColor} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">{lab.icon}</div>
                      <div className={`text-7xl ${lab.color} opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:scale-110`}>
                        {lab.icon}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-7 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-12 h-12 ${lab.bgColor} rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-emerald-300 transition-all`}>
                        <div className={lab.color}>{lab.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug">
                          {lab.name}
                        </h3>
                      </div>
                    </div>
                    {lab.status === "construction" && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full whitespace-nowrap ml-2">
                        En construcción
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {lab.description}
                  </p>

                  {/* Capabilities Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {lab.capabilities.slice(0, 2).map((capability, idx) => (
                      <span key={idx} className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                        {capability}
                      </span>
                    ))}
                    {lab.capabilities.length > 2 && (
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                        +{lab.capabilities.length - 2} más
                      </span>
                    )}
                  </div>

                  {/* Director Info */}
                  <div className="pt-6 border-t border-gray-200 space-y-3">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Director/a</p>
                      <p className="text-sm font-semibold text-gray-900">{lab.director}</p>
                    </div>
                    {lab.staff && lab.staff.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Equipo</p>
                        <div className="space-y-1">
                          {lab.staff.map((member, idx) => (
                            <p key={idx} className="text-xs text-gray-600">{member}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-4 transition-all">
                    <span>Explorar laboratorio</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-lg">→</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
