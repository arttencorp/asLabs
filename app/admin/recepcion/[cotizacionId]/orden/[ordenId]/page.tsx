"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ArrowLeft,
  Plus,
  Eye,
  Edit,
  Calendar,
  User,
  FileText,
  FlaskConical,
  ClipboardList,
  TestTubes,
  Loader2,
} from "lucide-react"
import { formatDate } from "@/utils"
import {
  obtenerOrdenServicioDetalle,
  obtenerCatalogosRecepcion,
  crearDocumentoLabParaOrden,
  obtenerNombrePersona,
} from "@/lib/supabase/recepcion"
import type { OrdenServicioConDocumentos } from "@/lib/supabase/recepcion"
import type {
  AreaDatabase,
  ServicioDatabase,
  TipoDocumentoDatabase,
  DocumentoLabDatabase,
} from "@/types/database"

function obtenerColorEstadoDoc(nombre: string | null): string {
  if (!nombre) return "bg-gray-100 text-gray-600 border-gray-300"
  const n = nombre.toLowerCase()
  if (n.includes("borrador")) return "bg-gray-100 text-gray-600 border-gray-300"
  if (n.includes("pendiente")) return "bg-yellow-100 text-yellow-700 border-yellow-300"
  if (n.includes("proceso")) return "bg-blue-100 text-blue-700 border-blue-300"
  if (n.includes("emitido") || n.includes("final")) return "bg-green-100 text-green-700 border-green-300"
  if (n.includes("anulado")) return "bg-red-100 text-red-700 border-red-300"
  return "bg-gray-100 text-gray-600 border-gray-300"
}

interface AreaConServicios extends AreaDatabase {
  servicios?: ServicioDatabase[]
}

export default function OrdenServicioDetallePage() {
  const router = useRouter()
  const params = useParams()
  const cotizacionId = params.cotizacionId as string
  const ordenId = params.ordenId as string

  const [orden, setOrden] = useState<OrdenServicioConDocumentos | null>(null)
  const [loading, setLoading] = useState(true)

  const [showCrearDialog, setShowCrearDialog] = useState(false)
  const [areas, setAreas] = useState<AreaConServicios[]>([])
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumentoDatabase[]>([])
  const [selectedAreaId, setSelectedAreaId] = useState<string>("")
  const [selectedServicioId, setSelectedServicioId] = useState<string>("")
  const [selectedTipoDocId, setSelectedTipoDocId] = useState<string>("")
  const [creandoDoc, setCreandoDoc] = useState(false)
  const [catalogosCargados, setCatalogosCargados] = useState(false)

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true)
      const data = await obtenerOrdenServicioDetalle(ordenId)
      setOrden(data)
    } catch (error) {
      console.error("Error cargando orden de servicio:", error)
    } finally {
      setLoading(false)
    }
  }, [ordenId])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  async function cargarCatalogos() {
    if (catalogosCargados) return
    try {
      const data = await obtenerCatalogosRecepcion()
      setAreas(data.areas)
      setTiposDocumento(data.tiposDocumento)
      setCatalogosCargados(true)
    } catch (error) {
      console.error("Error cargando catálogos:", error)
    }
  }

  const serviciosFiltrados = useMemo(() => {
    if (!selectedAreaId) return []
    const area = areas.find(a => a.area_id_int === selectedAreaId)
    return area?.servicios || []
  }, [areas, selectedAreaId])

  useEffect(() => {
    setSelectedServicioId("")
  }, [selectedAreaId])

  async function handleCrearDocumento() {
    if (!selectedServicioId || !selectedTipoDocId) return
    try {
      setCreandoDoc(true)
      await crearDocumentoLabParaOrden({
        ord_serv_id_int: ordenId,
        serv_id_int: selectedServicioId,
        tip_doc_id_int: selectedTipoDocId,
      })
      setShowCrearDialog(false)
      await cargarDatos()
    } catch (error) {
      console.error("Error creando documento:", error)
    } finally {
      setCreandoDoc(false)
    }
  }

  function handleAbrirCrearDialog() {
    setSelectedAreaId("")
    setSelectedServicioId("")
    setSelectedTipoDocId("")
    cargarCatalogos()
    setShowCrearDialog(true)
  }

  function navegarADocumento(docId: string, modo: "ver" | "editar") {
    router.push(`/admin/documentoLab?docId=${docId}&modo=${modo}&returnTo=/admin/recepcion/${cotizacionId}/orden/${ordenId}`)
  }

  const nombreCliente = obtenerNombrePersona(orden?.persona)
  const documentos = orden?.documentos_lab || []

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!orden) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>Orden de servicio no encontrada</p>
        <Button
          variant="ghost"
          className="mt-4 text-emerald-600"
          onClick={() => router.push(`/admin/recepcion/${cotizacionId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver a cotización
        </Button>
      </div>
    )
  }

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
            <BreadcrumbLink
              href={`/admin/recepcion/${cotizacionId}`}
              className="text-muted-foreground hover:text-foreground"
            >
              Cotización {orden.cotizacion?.cot_num_vac || cotizacionId.slice(0, 8)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-medium">
              Orden de Servicio
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => router.push(`/admin/recepcion/${cotizacionId}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-emerald-600" />
              Orden de Servicio
            </h1>
            <p className="text-muted-foreground text-sm">{nombreCliente}</p>
          </div>
        </div>
      </div>

      {/* Info de la orden */}
      <Card>
        <CardContent className="pt-5 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-muted-foreground block text-xs">Fecha de Recepción</span>
                <span className="text-foreground text-sm">
                  {formatDate(orden.ord_serv_fec_recep_dt, { includeTime: true })}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-muted-foreground block text-xs">Cliente</span>
                <span className="text-foreground text-sm">{nombreCliente}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-muted-foreground block text-xs">Cotización</span>
                <span className="text-foreground text-sm">
                  {orden.cotizacion?.cot_num_vac || "—"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentos de Laboratorio */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <TestTubes className="h-5 w-5 text-emerald-600" />
                Documentos de Laboratorio
              </CardTitle>
              <CardDescription className="mt-1">
                Informes y certificados generados para esta orden.
                {documentos.length > 0 && ` ${documentos.length} documento(s).`}
              </CardDescription>
            </div>

            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
              onClick={handleAbrirCrearDialog}
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Documento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {documentos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FlaskConical className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No hay documentos de laboratorio</p>
              <p className="text-sm mt-1">
                Haga clic en &quot;Crear Documento&quot; para generar un nuevo informe o certificado.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Área / Servicio</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead className="text-center">Muestras</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentos.map((doc: DocumentoLabDatabase) => (
                    <TableRow key={doc.doc_lab_id_int}>
                      <TableCell className="font-mono text-sm font-medium">
                        {doc.doc_lab_cod_vac || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-indigo-50 text-indigo-700 border-indigo-200"
                        >
                          {doc.tipo_documento?.tip_doc_nomb_vac || "—"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="text-foreground">
                            {doc.servicio?.serv_nombre_vac || "—"}
                          </span>
                          {doc.servicio?.area && (
                            <span className="text-muted-foreground text-xs block">
                              {doc.servicio.area.area_nombre_vac}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {doc.doc_lab_emision_dt
                          ? formatDate(doc.doc_lab_emision_dt, { short: true })
                          : "Sin emitir"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 border-purple-200"
                        >
                          {doc.muestras?.length || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={obtenerColorEstadoDoc(
                            doc.estado_documento?.est_doc_nomb_vac ?? null
                          )}
                        >
                          {doc.estado_documento?.est_doc_nomb_vac || "Sin estado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => navegarADocumento(doc.doc_lab_id_int, "ver")}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Ver
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={() => navegarADocumento(doc.doc_lab_id_int, "editar")}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog para crear documento */}
      <Dialog open={showCrearDialog} onOpenChange={setShowCrearDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear Documento de Laboratorio</DialogTitle>
            <DialogDescription>
              Seleccione el área, servicio y tipo de documento a generar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Área</Label>
              <Select value={selectedAreaId} onValueChange={setSelectedAreaId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar área..." />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.area_id_int} value={area.area_id_int}>
                      {area.area_nombre_vac || "Sin nombre"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Servicio</Label>
              <Select
                value={selectedServicioId}
                onValueChange={setSelectedServicioId}
                disabled={!selectedAreaId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedAreaId ? "Seleccionar servicio..." : "Primero seleccione un área"} />
                </SelectTrigger>
                <SelectContent>
                  {serviciosFiltrados.map((serv) => (
                    <SelectItem key={serv.serv_id_int} value={serv.serv_id_int}>
                      {serv.serv_nombre_vac || "Sin nombre"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select value={selectedTipoDocId} onValueChange={setSelectedTipoDocId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo..." />
                </SelectTrigger>
                <SelectContent>
                  {tiposDocumento.map((tipo) => (
                    <SelectItem key={tipo.tip_doc_id_int} value={tipo.tip_doc_id_int}>
                      {tipo.tip_doc_nomb_vac || "Sin nombre"}
                      {tipo.tip_doc_cod_vac && (
                        <span className="text-muted-foreground ml-1">({tipo.tip_doc_cod_vac})</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowCrearDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!selectedServicioId || !selectedTipoDocId || creandoDoc}
              onClick={handleCrearDocumento}
            >
              {creandoDoc ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Documento
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
