'use client'

import { useState, useEffect, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, Settings, Building2, FileText, CheckCircle2, FlaskConical, Paperclip, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  obtenerAreas,
  crearArea,
  actualizarArea,
  eliminarArea,
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  obtenerTiposDocumento,
  crearTipoDocumento,
  actualizarTipoDocumento,
  eliminarTipoDocumento,
  obtenerEstadosDocumento,
  crearEstadoDocumento,
  actualizarEstadoDocumento,
  eliminarEstadoDocumento,
  obtenerConfigCamposMuestra,
  crearConfigCampoMuestra,
  actualizarConfigCampoMuestra,
  eliminarConfigCampoMuestra,
  obtenerConfigAnexosServicio,
  crearConfigAnexoServicio,
  actualizarConfigAnexoServicio,
  eliminarConfigAnexoServicio
} from '@/lib/supabase/documentos-lab'
import type { 
  AreaDatabase, 
  ServicioDatabase, 
  TipoDocumentoDatabase, 
  EstadoDocumentoDatabase,
  ConfigCampoMuestraDatabase,
  ConfigAnexoServicioDatabase
} from '@/types/database'

// ============================================
// TIPOS LOCALES
// ============================================
interface AreaForm {
  area_nombre_vac: string
}

interface ServicioForm {
  serv_nombre_vac: string
  serv_costo_int: number
  area_id_int: string
}

interface TipoDocumentoForm {
  tip_doc_nomb_vac: string
  tip_doc_cod_vac: string
}

interface EstadoDocumentoForm {
  est_doc_nomb_vac: string
}

interface ConfigCampoForm {
  config_mue_etique_vac: string
  config_mue_tipo_dato_vac: string
  serv_id_int: string
}

interface ConfigAnexoForm {
  config_anx_nomb_vac: string
  config_anx_obliga_vac: string
  serv_id_int: string
}

const TIPOS_CAMPO = [
  { value: 'texto', label: 'Texto' },
  { value: 'numero', label: 'Número' },
  { value: 'fecha', label: 'Fecha' },
  { value: 'select', label: 'Selección' },
  { value: 'textarea', label: 'Texto Largo' },
  { value: 'checkbox', label: 'Casilla' },
]

// ============================================
// COMPONENTES DE GESTIÓN
// ============================================

// Gestión de Áreas
function AreasManager() {
  const [areas, setAreas] = useState<AreaDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingArea, setEditingArea] = useState<AreaDatabase | null>(null)
  const [form, setForm] = useState<AreaForm>({ area_nombre_vac: '' })

  const cargarAreas = useCallback(async () => {
    try {
      setLoading(true)
      const data = await obtenerAreas()
      setAreas(data)
    } catch (error) {
      toast.error('Error al cargar áreas')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarAreas()
  }, [cargarAreas])

  const handleSubmit = async () => {
    if (!form.area_nombre_vac.trim()) {
      toast.error('El nombre del área es requerido')
      return
    }

    try {
      setSaving(true)
      if (editingArea) {
        await actualizarArea(editingArea.area_id_int, form.area_nombre_vac)
        toast.success('Área actualizada')
      } else {
        await crearArea(form.area_nombre_vac)
        toast.success('Área creada')
      }
      setDialogOpen(false)
      setEditingArea(null)
      setForm({ area_nombre_vac: '' })
      cargarAreas()
    } catch (error) {
      toast.error('Error al guardar área')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (area: AreaDatabase) => {
    setEditingArea(area)
    setForm({ area_nombre_vac: area.area_nombre_vac || '' })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await eliminarArea(id)
      toast.success('Área eliminada')
      cargarAreas()
    } catch (error) {
      toast.error('Error al eliminar área. Puede tener servicios asociados.')
      console.error(error)
    }
  }

  const openNew = () => {
    setEditingArea(null)
    setForm({ area_nombre_vac: '' })
    setDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Áreas
            </CardTitle>
            <CardDescription>Gestiona las áreas de servicios del laboratorio</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Área
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingArea ? 'Editar Área' : 'Nueva Área'}</DialogTitle>
                <DialogDescription>
                  {editingArea ? 'Modifica los datos del área' : 'Ingresa los datos de la nueva área'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="area_nombre">Nombre del Área</Label>
                  <Input
                    id="area_nombre"
                    value={form.area_nombre_vac}
                    onChange={(e) => setForm({ area_nombre_vac: e.target.value })}
                    placeholder="Ej: Biotecnología Vegetal"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingArea ? 'Actualizar' : 'Crear'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : areas.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No hay áreas registradas</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {areas.map((area) => (
                <TableRow key={area.area_id_int}>
                  <TableCell className="font-mono">{area.area_id_int}</TableCell>
                  <TableCell className="font-medium">{area.area_nombre_vac}</TableCell>
                  <TableCell>{new Date(area.area_created_dt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(area)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar área?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el área &quot;{area.area_nombre_vac}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(area.area_id_int)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

// Gestión de Servicios
function ServiciosManager() {
  const [servicios, setServicios] = useState<ServicioDatabase[]>([])
  const [areas, setAreas] = useState<AreaDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingServicio, setEditingServicio] = useState<ServicioDatabase | null>(null)
  const [filtroArea, setFiltroArea] = useState<string>('all')
  const [form, setForm] = useState<ServicioForm>({
    serv_nombre_vac: '',
    serv_costo_int: 0,
    area_id_int: ''
  })

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true)
      const [serviciosData, areasData] = await Promise.all([
        obtenerServicios(),
        obtenerAreas()
      ])
      setServicios(serviciosData)
      setAreas(areasData)
    } catch (error) {
      toast.error('Error al cargar datos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  const serviciosFiltrados = filtroArea === 'all' 
    ? servicios 
    : servicios.filter(s => s.area_id_int === filtroArea)

  const handleSubmit = async () => {
    if (!form.serv_nombre_vac.trim() || !form.area_id_int) {
      toast.error('El nombre y área son requeridos')
      return
    }

    try {
      setSaving(true)
      if (editingServicio) {
        await actualizarServicio(editingServicio.serv_id_int, form)
        toast.success('Servicio actualizado')
      } else {
        await crearServicio(form)
        toast.success('Servicio creado')
      }
      setDialogOpen(false)
      setEditingServicio(null)
      setForm({ serv_nombre_vac: '', serv_costo_int: 0, area_id_int: '' })
      cargarDatos()
    } catch (error) {
      toast.error('Error al guardar servicio')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (servicio: ServicioDatabase) => {
    setEditingServicio(servicio)
    setForm({
      serv_nombre_vac: servicio.serv_nombre_vac || '',
      serv_costo_int: servicio.serv_costo_int || 0,
      area_id_int: servicio.area_id_int
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await eliminarServicio(id)
      toast.success('Servicio eliminado')
      cargarDatos()
    } catch (error) {
      toast.error('Error al eliminar servicio. Puede tener documentos asociados.')
      console.error(error)
    }
  }

  const openNew = () => {
    setEditingServicio(null)
    setForm({ serv_nombre_vac: '', serv_costo_int: 0, area_id_int: '' })
    setDialogOpen(true)
  }

  const getAreaNombre = (areaId: string) => {
    const area = areas.find(a => a.area_id_int === areaId)
    return area?.area_nombre_vac || 'N/A'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Servicios
            </CardTitle>
            <CardDescription>Gestiona los servicios ofrecidos por el laboratorio</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={filtroArea} onValueChange={setFiltroArea}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las áreas</SelectItem>
                {areas.map(area => (
                  <SelectItem key={area.area_id_int} value={area.area_id_int}>
                    {area.area_nombre_vac}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Servicio
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingServicio ? 'Editar Servicio' : 'Nuevo Servicio'}</DialogTitle>
                  <DialogDescription>
                    {editingServicio ? 'Modifica los datos del servicio' : 'Ingresa los datos del nuevo servicio'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="serv_nombre">Nombre del Servicio</Label>
                    <Input
                      id="serv_nombre"
                      value={form.serv_nombre_vac}
                      onChange={(e) => setForm({ ...form, serv_nombre_vac: e.target.value })}
                      placeholder="Ej: Análisis Molecular"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serv_area">Área</Label>
                    <Select 
                      value={form.area_id_int || 'none'} 
                      onValueChange={(val) => setForm({ ...form, area_id_int: val === 'none' ? '' : val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>Seleccionar área</SelectItem>
                        {areas.map(area => (
                          <SelectItem key={area.area_id_int} value={area.area_id_int}>
                            {area.area_nombre_vac}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serv_costo">Costo (Bs.)</Label>
                    <Input
                      id="serv_costo"
                      type="number"
                      value={form.serv_costo_int}
                      onChange={(e) => setForm({ ...form, serv_costo_int: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSubmit} disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingServicio ? 'Actualizar' : 'Crear'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : serviciosFiltrados.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No hay servicios registrados</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviciosFiltrados.map((servicio) => (
                <TableRow key={servicio.serv_id_int}>
                  <TableCell className="font-mono">{servicio.serv_id_int}</TableCell>
                  <TableCell className="font-medium">{servicio.serv_nombre_vac}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getAreaNombre(servicio.area_id_int)}</Badge>
                  </TableCell>
                  <TableCell>Bs. {servicio.serv_costo_int?.toLocaleString() || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(servicio)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar servicio?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el servicio &quot;{servicio.serv_nombre_vac}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(servicio.serv_id_int)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

// Gestión de Tipos de Documento
function TiposDocumentoManager() {
  const [tipos, setTipos] = useState<TipoDocumentoDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTipo, setEditingTipo] = useState<TipoDocumentoDatabase | null>(null)
  const [form, setForm] = useState<TipoDocumentoForm>({
    tip_doc_nomb_vac: '',
    tip_doc_cod_vac: ''
  })

  const cargarTipos = useCallback(async () => {
    try {
      setLoading(true)
      const data = await obtenerTiposDocumento()
      setTipos(data)
    } catch (error) {
      toast.error('Error al cargar tipos de documento')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarTipos()
  }, [cargarTipos])

  const handleSubmit = async () => {
    if (!form.tip_doc_nomb_vac.trim() || !form.tip_doc_cod_vac.trim()) {
      toast.error('El nombre y código son requeridos')
      return
    }

    try {
      setSaving(true)
      if (editingTipo) {
        await actualizarTipoDocumento(editingTipo.tip_doc_id_int, form)
        toast.success('Tipo de documento actualizado')
      } else {
        await crearTipoDocumento(form)
        toast.success('Tipo de documento creado')
      }
      setDialogOpen(false)
      setEditingTipo(null)
      setForm({ tip_doc_nomb_vac: '', tip_doc_cod_vac: '' })
      cargarTipos()
    } catch (error) {
      toast.error('Error al guardar tipo de documento')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (tipo: TipoDocumentoDatabase) => {
    setEditingTipo(tipo)
    setForm({
      tip_doc_nomb_vac: tipo.tip_doc_nomb_vac || '',
      tip_doc_cod_vac: tipo.tip_doc_cod_vac || ''
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await eliminarTipoDocumento(id)
      toast.success('Tipo de documento eliminado')
      cargarTipos()
    } catch (error) {
      toast.error('Error al eliminar tipo de documento')
      console.error(error)
    }
  }

  const openNew = () => {
    setEditingTipo(null)
    setForm({ tip_doc_nomb_vac: '', tip_doc_cod_vac: '' })
    setDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tipos de Documento
            </CardTitle>
            <CardDescription>Gestiona los tipos de documentos del laboratorio</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Tipo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTipo ? 'Editar Tipo' : 'Nuevo Tipo de Documento'}</DialogTitle>
                <DialogDescription>
                  {editingTipo ? 'Modifica los datos del tipo' : 'Ingresa los datos del nuevo tipo'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tip_nombre">Nombre</Label>
                  <Input
                    id="tip_nombre"
                    value={form.tip_doc_nomb_vac}
                    onChange={(e) => setForm({ ...form, tip_doc_nomb_vac: e.target.value })}
                    placeholder="Ej: Certificado de Análisis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tip_codigo">Código</Label>
                  <Input
                    id="tip_codigo"
                    value={form.tip_doc_cod_vac}
                    onChange={(e) => setForm({ ...form, tip_doc_cod_vac: e.target.value.toUpperCase() })}
                    placeholder="Ej: CERT"
                    maxLength={10}
                  />
                  <p className="text-xs text-muted-foreground">Código corto usado en la numeración del documento</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingTipo ? 'Actualizar' : 'Crear'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : tipos.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No hay tipos de documento registrados</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tipos.map((tipo) => (
                <TableRow key={tipo.tip_doc_id_int}>
                  <TableCell className="font-mono">{tipo.tip_doc_id_int}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tipo.tip_doc_cod_vac}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{tipo.tip_doc_nomb_vac}</TableCell>
                  <TableCell>{new Date(tipo.tip_doc_created_dt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(tipo)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar tipo de documento?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el tipo &quot;{tipo.tip_doc_nomb_vac}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(tipo.tip_doc_id_int)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

// Gestión de Estados de Documento
function EstadosDocumentoManager() {
  const [estados, setEstados] = useState<EstadoDocumentoDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEstado, setEditingEstado] = useState<EstadoDocumentoDatabase | null>(null)
  const [form, setForm] = useState<EstadoDocumentoForm>({ est_doc_nomb_vac: '' })

  const cargarEstados = useCallback(async () => {
    try {
      setLoading(true)
      const data = await obtenerEstadosDocumento()
      setEstados(data)
    } catch (error) {
      toast.error('Error al cargar estados')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarEstados()
  }, [cargarEstados])

  const handleSubmit = async () => {
    if (!form.est_doc_nomb_vac.trim()) {
      toast.error('El nombre del estado es requerido')
      return
    }

    try {
      setSaving(true)
      if (editingEstado) {
        await actualizarEstadoDocumento(editingEstado.est_doc_id_int, form)
        toast.success('Estado actualizado')
      } else {
        await crearEstadoDocumento(form)
        toast.success('Estado creado')
      }
      setDialogOpen(false)
      setEditingEstado(null)
      setForm({ est_doc_nomb_vac: '' })
      cargarEstados()
    } catch (error) {
      toast.error('Error al guardar estado')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (estado: EstadoDocumentoDatabase) => {
    setEditingEstado(estado)
    setForm({ est_doc_nomb_vac: estado.est_doc_nomb_vac || '' })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await eliminarEstadoDocumento(id)
      toast.success('Estado eliminado')
      cargarEstados()
    } catch (error) {
      toast.error('Error al eliminar estado')
      console.error(error)
    }
  }

  const openNew = () => {
    setEditingEstado(null)
    setForm({ est_doc_nomb_vac: '' })
    setDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Estados de Documento
            </CardTitle>
            <CardDescription>Gestiona los estados del flujo de documentos</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Estado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingEstado ? 'Editar Estado' : 'Nuevo Estado'}</DialogTitle>
                <DialogDescription>
                  {editingEstado ? 'Modifica los datos del estado' : 'Ingresa los datos del nuevo estado'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="est_nombre">Nombre del Estado</Label>
                  <Input
                    id="est_nombre"
                    value={form.est_doc_nomb_vac}
                    onChange={(e) => setForm({ est_doc_nomb_vac: e.target.value })}
                    placeholder="Ej: En Proceso"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingEstado ? 'Actualizar' : 'Crear'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : estados.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No hay estados registrados</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estados.map((estado) => (
                <TableRow key={estado.est_doc_id_int}>
                  <TableCell className="font-mono">{estado.est_doc_id_int}</TableCell>
                  <TableCell className="font-medium">{estado.est_doc_nomb_vac}</TableCell>
                  <TableCell>{new Date(estado.est_doc_created_dt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(estado)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar estado?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el estado &quot;{estado.est_doc_nomb_vac}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(estado.est_doc_id_int)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

// Gestión de Configuración de Campos de Muestra
function ConfigCamposMuestraManager() {
  const [configs, setConfigs] = useState<ConfigCampoMuestraDatabase[]>([])
  const [servicios, setServicios] = useState<ServicioDatabase[]>([])
  const [areas, setAreas] = useState<AreaDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<ConfigCampoMuestraDatabase | null>(null)
  const [filtroServicio, setFiltroServicio] = useState<string>('all')
  const [form, setForm] = useState<ConfigCampoForm>({
    config_mue_etique_vac: '',
    config_mue_tipo_dato_vac: 'texto',
    serv_id_int: ''
  })

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true)
      const [configsData, serviciosData, areasData] = await Promise.all([
        obtenerConfigCamposMuestra(),
        obtenerServicios(),
        obtenerAreas()
      ])
      setConfigs(configsData)
      setServicios(serviciosData)
      setAreas(areasData)
    } catch (error) {
      toast.error('Error al cargar datos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  const configsFiltrados = filtroServicio === 'all'
    ? configs
    : configs.filter(c => c.serv_id_int === filtroServicio)

  const handleSubmit = async () => {
    if (!form.config_mue_etique_vac.trim() || !form.serv_id_int) {
      toast.error('El nombre del campo y servicio son requeridos')
      return
    }

    try {
      setSaving(true)
      if (editingConfig) {
        await actualizarConfigCampoMuestra(editingConfig.config_mue_id_int, {
          config_mue_etique_vac: form.config_mue_etique_vac,
          config_mue_tipo_dato_vac: form.config_mue_tipo_dato_vac
        })
        toast.success('Campo actualizado')
      } else {
        await crearConfigCampoMuestra({
          config_mue_etique_vac: form.config_mue_etique_vac,
          config_mue_tipo_dato_vac: form.config_mue_tipo_dato_vac,
          serv_id_int: form.serv_id_int
        })
        toast.success('Campo creado')
      }
      setDialogOpen(false)
      setEditingConfig(null)
      setForm({ config_mue_etique_vac: '', config_mue_tipo_dato_vac: 'texto', serv_id_int: '' })
      cargarDatos()
    } catch (error) {
      toast.error('Error al guardar campo')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (config: ConfigCampoMuestraDatabase) => {
    setEditingConfig(config)
    setForm({
      config_mue_etique_vac: config.config_mue_etique_vac || '',
      config_mue_tipo_dato_vac: config.config_mue_tipo_dato_vac || 'texto',
      serv_id_int: config.serv_id_int
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await eliminarConfigCampoMuestra(id)
      toast.success('Campo eliminado')
      cargarDatos()
    } catch (error) {
      toast.error('Error al eliminar campo')
      console.error(error)
    }
  }

  const openNew = () => {
    setEditingConfig(null)
    setForm({ config_mue_etique_vac: '', config_mue_tipo_dato_vac: 'texto', serv_id_int: '' })
    setDialogOpen(true)
  }

  const getServicioNombre = (servId: string) => {
    const servicio = servicios.find(s => s.serv_id_int === servId)
    return servicio?.serv_nombre_vac || 'N/A'
  }

  const getAreaNombre = (areaId: string) => {
    const area = areas.find(a => a.area_id_int === areaId)
    return area?.area_nombre_vac || ''
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Campos de Muestra
            </CardTitle>
            <CardDescription>Configura los campos dinámicos para las muestras de cada servicio</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={filtroServicio} onValueChange={setFiltroServicio}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filtrar por servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                {servicios.map(servicio => (
                  <SelectItem key={servicio.serv_id_int} value={servicio.serv_id_int}>
                    {servicio.serv_nombre_vac}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Campo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingConfig ? 'Editar Campo' : 'Nuevo Campo de Muestra'}</DialogTitle>
                  <DialogDescription>
                    {editingConfig ? 'Modifica la configuración del campo' : 'Ingresa la configuración del nuevo campo'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="config_campo">Etiqueta del Campo</Label>
                    <Input
                      id="config_campo"
                      value={form.config_mue_etique_vac}
                      onChange={(e) => setForm({ ...form, config_mue_etique_vac: e.target.value })}
                      placeholder="Ej: Peso de la muestra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="config_servicio">Servicio</Label>
                    <Select 
                      value={form.serv_id_int || 'none'} 
                      onValueChange={(val) => setForm({ ...form, serv_id_int: val === 'none' ? '' : val })}
                      disabled={!!editingConfig}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>Seleccionar servicio</SelectItem>
                        {servicios.map(servicio => (
                          <SelectItem key={servicio.serv_id_int} value={servicio.serv_id_int}>
                            {servicio.serv_nombre_vac} - {getAreaNombre(servicio.area_id_int)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="config_tipo">Tipo de Dato</Label>
                    <Select 
                      value={form.config_mue_tipo_dato_vac} 
                      onValueChange={(val) => setForm({ ...form, config_mue_tipo_dato_vac: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIPOS_CAMPO.map(tipo => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSubmit} disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingConfig ? 'Actualizar' : 'Crear'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : configsFiltrados.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No hay campos configurados</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etiqueta</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Tipo de Dato</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configsFiltrados.map((config) => (
                <TableRow key={config.config_mue_id_int}>
                  <TableCell className="font-medium">{config.config_mue_etique_vac}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getServicioNombre(config.serv_id_int)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {TIPOS_CAMPO.find(t => t.value === config.config_mue_tipo_dato_vac)?.label || config.config_mue_tipo_dato_vac}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(config)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar campo?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el campo &quot;{config.config_mue_etique_vac}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(config.config_mue_id_int)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

// Gestión de Configuración de Anexos
function ConfigAnexosManager() {
  const [configs, setConfigs] = useState<ConfigAnexoServicioDatabase[]>([])
  const [servicios, setServicios] = useState<ServicioDatabase[]>([])
  const [areas, setAreas] = useState<AreaDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<ConfigAnexoServicioDatabase | null>(null)
  const [filtroServicio, setFiltroServicio] = useState<string>('all')
  const [form, setForm] = useState<ConfigAnexoForm>({
    config_anx_nomb_vac: '',
    config_anx_obliga_vac: 'no',
    serv_id_int: ''
  })

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true)
      const [configsData, serviciosData, areasData] = await Promise.all([
        obtenerConfigAnexosServicio(),
        obtenerServicios(),
        obtenerAreas()
      ])
      setConfigs(configsData)
      setServicios(serviciosData)
      setAreas(areasData)
    } catch (error) {
      toast.error('Error al cargar datos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  const configsFiltrados = filtroServicio === 'all'
    ? configs
    : configs.filter(c => c.serv_id_int === filtroServicio)

  const handleSubmit = async () => {
    if (!form.config_anx_nomb_vac.trim() || !form.serv_id_int) {
      toast.error('El nombre del anexo y servicio son requeridos')
      return
    }

    try {
      setSaving(true)
      if (editingConfig) {
        await actualizarConfigAnexoServicio(editingConfig.config_anx_id_int, {
          config_anx_nomb_vac: form.config_anx_nomb_vac,
          config_anx_obliga_vac: form.config_anx_obliga_vac
        })
        toast.success('Anexo actualizado')
      } else {
        await crearConfigAnexoServicio({
          config_anx_nomb_vac: form.config_anx_nomb_vac,
          config_anx_obliga_vac: form.config_anx_obliga_vac,
          serv_id_int: form.serv_id_int
        })
        toast.success('Anexo creado')
      }
      setDialogOpen(false)
      setEditingConfig(null)
      setForm({ config_anx_nomb_vac: '', config_anx_obliga_vac: 'no', serv_id_int: '' })
      cargarDatos()
    } catch (error) {
      toast.error('Error al guardar anexo')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (config: ConfigAnexoServicioDatabase) => {
    setEditingConfig(config)
    setForm({
      config_anx_nomb_vac: config.config_anx_nomb_vac || '',
      config_anx_obliga_vac: config.config_anx_obliga_vac || 'no',
      serv_id_int: config.serv_id_int
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await eliminarConfigAnexoServicio(id)
      toast.success('Anexo eliminado')
      cargarDatos()
    } catch (error) {
      toast.error('Error al eliminar anexo')
      console.error(error)
    }
  }

  const openNew = () => {
    setEditingConfig(null)
    setForm({ config_anx_nomb_vac: '', config_anx_obliga_vac: 'no', serv_id_int: '' })
    setDialogOpen(true)
  }

  const getServicioNombre = (servId: string) => {
    const servicio = servicios.find(s => s.serv_id_int === servId)
    return servicio?.serv_nombre_vac || 'N/A'
  }

  const getAreaNombre = (areaId: string) => {
    const area = areas.find(a => a.area_id_int === areaId)
    return area?.area_nombre_vac || ''
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Paperclip className="h-5 w-5" />
              Anexos por Servicio
            </CardTitle>
            <CardDescription>Configura los tipos de anexos requeridos para cada servicio</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={filtroServicio} onValueChange={setFiltroServicio}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filtrar por servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                {servicios.map(servicio => (
                  <SelectItem key={servicio.serv_id_int} value={servicio.serv_id_int}>
                    {servicio.serv_nombre_vac}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Anexo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingConfig ? 'Editar Anexo' : 'Nuevo Tipo de Anexo'}</DialogTitle>
                  <DialogDescription>
                    {editingConfig ? 'Modifica la configuración del anexo' : 'Ingresa la configuración del nuevo tipo de anexo'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="config_nomb">Nombre del Anexo</Label>
                    <Input
                      id="config_nomb"
                      value={form.config_anx_nomb_vac}
                      onChange={(e) => setForm({ ...form, config_anx_nomb_vac: e.target.value })}
                      placeholder="Ej: Fotografía de la muestra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="config_servicio">Servicio</Label>
                    <Select 
                      value={form.serv_id_int || 'none'} 
                      onValueChange={(val) => setForm({ ...form, serv_id_int: val === 'none' ? '' : val })}
                      disabled={!!editingConfig}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>Seleccionar servicio</SelectItem>
                        {servicios.map(servicio => (
                          <SelectItem key={servicio.serv_id_int} value={servicio.serv_id_int}>
                            {servicio.serv_nombre_vac} - {getAreaNombre(servicio.area_id_int)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="config_obligatorio">¿Es obligatorio?</Label>
                    <Select 
                      value={form.config_anx_obliga_vac} 
                      onValueChange={(val) => setForm({ ...form, config_anx_obliga_vac: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleSubmit} disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingConfig ? 'Actualizar' : 'Crear'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : configsFiltrados.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No hay anexos configurados</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Anexo</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Obligatorio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configsFiltrados.map((config) => (
                <TableRow key={config.config_anx_id_int}>
                  <TableCell className="font-medium">{config.config_anx_nomb_vac}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getServicioNombre(config.serv_id_int)}</Badge>
                  </TableCell>
                  <TableCell>
                    {config.config_anx_obliga_vac === 'si' ? (
                      <Badge className="bg-amber-100 text-amber-800">Sí</Badge>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(config)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar anexo?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el tipo de anexo &quot;{config.config_anx_nomb_vac}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(config.config_anx_id_int)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

// ============================================
// PÁGINA PRINCIPAL
// ============================================
export default function ConfiguracionDocumentoLabPage() {
  const [activeTab, setActiveTab] = useState('areas')

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/documentoLab">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Configuración del Sistema
            </h1>
            <p className="text-muted-foreground">Gestiona catálogos y configuraciones del módulo de documentos</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <ScrollArea className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="areas" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Áreas
            </TabsTrigger>
            <TabsTrigger value="servicios" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              Servicios
            </TabsTrigger>
            <TabsTrigger value="tipos" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tipos Doc.
            </TabsTrigger>
            <TabsTrigger value="estados" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Estados
            </TabsTrigger>
            <TabsTrigger value="campos" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Campos
            </TabsTrigger>
            <TabsTrigger value="anexos" className="flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Anexos
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        <TabsContent value="areas" className="mt-6">
          <AreasManager />
        </TabsContent>

        <TabsContent value="servicios" className="mt-6">
          <ServiciosManager />
        </TabsContent>

        <TabsContent value="tipos" className="mt-6">
          <TiposDocumentoManager />
        </TabsContent>

        <TabsContent value="estados" className="mt-6">
          <EstadosDocumentoManager />
        </TabsContent>

        <TabsContent value="campos" className="mt-6">
          <ConfigCamposMuestraManager />
        </TabsContent>

        <TabsContent value="anexos" className="mt-6">
          <ConfigAnexosManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
