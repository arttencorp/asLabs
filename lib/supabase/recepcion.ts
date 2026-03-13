import { supabase } from './client'
import type {
  AreaDatabase,
  ServicioDatabase,
  TipoDocumentoDatabase,
  OrdenServicioDatabase,
  DocumentoLabDatabase,
  Persona,
  EstadoDocumentoDatabase,
} from '@/types/database'

// ============================================
// TIPOS PARA EL MÓDULO DE RECEPCIÓN
// ============================================

export interface CotizacionRecepcion {
  cot_id_int: string
  cot_num_vac: string
  cot_fec_emis_dt: string
  cot_fec_venc_dt: string
  cot_igv_bol: boolean
  per_id_int: string
  persona?: {
    per_id_int: string
    per_nom_contac_vac: string | null
    per_email_vac: string | null
    per_telef_int: string | null
    per_direc_vac: string | null
    Persona_Natural?: Array<{
      per_nat_nomb_vac: string | null
      per_nat_apell_vac: string | null
      per_nat_dni_int: number | null
    }>
    Persona_Juridica?: Array<{
      per_jurd_razSocial_vac: string | null
      per_jurd_ruc_int: number | null
    }>
  }
  estado_cotizacion?: {
    est_cot_id_int: string
    est_cot_desc_vac: string | null
    est_cot_tipo_int: number | null
  }
  detalle_cotizacion?: Array<{
    det_cot_id_int: string
    det_cot_cant_int: number
    det_cot_prec_hist_int: number
    producto?: {
      pro_id_int: string
      pro_nomb_vac: string | null
    }
  }>
  informacion_adicional?: {
    inf_adi_plazo_vac: string | null
    forma_pago?: {
      form_pa_desc_vac: string | null
    }
  }
}

export interface OrdenServicioConDocumentos extends OrdenServicioDatabase {
  persona?: Persona | null
  documentos_lab?: DocumentoLabDatabase[]
  cotizacion?: {
    cot_id_int: string
    cot_num_vac: string
  } | null
}

// ============================================
// FUNCIONES PARA EL MÓDULO DE RECEPCIÓN
// ============================================

/** Query base de cotizaciones con relaciones */
const COTIZACION_SELECT = `
  *,
  estado_cotizacion:Estado_Cotizacion(*),
  persona:Personas(
    *,
    Persona_Natural(*),
    Persona_Juridica(*)
  ),
  detalle_cotizacion:Detalle_Cotizacion(
    *,
    producto:Productos(pro_id_int, pro_nomb_vac)
  ),
  informacion_adicional:Informacion_Adicional(
    *,
    forma_pago:Forma_Pago(*)
  )
`

/**
 * Obtener cotizaciones que YA tienen al menos una Orden_Servicio vinculada.
 * Estas son las que aparecen en la lista principal de recepción.
 */
export async function obtenerCotizacionesConOrdenes(): Promise<CotizacionRecepcion[]> {
  try {
    // 1. Obtener IDs de cotizaciones que tienen órdenes de servicio
    const { data: ordenes, error: ordError } = await supabase
      .from('Orden_Servicio')
      .select('cot_id_int')
      .not('cot_id_int', 'is', null)

    if (ordError) throw ordError

    const cotIdsConOrden = [...new Set(ordenes?.map(o => o.cot_id_int).filter(Boolean) || [])]

    if (cotIdsConOrden.length === 0) return []

    // 2. Obtener esas cotizaciones con sus relaciones
    const { data, error } = await supabase
      .from('Cotizaciones')
      .select(COTIZACION_SELECT)
      .in('cot_id_int', cotIdsConOrden)
      .order('cot_fec_emis_dt', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo cotizaciones con órdenes:', error)
    throw error
  }
}

/**
 * Obtener cotizaciones que NO tienen ninguna Orden_Servicio vinculada.
 * Estas son las que aparecen en el buscador para crear un nuevo ingreso.
 */
export async function obtenerCotizacionesSinOrdenes(): Promise<CotizacionRecepcion[]> {
  try {
    // 1. Obtener IDs de cotizaciones que ya tienen órdenes
    const { data: ordenes, error: ordError } = await supabase
      .from('Orden_Servicio')
      .select('cot_id_int')
      .not('cot_id_int', 'is', null)

    if (ordError) throw ordError

    const cotIdsConOrden = new Set(ordenes?.map(o => o.cot_id_int).filter(Boolean) || [])

    // 2. Obtener TODAS las cotizaciones
    const { data: todasCotizaciones, error: cotError } = await supabase
      .from('Cotizaciones')
      .select(COTIZACION_SELECT)
      .order('cot_fec_emis_dt', { ascending: false })

    if (cotError) throw cotError

    // 3. Filtrar las que NO tienen órdenes
    const disponibles = (todasCotizaciones || []).filter(
      c => !cotIdsConOrden.has(c.cot_id_int)
    )

    return disponibles
  } catch (error) {
    console.error('Error obteniendo cotizaciones sin órdenes:', error)
    throw error
  }
}

/**
 * Obtener una cotización específica con todas sus órdenes de servicio.
 */
export async function obtenerCotizacionConOrdenes(cotId: string): Promise<{
  cotizacion: CotizacionRecepcion
  ordenes: OrdenServicioConDocumentos[]
}> {
  try {
    // 1. Obtener cotización con relaciones
    const { data: cotizacion, error: cotError } = await supabase
      .from('Cotizaciones')
      .select(`
        *,
        estado_cotizacion:Estado_Cotizacion(*),
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        detalle_cotizacion:Detalle_Cotizacion(
          *,
          producto:Productos(pro_id_int, pro_nomb_vac)
        ),
        informacion_adicional:Informacion_Adicional(
          *,
          forma_pago:Forma_Pago(*)
        )
      `)
      .eq('cot_id_int', cotId)
      .single()

    if (cotError) throw cotError

    // 2. Obtener órdenes de servicio vinculadas
    const { data: ordenes, error: ordError } = await supabase
      .from('Orden_Servicio')
      .select(`
        *,
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        documentos_lab:Documento_Lab(
          *,
          servicio:Servicios(*,
            area:Areas(*)
          ),
          tipo_documento:Tipo_Documento(*),
          estado_documento:Estado_Documento(*),
          muestras:Muestras(*)
        )
      `)
      .eq('cot_id_int', cotId)
      .order('ord_serv_fec_recep_dt', { ascending: false })

    if (ordError) throw ordError

    return {
      cotizacion,
      ordenes: ordenes || []
    }
  } catch (error) {
    console.error('Error obteniendo cotización con órdenes:', error)
    throw error
  }
}

/**
 * Obtener detalle de una orden de servicio con sus documentos de laboratorio.
 */
export async function obtenerOrdenServicioDetalle(ordId: string): Promise<OrdenServicioConDocumentos> {
  try {
    const { data, error } = await supabase
      .from('Orden_Servicio')
      .select(`
        *,
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        cotizacion:Cotizaciones(
          cot_id_int,
          cot_num_vac
        ),
        documentos_lab:Documento_Lab(
          *,
          servicio:Servicios(*,
            area:Areas(*)
          ),
          tipo_documento:Tipo_Documento(*),
          estado_documento:Estado_Documento(*),
          muestras:Muestras(*,
            atributos:Atributo_Muestra_Valor(*,
              config:Config_Campo_Muestra(*)
            )
          ),
          resultados:Resultado_Ensayo(*),
          agentes:Agente_Identificado(*),
          anexos:Anexos_Documento(*)
        )
      `)
      .eq('ord_serv_id_int', ordId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error obteniendo detalle de orden de servicio:', error)
    throw error
  }
}

/**
 * Crear nueva orden de servicio vinculada a una cotización.
 */
export async function crearOrdenServicioParaCotizacion(
  cotId: string,
  perId: string
): Promise<OrdenServicioDatabase> {
  try {
    const { data, error } = await supabase
      .from('Orden_Servicio')
      .insert({
        per_id_int: perId,
        cot_id_int: cotId,
        ord_serv_fec_recep_dt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando orden de servicio:', error)
    throw error
  }
}

/**
 * Crear un documento de laboratorio para una orden de servicio existente.
 * A diferencia de crearDocumentoLab (en documentos-lab.ts), no crea una nueva Orden_Servicio.
 */
export async function crearDocumentoLabParaOrden(params: {
  ord_serv_id_int: string
  serv_id_int: string
  tip_doc_id_int: string
  doc_lab_emision_dt?: string | null
}): Promise<DocumentoLabDatabase> {
  try {
    // 1. Generar código de documento
    const { data: tipoDoc } = await supabase
      .from('Tipo_Documento')
      .select('tip_doc_cod_vac')
      .eq('tip_doc_id_int', params.tip_doc_id_int)
      .single()

    const prefijo = tipoDoc?.tip_doc_cod_vac || 'DOC'
    const año = new Date().getFullYear()

    const { count } = await supabase
      .from('Documento_Lab')
      .select('*', { count: 'exact', head: true })
      .eq('tip_doc_id_int', params.tip_doc_id_int)
      .gte('doc_lab_created_dt', `${año}-01-01`)
      .lt('doc_lab_created_dt', `${año + 1}-01-01`)

    const secuencial = String((count || 0) + 1).padStart(4, '0')
    const codigo = `${prefijo}-${año}-${secuencial}`

    // 2. Obtener estado inicial (borrador)
    const { data: estadoInicial } = await supabase
      .from('Estado_Documento')
      .select('est_doc_id_int')
      .ilike('est_doc_nomb_vac', '%borrador%')
      .single()

    // 3. Crear documento
    const { data, error } = await supabase
      .from('Documento_Lab')
      .insert({
        doc_lab_cod_vac: codigo,
        doc_lab_emision_dt: params.doc_lab_emision_dt || null,
        serv_id_int: params.serv_id_int,
        ord_serv_id_int: params.ord_serv_id_int,
        tip_doc_id_int: params.tip_doc_id_int,
        est_doc_id_int: estadoInicial?.est_doc_id_int || null
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando documento de laboratorio para orden:', error)
    throw error
  }
}

/**
 * Obtener catálogos necesarios para crear documentos (áreas, servicios, tipos).
 */
export async function obtenerCatalogosRecepcion() {
  try {
    const [areasRes, tiposRes] = await Promise.all([
      supabase.from('Areas').select(`*, servicios:Servicios(*)`).order('area_nombre_vac'),
      supabase.from('Tipo_Documento').select('*').order('tip_doc_nomb_vac')
    ])

    if (areasRes.error) throw areasRes.error
    if (tiposRes.error) throw tiposRes.error

    return {
      areas: areasRes.data || [],
      tiposDocumento: tiposRes.data || []
    }
  } catch (error) {
    console.error('Error obteniendo catálogos de recepción:', error)
    throw error
  }
}

/**
 * Obtener estados de documento (para selects en la UI)
 */
export async function obtenerEstadosDocumentoRecepcion(): Promise<EstadoDocumentoDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Estado_Documento')
      .select('*')
      .order('est_doc_ord_int', { ascending: true, nullsFirst: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo estados de documento:', error)
    throw error
  }
}

// ============================================
// HELPERS
// ============================================

/**
 * Obtener nombre presentable de una persona (natural o jurídica).
 */
export function obtenerNombrePersona(persona?: {
  per_nom_contac_vac?: string | null
  Persona_Natural?: Array<{
    per_nat_nomb_vac: string | null
    per_nat_apell_vac: string | null
  }>
  Persona_Juridica?: Array<{
    per_jurd_razSocial_vac: string | null
  }>
} | null): string {
  if (!persona) return 'Sin cliente'

  // Priorizar persona jurídica
  if (persona.Persona_Juridica?.length && persona.Persona_Juridica[0]?.per_jurd_razSocial_vac) {
    return persona.Persona_Juridica[0].per_jurd_razSocial_vac
  }

  // Persona natural
  if (persona.Persona_Natural?.length) {
    const nat = persona.Persona_Natural[0]
    const nombre = [nat?.per_nat_nomb_vac, nat?.per_nat_apell_vac].filter(Boolean).join(' ')
    if (nombre) return nombre
  }

  // Fallback al nombre de contacto
  return persona.per_nom_contac_vac || 'Sin nombre'
}
