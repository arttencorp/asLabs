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
import { Loader2, Upload, X } from "lucide-react"
import { useRef } from "react"
import type { FirmaForm, FirmaDatabase } from "../types"

interface FirmaDialogProps {
  isOpen: boolean
  onClose: () => void
  firmaForm: FirmaForm
  setFirmaForm: (form: FirmaForm) => void
  editingFirma: FirmaDatabase | null
  loading: boolean
  uploadLoading: boolean
  onSubmit: () => void
  onUploadImage: (archivo: File, nombreArchivo: string) => Promise<string | null>
}

export function FirmaDialog({
  isOpen,
  onClose,
  firmaForm,
  setFirmaForm,
  editingFirma,
  loading,
  uploadLoading,
  onSubmit,
  onUploadImage
}: FirmaDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateForm = (field: keyof FirmaForm, value: any) => {
    setFirmaForm({ ...firmaForm, [field]: value })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return
    }

    const nombreArchivo = `firma-${Date.now()}-${file.name}`
    const url = await onUploadImage(file, nombreArchivo)
    if (url) {
      updateForm('firm_url_blob', url)
    }
  }

  const handleRemoveImage = () => {
    updateForm('firm_url_blob', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingFirma ? 'Editar Firma' : 'Crear Nueva Firma'}
          </DialogTitle>
          <DialogDescription>
            {editingFirma 
              ? 'Modifica la información de la firma' 
              : 'Completa la información de la nueva firma'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Datos de la Firma */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Datos de la Firma</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={firmaForm.firm_nomb_vac || ''}
                  onChange={(e) => updateForm('firm_nomb_vac', e.target.value)}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div>
                <Label htmlFor="cargo">Cargo *</Label>
                <Input
                  id="cargo"
                  value={firmaForm.firm_cargo_vac || ''}
                  onChange={(e) => updateForm('firm_cargo_vac', e.target.value)}
                  placeholder="Ej: Gerente Técnico"
                />
              </div>
            </div>
          </div>

          {/* Imagen de la Firma */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Imagen de la Firma</h3>
            
            {firmaForm.firm_url_blob ? (
              <div className="space-y-4">
                <div className="relative w-full max-w-sm mx-auto border rounded-lg p-4 bg-gray-50">
                  <img 
                    src={firmaForm.firm_url_blob} 
                    alt="Vista previa de firma"
                    className="w-full h-auto max-h-32 object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Imagen cargada correctamente
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadLoading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
                      <p className="mt-2 text-sm text-gray-500">Subiendo imagen...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Haz clic para subir una imagen
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        PNG, JPG, GIF hasta 2MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}

            {/* URL manual */}
            <div className="mt-4">
              <Label htmlFor="urlManual" className="text-sm text-gray-500">
                O ingresa una URL de imagen directamente:
              </Label>
              <Input
                id="urlManual"
                value={firmaForm.firm_url_blob || ''}
                onChange={(e) => updateForm('firm_url_blob', e.target.value)}
                placeholder="https://ejemplo.com/firma.png"
                className="mt-1"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading || uploadLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={onSubmit}
              disabled={loading || uploadLoading}
              className="text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                editingFirma ? 'Actualizar' : 'Crear'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
