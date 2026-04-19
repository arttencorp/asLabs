import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Implementación de nuestro nuevo laboratorio de biología molecular | AS Laboratorios Blog",
  description:
    "AS Labs fortalece su capacidad científica con la implementación de un nuevo laboratorio de biología molecular. Infraestructura moderna para investigación molecular.",
  keywords: [
    "biología molecular",
    "laboratorio",
    "investigación",
    "ADN",
    "AS Labs",
  ],
  openGraph: {
    title: "Implementación de nuestro nuevo laboratorio de biología molecular",
    description:
      "Descubre cómo AS Labs amplía sus capacidades analíticas con un laboratorio especializado en biología molecular.",
    type: "article",
    publishedTime: "2026-04-15T00:00:00Z",
  },
}

export default function BiologiaMolecularPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Implementación de nuestro nuevo laboratorio de biología molecular
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>AS Laboratorios</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>15 de abril de 2026</span>
              </div>
              <div>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Infraestructura
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Como parte de nuestro proceso de crecimiento institucional y mejora continua, en AS Labs venimos impulsando la
              implementación de un nuevo laboratorio de biología molecular, concebido para ampliar nuestras capacidades analíticas,
              fortalecer el soporte a proyectos de investigación y consolidar una plataforma técnica de mayor especialización. Esta
              iniciativa responde a la necesidad de contar con infraestructura moderna y condiciones adecuadas para el desarrollo de
              ensayos moleculares con mayor precisión, trazabilidad y confiabilidad.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              La importancia de la biología molecular en la investigación moderna
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              La biología molecular constituye actualmente una de las áreas de mayor impacto en investigación, diagnóstico,
              validación analítica y desarrollo tecnológico. Disponer de un laboratorio orientado a este campo permitirá ampliar
              significativamente nuestro alcance técnico, facilitando el procesamiento de muestras mediante metodologías de alta
              sensibilidad, el trabajo con material genético bajo condiciones controladas y la ejecución de procedimientos que exigen
              rigurosidad en cada etapa del proceso. Esto no solo fortalece nuestra capacidad interna, sino que también abre nuevas
              posibilidades de colaboración con instituciones académicas, proyectos de investigación y sectores productivos.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              Diseño integral del laboratorio
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              La implementación de este laboratorio contempla una visión integral que va más allá del equipamiento. Incluye la
              organización de áreas de trabajo diferenciadas, el fortalecimiento de medidas de control para minimizar riesgos de
              contaminación, la mejora en la trazabilidad de muestras y resultados, y la consolidación de un entorno técnico
              adecuado para procedimientos especializados. Esta base resulta fundamental para asegurar que los análisis se
              desarrollen con consistencia, respaldo metodológico y criterios de calidad alineados con las exigencias de la
              investigación moderna.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              Una plataforma estratégica para innovación
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Nuestro objetivo es que este nuevo espacio no solo amplíe la cartera de servicios de AS Labs, sino que también se
              convierta en una plataforma estratégica para innovación, formación técnica y generación de soluciones aplicadas. A
              través de esta implementación, buscamos contribuir al desarrollo científico regional y nacional, acercando
              infraestructura especializada a proyectos que requieren capacidades analíticas más avanzadas y soporte técnico
              confiable.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-6">
              Capacidades analíticas ampliadas
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Con este nuevo laboratorio, podemos ofrecer servicios especializados como identificación molecular por 16S RNA,
              análisis filogenético, secuenciación de ADN, caracterización genómica y análisis bioinformático, consolidando una
              propuesta técnica integral para investigadores, institutos académicos y empresas del sector biotecnológico.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-purple-50 rounded-lg p-8 mt-12">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              ¿Necesitas análisis de biología molecular?
            </h3>
            <p className="text-gray-700 mb-6">
              Nuestro nuevo laboratorio de biología molecular está disponible para apoyar tus proyectos de investigación con
              estándares de calidad internacionales. Descubre todos nuestros servicios.
            </p>
            <Link
              href="/servicios/apoyo-investigacion"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
              Ver servicios de apoyo a la investigación
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
