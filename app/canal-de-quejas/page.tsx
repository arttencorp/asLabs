import { Metadata } from 'next'
import { Shield, Clock, FileText, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Canal de Quejas | AS Labs',
  description: 'Presenta quejas de forma segura, confidencial y gratuita en AS Laboratorios',
}

export default function ComplaintsChannelPage() {
  const processingStages = [
    {
      icon: '✓',
      title: 'Confirmación de recepción',
      description: 'Dentro de dos días hábiles',
    },
    {
      icon: '2',
      title: 'Evaluación de aceptación',
      description: 'Dentro de cinco días hábiles',
    },
    {
      icon: '3',
      title: 'Comunicación',
      description: 'Se informará aceptación o razón de no aceptación',
    },
    {
      icon: '4',
      title: 'Investigación y actualizaciones',
      description: 'Cada quince días hábiles si el caso permanece abierto',
    },
    {
      icon: '5',
      title: 'Resolución ordinaria',
      description: 'Dentro de treinta días hábiles',
    },
    {
      icon: '6',
      title: 'Casos complejos',
      description: 'Hasta sesenta días hábiles con comunicación previa',
    },
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-widest">
              Transparencia y Responsabilidad
            </span>
            <span className="h-px w-8 bg-emerald-500"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Canal de Quejas
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            En AS Labs, valoramos tu voz. Puedes presentar quejas de forma gratuita, segura y confidencial.
          </p>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 md:py-20 px-4 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-8 md:p-10">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              <strong>AS Labs permite a trabajadores, clientes, proveedores, agricultores, comunidades, instituciones y otras partes interesadas presentar quejas de forma gratuita, segura y confidencial.</strong>
            </p>
            <div className="border-t border-white/30 pt-6">
              <p className="text-base md:text-lg leading-relaxed font-semibold text-emerald-100">
                ⚠️ AS Labs prohíbe explícitamente cualquier forma de represalia contra quienes presenten una queja de buena fe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Processing Stages */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cómo gestionamos su queja
            </h2>
            <p className="text-lg text-gray-600">
              Proceso transparente y estructurado en etapas claras
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processingStages.map((stage, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-emerald-700 text-lg">{stage.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{stage.title}</h3>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria Section */}
      <section className="py-16 md:py-20 px-4 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Criterios de aceptación
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Una queja puede ser aceptada cuando se relacione con:
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Operaciones, servicios, trabajadores, proveedores y contratistas de AS Labs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Decisiones corporativas e impactos sociales y ambientales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Confidencialidad, datos personales y condiciones laborales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Bioseguridad, manejo de residuos y compromisos públicos</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Asuntos no aceptados
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Cuando un asunto no sea aceptado como queja, AS Labs explicará la razón y, cuando corresponda, orientará a la persona hacia otro canal adecuado.
            </p>
          </div>
        </div>
      </section>

      {/* Retaliation Protection */}
      <section className="py-16 md:py-20 px-4 bg-red-50 border-b border-red-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Protección frente a represalias
            </h2>
          </div>

          <div className="bg-white rounded-xl p-8 border border-red-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>AS Labs no permitirá:</strong>
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Despidos, sanciones, amenazas ni hostigamiento motivados por la presentación de una queja</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Discriminación, reducción de oportunidades o cancelación injustificada de contratos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Retrasos intencionales de pagos o cualquier otra medida adversa</span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-200">
              Cualquier acción de represalia será considerada una falta grave y será investigada como una nueva queja.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Tienes una queja que reportar?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed">
            Abre el formulario de quejas desde cualquier página en el footer o presiona el botón a continuación.
          </p>
          <button className="inline-block bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors">
            Abrir formulario
          </button>
        </div>
      </section>

      {/* Document Download */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Procedimiento Público de Gestión de Quejas
                </h3>
                <p className="text-gray-600 mb-4">
                  Descarga nuestro documento completo que detalla el procedimiento oficial, la metodología de evaluación y los derechos de las partes interesadas.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
                >
                  <FileText className="w-5 h-5" />
                  Descargar documento (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Preguntas frecuentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: '¿Mi queja es anónima?',
                a: 'Sí. Puedes marcar la opción de presentar la queja de forma anónima. Sin embargo, para poder enviarte actualizaciones y confirmación, necesitamos un correo electrónico.',
              },
              {
                q: '¿Cuánto tiempo lleva procesar una queja?',
                a: 'Las quejas ordinarias se procesan dentro de 30 días hábiles. Casos más complejos pueden extenderse hasta 60 días hábiles con comunicación previa.',
              },
              {
                q: '¿Qué pasa si mi queja no es aceptada?',
                a: 'Te enviaremos una explicación clara sobre la razón del rechazo y, si corresponde, te orientaremos hacia el canal adecuado.',
              },
              {
                q: '¿Puedo adjuntar documentos?',
                a: 'Sí. Aceptamos archivos en PDF, JPG, PNG y DOCX de hasta 5 MB cada uno. Las evidencias fortalecen tu queja.',
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-emerald-300 transition-colors group"
              >
                <summary className="font-bold text-gray-900 cursor-pointer flex items-center justify-between">
                  {item.q}
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Si tienes preguntas sobre este canal, contáctanos:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:quejas@aslaboratorios.com"
              className="inline-flex items-center justify-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
            >
              ✉️ quejas@aslaboratorios.com
            </a>
            <a
              href="tel:+51961996645"
              className="inline-flex items-center justify-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
            >
              📞 +51 961 996 645
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
