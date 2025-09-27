"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Download, Search, RefreshCw, Plus } from "lucide-react"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import { formatDate } from "@/utils"

// Simplificando la interfaz para que coincida con lo que realmente devuelve la BD
interface CotizacionItem {
  cot_id_int: string
  cot_num_vac: string
  cot_fec_emis_dt: string
  cot_fec_venc_dt: string
  cot_igv_bol: boolean
  per_id_int: string
  persona?: {
    per_nom_contac_vac: string | null
    Persona_Natural?: Array<{
      per_nat_nomb_vac: string | null
      per_nat_apell_vac: string | null
    }>
    Persona_Juridica?: Array<{
      per_jurd_razSocial_vac: string | null
    }>
  }
  estado_cotizacion?: {
    est_cot_desc_vac: string
    est_cot_tipo_int: number
  }
  detalle_cotizacion?: Array<{
    det_cot_cant_int: number
    det_cot_prec_hist_int: number
    producto?: {
      pro_nomb_vac: string
    }
  }>
  informacion_adicional?: any
}

interface CotizacionesTableProps {
  cotizaciones: CotizacionItem[]
  loading: boolean
  onVerCotizacion: (cotizacion: CotizacionItem) => void
  onEditarCotizacion: (cotizacion: CotizacionItem) => void
  onDescargarCotizacion: (cotizacion: CotizacionItem) => void
  onRefresh?: () => void
  onCreate?: () => void
}

export function CotizacionesTable({ 
  cotizaciones, 
  loading, 
  onVerCotizacion, 
  onEditarCotizacion, 
  onDescargarCotizacion,
  onRefresh,
  onCreate
}: CotizacionesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Filtrar cotizaciones basado en el término de búsqueda
  const filteredCotizaciones = useMemo(() => {
    return cotizaciones.filter(cotizacion => {
      const searchLower = searchTerm.toLowerCase()
      const nombreCliente = (() => {
        if (cotizacion.persona?.Persona_Juridica?.[0]?.per_jurd_razSocial_vac) {
          return cotizacion.persona.Persona_Juridica[0].per_jurd_razSocial_vac
        }
        if (cotizacion.persona?.Persona_Natural?.[0]) {
          const natural = cotizacion.persona.Persona_Natural[0]
          return `${natural.per_nat_nomb_vac || ''} ${natural.per_nat_apell_vac || ''}`.trim()
        }
        if (cotizacion.persona?.per_nom_contac_vac) {
          return cotizacion.persona.per_nom_contac_vac
        }
        return 'Cliente no especificado'
      })()

      return (
        cotizacion.cot_num_vac.toLowerCase().includes(searchLower) ||
        nombreCliente.toLowerCase().includes(searchLower)
      )
    })
  }, [cotizaciones, searchTerm])
  
  // Configurar paginación
  const pagination = usePagination<CotizacionItem>({
    data: filteredCotizaciones,
    defaultPageSize: 10,
    defaultPage: 1
  })

  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando cotizaciones...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Cotizaciones</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por número de cotización o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {pagination.totalItems === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'No se encontraron cotizaciones que coincidan con la búsqueda' : 'No hay cotizaciones registradas'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Número
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Emisión
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IGV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pagination.paginatedData.map((cotizacion: CotizacionItem) => {
                    // Calcular nombre completo del cliente
                    const nombreCliente = (() => {
                      if (cotizacion.persona?.Persona_Juridica?.[0]?.per_jurd_razSocial_vac) {
                        return cotizacion.persona.Persona_Juridica[0].per_jurd_razSocial_vac
                      }
                      if (cotizacion.persona?.Persona_Natural?.[0]) {
                        const natural = cotizacion.persona.Persona_Natural[0]
                        return `${natural.per_nat_nomb_vac || ''} ${natural.per_nat_apell_vac || ''}`.trim()
                      }
                      if (cotizacion.persona?.per_nom_contac_vac) {
                        return cotizacion.persona.per_nom_contac_vac
                      }
                      return 'Cliente no especificado'
                    })()

                    // Calcular total desde detalle_cotizacion (cantidad × precio histórico)
                    const total = cotizacion.detalle_cotizacion?.reduce((sum, detalle) => {
                      return sum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int)
                    }, 0) || 0

                    return (
                      <tr key={cotizacion.cot_id_int} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {cotizacion.cot_num_vac}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {nombreCliente}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(cotizacion.cot_fec_emis_dt, { short: true })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          S/ {total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {cotizacion.cot_igv_bol ? 'Con IGV' : 'Sin IGV'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onVerCotizacion(cotizacion)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onEditarCotizacion(cotizacion)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onDescargarCotizacion(cotizacion)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Descargar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <DataPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              pageSize={pagination.pageSize}
              totalItems={pagination.totalItems}
              onPageChange={pagination.setCurrentPage}
              onPageSizeChange={pagination.setPageSize}
              showPageSizeSelector={true}
              pageSizeOptions={[5, 10, 20, 50]}
              className="mt-4"
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}