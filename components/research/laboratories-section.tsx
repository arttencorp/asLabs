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
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-slate-800">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Laboratorios de Investigación
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Instalaciones especializadas con tecnología de punta para investigación científica de excelencia
          </p>
        </div>

        {/* Laboratories Grid 2x2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {laboratories.map((lab) => (
            <a
              key={lab.id}
              href={`/laboratorios/${lab.id}`}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-950"
            >
              {/* Gradient Background Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                   style={{backgroundImage: `linear-gradient(135deg, var(--color-main) 0%, var(--color-accent) 100%)`}}>
              </div>

              {/* Banner with Icon */}
              <div className="relative h-32 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden border-b border-slate-700">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  {lab.icon}
                </div>
                <div className="relative z-10 text-6xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {lab.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-slate-600 transition-colors">
                    {lab.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors text-lg">
                      {lab.name}
                    </h3>
                  </div>
                  {lab.status === "construction" && (
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full whitespace-nowrap border border-amber-500/30">
                      En construcción
                    </span>
                  )}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{lab.description}</p>
                
                {/* Capabilities Preview */}
                <div className="space-y-2 mb-4">
                  {lab.capabilities.slice(0, 2).map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="text-emerald-400 text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                  Ver detalles
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
