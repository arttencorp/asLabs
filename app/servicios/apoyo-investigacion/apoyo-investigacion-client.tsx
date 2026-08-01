"use client"

import { Fragment, useState } from "react"
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
  TestTube,
  Beaker,
  Dna,
  Binary,
  BookOpen,
  Search,
  ChevronDown,
  FileText,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Servicio {
  concepto: string
  icon: LucideIcon
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
      req: "Especificacion de microorganismo y concentracion requerida",
      proc: "Cultivo y preparacion de suspension estandarizada",
      ent: "Suspension bacteriana con viabilidad garantizada",
    },
    descripcion:
      "Preparacion de suspensiones bacterianas de alta concentracion para investigacion, con estandares de pureza y viabilidad.",
  },
  {
    concepto: "Produccion de Bacterias para Investigacion",
    icon: FlaskConical,
    unidad: "Lote",
    descripcionTecnica: {
      req: "Cepa especifica y cantidad de biomasa requerida",
      proc: "Fermentacion controlada con monitoreo de parametros",
      ent: "Biomasa bacteriana con certificado de produccion",
    },
    descripcion:
      "Produccion de biomasa bacteriana en cantidades requeridas para proyectos de investigacion con control de calidad.",
  },
  {
    concepto: "Suspensiones de Bacterias para Biorremediacion de Concreto",
    icon: Beaker,
    unidad: "Litro",
    descripcionTecnica: {
      req: "Especificacion de cepas y concentracion para biorremediacion",
      proc: "Seleccion y cultivo de cepas productoras de carbonato",
      ent: "Suspension bacteriana con capacidad de mineralizacion",
    },
    descripcion:
      "Preparacion de suspensiones bacterianas especializadas con capacidad de producir carbonato de calcio para reparacion biologica de grietas en concreto.",
  },
  {
    concepto: "Cepas Bacterianas para Investigacion",
    icon: Microscope,
    unidad: "Cepa",
    descripcionTecnica: {
      req: "Solicitud de cepa con especificaciones tecnicas",
      proc: "Seleccion, caracterizacion y conservacion de cepa",
      ent: "Cepa pura con documentacion de caracterizacion",
    },
    descripcion:
      "Suministro de cepas bacterianas caracterizadas y documentadas para proyectos de investigacion cientifica.",
  },
  {
    concepto: "Identificacion Molecular de Bacterias en Cultivo Puro",
    icon: Dna,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Cultivo puro de la bacteria a identificar",
      proc: "Extraccion de ADN y analisis molecular (MALDI-TOF o secuenciacion)",
      ent: "Informe de identificacion a nivel de especie",
    },
    descripcion:
      "Identificacion de bacterias mediante tecnicas moleculares avanzadas como MALDI-TOF, PCR y secuenciacion para precision maxima.",
  },
  {
    concepto: "Identificacion por 16S RNA de Microorganismos",
    icon: Binary,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra de ADN o cultivo de microorganismo",
      proc: "Amplificacion de gen 16S RNA, secuenciacion y alineamiento",
      ent: "Identificacion taxonomica con analisis filogenetico",
    },
    descripcion:
      "Identificacion molecular mediante secuenciacion del gen 16S RNA, estandar de oro para la taxonomia bacteriana y estudio de diversidad microbiana.",
  },
  {
    concepto: "Formulacion de Protocolos y Estandarizacion",
    icon: BookOpen,
    unidad: "Protocolo",
    descripcionTecnica: {
      req: "Especificacion del objetivo y metodologia deseada",
      proc: "Diseno, optimizacion y validacion del protocolo",
      ent: "Protocolo documentado con guia de implementacion",
    },
    descripcion:
      "Diseno y estandarizacion de protocolos experimentales bacteriologicos optimizados para reproducibilidad y eficiencia.",
  },
  {
    concepto: "Aislamiento de Bacterias",
    icon: TestTube,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Muestra ambiental (suelo, agua, sedimento, otros)",
      proc: "Aislamiento selectivo, purificacion y caracterizacion morfologica",
      ent: "Cepas puras aisladas con descripcion preliminar",
    },
    descripcion:
      "Aislamiento y purificacion de bacterias desde muestras ambientales complejas, obteniendo cepas puras para investigacion.",
  },
  {
    concepto: "Servicio Analisis e Informes Bioinformatica",
    icon: Binary,
    unidad: "Analisis",
    descripcionTecnica: {
      req: "Archivos de secuencias o datos moleculares",
      proc: "Procesamiento, analisis bioinformatico y visualizacion de datos",
      ent: "Informe con resultados, graficas y conclusiones",
    },
    descripcion:
      "Analisis bioinformatico de datos de secuenciacion, filogenia, anotacion genica y generacion de reportes cientificos detallados.",
  },
]

const garantias = [
  { icon: Shield, title: "Metodos Validados", desc: "Protocolos cientificos" },
  { icon: CheckCircle2, title: "Documentacion", desc: "Reportes detallados" },
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
          src="/servicios/micro.jpeg"
          alt="Apoyo a la Investigacion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-sky-300 text-sm font-medium uppercase tracking-wider">
                  Servicios Especializados
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Apoyo a la Investigacion</h1>
              <p className="text-white/85 text-base md:text-lg max-w-xl">
                Identificacion molecular, 16S RNA, aislamiento bacteriano y analisis bioinformatico.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {garantias.map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-sky-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
              />
            </div>
            <Link
              href="https://wa.me/51961996645?text=Hola,%20deseo%20cotizar%20servicios%20de%20Apoyo%20a%20la%20Investigacion"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-500 text-white rounded-lg font-medium text-sm hover:bg-sky-600 transition-all"
            >
              <FileText className="w-4 h-4" />
              Cotizar
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-foreground">Catalogo de Servicios</h2>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">{filteredServices.length} servicios</span>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-sky-50 border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Concepto</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground hidden lg:table-cell text-sm">
                    Descripcion Tecnica
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground w-24 text-sm">Unidad</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((servicio, index) => (
                  <Fragment key={servicio.concepto}>
                    <tr
                      className="border-b border-border last:border-0 hover:bg-sky-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleService(index)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button className="w-7 h-7 rounded-md bg-sky-100 flex items-center justify-center flex-shrink-0">
                            <ChevronDown
                              className={`w-4 h-4 text-sky-600 transition-transform duration-300 ${expandedServices.includes(index) ? "rotate-180" : ""}`}
                            />
                          </button>
                          <servicio.icon className="w-4 h-4 text-sky-500 flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{servicio.concepto}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>
                            <span className="font-medium text-sky-600">Req:</span>{" "}
                            {servicio.descripcionTecnica.req.substring(0, 48)}...
                          </p>
                          <p>
                            <span className="font-medium text-sky-600">Proc:</span>{" "}
                            {servicio.descripcionTecnica.proc.substring(0, 48)}...
                          </p>
                          <p>
                            <span className="font-medium text-sky-600">Ent:</span> {servicio.descripcionTecnica.ent}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-3 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">
                          {servicio.unidad}
                        </span>
                      </td>
                    </tr>
                    {expandedServices.includes(index) && (
                      <tr className="bg-sky-50/30">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="bg-white rounded-lg p-5 border border-sky-200">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0">
                                <servicio.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground mb-2">{servicio.concepto}</h4>
                                <p className="text-muted-foreground text-sm">{servicio.descripcion}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3 pt-4 border-t border-sky-100">
                              <div className="bg-sky-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center font-bold">
                                    1
                                  </span>
                                  <span className="font-semibold text-sky-700 text-sm">Requerimiento</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.req}</p>
                              </div>
                              <div className="bg-sky-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center font-bold">
                                    2
                                  </span>
                                  <span className="font-semibold text-sky-700 text-sm">Proceso</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.proc}</p>
                              </div>
                              <div className="bg-sky-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center font-bold">
                                    3
                                  </span>
                                  <span className="font-semibold text-sky-700 text-sm">Entregable</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.ent}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">Necesitas apoyo para tu investigacion?</h3>
                <p className="text-white/85 text-sm">Te ayudamos a estructurar, ejecutar y documentar tus ensayos</p>
              </div>
              <Link
                href="https://wa.me/51961996645?text=Hola,%20deseo%20informacion%20sobre%20Apoyo%20a%20la%20Investigacion"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-all"
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
