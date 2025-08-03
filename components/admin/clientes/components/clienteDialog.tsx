import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, User, Building2 } from "lucide-react"
import { ClienteForm, Cliente } from "../types"
import { CULTIVOS_OPCIONES } from "../constants"

interface ClienteDialogProps {
  isOpen: boolean
  onClose: () => void
  clienteForm: ClienteForm
  setClienteForm: (form: ClienteForm) => void
  editingCliente: Cliente | null
  loading: boolean
  onSubmit: () => void
}

export function ClienteDialog({
  isOpen,
  onClose,
  clienteForm,
  setClienteForm,
  editingCliente,
  loading,
  onSubmit
}: ClienteDialogProps) {
  const updateForm = (field: keyof ClienteForm, value: any) => {
    setClienteForm({ ...clienteForm, [field]: value })
  }

  const handleTipoChange = (value: string) => {
    if (value === 'natural' || value === 'juridica') {
      setClienteForm({ 
        ...clienteForm, 
        tipo: value,
        // Limpiar campos del otro tipo
        ...(value === 'natural' ? {
          per_jurd_ruc_int: null,
          per_jurd_razSocial_vac: ''
        } : {
          per_nat_dni_int: null,
          per_nat_nomb_vac: '',
          per_nat_apell_vac: ''
        })
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCliente ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
          </DialogTitle>
          <DialogDescription>
            {editingCliente 
              ? 'Modifica la información del cliente' 
              : 'Completa la información del nuevo cliente'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs value={clienteForm.tipo} onValueChange={handleTipoChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="natural" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Persona Natural
            </TabsTrigger>
            <TabsTrigger value="juridica" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Persona Jurídica
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            {/* Datos del Documento */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Datos de Identificación</h3>
              
              <TabsContent value="natural" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dni">DNI</Label>
                    <Input
                      id="dni"
                      type="number"
                      value={clienteForm.per_nat_dni_int || ''}
                      onChange={(e) => updateForm('per_nat_dni_int', e.target.value ? Number(e.target.value) : null)}
                      placeholder="12345678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nombres">Nombres *</Label>
                    <Input
                      id="nombres"
                      value={clienteForm.per_nat_nomb_vac || ''}
                      onChange={(e) => updateForm('per_nat_nomb_vac', e.target.value)}
                      placeholder="Juan Carlos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apellidos">Apellidos *</Label>
                    <Input
                      id="apellidos"
                      value={clienteForm.per_nat_apell_vac || ''}
                      onChange={(e) => updateForm('per_nat_apell_vac', e.target.value)}
                      placeholder="García López"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="juridica" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ruc">RUC</Label>
                    <Input
                      id="ruc"
                      type="number"
                      value={clienteForm.per_jurd_ruc_int || ''}
                      onChange={(e) => updateForm('per_jurd_ruc_int', e.target.value ? Number(e.target.value) : null)}
                      placeholder="20123456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="razonSocial">Razón Social *</Label>
                    <Input
                      id="razonSocial"
                      value={clienteForm.per_jurd_razSocial_vac || ''}
                      onChange={(e) => updateForm('per_jurd_razSocial_vac', e.target.value)}
                      placeholder="Empresa S.A.C."
                    />
                  </div>
                </div>
              </TabsContent>
            </div>

            {/* Datos de Contacto */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Datos de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contacto">Nombre de Contacto</Label>
                  <Input
                    id="contacto"
                    value={clienteForm.per_nom_contac_vac}
                    onChange={(e) => updateForm('per_nom_contac_vac', e.target.value)}
                    placeholder="Persona de contacto"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clienteForm.per_email_vac}
                    onChange={(e) => updateForm('per_email_vac', e.target.value)}
                    placeholder="contacto@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={clienteForm.per_telef_int}
                    onChange={(e) => updateForm('per_telef_int', e.target.value)}
                    placeholder="+51 987 654 321"
                  />
                </div>
                <div>
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={clienteForm.per_direc_vac}
                    onChange={(e) => updateForm('per_direc_vac', e.target.value)}
                    placeholder="Dirección completa"
                  />
                </div>
              </div>
            </div>

            {/* Datos Agrícolas */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Información Agrícola</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cultivo">Cultivo Principal</Label>
                  <Select
                    value={clienteForm.per_cultivo_vac}
                    onValueChange={(value) => updateForm('per_cultivo_vac', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cultivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {CULTIVOS_OPCIONES.map((cultivo) => (
                        <SelectItem key={cultivo} value={cultivo}>
                          {cultivo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Input
                    id="cantidad"
                    type="number"
                    value={clienteForm.per_cantidad_int || ''}
                    onChange={(e) => updateForm('per_cantidad_int', e.target.value ? Number(e.target.value) : null)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="fechaProb">Fecha Probable de siembra o instalación</Label>
                  <Input
                    id="fechaProb"
                    type="date"
                    value={clienteForm.per_fec_prob_dt}
                    onChange={(e) => updateForm('per_fec_prob_dt', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hectareasDisp">Hectáreas Disponibles</Label>
                  <Input
                    id="hectareasDisp"
                    type="number"
                    step="0.01"
                    value={clienteForm.per_hec_disp_int || ''}
                    onChange={(e) => updateForm('per_hec_disp_int', e.target.value ? Number(e.target.value) : null)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="hectareasInst">Hectáreas Instaladas</Label>
                  <Input
                    id="hectareasInst"
                    type="number"
                    step="0.01"
                    value={clienteForm.per_hec_inst_int || ''}
                    onChange={(e) => updateForm('per_hec_inst_int', e.target.value ? Number(e.target.value) : null)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Observaciones */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Observaciones</h3>
              <Textarea
                value={clienteForm.per_observaciones_vac}
                onChange={(e) => updateForm('per_observaciones_vac', e.target.value)}
                placeholder="Observaciones adicionales..."
                rows={3}
              />
            </div>
          </div>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {editingCliente ? 'Actualizar' : 'Crear'} Cliente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}