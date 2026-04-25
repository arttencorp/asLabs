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
    images: ["/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg"],
    status: "active",
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
    images: ["/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg"],
    status: "active",
  },
  {
    id: "biotecnologia",
    name: "Laboratorio de Biotecnología",
    icon: <Microscope className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    darkColor: "from-blue-600 to-blue-700",
    borderColor: "border-blue-200",
    description:
      "Laboratorio integral de biotecnología molecular con equipamiento avanzado. Realizamos análisis genómico, PCR, secuenciación e ingeniería genética aplicada a mejoramiento vegetal.",
    capabilities: [
      "PCR y qPCR (Reacción en cadena de la polimerasa)",
      "Secuenciación genómica",
      "Análisis molecular de ADN",
      "Amplificación de fragmentos genómicos",
    ],
    images: ["/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg"],
    status: "active",
  },
  {
    id: "analisis-agroindustriales",
    name: "Laboratorio de Análisis Agroindustriales",
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
    images: ["/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg"],
    status: "active",
  },
  {
    id: "bioreactores",
    name: "Laboratorio de Diseño y Modelado de Bioreactores",
    icon: <Settings className="w-8 h-8" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    darkColor: "from-red-600 to-red-700",
    borderColor: "border-red-200",
    description:
      "Unidad en construcción dedicada al diseño, modelado y escalado de bioreactores. Optimizaremos procesos fermentativos y producción de metabolitos de interés industrial.",
    capabilities: [
      "Modelado de bioreactores",
      "Diseño de sistemas de fermentación",
      "Escalado de procesos",
      "Optimización de cultivos (En desarrollo)",
    ],
    images: ["/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg", "/team/default-profile.jpg"],
    status: "construction",
  },
]

export default function LaboratoriesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block">
            <span className="px-4 py-2 bg-green-100 text-green-700 text-xs font-semibold rounded-full tracking-wider uppercase">
              Infraestructura de Investigación
            </span>
          </div>
          <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight">
            Nuestros Laboratorios Especializados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cinco modernos laboratorios equipados con tecnología de punta para investigación y desarrollo en biotecnología, control biológico y análisis agroindustriales.
          </p>
        </div>

        {/* Laboratories Grid */}
        <div className="space-y-12">
          {laboratories.map((lab, index) => (
            <div
              key={lab.id}
              className={`group rounded-2xl overflow-hidden border ${lab.borderColor} hover:shadow-2xl transition-all duration-300`}
            >
              {/* Header con color distintivo */}
              <div className={`bg-gradient-to-r ${lab.darkColor} p-8 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <div className="text-white">{lab.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{lab.name}</h3>
                  </div>
                </div>
                {lab.status === "construction" && (
                  <div className="px-4 py-2 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full whitespace-nowrap">
                    Construyendo
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-8 ${lab.bgColor}`}>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Description and Capabilities */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-700 leading-relaxed text-base">{lab.description}</p>
                    </div>

                    {/* Capabilities */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${lab.color.replace("text-", "bg-")}`}></span>
                        Capacidades Principales
                      </h4>
                      <ul className="space-y-3">
                        {lab.capabilities.map((capability, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700">
                            <ArrowRight size={18} className={`${lab.color} flex-shrink-0 mt-0.5`} />
                            <span className="text-sm">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Images Grid */}
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      {lab.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative group/image aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300"
                        >
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <div className="text-center">
                              <div className={`${lab.color} mb-2 flex justify-center`}>
                                {lab.icon}
                              </div>
                              <p className="text-gray-500 text-xs">Foto {idx + 1}</p>
                            </div>
                          </div>
                          {/* Overlay en hover */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                              <span className="text-white text-xs font-semibold">Hacer clic para ver</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">Las fotos se agregan en construcción</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            ¿Interesado en conocer más sobre nuestros servicios de investigación?
          </p>
          <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            Solicitar Información
          </button>
        </div>
      </div>
    </section>
  )
}
