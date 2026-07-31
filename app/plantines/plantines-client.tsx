"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/plantines/hero-section"
import PlantinCard from "@/components/plantines/plantin-card"
import TechnicalSheetModal from "@/components/plantines/technical-sheet-modal"
import CallToActionSection from "@/components/plantines/call-to-action"
import { plantines, categories } from "@/components/plantines/data"
import { Plantin } from "@/components/plantines/types"
import {
  Leaf,
  Calculator,
  MessageCircle,
  Search,
  X,
  PackageCheck,
  Sprout,
  Headphones,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react"
import { handleWhatsAppContact } from "@/components/plantines/utils"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

export default function PlantinesClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("recommended")
  const [showTechnicalSheet, setShowTechnicalSheet] = useState(false)
  const [selectedTechnicalData, setSelectedTechnicalData] = useState<Plantin | null>(null)
  const [hectareas, setHectareas] = useState(5)

  const normalizeText = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  const categoryFilteredPlantines =
    selectedCategory === "Todos" ? plantines : plantines.filter((plantin) => plantin.category === selectedCategory)

  const normalizedQuery = normalizeText(searchQuery.trim())

  const statusFilteredPlantines = categoryFilteredPlantines.filter((plantin) => {
    if (selectedStatus === "Disponibles") return plantin.available
    if (selectedStatus === "En producción") return Boolean(plantin.isProduction)
    if (selectedStatus === "Investigación") return Boolean(plantin.isResearch)
    return true
  })

  const filteredPlantines = statusFilteredPlantines.filter((plantin) => {
    if (!normalizedQuery) return true

    const searchableText = normalizeText(
      `${plantin.name} ${plantin.category} ${plantin.description} ${plantin.features.join(" ")}`
    )

    return searchableText.includes(normalizedQuery)
  })

  const sortedPlantines = [...filteredPlantines].sort((a, b) => {
    if (sortOrder === "name") return a.name.localeCompare(b.name, "es")
    if (sortOrder === "category") {
      return a.category.localeCompare(b.category, "es") || a.name.localeCompare(b.name, "es")
    }
    return 0
  })

  const statusOptions = ["Todos", "Disponibles", "En producción", "Investigación"]
  const activeFilterCount =
    Number(selectedCategory !== "Todos") + Number(selectedStatus !== "Todos") + Number(Boolean(searchQuery.trim()))

  const resetFilters = () => {
    setSelectedCategory("Todos")
    setSelectedStatus("Todos")
    setSearchQuery("")
  }

  const handleTechnicalSheet = (plantin: Plantin) => {
    setSelectedTechnicalData(plantin)
    setShowTechnicalSheet(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar overlay />

      {/* Modal de Ficha Técnica */}
      {showTechnicalSheet && selectedTechnicalData && (
        <TechnicalSheetModal 
          plantin={selectedTechnicalData} 
          onClose={() => setShowTechnicalSheet(false)} 
        />
      )}

      {/* Hero Section */}
      <ScrollReveal direction="none" duration={0.7} amount={0.08}>
        <HeroSection />
      </ScrollReveal>

      <div data-navbar-theme="light" className="relative z-20 mx-auto -mt-7 w-[calc(100%-2rem)] max-w-6xl">
        <StaggerGroup className="grid overflow-hidden rounded-2xl border border-white/90 bg-white/95 shadow-[0_20px_60px_-34px_rgba(14,60,38,0.45)] backdrop-blur-md sm:grid-cols-3" staggerDelay={0.08}>
          {[
            { icon: Sprout, title: "Material uniforme", text: "Propagación bajo condiciones controladas" },
            { icon: PackageCheck, title: "Pedido coordinado", text: "Disponibilidad y entrega según cultivo" },
            { icon: Headphones, title: "Soporte técnico", text: "Orientación antes y después de elegir" },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full items-center gap-4 border-b border-[#e4ebe6] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e7f1e8] text-[#2e7048]"><item.icon className="h-5 w-5" /></span>
                <div><h2 className="text-sm font-bold text-[#214332]">{item.title}</h2><p className="mt-1 text-xs leading-5 text-[#6b7d73]">{item.text}</p></div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* Catálogo de Plantines */}
      <section id="catalogo-plantines" data-navbar-theme="light" className="scroll-mt-28 bg-[#f5f8f5] py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" distance={18}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#2e7048]">Catálogo disponible</span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Encuentra el plantín adecuado para tu cultivo</h2>
            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              Compara variedades, tiempos de cosecha y características técnicas. Filtra el catálogo para encontrar rápidamente el material que necesita tu proyecto.
            </p>
          </ScrollReveal>

          {/* Filtros compactos para móvil */}
          <details className="group mb-5 overflow-hidden rounded-2xl border border-[#dce8df] bg-white shadow-sm lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-bold text-[#214332] marker:content-none">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#2e7048]" />
                Filtrar plantines
                {activeFilterCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#2e7048] px-1.5 text-[10px] text-white">{activeFilterCount}</span>
                )}
              </span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-5 border-t border-gray-100 p-4">
              <div>
                <label htmlFor="mobile-plant-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-gray-500">Buscar</label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="mobile-plant-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cultivo o variedad" className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-9 text-sm text-gray-800 outline-none transition focus:border-green-400 focus:bg-white" />
                  {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"><X className="h-4 w-4" /></button>}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-500">Cultivo</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${selectedCategory === category ? "border-[#2e7048] bg-[#2e7048] text-white" : "border-gray-200 bg-white text-gray-600 hover:border-green-300"}`}>{category}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-500">Estado</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <button key={status} type="button" onClick={() => setSelectedStatus(status)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${selectedStatus === status ? "border-[#2e7048] bg-[#e7f1e8] text-[#214332]" : "border-gray-200 bg-white text-gray-600 hover:border-green-300"}`}>{status}</button>
                  ))}
                </div>
              </div>
              {activeFilterCount > 0 && <button type="button" onClick={resetFilters} className="flex items-center gap-2 text-sm font-semibold text-[#2e7048]"><RotateCcw className="h-4 w-4" />Limpiar filtros</button>}
            </div>
          </details>

          <div className="grid items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)] xl:gap-8">
            {/* Panel lateral de filtros */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 overflow-hidden rounded-3xl border border-[#dce8df] bg-white shadow-[0_18px_55px_-42px_rgba(14,60,38,0.6)]">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
                  <h3 className="flex items-center gap-2 text-base font-bold text-[#214332]"><SlidersHorizontal className="h-4 w-4 text-[#2e7048]" />Filtros</h3>
                  {activeFilterCount > 0 && <button type="button" onClick={resetFilters} className="text-xs font-semibold text-[#2e7048] hover:underline">Limpiar</button>}
                </div>

                <div className="space-y-6 p-5">
                  <div>
                    <label htmlFor="desktop-plant-search" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Buscar plantín</label>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input id="desktop-plant-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cultivo o variedad" className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-9 text-sm text-gray-800 outline-none transition focus:border-green-400 focus:bg-white" />
                      {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"><X className="h-4 w-4" /></button>}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Tipo de cultivo</p>
                    <div className="space-y-1">
                      {categories.map((category) => {
                        const categoryCount = category === "Todos" ? plantines.length : plantines.filter((plantin) => plantin.category === category).length
                        return (
                          <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${selectedCategory === category ? "bg-[#e7f1e8] text-[#214332]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                            <span>{category}</span><span className={`rounded-full px-2 py-0.5 text-[10px] ${selectedCategory === category ? "bg-white text-[#2e7048]" : "bg-gray-100 text-gray-500"}`}>{categoryCount}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Disponibilidad</p>
                    <div className="space-y-1">
                      {statusOptions.map((status) => (
                        <label key={status} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                          <input type="radio" name="plant-status" value={status} checked={selectedStatus === status} onChange={() => setSelectedStatus(status)} className="h-4 w-4 accent-[#2e7048]" />
                          {status}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#eef5ef] p-4">
                    <p className="text-sm font-bold text-[#214332]">¿No sabes cuál elegir?</p>
                    <p className="mt-1 text-xs leading-5 text-[#5f7568]">Te ayudamos según tu zona, área y objetivo productivo.</p>
                    <button type="button" onClick={() => handleWhatsAppContact("asesoría para elegir plantines in vitro")} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2e7048] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#245c3b]"><MessageCircle className="h-4 w-4" />Hablar con un asesor</button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Resultados */}
            <div className="min-w-0">
              <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#e1e9e3] bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{sortedPlantines.length} plantín{sortedPlantines.length === 1 ? "" : "es"}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{selectedCategory === "Todos" ? "Todos los cultivos" : selectedCategory}{selectedStatus === "Todos" ? "" : ` · ${selectedStatus}`}</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  Ordenar por
                  <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-green-400" aria-label="Ordenar catálogo">
                    <option value="recommended">Recomendados</option>
                    <option value="name">Nombre A–Z</option>
                    <option value="category">Tipo de cultivo</option>
                  </select>
                </label>
              </div>

              <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2" staggerDelay={0.07} amount={0.06}>
                {sortedPlantines.map((plantin) => (
                  <StaggerItem key={plantin.id} distance={16}>
                    <PlantinCard plantin={plantin} onTechnicalSheet={handleTechnicalSheet} />
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {sortedPlantines.length === 0 && (
                <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
                  <Leaf className="mx-auto mb-4 h-12 w-12 text-[#8eaa98]" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">No encontramos coincidencias</h3>
                  <p className="text-sm text-gray-500">Prueba con otro cultivo, estado o término de búsqueda.</p>
                  <button type="button" onClick={resetFilters} className="mt-5 rounded-xl bg-[#2e7048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245c3b]">Ver todo el catálogo</button>
                </div>
              )}
            </div>
          </div>

          {/* Calculadora de Rentabilidad */}
          <ScrollReveal className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_-42px_rgba(14,60,38,0.45)]" distance={18}>
                <div className="bg-gradient-to-r from-[#276b44] to-[#1d5136] px-5 py-4 text-white">
                  <h3 className="flex items-center gap-2 text-base font-bold">
                    <Calculator className="w-4 h-4" />
                    Estimador comparativo por hectáreas
                  </h3>
                </div>
                <div className="space-y-4 p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-semibold text-gray-700">Selecciona el área:</span>
                    <div className="flex flex-wrap gap-2">
                      {[1, 5, 10, 20, 50].map((value) => (
                        <button
                          key={value}
                          onClick={() => setHectareas(value)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                            hectareas === value
                              ? "bg-green-600 text-white shadow"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {value} ha
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Escenario tradicional</span>
                      <span className="mt-1 block text-xl font-bold text-gray-800">S/. {(hectareas * 14 * 2500).toLocaleString()}</span>
                    </div>
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-green-600">Escenario in vitro</span>
                      <span className="mt-1 block text-xl font-bold text-green-700">S/. {(hectareas * 20 * 2500).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
                    <span className="text-sm font-semibold text-blue-800">Diferencia estimada:</span>
                    <span className="text-base font-bold text-blue-700">+S/. {((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleWhatsAppContact(`Quiero cotizar ${hectareas} hectáreas. Ganancia estimada: S/. ${((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()}`)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Consultar proyecto de {hectareas} hectáreas
                  </button>
                  <p className="text-center text-[11px] leading-5 text-gray-500">Estimación referencial para comparar escenarios. El resultado real depende del cultivo, manejo, densidad y condiciones de campo.</p>
                </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <ScrollReveal distance={20} amount={0.12}>
        <CallToActionSection />
      </ScrollReveal>

      <Footer />
    </div>
  )
}
