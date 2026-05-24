'use client'

import { CheckCircle2, Award, BarChart3, Microscope, Shield, Zap, Leaf, Users } from 'lucide-react'

export default function AboutISO() {
  const certifications = [
    {
      code: "ISO 17025",
      title: "Competencia de Laboratorios",
      description: "Acreditación que garantiza la competencia técnica y confiabilidad de nuestros resultados analíticos",
      icon: Microscope,
      color: "from-blue-600 to-blue-700",
      features: ["Métodos validados", "Equipos calibrados", "Trazabilidad de resultados"]
    },
    {
      code: "ISO 9001",
      title: "Gestión de Calidad",
      description: "Sistema de gestión de calidad integral que asegura satisfacción del cliente y mejora continua",
      icon: CheckCircle2,
      color: "from-green-600 to-green-700",
      features: ["Procesos documentados", "Control de calidad", "Auditorías internas"]
    },
    {
      code: "ISO 14001",
      title: "Gestión Ambiental",
      description: "Compromiso con la sostenibilidad y minimización del impacto ambiental en todas nuestras operaciones",
      icon: Leaf,
      color: "from-emerald-600 to-emerald-700",
      features: ["Residuos controlados", "Energía eficiente", "Agua reutilizada"]
    },
    {
      code: "ISO 45001",
      title: "Seguridad y Salud",
      description: "Protección integral de nuestro personal con estándares internacionales de seguridad ocupacional",
      icon: Shield,
      color: "from-orange-600 to-orange-700",
      features: ["Capacitación continua", "Equipos de protección", "Cultura preventiva"]
    },
  ]

  const standardElements = [
    {
      icon: BarChart3,
      title: "Trazabilidad",
      description: "Cada muestra tiene un código único de lote y es rastreada desde la toma hasta la emisión del informe",
      color: "bg-purple-100 text-purple-700",
      borderColor: "border-purple-300"
    },
    {
      icon: Users,
      title: "Responsabilidades",
      description: "Personal técnico identificado y capacitado en cada fase del análisis con supervisión documentada",
      color: "bg-blue-100 text-blue-700",
      borderColor: "border-blue-300"
    },
    {
      icon: Microscope,
      title: "Métodos Validados",
      description: "Protocolos analíticos basados en normas ISO y validados estadísticamente con estándares reconocidos",
      color: "bg-green-100 text-green-700",
      borderColor: "border-green-300"
    },
    {
      icon: Zap,
      title: "Incertidumbre",
      description: "Todos nuestros resultados incluyen rangos de incertidumbre calculados según normas internacionales",
      color: "bg-amber-100 text-amber-700",
      borderColor: "border-amber-300"
    },
    {
      icon: Shield,
      title: "Confidencialidad",
      description: "Protección de datos de cliente según ISO 27001 con acceso restringido a información sensible",
      color: "bg-red-100 text-red-700",
      borderColor: "border-red-300"
    },
    {
      icon: Award,
      title: "Mejora Continua",
      description: "Auditorías periódicas, revisiones de desempeño y retroalimentación cliente para optimizar procesos",
      color: "bg-indigo-100 text-indigo-700",
      borderColor: "border-indigo-300"
    },
  ]

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">Certificaciones Internacionales</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">Estándares ISO y Calidad</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            AS Laboratorios cumple con los estándares internacionales más rigurosos para garantizar la confiabilidad, trazabilidad y excelencia en cada análisis
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, idx) => {
            const IconComponent = cert.icon
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Color badge */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Code */}
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">{cert.code}</p>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cert.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  {cert.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span className="text-xs text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-16"></div>

        {/* ISO Elements */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Elementos Clave de Cumplimiento</h3>
            <p className="text-gray-600">Principios fundamentales que aplicamos en cada análisis</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standardElements.map((element, idx) => {
              const IconComponent = element.icon
              return (
                <div
                  key={idx}
                  className={`${element.color} border-2 ${element.borderColor} rounded-xl p-6 transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-lg flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{element.title}</h4>
                      <p className="text-xs leading-relaxed opacity-90">{element.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Process Flow */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Flujo de Control de Calidad en Cada Análisis</h3>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", name: "Recepción", desc: "Código único asignado, inspección de muestra" },
              { step: "2", name: "Preparación", desc: "Responsable identificado, documentación" },
              { step: "3", name: "Análisis", desc: "Equipos calibrados, método validado" },
              { step: "4", name: "QC/QA", desc: "Verificación paralela, estándares de control" },
              { step: "5", name: "Reporte", desc: "Incertidumbre incluida, firma autorizada" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {/* Step Circle */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {item.step}
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg p-4 text-center border border-blue-200">
                  <p className="font-bold text-sm text-gray-900 mb-1">{item.name}</p>
                  <p className="text-xs text-gray-600 leading-tight">{item.desc}</p>
                </div>

                {/* Arrow */}
                {idx < 4 && (
                  <div className="hidden md:flex absolute top-6 -right-4 items-center justify-center">
                    <div className="w-8 h-px bg-gradient-to-r from-blue-400 to-transparent"></div>
                    <div className="text-blue-600">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Commitment */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-6 rounded-2xl">
            <p className="font-bold text-lg mb-2">Nuestro Compromiso</p>
            <p className="text-sm">Cada resultado que entregamos cumple con los más altos estándares internacionales de precisión, confiabilidad y responsabilidad científica</p>
          </div>
        </div>
      </div>
    </section>
  )
}
