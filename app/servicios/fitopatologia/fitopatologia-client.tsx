"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Microscope,
  Shield,
  CheckCircle2,
  Clock,
  Award,
  MessageCircle,
  FlaskConical,
  Bug,
  Leaf,
  ChevronDown,
  Search,
  Beaker,
  FileText,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const serviciosFitopatologia = [
  {
    concepto: "Detección de Patógenos en Muestras Vegetales",
    icon: Bug,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra vegetal fresca (hojas, tallos o raíces) en bolsa estéril, mínimo 50g",
      proc: "Aislamiento en medios selectivos, tinción diferencial y microscopía óptica",
      ent: "Informe con identificación del patógeno y recomendaciones",
    },
    descripcion:
      "El servicio de detección de patógenos en muestras vegetales emplea técnicas microbiológicas avanzadas para identificar agentes causales de enfermedades en plantas. Se utilizan métodos de aislamiento en medios de cultivo selectivos, tinción diferencial y microscopía óptica para la identificación morfológica de bacterias, hongos y oomicetos fitopatógenos.",
  },
  {
    concepto: "Prueba de Susceptibilidad",
    icon: FlaskConical,
    unidad: "Placa",
    descripcionTecnica: {
      req: "Cepa aislada del patógeno o muestra infectada para aislamiento previo",
      proc: "Método de difusión en agar con discos de antimicrobianos/fungicidas",
      ent: "Informe con CMI y sensibilidad a cada compuesto",
    },
    descripcion:
      "La prueba de susceptibilidad determina la sensibilidad de microorganismos fitopatógenos aislados frente a diferentes agentes antimicrobianos, fungicidas o bactericidas. Mediante el método de difusión en agar o dilución en caldo, se evalúa la concentración mínima inhibitoria (CMI) de cada compuesto.",
  },
  {
    concepto: "Suspensión de Bacterias y Hongos Fitopatógenos",
    icon: Microscope,
    unidad: "100ml",
    descripcionTecnica: {
      req: "Solicitud especificando especie y concentración requerida (UFC/mL)",
      proc: "Cultivo de cepas caracterizadas, cuantificación por espectrofotometría",
      ent: "Suspensión estandarizada con certificado de concentración",
    },
    descripcion:
      "Este servicio proporciona suspensiones estandarizadas de bacterias y hongos fitopatógenos para uso en investigación, pruebas de patogenicidad y evaluación de productos fitosanitarios. Las suspensiones se preparan a partir de cepas caracterizadas y cuantificadas.",
  },
  {
    concepto: "Análisis de Suelos",
    icon: Leaf,
    unidad: "100g",
    descripcionTecnica: {
      req: "100g de suelo en bolsa estéril, profundidad 10-20cm",
      proc: "Diluciones seriadas, siembra en medios selectivos",
      ent: "Informe integral de salud microbiológica del suelo",
    },
    descripcion:
      "El análisis microbiológico de suelos evalúa la salud y biodiversidad microbiana del sustrato agrícola. Se determina la carga total de microorganismos aerobios, anaerobios facultativos, hongos totales y actinomicetos mediante técnicas de dilución seriada.",
  },
  {
    concepto: "Presencia de Bacterias en Suelo",
    icon: Bug,
    unidad: "100g",
    descripcionTecnica: {
      req: "100g de suelo en recipiente estéril, mantener refrigerado",
      proc: "Aislamiento en medios selectivos para Pseudomonas, Bacillus, Rhizobium",
      ent: "Informe con recuento UFC/g e identificación de géneros",
    },
    descripcion:
      "Este análisis específico detecta y cuantifica poblaciones bacterianas en muestras de suelo agrícola. Se emplean medios de cultivo selectivos para el aislamiento de géneros bacterianos de importancia agrícola.",
  },
  {
    concepto: "Presencia de Hongos en Suelo",
    icon: Beaker,
    unidad: "100g",
    descripcionTecnica: {
      req: "100g de suelo en bolsa estéril, evitar exposición solar directa",
      proc: "Siembra en PDA, Rosa de Bengala para identificar Fusarium, Rhizoctonia",
      ent: "Informe con recuento UFC/g y evaluación de riesgo",
    },
    descripcion:
      "El análisis de hongos en suelo detecta y cuantifica la micobiota presente en sustratos agrícolas. Mediante siembra en medios selectivos como PDA, Rosa de Bengala y Czapek, se identifican hongos saprofíticos, micorrícicos y fitopatógenos.",
  },
]

const garantias = [
  { icon: Shield, title: "Protocolos Certificados", desc: "Metodologías estandarizadas" },
  { icon: CheckCircle2, title: "Resultados Precisos", desc: "Equipos de alta tecnología" },
  { icon: Clock, title: "Entrega Oportuna", desc: "Tiempos optimizados" },
  { icon: Award, title: "Personal Calificado", desc: "Expertos en fitopatología" },
]

export default function FitopatologiaClient() {
  const [expandedServices, setExpandedServices] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleService = (index: number) => {
    setExpandedServices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredServices = serviciosFitopatologia.filter((s) =>
    s.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background font-serif">
      <Navbar />

      <header className="relative h-[280px] overflow-hidden">
        <Image
          src="/servicios/fito.jpg"
          alt="Fitopatología - Análisis de plantas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                  <Bug className="w-5 h-5 text-white" />
                </div>
                <span className="text-orange-300 text-sm font-medium uppercase tracking-wider">
                  Servicios Especializados
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Fitopatología</h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Identificación y análisis de patógenos en plantas, suelos y tejidos vegetales.
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
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-orange-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-600" />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
              />
            </div>
            <Link
              href="https://wa.me/51961996645?text=Hola,%20deseo%20cotizar%20servicios%20de%20Fitopatología"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg font-medium text-sm hover:bg-orange-600 transition-all"
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
                <tr className="bg-orange-50 border-b border-border">
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
                      className="border-b border-border last:border-0 hover:bg-orange-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleService(index)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button className="w-7 h-7 rounded-md bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <ChevronDown
                              className={`w-4 h-4 text-orange-600 transition-transform duration-300 ${expandedServices.includes(index) ? "rotate-180" : ""}`}
                            />
                          </button>
                          <servicio.icon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{servicio.concepto}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>
                            <span className="font-medium text-orange-600">Req:</span>{" "}
                            {servicio.descripcionTecnica.req.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-orange-600">Proc:</span>{" "}
                            {servicio.descripcionTecnica.proc.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-orange-600">Ent:</span> {servicio.descripcionTecnica.ent}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                          {servicio.unidad}
                        </span>
                      </td>
                    </tr>
                    {expandedServices.includes(index) && (
                      <tr className="bg-orange-50/30">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="bg-white rounded-lg p-5 border border-orange-200">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                                <servicio.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground mb-2">{servicio.concepto}</h4>
                                <p className="text-muted-foreground text-sm">{servicio.descripcion}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3 pt-4 border-t border-orange-100">
                              <div className="bg-orange-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                                    1
                                  </span>
                                  <span className="font-semibold text-orange-700 text-sm">Requisitos</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.req}</p>
                              </div>
                              <div className="bg-orange-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                                    2
                                  </span>
                                  <span className="font-semibold text-orange-700 text-sm">Proceso</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.proc}</p>
                              </div>
                              <div className="bg-orange-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                                    3
                                  </span>
                                  <span className="font-semibold text-orange-700 text-sm">Entrega</span>
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
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">¿Necesitas un análisis fitopatológico?</h3>
                <p className="text-white/80 text-sm">Contáctanos para una cotización personalizada</p>
              </div>
              <Link
                href="https://wa.me/51961996645?text=Hola,%20deseo%20información%20sobre%20servicios%20de%20Fitopatología"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all"
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
