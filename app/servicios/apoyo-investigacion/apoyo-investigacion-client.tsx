"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ChevronDown,
  Search,
  FlaskConical,
  Clock,
  MessageCircle,
  Beaker,
  TestTube,
  FileText,
  Shield,
  CheckCircle2,
  Award,
  Microscope,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Servicio {
  concepto: string
  icon: React.ElementType
  unidad: string
  descripcionTecnica: {
    req: string
    proc: string
    ent: string
  }
  descripcion: string
}

const serviciosApoyoInvestigacion: Servicio[] = [
  {
    concepto: "Suspensiones Bacterianas",
    icon: TestTube,
    unidad: "100ml",
    descripcionTecnica: {
      req: "Especificación de microorganismo y concentración requerida",
      proc: "Cultivo y preparación de suspensión estandarizada",
      ent: "Suspensión bacteriana con viabilidad garantizada",
    },
    descripcion:
      "Preparación de suspensiones bacterianas de alta concentración para investigación, con estándares de pureza y viabilidad.",
  },
  {
    concepto: "Producción de Bacterias para Investigación",
    icon: FlaskConical,
    unidad: "Lote",
    descripcionTecnica: {
      req: "Cepa específica y cantidad de biomasa requerida",
      proc: "Fermentación controlada con monitoreo de parámetros",
      ent: "Biomasa bacteriana con certificado de producción",
    },
    descripcion:
      "Producción de biomasa bacteriana en cantidades requeridas para proyectos de investigación con control de calidad.",
  },
  {
    concepto: "Suspensiones de Bacterias para Biorremediación de Concreto",
    icon: Droplets,
    unidad: "Litro",
    descripcionTecnica: {
      req: "Especificación de cepas y concentración para biorremediación",
      proc: "Selección y cultivo de cepas productoras de carbonato",
      ent: "Suspensión bacteriana con capacidad de mineralización",
    },
    descripcion:
      "Preparación de suspensiones bacterianas especializadas con capacidad de producir carbonato de calcio para reparación biológica de grietas en concreto.",
  },
  {
    concepto: "Cepas Bacterianas para Investigación",
    icon: Beaker,
    unidad: "Cepa",
    descripcionTecnica: {
      req: "Solicitud de cepa con especificaciones técnicas",
      proc: "Selección, caracterización y conservación de cepa",
      ent: "Cepa pura con documentación de caracterización",
    },
    descripcion:
      "Suministro de cepas bacterianas caracterizadas y documentadas para proyectos de investigación científica.",
  },
  {
    concepto: "Identificación Molecular de Bacterias en Cultivo Puro",
    icon: Microscope,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Cultivo puro de la bacteria a identificar",
      proc: "Extracción de ADN y análisis molecular (MALDI-TOF o secuenciación)",
      ent: "Informe de identificación a nivel de especie",
    },
    descripcion:
      "Identificación de bacterias mediante técnicas moleculares avanzadas como MALDI-TOF, PCR y secuenciación para precisión máxima.",
  },
  {
    concepto: "Identificación por 16S RNA de Microorganismos",
    icon: TestTube,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra de ADN o cultivo de microorganismo",
      proc: "Amplificación de gen 16S RNA, secuenciación y alineamiento",
      ent: "Identificación taxonómica con análisis filogenético",
    },
    descripcion:
      "Identificación molecular mediante secuenciación del gen 16S RNA, estándar de oro para la taxonomía bacteriana y estudio de diversidad microbiana.",
  },
  {
    concepto: "Formulación de Protocolos y Estandarización",
    icon: FileText,
    unidad: "Protocolo",
    descripcionTecnica: {
      req: "Especificación del objetivo y metodología deseada",
      proc: "Diseño, optimización y validación del protocolo",
      ent: "Protocolo documentado con guía de implementación",
    },
    descripcion:
      "Diseño y estandarización de protocolos experimentales bacteriológicos optimizados para reproducibilidad y eficiencia.",
  },
  {
    concepto: "Aislamiento de Bacterias",
    icon: FlaskConical,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra ambiental (suelo, agua, sedimento, otros)",
      proc: "Aislamiento selectivo, purificación y caracterización morfológica",
      ent: "Cepas puras aisladas con descripción preliminar",
    },
    descripcion:
      "Aislamiento y purificación de bacterias desde muestras ambientales complejas, obteniendo cepas puras para investigación.",
  },
  {
    concepto: "Servicio Análisis e Informes Bioinformática",
    icon: Beaker,
    unidad: "Análisis",
    descripcionTecnica: {
      req: "Archivos de secuencias o datos moleculares",
      proc: "Procesamiento, análisis bioinformático y visualización de datos",
      ent: "Informe con resultados, gráficas y conclusiones",
    },
    descripcion:
      "Análisis bioinformático de datos de secuenciación, filogenia, anotación génica y generación de reportes científicos detallados.",
  },
]

const garantias = [
  { icon: Shield, title: "Métodos Validados", desc: "Protocolos científicos" },
  { icon: CheckCircle2, title: "Documentación", desc: "Reportes detallados" },
  { icon: Clock, title: "Tiempos", desc: "Entrega puntual" },
  { icon: Award, title: "Expertos", desc: "Equipo especializado" },
]

export default function ApoyoInvestigacionClient() {
  const [expandedServices, setExpandedServices] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleService = (index: number) => {
    setExpandedServices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredServices = serviciosApoyoInvestigacion.filter((s) =>
    s.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background font-serif">
      <Navbar />

      <header className="relative h-[280px] overflow-hidden">
        <Image
          src="/images/image.png"
          alt="Apoyo a la Investigación - Servicios bacteriológicos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                  Servicios Especializados
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Apoyo a la Investigación</h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Identificación molecular, 16S RNA, aislamiento bacteriano y análisis bioinformático.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Garantías */}
        <section className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {garantias.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buscador y Cotizar */}
        <section className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
            </div>
            <Link
              href="https://wa.me/51961996645?text=Hola,%20deseo%20cotizar%20servicios%20de%20Apoyo%20a%20la%20Investigación"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-all"
            >
              <FileText className="w-4 h-4" />
              Cotizar
            </Link>
          </div>
        </section>

        {/* Servicios */}
        <section>
          <div className="space-y-3">
            {filteredServices.length > 0 ? (
              filteredServices.map((servicio, index) => {
                const isExpanded = expandedServices.includes(index)
                const Icon = servicio.icon

                return (
                  <div
                    key={index}
                    className="border border-border rounded-lg overflow-hidden hover:border-blue-300 transition-colors bg-card"
                  >
                    <button
                      onClick={() => toggleService(index)}
                      className="w-full px-4 py-4 flex items-start justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 text-left flex-1">
                        <div className="mt-1">
                          <Icon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{servicio.concepto}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{servicio.descripcion}</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ml-2 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-4 py-4 border-t border-border bg-muted/30 space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Requerimiento
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{servicio.descripcionTecnica.req}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Proceso
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{servicio.descripcionTecnica.proc}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Entregable
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{servicio.descripcionTecnica.ent}</p>
                        </div>

                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="font-semibold">Unidad:</span> {servicio.unidad}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron servicios que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 pt-8 border-t border-border">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-foreground mb-3">¿Necesitas más información?</h2>
            <p className="text-muted-foreground mb-6">
              Contáctanos para consultas específicas sobre nuestros servicios de apoyo a la investigación.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://wa.me/51961996645?text=Hola,%20tengo%20una%20consulta%20sobre%20servicios%20de%20investigación"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar vía WhatsApp
              </Link>
              <Link
                href="mailto:info@aslaboratorios.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-all"
              >
                <FileText className="w-4 h-4" />
                Enviar email
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
