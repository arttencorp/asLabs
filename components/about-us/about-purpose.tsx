'use client'

import { CheckCircle2 } from 'lucide-react'

export default function AboutPurpose() {
  const purposePoints = [
    "Fortalecer la sanidad ambiental y la resiliencia de la agricultura",
    "Especializar en pequeños y medianos productores",
    "Integrar servicios científicos de laboratorio y biotecnología vegetal",
    "Promover diagnóstico fitosanitario y control biológico",
    "Prevenir riesgos y mejorar salud y productividad de cultivos",
    "Facilitar acceso a soluciones con menor impacto ambiental"
  ]

  const impactAreas = [
    {
      title: "Salud Ambiental",
      description: "Evaluación microbiológica y fisicoquímica de agua, suelo y superficies para la seguridad de personas y sistemas productivos",
      color: "#2e7d32"
    },
    {
      title: "Fortalecimiento Agrícola",
      description: "Diagnóstico fitopatológico, control biológico y producción de plantas in vitro para pequeños y medianos productores",
      color: "#e65100"
    },
    {
      title: "Responsabilidad Operacional",
      description: "Gestión responsable del agua, suelo, residuos y recursos en nuestras propias operaciones de laboratorio",
      color: "#01283c"
    }
  ]

  return (
    <section id="proposito" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-block mb-6">
            <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.2em] bg-[#e8f5e9] px-5 py-3 rounded-full border border-[#2e7d32]/20">
              Nuestro Propósito
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Nuestro Compromiso con la Sostenibilidad
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            En AS Labs existimos para fortalecer la sanidad ambiental y la resiliencia de la agricultura, especialmente de los pequeños y medianos productores, mediante servicios científicos de excelencia.
          </p>
        </div>

        {/* Main Purpose Statement */}
        <div className="bg-white rounded-2xl p-10 md:p-12 shadow-lg border border-gray-200 mb-16">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8">Declaración Pública de Propósito</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Buscamos prevenir riesgos, mejorar la salud y productividad de los cultivos, promover el uso responsable del agua y del suelo y facilitar el acceso a soluciones técnicas con menor impacto ambiental.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Integramos este propósito en nuestra estrategia, nuestros servicios, nuestras decisiones y nuestra relación con trabajadores, clientes, agricultores, instituciones, comunidades y demás partes interesadas.
            </p>
          </div>

          {/* Purpose Points Grid */}
          <div className="grid md:grid-cols-2 gap-6 pt-10 border-t-2 border-gray-200">
            {purposePoints.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#2e7d32] mt-1" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Areas */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center">Áreas de Impacto</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 group">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: area.color + '20' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: area.color }}></div>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-gray-900">{area.title}</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Statement */}
        <div className="bg-gradient-to-r from-[#e8f5e9] to-orange-50 rounded-2xl p-10 md:p-12 border border-[#2e7d32]/20">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Integración en Nuestra Estrategia</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">En Nuestros Servicios</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-[#2e7d32] font-bold">•</span>
                  <span>Análisis de agua y suelo con rigor científico</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2e7d32] font-bold">•</span>
                  <span>Diagnóstico fitopatológico oportuno y preciso</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2e7d32] font-bold">•</span>
                  <span>Control biológico responsable y documentado</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">En Nuestras Operaciones</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-[#e65100] font-bold">•</span>
                  <span>Gestión responsable de residuos biológicos y químicos</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#e65100] font-bold">•</span>
                  <span>Medición y mejora del consumo de agua y energía</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#e65100] font-bold">•</span>
                  <span>Prácticas laborales justas y equitativas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
