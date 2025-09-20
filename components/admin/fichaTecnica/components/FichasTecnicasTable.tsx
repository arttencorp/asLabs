"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  ImageOff,
  Search,
  ExternalLink
} from "lucide-react"
import { formatDate } from '@/utils/index'
import type { FichasTecnicasTableProps } from '../types'
import { TABLE_CONFIG } from '../constants'

export function FichasTecnicasTable({
  fichasTecnicas,
  loading,
  onEdit,
  onDelete,
  productos
}: FichasTecnicasTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar fichas técnicas según el término de búsqueda
  const filteredFichas = fichasTecnicas.filter(ficha => {
    const searchLower = searchTerm.toLowerCase()
    const nombrePlanta = ficha.fit_tec_nom_planta_vac?.toLowerCase() || ''
    const codigo = ficha.fit_tec_cod_vac?.toLowerCase() || ''
    const producto = productos.find(p => p.pro_id_int === ficha.pro_id_int)?.pro_nomb_vac?.toLowerCase() || ''
    
    return nombrePlanta.includes(searchLower) || 
           codigo.includes(searchLower) || 
           producto.includes(searchLower)
  })

  const getProductoNombre = (productoId: string) => {
    const producto = productos.find(p => p.pro_id_int === productoId)
    return producto?.pro_nomb_vac || 'Producto no encontrado'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="mt-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={TABLE_CONFIG.SEARCH_PLACEHOLDER}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de Planta</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead>Fecha Actualización</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFichas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  {searchTerm ? 'No se encontraron fichas técnicas que coincidan con la búsqueda' : 'No hay fichas técnicas registradas'}
                </TableCell>
              </TableRow>
            ) : (
              filteredFichas.map((ficha) => (
                <TableRow key={ficha.fit_tec_id_int}>
                  <TableCell className="font-medium">
                    {ficha.fit_tec_nom_planta_vac || 'Sin nombre'}
                  </TableCell>
                  <TableCell>
                    {ficha.fit_tec_cod_vac ? (
                      <Badge variant="outline">{ficha.fit_tec_cod_vac}</Badge>
                    ) : (
                      <span className="text-gray-400">Sin código</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getProductoNombre(ficha.pro_id_int)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {ficha.fit_tec_imag_vac ? (
                        <>
                          <Badge variant="default" className="flex items-center space-x-1">
                            <ImageIcon className="h-3 w-3" />
                            <span>Con imagen</span>
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(ficha.fit_tec_imag_vac!, '_blank')}
                            className="h-6 w-6 p-0"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <ImageOff className="h-3 w-3" />
                          <span>Sin imagen</span>
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(ficha.fit_tec_created_at_dt)}
                  </TableCell>
                  <TableCell>
                    {formatDate(ficha.fit_tec_updated_at_dt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(ficha)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(ficha.fit_tec_id_int)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Información de resultados */}
      {searchTerm && (
        <div className="text-sm text-gray-600">
          Mostrando {filteredFichas.length} de {fichasTecnicas.length} fichas técnicas
        </div>
      )}
    </div>
  )
}