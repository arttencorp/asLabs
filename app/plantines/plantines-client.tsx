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
  MessageCircle,
  Search,
  X,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  CheckCircle2,
} from "lucide-react"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

export default function PlantinesClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("recommended")
  const [showTechnicalSheet, setShowTechnicalSheet] = useState(false)
  const [selectedTechnicalData, setSelectedTechnicalData] = useState<Plantin | null>(null)

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

      {/* Catálogo de Plantines */}
      <section id="catalogo-plantines" data-navbar-theme="light" className="scroll-mt-24 bg-[#f5f7f4] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <ScrollReveal className="mb-9 grid gap-5 border-b border-[#cfd8d2] pb-8 lg:grid-cols-[1fr_.78fr] lg:items-end" distance={18}>
            <div><p className="text-[11px] font-semibold text-[#0b7a55]">Catálogo de material vegetal</p><h2 className="mt-3 text-[clamp(2rem,4vw,3.8rem)] font-medium leading-[1.03] tracking-[-.045em] text-[#17211d]">Selecciona por cultivo, etapa y disponibilidad.</h2></div>
            <p className="max-w-[520px] text-sm leading-7 text-[#5d6c64] lg:justify-self-end">
              Compara variedades, tiempos de cosecha y características técnicas. Filtra el catálogo para encontrar rápidamente el material que necesita tu proyecto.
            </p>
          </ScrollReveal>

          {/* Filtros compactos para móvil */}
          <details className="group mb-5 overflow-hidden border border-[#d5ddd7] bg-white lg:hidden">
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
              <div className="sticky top-24 overflow-hidden border border-[#d5ddd7] bg-white">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-[#214332]"><SlidersHorizontal className="h-4 w-4 text-[#2e7048]" />Filtrar catálogo</h3>
                  {activeFilterCount > 0 && <button type="button" onClick={resetFilters} className="text-xs font-semibold text-[#2e7048] hover:underline">Limpiar</button>}
                </div>

                <div className="space-y-6 p-5">
                  <div>
                    <label htmlFor="desktop-plant-search" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Buscar plantín</label>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input id="desktop-plant-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cultivo o variedad" className="w-full border border-gray-200 bg-gray-50 py-3 pl-10 pr-9 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white" />
                      {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"><X className="h-4 w-4" /></button>}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Tipo de cultivo</p>
                    <div className="space-y-1">
                      {categories.map((category) => {
                        const categoryCount = category === "Todos" ? plantines.length : plantines.filter((plantin) => plantin.category === category).length
                        return (
                          <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-semibold transition ${selectedCategory === category ? "bg-[#e7f1e8] text-[#214332]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
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

                  <div className="border-t border-[#d9e2db] bg-[#eef5ef] p-4">
                    <p className="text-sm font-bold text-[#214332]">¿No sabes cuál elegir?</p>
                    <p className="mt-1 text-xs leading-5 text-[#5f7568]">Te ayudamos según tu zona, área y objetivo productivo.</p>
                    <WhatsAppContact message="Hola, quisiera asesoría para elegir plantines in vitro" className="mt-3 flex w-full items-center justify-center gap-2 bg-[#062b22] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0b4a39]"><MessageCircle className="h-4 w-4" />Hablar con un asesor</WhatsAppContact>
                  </div>
                </div>
              </div>
            </aside>

            {/* Resultados */}
            <div className="min-w-0">
              <div className="mb-5 flex flex-col gap-3 border-y border-[#d5ddd7] bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{sortedPlantines.length} plantín{sortedPlantines.length === 1 ? "" : "es"}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{selectedCategory === "Todos" ? "Todos los cultivos" : selectedCategory}{selectedStatus === "Todos" ? "" : ` · ${selectedStatus}`}</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  Ordenar por
                  <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-green-500" aria-label="Ordenar catálogo">
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

          <ScrollReveal className="mt-14 border-t border-[#cfd8d2] pt-9" distance={18}>
            <div className="grid gap-8 lg:grid-cols-[.66fr_1.34fr]">
              <div><p className="text-[11px] font-semibold text-[#0b7a55]">Cómo coordinamos</p><h3 className="mt-3 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.05] tracking-[-.04em] text-[#17211d]">Un pedido técnico, explicado paso a paso.</h3><p className="mt-4 text-sm leading-7 text-[#5d6c64]">La disponibilidad, presentación y fecha se confirman según cultivo y etapa productiva.</p></div>
              <div className="grid border-l border-t border-[#cfd8d2] sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Seleccionar", text: "Definimos cultivo y variedad." },
                  { title: "Dimensionar", text: "Revisamos cantidad y cronograma." },
                  { title: "Preparar", text: "Coordinamos etapa y aclimatación." },
                  { title: "Entregar", text: "Organizamos recojo o despacho." },
                ].map((step, index) => <div key={step.title} className="border-b border-r border-[#cfd8d2] p-5 sm:min-h-[190px]"><span className="text-[10px] text-[#b16f2d]">0{index + 1}</span><CheckCircle2 className="mt-8 h-5 w-5 text-[#0b7a55]" /><h4 className="mt-4 text-base font-medium text-[#17211d]">{step.title}</h4><p className="mt-2 text-[11px] leading-5 text-[#627168]">{step.text}</p></div>)}
              </div>
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
