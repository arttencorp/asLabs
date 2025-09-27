"use client"

import { useState, useMemo } from "react"

export interface UsePaginationProps<T> {
  data: T[]
  defaultPageSize?: number
  defaultPage?: number
}

export interface PaginationResult<T> {
  // Datos paginados
  paginatedData: T[]
  
  // Estado de paginación
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
  
  // Funciones de control
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
  goToFirstPage: () => void
  goToLastPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  
  // Información de estado
  hasNextPage: boolean
  hasPreviousPage: boolean
  startItem: number
  endItem: number
}

export function usePagination<T>({ 
  data, 
  defaultPageSize = 10, 
  defaultPage = 1 
}: UsePaginationProps<T>): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  // Calcular valores derivados
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / pageSize)
  
  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, pageSize])

  // Información de elementos
  const startItem = totalItems > 0 ? Math.max(1, (currentPage - 1) * pageSize + 1) : 0
  const endItem = Math.min(totalItems, currentPage * pageSize)

  // Estados de navegación
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  // Funciones de navegación
  const handleSetCurrentPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
  }

  const handleSetPageSize = (size: number) => {
    setPageSize(size)
    // Ajustar la página actual si es necesario
    const newTotalPages = Math.ceil(totalItems / size)
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages))
    }
  }

  const goToFirstPage = () => handleSetCurrentPage(1)
  const goToLastPage = () => handleSetCurrentPage(totalPages)
  const goToNextPage = () => handleSetCurrentPage(currentPage + 1)
  const goToPreviousPage = () => handleSetCurrentPage(currentPage - 1)

  return {
    // Datos
    paginatedData,
    
    // Estado
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    startItem,
    endItem,
    hasNextPage,
    hasPreviousPage,
    
    // Funciones
    setCurrentPage: handleSetCurrentPage,
    setPageSize: handleSetPageSize,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  }
}