"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
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
} from "lucide-react"
import { formatDate } from "@/utils"
import {
  obtenerCotizacionesConOrdenes,
  obtenerCotizacionesSinOrdenes,
  crearOrdenServicioParaCotizacion,
  obtenerNombrePersona,
} from "@/lib/supabase/recepcion"
import type { CotizacionRecepcion } from "@/lib/supabase/recepcion"

function obtenerColorEstado(tipo: number | null | undefined): string {
  switch (tipo) {
    case 1: return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case 2: return "bg-green-500/20 text-green-400 border-green-500/30"
    case 3: return "bg-red-500/20 text-red-400 border-red-500/30"
    case 4: return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export default function RecepcionPage() {
  const router = useRouter()

  // Lista principal: cotizaciones que YA tienen órdenes de servicio
  const [cotizaciones, setCotizaciones] = useState<CotizacionRecepcion[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState("")

  // Dialog de selección: cotizaciones SIN órdenes de servicio
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

  // Cargar cotizaciones disponibles al abrir el dialog
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

  // Seleccionar una cotización y crear la primera orden de servicio
  async function handleSeleccionarCotizacion(cot: CotizacionRecepcion) {
    try {
      setCreandoOrden(cot.cot_id_int)
      const nuevaOrden = await crearOrdenServicioParaCotizacion(
        cot.cot_id_int,
        cot.per_id_int
      )
      setShowSeleccionDialog(false)
      // Navegar directamente a la cotización (que ahora tiene su primera orden)
      router.push(`/admin/recepcion/${cot.cot_id_int}`)
    } catch (error) {
      console.error("Error creando orden de servicio:", error)
    } finally {
      setCreandoOrden(null)
    }
  }

  // Filtrar lista principal
  const cotizacionesFiltradas = useMemo(() => {
    if (!busqueda) return cotizaciones
    const term = busqueda.toLowerCase()
    return cotizaciones.filter(cot => {
      const nombre = obtenerNombrePersona(cot.persona).toLowerCase()
      const num = (cot.cot_num_vac || '').toLowerCase()
      return nombre.includes(term) || num.includes(term)
    })
  }, [cotizaciones, busqueda])

  // Filtrar cotizaciones disponibles en el dialog
  const disponiblesFiltradas = useMemo(() => {
    if (!busquedaDisponible) return cotizacionesDisponibles
    const term = busquedaDisponible.toLowerCase()
    return cotizacionesDisponibles.filter(cot => {
      const nombre = obtenerNombrePersona(cot.persona).toLowerCase()
      const num = (cot.cot_num_vac || '').toLowerCase()
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="h-7 w-7 text-emerald-400" />
            Recepción de Muestras
          </h1>
          <p className="text-gray-400 mt-1">
            Cotizaciones con órdenes de servicio activas. Seleccione una para gestionar sus ingresos.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:text-white hover:bg-[#2a2a4a]"
            onClick={cargarCotizaciones}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleAbrirDialog}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Ingreso
          </Button>
        </div>
      </div>

      {/* Filtro de búsqueda */}
      <Card className="bg-[#1e1e3a] border-gray-700">
        <CardContent className="pt-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por cliente o N° cotización..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10 bg-[#2a2a4a] border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla principal: cotizaciones con órdenes */}
      <Card className="bg-[#1e1e3a] border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-emerald-400" />
            Cotizaciones con Órdenes de Servicio
          </CardTitle>
          <CardDescription className="text-gray-400">
            {loading
              ? "Cargando..."
              : `${cotizacionesFiltradas.length} cotización(es) con ingresos registrados`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-14 w-full bg-gray-700/30" />
              ))}
            </div>
          ) : cotizacionesFiltradas.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
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
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="text-gray-400">N° Cotización</TableHead>
                    <TableHead className="text-gray-400">Cliente</TableHead>
                    <TableHead className="text-gray-400">Fecha Emisión</TableHead>
                    <TableHead className="text-gray-400 text-center">Productos</TableHead>
                    <TableHead className="text-gray-400 text-right">Total (S/)</TableHead>
                    <TableHead className="text-gray-400">Estado</TableHead>
                    <TableHead className="text-gray-400 text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cotizacionesFiltradas.map((cot) => (
                    <TableRow
                      key={cot.cot_id_int}
                      className="border-gray-700/50 hover:bg-[#2a2a4a]/50 cursor-pointer"
                      onClick={() => router.push(`/admin/recepcion/${cot.cot_id_int}`)}
                    >
                      <TableCell className="text-white font-medium">
                        {cot.cot_num_vac || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500 shrink-0" />
                          <span className="text-gray-300 truncate max-w-[200px]">
                            {obtenerNombrePersona(cot.persona)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(cot.cot_fec_emis_dt, { short: true })}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Package className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-gray-300">
                            {cot.detalle_cotizacion?.length || 0}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-gray-300 font-mono">
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
                          <Badge variant="outline" className="bg-gray-500/20 text-gray-400">
                            Sin estado
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
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

      {/* Dialog: Seleccionar cotización para nuevo ingreso */}
      <Dialog open={showSeleccionDialog} onOpenChange={setShowSeleccionDialog}>
        <DialogContent className="bg-[#1e1e3a] border-gray-700 sm:max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-400" />
              Seleccionar Cotización
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Cotizaciones sin órdenes de servicio. Seleccione una para crear el primer ingreso.
            </DialogDescription>
          </DialogHeader>

          {/* Buscador dentro del dialog */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por cliente o N° cotización..."
              value={busquedaDisponible}
              onChange={(e) => setBusquedaDisponible(e.target.value)}
              className="pl-10 bg-[#2a2a4a] border-gray-600 text-white"
              autoFocus
            />
          </div>

          {/* Lista de cotizaciones disponibles */}
          <div className="flex-1 overflow-y-auto min-h-0 -mx-6 px-6">
            {loadingDisponibles ? (
              <div className="space-y-3 py-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-16 w-full bg-gray-700/30" />
                ))}
              </div>
            ) : disponiblesFiltradas.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
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
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-700/50 hover:bg-[#2a2a4a]/70 hover:border-emerald-500/30 transition-colors cursor-pointer group"
                    onClick={() => {
                      if (!creandoOrden) handleSeleccionarCotizacion(cot)
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">
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
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {obtenerNombrePersona(cot.persona)}
                        </span>
                        <span>
                          {formatDate(cot.cot_fec_emis_dt, { short: true })}
                        </span>
                        <span>
                          {cot.detalle_cotizacion?.length || 0} producto(s)
                        </span>
                        <span className="font-mono">
                          S/ {calcularTotal(cot)}
                        </span>
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
