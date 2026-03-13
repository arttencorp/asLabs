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
    case 1: return "bg-yellow-100 text-yellow-700 border-yellow-300"
    case 2: return "bg-green-100 text-green-700 border-green-300"
    case 3: return "bg-red-100 text-red-700 border-red-300"
    case 4: return "bg-blue-100 text-blue-700 border-blue-300"
    default: return "bg-gray-100 text-gray-600 border-gray-300"
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
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!cotizacion) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>Cotización no encontrada</p>
        <Button
          variant="ghost"
          className="mt-4 text-emerald-600"
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
            <BreadcrumbLink href="/admin/recepcion" className="text-muted-foreground hover:text-foreground">
              Recepción / Lab
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-medium">
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
              className="text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/admin/recepcion")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Cotización {cotizacion.cot_num_vac}
              </h1>
              <p className="text-muted-foreground text-sm">{nombreCliente}</p>
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              Datos del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <span className="text-muted-foreground block text-xs">Nombre / Razón Social</span>
                  <span className="text-foreground">{nombreCliente}</span>
                </div>
              </div>

              {cotizacion.persona?.per_nom_contac_vac && (
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-foreground block text-xs">Contacto</span>
                    <span className="text-foreground">{cotizacion.persona.per_nom_contac_vac}</span>
                  </div>
                </div>
              )}

              {cotizacion.persona?.per_email_vac && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-foreground block text-xs">Email</span>
                    <span className="text-foreground">{cotizacion.persona.per_email_vac}</span>
                  </div>
                </div>
              )}

              {cotizacion.persona?.per_telef_int && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-foreground block text-xs">Teléfono</span>
                    <span className="text-foreground">{cotizacion.persona.per_telef_int}</span>
                  </div>
                </div>
              )}

              {cotizacion.persona?.per_direc_vac && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-foreground block text-xs">Dirección</span>
                    <span className="text-foreground">{cotizacion.persona.per_direc_vac}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resumen de Cotización */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              Resumen del Contrato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Fecha Emisión</span>
                <span className="text-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(cotizacion.cot_fec_emis_dt, { short: true })}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Vencimiento</span>
                <span className="text-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(cotizacion.cot_fec_venc_dt, { short: true })}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">IGV incluido</span>
                <span className="text-foreground">{cotizacion.cot_igv_bol ? "Sí" : "No"}</span>
              </div>
              {cotizacion.informacion_adicional?.forma_pago?.form_pa_desc_vac && (
                <div>
                  <span className="text-muted-foreground block text-xs">Forma de Pago</span>
                  <span className="text-foreground">
                    {cotizacion.informacion_adicional.forma_pago.form_pa_desc_vac}
                  </span>
                </div>
              )}
            </div>

            {cotizacion.detalle_cotizacion && cotizacion.detalle_cotizacion.length > 0 && (
              <>
                <Separator />
                <div>
                  <span className="text-muted-foreground text-xs block mb-2">
                    Productos / Servicios contratados ({cotizacion.detalle_cotizacion.length})
                  </span>
                  <div className="space-y-1.5">
                    {cotizacion.detalle_cotizacion.map((det, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-foreground">
                            {det.producto?.pro_nomb_vac || "Producto"}
                          </span>
                        </div>
                        <span className="text-muted-foreground text-xs">
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
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-emerald-600" />
                Órdenes de Servicio
              </CardTitle>
              <CardDescription className="mt-1">
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
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Crear nueva Orden de Servicio?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Se creará una nueva orden de servicio vinculada a la cotización{" "}
                    <span className="font-medium text-foreground">{cotizacion.cot_num_vac}</span>{" "}
                    del cliente{" "}
                    <span className="font-medium text-foreground">{nombreCliente}</span>.
                    <br /><br />
                    Podrá agregar documentos de laboratorio y muestras en el siguiente paso.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
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
            <div className="text-center py-12 text-muted-foreground">
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
                  <TableRow className="hover:bg-transparent">
                    <TableHead>N° Orden</TableHead>
                    <TableHead>Fecha Recepción</TableHead>
                    <TableHead className="text-center">Documentos</TableHead>
                    <TableHead className="text-center">Muestras</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenes.map((orden, idx) => (
                    <TableRow
                      key={orden.ord_serv_id_int}
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/admin/recepcion/${cotizacionId}/orden/${orden.ord_serv_id_int}`
                        )
                      }
                    >
                      <TableCell className="font-medium">
                        OS-{String(idx + 1).padStart(3, "0")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(orden.ord_serv_fec_recep_dt, { includeTime: true })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {contarDocumentos(orden)} doc(s)
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {contarMuestras(orden)} muestra(s)
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
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
