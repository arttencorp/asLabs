'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Building2, Calendar, FileText, User } from 'lucide-react'
import type { InformacionDocumentoProps } from '../types'

export function InformacionDocumento({
  documento,
  areas,
  servicios,
  tiposDocumento,
  clientes,
  areaSeleccionada,
  onAreaChange,
  onServicioChange,
  onTipoDocumentoChange,
  onClienteChange,
  onFechaEmisionChange,
  disabled = false
}: InformacionDocumentoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Información del Documento */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Información del Documento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Código del documento (solo lectura) */}
          <div className="space-y-2">
            <Label htmlFor="codigo">Código</Label>
            <Input
              id="codigo"
              value={documento.codigo || 'Se generará al emitir'}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Área */}
          <div className="space-y-2">
            <Label htmlFor="area">Área *</Label>
            <Select
              value={areaSeleccionada}
              onValueChange={onAreaChange}
              disabled={disabled}
            >
              <SelectTrigger id="area">
                <SelectValue placeholder="Seleccionar área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.area_id_int} value={area.area_id_int}>
                    {area.area_nombre_vac}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Servicio */}
          <div className="space-y-2">
            <Label htmlFor="servicio">Servicio *</Label>
            <Select
              value={documento.servicioId}
              onValueChange={onServicioChange}
              disabled={disabled || !areaSeleccionada}
            >
              <SelectTrigger id="servicio">
                <SelectValue placeholder={
                  areaSeleccionada 
                    ? "Seleccionar servicio" 
                    : "Seleccione un área primero"
                } />
              </SelectTrigger>
              <SelectContent>
                {servicios.map((servicio) => (
                  <SelectItem key={servicio.serv_id_int} value={servicio.serv_id_int}>
                    {servicio.serv_nombre_vac}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Documento */}
          <div className="space-y-2">
            <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
            <Select
              value={documento.tipoDocumentoId}
              onValueChange={onTipoDocumentoChange}
              disabled={disabled}
            >
              <SelectTrigger id="tipoDocumento">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposDocumento.map((tipo) => (
                  <SelectItem key={tipo.tip_doc_id_int} value={tipo.tip_doc_id_int}>
                    {tipo.tip_doc_nomb_vac}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fecha de Emisión */}
          <div className="space-y-2">
            <Label htmlFor="fechaEmision" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fecha de Emisión
            </Label>
            <Input
              id="fechaEmision"
              type="date"
              value={documento.fechaEmision}
              onChange={(e) => onFechaEmisionChange?.(e.target.value)}
              disabled={disabled || !!documento.codigo}
            />
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label>Estado</Label>
            <div className={`
              inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium
              ${documento.estadoNombre?.toLowerCase().includes('borrador') 
                ? 'bg-gray-100 text-gray-700' 
                : documento.estadoNombre?.toLowerCase().includes('emitido')
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
              }
            `}>
              {documento.estadoNombre || 'Borrador'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información del Cliente */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selector de Cliente */}
          <div className="space-y-2">
            <Label htmlFor="cliente">Seleccionar Cliente *</Label>
            <Select
              value={documento.cliente.id}
              onValueChange={onClienteChange}
              disabled={disabled}
            >
              <SelectTrigger id="cliente">
                <SelectValue placeholder="Buscar cliente..." />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => {
                  const nombre = cliente.persona_juridica?.per_jurd_razSocial_vac 
                    || `${cliente.persona_natural?.per_nat_nomb_vac || ''} ${cliente.persona_natural?.per_nat_apell_vac || ''}`.trim()
                    || cliente.per_nom_contac_vac
                    || 'Sin nombre'
                  
                  return (
                    <SelectItem key={cliente.per_id_int} value={cliente.per_id_int}>
                      {nombre}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Datos del cliente seleccionado */}
          {documento.cliente.id && (
            <>
              <div className="space-y-2">
                <Label>Razón Social / Nombre</Label>
                <Input
                  value={documento.cliente.razonSocial}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>RUC / DNI</Label>
                  <Input
                    value={documento.cliente.ruc}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input
                    value={documento.cliente.telefono}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Contacto</Label>
                <Input
                  value={documento.cliente.contacto}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={documento.cliente.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label>Dirección</Label>
                <Input
                  value={documento.cliente.direccion}
                  disabled
                  className="bg-muted"
                />
              </div>
            </>
          )}

          {!documento.cliente.id && (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <User className="h-8 w-8 mr-2 opacity-50" />
              <span>Seleccione un cliente para ver sus datos</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
