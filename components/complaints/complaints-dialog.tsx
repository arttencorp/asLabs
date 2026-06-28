'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'

interface ComplaintsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ComplaintsDialog({ open, onOpenChange }: ComplaintsDialogProps) {
  const [formStep, setFormStep] = useState<'form' | 'confirmation'>('form')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStep('confirmation')
    setTimeout(() => {
      setFormStep('form')
      onOpenChange(false)
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0">
        {formStep === 'form' ? (
          <div className="bg-white">
            <DialogHeader className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-gray-900">Canal de Quejas</DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nombre completo <span className="text-gray-400">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Organización o empresa <span className="text-gray-400">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre de la organización"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Interested Party Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tipo de parte interesada <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="trabajador">Trabajador</option>
                  <option value="cliente">Cliente</option>
                  <option value="proveedor">Proveedor</option>
                  <option value="agricultor">Agricultor o Productor</option>
                  <option value="comunidad">Comunidad</option>
                  <option value="institucion">Institución</option>
                  <option value="aliado">Aliado Estratégico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Teléfono <span className="text-gray-400">(opcional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+51 999 999 999"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Anonymity and Confidentiality */}
              <div className="space-y-3 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Presentar la queja de manera anónima</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Solicitar confidencialidad de la identidad</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Existe riesgo inmediato</span>
                </label>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Asunto de la queja <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Resumen breve del asunto"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Descripción detallada de los hechos <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  placeholder="Proporciona todos los detalles pertinentes..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Fecha o período en que ocurrieron los hechos <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 15 de junio de 2026 o junio - julio 2026"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Related Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Área, persona, servicio o actividad relacionada <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Especifica el área o persona involucrada"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Impacts */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Impactos o afectaciones producidas
                </label>
                <textarea
                  placeholder="Describe los efectos o consecuencias..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Requested Solution */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Solución o resultado solicitado
                </label>
                <textarea
                  placeholder="¿Qué solución esperas?"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Adjuntar evidencias <span className="text-gray-400">(PDF, JPG, PNG, DOCX)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.docx"
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <p className="text-sm text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                    <p className="text-xs text-gray-500 mt-1">Máximo 5 MB por archivo</p>
                  </label>
                </div>
              </div>

              {/* Confirmation */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded border-gray-300 mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    Confirmo que la información proporcionada es verdadera según mi conocimiento y que he leído la política de privacidad.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Enviar queja
              </button>

              <p className="text-xs text-gray-500 text-center">
                Los datos se procesarán de forma segura y confidencial
              </p>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 text-center py-16">
            <div className="mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">¡Queja recibida!</h3>
            <p className="text-gray-600 mb-4">
              Tu queja ha sido registrada correctamente. El código de tu caso es:
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <p className="font-mono font-bold text-lg text-emerald-700">ASL-Q-2026-0001</p>
            </div>
            <p className="text-sm text-gray-600">
              Recibirás una confirmación por correo dentro de dos días hábiles. Puedes usar este código para hacer seguimiento de tu caso.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
