import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import { Edit, Trash2, Image, ImageOff } from "lucide-react"
import type { FirmaDatabase } from "../types"
import { formatFirmaNombre, formatFirmaCargo, firmaHasImage } from "../utils"

interface FirmaTableProps {
  firmas: FirmaDatabase[]
  loading: boolean
  onEdit: (firma: FirmaDatabase) => void
  onDelete: (id: string) => void
}

export function FirmaTable({ firmas, loading, onEdit, onDelete }: FirmaTableProps) {
  // Configurar paginación
  const pagination = usePagination<FirmaDatabase>({
    data: firmas,
    defaultPageSize: 10,
    defaultPage: 1
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && pagination.totalItems === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Cargando firmas...
                </TableCell>
              </TableRow>
            ) : pagination.totalItems === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No hay firmas registradas
                </TableCell>
              </TableRow>
            ) : (
              pagination.paginatedData.map((firma) => (
                <TableRow key={firma.firm_id_int}>
                  <TableCell>
                    {firmaHasImage(firma) ? (
                      <div className="w-16 h-12 border rounded overflow-hidden bg-gray-50">
                        <img 
                          src={firma.firm_url_blob || ''} 
                          alt={`Firma de ${formatFirmaNombre(firma)}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-12 border rounded flex items-center justify-center bg-gray-100">
                        <ImageOff className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatFirmaNombre(firma)}</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {formatFirmaCargo(firma)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {firmaHasImage(firma) ? (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        <Image className="h-3 w-3 mr-1" />
                        Con imagen
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-orange-600 border-orange-200">
                        <ImageOff className="h-3 w-3 mr-1" />
                        Sin imagen
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">
                      {new Date(firma.firm_created_dt).toLocaleDateString('es-PE')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(firma)}
                        disabled={loading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(firma.firm_id_int)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
