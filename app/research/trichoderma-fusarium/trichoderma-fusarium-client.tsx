"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle,
  Clock,
  Play,
  Microscope,
  Shield,
  DnaIcon as DNA,
  Beaker,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TrichodermaFusariumClient() {
  const [showAdvances, setShowAdvances] = useState(false)

  const advances = [
    {
      title: "Aislamiento y Caracterización de Cepas",
      date: "15 de Febrero, 2027",
      status: "pending",
      progress: 0,
      description:
        "Recolección de muestras de suelo de La Libertad y aislamiento de cepas de Trichoderma y Fusarium oxysporum Raza 2.",
    },
    {
      title: "Identificación Molecular de Aislados",
      date: "28 de Febrero, 2027",
      status: "pending",
      progress: 0,
      description:
        "Análisis de secuencias de rDNA para identificación precisa de especies de Trichoderma y confirmación de Fusarium oxysporum Raza 2.",
    },
    {
      title: "Pruebas de Antagonismo in vitro",
      date: "15 de Marzo, 2027",
      status: "pending",
      progress: 0,
      description:
        "Cultivos duales para evaluar la capacidad de inhibición de Trichoderma contra el crecimiento de Fusarium oxysporum.",
    },
    {
      title: "Evaluación Bioquímica de Metabolitos Secundarios",
      date: "10 de Abril, 2027",
      status: "pending",
      progress: 0,
      description:
        "Identificación y cuantificación de compuestos volátiles y no volátiles producidos por Trichoderma con actividad antifúngica.",
    },
    {
      title: "Análisis de Expresión Génica",
      date: "25 de Mayo, 2027",
      status: "pending",
      progress: 0,
      description:
        "Uso de qRT-PCR para evaluar genes involucrados en síntesis de antibióticos y degradación de pared celular fúngica.",
    },
    {
      title: "Microscopía Electrónica de Interacciones",
      date: "15 de Junio, 2027",
      status: "pending",
      progress: 0,
      description:
        "Observación a nivel ultraestructural de los mecanismos de antagonismo en la interfaz Trichoderma-Fusarium.",
    },
  ]

  const methodology = [
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Cultivos Duales",
      description: "Evaluación de inhibición del crecimiento mediante placas de cultivo dual en diferentes medios de cultivo",
    },
    {
      icon: <Beaker className="w-8 h-8" />,
      title: "Análisis Bioquímico",
      description: "Caracterización de metabolitos secundarios y enzimas degradativas producidas por Trichoderma",
    },
    {
      icon: <DNA className="w-8 h-8" />,
      title: "Análisis Molecular",
      description: "Secuenciamiento genómico y análisis de expresión génica mediante qRT-PCR y transcriptómica",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pruebas de Eficacia",
      description: "Evaluación de reducción de patogenicidad de Fusarium en modelos biológicos controlados",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-600/30 rounded-full text-purple-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              Proyecto de Control Biológico
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Capacidad Antagonista de Trichoderma
              <span className="block text-purple-300">contra Fusarium Oxysporum</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-4 leading-relaxed">
              Mecanismos Moleculares de Biocontrol
            </p>
            <p className="text-lg text-purple-200 mb-8">
              Raza 2 aislados de La Libertad, Perú
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-purple-300">Fase 2</div>
                <div className="text-sm text-purple-200">Estado Actual</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-purple-300">55%</div>
                <div className="text-sm text-purple-200">Progreso General</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-purple-300">2024-2025</div>
                <div className="text-sm text-purple-200">Duración Estimada</div>
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
                <strong>Fusarium oxysporum</strong> Raza 2 es responsable del marchitamiento vascular en múltiples cultivos de importancia agrícola en La Libertad, Perú, causando pérdidas económicas significativas. El control químico tradicional es costoso y ambientalmente problemático.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Este proyecto investiga el <strong>potencial antagonista de cepas nativas de Trichoderma</strong> contra Fusarium oxysporum Raza 2, enfocándose en la elucidación de los <strong>mecanismos moleculares</strong> responsables del biocontrol, incluyendo producción de metabolitos antifúngicos, degradación enzimática de estructuras fúngicas y competencia por nutrientes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Los resultados permitirán el desarrollo de <strong>formulaciones de biocontrol</strong> eficaces y sostenibles basadas en mecanismos moleculares bien caracterizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Equipo Investigador</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  Antonio Victor Gabriel Guevara Escobar
                </h3>
                <p className="text-purple-700 mb-3">Investigador</p>
                <p className="text-sm text-gray-600">
                  Especialista en análisis de datos, biotecnología y microbiología aplicada con experiencia en investigación molecular.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  Hellem Iveth Guevara Nuñez
                </h3>
                <p className="text-purple-700 mb-3">Investigadora</p>
                <p className="text-sm text-gray-600">
                  Supervisora técnica de laboratorios con experiencia en cultivos microbianos y caracterización de patógenos.
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
                  className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-purple-600 flex-shrink-0">{item.icon}</div>
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

            <div className="bg-purple-50 border border-purple-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowAdvances(!showAdvances)}
                className="w-full flex items-center justify-between p-6 hover:bg-purple-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {showAdvances ? "Ocultar" : "Mostrar"} Detalles del Cronograma
                </h3>
                {showAdvances ? (
                  <ChevronUp className="w-6 h-6 text-purple-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-purple-600" />
                )}
              </button>

              {showAdvances && (
                <div className="p-6 border-t border-purple-200 space-y-4">
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
                        <p className="text-sm text-purple-600 mb-2">{advance.date}</p>
                        <p className="text-gray-600 text-sm mb-2">{advance.description}</p>
                        {advance.progress && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-600">Progreso</span>
                              <span className="text-xs font-bold text-blue-600">{advance.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
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
              <div className="bg-white rounded-lg p-6 border-l-4 border-purple-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Objetivo General</h3>
                <p className="text-gray-700">
                  Caracterizar los mecanismos moleculares de antagonismo de cepas nativas de Trichoderma contra Fusarium oxysporum Raza 2 para el desarrollo de formulaciones de biocontrol sostenibles.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">Objetivos Específicos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Aislar y caracterizar molecularmente cepas de Trichoderma de suelos de La Libertad</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Evaluar la capacidad antagonista in vitro de Trichoderma contra Fusarium oxysporum Raza 2</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Identificar metabolitos antifúngicos producidos por Trichoderma mediante análisis bioquímico</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">4.</span>
                    <span>Determinar el perfil de expresión génica de genes implicados en el antagonismo</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">5.</span>
                    <span>Proponer mecanismos moleculares de biocontrol basados en datos experimentales</span>
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
