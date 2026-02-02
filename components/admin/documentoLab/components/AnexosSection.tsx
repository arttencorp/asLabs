'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Plus, Trash2, Paperclip, Image, FileText, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import type { AnexosSectionProps } from '../types'

const TIPOS_ANEXO = [
  { value: 'imagen', label: 'Imagen', icon: Image },
  { value: 'documento', label: 'Documento', icon: FileText },
  { value: 'otro', label: 'Otro', icon: Paperclip },
]

export function AnexosSection({
  anexos,
  onAgregarAnexo,
  onEliminarAnexo,
  disabled = false
}: AnexosSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [nuevoAnexo, setNuevoAnexo] = useState({
    url: '',
    tipo: 'imagen',
    nota: ''
  })

  const handleAgregar = () => {
    if (nuevoAnexo.url) {
      onAgregarAnexo(nuevoAnexo.url, nuevoAnexo.tipo, nuevoAnexo.nota || undefined)
      setNuevoAnexo({ url: '', tipo: 'imagen', nota: '' })
      setDialogOpen(false)
    }
  }

  const obtenerIconoTipo = (tipo: string) => {
    const tipoConfig = TIPOS_ANEXO.find(t => t.value === tipo)
    const IconComponent = tipoConfig?.icon || Paperclip
    return <IconComponent className="h-4 w-4" />
  }

  const esImagen = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Paperclip className="h-5 w-5 text-primary" />
            Anexos ({anexos.length})
          </CardTitle>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={disabled}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Anexo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Anexo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="url">URL del Archivo *</Label>
                  <Input
                    id="url"
                    value={nuevoAnexo.url}
                    onChange={(e) => setNuevoAnexo(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://ejemplo.com/archivo.pdf"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Anexo</Label>
                  <Select
                    value={nuevoAnexo.tipo}
                    onValueChange={(value) => setNuevoAnexo(prev => ({ ...prev, tipo: value }))}
                  >
                    <SelectTrigger id="tipo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_ANEXO.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          <div className="flex items-center gap-2">
                            <tipo.icon className="h-4 w-4" />
                            {tipo.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nota">Nota (opcional)</Label>
                  <Textarea
                    id="nota"
                    value={nuevoAnexo.nota}
                    onChange={(e) => setNuevoAnexo(prev => ({ ...prev, nota: e.target.value }))}
                    placeholder="Descripción del anexo..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleAgregar} disabled={!nuevoAnexo.url}>
                  Agregar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {anexos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Paperclip className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No hay anexos</p>
            <p className="text-sm">Agregue imágenes o documentos relacionados</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {anexos.map((anexo) => (
              <div 
                key={anexo.id}
                className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
              >
                {/* Preview si es imagen */}
                {esImagen(anexo.url) && (
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <img 
                      src={anexo.url} 
                      alt={anexo.nota || 'Anexo'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
                
                {/* Info del anexo */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {obtenerIconoTipo(anexo.tipo)}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {anexo.nota || 'Sin descripción'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {anexo.tipo}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Acciones */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(anexo.url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Ver
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEliminarAnexo(anexo.id)}
                    disabled={disabled}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
