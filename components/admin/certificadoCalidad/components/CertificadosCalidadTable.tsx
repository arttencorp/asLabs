"use client"

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Image as ImageIcon,
  FileText,
  Eye
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { CertificadosCalidadTableProps } from '../types/index'
import { formatDate } from '@/utils/index'

export function CertificadosCalidadTable({
  certificados,
  loading,
  onEdit,
  onDelete,
  productos
}: CertificadosCalidadTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar certificados según término de búsqueda
  const filteredCertificados = useMemo(() => {
    return certificados.filter(certificado => {
      const searchLower = searchTerm.toLowerCase()
      const producto = productos.find(p => p.pro_id_int === certificado.pro_id_int)

      return (
        certificado.cer_cal_tipo_vac?.toLowerCase().includes(searchLower) ||
        certificado.cer_cal_infor_ensayo_vac?.toLowerCase().includes(searchLower) ||
        certificado.cer_cal_cod_muestra_int?.toString().includes(searchLower) ||
        producto?.pro_nomb_vac?.toLowerCase().includes(searchLower) ||
        certificado.cer_cal_id_int.toString().includes(searchTerm)
      )
    })
  }, [certificados, searchTerm, productos])

  // Configurar paginación
  const pagination = usePagination({
    data: filteredCertificados,
    defaultPageSize: 10,
    defaultPage: 1
  })

  const getProductoNombre = (productoId: string | null) => {
    if (!productoId) return 'Sin producto'
    const producto = productos.find(p => p.pro_id_int === productoId)
    return producto?.pro_nomb_vac || 'Producto no encontrado'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4" />
          <Input
            placeholder="Buscar certificados..."
            disabled
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Código Muestra</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="w-[70px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4" />
        <Input
          placeholder="Buscar por tipo, ensayo, código o producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Código Muestra</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="w-[70px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.totalItems === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {searchTerm ? 'No se encontraron certificados que coincidan con la búsqueda.' : 'No hay certificados registrados.'}
                </TableCell>
              </TableRow>
            ) : (
              pagination.paginatedData.map((certificado) => (
                <TableRow key={certificado.cer_cal_id_int}>
                  <TableCell>
                    {certificado.cer_cal_imag_url ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={certificado.cer_cal_imag_url} alt="Certificado" />
                        <AvatarFallback>
                          <ImageIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <FileText className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {certificado.cer_cal_tipo_vac || 'Sin tipo'}
                    </div>
                    {certificado.cer_cal_infor_ensayo_vac && (
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {certificado.cer_cal_infor_ensayo_vac}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {certificado.cer_cal_cod_muestra_int ? (
                      <Badge variant="outline">
                        {certificado.cer_cal_cod_muestra_int}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">Sin código</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {getProductoNombre(certificado.pro_id_int)}
                    </div>
                  </TableCell>
                  <TableCell> 
                    <Badge
                      variant={certificado.cer_cal_imag_url ? "default" : "secondary"}
                      className="text-white"
                    >
                      {certificado.cer_cal_imag_url ? "Con imagen" : "Solo texto"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(certificado.cer_cal_updated_at_dt || certificado.cer_cal_created_at_dt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {certificado.cer_cal_imag_url && (
                          <DropdownMenuItem asChild>
                            <a
                              href={certificado.cer_cal_imag_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Ver imagen
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onEdit(certificado)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(certificado.cer_cal_id_int)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {pagination.totalItems > 0 && (
        <DataPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          onPageChange={pagination.setCurrentPage}
          onPageSizeChange={pagination.setPageSize}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      )}
    </div>
  )
}