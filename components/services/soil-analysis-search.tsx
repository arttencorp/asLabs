"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"

interface Analysis {
  id: string
  tipo: string
  concepto: string
  alcance: string
  costo: string
}

// Todos los análisis combinados de todas las categorías
const allAnalyses: Analysis[] = [
  // Análisis de Suelo
  {
    id: "1",
    tipo: "Análisis de Suelo",
    concepto: "Recepción y preparación de muestra",
    alcance: "Registro + homogenización + submuestreo",
    costo: "15",
  },
  { id: "2", tipo: "Análisis de Suelo", concepto: "pH de suelo (lab)", alcance: "Medición en suspensión", costo: "20" },
  {
    id: "3",
    tipo: "Análisis de Suelo",
    concepto: "Conductividad eléctrica CE (lab)",
    alcance: "CE en extracto",
    costo: "20",
  },
  {
    id: "4",
    tipo: "Análisis de Suelo",
    concepto: "Humedad (%) – indicador",
    alcance: "Lectura con sensor",
    costo: "15",
  },
  {
    id: "5",
    tipo: "Análisis de Suelo",
    concepto: "Índice de sales/nutrientes solubles",
    alcance: "Lectura 0–3000 µS/cm",
    costo: "15",
  },
  {
    id: "6",
    tipo: "Análisis de Suelo",
    concepto: "Carbonatos / alcalinidad (titulación)",
    alcance: "Ensayo ácido–base con indicador",
    costo: "40",
  },
  {
    id: "7",
    tipo: "Análisis de Suelo",
    concepto: "Recuento de hongos (UFC/g)",
    alcance: "Diluciones + siembra en PDA + conteo",
    costo: "80",
  },
  {
    id: "8",
    tipo: "Análisis de Suelo",
    concepto: "Aislamiento presuntivo de hongos fitopatógenos",
    alcance: "Aislamiento + tinción + microfotografías",
    costo: "160",
  },
  {
    id: "9",
    tipo: "Análisis de Suelo",
    concepto: "Paquete Diagnóstico Rápido",
    alcance: "pH + CE + humedad + sales + interpretación",
    costo: "60",
  },
  {
    id: "10",
    tipo: "Análisis de Suelo",
    concepto: "Paquete Sanidad Fúngica",
    alcance: "Recuento + aislamiento + microscopía + conclusión",
    costo: "200",
  },
  // Fitopatología
  {
    id: "11",
    tipo: "Fitopatología",
    concepto: "Detección de Patógenos en Muestras Vegetales",
    alcance: "Identificación de bacterias y hongos",
    costo: "Cotizar",
  },
  {
    id: "12",
    tipo: "Fitopatología",
    concepto: "Prueba de Susceptibilidad",
    alcance: "Pruebas de sensibilidad a fungicidas",
    costo: "70",
  },
  {
    id: "13",
    tipo: "Fitopatología",
    concepto: "Suspensión de Bacterias y Hongos Fitopatógenos",
    alcance: "Preparación de suspensiones",
    costo: "120",
  },
  {
    id: "14",
    tipo: "Fitopatología",
    concepto: "Análisis de Suelos",
    alcance: "Análisis agrícola completo",
    costo: "Cotizar",
  },
  {
    id: "15",
    tipo: "Fitopatología",
    concepto: "Presencia de Bacterias en Suelo",
    alcance: "Recuento y aislamiento",
    costo: "180",
  },
  {
    id: "16",
    tipo: "Fitopatología",
    concepto: "Presencia de Hongos en Suelo",
    alcance: "Identificación de géneros",
    costo: "180",
  },
  // Medio Ambiente
  {
    id: "17",
    tipo: "Medio Ambiente",
    concepto: "Recuento Aerobios Mesófilos",
    alcance: "UFC/mL en agua",
    costo: "Cotizar",
  },
  {
    id: "18",
    tipo: "Medio Ambiente",
    concepto: "Coliformes Totales/Fecales",
    alcance: "Detección en agua",
    costo: "Cotizar",
  },
  {
    id: "19",
    tipo: "Medio Ambiente",
    concepto: "Detección de Escherichia coli",
    alcance: "Confirmación bioquímica",
    costo: "Cotizar",
  },
  {
    id: "20",
    tipo: "Medio Ambiente",
    concepto: "Recuento de Enterobacterias",
    alcance: "Conteo y aislamiento",
    costo: "Cotizar",
  },
  { id: "21", tipo: "Medio Ambiente", concepto: "Medición de pH", alcance: "Análisis de acidez", costo: "20" },
  {
    id: "22",
    tipo: "Medio Ambiente",
    concepto: "Sensibilidad Desinfectante",
    alcance: "Pruebas de efectividad",
    costo: "Cotizar",
  },
  {
    id: "23",
    tipo: "Medio Ambiente",
    concepto: "Recuento Cámara Neubauer",
    alcance: "Conteo de microorganismos",
    costo: "60",
  },
]

export function AnalysisSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const uniqueTypes = Array.from(new Set(allAnalyses.map((a) => a.tipo)))

  const filteredAnalyses = useMemo(() => {
    return allAnalyses.filter((analysis) => {
      const matchesSearch =
        analysis.concepto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        analysis.alcance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        analysis.costo.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = !selectedType || analysis.tipo === selectedType

      return matchesSearch && matchesType
    })
  }, [searchQuery, selectedType])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedType(null)
  }

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar - Main Focus */}
          <div className="bg-white rounded-2xl border border-border shadow-lg p-6 mb-8">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Busca análisis por nombre, alcance o costo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Type Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    !selectedType
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Todos
                </button>
                {uniqueTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Active Filters and Results Count */}
              <div className="flex items-center justify-between flex-wrap gap-3 text-sm">
                <div className="text-muted-foreground">
                  Mostrando <span className="font-semibold text-foreground">{filteredAnalyses.length}</span> de{" "}
                  <span className="font-semibold text-foreground">{allAnalyses.length}</span> análisis
                </div>
                {(searchQuery || selectedType) && (
                  <button onClick={clearFilters} className="text-primary hover:underline font-medium transition-colors">
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tipo de Análisis</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Concepto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Alcance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Costo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAnalyses.map((analysis) => (
                    <tr key={analysis.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-primary font-semibold">{analysis.tipo}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{analysis.concepto}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{analysis.alcance}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">
                        {analysis.costo === "Cotizar" ? "Cotizar" : `S/. ${analysis.costo}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredAnalyses.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No se encontraron análisis que coincidan con tu búsqueda</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline text-sm font-medium transition-colors"
                >
                  Limpiar filtros e intentar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
