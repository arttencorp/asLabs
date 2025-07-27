export default function ResearchHeader() {
  return (
    <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 container mx-auto">
      <h1 className="text-4xl font-bold text-[#2e7d32] mb-4">Investigación</h1>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span className="hover:text-[#2e7d32] cursor-pointer">Áreas de investigación</span>
        <span className="mx-2">•</span>
        <span className="text-[#2e7d32] font-medium">Proyectos en desarrollo</span>
        <span className="mx-2">•</span>
        <span className="hover:text-[#2e7d32] cursor-pointer">Publicaciones científicas</span>
      </div>

      <p className="text-gray-600 max-w-3xl">
        Desde el año 2000, AS Laboratorios Control Biológico S.A.C. ha estado a la vanguardia de la biotecnología
        vegetal en Perú. Nuestro pipeline de investigación muestra el progreso que estamos logrando en nuestros
        programas de clonación de plantas, control biológico con microorganismos benéficos y desarrollo de materiales
        educativos para estudiantes y docentes universitarios.
      </p>
    </div>
  )
}
