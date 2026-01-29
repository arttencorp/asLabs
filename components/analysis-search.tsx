"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"

interface Analysis {
  id: string
  tipo: string
  concepto: string
  alcance: string
  costo: string
}

const allAnalyses: Analysis[] = [
  // Análisis de Suelo
  { id: "1", tipo: "Análisis de Suelo", concepto: "Detección de Patógenos en Muestras Vegetales", alcance: "Identificación de bacterias y hongos", costo: "180" },
  { id: "2", tipo: "Análisis de Suelo", concepto: "Prueba de Susceptibilidad", alcance: "Pruebas de sensibilidad a fungicidas", costo: "150" },
  { id: "3", tipo: "Análisis de Suelo", concepto: "Suspensión de Bacterias y Hongos Fitopatógenos", alcance: "Preparación de suspensiones", costo: "700" },
  { id: "4", tipo: "Análisis de Suelo", concepto: "Análisis de Suelos", alcance: "Análisis agrícola completo", costo: "60" },
  { id: "5", tipo: "Análisis de Suelo", concepto: "Presencia de Bacterias en Suelo", alcance: "Recuento y aislamiento", costo: "250" },
  { id: "6", tipo: "Análisis de Suelo", concepto: "Presencia de Hongos en Suelo", alcance: "Identificación de géneros", costo: "199" },
  // Fitopatología
  { id: "7", tipo: "Fitopatología", concepto: "Aislamiento y purificación de patógenos desde tejido vegetal", alcance: "hasta 2 aislados puros + microfotografías", costo: "250" },
  { id: "8", tipo: "Fitopatología", concepto: "Banco de aislados del predio", alcance: "Conservación de 1 aislado/cepa por 30 días", costo: "60" },
  { id: "9", tipo: "Fitopatología", concepto: "Prueba de antagonismo in vitro (dual culture)", alcance: "1 antagonista vs 1 patógeno, 3 réplicas", costo: "180" },
  { id: "10", tipo: "Fitopatología", concepto: "Sensibilidad comparativa in vitro a fungicidas/bactericidas", alcance: "1 aislado × 1 producto × 3 concentraciones", costo: "220" },
  { id: "11", tipo: "Fitopatología", concepto: "Informe sanitario por lote/zona", alcance: "Consolidación de hasta 5 muestras + comparación", costo: "120" },
  // Medio Ambiente
  { id: "12", tipo: "Medio Ambiente", concepto: "Recuento Aerobios Mesófilos", alcance: "UFC/mL en agua", costo: "40" },
  { id: "13", tipo: "Medio Ambiente", concepto: "Coliformes Totales/Fecales", alcance: "Detección en agua", costo: "45" },
  { id: "14", tipo: "Medio Ambiente", concepto: "Detección de Escherichia coli", alcance: "Confirmación bioquímica", costo: "45" },
  { id: "15", tipo: "Medio Ambiente", concepto: "Recuento de Enterobacterias", alcance: "Conteo y aislamiento", costo: "35" },
  { id: "16", tipo: "Medio Ambiente", concepto: "Medición de pH", alcance: "Análisis de acidez", costo: "15" },
  { id: "17", tipo: "Medio Ambiente", concepto: "Sensibilidad Desinfectante", alcance: "Pruebas de efectividad", costo: "150" },
  { id: "18", tipo: "Medio Ambiente", concepto: "Recuento Cámara Neubauer", alcance: "Conteo de microorganismos", costo: "30" },
  { id: "19", tipo: "Medio Ambiente", concepto: "Control de esterilidad (agua/soluciones del cliente)", alcance: "Presencia/ausencia tras incubación", costo: "40" },
  { id: "20", tipo: "Medio Ambiente", concepto: "Monitoreo ambiental básico por sedimentación", alcance: "hasta 4 puntos (UFC/placa-tiempo)", costo: "120" },
  // Microbiológicos
  { id: "21", tipo: "Microbiológicos", concepto: "Recuento de mohos y levaduras", alcance: "UFC/g en alimentos", costo: "45" },
  { id: "22", tipo: "Microbiológicos", concepto: "Recuento de Enterobacterias", alcance: "UFC/g en alimentos", costo: "35" },
  { id: "23", tipo: "Microbiológicos", concepto: "Detección de Salmonella spp.", alcance: "Presencia/ausencia", costo: "180" },
  { id: "24", tipo: "Microbiológicos", concepto: "Detección de Listeria monocytogenes", alcance: "Presencia/ausencia", costo: "200" },
  { id: "25", tipo: "Microbiológicos", concepto: "Recuento de Staphylococcus aureus", alcance: "UFC/g en alimentos", costo: "70" },
  { id: "26", tipo: "Microbiológicos", concepto: "Análisis microbiológico de agua potable", alcance: "Paquete completo", costo: "150" },
  { id: "27", tipo: "Microbiológicos", concepto: "Control de superficies (hisopado)", alcance: "UFC/punto", costo: "60" },
  { id: "28", tipo: "Microbiológicos", concepto: "Leche y derivados / cárnicos / pesqueros", alcance: "Paquete básico", costo: "180" },
  { id: "29", tipo: "Microbiológicos", concepto: "Recuento heterótrofos en agua de riego", alcance: "UFC/mL + interpretación operativa", costo: "50" },
  { id: "30", tipo: "Microbiológicos", concepto: "Verificación de contaminación en lotes/insumos", alcance: "Presencia/ausencia por cultivo", costo: "45" },
  // Biotecnología Vegetal
  { id: "31", tipo: "Biotecnología Vegetal", concepto: "Micropropagación in vitro", alcance: "por plantín aclimatado", costo: "4.50" },
  { id: "32", tipo: "Biotecnología Vegetal", concepto: "Cultivo de meristemos", alcance: "por explante establecido", costo: "12" },
  { id: "33", tipo: "Biotecnología Vegetal", concepto: "Termoterapia", alcance: "por explante", costo: "18" },
  { id: "34", tipo: "Biotecnología Vegetal", concepto: "Criopreservación", alcance: "por unidad biológica", costo: "35" },
  { id: "35", tipo: "Biotecnología Vegetal", concepto: "Microinjerto in vitro", alcance: "por microinjerto", costo: "25" },
  { id: "36", tipo: "Biotecnología Vegetal", concepto: "Embriogénesis somática", alcance: "por explante (mínimo 30)", costo: "30" },
  { id: "37", tipo: "Biotecnología Vegetal", concepto: "Enraizamiento in vitro", alcance: "por brote entregado", costo: "1.20" },
  { id: "38", tipo: "Biotecnología Vegetal", concepto: "Aclimatación de plántulas", alcance: "por plantín in vitro", costo: "1.50" },
  { id: "39", tipo: "Biotecnología Vegetal", concepto: "Control de contaminación por etapa (KPI por lote)", alcance: "% contaminación por etapa + acciones correctivas", costo: "250" },
  { id: "40", tipo: "Biotecnología Vegetal", concepto: "Certificado de calidad de plantín por lote", alcance: "hasta 200 plantines evaluados", costo: "150" },
  { id: "41", tipo: "Biotecnología Vegetal", concepto: "Optimización de protocolo MS por variedad", alcance: "1 variedad → hasta 3 tratamientos × 3 réplicas", costo: "800" },
  // Bacteriología
  { id: "42", tipo: "Bacteriología", concepto: "Suspensión bacteriana McFarland", alcance: "500 mL; estándar por OD/McFarland", costo: "700" },
  { id: "43", tipo: "Bacteriología", concepto: "Fermentación bacteriana (shake-flask)", alcance: "por lote 1–2 L", costo: "900" },
  { id: "44", tipo: "Bacteriología", concepto: "Curva de crecimiento bacteriano", alcance: "por cepa; 1 condición", costo: "350" },
  { id: "45", tipo: "Bacteriología", concepto: "Producción de biofertilizantes (piloto)", alcance: "por lote piloto", costo: "1200" },
  { id: "46", tipo: "Bacteriología", concepto: "Producción de bioestimulantes (piloto)", alcance: "por lote piloto", costo: "1200" },
  { id: "47", tipo: "Bacteriología", concepto: "Aislamiento de cepas", alcance: "por muestra", costo: "150" },
  { id: "48", tipo: "Bacteriología", concepto: "Conservación de cepas", alcance: "por cepa/mes", costo: "60" },
  { id: "49", tipo: "Bacteriología", concepto: "Identificación bacteriana (fenotípica)", alcance: "por aislado", costo: "200" },
  { id: "50", tipo: "Bacteriología", concepto: "Estandarización OD–UFC por cepa", alcance: "curva OD–UFC (≥5 puntos) + ecuación", costo: "500" },
  { id: "51", tipo: "Bacteriología", concepto: "Ensayo de estabilidad de suspensión", alcance: "recuento UFC/mL a día 0, 7, 14 y 30", costo: "450" },
  { id: "52", tipo: "Bacteriología", concepto: "Preparación de consorcios bacterianos bajo especificación", alcance: "mezcla de hasta 3 cepas + control de pureza", costo: "900" },
  { id: "53", tipo: "Bacteriología", concepto: "Control de calidad de lote", alcance: "pureza + UFC + trazabilidad", costo: "250" },
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
    <section className="py-12 md:py-16 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="bg-white rounded-3xl border border-border shadow-xl p-6 md:p-8 mb-8">
            <div className="space-y-4 md:space-y-5">
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">Buscador de Análisis</h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Encuentra rápidamente el análisis que necesitas
                </p>
              </div>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Busca por nombre de análisis, alcance o costo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 text-base md:text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/60"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    !selectedType
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Todos ({allAnalyses.length})
                </button>
                {uniqueTypes.map((type) => {
                  const count = allAnalyses.filter((a) => a.tipo === type).length
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                        selectedType === type
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {type} ({count})
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3 text-sm">
                <div className="text-muted-foreground">
                  Mostrando <span className="font-semibold text-foreground">{filteredAnalyses.length}</span> de{" "}
                  <span className="font-semibold text-foreground">{allAnalyses.length}</span> análisis
                </div>
                {(searchQuery || selectedType) && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-lg">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tipo</th>
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
                      <td className="px-6 py-4 text-sm font-semibold text-primary">S/. {analysis.costo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-3">
              {filteredAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="p-4 border border-border rounded-lg space-y-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      {analysis.tipo}
                    </span>
                    <span className="text-sm font-bold text-primary">S/. {analysis.costo}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{analysis.concepto}</p>
                  <p className="text-xs text-muted-foreground">{analysis.alcance}</p>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredAnalyses.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No se encontraron análisis que coincidan con tu búsqueda</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
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
