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
  Droplets,
  Award,
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

const serviciosBacteriologia: Servicio[] = [
  {
    concepto: "Suspensión Bacteriana McFarland",
    icon: TestTube,
    unidad: "100ml",
    descripcionTecnica: {
      req: "Solicitud con especie bacteriana y escala McFarland deseada",
      proc: "Cultivo de cepa, ajuste turbidimétrico según estándar",
      ent: "Suspensión calibrada con certificado de concentración",
    },
    descripcion:
      "Preparación de suspensiones bacterianas estandarizadas según escala McFarland para uso en pruebas de susceptibilidad, investigación y control de calidad.",
  },
  {
    concepto: "Fermentación Bacteriana",
    icon: FlaskConical,
    unidad: "Lote",
    descripcionTecnica: {
      req: "Cepa productora y especificaciones del metabolito",
      proc: "Fermentación en biorreactor con control de parámetros",
      ent: "Producto fermentado con análisis de rendimiento",
    },
    descripcion:
      "Servicio de fermentación bacteriana para la producción de metabolitos, enzimas, biofertilizantes y otros productos de interés biotecnológico.",
  },
  {
    concepto: "Curva de Crecimiento Bacteriano",
    icon: Beaker,
    unidad: "Ensayo",
    descripcionTecnica: {
      req: "Cepa bacteriana y condiciones de cultivo específicas",
      proc: "Monitoreo turbidimétrico cada hora durante 24-48h",
      ent: "Gráfica con fases de crecimiento y parámetros cinéticos",
    },
    descripcion:
      "Determinación de la cinética de crecimiento bacteriano mediante monitoreo continuo, identificando fases lag, exponencial, estacionaria y muerte.",
  },
  {
    concepto: "Producción de Biofertilizantes",
    icon: Droplets,
    unidad: "Litro",
    descripcionTecnica: {
      req: "Especificación de microorganismos y cultivo objetivo",
      proc: "Fermentación de cepas PGPR, formulación y estabilización",
      ent: "Biofertilizante líquido con recuento garantizado",
    },
    descripcion:
      "Producción de biofertilizantes a base de bacterias promotoras del crecimiento vegetal (PGPR) como Azotobacter, Azospirillum y Bacillus.",
  },
  {
    concepto: "Producción de Bioestimulantes",
    icon: FlaskConical,
    unidad: "Litro",
    descripcionTecnica: {
      req: "Tipo de bioestimulante y aplicación deseada",
      proc: "Fermentación y extracción de metabolitos activos",
      ent: "Bioestimulante formulado con ficha técnica",
    },
    descripcion:
      "Desarrollo y producción de bioestimulantes microbianos que mejoran la absorción de nutrientes, tolerancia al estrés y rendimiento de cultivos.",
  },
  {
    concepto: "Aislamiento de Cepas",
    icon: TestTube,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra ambiental (suelo, agua, rizosfera)",
      proc: "Aislamiento selectivo, purificación y caracterización",
      ent: "Cepas puras identificadas con potencial biotecnológico",
    },
    descripcion:
      "Aislamiento y selección de cepas bacterianas con características de interés como fijación de nitrógeno, solubilización de fosfatos o producción de sideróforos.",
  },
  {
    concepto: "Conservación de Cepas",
    icon: Beaker,
    unidad: "Cepa",
    descripcionTecnica: {
      req: "Cultivo puro de la cepa a conservar",
      proc: "Liofilización o criopreservación en glicerol",
      ent: "Viales de conservación con viabilidad garantizada",
    },
    descripcion:
      "Servicio de conservación a largo plazo de cepas bacterianas mediante liofilización o criopreservación, manteniendo la viabilidad y características.",
  },
  {
    concepto: "Identificación Bacteriana",
    icon: FlaskConical,
    unidad: "Cepa",
    descripcionTecnica: {
      req: "Cultivo puro de la bacteria a identificar",
      proc: "Pruebas bioquímicas, morfológicas y moleculares",
      ent: "Informe con identificación a nivel de género/especie",
    },
    descripcion:
      "Identificación de bacterias mediante pruebas bioquímicas convencionales, sistemas automatizados y técnicas moleculares como PCR y secuenciación.",
  },
]

const garantias = [
  { icon: Shield, title: "Cepas Certificadas", desc: "Trazabilidad garantizada" },
  { icon: CheckCircle2, title: "Control de Calidad", desc: "Cada lote verificado" },
  { icon: Clock, title: "Producción", desc: "Tiempos optimizados" },
  { icon: Award, title: "Experiencia", desc: "Equipo especializado" },
]

export default function BacteriologiaClient() {
  const [expandedServices, setExpandedServices] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleService = (index: number) => {
    setExpandedServices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredServices = serviciosBacteriologia.filter((s) =>
    s.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background font-serif">
      <Navbar />

      <header className="relative h-[280px] overflow-hidden">
        <Image
          src="/images/image.png"
          alt="Bacteriología General - Análisis microbiológico"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
                <span className="text-purple-300 text-sm font-medium uppercase tracking-wider">
                  Servicios Especializados
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Bacteriología General</h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Suspensiones, fermentación, curvas de crecimiento y desarrollo de bioproductos.
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
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-purple-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-purple-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-purple-600" />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
              />
            </div>
            <Link
              href="https://wa.me/51961996645?text=Hola,%20deseo%20cotizar%20servicios%20de%20Bacteriología%20General"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-500 text-white rounded-lg font-medium text-sm hover:bg-purple-600 transition-all"
            >
              <FileText className="w-4 h-4" />
              Cotizar
            </Link>
          </div>
        </section>

        {/* Tabla de servicios */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-foreground">Catálogo de Servicios</h2>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">{filteredServices.length} servicios</span>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-50 border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Concepto</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground hidden lg:table-cell text-sm">
                    Descripción Técnica
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground w-24 text-sm">Unidad</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((servicio, index) => (
                  <>
                    <tr
                      key={index}
                      className="border-b border-border last:border-0 hover:bg-purple-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleService(index)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button className="w-7 h-7 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <ChevronDown
                              className={`w-4 h-4 text-purple-600 transition-transform duration-300 ${expandedServices.includes(index) ? "rotate-180" : ""}`}
                            />
                          </button>
                          <servicio.icon className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{servicio.concepto}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>
                            <span className="font-medium text-purple-600">Req:</span>{" "}
                            {servicio.descripcionTecnica.req.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-purple-600">Proc:</span>{" "}
                            {servicio.descripcionTecnica.proc.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-purple-600">Ent:</span> {servicio.descripcionTecnica.ent}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {servicio.unidad}
                        </span>
                      </td>
                    </tr>
                    {expandedServices.includes(index) && (
                      <tr className="bg-purple-50/30">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="bg-white rounded-lg p-5 border border-purple-200">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                                <servicio.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground mb-2">{servicio.concepto}</h4>
                                <p className="text-muted-foreground text-sm">{servicio.descripcion}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3 pt-4 border-t border-purple-100">
                              <div className="bg-purple-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                    1
                                  </span>
                                  <span className="font-semibold text-purple-700 text-sm">Requisitos</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.req}</p>
                              </div>
                              <div className="bg-purple-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                    2
                                  </span>
                                  <span className="font-semibold text-purple-700 text-sm">Proceso</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.proc}</p>
                              </div>
                              <div className="bg-purple-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                                    3
                                  </span>
                                  <span className="font-semibold text-purple-700 text-sm">Entrega</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.ent}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Banner de contacto */}
        <section>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">¿Necesitas servicios de bacteriología?</h3>
                <p className="text-white/80 text-sm">Contáctanos para una cotización personalizada</p>
              </div>
              <Link
                href="https://wa.me/51961996645?text=Hola,%20deseo%20información%20sobre%20servicios%20de%20Bacteriología%20General"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
