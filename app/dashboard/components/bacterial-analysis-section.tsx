'use client'

import type { BacterialAnalysis } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface BacterialAnalysisSectionProps {
  analysis: BacterialAnalysis
  onChange: (analysis: BacterialAnalysis) => void
}

export default function BacterialAnalysisSection({ analysis, onChange }: BacterialAnalysisSectionProps) {
  const handleMediaChange = (media: string) => {
    const currentMedia = analysis.mediostilizados || []
    const updated = currentMedia.includes(media)
      ? currentMedia.filter((m) => m !== media)
      : [...currentMedia, media]
    onChange({ ...analysis, mediostilizados: updated })
  }

  const handleAtmosphereChange = (atm: string) => {
    const currentAtm = analysis.atmosfera || []
    const updated = currentAtm.includes(atm) ? currentAtm.filter((a) => a !== atm) : [...currentAtm, atm]
    onChange({ ...analysis, atmosfera: updated })
  }

  const handleMorphologyChange = (field: keyof BacterialAnalysis, value: string) => {
    if (field === 'tamanoColonia' || field === 'forma' || field === 'borde' || field === 'elevacion' || field === 'superficie' || field === 'morfologia' || field === 'arreglo') {
      const current = (analysis[field] as string[]) || []
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      onChange({ ...analysis, [field]: updated })
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold text-sm mb-4">4) AISLAMIENTO Y CARACTERIZACIÓN INICIAL</h3>

      {/* Medios de cultivo */}
      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Medios de cultivo utilizados:</label>
        <div className="grid grid-cols-2 gap-2">
          {['Agar nutritivo', 'TSA', 'MacConkey', 'EMB', 'Blood agar', 'MSA', 'Cetrimida', 'XLD/SS', 'TCBS'].map((media) => (
            <label key={media} className="flex items-center gap-2 text-xs cursor-pointer">
              <Checkbox
                checked={(analysis.mediostilizados || []).includes(media)}
                onCheckedChange={() => handleMediaChange(media)}
              />
              {media}
            </label>
          ))}
        </div>
      </div>

      {/* Condiciones de incubación */}
      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Condiciones de incubación:</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="text-xs">Temperatura (°C):</label>
            <Input
              type="text"
              value={analysis.temperatura || ''}
              onChange={(e) => onChange({ ...analysis, temperatura: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <label className="text-xs">Tiempo (h):</label>
            <Input
              type="text"
              value={analysis.tiempoIncubacion || ''}
              onChange={(e) => onChange({ ...analysis, tiempoIncubacion: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
        </div>
        <label className="text-xs font-bold block mb-2">Atmósfera:</label>
        <div className="grid grid-cols-2 gap-2">
          {['Aerobiosis', 'CO2', 'Microaerofilia', 'Anaerobiosis'].map((atm) => (
            <label key={atm} className="flex items-center gap-2 text-xs cursor-pointer">
              <Checkbox
                checked={(analysis.atmosfera || []).includes(atm)}
                onCheckedChange={() => handleAtmosphereChange(atm)}
              />
              {atm}
            </label>
          ))}
        </div>
      </div>

      {/* Morfología de colonia */}
      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Morfología de colonia (aislamiento principal):</label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div>
            <label className="text-xs font-bold">Tamaño:</label>
            <div className="flex gap-2">
              {['Peq', 'Med', 'Gr'].map((t) => (
                <label key={t} className="flex items-center gap-1 text-xs cursor-pointer">
                  <Checkbox
                    checked={(analysis.tamanoColonia || []).includes(t)}
                    onCheckedChange={() => handleMorphologyChange('tamanoColonia', t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold">Forma:</label>
            <div className="flex gap-2">
              {['Circular', 'Irregular', 'Puntiforme'].map((f) => (
                <label key={f} className="flex items-center gap-1 text-xs cursor-pointer">
                  <Checkbox
                    checked={(analysis.forma || []).includes(f)}
                    onCheckedChange={() => handleMorphologyChange('forma', f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold">Borde:</label>
            <div className="flex gap-2">
              {['Entero', 'Ond', 'Lob'].map((b) => (
                <label key={b} className="flex items-center gap-1 text-xs cursor-pointer">
                  <Checkbox
                    checked={(analysis.borde || []).includes(b)}
                    onCheckedChange={() => handleMorphologyChange('borde', b)}
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Características adicionales */}
      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Características adicionales:</label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div>
            <label className="text-xs font-bold">Elevación:</label>
            <div className="flex gap-2">
              {['Plana', 'Convexa'].map((e) => (
                <label key={e} className="flex items-center gap-1 text-xs cursor-pointer">
                  <Checkbox
                    checked={(analysis.elevacion || []).includes(e)}
                    onCheckedChange={() => handleMorphologyChange('elevacion', e)}
                  />
                  {e}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold">Superficie:</label>
            <div className="flex gap-2">
              {['Lisa', 'Rugosa', 'Mucosa', 'Seca'].map((s) => (
                <label key={s} className="flex items-center gap-1 text-xs cursor-pointer">
                  <Checkbox
                    checked={(analysis.superficie || []).includes(s)}
                    onCheckedChange={() => handleMorphologyChange('superficie', s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold">Pigmento:</label>
            <Input
              type="text"
              placeholder="Ej: Amarillo, Verde, Rojo"
              value={analysis.pigmento || ''}
              onChange={(e) => onChange({ ...analysis, pigmento: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Tinción de Gram */}
      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Tinción de Gram / Microscopia:</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <Checkbox
                checked={analysis.gramPositivo || false}
                onCheckedChange={(checked) => onChange({ ...analysis, gramPositivo: checked as boolean })}
              />
              Gram Positivo
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer mt-2">
              <Checkbox
                checked={analysis.gramNegativo || false}
                onCheckedChange={(checked) => onChange({ ...analysis, gramNegativo: checked as boolean })}
              />
              Gram Negativo
            </label>
          </div>
          <div>
            <label className="text-xs font-bold">Morfología celular:</label>
            <div className="flex gap-2 flex-wrap mt-1">
              {['Coco', 'Bacilo', 'Cocobacilo', 'Curvo'].map((m) => (
                <label key={m} className="flex items-center gap-1 text-xs cursor-pointer">
                  <Checkbox
                    checked={(analysis.morfologia || []).includes(m)}
                    onCheckedChange={() => handleMorphologyChange('morfologia', m)}
                  />
                  {m}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notas adicionales */}
      <div>
        <label className="text-xs font-bold block mb-1">Notas adicionales:</label>
        <textarea
          value={analysis.notas || ''}
          onChange={(e) => onChange({ ...analysis, notas: e.target.value })}
          className="w-full border rounded p-2 text-xs h-16"
          placeholder="Anotaciones generales..."
        />
      </div>
    </div>
  )
}
