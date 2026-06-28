'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string[]
}

const faqItems: FAQItem[] = [
  {
    question: '¿Cuál es la declaración pública de propósito de AS Labs?',
    answer: [
      'AS Labs existe para fortalecer la sanidad ambiental y la resiliencia de la agricultura, especialmente de los pequeños y medianos productores, mediante servicios científicos de laboratorio, biotecnología vegetal, diagnóstico fitosanitario y control biológico que permitan prevenir riesgos, mejorar la salud y productividad de los cultivos, promover el uso responsable del agua y del suelo y facilitar la adopción de soluciones técnicas con menor impacto ambiental.',
      'Este propósito expresa la intención de AS Labs de generar un impacto positivo y significativo tanto en la sociedad como en el ambiente. La empresa busca contribuir a que agricultores, clientes, instituciones y comunidades accedan a información científica confiable, material vegetal de calidad y soluciones biológicas que favorezcan decisiones productivas responsables, reduzcan riesgos sanitarios y ambientales y fortalezcan la sostenibilidad de las actividades agrícolas.'
    ]
  },
  {
    question: '¿Cuál es el impacto positivo que AS Labs pretende generar?',
    answer: [
      'AS Labs pretende contribuir a la protección de la salud ambiental mediante la evaluación microbiológica y fisicoquímica de agua, suelo, superficies y otros componentes relevantes para la seguridad de las personas y de los sistemas productivos. A través de nuestros servicios, la empresa busca facilitar la identificación temprana de riesgos, brindar información técnicamente sustentada y apoyar la adopción de medidas preventivas y correctivas.',
      'En el ámbito agrícola, AS Labs pretende fortalecer la capacidad de los productores para prevenir, identificar y manejar problemas fitosanitarios mediante servicios de diagnóstico, evaluación de microorganismos, control biológico, producción de plantas in vitro y asistencia técnica. La empresa reconoce que la detección oportuna de agentes causales, el acceso a material vegetal sano y el uso responsable de alternativas biológicas pueden contribuir a reducir pérdidas productivas, mejorar la calidad de los cultivos y disminuir prácticas que generen impactos innecesarios sobre el ambiente.',
      'La empresa presta especial atención a los pequeños y medianos productores, quienes pueden enfrentar mayores limitaciones para acceder a servicios especializados, tecnologías, material vegetal de calidad e información científica comprensible. AS Labs busca contribuir a cerrar estas brechas mediante servicios accesibles, orientación técnica, capacitación, colaboración institucional y transferencia de conocimientos.'
    ]
  },
  {
    question: '¿Por qué es relevante este propósito para la estrategia empresarial?',
    answer: [
      'El propósito declarado se relaciona directamente con la naturaleza, las capacidades y las actividades económicas de AS Labs. La empresa desarrolla servicios de laboratorio, microbiología, análisis ambiental, diagnóstico fitopatológico, biotecnología vegetal, producción de plantas in vitro, control biológico, investigación aplicada, capacitación y asistencia técnica.',
      'Estas actividades permiten que el propósito no sea una declaración ajena a la operación comercial, sino el fundamento que orienta el desarrollo de los servicios, la selección de proyectos, las decisiones de inversión, la relación con clientes y productores, la formación del personal y la evaluación de los resultados sociales y ambientales. La continuidad y el éxito de AS Labs dependen de la confianza de sus clientes y demás partes interesadas, de la calidad y confiabilidad de sus servicios, de la capacidad para responder a necesidades agrícolas y ambientales reales y de la generación de resultados verificables.',
      'Por ello, integrar el propósito en la estrategia fortalece la reputación, la sostenibilidad empresarial, la diferenciación de los servicios y la creación de valor a largo plazo. AS Labs reconoce que su crecimiento económico debe ser compatible con la generación de impactos positivos para los trabajadores, clientes, agricultores, instituciones, comunidades y el ambiente.'
    ]
  },
  {
    question: '¿Cómo se integra el propósito en nuestra estrategia empresarial?',
    answer: [
      'El propósito de AS Labs se integra en la estrategia empresarial mediante la priorización de servicios y proyectos que contribuyan a la prevención de riesgos ambientales y fitosanitarios, la sanidad de los cultivos, el fortalecimiento de las capacidades de los productores y la aplicación responsable de la ciencia y la biotecnología.',
      'La empresa considerará el propósito al momento de evaluar nuevos servicios, inversiones, alianzas, proyectos, mercados y decisiones operativas. Antes de adoptar una decisión estratégica relevante, la Gerencia General y la Administración deberán analizar su contribución al propósito, sus efectos sobre las partes interesadas y sus posibles impactos sociales y ambientales.',
      'AS Labs procurará que sus inversiones en infraestructura, equipos, capacitación y desarrollo tecnológico fortalezcan la precisión, confiabilidad, accesibilidad y utilidad de sus servicios. La estrategia comercial deberá mantener coherencia con el propósito público, evitando promocionar servicios o beneficios que no cuenten con sustento suficiente y priorizando relaciones comerciales basadas en la transparencia, la evidencia científica, la confidencialidad y la responsabilidad.'
    ]
  },
  {
    question: '¿Cómo se refleja el propósito en nuestras políticas y prácticas?',
    answer: [
      'El propósito de AS Labs se incorporará en las políticas, procedimientos y prácticas relacionadas con calidad, trabajo justo, bioseguridad, gestión ambiental, comunicación responsable, atención al cliente, gestión de proveedores, innovación, capacitación y participación de las partes interesadas.',
      'La gestión de residuos biológicos, químicos, punzocortantes y comunes se desarrolla de manera coherente con el compromiso de protección ambiental. Del mismo modo, el uso de agua, energía, papel, materiales plásticos, reactivos y otros recursos es medido y gestionado progresivamente mediante objetivos e indicadores.',
      'Las decisiones laborales consideran el bienestar, la seguridad, la capacitación, la formalización, la igualdad de oportunidades y el desarrollo de los trabajadores. AS Labs reconoce que no puede declarar un propósito social y ambiental positivo sin mantener prácticas responsables dentro de su propia organización. La selección y evaluación de proveedores también considera criterios de calidad, cumplimiento legal, responsabilidad laboral y gestión ambiental.'
    ]
  },
  {
    question: '¿Cuáles son nuestros objetivos iniciales vinculados con el propósito?',
    answer: [
      'Durante el período comprendido entre junio de 2026 y junio de 2027, AS Labs establece como objetivos iniciales formalizar y documentar la integración del propósito en la estrategia, comunicarlo al cien por ciento de los trabajadores, implementar un sistema de indicadores sociales y ambientales, consultar a las principales partes interesadas y elaborar el primer Informe Anual de Impacto.',
      'La empresa también establece como objetivo implementar registros mensuales del consumo de agua y energía y de la generación de residuos biológicos y químicos. Estos registros servirán como línea de base para definir metas de mejora posteriores.',
      'AS Labs procurará consultar, durante el primer año de implementación, a los trabajadores, clientes, agricultores o productores, proveedores e instituciones colaboradoras. Los resultados de estas consultas serán analizados durante la revisión anual del máximo órgano de gobierno.'
    ]
  }
]

export default function AboutPurpose() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="proposito" className="w-full py-20 md:py-24 px-4 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl -ml-40"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-widest">Propósito Corporativo</span>
            <span className="h-px w-8 bg-emerald-500"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Nuestro Propósito
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fortalecer la sanidad ambiental y la resiliencia de la agricultura mediante ciencia, biotecnología y soluciones responsables
          </p>
        </div>

        {/* Main Purpose Statement */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-8 md:p-10 mb-12 border border-emerald-400/50 shadow-xl">
          <p className="text-lg md:text-xl leading-relaxed font-medium mb-6">
            En AS Labs existimos para fortalecer la sanidad ambiental y la resiliencia de la agricultura, especialmente de los pequeños y medianos productores, mediante servicios científicos de laboratorio, biotecnología vegetal, diagnóstico fitosanitario y control biológico.
          </p>
          <p className="text-lg md:text-xl leading-relaxed font-medium text-emerald-100">
            Buscamos prevenir riesgos, mejorar la salud y productividad de los cultivos, promover el uso responsable del agua y del suelo y facilitar el acceso a soluciones técnicas con menor impacto ambiental. Integramos este propósito en nuestra estrategia, nuestros servicios, nuestras decisiones y nuestra relación con trabajadores, clientes, agricultores, instituciones, comunidades y demás partes interesadas.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mb-12">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-start justify-between gap-4 p-6 md:p-7 hover:bg-emerald-50/50 transition-colors duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 text-left leading-tight">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-emerald-600 flex-shrink-0 transition-transform duration-300 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedIndex === index && (
                <div className="px-6 md:px-7 pb-6 md:pb-7 border-t border-gray-200 bg-gray-50/50">
                  <div className="space-y-4 text-gray-700">
                    {item.answer.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-base md:text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 md:p-10 border border-emerald-200">
          <p className="text-center text-gray-700 leading-relaxed text-lg">
            <span className="font-bold text-gray-900">Vigencia:</span> Esta declaración entra en vigencia el 28 de junio de 2026 y permanece como el fundamento de nuestras decisiones, servicios y relaciones con todas nuestras partes interesadas.
          </p>
        </div>
      </div>
    </section>
  )
}
