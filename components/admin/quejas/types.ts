// ============================================================
// TYPES — Sistema de Quejas y Reclamaciones
// PSG3.1 / PSG3.2
// ============================================================

export type EstadoQueja =
    | 'recibido'
    | 'en_evaluacion'
    | 'en_investigacion'
    | 'resuelto'
    | 'cerrado'
    | 'anulado'

export type TipoQueja = 'queja' | 'reclamo'

export type CanalQueja = 'web' | 'presencial' | 'email' | 'whatsapp'

export type PrioridadQueja = 'baja' | 'normal' | 'alta' | 'urgente'

export interface Queja {
    que_rec_id_int: string
    que_rec_cod_registro_vac: string
    que_rec_tipo_vac: TipoQueja
    que_rec_canal_vac: CanalQueja
    // Reclamante
    que_rec_nom_vac: string
    que_rec_email_vac: string
    que_rec_telef_vac: string | null
    que_rec_tipo_doc_vac: string | null
    que_rec_num_doc_vac: string | null
    que_rec_direc_vac: string | null
    que_rec_padre_madre_vac: string | null
    // Reclamo
    que_rec_area_afect_vac: string | null
    que_rec_tipo_bien_vac: 'producto' | 'servicio' | null
    que_rec_serv_prod_vac: string | null
    que_rec_monto_recla_num: number | null
    que_rec_desc_vac: string
    que_rec_pedido_reclam_vac: string | null
    que_rec_adjunto_url_vac: string | null
    // Estado
    que_rec_estado_vac: EstadoQueja
    que_rec_prioridad_vac: PrioridadQueja
    que_rec_fec_limite_dt: string | null
    que_rec_prorrogado_bol: boolean
    que_rec_fec_limite_prorroga_dt: string | null
    // Asignación
    que_rec_responsable_vac: string | null
    que_rec_area_responsable_vac: string | null
    que_rec_dictamen_vac: string | null
    que_rec_accion_correctiva_vac: string | null
    que_rec_respuesta_cliente_vac: string | null
    que_rec_fec_resolucion_dt: string | null
    // Satisfacción
    que_rec_satisfaccion_int: number | null
    que_rec_satisfaccion_coment_vac: string | null
    // Auditoría
    que_rec_created_at_dt: string
    que_rec_updated_at_dt: string
    que_rec_fec_cierre_dt: string | null
    // FK opcionales
    usr_id_int: string | null
    suc_id_int: number | null
}

export interface HistorialQueja {
    que_hist_id_int: string
    que_hist_accion_vac: string
    que_hist_desc_vac: string
    que_hist_estado_ant_vac: string | null
    que_hist_estado_nuevo_vac: string | null
    que_hist_created_at_dt: string
    que_rec_id_int: string
    usr_id_int: string | null
}

export interface QuejaStats {
    total: number
    recibidos: number
    enEvaluacion: number
    enInvestigacion: number
    resueltos: number
    cerrados: number
    vencidos: number
    promedioDiasResolucion: number
}

export const ESTADO_LABELS: Record<EstadoQueja, string> = {
    recibido: 'Recibido',
    en_evaluacion: 'En Evaluación',
    en_investigacion: 'En Investigación',
    resuelto: 'Resuelto',
    cerrado: 'Cerrado',
    anulado: 'Anulado',
}

export const ESTADO_COLORS: Record<EstadoQueja, string> = {
    recibido: 'bg-blue-100 text-blue-800',
    en_evaluacion: 'bg-yellow-100 text-yellow-800',
    en_investigacion: 'bg-orange-100 text-orange-800',
    resuelto: 'bg-green-100 text-green-800',
    cerrado: 'bg-gray-100 text-gray-800',
    anulado: 'bg-red-100 text-red-800',
}

export const PRIORIDAD_LABELS: Record<PrioridadQueja, string> = {
    baja: 'Baja',
    normal: 'Normal',
    alta: 'Alta',
    urgente: 'Urgente',
}

export const PRIORIDAD_COLORS: Record<PrioridadQueja, string> = {
    baja: 'bg-gray-100 text-gray-600',
    normal: 'bg-blue-100 text-blue-700',
    alta: 'bg-orange-100 text-orange-700',
    urgente: 'bg-red-100 text-red-700',
}

export const TIPO_LABELS: Record<TipoQueja, string> = {
    queja: 'Queja',
    reclamo: 'Reclamo',
}

export const AREAS_EMPRESA = [
    'Laboratorio de Análisis',
    'Biotecnología Vegetal',
    'Control Biológico',
    'Plantines',
    'Tienda / Comercial',
    'Atención al Cliente',
    'Logística y Despacho',
    'Administración',
    'Otro',
]

export const FLUJO_ESTADOS: EstadoQueja[] = [
    'recibido',
    'en_evaluacion',
    'en_investigacion',
    'resuelto',
    'cerrado',
]
