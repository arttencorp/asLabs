"use client"

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import { Plus, Edit, Trash2, Image, FileText, Leaf, MapPin, Clock, Search } from "lucide-react"
import { useFichasTecnicasCompletas } from '../hooks/useFichasTecnicasCompletas'
import { FichaTecnicaCompletaFormDialog } from './FichaTecnicaCompletaFormDialog'
import type { FichaTecnicaCompletaDatabase } from '@/types/database'

export function FichasTecnicasAdminCompleta() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const {
    items,
    productos,
    loading,
    productosLoading,
    error,
    success,
    editingItem,
    isDialogOpen,
    stats,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    handleCreateCompleta,
    handleUpdateCompleta,
    handleDelete,
    setError
  } = useFichasTecnicasCompletas()

  const getProductName = (productId: string) => {
    const producto = productos.find(p => p.pro_id_int === productId)
    return producto?.pro_nomb_vac || 'Producto desconocido'
  }

  // Filtrar fichas técnicas según término de búsqueda
  const filteredItems = useMemo(() => {
    return items.filter(ficha => {
      const searchLower = searchTerm.toLowerCase()
      const nombrePlanta = ficha.fit_tec_nom_planta_vac?.toLowerCase() || ''
      const codigo = ficha.fit_tec_cod_vac?.toLowerCase() || ''
      const producto = getProductName(ficha.pro_id_int).toLowerCase()
      const familia = ficha.taxonomia?.ta_familia_vac?.toLowerCase() || ''
      const genero = ficha.taxonomia?.ta_genero_vac?.toLowerCase() || ''
      const nombreCientifico = ficha.taxonomia?.ta_nombre_cientifico_vac?.toLowerCase() || ''
      
      return nombrePlanta.includes(searchLower) ||
        codigo.includes(searchLower) ||
        producto.includes(searchLower) ||
        familia.includes(searchLower) ||
        genero.includes(searchLower) ||
        nombreCientifico.includes(searchLower) ||
        ficha.fit_tec_id_int.toString().includes(searchTerm)
    })
  }, [items, searchTerm, productos])

  // Configurar paginación
  const pagination = usePagination({
    data: filteredItems,
    defaultPageSize: 10,
    defaultPage: 1
  })

  const handleSubmit = async (formData: any) => {
    if (editingItem) {
      await handleUpdateCompleta(formData)
    } else {
      await handleCreateCompleta(formData)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fichas Técnicas Completas</h1>
          <p className="text-muted-foreground">
            Gestiona fichas técnicas con información detallada de taxonomía, colecta y características.
          </p>
        </div>
        <Button onClick={openCreateDialog} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Ficha Completa
        </Button>
      </div>

      {/* Alertas */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Fichas</CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{stats.totalFichas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Con Imagen</CardTitle>
            <Image className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{stats.fichasConImagen}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Con Taxonomía</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.fichasConTaxonomia}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Con Detalle</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{stats.fichasConDetalle}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Con Zona Colecta</CardTitle>
            <MapPin className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{stats.fichasConZonaColecta}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Sin Imagen</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">{stats.fichasSinImagen}</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Fichas Técnicas */}
      <Card>
        <CardHeader>
          <CardTitle>Fichas Técnicas ({pagination.totalItems})</CardTitle>
          <CardDescription>
            Lista completa de fichas técnicas con toda su información relacionada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, código, producto, familia, género..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Cargando fichas técnicas...</div>
            </div>
          ) : pagination.totalItems === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">
                {searchTerm ? 'No se encontraron fichas que coincidan con la búsqueda' : 'No hay fichas técnicas creadas'}
              </div>
              {!searchTerm && (
                <Button onClick={openCreateDialog} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Primera Ficha
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {pagination.paginatedData.map((ficha) => (
                  <FichaTecnicaCompletaCard
                    key={ficha.fit_tec_id_int}
                    ficha={ficha}
                    productName={getProductName(ficha.pro_id_int)}
                    onEdit={() => openEditDialog(ficha)}
                    onDelete={() => handleDelete(ficha.fit_tec_id_int)}
                  />
                ))}
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
                  className="mt-6"
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Formulario */}
      <FichaTecnicaCompletaFormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        editingFichaTecnica={editingItem}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        productos={productos}
        productosLoading={productosLoading}
      />
    </div>
  )
}

// Componente para cada tarjeta de ficha técnica
interface FichaTecnicaCompletaCardProps {
  ficha: FichaTecnicaCompletaDatabase
  productName: string
  onEdit: () => void
  onDelete: () => void
}

function FichaTecnicaCompletaCard({ 
  ficha, 
  productName, 
  onEdit, 
  onDelete 
}: FichaTecnicaCompletaCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {/* Información principal */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">
                {ficha.fit_tec_nom_planta_vac || 'Sin nombre'}
              </h3>
              {ficha.fit_tec_cod_vac && (
                <Badge variant="outline">{ficha.fit_tec_cod_vac}</Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              <strong>Producto:</strong> {productName}
            </p>

            {/* Badges de información disponible */}
            <div className="flex flex-wrap gap-2">
              {ficha.fit_tec_imag_vac && (
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-800 bg-blue-50">
                  <Image className="mr-1 h-3 w-3" />
                  Imagen
                </Badge>
              )}
              {ficha.taxonomia && (
                <Badge variant="outline" className="text-xs border-green-300 text-green-800 bg-green-50">
                  <Leaf className="mr-1 h-3 w-3" />
                  Taxonomía
                </Badge>
              )}
              {ficha.detalle && (
                <Badge variant="outline" className="text-xs border-purple-300 text-purple-800 bg-purple-50">
                  <FileText className="mr-1 h-3 w-3" />
                  Detalle
                </Badge>
              )}
              {ficha.zona_colecta && (
                <Badge variant="outline" className="text-xs border-orange-300 text-orange-800 bg-orange-50">
                  <MapPin className="mr-1 h-3 w-3" />
                  Zona Colecta
                </Badge>
              )}
            </div>

            {/* Información adicional en pestañas */}
            {(ficha.taxonomia || ficha.detalle || ficha.zona_colecta) && (
              <div className="mt-4">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    {ficha.taxonomia && <TabsTrigger value="taxonomia">Taxonomía</TabsTrigger>}
                    {ficha.detalle && <TabsTrigger value="detalle">Detalle</TabsTrigger>}
                    {ficha.zona_colecta && <TabsTrigger value="zona">Zona</TabsTrigger>}
                  </TabsList>
                  
                  <TabsContent value="info" className="mt-4">
                    <div className="text-sm space-y-1 text-gray-700">
                      <p><strong className="text-gray-800">Creada:</strong> {new Date(ficha.fit_tec_created_at_dt).toLocaleDateString('es-ES')}</p>
                      <p><strong className="text-gray-800">Actualizada:</strong> {new Date(ficha.fit_tec_updated_at_dt).toLocaleDateString('es-ES')}</p>
                    </div>
                  </TabsContent>

                  {ficha.taxonomia && (
                    <TabsContent value="taxonomia" className="mt-4">
                      <div className="text-sm space-y-1 text-gray-700">
                        {ficha.taxonomia.ta_familia_vac && <p><strong className="text-green-800">Familia:</strong> {ficha.taxonomia.ta_familia_vac}</p>}
                        {ficha.taxonomia.ta_genero_vac && <p><strong className="text-green-800">Género:</strong> {ficha.taxonomia.ta_genero_vac}</p>}
                        {ficha.taxonomia.ta_nombre_cientifico_vac && <p><strong className="text-green-800">Nombre Científico:</strong> <em className="text-green-700">{ficha.taxonomia.ta_nombre_cientifico_vac}</em></p>}
                        {ficha.taxonomia.ta_nombre_comun_vac && <p><strong className="text-green-800">Nombre Común:</strong> {ficha.taxonomia.ta_nombre_comun_vac}</p>}
                      </div>
                    </TabsContent>
                  )}

                  {ficha.detalle && (
                    <TabsContent value="detalle" className="mt-4">
                      <div className="text-sm space-y-1 text-gray-700">
                        {ficha.detalle.dft_desc_vac && <p><strong className="text-purple-800">Descripción:</strong> {ficha.detalle.dft_desc_vac}</p>}
                        {ficha.detalle.dft_parcela_vac && <p><strong className="text-purple-800">Parcela:</strong> {ficha.detalle.dft_parcela_vac}</p>}
                        {ficha.detalle.dft_present_vac && <p><strong className="text-purple-800">Presentación:</strong> {ficha.detalle.dft_present_vac}</p>}
                      </div>
                    </TabsContent>
                  )}

                  {ficha.zona_colecta && (
                    <TabsContent value="zona" className="mt-4">
                      <div className="text-sm space-y-1 text-gray-700">
                        {ficha.zona_colecta.zcg_pais_vac && <p><strong className="text-orange-800">País:</strong> {ficha.zona_colecta.zcg_pais_vac}</p>}
                        {ficha.zona_colecta.zcg_region_vac && <p><strong className="text-orange-800">Región:</strong> {ficha.zona_colecta.zcg_region_vac}</p>}
                        {ficha.zona_colecta.zcg_provincia_vac && <p><strong className="text-orange-800">Provincia:</strong> {ficha.zona_colecta.zcg_provincia_vac}</p>}
                        {ficha.zona_colecta.zcg_fecha_vac && <p><strong className="text-orange-800">Fecha:</strong> {new Date(ficha.zona_colecta.zcg_fecha_vac).toLocaleDateString('es-ES')}</p>}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            )}
          </div>

          {/* Imagen y acciones */}
          <div className="flex flex-col items-end gap-3 ml-4">
            {ficha.fit_tec_imag_vac && (
              <img
                src={ficha.fit_tec_imag_vac}
                alt={ficha.fit_tec_nom_planta_vac || 'Ficha técnica'}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}