import { supabase } from './client'
import type {
    EstadoPedido,
    EstadoCotizacion,
    FormaPago,
    ProductoDatabase,
    CertificadoCalidadDatabase,
    FichaTecnicaDatabase
} from '@/types/database'

// ============================================
// FUNCIONES BASE PARA CATÁLOGOS
// ============================================

export async function obtenerEstadosPedido(): Promise<EstadoPedido[]> {
    try {
        const { data, error } = await supabase
            .from('Estado_Pedido')
            .select('*')
            .order('est_ped_tipo_int', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo estados de pedido:', error)
        throw error
    }
}

export async function obtenerEstadosCotizacion(): Promise<EstadoCotizacion[]> {
    try {
        const { data, error } = await supabase
            .from('Estado_Cotizacion')
            .select('*')
            .order('est_cot_tipo_int', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo estados de cotización:', error)
        throw error
    }
}

export async function obtenerFormasPago(): Promise<FormaPago[]> {
    try {
        const { data, error } = await supabase
            .from('Forma_Pago')
            .select('*')
            .order('form_pa_tipo_int', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo formas de pago:', error)
        throw error
    }
}

// ============================================
// FUNCIONES CRUD PARA PRODUCTOS
// ============================================

export async function obtenerProductos(): Promise<ProductoDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Productos')
            .select('*')
            .order('pro_nomb_vac', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo productos:', error)
        throw error
    }
}

export async function crearProducto(productoData: {
    pro_nomb_vac: string
    pro_desc_vac: string | null
    pro_prec_unitario_int: number
}): Promise<ProductoDatabase> {
    try {
        // Limpiar datos antes de insertar (convertir strings vacíos a null)
        const datosLimpios = {
            pro_nomb_vac: productoData.pro_nomb_vac?.trim() || null,
            pro_desc_vac: productoData.pro_desc_vac?.trim() || null,
            pro_prec_unitario_int: productoData.pro_prec_unitario_int || null,
            pro_stock_int: 0 // Stock inicial en 0
        }

        // Validar que el nombre no esté vacío
        if (!datosLimpios.pro_nomb_vac) {
            throw new Error('El nombre del producto es obligatorio')
        }

        const { data, error } = await supabase
            .from('Productos')
            .insert(datosLimpios)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error creando producto:', error)
        throw error
    }
}

export async function actualizarProducto(id: string, productoData: {
    pro_nomb_vac?: string
    pro_desc_vac?: string | null
    pro_prec_unitario_int?: number
    pro_stock_int?: number
}): Promise<ProductoDatabase> {
    try {
        // Validar que el ID no esté vacío
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es obligatorio')
        }

        const updateData: any = {
            pro_updated_at_dt: new Date().toISOString()
        }

        // Solo agregar campos que se están actualizando
        if (productoData.pro_nomb_vac !== undefined) {
            const nombreLimpio = productoData.pro_nomb_vac?.trim()
            if (!nombreLimpio) {
                throw new Error('El nombre del producto es obligatorio')
            }
            updateData.pro_nomb_vac = nombreLimpio
        }
        if (productoData.pro_desc_vac !== undefined) {
            updateData.pro_desc_vac = productoData.pro_desc_vac?.trim() || null
        }
        if (productoData.pro_prec_unitario_int !== undefined) {
            updateData.pro_prec_unitario_int = productoData.pro_prec_unitario_int || null
        }
        if (productoData.pro_stock_int !== undefined) {
            updateData.pro_stock_int = productoData.pro_stock_int || null
        }

        const { data, error } = await supabase
            .from('Productos')
            .update(updateData)
            .eq('pro_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando producto:', error)
        throw error
    }
}

// ============================================
// RELACIONES CON CERTIFICADOS Y FICHAS TÉCNICAS
// ============================================

// Obtener certificados de calidad para un producto específico
export async function obtenerCertificadosPorProducto(productoId: string): Promise<CertificadoCalidadDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Productos_Certificados')
            .select(`
        certificado:Certificados_Calidad(*)
      `)
            .eq('pro_id_int', productoId)

        if (error) throw error

        // Extraer solo los certificados de la respuesta
        return (data?.map(item => item.certificado).filter(Boolean) || []) as unknown as CertificadoCalidadDatabase[]
    } catch (error) {
        console.error('Error obteniendo certificados del producto:', error)
        throw error
    }
}

// Obtener fichas técnicas para un producto específico
export async function obtenerFichasTecnicasPorProducto(productoId: string): Promise<FichaTecnicaDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Productos_Fichas_Tecnicas')
            .select(`
        ficha_tecnica:Fichas_Tecnicas(*)
      `)
            .eq('pro_id_int', productoId)

        if (error) throw error

        // Extraer solo las fichas técnicas de la respuesta
        return (data?.map(item => item.ficha_tecnica).filter(Boolean) || []) as unknown as FichaTecnicaDatabase[]
    } catch (error) {
        console.error('Error obteniendo fichas técnicas del producto:', error)
        throw error
    }
}

// Obtener certificados de calidad para múltiples productos
export async function obtenerCertificadosPorProductos(productosIds: string[]): Promise<{ [key: string]: CertificadoCalidadDatabase[] }> {
    try {
        if (productosIds.length === 0) return {}

        const { data, error } = await supabase
            .from('Certificados_Calidad')
            .select('*')
            .in('pro_id_int', productosIds)

        if (error) throw error

        // Agrupar certificados por producto ID
        const certificadosPorProducto: { [key: string]: CertificadoCalidadDatabase[] } = {}
        data?.forEach((certificado: CertificadoCalidadDatabase) => {
            if (certificado.pro_id_int) {
                if (!certificadosPorProducto[certificado.pro_id_int]) {
                    certificadosPorProducto[certificado.pro_id_int] = []
                }
                certificadosPorProducto[certificado.pro_id_int].push(certificado)
            }
        })

        return certificadosPorProducto
    } catch (error) {
        console.error('Error obteniendo certificados de productos:', error)
        throw error
    }
}

// Obtener fichas técnicas para múltiples productos
export async function obtenerFichasTecnicasPorProductos(productosIds: string[]): Promise<{ [key: string]: FichaTecnicaDatabase[] }> {
    try {
        if (productosIds.length === 0) return {}

        const { data, error } = await supabase
            .from('Ficha_Tecnica')
            .select('*')
            .in('pro_id_int', productosIds)

        if (error) throw error

        // Agrupar fichas técnicas por producto ID
        const fichasPorProducto: { [key: string]: FichaTecnicaDatabase[] } = {}
        data?.forEach((ficha: FichaTecnicaDatabase) => {
            if (ficha.pro_id_int) {
                if (!fichasPorProducto[ficha.pro_id_int]) {
                    fichasPorProducto[ficha.pro_id_int] = []
                }
                fichasPorProducto[ficha.pro_id_int].push(ficha)
            }
        })

        return fichasPorProducto
    } catch (error) {
        console.error('Error obteniendo fichas técnicas de productos:', error)
        throw error
    }
}
