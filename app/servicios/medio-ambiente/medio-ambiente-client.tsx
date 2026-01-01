"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Leaf,
  Shield,
  CheckCircle2,
  Clock,
  Award,
  MessageCircle,
  Droplets,
  TestTube,
  Beaker,
  Gauge,
  ChevronDown,
  Search,
  FileText,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const serviciosMedioAmbiente = [
  {
    concepto: "Recuento Aerobios Mesófilos",
    icon: TestTube,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra de agua (100ml), superficie (hisopo estéril) o aire (placa)",
      proc: "Siembra en Agar Plate Count (PCA), incubación 35-37°C por 48h",
      ent: "Informe con recuento UFC/mL, UFC/cm² o UFC/m³",
    },
    descripcion:
      "El recuento de aerobios mesófilos determina la carga microbiana total viable en muestras ambientales. Este indicador refleja la calidad higiénica general del ambiente analizado.",
  },
  {
    concepto: "Coliformes Totales/Fecales",
    icon: Droplets,
    unidad: "100ml",
    descripcionTecnica: {
      req: "100ml de agua en frasco estéril, mantener refrigerado (4°C)",
      proc: "Filtración por membrana o NMP en tubos múltiples, medios selectivos",
      ent: "Informe NMP/100ml o UFC/100ml con interpretación",
    },
    descripcion:
      "El análisis de coliformes totales y fecales evalúa la contaminación de origen entérico en muestras de agua. Este análisis es esencial para determinar la potabilidad del agua.",
  },
  {
    concepto: "Detección de Escherichia coli",
    icon: Beaker,
    unidad: "100ml",
    descripcionTecnica: {
      req: "100ml de agua o muestra alimentaria en recipiente estéril",
      proc: "Siembra en medios cromogénicos selectivos, confirmación IMViC",
      ent: "Informe presencia/ausencia o recuento UFC",
    },
    descripcion:
      "La detección específica de Escherichia coli identifica la presencia de este microorganismo indicador de contaminación fecal reciente.",
  },
  {
    concepto: "Recuento de Enterobacterias",
    icon: TestTube,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra alimentaria (25g) o agua (100ml) en condiciones estériles",
      proc: "Siembra en Agar VRBG, incubación 37°C/24h",
      ent: "Informe UFC/g o UFC/ml según normativa",
    },
    descripcion:
      "El recuento de enterobacterias cuantifica la familia Enterobacteriaceae en muestras ambientales y alimentarias.",
  },
  {
    concepto: "Medición de pH",
    icon: Gauge,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "50ml mínimo de muestra líquida en recipiente limpio",
      proc: "Potenciometría con electrodo de vidrio calibrado",
      ent: "Resultado inmediato con precisión ±0.01 unidades pH",
    },
    descripcion:
      "La medición de pH determina la acidez o alcalinidad de muestras líquidas mediante potenciometría con electrodo de vidrio calibrado.",
  },
  {
    concepto: "Sensibilidad Desinfectante",
    icon: Droplets,
    unidad: "Prueba",
    descripcionTecnica: {
      req: "Desinfectante a evaluar (50ml) y cepa objetivo o aislado",
      proc: "Método dilución-neutralización, determinación de CMB",
      ent: "Informe con eficacia antimicrobiana y concentración óptima",
    },
    descripcion:
      "La prueba de sensibilidad a desinfectantes evalúa la eficacia antimicrobiana de productos sanitizantes contra cepas específicas.",
  },
  {
    concepto: "Recuento Cámara Neubauer",
    icon: Beaker,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Suspensión celular o microbiana en medio líquido, volumen mínimo 1ml",
      proc: "Conteo directo en hemocitómetro calibrado, tinción vital opcional",
      ent: "Resultado en células/mL o esporas/mL con viabilidad",
    },
    descripcion:
      "El recuento en cámara de Neubauer permite la cuantificación directa de células mediante microscopía óptica.",
  },
]

const garantias = [
  { icon: Shield, title: "Normativas Ambientales", desc: "Cumplimiento de estándares" },
  { icon: CheckCircle2, title: "Precisión Analítica", desc: "Equipos calibrados" },
  { icon: Clock, title: "Respuesta Rápida", desc: "Resultados en tiempo óptimo" },
  { icon: Award, title: "Acreditación", desc: "Laboratorio certificado" },
]

export default function MedioAmbienteClient() {
  const [expandedServices, setExpandedServices] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleService = (index: number) => {
    setExpandedServices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredServices = serviciosMedioAmbiente.filter((s) =>
    s.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background font-serif">
      <Navbar />

      <header className="relative h-[280px] overflow-hidden">
        <Image src="/images/image.png" alt="Medio Ambiente - Análisis de agua" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-emerald-300 text-sm font-medium uppercase tracking-wider">
                  Análisis Ambiental
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Medio Ambiente</h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Análisis microbiológicos para el control de calidad ambiental en muestras de agua, aire y superficies.
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
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-emerald-600" />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>
            <Link
              href="https://wa.me/51961996645?text=Hola,%20deseo%20cotizar%20servicios%20de%20Medio%20Ambiente"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-medium text-sm hover:bg-emerald-600 transition-all"
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
                <tr className="bg-emerald-50 border-b border-border">
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
                      className="border-b border-border last:border-0 hover:bg-emerald-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleService(index)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button className="w-7 h-7 rounded-md bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <ChevronDown
                              className={`w-4 h-4 text-emerald-600 transition-transform duration-300 ${expandedServices.includes(index) ? "rotate-180" : ""}`}
                            />
                          </button>
                          <servicio.icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{servicio.concepto}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>
                            <span className="font-medium text-emerald-600">Req:</span>{" "}
                            {servicio.descripcionTecnica.req.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-emerald-600">Proc:</span>{" "}
                            {servicio.descripcionTecnica.proc.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-emerald-600">Ent:</span> {servicio.descripcionTecnica.ent}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          {servicio.unidad}
                        </span>
                      </td>
                    </tr>
                    {expandedServices.includes(index) && (
                      <tr className="bg-emerald-50/30">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="bg-white rounded-lg p-5 border border-emerald-200">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                                <servicio.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground mb-2">{servicio.concepto}</h4>
                                <p className="text-muted-foreground text-sm">{servicio.descripcion}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3 pt-4 border-t border-emerald-100">
                              <div className="bg-emerald-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                                    1
                                  </span>
                                  <span className="font-semibold text-emerald-700 text-sm">Requisitos</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.req}</p>
                              </div>
                              <div className="bg-emerald-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                                    2
                                  </span>
                                  <span className="font-semibold text-emerald-700 text-sm">Proceso</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.proc}</p>
                              </div>
                              <div className="bg-emerald-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                                    3
                                  </span>
                                  <span className="font-semibold text-emerald-700 text-sm">Entrega</span>
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
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">¿Necesitas un análisis ambiental?</h3>
                <p className="text-white/80 text-sm">Contáctanos para una cotización personalizada</p>
              </div>
              <Link
                href="https://wa.me/51961996645?text=Hola,%20deseo%20información%20sobre%20servicios%20de%20Medio%20Ambiente"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-all"
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
