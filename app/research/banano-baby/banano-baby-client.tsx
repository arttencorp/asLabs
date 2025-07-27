"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle,
  Clock,
  Play,
  Leaf,
  Microscope,
  Shield,
  DnaIcon as DNA,
} from "lucide-react"

export default function BananoBabyClient() {
  const [showAdvances, setShowAdvances] = useState(false)

  const advances = [
    {
      title: "Diseño General e Investigación de Viabilidad",
      date: "15 de Enero, 2024",
      status: "completed",
      description:
        "Análisis exhaustivo de la viabilidad técnica y económica del proyecto, incluyendo revisión bibliográfica y diseño experimental.",
    },
    {
      title: "Estudio de Mercado e Impacto",
      date: "28 de Enero, 2024",
      status: "completed",
      description:
        "Evaluación del mercado objetivo, análisis de competidores y proyección del impacto económico y social del proyecto.",
    },
    {
      title: "Consulta de Presupuesto e Insumos",
      date: "12 de Febrero, 2024",
      status: "completed",
      description:
        "Cotización detallada de equipos, reactivos y materiales necesarios para el desarrollo del proyecto de mejoramiento genético.",
    },
    {
      title: "Proceso de digitalización de la base de datos",
      date: "3 de Marzo, 2024",
      status: "completed",
      description:
        "Implementación de sistema digital para el manejo de datos experimentales, seguimiento de cultivos y análisis de resultados.",
    },
    {
      title: "Inserción en el mercado digital y inicio del diseño genético",
      date: "18 de Marzo, 2024",
      status: "completed",
      description:
        "Desarrollo de plataforma digital para comercialización y inicio del diseño de vectores genéticos para la transformación.",
    },
    {
      title: "Inicio del Diseño Genético",
      date: "5 de Abril, 2024",
      status: "completed",
      description:
        "Diseño molecular de construcciones genéticas incluyendo genes de quitinasa, promotores y marcadores de selección.",
    },
    {
      title: "Estudio de Genes que expresen quitinasa",
      date: "20 de Junio, 2024",
      status: "in-progress",
      description:
        "Investigación y caracterización de genes que codifican para enzimas quitinasa con actividad antifúngica específica contra hongos patógenos.",
      progress: 75,
    },
  ]

  const methodology = [
    {
      icon: <DNA className="w-8 h-8" />,
      title: "Diseño Genético",
      description:
        "Construcción de vectores con genes de quitinasa bajo promotores constitutivos para expresión continua",
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Transformación",
      description: "Introducción de genes mediante Agrobacterium tumefaciens utilizando el sistema de plásmido Ti",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Regeneración",
      description: "Cultivo in vitro de tejidos transformados para obtener plantas completas resistentes",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Evaluación",
      description: "Pruebas de resistencia contra hongos patógenos y análisis de expresión génica",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-600/30 rounded-full text-green-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <Leaf className="w-4 h-4 mr-2" />
              Proyecto de Mejoramiento Genético
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Banano Baby
              <span className="block text-green-300">Resistente a Hongos</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Desarrollo de variedades resistentes mediante ingeniería genética avanzada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-green-300">Fase 1</div>
                <div className="text-sm text-green-200">Estado Actual</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-green-300">0%</div>
                <div className="text-sm text-green-200">En espera de inicio</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold text-green-300">2024-2026</div>
                <div className="text-sm text-green-200">Duración Estimada</div>
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
                El banano baby es una variedad de gran importancia comercial que enfrenta serias amenazas por hongos
                patógenos como <em>Fusarium oxysporum</em>, <em>Mycosphaerella fijiensis</em> y{" "}
                <em>Colletotrichum musae</em>. Estos patógenos causan enfermedades devastadoras que reducen
                significativamente la productividad y calidad de los frutos.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Nuestro proyecto utiliza técnicas de ingeniería genética para desarrollar variedades de banano baby con
                <strong> resistencia mejorada a hongos patógenos</strong> mediante la inserción de genes que codifican
                para enzimas quitinasa. Estas enzimas degradan la quitina presente en las paredes celulares de los
                hongos, proporcionando una defensa natural y efectiva.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Tecnología Utilizada</h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Plásmido Ti de <em>Agrobacterium</em>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Genes de quitinasa optimizados
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Promotores constitutivos
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Marcadores de selección
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Beneficios Esperados</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Reducción del 70% en pérdidas
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Menor uso de fungicidas
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Mayor calidad del fruto
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      Sostenibilidad ambiental
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
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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
                  <h3 className="text-2xl font-semibold text-gray-800">Fase 1 - En espera de inicio</h3>
                  <p className="text-gray-600">Preparación para inicio de actividades experimentales</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">0%</div>
                  <div className="text-sm text-gray-500">Completado</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                El proyecto ha completado exitosamente todas las fases de planificación y diseño. Actualmente se
                encuentra en espera del inicio de las actividades experimentales, pendiente de la aprobación final de
                presupuesto y la adquisición de equipos especializados para el laboratorio de transformación genética.
              </p>
            </div>

            {/* Project Advances Dropdown */}
            <div className="mt-8">
              <button
                onClick={() => setShowAdvances(!showAdvances)}
                className="w-full bg-white rounded-xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-green-600 mr-3" />
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

      {/* Technical Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Detalles Técnicos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Genes Objetivo</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Quitinasa Clase I</span>
                    <span className="text-green-600 font-semibold">CHI1</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Quitinasa Clase III</span>
                    <span className="text-green-600 font-semibold">CHI3</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Promotor</span>
                    <span className="text-green-600 font-semibold">35S CaMV</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Marcador de Selección</span>
                    <span className="text-green-600 font-semibold">nptII (Kanamicina)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Hongos Objetivo</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Mal de Panamá</span>
                    <span className="text-red-600 font-semibold">F. oxysporum</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Sigatoka Negra</span>
                    <span className="text-red-600 font-semibold">M. fijiensis</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Antracnosis</span>
                    <span className="text-red-600 font-semibold">C. musae</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Pudrición de Corona</span>
                    <span className="text-red-600 font-semibold">C. gloeosporioides</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">¿Interesado en el Proyecto?</h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Este proyecto representa una oportunidad única para revolucionar la producción de banano baby. Buscamos
              socios estratégicos, inversionistas y colaboradores académicos.
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
