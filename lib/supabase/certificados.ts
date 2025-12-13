import { supabase, createAuthenticatedClient } from './client'
import type { CertificadoCalidadDatabase } from '@/types/database'

// ============================================================================
// CERTIFICADOS DE CALIDAD - CRUD
// ============================================================================

export async function obtenerCertificadosCalidad(): Promise<CertificadoCalidadDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Certificados_Calidad')
            .select(`
        *,
        producto:Productos(*)
      `)
            .order('cer_cal_created_at_dt', { ascending: false })

        if (error) {
            console.error('Error obteniendo certificados de calidad:', error)
            throw error
        }

        return data || []
    } catch (error) {
        console.error('Error en obtenerCertificadosCalidad:', error)
        throw error
    }
}

export async function crearCertificadoCalidad(certificado: Omit<CertificadoCalidadDatabase, 'cer_cal_id_int' | 'cer_cal_created_at_dt' | 'cer_cal_updated_at_dt'>): Promise<CertificadoCalidadDatabase> {
    try {
        const { data, error } = await supabase
            .from('Certificados_Calidad')
            .insert(certificado)
            .select(`
        *,
        producto:Productos(*)
      `)
            .single()

        if (error) {
            console.error('Error creando certificado de calidad:', error)
            throw error
        }

        return data
    } catch (error) {
        console.error('Error en crearCertificadoCalidad:', error)
        throw error
    }
}

export async function actualizarCertificadoCalidad(id: string, certificado: Partial<Omit<CertificadoCalidadDatabase, 'cer_cal_id_int' | 'cer_cal_created_at_dt'>>): Promise<CertificadoCalidadDatabase> {
    try {
        const { data, error } = await supabase
            .from('Certificados_Calidad')
            .update({
                ...certificado,
                cer_cal_updated_at_dt: new Date().toISOString()
            })
            .eq('cer_cal_id_int', id)
            .select(`
        *,
        producto:Productos(*)
      `)
            .single()

        if (error) {
            console.error('Error actualizando certificado de calidad:', error)
            throw error
        }

        return data
    } catch (error) {
        console.error('Error en actualizarCertificadoCalidad:', error)
        throw error
    }
}

export async function eliminarCertificadoCalidad(id: string): Promise<void> {
    try {
        // Primero obtener el certificado para ver si tiene imagen
        const { data: certificado } = await supabase
            .from('Certificados_Calidad')
            .select('cer_cal_imag_url')
            .eq('cer_cal_id_int', id)
            .single()

        // Si tiene imagen, eliminarla del storage
        if (certificado?.cer_cal_imag_url) {
            try {
                const result = await eliminarImagenCertificado(certificado.cer_cal_imag_url)
                if (!result.success) {
                    console.error('Error al eliminar imagen del storage:', result.error)
                }
            } catch (imageError) {
                console.error('Error al eliminar imagen del storage, continuando con eliminación del certificado:', imageError)
            }
        }

        // Eliminar el registro de la BD
        const { error } = await supabase
            .from('Certificados_Calidad')
            .delete()
            .eq('cer_cal_id_int', id)

        if (error) throw error

    } catch (error) {
        console.error('Error eliminando certificado de calidad:', error)
        throw error
    }
}

export async function obtenerCertificadoCalidadPorId(id: string): Promise<CertificadoCalidadDatabase> {
    try {
        const { data, error } = await supabase
            .from('Certificados_Calidad')
            .select(`
        *,
        producto:Productos(*)
      `)
            .eq('cer_cal_id_int', id)
            .single()

        if (error) {
            console.error('Error obteniendo certificado de calidad por ID:', error)
            throw error
        }

        return data
    } catch (error) {
        console.error('Error en obtenerCertificadoCalidadPorId:', error)
        throw error
    }
}

export async function obtenerCertificadosCalidadPorProducto(productoId: string): Promise<CertificadoCalidadDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Certificados_Calidad')
            .select(`
        *,
        producto:Productos(*)
      `)
            .eq('pro_id_int', productoId)
            .order('cer_cal_created_at_dt', { ascending: false })

        if (error) {
            console.error('Error obteniendo certificados por producto:', error)
            throw error
        }

        return data || []
    } catch (error) {
        console.error('Error en obtenerCertificadosCalidadPorProducto:', error)
        throw error
    }
}

// ============================================================================
// STORAGE - CERTIFICADOS DE CALIDAD
// ============================================================================

export async function subirImagenCertificado(archivo: File, nombreArchivo: string): Promise<{ success: boolean; url?: string; error?: string }> {
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
        const nombreFinal = `certificado_${timestamp}.${extension}`
        const rutaArchivo = `certificados/${nombreFinal}`

        const { data, error } = await supabaseAuth.storage
            .from('admin')
            .upload(rutaArchivo, archivo)

        if (error) {
            console.error('Error subiendo imagen de certificado:', error)
            return { success: false, error: error.message }
        }

        const { data: urlData } = supabaseAuth.storage
            .from('admin')
            .getPublicUrl(rutaArchivo)

        return { success: true, url: urlData.publicUrl }
    } catch (error) {
        console.error('Error en subirImagenCertificado:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
    }
}

export async function eliminarImagenCertificado(url: string): Promise<{ success: boolean; error?: string }> {
    try {
        const supabaseAuth = createAuthenticatedClient()

        const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

        if (sessionError || !session) {
            console.error('Error de sesión:', sessionError || 'No hay sesión activa')
            return { success: false, error: 'No hay una sesión autenticada activa' }
        }

        const urlParts = url.split('/certificados/')
        if (urlParts.length !== 2) {
            console.warn('URL de imagen no válida:', url)
            return { success: false, error: 'URL de imagen inválida' }
        }

        const fileName = urlParts[1]
        const filePath = `certificados/${fileName}`

        const { error } = await supabaseAuth.storage
            .from('admin')
            .remove([filePath])

        if (error) {
            console.error('Error eliminando imagen de certificado del storage:', error)
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (error) {
        console.error('Error en eliminarImagenCertificado:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
    }
}
