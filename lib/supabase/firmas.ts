import { supabase, cleanData, createAuthenticatedClient } from './client'
import type { 
  FirmaDatabase, 
  FirmaDocumentoLabDatabase 
} from '@/components/admin/firma/types'

// ============================================
// FUNCIONES PARA FIRMAS (Catálogo)
// ============================================

export async function obtenerFirmas(): Promise<FirmaDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Firma')
      .select('*')
      .order('firm_created_dt', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo firmas:', error)
    throw error
  }
}

export async function obtenerFirmaPorId(id: string): Promise<FirmaDatabase | null> {
  try {
    const { data, error } = await supabase
      .from('Firma')
      .select('*')
      .eq('firm_id_int', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error obteniendo firma por ID:', error)
    throw error
  }
}

export async function crearFirma(firmaData: {
  firm_nomb_vac: string | null
  firm_cargo_vac: string | null
  firm_url_blob?: string | null
}): Promise<FirmaDatabase> {
  try {
    const { data, error } = await supabase
      .from('Firma')
      .insert(cleanData(firmaData))
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando firma:', error)
    throw error
  }
}

export async function actualizarFirma(id: string, firmaData: {
  firm_nomb_vac?: string | null
  firm_cargo_vac?: string | null
  firm_url_blob?: string | null
}): Promise<FirmaDatabase> {
  try {
    const { data, error } = await supabase
      .from('Firma')
      .update({
        ...cleanData(firmaData),
        firm_updt_dt: new Date().toISOString()
      })
      .eq('firm_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando firma:', error)
    throw error
  }
}

export async function eliminarFirma(id: string): Promise<void> {
  try {
    // Primero obtener la firma para ver si tiene imagen
    const { data: firma } = await supabase
      .from('Firma')
      .select('firm_url_blob')
      .eq('firm_id_int', id)
      .single()

    // Si tiene imagen, eliminarla del storage
    if (firma?.firm_url_blob) {
      try {
        const result = await eliminarImagenFirma(firma.firm_url_blob)
        if (!result.success) {
          console.error('Error al eliminar imagen del storage:', result.error)
        }
      } catch (imageError) {
        console.error('Error al eliminar imagen del storage, continuando con eliminación de la firma:', imageError)
      }
    }

    // Eliminar el registro de la BD
    const { error } = await supabase
      .from('Firma')
      .delete()
      .eq('firm_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando firma:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA FIRMA_DOCUMENTO_LAB (Asignaciones)
// ============================================

export async function obtenerFirmasDeDocumento(docLabId: string): Promise<FirmaDocumentoLabDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Firma_DocumentoLab')
      .select(`
        *,
        firma:Firma(*)
      `)
      .eq('doc_lab_id_int', docLabId)
      .order('firm_doc_created_dt', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo firmas del documento:', error)
    throw error
  }
}

export async function asignarFirmaADocumento(asignacionData: {
  doc_lab_id_int: string
  firm_id_int: string
  firm_doc_fec_dt?: string | null
}): Promise<FirmaDocumentoLabDatabase> {
  try {
    const { data, error } = await supabase
      .from('Firma_DocumentoLab')
      .insert(cleanData(asignacionData))
      .select(`
        *,
        firma:Firma(*)
      `)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error asignando firma al documento:', error)
    throw error
  }
}

export async function removerFirmaDeDocumento(firmaDocId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('Firma_DocumentoLab')
      .delete()
      .eq('firm_doc_id_int', firmaDocId)

    if (error) throw error
  } catch (error) {
    console.error('Error removiendo firma del documento:', error)
    throw error
  }
}

export async function actualizarFirmaDocumento(
  firmaDocId: string, 
  data: { firm_doc_fec_dt?: string | null }
): Promise<FirmaDocumentoLabDatabase> {
  try {
    const { data: updatedData, error } = await supabase
      .from('Firma_DocumentoLab')
      .update({
        ...cleanData(data),
        firm_doc_updt_dt: new Date().toISOString()
      })
      .eq('firm_doc_id_int', firmaDocId)
      .select(`
        *,
        firma:Firma(*)
      `)
      .single()

    if (error) throw error
    return updatedData
  } catch (error) {
    console.error('Error actualizando firma del documento:', error)
    throw error
  }
}

// ============================================
// STORAGE - FIRMAS
// ============================================

export async function subirImagenFirma(archivo: File, nombreArchivo: string): Promise<{ success: boolean; url?: string; error?: string }> {
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

    const timestamp = Date.now()
    const nombreFinal = `firma_${timestamp}.${extension}`
    const rutaArchivo = `firmas/${nombreFinal}`

    const { data, error } = await supabaseAuth.storage
      .from('admin')
      .upload(rutaArchivo, archivo)

    if (error) {
      console.error('Error subiendo imagen de firma:', error)
      return { success: false, error: error.message }
    }

    const { data: urlData } = supabaseAuth.storage
      .from('admin')
      .getPublicUrl(rutaArchivo)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error('Error en subirImagenFirma:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

export async function eliminarImagenFirma(url: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseAuth = createAuthenticatedClient()

    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      return { success: false, error: 'No hay una sesión autenticada activa' }
    }

    const urlParts = url.split('/firmas/')
    if (urlParts.length !== 2) {
      console.warn('URL de imagen no válida:', url)
      return { success: false, error: 'URL de imagen inválida' }
    }

    const fileName = urlParts[1]
    const filePath = `firmas/${fileName}`

    const { error } = await supabaseAuth.storage
      .from('admin')
      .remove([filePath])

    if (error) {
      console.error('Error eliminando imagen de firma del storage:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error en eliminarImagenFirma:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}
