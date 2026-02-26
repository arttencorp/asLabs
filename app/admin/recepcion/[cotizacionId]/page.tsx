"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Plus,
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Package,
  Calendar,
  FlaskConical,
  ClipboardList,
  Loader2,
} from "lucide-react"
import { formatDate } from "@/utils"
import {
  obtenerCotizacionConOrdenes,
  crearOrdenServicioParaCotizacion,
  obtenerNombrePersona
} from "@/lib/supabase/recepcion"
import type { CotizacionRecepcion, OrdenServicioConDocumentos } from "@/lib/supabase/recepcion"

function obtenerColorEstado(tipo: number | null | undefined): string {
  switch (tipo) {
    case 1: return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case 2: return "bg-green-500/20 text-green-400 border-green-500/30"
    case 3: return "bg-red-500/20 text-red-400 border-red-500/30"
    case 4: return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export default function CotizacionPanelPage() {
  const router = useRouter()
  const params = useParams()
  const cotizacionId = params.cotizacionId as string

  const [cotizacion, setCotizacion] = useState<CotizacionRecepcion | null>(null)
  const [ordenes, setOrdenes] = useState<OrdenServicioConDocumentos[]>([])
  const [loading, setLoading] = useState(true)
  const [creandoOrden, setCreandoOrden] = useState(false)

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true)
      const data = await obtenerCotizacionConOrdenes(cotizacionId)
      setCotizacion(data.cotizacion)
      setOrdenes(data.ordenes)
    } catch (error) {
      console.error("Error cargando datos:", error)
    } finally {
      setLoading(false)
    }
  }, [cotizacionId])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  async function handleNuevoIngreso() {
    if (!cotizacion) return
    try {
      setCreandoOrden(true)
      const nuevaOrden = await crearOrdenServicioParaCotizacion(
        cotizacionId,
        cotizacion.per_id_int
      )
      // Navegar a la orden recién creada
      router.push(`/admin/recepcion/${cotizacionId}/orden/${nuevaOrden.ord_serv_id_int}`)
    } catch (error) {
      console.error("Error creando orden de servicio:", error)
    } finally {
      setCreandoOrden(false)
    }
  }

  function contarDocumentos(orden: OrdenServicioConDocumentos): number {
    return orden.documentos_lab?.length || 0
  }

  function contarMuestras(orden: OrdenServicioConDocumentos): number {
    return orden.documentos_lab?.reduce((sum, doc) => sum + (doc.muestras?.length || 0), 0) || 0
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 bg-gray-700/30" />
        <Skeleton className="h-48 w-full bg-gray-700/30" />
        <Skeleton className="h-64 w-full bg-gray-700/30" />
      </div>
    )
  }

  if (!cotizacion) {
    return (
      <div className="text-center py-20 text-gray-400">
        <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>Cotización no encontrada</p>
        <Button
          variant="ghost"
          className="mt-4 text-emerald-400"
          onClick={() => router.push("/admin/recepcion")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver a recepción
        </Button>
      </div>
    )
  }

  const nombreCliente = obtenerNombrePersona(cotizacion.persona)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/recepcion"
              className="text-gray-400 hover:text-white"
            >
              Recepción
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-gray-600" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">
              Cotización {cotizacion.cot_num_vac}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => router.push("/admin/recepcion")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Cotización {cotizacion.cot_num_vac}
              </h1>
              <p className="text-gray-400 text-sm">{nombreCliente}</p>
            </div>
          </div>
        </div>
        {cotizacion.estado_cotizacion && (
          <Badge
            variant="outline"
            className={`${obtenerColorEstado(cotizacion.estado_cotizacion.est_cot_tipo_int)} text-sm px-3 py-1`}
          >
            {cotizacion.estado_cotizacion.est_cot_desc_vac}
          </Badge>
        )}
      </div>

      {/* Info del cliente y cotización */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Datos del Cliente */}
        <Card className="bg-[#1e1e3a] border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-400" />
              Datos del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-400 block text-xs">Nombre / Razón Social</span>
                  <span className="text-white">{nombreCliente}</span>
                </div>
              </div>

              {cotizacion.persona?.per_nom_contac_vac && (
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-xs">Contacto</span>
                    <span className="text-gray-300">{cotizacion.persona.per_nom_contac_vac}</span>
                  </div>
                </div>
              )}

              {cotizacion.persona?.per_email_vac && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-xs">Email</span>
                    <span className="text-gray-300">{cotizacion.persona.per_email_vac}</span>
                  </div>
                </div>
              )}

              {cotizacion.persona?.per_telef_int && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-xs">Teléfono</span>
                    <span className="text-gray-300">{cotizacion.persona.per_telef_int}</span>
                  </div>
                </div>
              )}

              {cotizacion.persona?.per_direc_vac && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-xs">Dirección</span>
                    <span className="text-gray-300">{cotizacion.persona.per_direc_vac}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resumen de Cotización */}
        <Card className="bg-[#1e1e3a] border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-400" />
              Resumen del Contrato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400 block text-xs">Fecha Emisión</span>
                <span className="text-white flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  {formatDate(cotizacion.cot_fec_emis_dt, { short: true })}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs">Vencimiento</span>
                <span className="text-white flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  {formatDate(cotizacion.cot_fec_venc_dt, { short: true })}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs">IGV incluido</span>
                <span className="text-white">{cotizacion.cot_igv_bol ? "Sí" : "No"}</span>
              </div>
              {cotizacion.informacion_adicional?.forma_pago?.form_pa_desc_vac && (
                <div>
                  <span className="text-gray-400 block text-xs">Forma de Pago</span>
                  <span className="text-white">
                    {cotizacion.informacion_adicional.forma_pago.form_pa_desc_vac}
                  </span>
                </div>
              )}
            </div>

            {/* Productos/servicios contratados */}
            {cotizacion.detalle_cotizacion && cotizacion.detalle_cotizacion.length > 0 && (
              <>
                <Separator className="bg-gray-700" />
                <div>
                  <span className="text-gray-400 text-xs block mb-2">
                    Productos / Servicios contratados ({cotizacion.detalle_cotizacion.length})
                  </span>
                  <div className="space-y-1.5">
                    {cotizacion.detalle_cotizacion.map((det, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-gray-300">
                            {det.producto?.pro_nomb_vac || "Producto"}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          {det.det_cot_cant_int} × S/ {(det.det_cot_prec_hist_int || 0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historial de Órdenes de Servicio */}
      <Card className="bg-[#1e1e3a] border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-emerald-400" />
                Órdenes de Servicio
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                Historial de ingresos de muestras asociados a esta cotización.
                {ordenes.length > 0 && ` ${ordenes.length} orden(es) registrada(s).`}
              </CardDescription>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                  disabled={creandoOrden}
                >
                  {creandoOrden ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Nuevo Ingreso de Muestras
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#1e1e3a] border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    ¿Crear nueva Orden de Servicio?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    Se creará una nueva orden de servicio vinculada a la cotización{" "}
                    <span className="text-white font-medium">{cotizacion.cot_num_vac}</span>{" "}
                    del cliente{" "}
                    <span className="text-white font-medium">{nombreCliente}</span>.
                    <br /><br />
                    Podrá agregar documentos de laboratorio y muestras en el siguiente paso.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleNuevoIngreso}
                  >
                    Crear Orden
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          {ordenes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <FlaskConical className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No hay órdenes de servicio registradas</p>
              <p className="text-sm mt-1">
                Haga clic en &quot;Nuevo Ingreso de Muestras&quot; para comenzar.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="text-gray-400">N° Orden</TableHead>
                    <TableHead className="text-gray-400">Fecha Recepción</TableHead>
                    <TableHead className="text-gray-400 text-center">Documentos</TableHead>
                    <TableHead className="text-gray-400 text-center">Muestras</TableHead>
                    <TableHead className="text-gray-400 text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenes.map((orden, idx) => (
                    <TableRow
                      key={orden.ord_serv_id_int}
                      className="border-gray-700/50 hover:bg-[#2a2a4a]/50 cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/admin/recepcion/${cotizacionId}/orden/${orden.ord_serv_id_int}`
                        )
                      }
                    >
                      <TableCell className="text-white font-medium">
                        OS-{String(idx + 1).padStart(3, "0")}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(orden.ord_serv_fec_recep_dt, { includeTime: true })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                        >
                          {contarDocumentos(orden)} doc(s)
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-purple-500/10 text-purple-400 border-purple-500/30"
                        >
                          {contarMuestras(orden)} muestra(s)
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                        >
                          Ver detalle <ChevronRight className="h-4 w-4 ml-1" />
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
    </div>
  )
}
