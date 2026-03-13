"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Search,
  FlaskConical,
  ChevronRight,
  FileText,
  Users,
  Package,
  Plus,
  Loader2,
  RefreshCw,
  ClipboardList,
  FileInput,
} from "lucide-react"
import { formatDate } from "@/utils"
import {
  obtenerCotizacionesConOrdenes,
  obtenerCotizacionesSinOrdenes,
  crearOrdenServicioParaCotizacion,
  obtenerNombrePersona,
} from "@/lib/supabase/recepcion"
import type { CotizacionRecepcion } from "@/lib/supabase/recepcion"

// Lazy import del contenido de documentoLab para no romper el bundle
import {
  useDocumentoLab,
  InformacionDocumento,
  MuestrasSection,
  ResultadosSection,
  NotasResultadoSection,
  AgentesSection,
  AnexosSection,
  FirmasSection,
  DocumentoLabList,
  DocumentoLabStats,
  GuiaUso,
} from "@/components/admin/documentoLab"
import type { TabDocumentoLab } from "@/components/admin/documentoLab"
import { generarPdfDocumentoLab } from "@/utils/generarPdfDocumentoLab"
import Link from "next/link"
import { ArrowLeft, Save, Download, Settings } from "lucide-react"

function obtenerColorEstado(tipo: number | null | undefined): string {
  switch (tipo) {
    case 1: return "bg-yellow-100 text-yellow-700 border-yellow-300"
    case 2: return "bg-green-100 text-green-700 border-green-300"
    case 3: return "bg-red-100 text-red-700 border-red-300"
    case 4: return "bg-blue-100 text-blue-700 border-blue-300"
    default: return "bg-gray-100 text-gray-600 border-gray-300"
  }
}

// ─── Sección Órdenes ────────────────────────────────────────────────────────

function OrdenesSection() {
  const router = useRouter()
  const [cotizaciones, setCotizaciones] = useState<CotizacionRecepcion[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState("")

  const [showSeleccionDialog, setShowSeleccionDialog] = useState(false)
  const [cotizacionesDisponibles, setCotizacionesDisponibles] = useState<CotizacionRecepcion[]>([])
  const [loadingDisponibles, setLoadingDisponibles] = useState(false)
  const [busquedaDisponible, setBusquedaDisponible] = useState("")
  const [creandoOrden, setCreandoOrden] = useState<string | null>(null)

  const cargarCotizaciones = useCallback(async () => {
    try {
      setLoading(true)
      const data = await obtenerCotizacionesConOrdenes()
      setCotizaciones(data)
    } catch (error) {
      console.error("Error cargando cotizaciones:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarCotizaciones()
  }, [cargarCotizaciones])

  async function cargarCotizacionesDisponibles() {
    try {
      setLoadingDisponibles(true)
      const data = await obtenerCotizacionesSinOrdenes()
      setCotizacionesDisponibles(data)
    } catch (error) {
      console.error("Error cargando cotizaciones disponibles:", error)
    } finally {
      setLoadingDisponibles(false)
    }
  }

  function handleAbrirDialog() {
    setBusquedaDisponible("")
    setShowSeleccionDialog(true)
    cargarCotizacionesDisponibles()
  }

  async function handleSeleccionarCotizacion(cot: CotizacionRecepcion) {
    try {
      setCreandoOrden(cot.cot_id_int)
      await crearOrdenServicioParaCotizacion(cot.cot_id_int, cot.per_id_int)
      setShowSeleccionDialog(false)
      router.push(`/admin/recepcion/${cot.cot_id_int}`)
    } catch (error) {
      console.error("Error creando orden de servicio:", error)
    } finally {
      setCreandoOrden(null)
    }
  }

  const cotizacionesFiltradas = useMemo(() => {
    if (!busqueda) return cotizaciones
    const term = busqueda.toLowerCase()
    return cotizaciones.filter(cot => {
      const nombre = obtenerNombrePersona(cot.persona).toLowerCase()
      const num = (cot.cot_num_vac || "").toLowerCase()
      return nombre.includes(term) || num.includes(term)
    })
  }, [cotizaciones, busqueda])

  const disponiblesFiltradas = useMemo(() => {
    if (!busquedaDisponible) return cotizacionesDisponibles
    const term = busquedaDisponible.toLowerCase()
    return cotizacionesDisponibles.filter(cot => {
      const nombre = obtenerNombrePersona(cot.persona).toLowerCase()
      const num = (cot.cot_num_vac || "").toLowerCase()
      return nombre.includes(term) || num.includes(term)
    })
  }, [cotizacionesDisponibles, busquedaDisponible])

  function calcularTotal(cot: CotizacionRecepcion): string {
    if (!cot.detalle_cotizacion?.length) return "0.00"
    const subtotal = cot.detalle_cotizacion.reduce((sum, d) => {
      return sum + (d.det_cot_cant_int || 0) * (d.det_cot_prec_hist_int || 0)
    }, 0)
    const total = cot.cot_igv_bol ? subtotal * 1.18 : subtotal
    return total.toFixed(2)
  }

  return (
    <div className="space-y-4">
      {/* Acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          Cotizaciones con órdenes de servicio activas. Seleccione una para gestionar sus ingresos.
        </p>
        <div className="flex gap-2 shrink-0">
          <GuiaUso />
          <Button variant="outline" size="sm" onClick={cargarCotizaciones} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleAbrirDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Ingreso
          </Button>
        </div>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente o N° cotización..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-emerald-600" />
            Cotizaciones con Órdenes de Servicio
          </CardTitle>
          <CardDescription>
            {loading
              ? "Cargando..."
              : `${cotizacionesFiltradas.length} cotización(es) con ingresos registrados`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : cotizacionesFiltradas.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FlaskConical className="h-12 w-12 mx-auto mb-3 opacity-30" />
              {cotizaciones.length === 0 ? (
                <>
                  <p>No hay cotizaciones con órdenes de servicio aún</p>
                  <p className="text-sm mt-1">
                    Haga clic en &quot;Nuevo Ingreso&quot; para seleccionar una cotización y crear su primera orden.
                  </p>
                </>
              ) : (
                <>
                  <p>No se encontraron cotizaciones</p>
                  <p className="text-sm mt-1">Intente con otro término de búsqueda</p>
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>N° Cotización</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead className="text-center">Productos</TableHead>
                    <TableHead className="text-right">Total (S/)</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cotizacionesFiltradas.map((cot) => (
                    <TableRow
                      key={cot.cot_id_int}
                      className="cursor-pointer"
                      onClick={() => router.push(`/admin/recepcion/${cot.cot_id_int}`)}
                    >
                      <TableCell className="font-medium">
                        {cot.cot_num_vac || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-muted-foreground truncate max-w-[200px]">
                            {obtenerNombrePersona(cot.persona)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(cot.cot_fec_emis_dt, { short: true })}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Package className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {cot.detalle_cotizacion?.length || 0}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground font-mono">
                        {calcularTotal(cot)}
                      </TableCell>
                      <TableCell>
                        {cot.estado_cotizacion ? (
                          <Badge
                            variant="outline"
                            className={obtenerColorEstado(cot.estado_cotizacion.est_cot_tipo_int)}
                          >
                            {cot.estado_cotizacion.est_cot_desc_vac}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600">
                            Sin estado
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          Ver <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog seleccion */}
      <Dialog open={showSeleccionDialog} onOpenChange={setShowSeleccionDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              Seleccionar Cotización
            </DialogTitle>
            <DialogDescription>
              Cotizaciones sin órdenes de servicio. Seleccione una para crear el primer ingreso.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente o N° cotización..."
              value={busquedaDisponible}
              onChange={(e) => setBusquedaDisponible(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 -mx-6 px-6">
            {loadingDisponibles ? (
              <div className="space-y-3 py-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : disponiblesFiltradas.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-2 opacity-30" />
                {cotizacionesDisponibles.length === 0 ? (
                  <p className="text-sm">Todas las cotizaciones ya tienen órdenes de servicio.</p>
                ) : (
                  <p className="text-sm">No se encontraron cotizaciones con ese criterio.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2 py-2">
                {disponiblesFiltradas.map((cot) => (
                  <div
                    key={cot.cot_id_int}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted hover:border-emerald-300 transition-colors cursor-pointer group"
                    onClick={() => {
                      if (!creandoOrden) handleSeleccionarCotizacion(cot)
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {cot.cot_num_vac || "Sin número"}
                        </span>
                        {cot.estado_cotizacion && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${obtenerColorEstado(cot.estado_cotizacion.est_cot_tipo_int)}`}
                          >
                            {cot.estado_cotizacion.est_cot_desc_vac}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {obtenerNombrePersona(cot.persona)}
                        </span>
                        <span>{formatDate(cot.cot_fec_emis_dt, { short: true })}</span>
                        <span>{cot.detalle_cotizacion?.length || 0} producto(s)</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white opacity-0 group-hover:opacity-100 transition-opacity ml-3 shrink-0"
                      disabled={creandoOrden === cot.cot_id_int}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSeleccionarCotizacion(cot)
                      }}
                    >
                      {creandoOrden === cot.cot_id_int ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-1" />
                          Seleccionar
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Sección Documentos (reutiliza lógica de documentoLab) ──────────────────

function DocumentosSection() {
  const router = useRouter()
  const [mainTab, setMainTab] = useState<"lista" | "crear">("lista")
  const [descargando, setDescargando] = useState(false)

  const {
    areas, servicios, tiposDocumento, estadosDocumento, clientes,
    catalogosLoading, documentosLoading, guardando,
    documento, modoEdicion, activeTab, setActiveTab,
    documentos, cargarDocumentos,
    areaSeleccionada, setAreaSeleccionada,
    filtroEstado, setFiltroEstado,
    filtroBusqueda, setFiltroBusqueda,
    seleccionarCliente, seleccionarArea, seleccionarServicio,
    seleccionarTipoDocumento, seleccionarEstado,
    agregarMuestra, actualizarMuestra, eliminarMuestra,
    agregarResultado, actualizarResultado, eliminarResultado,
    agregarNota, actualizarNota, eliminarNota,
    agregarAgente, actualizarAgente, eliminarAgente,
    agregarAnexo, actualizarAnexo, eliminarAnexo,
    configCampos, configAnexos,
    firmasDisponibles, agregarFirma, removerFirma,
    guardarDocumento, cargarDocumentoParaEdicion, nuevoDocumento,
    estadisticas,
  } = useDocumentoLab()

  useEffect(() => {
    cargarDocumentos()
  }, [cargarDocumentos])

  const handleGuardar = async () => {
    await guardarDocumento()
  }

  const handleVerDocumento = (documentoId: string) => {
    cargarDocumentoParaEdicion(documentoId)
    setMainTab("crear")
  }

  const handleEditarDocumento = (documentoId: string) => {
    cargarDocumentoParaEdicion(documentoId)
    setMainTab("crear")
  }

  const handleImprimirDocumento = (documentoId: string) => {
    router.push(`/imprimir/documento-lab/${documentoId}`)
  }

  const handleDescargar = async () => {
    setDescargando(true)
    try {
      await generarPdfDocumentoLab(documento)
    } finally {
      setDescargando(false)
    }
  }

  const handleVolverALista = () => {
    setMainTab("lista")
    cargarDocumentos()
  }

  const stats = estadisticas()

  if (mainTab === "crear") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleVolverALista}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la lista
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={handleGuardar} disabled={guardando || catalogosLoading}>
              {guardando ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Guardar
            </Button>
            {documento.id && !documento.id.startsWith("temp_") && (
              <Button
                variant="outline"
                onClick={handleDescargar}
                disabled={descargando || !documento.id || documento.id.startsWith("temp_")}
              >
                {descargando ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Descargar
              </Button>
            )}
          </div>
        </div>

        {catalogosLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabDocumentoLab)}>
            <TabsList className="h-auto flex-wrap gap-1 justify-start">
              <TabsTrigger value="informacion">Información</TabsTrigger>
              <TabsTrigger value="muestras">Muestras ({documento.muestras.length})</TabsTrigger>
              <TabsTrigger value="resultados">Resultados ({documento.resultados.length})</TabsTrigger>
              <TabsTrigger value="agentes">Agentes ({documento.agentes.length})</TabsTrigger>
              <TabsTrigger value="anexos">Anexos ({documento.anexos.length})</TabsTrigger>
              <TabsTrigger value="firmas">Firmas ({documento.firmas?.length || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="informacion">
              <InformacionDocumento
                documento={documento} areas={areas} servicios={servicios}
                tiposDocumento={tiposDocumento} estadosDocumento={estadosDocumento}
                clientes={clientes} areaSeleccionada={areaSeleccionada}
                onAreaChange={seleccionarArea} onServicioChange={seleccionarServicio}
                onTipoDocumentoChange={seleccionarTipoDocumento}
                onClienteChange={seleccionarCliente} onEstadoChange={seleccionarEstado}
              />
            </TabsContent>
            <TabsContent value="muestras">
              <MuestrasSection
                muestras={documento.muestras} codigoDocumento={documento.codigo}
                configCampos={configCampos} onAgregarMuestra={agregarMuestra}
                onActualizarMuestra={actualizarMuestra} onEliminarMuestra={eliminarMuestra}
              />
            </TabsContent>
            <TabsContent value="resultados">
              <ResultadosSection
                resultados={documento.resultados} muestras={documento.muestras}
                servicioConfExtra={documento.servicioConfExtra}
                onAgregarResultado={agregarResultado} onActualizarResultado={actualizarResultado}
                onEliminarResultado={eliminarResultado}
              />
              <div className="mt-6">
                <NotasResultadoSection
                  notas={documento.notas} resultados={documento.resultados}
                  onAgregarNota={agregarNota} onActualizarNota={actualizarNota}
                  onEliminarNota={eliminarNota}
                />
              </div>
            </TabsContent>
            <TabsContent value="agentes">
              <AgentesSection
                agentes={documento.agentes} muestras={documento.muestras}
                onAgregarAgente={agregarAgente} onActualizarAgente={actualizarAgente}
                onEliminarAgente={eliminarAgente}
              />
            </TabsContent>
            <TabsContent value="anexos">
              <AnexosSection
                anexos={documento.anexos} configAnexos={configAnexos}
                onAgregarAnexo={agregarAnexo} onActualizarAnexo={actualizarAnexo}
                onEliminarAnexo={eliminarAnexo}
              />
            </TabsContent>
            <TabsContent value="firmas">
              <FirmasSection
                firmasAsignadas={documento.firmas || []} firmasDisponibles={firmasDisponibles}
                onAgregarFirma={agregarFirma} onRemoverFirma={removerFirma}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Gestión de certificados, informes y otros documentos de laboratorio.
        </p>
        <Link href="/admin/documentoLab/configuracion">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </Link>
      </div>

      <DocumentoLabStats total={stats.total} porEstado={stats.porEstado} />

      <DocumentoLabList
        documentos={documentos} areas={areas} estadosDocumento={estadosDocumento}
        filtroEstado={filtroEstado} filtroBusqueda={filtroBusqueda}
        areaSeleccionada={areaSeleccionada}
        onFiltroEstadoChange={setFiltroEstado} onFiltroBusquedaChange={setFiltroBusqueda}
        onAreaChange={setAreaSeleccionada} onVerDocumento={handleVerDocumento}
        onEditarDocumento={handleEditarDocumento} onImprimirDocumento={handleImprimirDocumento}
        onRefrescar={cargarDocumentos} loading={documentosLoading}
      />
    </div>
  )
}

// ─── Página Principal ────────────────────────────────────────────────────────

export default function RecepcionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="h-7 w-7 text-emerald-600" />
          Recepción / Lab
        </h1>
        <p className="text-muted-foreground mt-1">
          Gestión de ingresos de muestras y documentos de laboratorio.
        </p>
      </div>

      <Tabs defaultValue="ordenes">
        <TabsList>
          <TabsTrigger value="ordenes" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Órdenes de Servicio
          </TabsTrigger>
          <TabsTrigger value="documentos" className="flex items-center gap-2">
            <FileInput className="h-4 w-4" />
            Documentos de Lab
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ordenes" className="mt-4">
          <OrdenesSection />
        </TabsContent>

        <TabsContent value="documentos" className="mt-4">
          <DocumentosSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
