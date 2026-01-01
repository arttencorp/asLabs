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
  FlaskConical,
  Sprout,
  Thermometer,
  Snowflake,
  ChevronDown,
  Search,
  FileText,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const serviciosBiotecnologia = [
  {
    concepto: "Micropropagación In Vitro",
    icon: Sprout,
    unidad: "Explante",
    descripcionTecnica: {
      req: "Material vegetal madre libre de patógenos visibles",
      proc: "Establecimiento, multiplicación en medio MS con reguladores",
      ent: "Plántulas enraizadas listas para aclimatación",
    },
    descripcion:
      "La micropropagación in vitro permite la multiplicación masiva de plantas genéticamente idénticas a partir de pequeños fragmentos de tejido vegetal en condiciones asépticas controladas.",
  },
  {
    concepto: "Cultivo de Meristemos",
    icon: Leaf,
    unidad: "Meristemo",
    descripcionTecnica: {
      req: "Ápices meristemáticos de 0.2-0.5mm",
      proc: "Aislamiento bajo microscopio, cultivo en medio específico",
      ent: "Plantas libres de virus certificadas",
    },
    descripcion:
      "El cultivo de meristemos aísla y cultiva la zona apical de crecimiento para obtener plantas libres de patógenos sistémicos como virus y fitoplasmas.",
  },
  {
    concepto: "Termoterapia",
    icon: Thermometer,
    unidad: "Planta",
    descripcionTecnica: {
      req: "Material vegetal infectado con virus termolábiles",
      proc: "Tratamiento térmico 35-40°C por 4-6 semanas",
      ent: "Material saneado para posterior cultivo de meristemos",
    },
    descripcion:
      "La termoterapia elimina virus termolábiles mediante exposición controlada a temperaturas elevadas, preparando el material para el cultivo de meristemos.",
  },
  {
    concepto: "Criopreservación",
    icon: Snowflake,
    unidad: "Muestra",
    descripcionTecnica: {
      req: "Material vegetal en activo crecimiento",
      proc: "Vitrificación o encapsulación-deshidratación en nitrógeno líquido",
      ent: "Accesión conservada a largo plazo (-196°C)",
    },
    descripcion:
      "La criopreservación conserva material genético vegetal a ultra-bajas temperaturas en nitrógeno líquido para preservación a largo plazo de germoplasma valioso.",
  },
  {
    concepto: "Microinjerto In Vitro",
    icon: FlaskConical,
    unidad: "Injerto",
    descripcionTecnica: {
      req: "Ápices de 0.1-0.3mm y portainjertos in vitro",
      proc: "Microinjerto bajo microscopio en condiciones asépticas",
      ent: "Plantas injertadas libres de patógenos",
    },
    descripcion:
      "El microinjerto in vitro combina ápices meristemáticos diminutos con portainjertos vigorosos para eliminar patógenos y acelerar el crecimiento.",
  },
  {
    concepto: "Embriogénesis Somática",
    icon: Sprout,
    unidad: "Cultivo",
    descripcionTecnica: {
      req: "Explantes embriogénicos o tejido competente",
      proc: "Inducción, maduración y germinación de embriones somáticos",
      ent: "Plántulas derivadas de embriones somáticos",
    },
    descripcion:
      "La embriogénesis somática induce la formación de embriones a partir de células somáticas, permitiendo la propagación masiva y conservación de germoplasma.",
  },
  {
    concepto: "Enraizamiento In Vitro",
    icon: Leaf,
    unidad: "Brote",
    descripcionTecnica: {
      req: "Brotes multiplicados de 2-3cm de altura",
      proc: "Transferencia a medio con auxinas para inducción radicular",
      ent: "Plántulas con sistema radicular desarrollado",
    },
    descripcion:
      "El enraizamiento in vitro induce la formación de raíces en brotes multiplicados mediante medios de cultivo con auxinas específicas.",
  },
  {
    concepto: "Aclimatación de Plántulas",
    icon: Sprout,
    unidad: "Plántula",
    descripcionTecnica: {
      req: "Plántulas enraizadas in vitro de 3-5cm",
      proc: "Transferencia gradual a condiciones ex vitro en invernadero",
      ent: "Plantas aclimatadas listas para campo",
    },
    descripcion:
      "La aclimatación transfiere gradualmente las plántulas in vitro a condiciones ambientales naturales, adaptándolas para su supervivencia en campo.",
  },
]

const garantias = [
  { icon: Shield, title: "Asepsia Total", desc: "Condiciones estériles" },
  { icon: CheckCircle2, title: "Calidad Genética", desc: "Material certificado" },
  { icon: Clock, title: "Seguimiento", desc: "Control continuo" },
  { icon: Award, title: "Experiencia", desc: "+20 años en biotecnología" },
]

export default function BiotecnologiaVegetalClient() {
  const [expandedServices, setExpandedServices] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleService = (index: number) => {
    setExpandedServices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredServices = serviciosBiotecnologia.filter((s) =>
    s.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background font-serif">
      <Navbar />

      <header className="relative h-[280px] overflow-hidden">
        <Image
          src="/images/image.png"
          alt="Biotecnología Vegetal - Cultivo de tejidos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-teal-300 text-sm font-medium uppercase tracking-wider">Cultivo de Tejidos</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Biotecnología Vegetal</h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Servicios especializados en micropropagación, cultivo in vitro y técnicas avanzadas para plantas.
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
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-teal-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-teal-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-teal-600" />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
              />
            </div>
            <Link
              href="https://wa.me/51961996645?text=Hola,%20deseo%20cotizar%20servicios%20de%20Biotecnología%20Vegetal"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-500 text-white rounded-lg font-medium text-sm hover:bg-teal-600 transition-all"
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
                <tr className="bg-teal-50 border-b border-border">
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
                      className="border-b border-border last:border-0 hover:bg-teal-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleService(index)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button className="w-7 h-7 rounded-md bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <ChevronDown
                              className={`w-4 h-4 text-teal-600 transition-transform duration-300 ${expandedServices.includes(index) ? "rotate-180" : ""}`}
                            />
                          </button>
                          <servicio.icon className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span className="font-medium text-foreground text-sm">{servicio.concepto}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          <p>
                            <span className="font-medium text-teal-600">Req:</span>{" "}
                            {servicio.descripcionTecnica.req.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-teal-600">Proc:</span>{" "}
                            {servicio.descripcionTecnica.proc.substring(0, 45)}...
                          </p>
                          <p>
                            <span className="font-medium text-teal-600">Ent:</span> {servicio.descripcionTecnica.ent}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                          {servicio.unidad}
                        </span>
                      </td>
                    </tr>
                    {expandedServices.includes(index) && (
                      <tr className="bg-teal-50/30">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="bg-white rounded-lg p-5 border border-teal-200">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center flex-shrink-0">
                                <servicio.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground mb-2">{servicio.concepto}</h4>
                                <p className="text-muted-foreground text-sm">{servicio.descripcion}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3 pt-4 border-t border-teal-100">
                              <div className="bg-teal-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center font-bold">
                                    1
                                  </span>
                                  <span className="font-semibold text-teal-700 text-sm">Requisitos</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.req}</p>
                              </div>
                              <div className="bg-teal-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center font-bold">
                                    2
                                  </span>
                                  <span className="font-semibold text-teal-700 text-sm">Proceso</span>
                                </div>
                                <p className="text-muted-foreground text-xs">{servicio.descripcionTecnica.proc}</p>
                              </div>
                              <div className="bg-teal-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center font-bold">
                                    3
                                  </span>
                                  <span className="font-semibold text-teal-700 text-sm">Entrega</span>
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
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">¿Necesitas servicios de biotecnología vegetal?</h3>
                <p className="text-white/80 text-sm">Contáctanos para una cotización personalizada</p>
              </div>
              <Link
                href="https://wa.me/51961996645?text=Hola,%20deseo%20información%20sobre%20servicios%20de%20Biotecnología%20Vegetal"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all"
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
