'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion'
import { Plus, Trash2, FlaskConical, AlertTriangle } from 'lucide-react'
import { MATRICES_MUESTRA } from '../constants'
import type { MuestrasSectionProps } from '../types'

export function MuestrasSection({
  muestras,
  codigoDocumento,
  onAgregarMuestra,
  onActualizarMuestra,
  onEliminarMuestra,
  disabled = false
}: MuestrasSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            Muestras ({muestras.length})
          </CardTitle>
          <Button 
            onClick={onAgregarMuestra}
            disabled={disabled}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Muestra
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {muestras.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FlaskConical className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No hay muestras agregadas</p>
            <p className="text-sm">Haga clic en "Agregar Muestra" para comenzar</p>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {muestras.map((muestra, index) => (
              <AccordionItem 
                key={muestra.id} 
                value={muestra.id}
                className={`border rounded-lg ${muestra.rechazada ? 'border-red-300 bg-red-50' : ''}`}
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-medium">
                      Muestra {index + 1}
                    </span>
                    {muestra.codigo && (
                      <span className="text-sm text-muted-foreground">
                        {muestra.codigo}
                      </span>
                    )}
                    {muestra.matriz && (
                      <span className="text-xs bg-secondary px-2 py-1 rounded">
                        {muestra.matriz}
                      </span>
                    )}
                    {muestra.rechazada && (
                      <span className="flex items-center text-xs text-red-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Rechazada
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-4">
                    {/* Primera fila: Código y Matriz */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Código de Laboratorio</Label>
                        <Input
                          value={muestra.codigo}
                          onChange={(e) => onActualizarMuestra(muestra.id, 'codigo', e.target.value)}
                          placeholder={`${codigoDocumento || 'DOC'}-M${String(index + 1).padStart(2, '0')}`}
                          disabled={disabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Matriz *</Label>
                        <Select
                          value={muestra.matriz}
                          onValueChange={(value) => onActualizarMuestra(muestra.id, 'matriz', value)}
                          disabled={disabled}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar matriz" />
                          </SelectTrigger>
                          <SelectContent>
                            {MATRICES_MUESTRA.map((matriz) => (
                              <SelectItem key={matriz.value} value={matriz.value}>
                                {matriz.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Lugar de muestreo */}
                    <div className="space-y-2">
                      <Label>Lugar de Muestreo</Label>
                      <Input
                        value={muestra.lugarMuestreo}
                        onChange={(e) => onActualizarMuestra(muestra.id, 'lugarMuestreo', e.target.value)}
                        placeholder="Ej: Parcela 3, Sector Norte, Fundo San Juan"
                        disabled={disabled}
                      />
                    </div>

                    {/* Fechas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Fecha de Toma</Label>
                        <Input
                          type="date"
                          value={muestra.fechaToma}
                          onChange={(e) => onActualizarMuestra(muestra.id, 'fechaToma', e.target.value)}
                          disabled={disabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha de Recepción</Label>
                        <Input
                          type="date"
                          value={muestra.fechaRecepcion}
                          onChange={(e) => onActualizarMuestra(muestra.id, 'fechaRecepcion', e.target.value)}
                          disabled={disabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha Inicio Análisis</Label>
                        <Input
                          type="date"
                          value={muestra.fechaInicio}
                          onChange={(e) => onActualizarMuestra(muestra.id, 'fechaInicio', e.target.value)}
                          disabled={disabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha Fin Análisis</Label>
                        <Input
                          type="date"
                          value={muestra.fechaFin}
                          onChange={(e) => onActualizarMuestra(muestra.id, 'fechaFin', e.target.value)}
                          disabled={disabled}
                        />
                      </div>
                    </div>

                    {/* Rechazo y Recomendaciones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`rechazada-${muestra.id}`}
                            checked={muestra.rechazada}
                            onCheckedChange={(checked) => 
                              onActualizarMuestra(muestra.id, 'rechazada', checked === true)
                            }
                            disabled={disabled}
                          />
                          <Label 
                            htmlFor={`rechazada-${muestra.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            Muestra rechazada
                          </Label>
                        </div>
                        
                        {muestra.rechazada && (
                          <div className="space-y-2">
                            <Label>Motivo de Rechazo</Label>
                            <Textarea
                              value={muestra.motivoRechazo || ''}
                              onChange={(e) => onActualizarMuestra(muestra.id, 'motivoRechazo', e.target.value)}
                              placeholder="Especificar motivo del rechazo..."
                              rows={2}
                              disabled={disabled}
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Recomendaciones</Label>
                        <Textarea
                          value={muestra.recomendaciones || ''}
                          onChange={(e) => onActualizarMuestra(muestra.id, 'recomendaciones', e.target.value)}
                          placeholder="Recomendaciones para esta muestra..."
                          rows={muestra.rechazada ? 4 : 2}
                          disabled={disabled}
                        />
                      </div>
                    </div>

                    {/* Botón eliminar */}
                    <div className="flex justify-end pt-2 border-t">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onEliminarMuestra(muestra.id)}
                        disabled={disabled}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar Muestra
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}
