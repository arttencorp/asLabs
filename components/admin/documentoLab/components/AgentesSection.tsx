'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
import { Plus, Trash2, Bug } from 'lucide-react'
import { TIPOS_AGENTE, REINOS_TAXONOMICOS } from '../constants'
import type { AgentesSectionProps, MuestraUI } from '../types'

export function AgentesSection({
  agentes,
  muestras,
  onAgregarAgente,
  onActualizarAgente,
  onEliminarAgente,
  disabled = false
}: AgentesSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Agentes Identificados ({agentes.length})
          </CardTitle>
          <div className="flex gap-2">
            {muestras.length > 0 && (
              <Select
                onValueChange={(muestraId) => onAgregarAgente(muestraId === 'general' ? undefined : muestraId)}
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
                onClick={() => onAgregarAgente()}
                disabled={disabled}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Agente
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {agentes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Bug className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No hay agentes identificados</p>
            <p className="text-sm">Agregue agentes biológicos identificados en el análisis</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Muestra</TableHead>
                  <TableHead>Nombre Científico *</TableHead>
                  <TableHead className="w-[120px]">Tipo *</TableHead>
                  <TableHead className="w-[100px]">Reino</TableHead>
                  <TableHead>Orden</TableHead>
                  <TableHead>Familia</TableHead>
                  <TableHead>Género</TableHead>
                  <TableHead>Especie</TableHead>
                  <TableHead className="w-[100px]">Cód. Aislado</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentes.map((agente) => (
                  <TableRow key={agente.id}>
                    <TableCell>
                      <Select
                        value={agente.muestraId || 'general'}
                        onValueChange={(value) => 
                          onActualizarAgente(agente.id, 'muestraId', value === 'general' ? undefined : value)
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
                        value={agente.nombreCientifico}
                        onChange={(e) => onActualizarAgente(agente.id, 'nombreCientifico', e.target.value)}
                        placeholder="Ej: Trichoderma harzianum"
                        className="h-8 text-sm italic"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={agente.tipo}
                        onValueChange={(value) => onActualizarAgente(agente.id, 'tipo', value)}
                        disabled={disabled}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPOS_AGENTE.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={agente.reino || ''}
                        onValueChange={(value) => onActualizarAgente(agente.id, 'reino', value)}
                        disabled={disabled}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Reino" />
                        </SelectTrigger>
                        <SelectContent>
                          {REINOS_TAXONOMICOS.map((reino) => (
                            <SelectItem key={reino.value} value={reino.value}>
                              {reino.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={agente.orden || ''}
                        onChange={(e) => onActualizarAgente(agente.id, 'orden', e.target.value)}
                        placeholder="Orden"
                        className="h-8 text-sm"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={agente.familia || ''}
                        onChange={(e) => onActualizarAgente(agente.id, 'familia', e.target.value)}
                        placeholder="Familia"
                        className="h-8 text-sm"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={agente.genero || ''}
                        onChange={(e) => onActualizarAgente(agente.id, 'genero', e.target.value)}
                        placeholder="Género"
                        className="h-8 text-sm italic"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={agente.especie || ''}
                        onChange={(e) => onActualizarAgente(agente.id, 'especie', e.target.value)}
                        placeholder="Especie"
                        className="h-8 text-sm italic"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={agente.codigoAislado || ''}
                        onChange={(e) => onActualizarAgente(agente.id, 'codigoAislado', e.target.value)}
                        placeholder="AS-001"
                        className="h-8 text-sm"
                        disabled={disabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEliminarAgente(agente.id)}
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

        {/* Nota sobre taxonomía */}
        {agentes.length > 0 && (
          <div className="mt-4 text-xs text-muted-foreground">
            <p>
              <strong>Nota:</strong> Los campos de clasificación taxonómica (Reino, Orden, Familia, Género, Especie) 
              son opcionales pero recomendados para una identificación completa del agente.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
