"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import type { EstadoPedido } from '@/types/database'
import type { PedidoForm, Cotizacion, Pedido } from '../types'

interface PedidoFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: PedidoForm) => Promise<void>
  pedido?: Pedido | null
  cotizaciones: Cotizacion[]
  estadosPedido: EstadoPedido[]
  loading: boolean
}

export function PedidoFormDialog({ 
  open, 
  onClose, 
  onSubmit, 
  pedido, 
  cotizaciones, 
  estadosPedido, 
  loading 
}: PedidoFormProps) {
  const [formData, setFormData] = useState<PedidoForm>({
    cotizacion_id: '',
    estado_id: '',
    codigo_rastreo: '',
    observaciones: '',
    numero_comprobante: '',
    imagen_url: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (pedido) {
      setFormData({
        cotizacion_id: pedido.cot_id_int,
        estado_id: pedido.est_ped_id_int,
        codigo_rastreo: pedido.ped_cod_rastreo_vac || '',
        observaciones: pedido.ped_observacion_vac || '',
        numero_comprobante: pedido.ped_num_comprob_vac || '',
        imagen_url: pedido.ped_imagen_url || ''
      })
    } else {
      // Para crear pedido nuevo: solo resetear cotización, estado se asigna automáticamente
      setFormData({
        cotizacion_id: '',
        estado_id: '',
        codigo_rastreo: '',
        observaciones: '',
        numero_comprobante: '',
        imagen_url: ''
      })
    }
  }, [pedido, estadosPedido, open])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.cotizacion_id || formData.cotizacion_id.trim() === '') {
      newErrors.cotizacion_id = 'Debe seleccionar una cotización'
    }

    // Para crear pedido, solo validar cotización
    // Para editar pedido, también validar estado
    if (pedido && (!formData.estado_id || formData.estado_id.trim() === '')) {
      newErrors.estado_id = 'El estado es obligatorio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleChange = (field: keyof PedidoForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {pedido ? 'Editar Pedido' : 'Iniciar Nuevo Pedido'}
          </DialogTitle>
          <DialogDescription>
            {pedido ? 'Modifica la información del pedido' : 'Selecciona una cotización para crear un pedido automáticamente'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!pedido ? (
            // CREAR/INICIAR PEDIDO: SOLO mostrar selector de cotización
            <div>
              <Label htmlFor="cotizacion">Seleccionar Cotización *</Label>
              <Select
                value={formData.cotizacion_id}
                onValueChange={(value) => handleChange('cotizacion_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cotización para iniciar pedido" />
                </SelectTrigger>
                <SelectContent>
                  {cotizaciones.map((cotizacion) => (
                    <SelectItem key={cotizacion.cot_id_int} value={cotizacion.cot_id_int}>
                      <div className="flex flex-col">
                        <span className="font-medium">{cotizacion.cot_num_vac}</span>
                        <span className="text-sm text-gray-500">
                          {cotizacion.persona ? 
                            (cotizacion.persona.tipo === 'natural' && cotizacion.persona.persona_natural ?
                              `${cotizacion.persona.persona_natural.per_nat_nomb_vac} ${cotizacion.persona.persona_natural.per_nat_apell_vac}` :
                              cotizacion.persona.persona_juridica?.per_jurd_razSocial_vac
                            ) : 'Sin cliente'
                          }
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cotizacion_id && (
                <p className="text-sm text-red-500 mt-1">{errors.cotizacion_id}</p>
              )}
              
              {/* Mensaje informativo */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">¿Qué sucederá?</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Se creará automáticamente con estado "Recibido"</li>
                        <li>Se generará código de seguimiento único (ASL-XXXXXXXX)</li>
                        <li>El cliente podrá rastrear el pedido</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // EDITAR PEDIDO: Mostrar todos los campos necesarios
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cotizacion">Cotización</Label>
                <Select
                  value={formData.cotizacion_id}
                  onValueChange={(value) => handleChange('cotizacion_id', value)}
                  disabled={true}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cotización" />
                  </SelectTrigger>
                  <SelectContent>
                    {cotizaciones.map((cotizacion) => (
                      <SelectItem key={cotizacion.cot_id_int} value={cotizacion.cot_id_int}>
                        {cotizacion.cot_num_vac} - {cotizacion.persona ? 
                          (cotizacion.persona.tipo === 'natural' && cotizacion.persona.persona_natural ?
                            `${cotizacion.persona.persona_natural.per_nat_nomb_vac} ${cotizacion.persona.persona_natural.per_nat_apell_vac}` :
                            cotizacion.persona.persona_juridica?.per_jurd_razSocial_vac
                          ) : 'Sin cliente'
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estado">Estado *</Label>
                <Select
                  value={formData.estado_id}
                  onValueChange={(value) => handleChange('estado_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosPedido.map((estado) => (
                      <SelectItem key={estado.est_ped_id_int} value={estado.est_ped_id_int}>
                        {estado.est_ped_desc_vac}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.estado_id && (
                  <p className="text-sm text-red-500 mt-1">{errors.estado_id}</p>
                )}
              </div>

              <div>
                <Label htmlFor="codigo_rastreo">Código de Rastreo</Label>
                <Input
                  id="codigo_rastreo"
                  value={formData.codigo_rastreo}
                  onChange={(e) => handleChange('codigo_rastreo', e.target.value)}
                  placeholder="Código de rastreo externo"
                />
              </div>

              <div>
                <Label htmlFor="numero_comprobante">Número de Comprobante</Label>
                <Input
                  id="numero_comprobante"
                  value={formData.numero_comprobante}
                  onChange={(e) => handleChange('numero_comprobante', e.target.value)}
                  placeholder="Número de comprobante"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => handleChange('observaciones', e.target.value)}
                  placeholder="Observaciones adicionales del pedido"
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {pedido ? 'Actualizar Pedido' : 'Iniciar Pedido'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}