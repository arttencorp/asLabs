'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { PuestoFormDialogProps, PuestoForm } from '../types'

export function PuestoFormDialog({
  isOpen,
  onClose,
  editingPuesto,
  estadoOptions,
  modalidadOptions,
  onSubmit,
  loading,
  error,
}: PuestoFormDialogProps) {
  const [formData, setFormData] = useState<PuestoForm>({
    puest_nom_vac: '',
    puest_dec_vac: '',
    puest_perfil_vac: '',
    puest_ofrece_vac: '',
    puest_benef_vac: '',
    modalid_nom_vac: '',
    puest_salario_vac: '',
    estpuest_nom_vac: 'EN CONVOCATORIA',
  })

  useEffect(() => {
    if (editingPuesto) {
      setFormData({
        puest_nom_vac: editingPuesto.puest_nom_vac || '',
        puest_dec_vac: editingPuesto.puest_dec_vac || '',
        puest_perfil_vac: editingPuesto.puest_perfil_vac || '',
        puest_ofrece_vac: editingPuesto.puest_ofrece_vac || '',
        puest_benef_vac: editingPuesto.puest_benef_vac || '',
        modalid_nom_vac: editingPuesto.modalidad_trabajo?.modalid_nom_vac || '',
        puest_salario_vac: editingPuesto.puest_salario_vac || '',
        estpuest_nom_vac: editingPuesto.Estado_Puesto?.estpuest_nom_vac || estadoOptions[0] || '',
      })
    } else {
      setFormData({
        puest_nom_vac: '',
        puest_dec_vac: '',
        puest_perfil_vac: '',
        puest_ofrece_vac: '',
        puest_benef_vac: '',
        modalid_nom_vac: '',
        puest_salario_vac: '',
        estpuest_nom_vac: estadoOptions[0] || '',
      })
    }
  }, [editingPuesto, isOpen, estadoOptions, modalidadOptions])

  const estadoAnterior = editingPuesto?.Estado_Puesto?.estpuest_nom_vac || ''
  const cambiaDeConvocatoria = estadoAnterior === 'EN CONVOCATORIA' && formData.estpuest_nom_vac !== 'EN CONVOCATORIA' && formData.estpuest_nom_vac !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPuesto ? 'Editar Puesto' : 'Nuevo Puesto'}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="puest_nom_vac">Nombre del Puesto *</Label>
            <Input
              id="puest_nom_vac"
              value={formData.puest_nom_vac}
              onChange={(e) => setFormData(prev => ({ ...prev, puest_nom_vac: e.target.value }))}
              placeholder="Ej: Practicante en Microbiología"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="puest_dec_vac">Descripción *</Label>
            <Textarea
              id="puest_dec_vac"
              value={formData.puest_dec_vac}
              onChange={(e) => setFormData(prev => ({ ...prev, puest_dec_vac: e.target.value }))}
              placeholder="Descripción detallada del puesto..."
              rows={3}
            />
          </div>

          {/* Modalidad y Estado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modalid_nom_vac">Modalidad *</Label>
              <Select
                value={formData.modalid_nom_vac}
                onValueChange={(value) => setFormData(prev => ({ ...prev, modalid_nom_vac: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona modalidad" />
                </SelectTrigger>
                <SelectContent>
                  {modalidadOptions.map((mod) => (
                    <SelectItem key={mod} value={mod}>{mod}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estpuest_nom_vac">Estado *</Label>
              <Select
                value={formData.estpuest_nom_vac}
                onValueChange={(value) => setFormData(prev => ({ ...prev, estpuest_nom_vac: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadoOptions.map((estado) => (
                    <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {cambiaDeConvocatoria && (
            <Alert className="bg-amber-50 border-amber-300">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Atención:</strong> Al cambiar el estado de &quot;EN CONVOCATORIA&quot; a &quot;{formData.estpuest_nom_vac}&quot;, 
                este puesto dejará de aceptar nuevas postulaciones en la página pública.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="puest_salario_vac">Sueldo / Remuneración</Label>
            <Input
              id="puest_salario_vac"
              value={formData.puest_salario_vac}
              onChange={(e) => setFormData(prev => ({ ...prev, puest_salario_vac: e.target.value }))}
              placeholder="Ej: S/ 1,200 - S/ 1,500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="puest_perfil_vac">Perfil Requerido</Label>
            <Textarea
              id="puest_perfil_vac"
              value={formData.puest_perfil_vac}
              onChange={(e) => setFormData(prev => ({ ...prev, puest_perfil_vac: e.target.value }))}
              placeholder="Perfil del candidato ideal (separa por líneas para mostrar como lista)..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="puest_ofrece_vac">Qué Ofrecemos</Label>
            <Textarea
              id="puest_ofrece_vac"
              value={formData.puest_ofrece_vac}
              onChange={(e) => setFormData(prev => ({ ...prev, puest_ofrece_vac: e.target.value }))}
              placeholder="Lo que ofrecemos al candidato (separa por líneas)..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="puest_benef_vac">Beneficios</Label>
            <Textarea
              id="puest_benef_vac"
              value={formData.puest_benef_vac}
              onChange={(e) => setFormData(prev => ({ ...prev, puest_benef_vac: e.target.value }))}
              placeholder="Beneficios adicionales (separa por líneas)..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingPuesto ? 'Actualizar' : 'Crear Puesto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
