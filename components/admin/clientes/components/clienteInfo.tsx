"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Building2, Mail, Phone, MapPin, Sprout, Calendar } from "lucide-react"
import { formatDate, getNombreCompleto, getDocumentoCliente, getEmailCliente, getTelfCliente } from '@/utils/index'
import type { ClientePersona } from '@/types/database'

interface ClienteInfoProps {
  cliente: ClientePersona
}

export function ClienteInfo({ cliente }: ClienteInfoProps) {
  const esPersonaNatural = cliente.tipo === 'natural'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {esPersonaNatural ? (
            <User className="h-5 w-5 text-blue-600" />
          ) : (
            <Building2 className="h-5 w-5 text-green-600" />
          )}
          {getNombreCompleto(cliente)}
          <Badge variant={esPersonaNatural ? "outline" : "default"} 
                 className={esPersonaNatural ? "text-blue-600 border-blue-200" : "bg-green-600"}>
            {esPersonaNatural ? "Persona Natural" : "Persona Jurídica"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Información de identificación */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Identificación
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-600">Documento:</span>
                <span>{getDocumentoCliente(cliente) || 'No registrado'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-600">Tipo:</span>
                <span>{esPersonaNatural ? 'DNI' : 'RUC'}</span>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Contacto
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{getEmailCliente(cliente) || 'No registrado'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{getTelfCliente(cliente) || 'No registrado'}</span>
              </div>
              {cliente.per_direc_vac && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{cliente.per_direc_vac}</span>
                </div>
              )}
            </div>
          </div>

          {/* Información agrícola */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Información Agrícola
            </h4>
            <div className="space-y-2">
              {cliente.per_cultivo_vac && (
                <div className="flex items-center gap-2 text-sm">
                  <Sprout className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-gray-600">Cultivo:</span>
                  <span>{cliente.per_cultivo_vac}</span>
                </div>
              )}
              {cliente.per_hec_disp_int && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600">Hectáreas Disponibles:</span>
                  <span>{cliente.per_hec_disp_int} ha</span>
                </div>
              )}
              {cliente.per_hec_inst_int && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600">Hectáreas Instaladas:</span>
                  <span>{cliente.per_hec_inst_int} ha</span>
                </div>
              )}
              {cliente.per_fec_prob_dt && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-600">Fecha Probable:</span>
                  <span>{formatDate(cliente.per_fec_prob_dt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Observaciones */}
        {cliente.per_observaciones_vac && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
              Observaciones
            </h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              {cliente.per_observaciones_vac}
            </p>
          </div>
        )}

        {/* Fecha de registro */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Cliente desde: {formatDate(cliente.per_created_at_dt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
