interface FirmaHeaderProps {}

export function FirmaHeader({}: FirmaHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Firmas</h1>
      <p className="text-gray-600">
        Administra el catálogo de firmas para los documentos de laboratorio de AS Laboratorios
      </p>
    </div>
  )
}
