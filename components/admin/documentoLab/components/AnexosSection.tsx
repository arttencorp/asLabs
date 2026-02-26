'use client'

import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Trash2, ImageIcon, Upload, Loader2, ExternalLink, Pencil, ClipboardCheck, CheckCircle2, Circle } from 'lucide-react'
import { subirImagenAnexo, eliminarImagenAnexo } from '@/lib/supabase'
import type { AnexosSectionProps, AnexoUI } from '../types'

const EXTENSIONES_PERMITIDAS = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const MAX_SIZE_MB = 10

export function AnexosSection({
  anexos,
  configAnexos,
  onAgregarAnexo,
  onActualizarAnexo,
  onEliminarAnexo,
  disabled = false
}: AnexosSectionProps) {
  // --- Estado para diálogo Agregar ---
  const [dialogOpen, setDialogOpen] = useState(false)
  const [subiendo, setSubiendo] = useState(false)
  const [errorSubida, setErrorSubida] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null)
  const [titulo, setTitulo] = useState('')
  const [nota, setNota] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // --- Estado para diálogo Editar ---
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editAnexo, setEditAnexo] = useState<AnexoUI | null>(null)
  const [editTitulo, setEditTitulo] = useState('')
  const [editNota, setEditNota] = useState('')
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null)
  const [editArchivo, setEditArchivo] = useState<File | null>(null)
  const [editSubiendo, setEditSubiendo] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  // --- Estado para eliminar ---
  const [anexoAEliminar, setAnexoAEliminar] = useState<AnexoUI | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  // ============ AGREGAR ============

  function resetDialog() {
    setArchivoSeleccionado(null)
    setPreviewUrl(null)
    setTitulo('')
    setNota('')
    setErrorSubida(null)
    setSubiendo(false)
  }

  function handleOpenDialog(open: boolean) {
    setDialogOpen(open)
    if (!open) resetDialog()
  }

  function validarArchivo(file: File): string | null {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    if (!EXTENSIONES_PERMITIDAS.includes(ext)) {
      return `Solo se permiten imágenes (${EXTENSIONES_PERMITIDAS.join(', ')})`
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `El archivo no debe superar ${MAX_SIZE_MB} MB`
    }
    return null
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setErrorSubida(null)
    if (!file) { setArchivoSeleccionado(null); setPreviewUrl(null); return }
    const err = validarArchivo(file)
    if (err) { setErrorSubida(err); return }
    setArchivoSeleccionado(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSubir() {
    if (!archivoSeleccionado) return
    try {
      setSubiendo(true)
      setErrorSubida(null)
      const result = await subirImagenAnexo(archivoSeleccionado, archivoSeleccionado.name)
      if (!result.success || !result.url) {
        setErrorSubida(result.error || 'Error desconocido al subir la imagen')
        return
      }
      onAgregarAnexo(result.url, 'imagen', titulo || undefined, nota || undefined)
      handleOpenDialog(false)
    } catch (error) {
      console.error('Error subiendo imagen:', error)
      setErrorSubida('Error al subir la imagen. Intente nuevamente.')
    } finally {
      setSubiendo(false)
    }
  }

  // ============ EDITAR ============

  function handleAbrirEditar(anexo: AnexoUI) {
    setEditAnexo(anexo)
    setEditTitulo(anexo.titulo || '')
    setEditNota(anexo.nota || '')
    setEditPreviewUrl(null)
    setEditArchivo(null)
    setEditError(null)
    setEditSubiendo(false)
    setEditDialogOpen(true)
  }

  function handleEditFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setEditError(null)
    if (!file) { setEditArchivo(null); setEditPreviewUrl(null); return }
    const err = validarArchivo(file)
    if (err) { setEditError(err); return }
    setEditArchivo(file)
    const reader = new FileReader()
    reader.onloadend = () => setEditPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function handleGuardarEdicion() {
    if (!editAnexo) return
    try {
      setEditSubiendo(true)
      setEditError(null)

      let nuevaUrl = editAnexo.url

      // Si se seleccionó una nueva imagen, subir y eliminar la anterior
      if (editArchivo) {
        const result = await subirImagenAnexo(editArchivo, editArchivo.name)
        if (!result.success || !result.url) {
          setEditError(result.error || 'Error al subir la nueva imagen')
          return
        }
        // Limpiar imagen anterior del storage
        if (editAnexo.url) {
          eliminarImagenAnexo(editAnexo.url).catch(err =>
            console.error('Error limpiando imagen anterior:', err)
          )
        }
        nuevaUrl = result.url
      }

      // Actualizar en el estado
      const campos: { url?: string; titulo?: string; nota?: string } = {}
      if (nuevaUrl !== editAnexo.url) campos.url = nuevaUrl
      campos.titulo = editTitulo || undefined
      campos.nota = editNota || undefined

      onActualizarAnexo(editAnexo.id, campos)
      setEditDialogOpen(false)
    } catch (error) {
      console.error('Error guardando edición:', error)
      setEditError('Error al guardar. Intente nuevamente.')
    } finally {
      setEditSubiendo(false)
    }
  }

  // ============ ELIMINAR ============

  function handleEliminar(anexo: AnexoUI) {
    setAnexoAEliminar(anexo)
    setConfirmDialogOpen(true)
  }

  function handleConfirmarEliminar() {
    if (anexoAEliminar) {
      onEliminarAnexo(anexoAEliminar.id)
      setAnexoAEliminar(null)
    }
    setConfirmDialogOpen(false)
  }

  // ============ SHARED: zona de subida ============

  function ZonaSubida({
    previewSrc,
    archivo,
    inputRef,
    onFileChange,
    onClear
  }: {
    previewSrc: string | null
    archivo: File | null
    inputRef: React.RefObject<HTMLInputElement>
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClear: () => void
  }) {
    return (
      <div
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {previewSrc ? (
          <div className="space-y-3">
            <img src={previewSrc} alt="Preview" className="max-h-48 mx-auto rounded-md object-contain" />
            <p className="text-xs text-muted-foreground">
              {archivo?.name} ({((archivo?.size || 0) / 1024 / 1024).toFixed(2)} MB)
            </p>
            <Button variant="outline" size="sm" type="button" onClick={(e) => { e.stopPropagation(); onClear() }}>
              Cambiar imagen
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Haga clic para seleccionar una imagen</p>
            <p className="text-xs text-muted-foreground">JPG, PNG, GIF, WebP — máx. {MAX_SIZE_MB} MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={EXTENSIONES_PERMITIDAS.map(e => `.${e}`).join(',')}
          onChange={onFileChange}
        />
      </div>
    )
  }

  // ============ RENDER ============

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Anexos — Registro Fotográfico ({anexos.length})
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Imágenes adjuntas al documento. Las notas al pie siguen formato APA 7.ª edición.
            </p>
          </div>

          {/* Botón Agregar */}
          <Dialog open={dialogOpen} onOpenChange={handleOpenDialog}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={disabled}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Imagen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Agregar Imagen al Registro Fotográfico</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Imagen *</Label>
                  <ZonaSubida
                    previewSrc={previewUrl}
                    archivo={archivoSeleccionado}
                    inputRef={fileInputRef}
                    onFileChange={handleFileChange}
                    onClear={() => {
                      setArchivoSeleccionado(null)
                      setPreviewUrl(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titulo-anexo">Título de la imagen</Label>
                  <Input
                    id="titulo-anexo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej: Colonias de hongos en medio PDA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nota-anexo">
                    Nota al pie <span className="text-muted-foreground font-normal">(formato APA 7.ª ed.)</span>
                  </Label>
                  <Textarea
                    id="nota-anexo"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Descripción de la figura, ej: Colonias de hongos observadas en medio PDA tras 7 días de incubación a 25 °C."
                    rows={3}
                  />
                  {nota && (
                    <div className="bg-muted/50 rounded-md p-3 border text-sm">
                      <p className="text-muted-foreground italic text-xs mb-1">Vista previa de nota APA:</p>
                      <p className="text-xs"><span className="italic">Nota. </span>{nota}</p>
                    </div>
                  )}
                </div>
                {errorSubida && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{errorSubida}</div>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={subiendo}>Cancelar</Button>
                </DialogClose>
                <Button onClick={handleSubir} disabled={!archivoSeleccionado || subiendo}>
                  {subiendo ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Subiendo...</>
                  ) : (
                    <><Upload className="h-4 w-4 mr-2" />Subir Imagen</>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {anexos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No hay imágenes anexas</p>
            <p className="text-sm">Agregue las figuras que aparecerán al final del documento</p>
          </div>
        ) : (
          <div className="space-y-8">
            {anexos.map((anexo, index) => (
              <div
                key={anexo.id}
                className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
              >
                {/* Imagen — ancho completo */}
                <div className="bg-muted/30">
                  <img
                    src={anexo.url}
                    alt={anexo.nota || `Figura ${index + 1}`}
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML =
                        '<div class="py-12 text-center text-muted-foreground text-sm">No se pudo cargar la imagen</div>'
                    }}
                  />
                </div>

                {/* Pie de figura — formato APA 7ª edición */}
                <div className="p-4 space-y-2">
                  <p className="text-sm font-bold">
                    Imagen {index + 1}{anexo.titulo ? `: ${anexo.titulo}` : ''}
                  </p>
                  {anexo.nota && (
                    <p className="text-sm text-muted-foreground">
                      <span className="italic">Nota. </span>
                      {anexo.nota}
                    </p>
                  )}

                  {/* Acciones */}
                  {!disabled && (
                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => window.open(anexo.url, '_blank')}>
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        Abrir
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAbrirEditar(anexo)}>
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEliminar(anexo)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Checklist de anexos esperados por el servicio */}
      {configAnexos.length > 0 && (
        <CardContent className="pt-0 pb-4">
          <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Anexos esperados para este servicio</span>
            </div>
            <div className="space-y-2">
              {configAnexos.map((cfg) => {
                const esObligatorio = cfg.config_anx_obliga_vac?.toUpperCase() === 'SI'
                // Buscar si algún anexo tiene un título que coincida (parcial)
                const cumplido = anexos.some(a =>
                  a.titulo?.toLowerCase().includes((cfg.config_anx_nomb_vac || '').toLowerCase())
                )

                return (
                  <div key={cfg.config_anx_id_int} className="flex items-center gap-2 text-sm">
                    {cumplido ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <Circle className={`h-4 w-4 shrink-0 ${esObligatorio ? 'text-red-400' : 'text-muted-foreground'}`} />
                    )}
                    <span className={cumplido ? 'text-muted-foreground line-through' : ''}>
                      {cfg.config_anx_nomb_vac}
                    </span>
                    {esObligatorio && !cumplido && (
                      <span className="text-xs text-red-500 font-medium">Obligatorio</span>
                    )}
                    {esObligatorio && cumplido && (
                      <span className="text-xs text-green-600 font-medium">✓</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      )}

      {/* Dialog Editar */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => { setEditDialogOpen(open); if (!open) setEditAnexo(null) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Figura {editAnexo ? anexos.findIndex(a => a.id === editAnexo.id) + 1 : ''}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Imagen actual + opción de reemplazar */}
            <div className="space-y-2">
              <Label>Imagen</Label>
              {editPreviewUrl || editArchivo ? (
                <ZonaSubida
                  previewSrc={editPreviewUrl}
                  archivo={editArchivo}
                  inputRef={editFileInputRef}
                  onFileChange={handleEditFileChange}
                  onClear={() => {
                    setEditArchivo(null)
                    setEditPreviewUrl(null)
                    if (editFileInputRef.current) editFileInputRef.current.value = ''
                  }}
                />
              ) : (
                <div className="space-y-3">
                  <div className="border rounded-lg overflow-hidden bg-muted/30">
                    {editAnexo && (
                      <img
                        src={editAnexo.url}
                        alt="Imagen actual"
                        className="w-full h-auto max-h-48 object-contain"
                      />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Reemplazar imagen
                  </Button>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    className="hidden"
                    accept={EXTENSIONES_PERMITIDAS.map(e => `.${e}`).join(',')}
                    onChange={handleEditFileChange}
                  />
                </div>
              )}
            </div>

            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="edit-titulo-anexo">Título de la imagen</Label>
              <Input
                id="edit-titulo-anexo"
                value={editTitulo}
                onChange={(e) => setEditTitulo(e.target.value)}
                placeholder="Ej: Colonias de hongos en medio PDA"
              />
            </div>

            {/* Nota */}
            <div className="space-y-2">
              <Label htmlFor="edit-nota-anexo">
                Nota al pie <span className="text-muted-foreground font-normal">(formato APA 7.ª ed.)</span>
              </Label>
              <Textarea
                id="edit-nota-anexo"
                value={editNota}
                onChange={(e) => setEditNota(e.target.value)}
                placeholder="Descripción de la figura..."
                rows={3}
              />
              {editNota && (
                <div className="bg-muted/50 rounded-md p-3 border text-sm">
                  <p className="text-muted-foreground italic text-xs mb-1">Vista previa de nota APA:</p>
                  <p className="text-xs"><span className="italic">Nota. </span>{editNota}</p>
                </div>
              )}
            </div>

            {editError && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{editError}</div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={editSubiendo}>Cancelar</Button>
            </DialogClose>
            <Button onClick={handleGuardarEdicion} disabled={editSubiendo}>
              {editSubiendo ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Guardando...</>
              ) : (
                'Guardar cambios'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la imagen del registro fotográfico y del almacenamiento. No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmarEliminar}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
