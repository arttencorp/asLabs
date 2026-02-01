'use client'

import type { TaxonomicInterpretation } from '../types'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface TaxonomicInterpretationSectionProps {
  interpretation: TaxonomicInterpretation
  onChange: (interpretation: TaxonomicInterpretation) => void
}

export default function TaxonomicInterpretationSection({
  interpretation,
  onChange,
}: TaxonomicInterpretationSectionProps) {
  const handleGroupChange = (group: string) => {
    const current = interpretation.grupoProbable || []
    const updated = current.includes(group)
      ? current.filter((g) => g !== group)
      : [...current, group]
    onChange({ ...interpretation, grupoProbable: updated })
  }

  const handleBaseChange = (base: string) => {
    const current = interpretation.baseAsignacion || []
    const updated = current.includes(base)
      ? current.filter((b) => b !== base)
      : [...current, base]
    onChange({ ...interpretation, baseAsignacion: updated })
  }

  const handleLimitationChange = (limitation: string) => {
    const current = interpretation.limitacionesTecnicas || []
    const updated = current.includes(limitation)
      ? current.filter((l) => l !== limitation)
      : [...current, limitation]
    onChange({ ...interpretation, limitacionesTecnicas: updated })
  }

  const handleRecommendationChange = (rec: string) => {
    const current = interpretation.recomendacionConfirmacion || []
    const updated = current.includes(rec)
      ? current.filter((r) => r !== rec)
      : [...current, rec]
    onChange({ ...interpretation, recomendacionConfirmacion: updated })
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold text-sm mb-4">7) INTERPRETACIÓN TAXONÓMICA</h3>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Grupo probable:</label>
        <div className="grid grid-cols-2 gap-2">
          {['Enterobacterales', 'Bacilos Gram- no fermentadores', 'Cocos Gram+', 'Bacilos Gram+'].map(
            (group) => (
              <label key={group} className="flex items-center gap-2 text-xs cursor-pointer">
                <Checkbox
                  checked={(interpretation.grupoProbable || []).includes(group)}
                  onCheckedChange={() => handleGroupChange(group)}
                />
                {group}
              </label>
            ),
          )}
        </div>
        <div className="mt-2">
          <Input
            type="text"
            placeholder="Otros (especificar)"
            className="h-7 text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-bold block mb-1">Género identificado:</label>
          <Input
            type="text"
            value={interpretation.generoIdentificado || ''}
            onChange={(e) => onChange({ ...interpretation, generoIdentificado: e.target.value })}
            className="h-7 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Especie (si aplica):</label>
          <Input
            type="text"
            value={interpretation.especieIdentificada || ''}
            onChange={(e) => onChange({ ...interpretation, especieIdentificada: e.target.value })}
            className="h-7 text-xs"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Nivel de confianza:</label>
        <div className="flex gap-4">
          {['alto', 'medio', 'bajo'].map((level) => (
            <label key={level} className="flex items-center gap-2 text-xs cursor-pointer">
              <Checkbox
                checked={interpretation.nivelConfianza === level}
                onCheckedChange={(checked) =>
                  onChange({
                    ...interpretation,
                    nivelConfianza: checked ? (level as 'alto' | 'medio' | 'bajo') : undefined,
                  })
                }
              />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Base de asignación:</label>
        <div className="grid grid-cols-2 gap-2">
          {['Patrón bioquímico', 'Fenotipo/medios selectivos'].map((base) => (
            <label key={base} className="flex items-center gap-2 text-xs cursor-pointer">
              <Checkbox
                checked={(interpretation.baseAsignacion || []).includes(base)}
                onCheckedChange={() => handleBaseChange(base)}
              />
              {base}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Limitaciones técnicas:</label>
        <div className="grid grid-cols-2 gap-2">
          {['Panel incompleto', 'Lecturas atípicas', 'Cultivo mixto', 'Baja viabilidad', 'Interferencias'].map(
            (limitation) => (
              <label key={limitation} className="flex items-center gap-2 text-xs cursor-pointer">
                <Checkbox
                  checked={(interpretation.limitacionesTecnicas || []).includes(limitation)}
                  onCheckedChange={() => handleLimitationChange(limitation)}
                />
                {limitation}
              </label>
            ),
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Recomendación de confirmación:</label>
        <div className="grid grid-cols-2 gap-2">
          {['API 20E/NE', 'MALDI-TOF', '16S rRNA', 'PCR específica'].map((rec) => (
            <label key={rec} className="flex items-center gap-2 text-xs cursor-pointer">
              <Checkbox
                checked={(interpretation.recomendacionConfirmacion || []).includes(rec)}
                onCheckedChange={() => handleRecommendationChange(rec)}
              />
              {rec}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold block mb-1">Notas adicionales:</label>
        <textarea
          value={interpretation.notas || ''}
          onChange={(e) => onChange({ ...interpretation, notas: e.target.value })}
          className="w-full border rounded p-2 text-xs h-16"
          placeholder="Anotaciones sobre la interpretación..."
        />
      </div>
    </div>
  )
}
