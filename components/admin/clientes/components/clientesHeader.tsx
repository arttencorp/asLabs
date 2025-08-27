interface ClientesHeaderProps {}

export function ClientesHeader({}: ClientesHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Clientes</h1>
      <p className="text-gray-600">
        Administra la información de personas naturales y jurídicas de AS Laboratorios
      </p>
    </div>
  )
}