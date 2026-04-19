import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Implementación de producción con bioreactores para investigación | AS Laboratorios Blog",
  description:
    "AS Labs impulsa una nueva etapa en producción controlada para investigación mediante tecnología de bioreactores. Mejora en reproducibilidad y escalamiento de procesos.",
  keywords: [
    "bioreactores",
    "investigación",
    "producción controlada",
    "biotecnología",
    "AS Labs",
  ],
  openGraph: {
    title: "Implementación de producción con bioreactores para investigación",
    description:
      "Descubre cómo AS Labs impulsa la innovación con sistemas de bioreactores para investigación aplicada.",
    type: "article",
    publishedTime: "2026-04-19T00:00:00Z",
  },
}

export default function BioreactoresPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Implementación de producción con bioreactores para investigación
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>AS Laboratorios</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>19 de abril de 2026</span>
              </div>
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Investigación
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              En AS Labs continuamos fortaleciendo nuestra capacidad técnica y operativa con la implementación progresiva de
              sistemas de producción mediante bioreactores, orientados al desarrollo de procesos de investigación, escalamiento
              y validación bajo condiciones controladas. Esta incorporación representa un paso importante en nuestra evolución
              como laboratorio especializado, al permitirnos trabajar con mayor precisión sobre variables críticas del proceso,
              mejorar la reproducibilidad entre lotes y ampliar nuestras capacidades para proyectos de investigación aplicada.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              Ventajas de la producción en bioreactores
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              La producción en bioreactores ofrece ventajas sustanciales frente a esquemas convencionales basados únicamente en
              recipientes de agitación o sistemas manuales de cultivo. Entre ellas destacan el mayor control sobre parámetros
              como temperatura, agitación, aireación y otras condiciones fisicoquímicas de relevancia experimental, lo que permite
              estandarizar mejor los procesos y obtener resultados más consistentes. Esta mejora resulta especialmente valiosa en
              contextos donde la trazabilidad, la repetibilidad y la optimización del rendimiento son factores determinantes para
              el éxito técnico de un proyecto.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              Escalamiento y transferencia tecnológica
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              La implementación de esta tecnología también amplía nuestra capacidad de respuesta frente a iniciativas de
              investigación que requieren una transición ordenada desde etapas de laboratorio hacia fases de mayor escala. En ese
              contexto, el uso de bioreactores permite diseñar estrategias de producción más robustas, planificar el escalamiento
              con mayor fundamento técnico y reducir la variabilidad propia de sistemas menos controlados. Para nuestros clientes y
              aliados, esto se traduce en procesos mejor estructurados, con mayor soporte analítico y mejores condiciones para la
              toma de decisiones.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              Integración dentro de una visión técnica coherente
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              En AS Labs entendemos que la innovación no depende únicamente de adquirir equipos, sino de integrarlos dentro de una
              visión técnica coherente, con procedimientos bien definidos, control documental, personal capacitado y objetivos
              orientados a resultados. Por ello, esta nueva etapa no solo implica incorporar infraestructura, sino también
              consolidar una plataforma de trabajo más sólida para investigación, desarrollo y transferencia tecnológica.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              Nuestro compromiso con la investigación
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Con esta implementación, reafirmamos nuestro compromiso con el fortalecimiento de capacidades científicas y
              tecnológicas en el país, apostando por herramientas que permitan desarrollar investigación con mayor nivel de
              control, escalabilidad y proyección futura.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-lg p-8 mt-12">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              ¿Te interesa nuestros servicios de investigación?
            </h3>
            <p className="text-gray-700 mb-6">
              En AS Laboratorios contamos con infraestructura moderna y equipo especializado para apoyar tus proyectos de
              investigación. Contáctanos para conocer más.
            </p>
            <Link
              href="/servicios/apoyo-investigacion"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Ver servicios de investigación
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
