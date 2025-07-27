export default function LegalHeader() {
  return (
    <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 container mx-auto">
      <h1 className="text-4xl font-bold text-[#2e7d32] mb-4">Información Legal</h1>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span className="text-[#2e7d32] font-medium">Términos y condiciones</span>
        <span className="mx-2">•</span>
        <span className="hover:text-[#2e7d32] cursor-pointer">Política de privacidad</span>
        <span className="mx-2">•</span>
        <span className="hover:text-[#2e7d32] cursor-pointer">Política de cookies</span>
        <span className="mx-2">•</span>
        <span className="hover:text-[#2e7d32] cursor-pointer">Propiedad intelectual</span>
      </div>

      <p className="text-gray-600 max-w-3xl">
        En AS Laboratorios Control Biológico S.A.C. nos comprometemos a operar con total transparencia y en cumplimiento
        con todas las leyes y regulaciones aplicables. Esta sección contiene información importante sobre los términos
        legales que rigen el uso de nuestro sitio web y la relación con nuestros clientes y usuarios.
      </p>
    </div>
  )
}
