"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  FlaskConical,
  Shield,
  CheckCircle2,
  Clock,
  Award,
  MessageCircle,
  Microscope,
  TestTube,
  Beaker,
  ChevronDown,
  Search,
  FileText,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const serviciosMicrobiologicos = [
  {
    concepto: "Recuento Aerobios Mesófilos en Alimentos",
    icon: TestTube,
    unidad: "25g",
    descripcionTecnica: {
      req: "25g de muestra alimentaria en empaque original o bolsa estéril",
      proc: "Siembra en PCA, incubación 35°C/48h, recuento en placa",
      ent: "Informe UFC/g según normativa DIGESA",
    },
    descripcion:
      "El recuento de aerobios mesófilos en alimentos determina la carga microbiana total, indicador de calidad higiénica y vida útil del producto.",
  },
  {
    concepto: "Detección de Salmonella spp.",
    icon: Microscope,
    unidad: "25g",
    descripcionTecnica: {
      req: "25g de muestra en condiciones de refrigeración",
      proc: "Pre-enriquecimiento, enriquecimiento selectivo, aislamiento en XLD/HE",
      ent: "Informe presencia/ausencia en 25g",
    },
    descripcion:
      "La detección de Salmonella spp. identifica la presencia de este patógeno causante de salmonelosis en alimentos mediante métodos de cultivo selectivo.",
  },
  {
    concepto: "Recuento de Staphylococcus aureus",
    icon: Beaker,
    unidad: "25g",
    descripcionTecnica: {
      req: "25g de muestra alimentaria, especialmente lácteos y carnes",
      proc: "Siembra en Agar Baird-Parker, confirmación coagulasa",
      ent: "Informe UFC/g con identificación",
    },
    descripcion:
      "El recuento de Staphylococcus aureus cuantifica este patógeno productor de enterotoxinas causantes de intoxicación alimentaria.",
  },
  {
    concepto: "Detección de Listeria monocytogenes",
    icon: FlaskConical,
    unidad: "25g",
    descripcionTecnica: {
      req: "25g de muestra, especialmente productos listos para consumo",
      proc: "Enriquecimiento en caldo Fraser, aislamiento en PALCAM/Oxford",
      ent: "Informe presencia/ausencia en 25g",
    },
    descripcion:
      "La detección de Listeria monocytogenes identifica este patógeno de alta mortalidad en productos refrigerados listos para consumo.",
  },
  {
    concepto: "Recuento de Mohos y Levaduras",
    icon: TestTube,
    unidad: "25g",
    descripcionTecnica: {
      req: "25g de muestra, preferentemente productos con baja actividad de agua",
      proc: "Siembra en Agar OGY o PDA acidificado, incubación 25°C/5-7 días",
      ent: "Informe UFC/g con identificación morfológica",
    },
    descripcion:
      "El recuento de mohos y levaduras evalúa la contaminación fúngica en alimentos, indicador de condiciones de almacenamiento.",
  },
  {
    concepto: "Análisis Microbiológico de Agua Potable",
    icon: Beaker,
    unidad: "500ml",
    descripcionTecnica: {
      req: "500ml de agua en frasco estéril, análisis dentro de 24h",
      proc: "Filtración por membrana, coliformes, E. coli, heterótrofos",
      ent: "Informe completo según DS N° 031-2010-SA",
    },
    descripcion:
      "El análisis microbiológico completo de agua potable evalúa todos los parámetros exigidos por la normativa peruana de calidad del agua.",
  },
  {
    concepto: "Control de Superficies",
    icon: Microscope,
    unidad: "Superficie",
    descripcionTecnica: {
      req: "Acceso a superficie a evaluar, área definida (100cm²)",
      proc: "Hisopado o placas de contacto, recuento de indicadores",
      ent: "Informe UFC/cm² con evaluación de limpieza",
    },
    descripcion:
      "El control microbiológico de superficies evalúa la efectividad de los procedimientos de limpieza y desinfección en áreas de producción.",
  },
  {
    concepto: "Análisis de Leche y Derivados",
    icon: FlaskConical,
    unidad: "250ml",
    descripcionTecnica: {
      req: "250ml de leche o 100g de derivado en refrigeración",
      proc: "Panel completo: aerobios, coliformes, S. aureus, Salmonella",
      ent: "Informe según NTP para productos lácteos",
    },
    descripcion:
      "El análisis microbiológico de leche y derivados evalúa la calidad e inocuidad de productos lácteos según normativa técnica peruana.",
  },
  {
    concepto: "Análisis de Productos Cárnicos",
    icon: TestTube,
    unidad: "250g",
    descripcionTecnica: {
      req: "250g de producto cárnico en cadena de frío",
      proc: "Panel completo incluyendo Clostridium perfringens",
      ent: "Informe según NTP para productos cárnicos",
    },
    descripcion:
      "El análisis de productos cárnicos evalúa la inocuidad de carnes y embutidos incluyendo patógenos específicos del grupo.",
  },
  {
    concepto: "Análisis de Productos Pesqueros",
    icon: Beaker,
    unidad: "250g",
    descripcionTecnica: {
      req: "250g de producto pesquero en hielo o congelación",
      proc: "Panel incluyendo Vibrio spp. y histamina si aplica",
      ent: "Informe según SANIPES",
    },
    descripcion:
      "El análisis de productos pesqueros evalúa la calidad microbiológica de pescados y mariscos según normativa SANIPES.",
  },
]

const garantias = [
  { icon: Shield, title: "Métodos Validados", desc: "ISO 17025" },
  { icon: CheckCircle2, title: "Precisión", desc: "Equipos certificados" },
  { icon: Clock, title: "Rapidez", desc: "Resultados oportunos" },
  { icon: Award, title: "Calidad", desc: "Personal capacitado" },
]

export default function MicrobiologicosClient() {
  const [expandedServices, setExpandedServices] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleService = (index: number) => {
    setExpandedServices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredServices = serviciosMicrobiologicos.filter((s) =>
    s.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background font-serif">
      <Navbar />

      <header className="relative h-[280px] overflow-hidden">
        <Image src="/servicios/image.png" alt="Servicios Microbiológicos" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                  Análisis de Laboratorio
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Servicios Microbiológicos</h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Análisis completos para alimentos, agua, superficies y control de calidad industrial.
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
              href="https://wa.me/51961996645?text=Hola,%20deseo%20cotizar%20servicios%20Microbiológicos"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-all"
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
                <tr className="bg-blue-50 border-b border-border">
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
                      className="border-b border-border last:border-0 hover:bg-blue-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleService(index)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <ChevronDown
                              className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${expandedServices.includes(index) ? "rotate-180" : ""}`}
                            />
                          </button>
                          <servicio.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{servicio.concepto}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>
                            <span className="font-medium text-blue-600">Req:</span>{" "}
                            {servicio.descripcionTecnica.req.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-blue-600">Proc:</span>{" "}
                            {servicio.descripcionTecnica.proc.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-blue-600">Ent:</span> {servicio.descripcionTecnica.ent}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {servicio.unidad}
                        </span>
                      </td>
                    </tr>
                    {expandedServices.includes(index) && (
                      <tr className="bg-blue-50/30">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="bg-white rounded-lg p-5 border border-blue-200">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                                <servicio.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground mb-2">{servicio.concepto}</h4>
                                <p className="text-muted-foreground text-sm">{servicio.descripcion}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3 pt-4 border-t border-blue-100">
                              <div className="bg-blue-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                                    1
                                  </span>
                                  <span className="font-semibold text-blue-700 text-sm">Requisitos</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.req}</p>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                                    2
                                  </span>
                                  <span className="font-semibold text-blue-700 text-sm">Proceso</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.proc}</p>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                                    3
                                  </span>
                                  <span className="font-semibold text-blue-700 text-sm">Entrega</span>
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
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">¿Necesitas análisis microbiológicos?</h3>
                <p className="text-white/80 text-sm">Contáctanos para una cotización personalizada</p>
              </div>
              <Link
                href="https://wa.me/51961996645?text=Hola,%20deseo%20información%20sobre%20servicios%20Microbiológicos"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
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
