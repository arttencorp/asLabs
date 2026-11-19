'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Clock3, Eye, FileText, Loader2, Trash2, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
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
import { CONVOCATORIA_ETAPAS, obtenerUrlResultado } from '@/lib/supabase/convocatorias'
import type { ConvocatoriaEtapa, ConvocatoriaResultadoDatabase, PuestoDatabase } from '@/types/database'
import { useResultadosConvocatoria } from '../hooks/useResultadosConvocatoria'

interface ResultadosDialogProps {
  puesto: PuestoDatabase | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResultadosDialog({ puesto, open, onOpenChange }: ResultadosDialogProps) {
  const [archivos, setArchivos] = useState<Partial<Record<ConvocatoriaEtapa, File>>>({})
  const [aEliminar, setAEliminar] = useState<ConvocatoriaResultadoDatabase | null>(null)
  const [abriendo, setAbriendo] = useState<string | null>(null)
  const { resultados, loading, accion, error, success, subir, cambiarPublicacion, eliminar } =
    useResultadosConvocatoria(puesto?.puest_id_int || null, open)

  const porEtapa = useMemo(
    () => new Map(resultados.map((resultado) => [resultado.etapa, resultado])),
    [resultados],
  )

  useEffect(() => {
    if (!open) {
      setArchivos({})
      setAEliminar(null)
    }
  }, [open])

  const guardarArchivo = async (etapa: ConvocatoriaEtapa) => {
    const archivo = archivos[etapa]
    if (!archivo) return
    if (await subir(etapa, archivo)) {
      setArchivos((actuales) => ({ ...actuales, [etapa]: undefined }))
    }
  }

  const abrirPdf = async (resultado: ConvocatoriaResultadoDatabase) => {
    setAbriendo(resultado.resultado_id)
    try {
      const url = await obtenerUrlResultado(resultado.archivo_path, true)
      window.open(url, '_blank', 'noopener,noreferrer')
    } finally {
      setAbriendo(null)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resultados de la convocatoria</DialogTitle>
            <DialogDescription>
              {puesto?.puest_nom_vac}. Carga un PDF por etapa y publícalo cuando esté listo.
            </DialogDescription>
          </DialogHeader>

          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-green-700" /></div>
          ) : (
            <div className="space-y-3">
              {CONVOCATORIA_ETAPAS.map((etapa) => {
                const resultado = porEtapa.get(etapa.id)
                const archivo = archivos[etapa.id]
                const ocupada = accion?.endsWith(`-${etapa.id}`)
                return (
                  <section key={etapa.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex min-w-0 gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-100 text-xs font-bold text-green-800">
                          {etapa.id}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900">{etapa.titulo}</h3>
                          <p className="mt-1 text-xs text-gray-500">{etapa.descripcion}</p>
                          {resultado && (
                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                              <FileText className="h-4 w-4 text-red-600" />
                              <span className="max-w-[280px] truncate font-medium">{resultado.archivo_nombre}</span>
                              <span className="text-gray-400">Actualizado {format(new Date(resultado.updated_at_dt), "dd MMM yyyy, HH:mm", { locale: es })}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        {resultado && (
                          <>
                            <div className="mr-1 flex items-center gap-2 rounded-lg border px-3 py-2">
                              {resultado.publicado_bool ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Clock3 className="h-4 w-4 text-amber-600" />}
                              <span className="text-xs font-medium">{resultado.publicado_bool ? 'Publicado' : 'Oculto'}</span>
                              <Switch
                                checked={resultado.publicado_bool}
                                disabled={!!ocupada}
                                onCheckedChange={(checked) => cambiarPublicacion(resultado, checked)}
                                aria-label={`Publicar ${etapa.titulo}`}
                              />
                            </div>
                            <Button variant="outline" size="sm" onClick={() => abrirPdf(resultado)} disabled={abriendo === resultado.resultado_id}>
                              {abriendo === resultado.resultado_id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                              <span className="ml-1">Ver</span>
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => setAEliminar(resultado)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center">
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        className="block min-w-0 flex-1 text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                        onChange={(event) => setArchivos((actuales) => ({
                          ...actuales,
                          [etapa.id]: event.target.files?.[0],
                        }))}
                      />
                      <Button size="sm" onClick={() => guardarArchivo(etapa.id)} disabled={!archivo || !!ocupada} className="bg-green-700 hover:bg-green-800">
                        {ocupada ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {resultado ? 'Reemplazar PDF' : 'Subir PDF'}
                      </Button>
                    </div>
                  </section>
                )
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!aEliminar} onOpenChange={(isOpen) => !isOpen && setAEliminar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar resultado</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará el PDF de “{aEliminar?.titulo}”. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (aEliminar) await eliminar(aEliminar)
                setAEliminar(null)
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
