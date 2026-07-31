"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Search, X, SearchX } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

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
  // Apoyo a la Investigación
  { id: "54", tipo: "Apoyo a la Investigación", concepto: "Suspensiones Bacterianas", alcance: "estándares de pureza y viabilidad", costo: "700" },
  { id: "55", tipo: "Apoyo a la Investigación", concepto: "Producción de Bacterias para Investigación", alcance: "biomasa para proyectos con control de calidad", costo: "900" },
  { id: "56", tipo: "Apoyo a la Investigación", concepto: "Suspensiones de Bacterias para Biorremediación de Concreto", alcance: "cepas con capacidad de mineralización", costo: "1200" },
  { id: "57", tipo: "Apoyo a la Investigación", concepto: "Cepas Bacterianas para Investigación", alcance: "cepas caracterizadas y documentadas", costo: "80" },
  { id: "58", tipo: "Apoyo a la Investigación", concepto: "Identificación Molecular de Bacterias en Cultivo Puro", alcance: "MALDI-TOF, PCR y secuenciación", costo: "220" },
  { id: "59", tipo: "Apoyo a la Investigación", concepto: "Identificación por 16S RNA de Microorganismos", alcance: "secuenciación y análisis filogenético", costo: "850" },
  { id: "60", tipo: "Apoyo a la Investigación", concepto: "Formulación de Protocolos y Estandarización", alcance: "protocolos optimizados y documentados", costo: "600" },
  { id: "61", tipo: "Apoyo a la Investigación", concepto: "Aislamiento de Bacterias", alcance: "aislamiento selectivo y purificación", costo: "180" },
  { id: "62", tipo: "Apoyo a la Investigación", concepto: "Servicio Análisis e Informes Bioinformática", alcance: "procesamiento y visualización de datos moleculares", costo: "350" },
]

export function AnalysisSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(10)

  const uniqueTypes = Array.from(new Set(allAnalyses.map((a) => a.tipo)))

  const filteredAnalyses = useMemo(() => {
    return allAnalyses.filter((analysis) => {
      const matchesSearch =
        analysis.concepto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        analysis.alcance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        analysis.tipo.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = !selectedType || analysis.tipo === selectedType

      return matchesSearch && matchesType
    })
  }, [searchQuery, selectedType])

  useEffect(() => {
    setVisibleCount(10)
  }, [searchQuery, selectedType])

  const displayedAnalyses = filteredAnalyses.slice(0, visibleCount)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedType(null)
  }

  const getWhatsAppLink = (analysisName: string) =>
    `https://wa.me/51961996645?text=${encodeURIComponent(`Hola, deseo consultar por el análisis: ${analysisName}`)}`

  return (
    <section id="buscador" className="scroll-mt-24 bg-[#eef3ef] py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <ScrollReveal className="mb-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2e7048]">Catálogo de análisis</span>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-[#173a2c] sm:text-4xl">Busca dentro de nuestros servicios</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#64766d] md:justify-self-end sm:text-base">
            Escribe el nombre de una muestra, microorganismo o prueba. También puedes filtrar el catálogo por área técnica.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-[26px] border border-[#d8e2da] bg-white p-4 shadow-[0_22px_55px_-35px_rgba(21,65,45,0.45)] sm:p-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6c7d74] transition-colors group-focus-within:text-[#2e7048]" />
              <input
                type="search"
                aria-label="Buscar análisis"
                placeholder="Ejemplo: Salmonella, agua, suelo, 16S..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-14 w-full rounded-2xl border border-[#d4dfd6] bg-[#f9fbf9] pl-12 pr-12 text-sm text-[#203e31] outline-none transition placeholder:text-[#8a9991] focus:border-[#75a181] focus:bg-white focus:ring-4 focus:ring-[#dceade] sm:text-base"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[#6c7d74] transition hover:bg-[#e9f0ea] hover:text-[#244f38]"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              <button
                type="button"
                aria-pressed={!selectedType}
                onClick={() => setSelectedType(null)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                  !selectedType ? "bg-[#173f2e] text-white shadow-md" : "bg-[#edf2ee] text-[#5e7167] hover:bg-[#e2ece4]"
                }`}
              >
                Todos · {allAnalyses.length}
              </button>
              {uniqueTypes.map((type) => {
                const count = allAnalyses.filter((analysis) => analysis.tipo === type).length
                return (
                  <button
                    type="button"
                    key={type}
                    aria-pressed={selectedType === type}
                    onClick={() => setSelectedType(type)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                      selectedType === type ? "bg-[#173f2e] text-white shadow-md" : "bg-[#edf2ee] text-[#5e7167] hover:bg-[#e2ece4]"
                    }`}
                  >
                    {type} · {count}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3eae5] pt-4 text-xs text-[#697b72]">
              <p>
                <span className="font-bold text-[#254b39]">{filteredAnalyses.length}</span> resultados en el catálogo
              </p>
              {(searchQuery || selectedType) && (
                <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 font-bold text-[#2b6844] transition hover:text-[#173f2e]">
                  <X className="h-3.5 w-3.5" />
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mt-5 overflow-hidden rounded-[26px] border border-[#d8e2da] bg-white shadow-[0_22px_55px_-38px_rgba(21,65,45,0.45)]">
            {filteredAnalyses.length > 0 ? (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead className="border-b border-[#e1e8e3] bg-[#f7f9f7]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.1em] text-[#677970]">Área</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.1em] text-[#677970]">Análisis</th>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.1em] text-[#677970]">Alcance</th>
                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-[0.1em] text-[#677970]">Consulta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5ebe6]">
                      {displayedAnalyses.map((analysis) => (
                        <tr key={analysis.id} className="transition-colors hover:bg-[#f5f8f5]">
                          <td className="px-6 py-4 align-top">
                            <span className="inline-flex rounded-full bg-[#e6f0e8] px-2.5 py-1 text-[11px] font-bold text-[#2c6845]">{analysis.tipo}</span>
                          </td>
                          <td className="max-w-[320px] px-6 py-4 align-top text-sm font-semibold leading-5 text-[#203e31]">{analysis.concepto}</td>
                          <td className="max-w-[340px] px-6 py-4 align-top text-sm leading-5 text-[#6a7b72]">{analysis.alcance}</td>
                          <td className="px-6 py-4 text-right align-top">
                            <a
                              href={getWhatsAppLink(analysis.concepto)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#2d6d47] transition hover:text-[#173f2e]"
                            >
                              Consultar
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 p-3 md:hidden">
                  {displayedAnalyses.map((analysis) => (
                    <article key={analysis.id} className="rounded-2xl border border-[#e0e8e2] bg-[#fafbfa] p-4">
                      <span className="inline-flex rounded-full bg-[#e6f0e8] px-2.5 py-1 text-[10px] font-bold text-[#2c6845]">{analysis.tipo}</span>
                      <h3 className="mt-3 text-sm font-bold leading-5 text-[#203e31]">{analysis.concepto}</h3>
                      <p className="mt-2 text-xs leading-5 text-[#6a7b72]">{analysis.alcance}</p>
                      <a
                        href={getWhatsAppLink(analysis.concepto)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2d6d47]"
                      >
                        Consultar este análisis
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </article>
                  ))}
                </div>

                {visibleCount < filteredAnalyses.length && (
                  <div className="border-t border-[#e1e8e3] bg-[#fafbfa] p-4 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((count) => count + 10)}
                      className="rounded-full border border-[#b9ccbd] bg-white px-5 py-2.5 text-xs font-bold text-[#285f40] transition hover:border-[#7fa489] hover:bg-[#f1f6f2]"
                    >
                      Mostrar 10 resultados más
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="px-6 py-14 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e6f0e8] text-[#2e7048]">
                  <SearchX className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#244534]">No encontramos una coincidencia exacta</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6b7b73]">Prueba con otra palabra o escríbenos para confirmar si podemos desarrollar el análisis que necesitas.</p>
                <button type="button" onClick={clearFilters} className="mt-4 text-sm font-bold text-[#2d6d47] hover:text-[#173f2e]">Ver todo el catálogo</button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
