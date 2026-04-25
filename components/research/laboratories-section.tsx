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
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Laboratorios
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Cinco laboratorios especializados con tecnología moderna para investigación en biotecnología, control biológico y análisis agroindustriales.
          </p>
        </div>

        {/* Laboratories Grid */}
        <div className="space-y-8">
          {laboratories.map((lab) => (
            <div
              key={lab.id}
              className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${lab.borderColor}`}
            >
              {/* Header */}
              <div className={`${lab.bgColor} border-b ${lab.borderColor} p-6 flex items-center gap-4`}>
                <div className={`${lab.color} p-2`}>
                  {lab.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{lab.name}</h3>
                </div>
                {lab.status === "construction" && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                    Por construir
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Info */}
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{lab.description}</p>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Capacidades:</h4>
                    <ul className="space-y-2">
                      {lab.capabilities.map((capability, idx) => (
                        <li key={idx} className="text-gray-700 text-sm flex gap-2">
                          <span className={`${lab.color} font-bold`}>•</span>
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Images Grid */}
                <div>
                  <div className="grid grid-cols-2 gap-3">
                    {lab.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square rounded bg-gray-100 border ${lab.borderColor} flex items-center justify-center text-center`}
                      >
                        <div className={`${lab.color} text-xs text-gray-500`}>
                          Foto {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
