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
            Laboratorios especializados con tecnología moderna para investigación.
          </p>
        </div>

        {/* Laboratories Grid 2x2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {laboratories.map((lab) => (
            <a
              key={lab.id}
              href={`/laboratorios/${lab.id}`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Banner Image */}
              <div className={`${lab.bgColor} h-40 flex items-center justify-center relative overflow-hidden`}>
                <div className={`${lab.color} text-5xl opacity-20`}>
                  {lab.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`${lab.color} p-2 rounded`}>
                    {lab.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {lab.name}
                    </h3>
                  </div>
                  {lab.status === "construction" && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded whitespace-nowrap">
                      Por construir
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{lab.description}</p>
                <div className="mt-4 text-green-600 text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                  Ver más
                  <span>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
