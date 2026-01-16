"use client"

import type { Client } from "../types"

interface ClientSectionProps {
  client: Client
  onChange: (client: Client) => void
}

export default function ClientSection({ client, onChange }: ClientSectionProps) {
  const handleChange = (field: keyof Client, value: string) => {
    onChange({ ...client, [field]: value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-serif font-semibold text-gray-900">Datos del Cliente</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Razón Social"
          value={client.razonSocial}
          onChange={(e) => handleChange("razonSocial", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="RUC/DNI"
          value={client.ruc}
          onChange={(e) => handleChange("ruc", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Contacto (nombre)"
          value={client.contacto}
          onChange={(e) => handleChange("contacto", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={client.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={client.telefono}
          onChange={(e) => handleChange("telefono", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={client.direccion}
          onChange={(e) => handleChange("direccion", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
      </div>

      <input
        type="text"
        placeholder="Proyecto / Predio / Lote"
        value={client.proyecto}
        onChange={(e) => handleChange("proyecto", e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  )
}
