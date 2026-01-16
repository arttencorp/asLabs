"use client"
import { useState } from "react"
import type { ServiceSchema } from "../types/schemas"
import DynamicFieldRenderer from "./dynamic-field-renderer"

interface SchemaResultsSectionProps {
  schema: ServiceSchema | undefined
  values: Record<string, any>
  onChange: (values: Record<string, any>) => void
  documentType: "certificado" | "informe"
}

export default function SchemaResultsSection({ schema, values, onChange, documentType }: SchemaResultsSectionProps) {
  const [showInterpretation, setShowInterpretation] = useState(false)

  if (!schema) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">No hay esquema definido para este servicio aún.</p>
      </div>
    )
  }

  const handleFieldChange = (fieldName: string, value: any) => {
    onChange({ ...values, [fieldName]: value })
  }

  // Evaluar reglas de interpretación
  let interpretation = "Pendiente"
  for (const rule of schema.interpretationRules) {
    if (rule.condition(values)) {
      interpretation = rule.result
      break
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-serif font-semibold text-gray-900">
        {documentType === "informe" ? "Resultados" : "Resumen"}
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {schema.resultFields.map((field) => (
          <DynamicFieldRenderer
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(val) => handleFieldChange(field.name, val)}
            referential={schema.referencials[field.name]}
          />
        ))}
      </div>

      {schema.evidenceRequired.length > 0 && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm font-serif font-semibold text-purple-900">Evidencia requerida:</p>
          <ul className="mt-2 space-y-1">
            {schema.evidenceRequired.map((ev, idx) => (
              <li key={idx} className="text-sm text-purple-700">
                • {ev.description} (mínimo {ev.minCount})
              </li>
            ))}
          </ul>
        </div>
      )}

      {documentType === "certificado" && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <p className="text-sm font-serif font-semibold text-green-900">Resultado de conformidad:</p>
          <p className="text-lg font-serif font-bold text-green-700 mt-2">{interpretation}</p>
        </div>
      )}
    </div>
  )
}
