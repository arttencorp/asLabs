import { useCallback, useEffect, useState } from 'react'
import {
  cambiarPublicacionResultado,
  eliminarResultadoConvocatoria,
  obtenerResultadosConvocatoria,
  subirResultadoConvocatoria,
} from '@/lib/supabase/convocatorias'
import type { ConvocatoriaEtapa, ConvocatoriaResultadoDatabase } from '@/types/database'
import { transformarError } from '@/utils'

export function useResultadosConvocatoria(puestoId: string | null, abierto: boolean) {
  const [resultados, setResultados] = useState<ConvocatoriaResultadoDatabase[]>([])
  const [loading, setLoading] = useState(false)
  const [accion, setAccion] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const cargar = useCallback(async () => {
    if (!puestoId) return
    setLoading(true)
    setError(null)
    try {
      setResultados(await obtenerResultadosConvocatoria(puestoId))
    } catch (err) {
      setError(transformarError(err, 'No se pudieron cargar los resultados'))
    } finally {
      setLoading(false)
    }
  }, [puestoId])

  useEffect(() => {
    if (abierto && puestoId) cargar()
  }, [abierto, puestoId, cargar])

  const mostrarExito = useCallback((mensaje: string) => {
    setSuccess(mensaje)
    window.setTimeout(() => setSuccess(null), 4000)
  }, [])

  const subir = useCallback(async (etapa: ConvocatoriaEtapa, archivo: File) => {
    if (!puestoId) return false
    setAccion(`subir-${etapa}`)
    setError(null)
    try {
      const guardado = await subirResultadoConvocatoria({ puestoId, etapa, archivo })
      setResultados((actuales) => [
        ...actuales.filter((item) => item.etapa !== etapa),
        guardado,
      ].sort((a, b) => a.etapa - b.etapa))
      mostrarExito('PDF guardado correctamente')
      return true
    } catch (err) {
      setError(transformarError(err, 'No se pudo guardar el PDF'))
      return false
    } finally {
      setAccion(null)
    }
  }, [puestoId, mostrarExito])

  const cambiarPublicacion = useCallback(async (resultado: ConvocatoriaResultadoDatabase, publicado: boolean) => {
    setAccion(`publicar-${resultado.etapa}`)
    setError(null)
    try {
      const actualizado = await cambiarPublicacionResultado(resultado.resultado_id, publicado)
      setResultados((actuales) => actuales.map((item) =>
        item.resultado_id === actualizado.resultado_id ? actualizado : item,
      ))
      mostrarExito(publicado ? 'Resultado publicado' : 'Resultado ocultado')
    } catch (err) {
      setError(transformarError(err, 'No se pudo cambiar la publicación'))
    } finally {
      setAccion(null)
    }
  }, [mostrarExito])

  const eliminar = useCallback(async (resultado: ConvocatoriaResultadoDatabase) => {
    setAccion(`eliminar-${resultado.etapa}`)
    setError(null)
    try {
      await eliminarResultadoConvocatoria(resultado.resultado_id)
      setResultados((actuales) => actuales.filter((item) => item.resultado_id !== resultado.resultado_id))
      mostrarExito('Resultado eliminado')
    } catch (err) {
      setError(transformarError(err, 'No se pudo eliminar el resultado'))
    } finally {
      setAccion(null)
    }
  }, [mostrarExito])

  return { resultados, loading, accion, error, success, subir, cambiarPublicacion, eliminar }
}
