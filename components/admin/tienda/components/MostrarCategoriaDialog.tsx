"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, Package, CheckCircle } from "lucide-react"

interface MostrarCategoriaDialogProps {
  isOpen: boolean
  onClose: () => void
  categoriaNombre: string
  productosOcultosCount: number
  onConfirm: (activarProductos: boolean) => void
  loading: boolean
}

export function MostrarCategoriaDialog({
  isOpen,
  onClose,
  categoriaNombre,
  productosOcultosCount,
  onConfirm,
  loading
}: MostrarCategoriaDialogProps) {
  const [opcion, setOpcion] = useState<"solo-categoria" | "categoria-y-productos">("categoria-y-productos")

  const handleConfirm = () => {
    onConfirm(opcion === "categoria-y-productos")
  }

  const handleClose = () => {
    if (!loading) {
      setOpcion("categoria-y-productos")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-600" />
            Mostrar Categoría
          </DialogTitle>
          <DialogDescription>
            Estás a punto de mostrar la categoría <strong>"{categoriaNombre}"</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {productosOcultosCount > 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Esta categoría tiene <strong>{productosOcultosCount} producto{productosOcultosCount !== 1 ? 's' : ''}</strong> oculto{productosOcultosCount !== 1 ? 's' : ''}.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label className="text-base font-medium">¿Qué deseas mostrar?</Label>
            <RadioGroup value={opcion} onValueChange={(value) => setOpcion(value as typeof opcion)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="solo-categoria" id="solo-categoria" />
                <Label htmlFor="solo-categoria" className="flex-1 cursor-pointer">
                  <div className="font-medium">Solo la categoría</div>
                  <div className="text-sm text-gray-500">
                    Los productos ocultos seguirán ocultos
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="categoria-y-productos" id="categoria-y-productos" />
                <Label htmlFor="categoria-y-productos" className="flex-1 cursor-pointer">
                  <div className="font-medium flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Categoría y todos sus productos
                  </div>
                  <div className="text-sm text-gray-500">
                    La categoría y sus {productosOcultosCount} producto{productosOcultosCount !== 1 ? 's' : ''} se mostrarán
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? "Mostrando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
