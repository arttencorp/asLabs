'use client'

import type { QCControl } from '../types'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface QCControlSectionProps {
  qcControl: QCControl
  onChange: (qc: QCControl) => void
}

export default function QCControlSection({ qcControl, onChange }: QCControlSectionProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold text-sm mb-4">CONTROL DE CALIDAD (OBLIGATORIO)</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-bold block mb-1">Lote de medios:</label>
          <Input
            type="text"
            value={qcControl.loteMedios || ''}
            onChange={(e) => onChange({ ...qcControl, loteMedios: e.target.value })}
            className="h-7 text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Vencimiento (DD/MM/AAAA):</label>
          <Input
            type="text"
            value={qcControl.venceMedios || ''}
            onChange={(e) => onChange({ ...qcControl, venceMedios: e.target.value })}
            className="h-7 text-xs"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Control Positivo:</label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <Checkbox
              checked={qcControl.controlPositivoAplicado || false}
              onCheckedChange={(checked) => onChange({ ...qcControl, controlPositivoAplicado: checked as boolean })}
            />
            Aplicado
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <Checkbox
              checked={!qcControl.controlPositivoAplicado}
              onCheckedChange={(checked) =>
                onChange({ ...qcControl, controlPositivoAplicado: !checked })
              }
            />
            No aplicado
          </label>
        </div>
        <Input
          type="text"
          placeholder="Cepa/ID"
          value={qcControl.controlPositivoCepa || ''}
          onChange={(e) => onChange({ ...qcControl, controlPositivoCepa: e.target.value })}
          className="h-7 text-xs"
        />
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Control Negativo:</label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <Checkbox
              checked={qcControl.controlNegativoAplicado || false}
              onCheckedChange={(checked) => onChange({ ...qcControl, controlNegativoAplicado: checked as boolean })}
            />
            Aplicado
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <Checkbox
              checked={!qcControl.controlNegativoAplicado}
              onCheckedChange={(checked) =>
                onChange({ ...qcControl, controlNegativoAplicado: !checked })
              }
            />
            No aplicado
          </label>
        </div>
        <Input
          type="text"
          placeholder="Cepa/ID"
          value={qcControl.controlNegativoCepa || ''}
          onChange={(e) => onChange({ ...qcControl, controlNegativoCepa: e.target.value })}
          className="h-7 text-xs"
        />
      </div>

      <div className="mb-4">
        <label className="text-xs font-bold block mb-2">Incubadora verificada:</label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <Checkbox
              checked={qcControl.incubadoraVerificada || false}
              onCheckedChange={(checked) => onChange({ ...qcControl, incubadoraVerificada: checked as boolean })}
            />
            Si
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <Checkbox
              checked={!qcControl.incubadoraVerificada}
              onCheckedChange={(checked) =>
                onChange({ ...qcControl, incubadoraVerificada: !checked })
              }
            />
            No
          </label>
        </div>
        <Input
          type="text"
          placeholder="Temperatura registrada (°C)"
          value={qcControl.temperaturaRegistrada || ''}
          onChange={(e) => onChange({ ...qcControl, temperaturaRegistrada: e.target.value })}
          className="h-7 text-xs"
        />
      </div>

      <div>
        <label className="text-xs font-bold block mb-1">Desviaciones / acciones:</label>
        <textarea
          value={qcControl.desviaciones || ''}
          onChange={(e) => onChange({ ...qcControl, desviaciones: e.target.value })}
          className="w-full border rounded p-2 text-xs h-16"
          placeholder="Describe cualquier desviación o acciones correctivas..."
        />
      </div>
    </div>
  )
}
