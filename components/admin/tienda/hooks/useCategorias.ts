"use client"

import { useState, useEffect } from 'react'
import { obtenerCategorias } from '@/lib/supabase'
import type { CategoriaDatabase } from '@/types/database'

export function useCategorias() {
  const [categorias, setCategorias] = useState<CategoriaDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCategorias = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await obtenerCategorias()
      setCategorias(data)
    } catch (err: any) {
      console.error('Error cargando categorías:', err)
      setError(err.message || 'Error al cargar categorías')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategorias()
  }, [])

  return {
    categorias,
    loading,
    error,
    refetch: loadCategorias
  }
}
