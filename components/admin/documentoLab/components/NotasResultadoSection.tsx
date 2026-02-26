'use client'

import { Plus, Trash2, StickyNote, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { NotasSectionProps } from '../types'

export function NotasResultadoSection({
  notas,
  resultados,
  onAgregarNota,
  onActualizarNota,
  onEliminarNota,
  disabled = false,
}: NotasSectionProps) {
  // Agrupar notas por resultado
  const notasPorResultado = resultados.map(r => ({
    resultado: r,
    notas: notas.filter(n => n.resultadoId === r.id)
  })).filter(g => g.notas.length > 0)

  // Notas sin resultado asignado (pendientes de vincular)
  const notasSinVinculo = notas.filter(n => !n.resultadoId || !resultados.find(r => r.id === n.resultadoId))

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">
            Notas sobre Resultados
            {notas.length > 0 && (
              <span className="ml-1 text-muted-foreground">({notas.length})</span>
            )}
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAgregarNota(resultados[0]?.id)}
          disabled={disabled || resultados.length === 0}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Agregar Nota
        </Button>
      </div>

      {resultados.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-lg">
          Agrega resultados primero para poder crear notas.
        </div>
      ) : notas.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-lg">
          No hay notas. Agrega una nota vinculada a un resultado.
        </div>
      ) : (
        <div className="space-y-3">
          {[...notasSinVinculo, ...notas.filter(n => n.resultadoId && resultados.find(r => r.id === n.resultadoId))].map((nota, idx) => {
            const resultadoVinculado = resultados.find(r => r.id === nota.resultadoId)

            return (
              <div
                key={nota.id}
                className="border rounded-lg p-3 space-y-2 bg-card"
              >
                <div className="flex items-start gap-2">
                  {/* Nota number */}
                  <span className="text-xs font-medium text-muted-foreground mt-1 min-w-[20px]">
                    {idx + 1}.
                  </span>

                  <div className="flex-1 space-y-2">
                    {/* Contenido */}
                    <Textarea
                      value={nota.contenido}
                      onChange={(e) => onActualizarNota(nota.id, 'contenido', e.target.value)}
                      placeholder="Escribir nota..."
                      className="min-h-[60px] text-sm resize-none"
                      disabled={disabled}
                    />

                    {/* Vínculo a resultado */}
                    <div className="flex items-center gap-2">
                      <Link2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <Select
                        value={nota.resultadoId || ''}
                        onValueChange={(val) =>
                          onActualizarNota(nota.id, 'resultadoId', val)
                        }
                        disabled={disabled}
                      >
                        <SelectTrigger className="h-8 text-xs flex-1">
                          <SelectValue placeholder="Seleccionar resultado..." />
                        </SelectTrigger>
                        <SelectContent>
                          {resultados.map((r) => (
                            <SelectItem key={r.id} value={r.id}>
                              {r.parametro || 'Sin parámetro'} — {r.resultado || '...'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Delete */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
                    onClick={() => onEliminarNota(nota.id)}
                    disabled={disabled}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Badge de vínculo */}
                {resultadoVinculado && (
                  <div className="ml-6 text-xs text-muted-foreground">
                    Vinculada a: <span className="font-medium">{resultadoVinculado.parametro}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Leyenda */}
      {notas.length > 0 && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <StickyNote className="h-3 w-3" />
          <span>Las notas aparecerán al final del documento PDF, antes del registro fotográfico.</span>
        </div>
      )}
    </div>
  )
}
