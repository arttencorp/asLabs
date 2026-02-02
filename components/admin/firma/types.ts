// ============================================
// TIPOS PARA FIRMAS
// ============================================

// Firma (Tabla maestra - el catálogo de firmas)
export interface FirmaDatabase {
  firm_id_int: string
  firm_nomb_vac: string | null
  firm_cargo_vac: string | null
  firm_url_blob: string | null
  firm_updt_dt: string | null
  firm_created_dt: string
}

// Firma asignada a Documento de Lab (tabla intermedia)
export interface FirmaDocumentoLabDatabase {
  firm_doc_id_int: string
  doc_lab_id_int: string
  firm_id_int: string
  firm_doc_fec_dt: string | null
  firm_doc_updt_dt: string | null
  firm_doc_created_dt: string
  // Relaciones
  firma?: FirmaDatabase | null
}

// Formulario para crear/editar firma
export interface FirmaForm {
  firm_nomb_vac: string | null
  firm_cargo_vac: string | null
  firm_url_blob: string | null
}

// Formulario para asignar firma a documento
export interface FirmaDocumentoForm {
  doc_lab_id_int: string
  firm_id_int: string
  firm_doc_fec_dt?: string | null
}

// Estadísticas de firmas
export interface FirmasStats {
  totalFirmas: number
  firmasConImagen: number
  firmasSinImagen: number
  nuevasEsteMes: number
}
