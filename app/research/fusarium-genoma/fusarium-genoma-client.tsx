"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle,
  Clock,
  Play,
  DnaIcon as DNA,
  Microscope,
  BarChart3,
  Database,
} from "lucide-react"

export default function FusariumGenomaClient() {
  const [showAdvances, setShowAdvances] = useState(false)

  const advances = [
    {
      title: "Revisión Bibliográfica y Diseño del Proyecto",
      date: "8 de Enero, 2024",
      status: "completed",
      description:
        "Análisis exhaustivo de la literatura científica sobre Fusarium oxysporum f. sp. cubense y diseño metodológico del proyecto de secuenciación.",
    },
    {
      title: "Obtención y Cultivo de Muestras",
      date: "22 de Enero, 2024",
      status: "completed",
      description:
        "Aislamiento y cultivo puro de cepas de Fusarium oxysporum f. sp. cubense Raza 4 en condiciones controladas de laboratorio.",
    },
    {
      title: "Extracción y Purificación de ADN",
      date: "15 de Febrero, 2024",
      status: "in-progress",
      description:
        "Proceso de extracción de ADN genómico de alta calidad utilizando protocolos optimizados para hongos filamentosos.",
      progress: 65,
    },
  ]

  const methodology = [
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Aislamiento y Cultivo",
      description:
        "Obtención de cultivos puros de F. oxysporum f. sp. cubense Raza 4 a partir de muestras de plantas infectadas",
    },
    {
      icon: <DNA className="w-8 h-8" />,
      title: "Extracción de ADN",
      description: "Extracción de ADN genómico de alta calidad utilizando kits especializados y protocolos optimizados",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Secuenciación NGS",
      description:
        "Secuenciación masiva utilizando tecnologías de nueva generación (Illumina NovaSeq) para obtener cobertura completa",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Ensamblaje y Análisis",
      description: "Ensamblaje de novo del genoma y análisis comparativo con otras razas para identificar genes únicos",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/30 rounded-full text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <DNA className="w-4 h-4 mr-2" />
              Proyecto de Secuenciación Genómica
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Secuenciación del Genoma de
              <span className="block text-blue-300 italic">Fusarium oxysporum f. sp. cubense</span>
              <span className="block text-2xl md:text-3xl font-normal mt-2">Raza 4</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Desentrañando los secretos genéticos del patógeno más devastador del banano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-blue-300">Fase 0</div>
                <div className="text-sm text-blue-200">Estado Actual</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-blue-300">3%</div>
                <div className="text-sm text-blue-200">Progreso</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-blue-300">2024-2025</div>
                <div className="text-sm text-blue-200">Duración</div>
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
                El <strong>Fusarium oxysporum f. sp. cubense</strong> Raza 4 (Foc R4) es considerado uno de los
                patógenos más destructivos para el cultivo de banano a nivel mundial. Este hongo del suelo causa la
                enfermedad conocida como "Mal de Panamá" o marchitez por Fusarium, que ha devastado plantaciones enteras
                y amenaza la seguridad alimentaria global.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Nuestro proyecto tiene como objetivo realizar la{" "}
                <strong>secuenciación completa, ensamblaje y análisis comparativo</strong>
                del genoma de Foc R4 para identificar genes de virulencia, factores de patogenicidad y mecanismos de
                resistencia a fungicidas. Esta información será fundamental para desarrollar estrategias de control más
                efectivas y variedades de banano resistentes.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Objetivos Principales</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Secuenciación completa del genoma
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Identificación de genes de virulencia
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Análisis comparativo con otras razas
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Desarrollo de marcadores moleculares
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Impacto Esperado</h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Mejores estrategias de control
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Desarrollo de variedades resistentes
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Diagnóstico molecular preciso
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Contribución científica global
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Metodología del Proyecto</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodology.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Status */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Estado del Proyecto</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">Fase 0 - Iniciando</h3>
                  <p className="text-gray-600">Preparación y obtención de muestras</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">3%</div>
                  <div className="text-sm text-gray-500">Completado</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: "3%" }}
                ></div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                El proyecto se encuentra en sus etapas iniciales, enfocándose en la revisión bibliográfica exhaustiva,
                el diseño metodológico detallado y la obtención de muestras de alta calidad de Fusarium oxysporum f. sp.
                cubense Raza 4.
              </p>
            </div>

            {/* Project Advances Dropdown */}
            <div className="mt-8">
              <button
                onClick={() => setShowAdvances(!showAdvances)}
                className="w-full bg-white rounded-xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Avances del Proyecto</h3>
                </div>
                {showAdvances ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {showAdvances && (
                <div className="mt-4 bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                  <div className="space-y-6">
                    {advances.map((advance, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {advance.status === "completed" ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : advance.status === "in-progress" ? (
                            <Clock className="w-6 h-6 text-blue-500" />
                          ) : (
                            <Play className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-800">{advance.title}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                advance.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : advance.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {advance.status === "completed"
                                ? "Completado"
                                : advance.status === "in-progress"
                                  ? "En Proceso"
                                  : "Pendiente"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {advance.date}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{advance.description}</p>
                          {advance.progress && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progreso</span>
                                <span>{advance.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${advance.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Especificaciones Técnicas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tecnologías de Secuenciación</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Plataforma Principal</span>
                    <span className="text-blue-600 font-semibold">Illumina NovaSeq 6000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Tipo de Secuenciación</span>
                    <span className="text-blue-600 font-semibold">Paired-end 150bp</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Cobertura Objetivo</span>
                    <span className="text-blue-600 font-semibold">100x</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Tamaño Genoma Estimado</span>
                    <span className="text-blue-600 font-semibold">~50 Mb</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Análisis Bioinformático</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Ensamblador</span>
                    <span className="text-green-600 font-semibold">SPAdes / Flye</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Anotación Genética</span>
                    <span className="text-green-600 font-semibold">MAKER / Augustus</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Análisis Comparativo</span>
                    <span className="text-green-600 font-semibold">OrthoFinder / BLAST</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Predicción de Efectores</span>
                    <span className="text-green-600 font-semibold">EffectorP / SignalP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">¿Interesado en Colaborar?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Este proyecto representa una oportunidad única para contribuir al conocimiento científico sobre uno de los
              patógenos más importantes en la agricultura. Buscamos colaboraciones académicas e industriales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/51987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Contactar por WhatsApp
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
              <a
                href="mailto:info@aslaboratorios.com"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Enviar Email
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Nota importante:</strong> Los datos y resultados presentados en este proyecto deben ser
              verificados por especialistas antes de su aplicación en campo. La información proporcionada tiene fines
              educativos y de investigación. Para obtener asesoría técnica especializada, contacte con nuestros
              expertos.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
