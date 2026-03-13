'use client'

import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings2, Check } from 'lucide-react'
import type { CampoExtraSchema, ServicioExtraConfig } from '../constants'

interface DataExtraPopoverProps {
  config: ServicioExtraConfig
  dataExtra: Record<string, any>
  onUpdate: (dataExtra: Record<string, any>) => void
  disabled?: boolean
}

export function DataExtraPopover({
  config,
  dataExtra,
  onUpdate,
  disabled = false,
}: DataExtraPopoverProps) {
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState<Record<string, any>>({ ...dataExtra })

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setLocal({ ...dataExtra })
    }
    setOpen(isOpen)
  }

  const handleFieldChange = (key: string, value: any) => {
    setLocal((prev) => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    onUpdate(local)
    setOpen(false)
  }

  // Contar cuántos campos tienen valor
  const filledCount = config.campos.filter(
    (c) => dataExtra[c.key] != null && dataExtra[c.key] !== ''
  ).length

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 relative"
          disabled={disabled}
          title={config.descripcion}
        >
          <Settings2 className="h-3.5 w-3.5" />
          {filledCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary text-[9px] text-primary-foreground flex items-center justify-center font-bold">
              {filledCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start" side="bottom">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground">
              {config.nombre}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {config.descripcion}
            </p>
          </div>

          <div className="space-y-2">
            {config.campos.map((campo) => (
              <div key={campo.key} className="space-y-1">
                <Label className="text-xs">
                  {campo.label}
                  {campo.unidad && (
                    <span className="text-muted-foreground ml-1">
                      ({campo.unidad})
                    </span>
                  )}
                </Label>
                {campo.type === 'select' && campo.options ? (
                  <Select
                    value={local[campo.key] || ''}
                    onValueChange={(v) => handleFieldChange(campo.key, v)}
                  >
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {campo.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={campo.type === 'number' ? 'number' : 'text'}
                    value={local[campo.key] ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        campo.key,
                        campo.type === 'number' && e.target.value
                          ? Number(e.target.value)
                          : e.target.value || undefined
                      )
                    }
                    placeholder={campo.placeholder}
                    className="h-7 text-xs"
                  />
                )}
              </div>
            ))}
          </div>

          <Button
            size="sm"
            className="w-full h-7 text-xs"
            onClick={handleApply}
          >
            <Check className="h-3 w-3 mr-1" />
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
