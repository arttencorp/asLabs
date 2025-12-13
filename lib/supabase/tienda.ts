import { supabase } from './client'
import type { CategoriaDatabase, ProductoTiendaDatabase } from '@/types/database'

// ============================================
// FUNCIONES BASE PARA CATEGORÍAS DE TIENDA
// ============================================

export async function obtenerCategorias(): Promise<CategoriaDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Categoria')
            .select('*')
            .order('cat_nom_vac', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo categorías:', error)
        throw error
    }
}

export async function crearCategoria(categoriaData: {
    cat_nom_vac: string
    cat_desc_vac: string | null
}): Promise<CategoriaDatabase> {
    try {
        const datosLimpios = {
            cat_nom_vac: categoriaData.cat_nom_vac?.trim() || null,
            cat_desc_vac: categoriaData.cat_desc_vac?.trim() || null
        }

        if (!datosLimpios.cat_nom_vac) {
            throw new Error('El nombre de la categoría es obligatorio')
        }

        const { data, error } = await supabase
            .from('Categoria')
            .insert(datosLimpios)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error creando categoría:', error)
        throw error
    }
}

export async function actualizarCategoria(id: string, categoriaData: {
    cat_nom_vac?: string
    cat_desc_vac?: string | null
}): Promise<CategoriaDatabase> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const updateData: any = {}

        if (categoriaData.cat_nom_vac !== undefined) {
            const nombreLimpio = categoriaData.cat_nom_vac?.trim()
            if (!nombreLimpio) {
                throw new Error('El nombre de la categoría es obligatorio')
            }
            updateData.cat_nom_vac = nombreLimpio
        }
        if (categoriaData.cat_desc_vac !== undefined) {
            updateData.cat_desc_vac = categoriaData.cat_desc_vac?.trim() || null
        }

        const { data, error } = await supabase
            .from('Categoria')
            .update(updateData)
            .eq('cat_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando categoría:', error)
        throw error
    }
}

export async function eliminarCategoria(id: string): Promise<void> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { data: productos, error: productosError } = await supabase
            .from('Productos_Tienda')
            .select('prod_tiend_id_int')
            .eq('cat_id_int', id)
            .limit(1)

        if (productosError) throw productosError

        if (productos && productos.length > 0) {
            throw new Error('No se puede eliminar la categoría porque tiene productos asociados')
        }

        const { error } = await supabase
            .from('Categoria')
            .delete()
            .eq('cat_id_int', id)

        if (error) throw error
    } catch (error) {
        console.error('Error eliminando categoría:', error)
        throw error
    }
}

export async function ocultarCategoria(id: string): Promise<CategoriaDatabase> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { data, error } = await supabase
            .from('Categoria')
            .update({ cat_activo_bool: false })
            .eq('cat_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error ocultando categoría:', error)
        throw error
    }
}

export async function mostrarCategoria(id: string): Promise<CategoriaDatabase> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { data, error } = await supabase
            .from('Categoria')
            .update({ cat_activo_bool: true })
            .eq('cat_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error mostrando categoría:', error)
        throw error
    }
}

export async function obtenerCategoriaPorId(id: string): Promise<CategoriaDatabase | null> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { data, error } = await supabase
            .from('Categoria')
            .select('*')
            .eq('cat_id_int', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return null
            }
            throw error
        }

        return data
    } catch (error) {
        console.error('Error obteniendo categoría por ID:', error)
        throw error
    }
}

// ============================================
// PRODUCTOS DE TIENDA CRUD
// ============================================

export async function obtenerProductosTienda(): Promise<ProductoTiendaDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Productos_Tienda')
            .select('*')
            .order('prod_tiend_nom_vac', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo productos de tienda:', error)
        throw error
    }
}

export async function crearProductoTienda(productoData: {
    prod_tiend_nom_vac: string
    prod_tiend_desc_vac: string | null
    prod_tiend_prec_vac: string | null
    cat_id_int: string
}): Promise<ProductoTiendaDatabase> {
    try {
        const datosLimpios = {
            prod_tiend_nom_vac: productoData.prod_tiend_nom_vac?.trim() || null,
            prod_tiend_desc_vac: productoData.prod_tiend_desc_vac?.trim() || null,
            prod_tiend_prec_vac: productoData.prod_tiend_prec_vac?.trim() || null,
            cat_id_int: productoData.cat_id_int
        }

        if (!datosLimpios.prod_tiend_nom_vac) {
            throw new Error('El nombre del producto es obligatorio')
        }

        if (!datosLimpios.cat_id_int) {
            throw new Error('La categoría es obligatoria')
        }

        const { data, error } = await supabase
            .from('Productos_Tienda')
            .insert(datosLimpios)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error creando producto de tienda:', error)
        throw error
    }
}

export async function actualizarProductoTienda(id: string, productoData: {
    prod_tiend_nom_vac?: string
    prod_tiend_desc_vac?: string | null
    prod_tiend_prec_vac?: string | null
    cat_id_int?: string
}): Promise<ProductoTiendaDatabase> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es obligatorio')
        }

        const updateData: any = {}

        if (productoData.prod_tiend_nom_vac !== undefined) {
            const nombreLimpio = productoData.prod_tiend_nom_vac?.trim()
            if (!nombreLimpio) {
                throw new Error('El nombre del producto es obligatorio')
            }
            updateData.prod_tiend_nom_vac = nombreLimpio
        }
        if (productoData.prod_tiend_desc_vac !== undefined) {
            updateData.prod_tiend_desc_vac = productoData.prod_tiend_desc_vac?.trim() || null
        }
        if (productoData.prod_tiend_prec_vac !== undefined) {
            updateData.prod_tiend_prec_vac = productoData.prod_tiend_prec_vac?.trim() || null
        }
        if (productoData.cat_id_int !== undefined) {
            if (!productoData.cat_id_int) {
                throw new Error('La categoría es obligatoria')
            }
            updateData.cat_id_int = productoData.cat_id_int
        }

        const { data, error } = await supabase
            .from('Productos_Tienda')
            .update(updateData)
            .eq('prod_tiend_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando producto de tienda:', error)
        throw error
    }
}

export async function eliminarProductoTienda(id: string): Promise<void> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es obligatorio')
        }

        const { error } = await supabase
            .from('Productos_Tienda')
            .delete()
            .eq('prod_tiend_id_int', id)

        if (error) throw error
    } catch (error) {
        console.error('Error eliminando producto de tienda:', error)
        throw error
    }
}

export async function ocultarProductoTienda(id: string): Promise<ProductoTiendaDatabase> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es obligatorio')
        }

        const { data, error } = await supabase
            .from('Productos_Tienda')
            .update({ prod_tiend_activo_bool: false })
            .eq('prod_tiend_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error ocultando producto de tienda:', error)
        throw error
    }
}

export async function mostrarProductoTienda(id: string): Promise<ProductoTiendaDatabase> {
    try {
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es obligatorio')
        }

        const { data, error } = await supabase
            .from('Productos_Tienda')
            .update({ prod_tiend_activo_bool: true })
            .eq('prod_tiend_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error mostrando producto de tienda:', error)
        throw error
    }
}

export async function ocultarProductosPorCategoria(categoriaId: string): Promise<void> {
    try {
        if (!categoriaId || categoriaId.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { error } = await supabase
            .from('Productos_Tienda')
            .update({ prod_tiend_activo_bool: false })
            .eq('cat_id_int', categoriaId)

        if (error) throw error
    } catch (error) {
        console.error('Error ocultando productos por categoría:', error)
        throw error
    }
}

export async function mostrarProductosPorCategoria(categoriaId: string): Promise<void> {
    try {
        if (!categoriaId || categoriaId.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { error } = await supabase
            .from('Productos_Tienda')
            .update({ prod_tiend_activo_bool: true })
            .eq('cat_id_int', categoriaId)

        if (error) throw error
    } catch (error) {
        console.error('Error mostrando productos por categoría:', error)
        throw error
    }
}

export async function contarProductosPorCategoria(categoriaId: string): Promise<number> {
    try {
        if (!categoriaId || categoriaId.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { data, error } = await supabase
            .from('Productos_Tienda')
            .select('prod_tiend_id_int')
            .eq('cat_id_int', categoriaId)

        if (error) throw error

        const totalProductos = data?.length || 0

        return totalProductos
    } catch (error) {
        console.error('Error contando productos por categoría:', error)
        throw error
    }
}

export async function contarProductosOcultosPorCategoria(categoriaId: string): Promise<number> {
    try {
        if (!categoriaId || categoriaId.trim() === '') {
            throw new Error('El ID de la categoría es obligatorio')
        }

        const { data, error } = await supabase
            .from('Productos_Tienda')
            .select('prod_tiend_id_int')
            .eq('cat_id_int', categoriaId)
            .eq('prod_tiend_activo_bool', false)

        if (error) throw error

        const productosOcultos = data?.length || 0

        return productosOcultos
    } catch (error) {
        console.error('Error contando productos ocultos por categoría:', error)
        throw error
    }
}

