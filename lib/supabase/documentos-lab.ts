import { supabase, cleanData, createAuthenticatedClient } from './client'
import type {
  AreaDatabase,
  ServicioDatabase,
  TipoDocumentoDatabase,
  EstadoDocumentoDatabase,
  OrdenServicioDatabase,
  DocumentoLabDatabase,
  MuestraDatabase,
  ResultadoEnsayoDatabase,
  ResultadoNotaDatabase,
  AnexoDocumentoDatabase,
  AgenteIdentificadoDatabase,
  ConfigCampoMuestraDatabase,
  ConfigAnexoServicioDatabase,
  DocumentoLabForm,
  MuestraForm,
  ResultadoEnsayoForm,
  AgenteIdentificadoForm,
  DocumentoLabCompletoForm
} from '@/types/database'

// ============================================
// FUNCIONES PARA ÁREAS
// ============================================

export async function obtenerAreas(): Promise<AreaDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Areas')
      .select('*')
      .order('area_nombre_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo áreas:', error)
    throw error
  }
}

export async function crearArea(nombre: string): Promise<AreaDatabase> {
  try {
    const { data, error } = await supabase
      .from('Areas')
      .insert({ area_nombre_vac: nombre })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando área:', error)
    throw error
  }
}

export async function actualizarArea(id: string, nombre: string): Promise<AreaDatabase> {
  try {
    const { data, error } = await supabase
      .from('Areas')
      .update({ area_nombre_vac: nombre })
      .eq('area_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando área:', error)
    throw error
  }
}

export async function eliminarArea(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Areas')
      .delete()
      .eq('area_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando área:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA SERVICIOS
// ============================================

export async function obtenerServicios(areaId?: string): Promise<ServicioDatabase[]> {
  try {
    let query = supabase
      .from('Servicios')
      .select(`
        *,
        area:Areas(*)
      `)
    
    if (areaId) {
      query = query.eq('area_id_int', areaId)
    }
    
    const { data, error } = await query.order('serv_nombre_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo servicios:', error)
    throw error
  }
}

export async function obtenerServiciosPorArea(areaId: string): Promise<ServicioDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Servicios')
      .select(`
        *,
        area:Areas(*)
      `)
      .eq('area_id_int', areaId)
      .order('serv_nombre_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo servicios por área:', error)
    throw error
  }
}

export async function crearServicio(servicioData: {
  serv_nombre_vac: string
  serv_costo_int?: number
  area_id_int: string
}): Promise<ServicioDatabase> {
  try {
    const { data, error } = await supabase
      .from('Servicios')
      .insert(cleanData(servicioData))
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando servicio:', error)
    throw error
  }
}

export async function actualizarServicio(id: string, servicioData: {
  serv_nombre_vac?: string
  serv_costo_int?: number
  area_id_int?: string
}): Promise<ServicioDatabase> {
  try {
    const { data, error } = await supabase
      .from('Servicios')
      .update(cleanData(servicioData))
      .eq('serv_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando servicio:', error)
    throw error
  }
}

export async function eliminarServicio(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Servicios')
      .delete()
      .eq('serv_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando servicio:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA TIPOS DE DOCUMENTO
// ============================================

export async function obtenerTiposDocumento(): Promise<TipoDocumentoDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Tipo_Documento')
      .select('*')
      .order('tip_doc_nomb_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo tipos de documento:', error)
    throw error
  }
}

export async function crearTipoDocumento(tipoData: {
  tip_doc_nomb_vac: string
  tip_doc_cod_vac?: string
}): Promise<TipoDocumentoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Tipo_Documento')
      .insert(cleanData(tipoData))
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando tipo de documento:', error)
    throw error
  }
}

export async function actualizarTipoDocumento(id: string, tipoData: {
  tip_doc_nomb_vac?: string
  tip_doc_cod_vac?: string
}): Promise<TipoDocumentoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Tipo_Documento')
      .update(cleanData(tipoData))
      .eq('tip_doc_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando tipo de documento:', error)
    throw error
  }
}

export async function eliminarTipoDocumento(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Tipo_Documento')
      .delete()
      .eq('tip_doc_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando tipo de documento:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA ESTADOS DE DOCUMENTO
// ============================================

export async function obtenerEstadosDocumento(): Promise<EstadoDocumentoDatabase[]> {
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

export async function crearEstadoDocumento(estadoData: {
  est_doc_nomb_vac: string
  est_doc_ord_int?: number | null
}): Promise<EstadoDocumentoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Estado_Documento')
      .insert(cleanData(estadoData))
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando estado de documento:', error)
    throw error
  }
}

export async function actualizarEstadoDocumento(id: string, estadoData: {
  est_doc_nomb_vac?: string
  est_doc_ord_int?: number | null
}): Promise<EstadoDocumentoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Estado_Documento')
      .update(cleanData(estadoData))
      .eq('est_doc_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando estado de documento:', error)
    throw error
  }
}

export async function eliminarEstadoDocumento(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Estado_Documento')
      .delete()
      .eq('est_doc_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando estado de documento:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA ORDEN DE SERVICIO
// ============================================

export async function crearOrdenServicio(ordenData: {
  per_id_int: string
  cot_id_int?: string
}): Promise<OrdenServicioDatabase> {
  try {
    const { data, error } = await supabase
      .from('Orden_Servicio')
      .insert({
        per_id_int: ordenData.per_id_int,
        cot_id_int: ordenData.cot_id_int || null,
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

// ============================================
// FUNCIONES PARA DOCUMENTOS DE LABORATORIO
// ============================================

export async function obtenerDocumentosLab(filtros?: {
  servicioId?: string
  estadoId?: string
  tipoDocumentoId?: string
  areaId?: string
}): Promise<DocumentoLabDatabase[]> {
  try {
    let query = supabase
      .from('Documento_Lab')
      .select(`
        *,
        servicio:Servicios(*,
          area:Areas(*)
        ),
        orden_servicio:Orden_Servicio(*,
          persona:Personas(*,
            persona_natural:Persona_Natural(*),
            persona_juridica:Persona_Juridica(*)
          )
        ),
        tipo_documento:Tipo_Documento(*),
        estado_documento:Estado_Documento(*),
        muestras:Muestras(*),
        resultados:Resultado_Ensayo(*),
        anexos:Anexos_Documento(*),
        agentes:Agente_Identificado(*)
      `)

    if (filtros?.servicioId) {
      query = query.eq('serv_id_int', filtros.servicioId)
    }
    if (filtros?.estadoId) {
      query = query.eq('est_doc_id_int', filtros.estadoId)
    }
    if (filtros?.tipoDocumentoId) {
      query = query.eq('tip_doc_id_int', filtros.tipoDocumentoId)
    }

    const { data, error } = await query.order('doc_lab_created_dt', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo documentos de laboratorio:', error)
    throw error
  }
}

export async function obtenerDocumentoLabPorId(id: string): Promise<DocumentoLabDatabase | null> {
  try {
    const { data, error } = await supabase
      .from('Documento_Lab')
      .select(`
        *,
        servicio:Servicios(*,
          area:Areas(*)
        ),
        orden_servicio:Orden_Servicio(*,
          persona:Personas(*,
            persona_natural:Persona_Natural(*),
            persona_juridica:Persona_Juridica(*)
          )
        ),
        tipo_documento:Tipo_Documento(*),
        estado_documento:Estado_Documento(*),
        muestras:Muestras(*,
          atributos:Atributo_Muestra_Valor(*,
            config:Config_Campo_Muestra(*)
          )
        ),
        resultados:Resultado_Ensayo(*,
          notas:Resultado_Nota(*)
        ),
        anexos:Anexos_Documento(*),
        agentes:Agente_Identificado(*)
      `)
      .eq('doc_lab_id_int', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error obteniendo documento de laboratorio:', error)
    throw error
  }
}

export async function generarCodigoDocumento(tipoDocId: string): Promise<string> {
  try {
    // Obtener el tipo de documento para el prefijo
    const { data: tipoDoc } = await supabase
      .from('Tipo_Documento')
      .select('tip_doc_cod_vac')
      .eq('tip_doc_id_int', tipoDocId)
      .single()

    const prefijo = tipoDoc?.tip_doc_cod_vac || 'DOC'
    const año = new Date().getFullYear()
    
    // Contar documentos del año actual con este tipo
    const { count } = await supabase
      .from('Documento_Lab')
      .select('*', { count: 'exact', head: true })
      .eq('tip_doc_id_int', tipoDocId)
      .gte('doc_lab_created_dt', `${año}-01-01`)
      .lt('doc_lab_created_dt', `${año + 1}-01-01`)

    const secuencial = String((count || 0) + 1).padStart(4, '0')
    return `${prefijo}-${año}-${secuencial}`
  } catch (error) {
    console.error('Error generando código de documento:', error)
    // Fallback
    return `DOC-${Date.now()}`
  }
}

export async function crearDocumentoLab(formData: DocumentoLabCompletoForm): Promise<DocumentoLabDatabase> {
  try {
    const { documento, muestras, resultados, agentes, anexos } = formData

    // 1. Crear orden de servicio
    const orden = await crearOrdenServicio({
      per_id_int: documento.per_id_int
    })

    // 2. Generar código de documento
    const codigo = await generarCodigoDocumento(documento.tip_doc_id_int)

    // 3. Obtener estado inicial (borrador o pendiente)
    const { data: estadoInicial } = await supabase
      .from('Estado_Documento')
      .select('est_doc_id_int')
      .ilike('est_doc_nomb_vac', '%borrador%')
      .single()

    // 4. Crear documento principal
    const { data: docLab, error: docError } = await supabase
      .from('Documento_Lab')
      .insert({
        doc_lab_cod_vac: codigo,
        doc_lab_emision_dt: documento.doc_lab_emision_dt || null,
        serv_id_int: documento.serv_id_int,
        ord_serv_id_int: orden.ord_serv_id_int,
        tip_doc_id_int: documento.tip_doc_id_int,
        est_doc_id_int: estadoInicial?.est_doc_id_int || null
      })
      .select()
      .single()

    if (docError) throw docError

    // 5. Crear muestras y obtener mapeo de IDs temporales a IDs reales
    const muestraIdMap: Record<string, string> = {}
    
    if (muestras && muestras.length > 0) {
      for (let index = 0; index < muestras.length; index++) {
        const m = muestras[index]
        const muestraData = {
          ...cleanData({ ...m, _tempId: undefined }), // Excluir _tempId del insert
          mue_lab_cod_vac: m.mue_lab_cod_vac || `${codigo}-M${String(index + 1).padStart(2, '0')}`,
          doc_lab_id_int: docLab.doc_lab_id_int
        }
        
        const { data: muestraCreada, error: mueError } = await supabase
          .from('Muestras')
          .insert(muestraData)
          .select('mue_id_int')
          .single()
        
        if (mueError) throw mueError
        
        // Guardar mapeo de ID temporal a ID real
        if (m._tempId && muestraCreada) {
          muestraIdMap[m._tempId] = muestraCreada.mue_id_int
        }

        // Guardar atributos dinámicos EAV si existen
        if (m._atributosDinamicos && muestraCreada) {
          const filas = Object.entries(m._atributosDinamicos)
            .filter(([, valor]) => valor !== '' && valor != null)
            .map(([configCampoId, valor]) => ({
              config_mue_id_int: configCampoId,
              mue_id_int: muestraCreada.mue_id_int,
              atr_mue_valor_vac: valor
            }))
          if (filas.length > 0) {
            const { error: attrError } = await supabase
              .from('Atributo_Muestra_Valor')
              .insert(filas)
            if (attrError) console.error('Error creando atributos de muestra:', attrError)
          }
        }
      }
    }

    // 6. Crear resultados (usando el mapeo de IDs)
    if (resultados && resultados.length > 0) {
      const resultadosData = resultados.map(r => {
        const cleaned = cleanData(r)
        // Traducir mue_id_int temporal a ID real si existe en el mapeo
        const mueIdReal = r.mue_id_int && muestraIdMap[r.mue_id_int] 
          ? muestraIdMap[r.mue_id_int] 
          : (r.mue_id_int?.startsWith('temp_') ? null : r.mue_id_int)
        
        return {
          ...cleaned,
          mue_id_int: mueIdReal || null,
          doc_lab_id_int: docLab.doc_lab_id_int
        }
      })

      const { error: resError } = await supabase
        .from('Resultado_Ensayo')
        .insert(resultadosData)

      if (resError) throw resError
    }

    // 7. Crear agentes identificados (usando el mapeo de IDs)
    if (agentes && agentes.length > 0) {
      const agentesData = agentes.map(a => {
        const cleaned = cleanData(a)
        // Traducir mue_id_int temporal a ID real si existe en el mapeo
        const mueIdReal = a.mue_id_int && muestraIdMap[a.mue_id_int] 
          ? muestraIdMap[a.mue_id_int] 
          : (a.mue_id_int?.startsWith('temp_') ? null : a.mue_id_int)
        
        return {
          ...cleaned,
          mue_id_int: mueIdReal || null,
          doc_lab_id_int: docLab.doc_lab_id_int
        }
      })

      const { error: agenError } = await supabase
        .from('Agente_Identificado')
        .insert(agentesData)

      if (agenError) throw agenError
    }

    // 8. Crear anexos
    console.log('[crearDocumentoLab] Paso 8 - anexos recibidos:', anexos?.length, JSON.stringify(anexos, null, 2))
    if (anexos && anexos.length > 0) {
      const anexosData = anexos.map(a => ({
        anx_doc_url_blob: a.url,
        anx_doc_tipo_vac: a.tipo,
        anx_doc_titulo_vac: a.titulo || null,
        anx_doc_nota_vac: a.nota || null,
        doc_lab_id_int: docLab.doc_lab_id_int
      }))

      console.log('[crearDocumentoLab] Insertando anexosData:', JSON.stringify(anexosData, null, 2))
      const { data: anxData, error: anxError } = await supabase
        .from('Anexos_Documento')
        .insert(anexosData)
        .select()

      console.log('[crearDocumentoLab] Resultado insert anexos - data:', anxData, 'error:', anxError)
      if (anxError) throw anxError
    } else {
      console.log('[crearDocumentoLab] NO hay anexos para insertar')
    }

    // Retornar documento completo
    return await obtenerDocumentoLabPorId(docLab.doc_lab_id_int) as DocumentoLabDatabase
  } catch (error) {
    console.error('Error creando documento de laboratorio:', error)
    throw error
  }
}

export async function actualizarEstadoEnDocumento(
  docId: string, 
  estadoId: string
): Promise<DocumentoLabDatabase> {
  try {
    const { data, error } = await supabase
      .from('Documento_Lab')
      .update({
        est_doc_id_int: estadoId,
        doc_lab_updt_dt: new Date().toISOString()
      })
      .eq('doc_lab_id_int', docId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando estado de documento:', error)
    throw error
  }
}

export async function actualizarDocumentoLab(
  docId: string,
  documentoData: Partial<{
    tip_doc_id_int: string
    serv_id_int: string
    est_doc_id_int: string
    doc_lab_emision_dt: string
  }>
): Promise<DocumentoLabDatabase> {
  try {
    const { data, error } = await supabase
      .from('Documento_Lab')
      .update({
        ...cleanData(documentoData),
        doc_lab_updt_dt: new Date().toISOString()
      })
      .eq('doc_lab_id_int', docId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando documento de laboratorio:', error)
    throw error
  }
}

export async function emitirDocumento(docId: string): Promise<DocumentoLabDatabase> {
  try {
    // Obtener estado "emitido"
    const { data: estadoEmitido } = await supabase
      .from('Estado_Documento')
      .select('est_doc_id_int')
      .ilike('est_doc_nomb_vac', '%emitido%')
      .single()

    const { data, error } = await supabase
      .from('Documento_Lab')
      .update({
        est_doc_id_int: estadoEmitido?.est_doc_id_int,
        doc_lab_emision_dt: new Date().toISOString(),
        doc_lab_updt_dt: new Date().toISOString()
      })
      .eq('doc_lab_id_int', docId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error emitiendo documento:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA MUESTRAS
// ============================================

export async function agregarMuestra(
  docLabId: string, 
  muestraData: MuestraForm
): Promise<MuestraDatabase> {
  try {
    // Obtener conteo actual de muestras para generar código
    const { count } = await supabase
      .from('Muestras')
      .select('*', { count: 'exact', head: true })
      .eq('doc_lab_id_int', docLabId)

    const { data: doc } = await supabase
      .from('Documento_Lab')
      .select('doc_lab_cod_vac')
      .eq('doc_lab_id_int', docLabId)
      .single()

    const codigoMuestra = muestraData.mue_lab_cod_vac || 
      `${doc?.doc_lab_cod_vac || 'MUE'}-M${String((count || 0) + 1).padStart(2, '0')}`

    const { data, error } = await supabase
      .from('Muestras')
      .insert({
        ...cleanData(muestraData),
        mue_lab_cod_vac: codigoMuestra,
        doc_lab_id_int: docLabId
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error agregando muestra:', error)
    throw error
  }
}

export async function actualizarMuestra(
  muestraId: string, 
  muestraData: Partial<MuestraForm>
): Promise<MuestraDatabase> {
  try {
    const { data, error } = await supabase
      .from('Muestras')
      .update({
        ...cleanData(muestraData),
        mue_updt_dt: new Date().toISOString()
      })
      .eq('mue_id_int', muestraId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando muestra:', error)
    throw error
  }
}

export async function rechazarMuestra(
  muestraId: string, 
  motivo: string
): Promise<MuestraDatabase> {
  try {
    const { data, error } = await supabase
      .from('Muestras')
      .update({
        mue_rechazada_bol: true,
        mue_motiv_rech_vac: motivo,
        mue_updt_dt: new Date().toISOString()
      })
      .eq('mue_id_int', muestraId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error rechazando muestra:', error)
    throw error
  }
}

export async function eliminarMuestra(muestraId: string): Promise<void> {
  try {
    // Primero eliminar resultados y agentes asociados
    await supabase
      .from('Resultado_Ensayo')
      .delete()
      .eq('mue_id_int', muestraId)
    
    await supabase
      .from('Agente_Identificado')
      .delete()
      .eq('mue_id_int', muestraId)

    // Eliminar atributos de muestra
    await supabase
      .from('Atributo_Muestra_Valor')
      .delete()
      .eq('mue_id_int', muestraId)

    // Eliminar la muestra
    const { error } = await supabase
      .from('Muestras')
      .delete()
      .eq('mue_id_int', muestraId)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando muestra:', error)
    throw error
  }
}

/**
 * Guardar atributos dinámicos de una muestra (patrón EAV).
 * Estrategia: borrar existentes + re-insertar (upsert simple).
 */
export async function guardarAtributosMuestra(
  muestraId: string,
  atributos: Record<string, string> // configCampoId → valor
): Promise<void> {
  try {
    // 1. Eliminar todos los atributos previos de esta muestra
    await supabase
      .from('Atributo_Muestra_Valor')
      .delete()
      .eq('mue_id_int', muestraId)

    // 2. Insertar solo los que tienen valor no vacío
    const filas = Object.entries(atributos)
      .filter(([, valor]) => valor !== '' && valor != null)
      .map(([configCampoId, valor]) => ({
        config_mue_id_int: configCampoId,
        mue_id_int: muestraId,
        atr_mue_valor_vac: valor
      }))

    if (filas.length > 0) {
      const { error } = await supabase
        .from('Atributo_Muestra_Valor')
        .insert(filas)

      if (error) throw error
    }
  } catch (error) {
    console.error('Error guardando atributos de muestra:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA RESULTADOS DE ENSAYO
// ============================================

export async function agregarResultado(
  docLabId: string, 
  resultadoData: ResultadoEnsayoForm
): Promise<ResultadoEnsayoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Resultado_Ensayo')
      .insert({
        ...cleanData(resultadoData),
        doc_lab_id_int: docLabId
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error agregando resultado:', error)
    throw error
  }
}

export async function actualizarResultado(
  resultadoId: string, 
  resultadoData: Partial<ResultadoEnsayoForm>
): Promise<ResultadoEnsayoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Resultado_Ensayo')
      .update({
        ...cleanData(resultadoData),
        res_ens_updt_dt: new Date().toISOString()
      })
      .eq('res_ens_id_int', resultadoId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando resultado:', error)
    throw error
  }
}

export async function eliminarResultado(resultadoId: string): Promise<void> {
  try {
    // Primero eliminar notas asociadas
    await supabase
      .from('Resultado_Nota')
      .delete()
      .eq('res_ens_id_int', resultadoId)

    const { error } = await supabase
      .from('Resultado_Ensayo')
      .delete()
      .eq('res_ens_id_int', resultadoId)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando resultado:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA NOTAS DE RESULTADO
// ============================================

export async function agregarNotaResultado(
  resultadoId: string,
  contenido: string
): Promise<ResultadoNotaDatabase> {
  try {
    const { data, error } = await supabase
      .from('Resultado_Nota')
      .insert({
        resul_not_cont_vac: contenido,
        res_ens_id_int: resultadoId
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error agregando nota:', error)
    throw error
  }
}

export async function actualizarNotaResultado(
  notaId: string,
  datos: { resul_not_cont_vac?: string; res_ens_id_int?: string }
): Promise<ResultadoNotaDatabase> {
  try {
    const { data, error } = await supabase
      .from('Resultado_Nota')
      .update({
        ...datos,
        resul_not_updt_dt: new Date().toISOString()
      })
      .eq('resul_not_id_int', notaId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando nota:', error)
    throw error
  }
}

export async function eliminarNotaResultado(notaId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Resultado_Nota')
      .delete()
      .eq('resul_not_id_int', notaId)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando nota:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA AGENTES IDENTIFICADOS
// ============================================

export async function agregarAgente(
  docLabId: string, 
  agenteData: AgenteIdentificadoForm
): Promise<AgenteIdentificadoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Agente_Identificado')
      .insert({
        ...cleanData(agenteData),
        doc_lab_id_int: docLabId
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error agregando agente:', error)
    throw error
  }
}

export async function actualizarAgente(
  agenteId: string,
  agenteData: Partial<AgenteIdentificadoForm>
): Promise<AgenteIdentificadoDatabase> {
  try {
    const { data, error } = await supabase
      .from('Agente_Identificado')
      .update({
        ...cleanData(agenteData),
        agen_updt_dt: new Date().toISOString()
      })
      .eq('agen_id_int', agenteId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando agente:', error)
    throw error
  }
}

export async function eliminarAgente(agenteId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Agente_Identificado')
      .delete()
      .eq('agen_id_int', agenteId)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando agente:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA CONFIGURACIÓN DE SERVICIO
// ============================================

export async function obtenerConfigCamposMuestra(servId?: string): Promise<ConfigCampoMuestraDatabase[]> {
  try {
    let query = supabase
      .from('Config_Campo_Muestra')
      .select(`
        *,
        servicio:Servicios(serv_nombre_vac, area:Areas(area_nombre_vac))
      `)
    
    if (servId) {
      query = query.eq('serv_id_int', servId)
    }
    
    const { data, error } = await query.order('config_mue_created_dt', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo configuración de campos:', error)
    throw error
  }
}

export async function crearConfigCampoMuestra(configData: {
  config_mue_etique_vac: string
  config_mue_tipo_dato_vac?: string
  serv_id_int: string
}): Promise<ConfigCampoMuestraDatabase> {
  try {
    const { data, error } = await supabase
      .from('Config_Campo_Muestra')
      .insert(cleanData(configData))
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando configuración de campo:', error)
    throw error
  }
}

export async function actualizarConfigCampoMuestra(id: string, configData: {
  config_mue_etique_vac?: string
  config_mue_tipo_dato_vac?: string
}): Promise<ConfigCampoMuestraDatabase> {
  try {
    const { data, error } = await supabase
      .from('Config_Campo_Muestra')
      .update(cleanData(configData))
      .eq('config_mue_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando configuración de campo:', error)
    throw error
  }
}

export async function eliminarConfigCampoMuestra(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Config_Campo_Muestra')
      .delete()
      .eq('config_mue_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando configuración de campo:', error)
    throw error
  }
}

export async function obtenerConfigAnexosServicio(servId?: string): Promise<ConfigAnexoServicioDatabase[]> {
  try {
    let query = supabase
      .from('Config_Anexo_Servicio')
      .select(`
        *,
        servicio:Servicios(serv_nombre_vac, area:Areas(area_nombre_vac))
      `)
    
    if (servId) {
      query = query.eq('serv_id_int', servId)
    }
    
    const { data, error } = await query.order('config_anx_created_dt', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo configuración de anexos:', error)
    throw error
  }
}

export async function crearConfigAnexoServicio(configData: {
  config_anx_nomb_vac: string
  config_anx_obliga_vac?: string
  serv_id_int: string
}): Promise<ConfigAnexoServicioDatabase> {
  try {
    const { data, error } = await supabase
      .from('Config_Anexo_Servicio')
      .insert(cleanData(configData))
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando configuración de anexo:', error)
    throw error
  }
}

export async function actualizarConfigAnexoServicio(id: string, configData: {
  config_anx_nomb_vac?: string
  config_anx_obliga_vac?: string
}): Promise<ConfigAnexoServicioDatabase> {
  try {
    const { data, error } = await supabase
      .from('Config_Anexo_Servicio')
      .update(cleanData(configData))
      .eq('config_anx_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando configuración de anexo:', error)
    throw error
  }
}

export async function eliminarConfigAnexoServicio(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Config_Anexo_Servicio')
      .delete()
      .eq('config_anx_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando configuración de anexo:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA ANEXOS
// ============================================

export async function agregarAnexo(
  docLabId: string,
  anexoData: { url: string; tipo: string; titulo?: string; nota?: string }
): Promise<AnexoDocumentoDatabase> {
  try {
    console.log('[agregarAnexo] docLabId:', docLabId, 'data:', JSON.stringify(anexoData))
    const insertPayload = {
      anx_doc_url_blob: anexoData.url,
      anx_doc_tipo_vac: anexoData.tipo,
      anx_doc_titulo_vac: anexoData.titulo || null,
      anx_doc_nota_vac: anexoData.nota || null,
      doc_lab_id_int: docLabId
    }
    console.log('[agregarAnexo] insertPayload:', JSON.stringify(insertPayload))
    const { data, error } = await supabase
      .from('Anexos_Documento')
      .insert(insertPayload)
      .select()
      .single()

    console.log('[agregarAnexo] result - data:', data, 'error:', error)
    if (error) throw error
    return data
  } catch (error) {
    console.error('[agregarAnexo] ERROR:', error)
    throw error
  }
}

export async function actualizarAnexoBD(
  anexoId: string,
  campos: { url?: string; titulo?: string; nota?: string }
): Promise<void> {
  try {
    const updateData: Record<string, any> = {}
    if (campos.url !== undefined) updateData.anx_doc_url_blob = campos.url
    if (campos.titulo !== undefined) updateData.anx_doc_titulo_vac = campos.titulo || null
    if (campos.nota !== undefined) updateData.anx_doc_nota_vac = campos.nota || null

    if (Object.keys(updateData).length === 0) return

    const { error } = await supabase
      .from('Anexos_Documento')
      .update(updateData)
      .eq('anx_doc_id_int', anexoId)

    if (error) throw error
  } catch (error) {
    console.error('Error actualizando anexo:', error)
    throw error
  }
}

export async function eliminarAnexo(anexoId: string): Promise<void> {
  try {
    // Obtener la URL del anexo antes de eliminar para limpiar storage
    const { data: anexo } = await supabase
      .from('Anexos_Documento')
      .select('anx_doc_url_blob')
      .eq('anx_doc_id_int', anexoId)
      .single()

    // Eliminar imagen del storage si existe
    if (anexo?.anx_doc_url_blob) {
      try {
        await eliminarImagenAnexo(anexo.anx_doc_url_blob)
      } catch (imgError) {
        console.error('Error eliminando imagen de anexo del storage, continuando:', imgError)
      }
    }

    const { error } = await supabase
      .from('Anexos_Documento')
      .delete()
      .eq('anx_doc_id_int', anexoId)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando anexo:', error)
    throw error
  }
}

// ============================================
// STORAGE - ANEXOS (bucket: admin, carpeta: anexos/)
// ============================================

export async function subirImagenAnexo(
  archivo: File,
  nombreArchivo: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const supabaseAuth = createAuthenticatedClient()

    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      return { success: false, error: 'No hay una sesión autenticada activa' }
    }

    const extension = nombreArchivo.includes('.') ? nombreArchivo.split('.').pop() : ''
    if (!extension) {
      return { success: false, error: 'El archivo debe tener una extensión válida' }
    }

    // Validar que sea imagen
    const extensionesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    if (!extensionesPermitidas.includes(extension.toLowerCase())) {
      return { success: false, error: `Solo se permiten imágenes (${extensionesPermitidas.join(', ')})` }
    }

    const timestamp = Date.now()
    const nombreFinal = `anexo_${timestamp}.${extension}`
    const rutaArchivo = `anexos/${nombreFinal}`

    const { data, error } = await supabaseAuth.storage
      .from('admin')
      .upload(rutaArchivo, archivo)

    if (error) {
      console.error('Error subiendo imagen de anexo:', error)
      return { success: false, error: error.message }
    }

    const { data: urlData } = supabaseAuth.storage
      .from('admin')
      .getPublicUrl(rutaArchivo)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error('Error en subirImagenAnexo:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

export async function eliminarImagenAnexo(
  url: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseAuth = createAuthenticatedClient()

    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      return { success: false, error: 'No hay una sesión autenticada activa' }
    }

    // Extraer la ruta relativa dentro del bucket
    const urlParts = url.split('/anexos/')
    if (urlParts.length !== 2) {
      console.warn('URL de imagen de anexo no válida:', url)
      return { success: false, error: 'URL de imagen inválida' }
    }

    const fileName = urlParts[1]
    const filePath = `anexos/${fileName}`

    const { error } = await supabaseAuth.storage
      .from('admin')
      .remove([filePath])

    if (error) {
      console.error('Error eliminando imagen de anexo del storage:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error en eliminarImagenAnexo:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}
