import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import ResultadosConvocatoriasClient from '@/components/trabaja-con-nosotros/components/resultados-convocatorias-client'

export const metadata: Metadata = {
  title: 'Resultados de Convocatorias | AS Laboratorios',
  description: 'Consulta los resultados oficiales de cada etapa de las convocatorias laborales de AS Laboratorios.',
  alternates: { canonical: '/trabaja-con-nosotros/resultados' },
}

export default function ResultadosConvocatoriasPage() {
  return (
    <>
      <Navbar overlay />
      <ResultadosConvocatoriasClient />
      <Footer />
    </>
  )
}
