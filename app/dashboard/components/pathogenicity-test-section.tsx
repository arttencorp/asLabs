'use client'

import { useState } from 'react'
import type { PathogenicityTest } from '../types'
import { Input } from '@/components/ui/input'
import { X, Upload, Plus } from 'lucide-react'

interface PathogenicityTestSectionProps {
  test: PathogenicityTest
  onChange: (test: PathogenicityTest) => void
}

export default function PathogenicityTestSection({ test, onChange }: PathogenicityTestSectionProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const url = event.target?.result as string
      const newImage = {
        id: Date.now().toString(),
        url,
        dia: selectedDay?.toString() || 'General',
        descripcion: '',
      }
      const imagenes = [...(test.imagenes || []), newImage]
      onChange({ ...test, imagenes })
      e.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (imageId: string) => {
    const imagenes = test.imagenes?.filter((img) => img.id !== imageId) || []
    onChange({ ...test, imagenes })
  }

  const handleUpdateImage = (imageId: string, dia: string, descripcion: string) => {
    const imagenes = test.imagenes?.map((img) =>
      img.id === imageId ? { ...img, dia, descripcion } : img,
    )
    onChange({ ...test, imagenes })
  }

  const addObservation = () => {
    const nextDay = (test.diasObservacion?.length || 0) + 1
    const diasObservacion = [
      ...(test.diasObservacion || []),
      {
        dia: nextDay,
        sintomas: '',
        intensidad: 'leve' as const,
        porcentajePlanta: '',
        observaciones: '',
      },
    ]
    onChange({ ...test, diasObservacion })
    setSelectedDay(nextDay)
  }

  const updateObservation = (dayIndex: number, field: string, value: any) => {
    const diasObservacion = [...(test.diasObservacion || [])]
    diasObservacion[dayIndex] = { ...diasObservacion[dayIndex], [field]: value }
    onChange({ ...test, diasObservacion })
  }

  const removeObservation = (dayIndex: number) => {
    const diasObservacion = test.diasObservacion?.filter((_, i) => i !== dayIndex) || []
    onChange({ ...test, diasObservacion })
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-gradient-to-br from-white to-gray-50 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gray-800 rounded-full"></div>
        <h3 className="font-bold text-sm uppercase tracking-wide">PRUEBA DE PATOGENICIDAD</h3>
      </div>

      {/* Organismo de Prueba */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase">Organismo de Prueba</h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Nombre del Organismo:</label>
            <Input
              type="text"
              placeholder="Ej: Ralstonia solanacearum, Xanthomonas campestris..."
              value={test.organismoNombre || ''}
              onChange={(e) => onChange({ ...test, organismoNombre: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Tipo:</label>
              <Input
                type="text"
                placeholder="Bacteria/Hongo"
                value={test.organismoTipo || ''}
                onChange={(e) => onChange({ ...test, organismoTipo: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Concentración:</label>
              <Input
                type="text"
                placeholder="10^8"
                value={test.organismoConcentracion || ''}
                onChange={(e) => onChange({ ...test, organismoConcentracion: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Unidad:</label>
              <Input
                type="text"
                placeholder="UFC/mL, esporas/mL"
                value={test.organismoUnidad || ''}
                onChange={(e) => onChange({ ...test, organismoUnidad: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Planta Hospedante */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase">Planta Hospedante</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Especie:</label>
              <Input
                type="text"
                placeholder="Solanum lycopersicum, Capsicum annuum..."
                value={test.plantaEspecie || ''}
                onChange={(e) => onChange({ ...test, plantaEspecie: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Variedad:</label>
              <Input
                type="text"
                placeholder="Variedad comercial"
                value={test.plantaVariedad || ''}
                onChange={(e) => onChange({ ...test, plantaVariedad: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Edad de la Planta:</label>
              <Input
                type="text"
                placeholder="20"
                value={test.plantaEdad || ''}
                onChange={(e) => onChange({ ...test, plantaEdad: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Unidad:</label>
              <select
                value={test.plantaEdadUnidad || 'dias'}
                onChange={(e) => onChange({ ...test, plantaEdadUnidad: e.target.value as 'dias' | 'semanas' })}
                className="w-full h-8 text-xs border border-gray-300 rounded px-2"
              >
                <option value="dias">Días</option>
                <option value="semanas">Semanas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Método de Inoculación */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase">Método de Inoculación</h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Método(s) de Inoculación:</label>
            <div className="space-y-1">
              {['Aspersión', 'Inyección', 'Herida', 'Raíz sumergida', 'Otro'].map((metodo) => (
                <label key={metodo} className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(test.metodoInoculacion || []).includes(metodo)}
                    onChange={(e) => {
                      const metodos = e.target.checked
                        ? [...(test.metodoInoculacion || []), metodo]
                        : (test.metodoInoculacion || []).filter((m) => m !== metodo)
                      onChange({ ...test, metodoInoculacion: metodos })
                    }}
                    className="w-4 h-4"
                  />
                  {metodo}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Lugar de Inoculación:</label>
              <Input
                type="text"
                placeholder="Hoja, tallo, raíz..."
                value={test.lugarInoculacion || ''}
                onChange={(e) => onChange({ ...test, lugarInoculacion: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Cantidad de Inóculo:</label>
              <Input
                type="text"
                placeholder="1 mL, 100 µL..."
                value={test.cantidadInoculo || ''}
                onChange={(e) => onChange({ ...test, cantidadInoculo: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Condiciones Ambientales */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase">Condiciones Ambientales</h4>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Temperatura (°C):</label>
            <Input
              type="text"
              placeholder="25"
              value={test.temperatura || ''}
              onChange={(e) => onChange({ ...test, temperatura: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Humedad (%):</label>
            <Input
              type="text"
              placeholder="85"
              value={test.humedad || ''}
              onChange={(e) => onChange({ ...test, humedad: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Fotoperiodo:</label>
            <Input
              type="text"
              placeholder="12/12h luz/oscuridad"
              value={test.fotoperiodo || ''}
              onChange={(e) => onChange({ ...test, fotoperiodo: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Duración:</label>
            <div className="flex gap-1">
              <Input
                type="text"
                placeholder="21"
                value={test.duracionPrueba || ''}
                onChange={(e) => onChange({ ...test, duracionPrueba: e.target.value })}
                className="h-8 text-xs flex-1"
              />
              <select
                value={test.duracionUnidad || 'dias'}
                onChange={(e) => onChange({ ...test, duracionUnidad: e.target.value as 'dias' | 'semanas' })}
                className="h-8 text-xs border border-gray-300 rounded px-1"
              >
                <option value="dias">Días</option>
                <option value="semanas">Semanas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase">Controles</h4>
        <div className="space-y-3">
          <div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={test.controlNegativo || false}
                onChange={(e) => onChange({ ...test, controlNegativo: e.target.checked })}
                className="w-4 h-4"
              />
              <strong>Control Negativo Aplicado</strong>
            </label>
            {test.controlNegativo && (
              <Input
                type="text"
                placeholder="Resultado del control negativo"
                value={test.controlNegativoResultado || ''}
                onChange={(e) => onChange({ ...test, controlNegativoResultado: e.target.value })}
                className="h-8 text-xs mt-2"
              />
            )}
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={test.controlPositivo || false}
                onChange={(e) => onChange({ ...test, controlPositivo: e.target.checked })}
                className="w-4 h-4"
              />
              <strong>Control Positivo Aplicado</strong>
            </label>
            {test.controlPositivo && (
              <Input
                type="text"
                placeholder="Resultado del control positivo"
                value={test.controlPositivoResultado || ''}
                onChange={(e) => onChange({ ...test, controlPositivoResultado: e.target.value })}
                className="h-8 text-xs mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Observaciones Diarias */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-800 uppercase">Observaciones Diarias</h4>
          <button
            onClick={addObservation}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition"
          >
            <Plus size={14} />
            Agregar Día
          </button>
        </div>

        {test.diasObservacion && test.diasObservacion.length > 0 ? (
          <div className="space-y-3">
            {test.diasObservacion.map((obs, idx) => (
              <div key={idx} className="border border-gray-300 rounded p-3 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">Día {obs.dia}</span>
                  <button
                    onClick={() => removeObservation(idx)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Síntomas Observados:</label>
                    <textarea
                      placeholder="Describa los síntomas observados..."
                      value={obs.sintomas}
                      onChange={(e) => updateObservation(idx, 'sintomas', e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded px-2 py-1 h-16 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Intensidad:</label>
                      <select
                        value={obs.intensidad || 'leve'}
                        onChange={(e) => updateObservation(idx, 'intensidad', e.target.value)}
                        className="w-full h-8 text-xs border border-gray-300 rounded px-2"
                      >
                        <option value="leve">Leve</option>
                        <option value="moderado">Moderado</option>
                        <option value="severo">Severo</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">% Planta Afectada:</label>
                      <Input
                        type="text"
                        placeholder="10, 25, 50, 100"
                        value={obs.porcentajePlanta || ''}
                        onChange={(e) => updateObservation(idx, 'porcentajePlanta', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Observaciones Adicionales:</label>
                  <textarea
                    placeholder="Detalles adicionales..."
                    value={obs.observaciones || ''}
                    onChange={(e) => updateObservation(idx, 'observaciones', e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 h-12 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-600 italic">No hay observaciones. Haz clic en "Agregar Día" para comenzar.</p>
        )}
      </div>

      {/* Imágenes */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase">Imágenes de la Prueba</h4>

        <div className="mb-4 p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
          <label className="flex flex-col items-center justify-center cursor-pointer gap-2">
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">Haz clic para subir foto</span>
            <span className="text-xs text-gray-500">(JPG, PNG, WebP)</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {test.imagenes && test.imagenes.length > 0 && (
          <div className="space-y-3">
            {test.imagenes.map((imagen, idx) => (
              <div key={imagen.id} className="border border-gray-300 rounded p-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={imagen.url}
                      alt={`Imagen ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded border border-gray-200"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Día:</label>
                      <Input
                        type="text"
                        placeholder="Día de observación"
                        value={imagen.dia}
                        onChange={(e) => handleUpdateImage(imagen.id, e.target.value, imagen.descripcion || '')}
                        className="h-7 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Descripción:</label>
                      <textarea
                        placeholder="Describe lo que se ve en la imagen..."
                        value={imagen.descripcion || ''}
                        onChange={(e) => handleUpdateImage(imagen.id, imagen.dia, e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded px-2 py-1 h-12 resize-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveImage(imagen.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded h-fit"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resultados y Conclusiones */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase">Resultados y Conclusiones</h4>
        <div className="space-y-3">
          <div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={test.resultadoPositivo || false}
                onChange={(e) => onChange({ ...test, resultadoPositivo: e.target.checked })}
                className="w-4 h-4"
              />
              <strong>Resultado Positivo (Patógeno Confirmado)</strong>
            </label>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Síntoma Típico Observado:</label>
            <textarea
              placeholder="Describa el síntoma típico del patógeno..."
              value={test.sintomaTipico || ''}
              onChange={(e) => onChange({ ...test, sintomaTipico: e.target.value })}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 h-12 resize-none"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={test.reaislamiento || false}
                onChange={(e) => onChange({ ...test, reaislamiento: e.target.checked })}
                className="w-4 h-4"
              />
              <strong>Reaislamiento del Patógeno Realizado</strong>
            </label>
            {test.reaislamiento && (
              <Input
                type="text"
                placeholder="Describe el reaislamiento..."
                value={test.reaislado || ''}
                onChange={(e) => onChange({ ...test, reaislado: e.target.value })}
                className="h-8 text-xs mt-2"
              />
            )}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Conclusiones Generales:</label>
            <textarea
              placeholder="Conclusiones sobre la patogenicidad del organismo..."
              value={test.conclusiones || ''}
              onChange={(e) => onChange({ ...test, conclusiones: e.target.value })}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 h-16 resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Notas Adicionales:</label>
            <textarea
              placeholder="Cualquier otra información relevante..."
              value={test.notas || ''}
              onChange={(e) => onChange({ ...test, notas: e.target.value })}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 h-12 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
