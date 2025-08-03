"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import type { PedidoForm, Cotizacion, EstadoPedido, Pedido } from '../types'

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
      setFormData({
        cotizacion_id: '',
        estado_id: estadosPedido.find(e => e.est_ped_tipo_int === 1)?.est_ped_id_int || '',
        codigo_rastreo: '',
        observaciones: '',
        numero_comprobante: '',
        imagen_url: ''
      })
    }
  }, [pedido, estadosPedido, open])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.cotizacion_id) {
      newErrors.cotizacion_id = 'La cotización es obligatoria'
    }

    if (!formData.estado_id) {
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
            {pedido ? 'Editar Pedido' : 'Crear Nuevo Pedido'}
          </DialogTitle>
          <DialogDescription>
            {pedido ? 'Modifica la información del pedido' : 'Completa la información del nuevo pedido'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cotizacion">Cotización *</Label>
              <Select
                value={formData.cotizacion_id}
                onValueChange={(value) => handleChange('cotizacion_id', value)}
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
              {errors.cotizacion_id && (
                <p className="text-sm text-red-500 mt-1">{errors.cotizacion_id}</p>
              )}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="codigo_rastreo">Código de Rastreo</Label>
              <Input
                id="codigo_rastreo"
                value={formData.codigo_rastreo}
                onChange={(e) => handleChange('codigo_rastreo', e.target.value)}
                placeholder="TR-2024-001"
              />
            </div>

            <div>
              <Label htmlFor="numero_comprobante">Número de Comprobante</Label>
              <Input
                id="numero_comprobante"
                value={formData.numero_comprobante}
                onChange={(e) => handleChange('numero_comprobante', e.target.value)}
                placeholder="F001-00001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="imagen_url">URL de Imagen</Label>
            <Input
              id="imagen_url"
              value={formData.imagen_url}
              onChange={(e) => handleChange('imagen_url', e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div>
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => handleChange('observaciones', e.target.value)}
              placeholder="Observaciones adicionales..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {pedido ? 'Actualizar' : 'Crear'} Pedido
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}