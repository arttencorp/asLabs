import { CONVOCATORIAS_RESULTADOS_BUCKET } from '@/lib/convocatorias-resultados'
import { supabase } from '@/lib/supabase/client'
import type {
  ConvocatoriaPublica,
  ConvocatoriaResultadoDatabase,
  ConvocatoriaResultadoPublico,
  EstadoPuesto,
  ModalidadTrabajo,
  PuestoDatabase,
} from '@/types/database'

async function obtenerUrlPublicaResultado(archivoPath: string, descargar = false): Promise<string> {
  const { data, error } = await supabase.storage
    .from(CONVOCATORIAS_RESULTADOS_BUCKET)
    .createSignedUrl(archivoPath, 60 * 15, descargar ? { download: true } : undefined)

  if (error) throw error
  return data.signedUrl
}

export async function obtenerConvocatoriasConResultadosPublicados(): Promise<ConvocatoriaPublica[]> {
  const { data: resultadosData, error: resultadosError } = await supabase
    .from('Convocatoria_Resultado')
    .select('*')
    .eq('publicado_bool', true)
    .order('etapa', { ascending: true })

  if (resultadosError) throw resultadosError

  const resultados = (resultadosData || []) as ConvocatoriaResultadoDatabase[]
  const puestoIds = Array.from(new Set(resultados.map((resultado) => resultado.puest_id_int)))

  if (puestoIds.length === 0) return []

  const [puestosResponse, modalidadesResponse, estadosResponse] = await Promise.all([
    supabase.from('Puesto').select('*').in('puest_id_int', puestoIds),
    supabase.from('modalidad_trabajo').select('*'),
    supabase.from('Estado_Puesto').select('*'),
  ])

  if (puestosResponse.error) throw puestosResponse.error
  if (modalidadesResponse.error) throw modalidadesResponse.error
  if (estadosResponse.error) throw estadosResponse.error

  const modalidades = new Map(
    ((modalidadesResponse.data || []) as ModalidadTrabajo[]).map((modalidad) => [modalidad.modalid_id_int, modalidad]),
  )
  const estados = new Map(
    ((estadosResponse.data || []) as EstadoPuesto[]).map((estado) => [estado.estpuest_id_int, estado]),
  )
  const puestos = new Map(
    ((puestosResponse.data || []) as PuestoDatabase[]).map((puesto) => [
      puesto.puest_id_int,
      {
        ...puesto,
        modalidad_trabajo: puesto.modalid_id_int ? modalidades.get(puesto.modalid_id_int) || null : null,
        Estado_Puesto: puesto.estpuest_id_int ? estados.get(puesto.estpuest_id_int) || null : null,
      },
    ]),
  )

  const resultadosConUrl = await Promise.all(
    resultados.map(async (resultado): Promise<ConvocatoriaResultadoPublico> => {
      const [archivoUrl, descargaUrl] = await Promise.all([
        obtenerUrlPublicaResultado(resultado.archivo_path),
        obtenerUrlPublicaResultado(resultado.archivo_path, true),
      ])

      return { ...resultado, archivo_url: archivoUrl, descarga_url: descargaUrl }
    }),
  )

  const porPuesto = new Map<string, ConvocatoriaPublica>()
  for (const resultado of resultadosConUrl) {
    const puesto = puestos.get(resultado.puest_id_int)
    if (!puesto) continue

    const convocatoria = porPuesto.get(resultado.puest_id_int)
    if (convocatoria) {
      convocatoria.resultados.push(resultado)
    } else {
      porPuesto.set(resultado.puest_id_int, { puesto, resultados: [resultado] })
    }
  }

  return Array.from(porPuesto.values()).sort(
    (a, b) => new Date(b.puesto.puest_created_at_dt).getTime() - new Date(a.puesto.puest_created_at_dt).getTime(),
  )
}
