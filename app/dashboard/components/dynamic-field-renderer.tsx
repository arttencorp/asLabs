"use client"
import type { SchemaField } from "../types/schemas"

interface DynamicFieldRendererProps {
  field: SchemaField
  value: any
  onChange: (value: any) => void
  referential?: any
}

export default function DynamicFieldRenderer({ field, value, onChange, referential }: DynamicFieldRendererProps) {
  switch (field.type) {
    case "text":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-serif font-semibold text-gray-900">{field.label}</label>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required={field.required}
          />
          {referential && (
            <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm">
              <p className="font-semibold text-blue-900">{referential.label}</p>
              <p className="text-blue-700">{referential.value}</p>
              {referential.note && <p className="text-xs text-blue-600 mt-1">{referential.note}</p>}
            </div>
          )}
        </div>
      )

    case "number":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-serif font-semibold text-gray-900">{field.label}</label>
          <input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(e.target.value ? Number.parseFloat(e.target.value) : "")}
            step={field.step || "1"}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required={field.required}
          />
          {referential && (
            <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm">
              <p className="font-semibold text-blue-900">{referential.label}</p>
              <p className="text-blue-700">{referential.value}</p>
              {referential.range && (
                <p className="text-xs text-blue-600 mt-1">
                  Rango: {referential.range.min} - {referential.range.max}
                </p>
              )}
            </div>
          )}
        </div>
      )

    case "select":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-serif font-semibold text-gray-900">{field.label}</label>
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required={field.required}
          >
            <option value="">Seleccionar...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {referential && (
            <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm">
              <p className="font-semibold text-blue-900">{referential.label}</p>
              <p className="text-blue-700">{referential.value}</p>
            </div>
          )}
        </div>
      )

    case "textarea":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-serif font-semibold text-gray-900">{field.label}</label>
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required={field.required}
          />
        </div>
      )

    default:
      return <div>Campo no soportado: {field.type}</div>
  }
}
