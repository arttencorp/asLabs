'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  FileText, 
  Search, 
  Eye, 
  Edit, 
  Printer,
  Filter,
  RefreshCw
} from 'lucide-react'
import { formatearFecha, obtenerColorEstado } from '../utils'
import type { DocumentoLabListProps } from '../types'

export function DocumentoLabList({
  documentos,
  areas,
  estadosDocumento,
  filtroEstado,
  filtroBusqueda,
  areaSeleccionada,
  onFiltroEstadoChange,
  onFiltroBusquedaChange,
  onAreaChange,
  onVerDocumento,
  onEditarDocumento,
  onImprimirDocumento,
  onRefrescar,
  loading = false
}: DocumentoLabListProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Documentos de Laboratorio ({documentos.length})
          </CardTitle>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefrescar}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        {/* Filtros */}
        <div className="grid gap-4 pt-4 md:grid-cols-4">
          {/* Búsqueda */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por código o cliente..."
              value={filtroBusqueda}
              onChange={(e) => onFiltroBusquedaChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filtro por área */}
          <Select
            value={areaSeleccionada || 'all'}
            onValueChange={(value) => onAreaChange(value === 'all' ? '' : value)}
          >
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Todas las áreas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las áreas</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area.area_id_int} value={area.area_id_int}>
                  {area.area_nombre_vac}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro por estado */}
          <Select
            value={filtroEstado || 'all'}
            onValueChange={(value) => onFiltroEstadoChange(value === 'all' ? '' : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {estadosDocumento.map((estado) => (
                <SelectItem key={estado.est_doc_id_int} value={estado.est_doc_id_int}>
                  {estado.est_doc_nomb_vac}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : documentos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No hay documentos</p>
            <p className="text-sm">
              {filtroBusqueda || filtroEstado || areaSeleccionada
                ? 'No se encontraron documentos con los filtros aplicados'
                : 'Cree un nuevo documento para comenzar'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha Emisión</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentos.map((documento) => (
                  <TableRow key={documento.id}>
                    <TableCell className="font-medium">
                      {documento.codigo || '-'}
                    </TableCell>
                    <TableCell>
                      {documento.tipoDocumentoNombre || '-'}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{documento.servicioNombre}</p>
                        {documento.areaNombre && (
                          <p className="text-xs text-muted-foreground">
                            {documento.areaNombre}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{documento.cliente.razonSocial || 'Sin cliente'}</p>
                        {documento.cliente.ruc && (
                          <p className="text-xs text-muted-foreground">
                            {documento.cliente.ruc}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatearFecha(documento.fechaEmision)}
                    </TableCell>
                    <TableCell>
                      <Badge className={obtenerColorEstado(documento.estadoNombre)}>
                        {documento.estadoNombre}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onVerDocumento(documento.id)}
                          title="Ver documento"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditarDocumento(documento.id)}
                          title="Editar documento"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {documento.estadoNombre?.toLowerCase().includes('emitido') && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onImprimirDocumento(documento.id)}
                            title="Imprimir documento"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
