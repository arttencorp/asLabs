"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DataPaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  className?: string
  showPageSizeSelector?: boolean
  pageSizeOptions?: number[]
}

const DataPagination = React.forwardRef<HTMLDivElement, DataPaginationProps>(({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  className,
  showPageSizeSelector = true,
  pageSizeOptions = [10, 20, 50, 100],
  ...props
}, ref) => {
  const startItem = Math.max(1, (currentPage - 1) * pageSize + 1)
  const endItem = Math.min(totalItems, currentPage * pageSize)

  const getVisiblePages = () => {
    const delta = 2 // Número de páginas a mostrar a cada lado de la página actual
    const range = []
    const rangeWithDots = []

    // Siempre incluir la primera página
    range.push(1)

    // Calcular el rango alrededor de la página actual
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    // Siempre incluir la última página si hay más de una
    if (totalPages > 1) {
      range.push(totalPages)
    }

    // Eliminar duplicados y ordenar
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b)

    // Añadir puntos suspensivos donde sea necesario
    let prev = 0
    for (const page of uniqueRange) {
      if (page - prev === 2) {
        rangeWithDots.push(prev + 1)
      } else if (page - prev > 2) {
        rangeWithDots.push("...")
      }
      rangeWithDots.push(page)
      prev = page
    }

    return rangeWithDots
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize)
    if (onPageSizeChange) {
      onPageSizeChange(size)
    }
  }

  if (totalItems === 0) {
    return showPageSizeSelector && onPageSizeChange ? (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between px-2 py-4 border-t bg-background",
          className
        )}
        {...props}
      >
        <div className="text-sm text-muted-foreground">
          No hay resultados
        </div>
        
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    ) : null
  }

  if (totalPages <= 1 && !showPageSizeSelector) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between px-2 py-4 border-t bg-background",
        className
      )}
      {...props}
    >
      {/* Información de elementos */}
      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
        <div>
          {totalItems > 0 ? (
            <>
              Mostrando {startItem} - {endItem} de {totalItems} resultados
            </>
          ) : (
            "No hay resultados"
          )}
        </div>
        
        {/* Selector de página */}
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Filas por página</p>
            <Select
              value={pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex items-center space-x-2">
          {/* Primera página */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title="Primera página"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Página anterior */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Números de página */}
          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => {
              if (page === "...") {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                    ...
                  </span>
                )
              }

              const pageNumber = page as number
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>

          {/* Página siguiente */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Última página */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Última página"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
})

DataPagination.displayName = "DataPagination"

export { DataPagination }