// Utilidades para el módulo de Documentos de Laboratorio
import type { 
  DocumentoLabDatabase, 
  MuestraDatabase, 
  ResultadoEnsayoDatabase,
  AgenteIdentificadoDatabase,
  AnexoDocumentoDatabase,
  Persona
} from '@/types/database'
import type { 
  DocumentoLabUI, 
  MuestraUI, 
  ResultadoUI, 
  AgenteUI, 
  AnexoUI,
  ClienteUI 
} from './types'
import { INFO_EMPRESA, DECLARACIONES_AREA } from './constants'

/**
 * Genera un código único para muestra basado en el código del documento
 */
export function generarCodigoMuestra(codigoDocumento: string, numeroMuestra: number): string {
  return `${codigoDocumento}-M${String(numeroMuestra).padStart(2, '0')}`
}

/**
 * Obtiene el nombre del cliente desde la estructura de Persona
 */
export function obtenerNombreCliente(persona: Persona | null | undefined): string {
  if (!persona) return 'Sin cliente'
  
  // Si es persona jurídica
  if (persona.persona_juridica?.per_jurd_razSocial_vac) {
    return persona.persona_juridica.per_jurd_razSocial_vac
  }
  
  // Si es persona natural
  if (persona.persona_natural) {
    const nombre = persona.persona_natural.per_nat_nomb_vac || ''
    const apellido = persona.persona_natural.per_nat_apell_vac || ''
    return `${nombre} ${apellido}`.trim() || persona.per_nom_contac_vac || 'Sin nombre'
  }
  
  return persona.per_nom_contac_vac || 'Sin nombre'
}

/**
 * Obtiene el RUC/DNI del cliente
 */
export function obtenerRucDniCliente(persona: Persona | null | undefined): string {
  if (!persona) return ''
  
  if (persona.persona_juridica?.per_jurd_ruc_int) {
    return String(persona.persona_juridica.per_jurd_ruc_int)
  }
  
  if (persona.persona_natural?.per_nat_dni_int) {
    return String(persona.persona_natural.per_nat_dni_int)
  }
  
  return ''
}

/**
 * Convierte Persona de BD a ClienteUI
 */
export function personaToClienteUI(persona: Persona | null | undefined): ClienteUI {
  if (!persona) {
    return {
      id: '',
      razonSocial: '',
      ruc: '',
      contacto: '',
      email: '',
      telefono: '',
      direccion: ''
    }
  }
  
  return {
    id: persona.per_id_int,
    razonSocial: obtenerNombreCliente(persona),
    ruc: obtenerRucDniCliente(persona),
    contacto: persona.per_nom_contac_vac || '',
    email: persona.per_email_vac || '',
    telefono: persona.per_telef_int || '',
    direccion: persona.per_direc_vac || ''
  }
}

/**
 * Convierte MuestraDatabase a MuestraUI
 */
export function muestraDBToUI(muestra: MuestraDatabase): MuestraUI {
  return {
    id: muestra.mue_id_int,
    codigo: muestra.mue_lab_cod_vac || '',
    matriz: muestra.mue_mtrz_vac || '',
    lugarMuestreo: muestra.mue_lugar_vac || '',
    fechaToma: muestra.mue_fec_toma_dt?.split('T')[0] || '',
    fechaRecepcion: muestra.mue_fec_recep_dt?.split('T')[0] || '',
    fechaInicio: muestra.mue_fec_inicio_dt?.split('T')[0] || '',
    fechaFin: muestra.mue_fec_fin_dt?.split('T')[0] || '',
    rechazada: muestra.mue_rechazada_bol || false,
    motivoRechazo: muestra.mue_motiv_rech_vac || undefined,
    recomendaciones: muestra.mue_recomend_vac || undefined
  }
}

/**
 * Convierte MuestraUI a datos para BD
 */
export function muestraUIToDB(muestra: MuestraUI): Partial<MuestraDatabase> {
  return {
    mue_lab_cod_vac: muestra.codigo || null,
    mue_mtrz_vac: muestra.matriz || null,
    mue_lugar_vac: muestra.lugarMuestreo || null,
    mue_fec_toma_dt: muestra.fechaToma || null,
    mue_fec_recep_dt: muestra.fechaRecepcion || null,
    mue_fec_inicio_dt: muestra.fechaInicio || null,
    mue_fec_fin_dt: muestra.fechaFin || null,
    mue_rechazada_bol: muestra.rechazada,
    mue_motiv_rech_vac: muestra.motivoRechazo || null,
    mue_recomend_vac: muestra.recomendaciones || null
  }
}

/**
 * Convierte ResultadoEnsayoDatabase a ResultadoUI
 */
export function resultadoDBToUI(resultado: ResultadoEnsayoDatabase): ResultadoUI {
  return {
    id: resultado.res_ens_id_int,
    parametro: resultado.res_ens_param_vac || '',
    resultado: resultado.res_ens_result_vac || '',
    unidad: resultado.res_ens_und_vac || '',
    metodo: resultado.res_ens_metod_vac || '',
    valorMin: resultado.res_ens_min_int || undefined,
    valorMax: resultado.res_ens_max_num || undefined,
    mostrarGrafico: resultado.res_ens_graf_bol || false,
    rangoReferencial: resultado.res_ens_rang_ref_vac || undefined,
    muestraId: resultado.mue_id_int || undefined
  }
}

/**
 * Convierte ResultadoUI a datos para BD
 */
export function resultadoUIToDB(resultado: ResultadoUI): Partial<ResultadoEnsayoDatabase> {
  return {
    res_ens_param_vac: resultado.parametro || null,
    res_ens_result_vac: resultado.resultado || null,
    res_ens_und_vac: resultado.unidad || null,
    res_ens_metod_vac: resultado.metodo || null,
    res_ens_min_int: resultado.valorMin || null,
    res_ens_max_num: resultado.valorMax || null,
    res_ens_graf_bol: resultado.mostrarGrafico,
    res_ens_rang_ref_vac: resultado.rangoReferencial || null,
    mue_id_int: resultado.muestraId || null
  }
}

/**
 * Convierte AgenteIdentificadoDatabase a AgenteUI
 */
export function agenteDBToUI(agente: AgenteIdentificadoDatabase): AgenteUI {
  return {
    id: agente.agen_id_int,
    nombreCientifico: agente.agen_nomb_cien_vac || '',
    reino: agente.agen_reino_vac || undefined,
    orden: agente.agen_ordn_vac || undefined,
    familia: agente.agen_familia_vac || undefined,
    genero: agente.agen_gener_vac || undefined,
    especie: agente.agen_especi_vac || undefined,
    tipo: agente.agen_tipo_vac || '',
    codigoAislado: agente.agen_cod_ais_vac || undefined,
    muestraId: agente.mue_id_int || undefined
  }
}

/**
 * Convierte AnexoDocumentoDatabase a AnexoUI
 */
export function anexoDBToUI(anexo: AnexoDocumentoDatabase): AnexoUI {
  return {
    id: anexo.anx_doc_id_int,
    url: anexo.anx_doc_url_vac || '',
    tipo: anexo.anx_doc_tipo_vac || '',
    nota: anexo.anx_doc_nota_vac || undefined
  }
}

/**
 * Convierte DocumentoLabDatabase completo a DocumentoLabUI
 */
export function documentoDBToUI(doc: DocumentoLabDatabase): DocumentoLabUI {
  const persona = (doc.orden_servicio as any)?.persona as Persona | undefined
  
  return {
    id: doc.doc_lab_id_int,
    codigo: doc.doc_lab_cod_vac || '',
    tipoDocumentoId: doc.tip_doc_id_int,
    tipoDocumentoNombre: doc.tipo_documento?.tip_doc_nomb_vac || '',
    servicioId: doc.serv_id_int,
    servicioNombre: doc.servicio?.serv_nombre_vac || '',
    areaId: doc.servicio?.area_id_int,
    areaNombre: (doc.servicio as any)?.area?.area_nombre_vac || '',
    estadoId: doc.est_doc_id_int,
    estadoNombre: doc.estado_documento?.est_doc_nomb_vac || '',
    fechaEmision: doc.doc_lab_emision_dt?.split('T')[0] || '',
    cliente: personaToClienteUI(persona),
    muestras: (doc.muestras || []).map(muestraDBToUI),
    resultados: (doc.resultados || []).map(resultadoDBToUI),
    agentes: (doc.agentes || []).map(agenteDBToUI),
    anexos: (doc.anexos || []).map(anexoDBToUI),
    createdAt: doc.doc_lab_created_dt
  }
}

/**
 * Obtiene la declaración según el área
 */
export function obtenerDeclaracion(areaNombre: string | undefined): string {
  if (!areaNombre) return DECLARACIONES_AREA.default
  
  const areaKey = areaNombre.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/\s+/g, '_')
  
  return DECLARACIONES_AREA[areaKey] || DECLARACIONES_AREA.default
}

/**
 * Genera HTML para gráfico de barras referencial
 */
export function generarGraficoReferencial(
  resultado: number,
  min: number,
  max: number,
  unidad: string
): string {
  const escala = max * 2
  const posicionResultado = Math.min(100, (resultado / escala) * 100)
  const posicionMin = (min / escala) * 100
  const posicionMax = (max / escala) * 100
  const dentroRango = resultado >= min && resultado <= max

  return `
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="position: relative; width: 80px; height: 12px; background: #e0e0e0; border: 1px solid #999; border-radius: 2px;">
        <div style="position: absolute; top: 0; bottom: 0; background: ${dentroRango ? '#c8e6c9' : '#ffcdd2'}; left: ${posicionMin}%; right: ${100 - posicionMax}%;"></div>
        <div style="position: absolute; top: 0; bottom: 0; width: 2px; background: ${dentroRango ? '#2e7d32' : '#c62828'}; left: ${posicionResultado}%;"></div>
      </div>
      <span style="font-size: 10px; white-space: nowrap; color: ${dentroRango ? '#2e7d32' : '#c62828'};">${resultado} ${unidad}</span>
    </div>
  `
}

/**
 * Formatea fecha para mostrar
 */
export function formatearFecha(fecha: string | undefined | null): string {
  if (!fecha) return '-'
  
  try {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch {
    return fecha
  }
}

/**
 * Genera ID único temporal para elementos de UI
 */
export function generarIdTemporal(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Valida si un documento está listo para emitir
 */
export function validarDocumentoParaEmision(documento: DocumentoLabUI): { valido: boolean; errores: string[] } {
  const errores: string[] = []
  
  if (!documento.cliente.id) {
    errores.push('Debe seleccionar un cliente')
  }
  
  if (!documento.tipoDocumentoId) {
    errores.push('Debe seleccionar un tipo de documento')
  }
  
  if (!documento.servicioId) {
    errores.push('Debe seleccionar un servicio')
  }
  
  if (documento.muestras.length === 0) {
    errores.push('Debe agregar al menos una muestra')
  }
  
  if (documento.resultados.length === 0) {
    errores.push('Debe agregar al menos un resultado')
  }
  
  // Verificar que las muestras tengan datos mínimos
  documento.muestras.forEach((muestra, index) => {
    if (!muestra.matriz) {
      errores.push(`Muestra ${index + 1}: Debe especificar la matriz`)
    }
  })
  
  // Verificar que los resultados tengan datos mínimos
  documento.resultados.forEach((resultado, index) => {
    if (!resultado.parametro) {
      errores.push(`Resultado ${index + 1}: Debe especificar el parámetro`)
    }
    if (!resultado.resultado) {
      errores.push(`Resultado ${index + 1}: Debe especificar el resultado`)
    }
  })
  
  return {
    valido: errores.length === 0,
    errores
  }
}

/**
 * Obtiene el color del badge según el estado
 */
export function obtenerColorEstado(estado: string | undefined): string {
  const estadoLower = (estado || '').toLowerCase()
  
  if (estadoLower.includes('borrador')) return 'bg-gray-100 text-gray-700'
  if (estadoLower.includes('pendiente')) return 'bg-yellow-100 text-yellow-700'
  if (estadoLower.includes('proceso')) return 'bg-blue-100 text-blue-700'
  if (estadoLower.includes('emitido')) return 'bg-green-100 text-green-700'
  if (estadoLower.includes('anulado')) return 'bg-red-100 text-red-700'
  
  return 'bg-gray-100 text-gray-700'
}
