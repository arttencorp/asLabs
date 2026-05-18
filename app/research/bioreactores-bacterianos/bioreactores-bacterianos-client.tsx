"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle,
  Clock,
  Play,
  Zap,
  Droplets,
  DnaIcon as DNA,
  Gauge,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BioreactoresBacterianoClient() {
  const [showAdvances, setShowAdvances] = useState(false)

  const advances = [
    {
      title: "Diseño Conceptual de Bioreactores",
      date: "7 de Enero, 2027",
      status: "pending",
      progress: 0,
      description:
        "Análisis de requisitos de diseño, selección de configuración (lote, lote alimentado, continuo) y cálculos de escalamiento.",
    },
    {
      title: "Selección de Materiales y Componentes",
      date: "28 de Enero, 2027",
      status: "pending",
      progress: 0,
      description:
        "Evaluación y especificación de sistemas de aireación, agitación, control de temperatura y monitoreo de parámetros.",
    },
    {
      title: "Construcción de Prototipo 10L",
      date: "20 de Febrero, 2027",
      status: "pending",
      progress: 0,
      description:
        "Fabricación del primer bioreactor prototipo con capacidad de 10 litros y calibración de sistemas de control.",
    },
    {
      title: "Optimización de Parámetros de Fermentación",
      date: "10 de Marzo, 2027",
      status: "pending",
      progress: 0,
      description:
        "Determinación experimental de condiciones óptimas: pH, temperatura, aireación y velocidad de agitación para diferentes cepas bacterianas.",
    },
    {
      title: "Evaluación de Viabilidad Bacteriana",
      date: "5 de Abril, 2027",
      status: "pending",
      progress: 0,
      description:
        "Desarrollo de protocolos de medición de viabilidad, recuento y determinación de tiempo de vida útil post-cosecha.",
    },
    {
      title: "Construcción de Bioreactor 50L",
      date: "20 de Mayo, 2027",
      status: "pending",
      progress: 0,
      description:
        "Escalamiento del bioreactor a 50 litros con validación de parámetros de fermentación a mayor escala.",
    },
    {
      title: "Optimización de Costos de Producción",
      date: "15 de Junio, 2027",
      status: "pending",
      progress: 0,
      description:
        "Análisis económico comparativo y definición de estrategias de reducción de costos de producción.",
    },
  ]

  const methodology = [
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Ingeniería de Diseño",
      description: "Modelamiento matemático de procesos de fermentación y escalamiento racional de bioreactores",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Fermentación Controlada",
      description: "Monitoreo en tiempo real de pH, oxígeno disuelto, temperatura y densidad óptica del cultivo",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimización de Parámetros",
      description: "Experimentación sistemática para determinar condiciones óptimas de crecimiento bacteriano",
    },
    {
      icon: <DNA className="w-8 h-8" />,
      title: "Control de Calidad",
      description: "Caracterización de suspensiones bacterianas: viabilidad, pureza, estabilidad y potencia biológica",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-600/30 rounded-full text-cyan-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2" />
              Proyecto de Ingeniería Biológica
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Diseño y Producción de Bioreactores
              <span className="block text-cyan-300">Suspensiones Bacterianas a Gran Escala</span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 mb-4 leading-relaxed">
              Optimización de Fermentación y Escalamiento Biotecnológico
            </p>
            <p className="text-lg text-cyan-200 mb-8">
              Producción sostenible de agentes de control biológico
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-cyan-300">Fase 1</div>
                <div className="text-sm text-cyan-200">Estado Actual</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-cyan-300">0%</div>
                <div className="text-sm text-cyan-200">Progreso General</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-cyan-300">2027-2028</div>
                <div className="text-sm text-cyan-200">Duración Estimada</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Resumen del Proyecto</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                La producción a gran escala de <strong>agentes de control biológico bacteriano</strong> requiere sistemas de fermentación optimizados que garanticen consistencia, viabilidad y eficiencia de costos. Los bioreactores actuales disponibles comercialmente son frecuentemente costosos e inadecuados para las condiciones locales.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Este proyecto se propone <strong>diseñar, construir y optimizar bioreactores</strong> de bajo costo para la producción de <strong>suspensiones bacterianas de alta calidad</strong>, con especial énfasis en <em>Bacillus</em>, <em>Pseudomonas</em> y otros géneros bacterianos con aplicación en control biológico. El proyecto incluye escalamiento desde 10 hasta 50 litros de capacidad útil.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Los bioreactores desarrollados permitirán a AS Laboratorios <strong>producir formulaciones de biocontrol en mayor volumen</strong>, reduciendo costos operativos y mejorando la competitividad de sus productos en el mercado agrícola peruano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Equipo del Proyecto</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-2">
                  Andy Hassan Espinales Gutiérrez
                </h3>
                <p className="text-cyan-700 mb-3">Investigador</p>
                <p className="text-sm text-gray-600">
                  Jefe de Microbiología Agroindustrial con experiencia en fermentación y producción de microorganismos a escala comercial.
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-2">
                  Luis Alonso Flores Ramírez
                </h3>
                <p className="text-cyan-700 mb-3">Investigador</p>
                <p className="text-sm text-gray-600">
                  Especialista en operación de equipos de laboratorio y construcción de sistemas de fermentación a pequeña escala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Metodología</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {methodology.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-600 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-cyan-600 flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Cronograma de Avances</h2>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowAdvances(!showAdvances)}
                className="w-full flex items-center justify-between p-6 hover:bg-cyan-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {showAdvances ? "Ocultar" : "Mostrar"} Detalles del Cronograma
                </h3>
                {showAdvances ? (
                  <ChevronUp className="w-6 h-6 text-cyan-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-cyan-600" />
                )}
              </button>

              {showAdvances && (
                <div className="p-6 border-t border-cyan-200 space-y-4">
                  {advances.map((advance, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {advance.status === "completed" ? (
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        ) : advance.status === "in-progress" ? (
                          <Play className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        ) : (
                          <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        )}
                        {index < advances.length - 1 && (
                          <div className="w-1 h-8 bg-gray-300 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{advance.title}</h4>
                        <p className="text-sm text-cyan-600 mb-2">{advance.date}</p>
                        <p className="text-gray-600 text-sm mb-2">{advance.description}</p>
                        {advance.progress && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-600">Progreso</span>
                              <span className="text-xs font-bold text-cyan-600">{advance.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-cyan-600 h-2 rounded-full transition-all"
                                style={{ width: `${advance.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Objetivos del Proyecto</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 border-l-4 border-cyan-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Objetivo General</h3>
                <p className="text-gray-700">
                  Diseñar, construir y optimizar bioreactores de bajo costo para la producción de suspensiones bacterianas de calidad controlada, escalables desde 10 hasta 50 litros de capacidad.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">Objetivos Específicos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Diseñar prototipo de bioreactor modular optimizado para cepas bacterianas de interés</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Optimizar parámetros de fermentación: pH, temperatura, aireación y agitación</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Desarrollar protocolos de monitoreo en tiempo real de parámetros de fermentación</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">4.</span>
                    <span>Evaluar viabilidad y estabilidad de suspensiones bacterianas producidas</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">5.</span>
                    <span>Realizar análisis económico y validación de escalamiento a 50 litros</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">6.</span>
                    <span>Documentar procedimientos operativos estándar para producción consistente</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
