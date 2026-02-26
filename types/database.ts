export interface PersonaNatural {
  per_nat_id_int: string
  per_nat_dni_int: number | null
  per_nat_nomb_vac: string | null
  per_nat_apell_vac: string | null
  per_id_int: string
}

export interface PersonaJuridica {
  per_jurd_id_int: string
  per_jurd_ruc_int: number | null
  per_jurd_razSocial_vac: string | null
  per_id_int: string
}

export interface Persona {
  per_id_int: string
  per_nom_contac_vac: string | null
  per_email_vac: string | null
  per_telef_int: string | null
  per_direc_vac: string | null
  per_cultivo_vac: string | null
  per_cantidad_int: number | null
  per_fec_prob_dt: string | null
  per_hec_disp_int: number | null
  per_hec_inst_int: number | null
  per_created_at_dt: string
  per_updated_at_dt: string
  per_observaciones_vac: string | null
  tipo?: 'natural' | 'juridica'
  persona_natural?: PersonaNatural | null
  persona_juridica?: PersonaJuridica | null
}

// Alias para mejor semántica
export type ClientePersona = Persona

export interface EstadoPedido {
  est_ped_id_int: string
  est_ped_desc_vac: string | null
  est_ped_tipo_int: number | null
}

export interface EstadoCotizacion {
  est_cot_id_int: string
  est_cot_desc_vac: string | null
  est_cot_tipo_int: number | null
}

export interface FormaPago {
  form_pa_id_int: string
  form_pa_desc_vac: string | null
  form_pa_tipo_int: number | null
}

export interface ProductoDatabase {
  pro_id_int: string
  pro_nomb_vac: string | null
  pro_desc_vac: string | null
  pro_prec_unitario_int: number | null
  pro_stock_int: number | null
  pro_created_at_dt: string
  pro_updated_at_dt: string
}

// Certificados de Calidad - Estructura real de BD
export interface CertificadoCalidadDatabase {
  cer_cal_id_int: string
  cer_cal_cod_muestra_int: number | null
  cer_cal_tipo_vac: string | null
  cer_cal_infor_ensayo_vac: string | null
  cer_cal_result_vac: string | null
  cer_cal_resum_vac: string | null
  cer_cal_imag_url: string | null
  cer_cal_created_at_dt: string
  cer_cal_updated_at_dt: string
  pro_id_int: string // FK a Productos - relación directa
}

// Fichas Técnicas - Estructura real de BD
export interface FichaTecnicaDatabase {
  fit_tec_id_int: string
  fit_tec_nom_planta_vac: string | null
  fit_tec_created_at_dt: string
  fit_tec_updated_at_dt: string
  pro_id_int: string // FK a Productos - relación directa
  fit_tec_imag_vac: string | null
  fit_tec_cod_vac: string | null
}

// Detalle de Ficha Técnica
export interface DetalleFichaTecnicaDatabase {
  dft_id_int: string
  dft_desc_vac: string | null
  dft_parcela_vac: string | null
  dft_zona_colecta_vac: string | null
  dft_present_vac: string | null
  fit_tec_id_int: string // FK a Ficha_Tecnica
}

// Taxonomías
export interface TaxonomiaDatabase {
  ta_id_int: string
  ta_familia_vac: string | null
  ta_genero_vac: string | null
  ta_nombre_cientifico_vac: string | null
  ta_grupo_vac: string | null
  ta_nombre_comun_vac: string | null
  fit_tec_id_int: string // FK a Ficha_Tecnica
}

// Zona de Colecta de Germoplasma
export interface ZonaColectaGermDatabase {
  zcg_id_int: string
  zcg_pais_vac: string | null
  zcg_region_vac: string | null
  zcg_provincia_vac: string | null
  zcg_distrito_vac: string | null
  zcg_zona_vac: string | null
  zcg_fecha_vac: string | null
  fit_tec_id_int: string // FK a Ficha_Tecnica
}

// Ficha Técnica Completa (con relaciones)
export interface FichaTecnicaCompletaDatabase extends FichaTecnicaDatabase {
  detalle?: DetalleFichaTecnicaDatabase | null
  taxonomia?: TaxonomiaDatabase | null
  zona_colecta?: ZonaColectaGermDatabase | null
}

// Categorías de Tienda
export interface CategoriaDatabase {
  cat_id_int: string
  cat_nom_vac: string | null
  cat_desc_vac: string | null
  cat_activo_bool?: boolean | null
  cat_created_at_dt: string
  cat_updated_at_dt: string
}

// Productos de Tienda  
export interface ProductoTiendaDatabase {
  prod_tiend_id_int: string
  prod_tiend_nom_vac: string | null
  prod_tiend_desc_vac: string | null
  prod_tiend_prec_vac: string | null
  prod_tiend_activo_bool?: boolean | null
  prod_tiend_created_at_dt: string
  prod_tiend_updated_at_dt: string
  cat_id_int: string // FK a Categoria
}

// ============================================
// TIPOS PARA FORMULARIOS
// ============================================

// Formularios para crear/actualizar entidades
export interface FichaTecnicaForm {
  fit_tec_nom_planta_vac: string
  fit_tec_cod_vac?: string | null
  pro_id_int: string
  fit_tec_imag_vac?: string | null
}

export interface DetalleFichaTecnicaForm {
  dft_desc_vac?: string | null
  dft_parcela_vac?: string | null
  dft_zona_colecta_vac?: string | null
  dft_present_vac?: string | null
}

export interface TaxonomiaForm {
  ta_familia_vac?: string | null
  ta_genero_vac?: string | null
  ta_nombre_cientifico_vac?: string | null
  ta_grupo_vac?: string | null
  ta_nombre_comun_vac?: string | null
}

export interface ZonaColectaForm {
  zcg_pais_vac?: string | null
  zcg_region_vac?: string | null
  zcg_provincia_vac?: string | null
  zcg_distrito_vac?: string | null
  zcg_zona_vac?: string | null
  zcg_fecha_vac?: string | null
}

export interface FichaTecnicaCompletaForm {
  ficha: FichaTecnicaForm
  detalle?: DetalleFichaTecnicaForm
  taxonomia?: TaxonomiaForm
  zona_colecta?: ZonaColectaForm
}

// ============================================
// TIPOS PARA DOCUMENTOS DE LABORATORIO
// ============================================

// Áreas de Servicio
export interface AreaDatabase {
  area_id_int: string
  area_nombre_vac: string | null
  area_updt_dt: string | null
  area_created_dt: string
}

// Servicios
export interface ServicioDatabase {
  serv_id_int: string
  serv_nombre_vac: string | null
  serv_costo_int: number | null
  serv_conf_extra_int: number | null  // clave numérica para CAMPOS_EXTRA_POR_SERVICIO
  serv_updt_dt: string | null
  serv_created_dt: string
  area_id_int: string // FK a Areas
  // Relación
  area?: AreaDatabase | null
}

// Tipo de Documento (certificado, informe)
export interface TipoDocumentoDatabase {
  tip_doc_id_int: string
  tip_doc_nomb_vac: string | null
  tip_doc_cod_vac: string | null // Código prefijo (CERT, INF)
  tip_doc_updt_dt: string | null
  tip_doc_created_dt: string
}

// Estado de Documento
export interface EstadoDocumentoDatabase {
  est_doc_id_int: string
  est_doc_nomb_vac: string | null
  est_doc_ord_int: number | null
  est_doc_updt_dt: string | null
  est_doc_created_dt: string
}

// Orden de Servicio
export interface OrdenServicioDatabase {
  ord_serv_id_int: string
  ord_serv_fec_recep_dt: string | null
  ord_serv_updt_dt: string | null
  ord_serv_created_dt: string
  cot_id_int: string | null // FK a Cotizaciones (opcional)
  per_id_int: string // FK a Personas
  // Relaciones
  persona?: Persona | null
}

// Documento de Laboratorio (principal)
export interface DocumentoLabDatabase {
  doc_lab_id_int: string
  doc_lab_cod_vac: string | null // Código único del documento
  doc_lab_emision_dt: string | null
  doc_lab_updt_dt: string | null
  doc_lab_created_dt: string
  serv_id_int: string // FK a Servicios
  ord_serv_id_int: string // FK a Orden_Servicio
  tip_doc_id_int: string // FK a Tipo_Documento
  est_doc_id_int: string // FK a Estado_Documento
  // Relaciones
  servicio?: ServicioDatabase | null
  orden_servicio?: OrdenServicioDatabase | null
  tipo_documento?: TipoDocumentoDatabase | null
  estado_documento?: EstadoDocumentoDatabase | null
  muestras?: MuestraDatabase[]
  resultados?: ResultadoEnsayoDatabase[]
  anexos?: AnexoDocumentoDatabase[]
  agentes?: AgenteIdentificadoDatabase[]
}

// Muestras
export interface MuestraDatabase {
  mue_id_int: string
  mue_lab_cod_vac: string | null // Código de muestra en laboratorio
  mue_mtrz_vac: string | null // Matriz (suelo, agua, tejido vegetal, etc.)
  mue_lugar_vac: string | null // Lugar de muestreo
  mue_centro_vac: string | null // Centro de registro / muestreo
  mue_fec_toma_dt: string | null
  mue_fec_recep_dt: string | null
  mue_fec_inicio_dt: string | null // Inicio de análisis
  mue_fec_fin_dt: string | null // Fin de análisis
  mue_rechazada_bol: boolean | null
  mue_motiv_rech_vac: string | null
  mue_recomend_vac: string | null // Observaciones
  mue_updt_dt: string | null
  mue_created_dt: string
  doc_lab_id_int: string // FK a Documento_Lab
  // Relaciones
  atributos?: AtributoMuestraValorDatabase[]
  resultados?: ResultadoEnsayoDatabase[]
  agentes?: AgenteIdentificadoDatabase[]
}

// Resultado de Ensayo
export interface ResultadoEnsayoDatabase {
  res_ens_id_int: string
  res_ens_param_vac: string | null // Parámetro analizado
  res_ens_result_vac: string | null // Resultado
  res_ens_und_vac: string | null // Unidad
  res_ens_metod_vac: string | null // Método utilizado
  res_ens_data_extra_json: any | null // Datos adicionales en JSON
  res_ens_min_int: number | null // Valor mínimo referencial
  res_ens_max_num: number | null // Valor máximo referencial
  res_ens_graf_bol: boolean | null // Mostrar gráfico de barras
  res_ens_rang_ref_vac: string | null // Rango referencial en texto
  res_ens_updt_dt: string | null
  res_ens_created_dt: string
  doc_lab_id_int: string // FK a Documento_Lab
  mue_id_int: string | null // FK a Muestras (opcional)
  // Relaciones
  notas?: ResultadoNotaDatabase[]
}

// Notas de Resultado
export interface ResultadoNotaDatabase {
  resul_not_id_int: string
  resul_not_cont_vac: string | null // Contenido de la nota
  resul_not_updt_dt: string | null
  resul_not_created_dt: string
  res_ens_id_int: string // FK a Resultado_Ensayo
}

// Anexos de Documento
export interface AnexoDocumentoDatabase {
  anx_doc_id_int: string
  anx_doc_url_blob: string | null // URL del archivo
  anx_doc_tipo_vac: string | null // Tipo de anexo (foto, documento, etc.)
  anx_doc_nota_vac: string | null // Nota/descripción
  anx_doc_titulo_vac: string | null // Título del anexo ("Imagen 1: título")
  anx_doc_updt_dt: string | null
  anx_doc_created_dt: string
  doc_lab_id_int: string // FK a Documento_Lab
}

// Agente Identificado
export interface AgenteIdentificadoDatabase {
  agen_id_int: string
  agen_nomb_cien_vac: string | null // Nombre científico
  agen_reino_vac: string | null
  agen_ordn_vac: string | null // Orden
  agen_familia_vac: string | null
  agen_gener_vac: string | null // Género
  agen_especi_vac: string | null // Especie
  agen_tipo_vac: string | null // Tipo (bacteria, hongo, etc.)
  agen_cod_ais_vac: string | null // Código de aislado
  agen_updt_dt: string | null
  agen_created_dt: string
  doc_lab_id_int: string // FK a Documento_Lab
  mue_id_int: string | null // FK a Muestras (opcional)
}

// Configuración de Campo de Muestra (campos dinámicos por servicio)
export interface ConfigCampoMuestraDatabase {
  config_mue_id_int: string
  config_mue_etique_vac: string | null // Etiqueta del campo
  config_mue_tipo_dato_vac: string | null // Tipo de dato (text, number, date, etc.)
  config_mue_updt_dt: string | null
  config_mue_created_dt: string
  serv_id_int: string // FK a Servicios
}

// Valor de Atributo de Muestra (valores de campos dinámicos)
export interface AtributoMuestraValorDatabase {
  atr_mue_id_int: string
  atr_mue_valor_vac: string | null
  atr_mue_updt_dt: string | null
  atr_mue_created_dt: string
  config_mue_id_int: string // FK a Config_Campo_Muestra
  mue_id_int: string // FK a Muestras
  // Relación
  config?: ConfigCampoMuestraDatabase | null
}

// Configuración de Anexo por Servicio
export interface ConfigAnexoServicioDatabase {
  config_anx_id_int: string
  config_anx_nomb_vac: string | null // Nombre del anexo requerido
  config_anx_obliga_vac: string | null // Es obligatorio? (si/no o boolean)
  config_anx_updt_dt: string | null
  config_anx_created_dt: string
  serv_id_int: string // FK a Servicios
}

// ============================================
// TIPOS PARA FORMULARIOS DE DOCUMENTOS LAB
// ============================================

export interface DocumentoLabForm {
  tip_doc_id_int: string
  serv_id_int: string
  per_id_int: string
  doc_lab_emision_dt?: string
}

export interface MuestraForm {
  _tempId?: string  // ID temporal para mapeo con resultados/agentes
  _atributosDinamicos?: Record<string, string>  // configCampoId → valor (se guarda aparte)
  mue_lab_cod_vac?: string
  mue_mtrz_vac?: string
  mue_lugar_vac?: string
  mue_centro_vac?: string
  mue_fec_toma_dt?: string
  mue_fec_recep_dt?: string
  mue_fec_inicio_dt?: string
  mue_fec_fin_dt?: string
  mue_rechazada_bol?: boolean
  mue_motiv_rech_vac?: string
  mue_recomend_vac?: string
}

export interface ResultadoEnsayoForm {
  res_ens_param_vac: string
  res_ens_result_vac: string
  res_ens_und_vac?: string
  res_ens_metod_vac?: string
  res_ens_min_int?: number
  res_ens_max_num?: number
  res_ens_graf_bol?: boolean
  res_ens_rang_ref_vac?: string
  mue_id_int?: string
}

export interface AgenteIdentificadoForm {
  agen_nomb_cien_vac?: string
  agen_reino_vac?: string
  agen_ordn_vac?: string
  agen_familia_vac?: string
  agen_gener_vac?: string
  agen_especi_vac?: string
  agen_tipo_vac?: string
  agen_cod_ais_vac?: string
  mue_id_int?: string
}

// Documento Lab Completo (para crear/actualizar con todas las relaciones)
export interface DocumentoLabCompletoForm {
  documento: DocumentoLabForm
  muestras: MuestraForm[]
  resultados: ResultadoEnsayoForm[]
  agentes?: AgenteIdentificadoForm[]
  anexos?: { url: string; tipo: string; titulo?: string; nota?: string }[]
}