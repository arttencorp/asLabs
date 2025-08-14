import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, User, Building2 } from "lucide-react"
import type { ClientePersona } from "@/types/database"
import { formatHectareas } from "../utils"
import { getNombreCompleto as formatClienteName, getDocumentoCliente as formatClienteDocument } from "@/utils/index"

interface ClientesTableProps {
  clientes: ClientePersona[]
  loading: boolean
  onEdit: (cliente: ClientePersona) => void
  onDelete: (id: string) => void
}

export function ClientesTable({ clientes, loading, onEdit, onDelete }: ClientesTableProps) {
  if (loading && clientes.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Cultivo</TableHead>
              <TableHead>Hectáreas Disp.</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                Cargando clientes...
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  if (clientes.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Cultivo</TableHead>
              <TableHead>Hectáreas Disp.</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No hay clientes registrados
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Cultivo</TableHead>
            <TableHead>Hectáreas Disp.</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
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
              <TableCell>{cliente.per_email_vac}</TableCell>
              <TableCell>{cliente.per_telef_int}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{cliente.per_cultivo_vac}</div>
                  {cliente.per_cantidad_int && (
                    <div className="text-sm text-gray-500">
                      {cliente.per_cantidad_int}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {cliente.per_hec_disp_int ? formatHectareas(cliente.per_hec_disp_int) : '-'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(cliente)}
                    disabled={loading}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(cliente.per_id_int)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}