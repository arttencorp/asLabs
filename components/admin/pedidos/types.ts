export interface EstadoPedido {
  est_ped_id_int: string
  est_ped_desc_vac: string
  est_ped_tipo_int: number
}

export interface EstadoCotizacion {
  est_cot_id_int: string
  est_cot_desc_vac: string
  est_cot_tipo_int: number
}

export interface FormaPago {
  form_pa_id_int: string
  form_pa_desc_vac: string
  form_pa_tipo_int: number
}

export interface Producto {
  pro_id_int: string
  pro_nomb_vac: string
  pro_desc_vac: string
  pro_prec_unitario_int: number
  pro_stock_int: number
  pro_created_at_dt: string
  pro_updated_at_dt: string
}

export interface DetalleCotizacion {
  pro_id_int: string
  cot_id_int: string
  det_cot_cant_int: number
  det_cot_prec_hist_int: number
  producto?: Producto
}

export interface InformacionAdicional {
  inf_ad_id_int: string
  inf_ad_lug_recojo_vac: string
  inf_ad_form_entr_vac: string
  inf_ad_term_cond_vac: string
  form_pa_id_int: string
  cot_id_int: string
  forma_pago?: FormaPago
}

export interface Cotizacion {
  cot_id_int: string
  cot_num_vac: string
  cot_fec_emis_dt: string
  cot_fec_venc_dt: string
  cot_igv_bol: boolean
  cot_updated_at_dt: string
  est_cot_id_int: string
  per_id_int: string
  estado_cotizacion?: EstadoCotizacion
  persona?: ClientePersona
  detalle_cotizacion?: DetalleCotizacion[]
  informacion_adicional?: InformacionAdicional
}

export interface Pedido {
  ped_id_int: string
  ped_cod_segui_vac: string
  ped_cod_rastreo_vac: string
  ped_fec_pedido_dt: string
  ped_fec_actualizada_dt: string
  ped_imagen_url?: string
  ped_observacion_vac?: string
  ped_num_comprob_vac?: string
  ped_created_at_dt: string
  est_ped_id_int: string
  cot_id_int: string
  estado_pedido?: EstadoPedido
  cotizacion?: Cotizacion
}

// Tipos para formularios
export interface PedidoForm {
  cotizacion_id: string
  estado_id: string
  codigo_rastreo: string
  observaciones: string
  numero_comprobante: string
  imagen_url?: string
}

export interface CotizacionForm {
  cliente_id: string
  fecha_emision: string
  fecha_vencimiento: string
  incluye_igv: boolean
  productos: DetalleCotizacionForm[]
  forma_pago_id: string
  lugar_recojo: string
  forma_entrega: string
  terminos_condiciones: string
}

export interface DetalleCotizacionForm {
  producto_id: string
  cantidad: number
  precio_historico: number
}

export interface EstadoPedido {
  est_ped_id_int: string
  est_ped_desc_vac: string
  est_ped_tipo_int: number
}

export interface EstadoCotizacion {
  est_cot_id_int: string
  est_cot_desc_vac: string
  est_cot_tipo_int: number
}

export interface FormaPago {
  form_pa_id_int: string
  form_pa_desc_vac: string
  form_pa_tipo_int: number
}

export interface Producto {
  pro_id_int: string
  pro_nomb_vac: string
  pro_desc_vac: string
  pro_prec_unitario_int: number
  pro_stock_int: number
  pro_created_at_dt: string
  pro_updated_at_dt: string
}

// Tipos para formularios
export interface PedidoForm {
  cotizacion_id: string
  estado_id: string
  codigo_rastreo: string
  observaciones: string
  numero_comprobante: string
  imagen_url?: string
}

// Re-exportar tipos de personas del sistema existente
export type { 
  PersonaNatural, 
  PersonaJuridica, 
  Persona, 
  ClientePersona, 
  ClienteForm 
} from '@/lib/supabase'