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
import { EyeOff, Package, AlertTriangle } from "lucide-react"

interface OcultarCategoriaDialogProps {
  isOpen: boolean
  onClose: () => void
  categoriaNombre: string
  productosCount: number
  onConfirm: (ocultarProductos: boolean) => void
  loading: boolean
}

export function OcultarCategoriaDialog({
  isOpen,
  onClose,
  categoriaNombre,
  productosCount,
  onConfirm,
  loading
}: OcultarCategoriaDialogProps) {
  const [opcion, setOpcion] = useState<"solo-categoria" | "categoria-y-productos">("solo-categoria")

  const handleConfirm = () => {
    onConfirm(opcion === "categoria-y-productos")
  }

  const handleClose = () => {
    if (!loading) {
      setOpcion("solo-categoria")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EyeOff className="h-5 w-5 text-orange-600" />
            Ocultar Categoría
          </DialogTitle>
          <DialogDescription>
            Estás a punto de ocultar la categoría <strong>"{categoriaNombre}"</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Esta categoría tiene <strong>{productosCount} producto{productosCount !== 1 ? 's' : ''}</strong> asociado{productosCount !== 1 ? 's' : ''}.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label className="text-base font-medium">¿Qué deseas ocultar?</Label>
            <RadioGroup value={opcion} onValueChange={(value) => setOpcion(value as typeof opcion)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="solo-categoria" id="solo-categoria" />
                <Label htmlFor="solo-categoria" className="flex-1 cursor-pointer">
                  <div className="font-medium">Solo la categoría</div>
                  <div className="text-sm text-gray-500">
                    Los productos seguirán visibles pero sin categoría en el filtro
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
                    La categoría y sus {productosCount} producto{productosCount !== 1 ? 's' : ''} se ocultarán
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
            className="bg-orange-600 hover:bg-orange-700"
          >
            {loading ? "Ocultando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
