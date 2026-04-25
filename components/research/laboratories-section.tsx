"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Bug, Microscope, Beaker, Settings } from "lucide-react"
import Image from "next/image"

interface Laboratory {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  capabilities: string[]
  image: string
  status: "active" | "construction"
}

const laboratories: Laboratory[] = [
  {
    id: "biotecnologia-vegetal",
    name: "Laboratorio de Biotecnología Vegetal",
    icon: <Leaf className="w-8 h-8" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description:
      "Laboratorio especializado en técnicas avanzadas de cultivo de tejidos, micropropagación y clonación de plantas. Contamos con tecnología de punta para la producción masiva de plantas in vitro y mejoramiento genético.",
    capabilities: [
      "Cultivo de tejidos y micropropagación",
      "Clonación de plantas in vitro",
      "Producción de plantas libres de patógenos",
      "Optimización de protocolos de regeneración",
      "Análisis genético de plantas clonadas",
    ],
    image: "/team/default-profile.jpg",
    status: "active",
  },
  {
    id: "control-biologico",
    name: "Laboratorio de Control Biológico",
    icon: <Bug className="w-8 h-8" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description:
      "Unidad dedicada al desarrollo y producción de agentes de control biológico. Producimos hongos, bacterias y otros microorganismos para el control de plagas agrícolas de forma sostenible.",
    capabilities: [
      "Producción de Trichoderma harzianum",
      "Cultivo de Beauveria bassiana",
      "Producción de bacterias entomopatógenas",
      "Ensayos de eficacia biológica",
      "Formulación de biopreparados",
    ],
    image: "/team/default-profile.jpg",
    status: "active",
  },
  {
    id: "biotecnologia",
    name: "Laboratorio de Biotecnología",
    icon: <Microscope className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description:
      "Laboratorio integral de biotecnología molecular con equipamiento avanzado para análisis genómico, PCR, secuenciación y técnicas de ingeniería genética aplicadas a mejoramiento vegetal.",
    capabilities: [
      "PCR y qPCR (Reacción en cadena de la polimerasa)",
      "Secuenciación genómica",
      "Análisis molecular de ADN",
      "Electroforesis y electroblotting",
      "Amplificación de fragmentos genómicos",
    ],
    image: "/team/default-profile.jpg",
    status: "active",
  },
  {
    id: "analisis-agroindustriales",
    name: "Laboratorio de Análisis Agroindustriales",
    icon: <Beaker className="w-8 h-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description:
      "Laboratorio especializado en análisis físico-químicos de productos agroindustriales. Realiza caracterización de suelos, aguas, fertilizantes y productos finales con estándares internacionales.",
    capabilities: [
      "Análisis de composición de suelos",
      "Determinación de nutrientes",
      "Análisis de aguas de riego",
      "Evaluación de calidad de productos agrícolas",
      "Ensayos de fertilidad y pH",
    ],
    image: "/team/default-profile.jpg",
    status: "active",
  },
  {
    id: "bioreactores",
    name: "Laboratorio de Diseño y Modelado de Bioreactores",
    icon: <Settings className="w-8 h-8" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description:
      "Unidad en construcción dedicada al diseño, modelado y escalado de bioreactores para producción a mayor escala. Aquí optimizaremos procesos fermentativos y producción de metabolitos de interés.",
    capabilities: [
      "Modelado de bioreactores",
      "Diseño de sistemas de fermentación",
      "Escalado de procesos",
      "Optimización de cultivos",
      "Control de parámetros biológicos (En desarrollo)",
    ],
    image: "/team/default-profile.jpg",
    status: "construction",
  },
]

export default function LaboratoriesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Laboratorios de Investigación
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            AS Laboratorios cuenta con cinco modernos laboratorios especializados, equipados con tecnología de punta
            para investigación y desarrollo en biotecnología, control biológico y análisis agroindustriales.
          </p>
        </div>

        {/* Laboratories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
          {laboratories.map((lab) => (
            <Card key={lab.id} className={`overflow-hidden border-l-4 hover:shadow-lg transition-shadow ${lab.bgColor}`}>
              <CardHeader className={`pb-4 ${lab.bgColor}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`${lab.color}`}>{lab.icon}</div>
                  {lab.status === "construction" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      Por Construir
                    </span>
                  )}
                </div>
                <CardTitle className="text-2xl text-gray-900">{lab.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <p className="text-gray-700 leading-relaxed">{lab.description}</p>

                {/* Image Placeholder */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className={`${lab.color} mb-2 flex justify-center`}>
                      {lab.icon}
                    </div>
                    <p className="text-gray-500 text-sm">Foto del laboratorio por agregar</p>
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <span className={`w-2 h-2 rounded-full ${lab.color.replace("text-", "bg-")} mr-2`}></span>
                    Capacidades Principales
                  </h4>
                  <ul className="space-y-2">
                    {lab.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className={`${lab.color} font-bold mr-3 flex-shrink-0`}>•</span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
