"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"

interface SoilAnalysis {
  id: string
  tipo: string
  concepto: string
  alcance: string
  costo: string
  descripcion?: string
}

const soilAnalyses: SoilAnalysis[] = [
  {
    id: "1",
    tipo: "Análisis de Suelo",
    concepto: "Recepción y preparación de muestra",
    alcance: "Registro + homogenización + submuestreo (muestra compuesta)",
    costo: "15",
    descripcion: "Preparación estándar de muestras de suelo",
  },
  {
    id: "2",
    tipo: "Análisis de Suelo",
    concepto: "pH de suelo (lab)",
    alcance: "Medición en suspensión (método declarado) + registro",
    costo: "20",
    descripcion: "Determinación de acidez/alcalinidad del suelo",
  },
  {
    id: "3",
    tipo: "Análisis de Suelo",
    concepto: "Conductividad eléctrica CE (lab)",
    alcance: "CE en extracto (método declarado) + registro",
    costo: "20",
    descripcion: "Medición de salinidad del suelo",
  },
  {
    id: "4",
    tipo: "Análisis de Suelo",
    concepto: "Humedad (%) – indicador",
    alcance: "Lectura con sensor (indicador rápido)",
    costo: "15",
    descripcion: "Determinación rápida de contenido de humedad",
  },
  {
    id: "5",
    tipo: "Análisis de Suelo",
    concepto: "Índice de sales/nutrientes solubles (µS/cm)",
    alcance: "Lectura 0–3000 µS/cm (indicador, no NPK)",
    costo: "15",
    descripcion: "Medición de conductividad de sales solubles",
  },
  {
    id: "6",
    tipo: "Análisis de Suelo",
    concepto: "Carbonatos / alcalinidad (titulación)",
    alcance: "Ensayo ácido–base con indicador + interpretación",
    costo: "40",
    descripcion: "Determinación de carbonatos mediante titulación",
  },
  {
    id: "7",
    tipo: "Análisis de Suelo",
    concepto: "Recuento de hongos (UFC/g)",
    alcance: "Diluciones + siembra en PDA + conteo + reporte",
    costo: "80",
    descripcion: "Recuento de hongos en unidades formadoras de colonias",
  },
  {
    id: "8",
    tipo: "Análisis de Suelo",
    concepto: "Aislamiento presuntivo de hongos fitopatógenos + microscopía",
    alcance: "Aislamiento en PDA (acidificado) + tinción + microfotografías + reporte",
    costo: "160",
    descripcion: "Identificación de hongos patógenos mediante microscopía",
  },
  {
    id: "9",
    tipo: "Análisis de Suelo",
    concepto: "Paquete Diagnóstico Rápido (lab)",
    alcance: "pH + CE + humedad (indicador) + sales solubles + interpretación",
    costo: "60",
    descripcion: "Paquete completo de parámetros rápidos",
  },
  {
    id: "10",
    tipo: "Análisis de Suelo",
    concepto: "Paquete Sanidad Fúngica (lab)",
    alcance: "Recuento hongos + aislamiento presuntivo + microscopía + conclusión",
    costo: "200",
    descripcion: "Paquete completo para sanidad fúngica del suelo",
  },
]

export function SoilAnalysisSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredAnalyses = useMemo(() => {
    return soilAnalyses.filter((analysis) => {
      const matchesSearch =
        analysis.concepto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        analysis.alcance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        analysis.costo.includes(searchQuery)

      const matchesType = !selectedType || analysis.tipo === selectedType

      return matchesSearch && matchesType
    })
  }, [searchQuery, selectedType])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedType(null)
  }

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Análisis de Suelo</h2>
            <p className="text-muted-foreground text-lg">Encuentra el análisis que necesitas para tu suelo agrícola</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por concepto, alcance o costo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Active Filters Display */}
              {(searchQuery || selectedType) && (
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        Búsqueda: {searchQuery}
                        <button onClick={() => setSearchQuery("")} className="hover:text-primary/70">
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                  </div>
                  {(searchQuery || selectedType) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              )}

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredAnalyses.length} de {soilAnalyses.length} análisis
              </div>
            </div>
          </div>

          {/* Table View for Desktop */}
          <div className="hidden md:block bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Concepto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Alcance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Costo (S/.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAnalyses.map((analysis) => (
                    <tr key={analysis.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{analysis.concepto}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{analysis.alcance}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">S/. {analysis.costo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card View for Mobile */}
          <div className="md:hidden space-y-4">
            {filteredAnalyses.map((analysis) => (
              <div key={analysis.id} className="bg-white rounded-xl border border-border p-4 space-y-3">
                <h3 className="font-semibold text-foreground text-sm">{analysis.concepto}</h3>
                <p className="text-xs text-muted-foreground">{analysis.alcance}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">Costo</span>
                  <span className="text-sm font-semibold text-primary">S/. {analysis.costo}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAnalyses.length === 0 && (
            <div className="bg-white rounded-2xl border border-border p-12 text-center">
              <p className="text-muted-foreground mb-4">No se encontraron análisis que coincidan con tu búsqueda</p>
              <button onClick={clearFilters} className="text-primary hover:underline text-sm font-medium">
                Limpiar filtros e intentar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
