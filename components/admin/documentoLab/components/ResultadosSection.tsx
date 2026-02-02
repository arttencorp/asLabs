'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
import { Plus, Trash2, TestTube, BarChart3 } from 'lucide-react'
import { UNIDADES_RESULTADO, METODOS_ANALISIS } from '../constants'
import type { ResultadosSectionProps, MuestraUI } from '../types'

export function ResultadosSection({
  resultados,
  muestras,
  onAgregarResultado,
  onActualizarResultado,
  onEliminarResultado,
  disabled = false
}: ResultadosSectionProps) {
  // Obtener nombre de muestra por ID
  const obtenerNombreMuestra = (muestraId: string | undefined): string => {
    if (!muestraId) return 'General'
    const muestra = muestras.find(m => m.id === muestraId)
    if (!muestra) return 'General'
    return muestra.codigo || `Muestra ${muestras.indexOf(muestra) + 1}`
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TestTube className="h-5 w-5 text-primary" />
            Resultados de Ensayo ({resultados.length})
          </CardTitle>
          <div className="flex gap-2">
            {muestras.length > 0 && (
              <Select
                onValueChange={(muestraId) => onAgregarResultado(muestraId === 'general' ? undefined : muestraId)}
                disabled={disabled}
              >
                <SelectTrigger className="w-48">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Agregar a muestra</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General (sin muestra)</SelectItem>
                  {muestras.map((muestra, index) => (
                    <SelectItem key={muestra.id} value={muestra.id}>
                      {muestra.codigo || `Muestra ${index + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {muestras.length === 0 && (
              <Button 
                onClick={() => onAgregarResultado()}
                disabled={disabled}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Resultado
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {resultados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <TestTube className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No hay resultados agregados</p>
            <p className="text-sm">Agregue resultados de ensayo para este documento</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Muestra</TableHead>
                  <TableHead>Parámetro *</TableHead>
                  <TableHead>Resultado *</TableHead>
                  <TableHead className="w-[120px]">Unidad</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="w-[80px]">Min</TableHead>
                  <TableHead className="w-[80px]">Max</TableHead>
                  <TableHead className="w-[80px] text-center">Gráfico</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultados.map((resultado) => (
                  <TableRow key={resultado.id}>
                    <TableCell>
                      <Select
                        value={resultado.muestraId || 'general'}
                        onValueChange={(value) => 
                          onActualizarResultado(resultado.id, 'muestraId', value === 'general' ? undefined : value)
                        }
                        disabled={disabled}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          {muestras.map((muestra, index) => (
                            <SelectItem key={muestra.id} value={muestra.id}>
                              {muestra.codigo || `M${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={resultado.parametro}
                        onChange={(e) => onActualizarResultado(resultado.id, 'parametro', e.target.value)}
                        placeholder="Ej: pH, Humedad..."
                        className="h-8 text-sm"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={resultado.resultado}
                        onChange={(e) => onActualizarResultado(resultado.id, 'resultado', e.target.value)}
                        placeholder="Valor"
                        className="h-8 text-sm"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={resultado.unidad}
                        onValueChange={(value) => onActualizarResultado(resultado.id, 'unidad', value)}
                        disabled={disabled}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIDADES_RESULTADO.map((unidad) => (
                            <SelectItem key={unidad.value} value={unidad.value}>
                              {unidad.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={resultado.metodo}
                        onValueChange={(value) => onActualizarResultado(resultado.id, 'metodo', value)}
                        disabled={disabled}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Método" />
                        </SelectTrigger>
                        <SelectContent>
                          {METODOS_ANALISIS.map((metodo) => (
                            <SelectItem key={metodo.value} value={metodo.value}>
                              {metodo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={resultado.valorMin || ''}
                        onChange={(e) => onActualizarResultado(resultado.id, 'valorMin', e.target.value ? Number(e.target.value) : undefined)}
                        className="h-8 text-sm w-16"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={resultado.valorMax || ''}
                        onChange={(e) => onActualizarResultado(resultado.id, 'valorMax', e.target.value ? Number(e.target.value) : undefined)}
                        className="h-8 text-sm w-16"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={resultado.mostrarGrafico}
                        onCheckedChange={(checked) => 
                          onActualizarResultado(resultado.id, 'mostrarGrafico', checked === true)
                        }
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEliminarResultado(resultado.id)}
                        disabled={disabled}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Leyenda */}
        {resultados.length > 0 && (
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              <span>Gráfico: Mostrar indicador visual de rango</span>
            </div>
            <span>|</span>
            <span>Min/Max: Valores de referencia para el rango aceptable</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
