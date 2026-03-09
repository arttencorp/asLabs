import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import { Edit, Trash2, User, Building2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ClientePersona } from "@/types/database"
import { formatHectareas } from "../utils"
import {
  getNombreCompleto as formatClienteName,
  getDocumentoCliente as formatClienteDocument,
  getEmailCliente as formatClienteEmail,
  getTelfCliente as formatClienteTelf,
  getCultivoCliente as formatClienteCultivo
} from "@/utils/index"

interface ClientesTableProps {
  clientes: ClientePersona[]
  loading: boolean
  onEdit: (cliente: ClientePersona) => void
  onDelete: (id: string) => void
}

export function ClientesTable({ clientes, loading, onEdit, onDelete }: ClientesTableProps) {
  const router = useRouter()

  // Configurar paginación
  const pagination = usePagination<ClientePersona>({
    data: clientes,
    defaultPageSize: 10,
    defaultPage: 1
  })

  const handleViewDetalle = (cliente: ClientePersona) => {
    router.push(`/admin/clientes/${cliente.per_id_int}`)
  }
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center" >Tipo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-center">Documento</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Teléfono</TableHead>
              <TableHead className="text-center">Cultivo</TableHead>
              <TableHead className="text-center">Hectáreas Disp.</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && pagination.totalItems === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Cargando clientes...
                </TableCell>
              </TableRow>
            ) : pagination.totalItems === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No hay clientes registrados
                </TableCell>
              </TableRow>
            ) : (
              pagination.paginatedData.map((cliente) => (
                <TableRow key={cliente.per_id_int}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {cliente.tipo === 'natural' ? (
                        <>
                          <User className="h-4 w-4 text-blue-600" />
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            Natural
                          </Badge>
                        </>
                      ) : (
                        <>
                          <Building2 className="h-4 w-4 text-purple-600" />
                          <Badge variant="outline" className="text-purple-600 border-purple-200">
                            Jurídica
                          </Badge>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatClienteName(cliente)}</div>
                      <div className="text-sm text-gray-500">
                        Contacto: {cliente.per_nom_contac_vac}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {formatClienteDocument(cliente)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {formatClienteEmail(cliente)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {formatClienteTelf(cliente)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {formatClienteCultivo(cliente)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatHectareas(cliente.per_hec_disp_int)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-150"
                        onClick={() => handleViewDetalle(cliente)}
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onEdit(cliente)}
                        disabled={loading}
                        title="Editar cliente"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
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