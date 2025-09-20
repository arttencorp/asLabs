import { Metadata } from 'next'
import { CertificadosCalidadManagement } from '@/components/admin/certificadoCalidad/components/CertificadosCalidadManagement'

export const metadata: Metadata = {
  title: 'Certificados de Calidad | AS Labs',
  description: 'Gestión de certificados de calidad de productos',
}

export default function CertificadosCalidadPage() {
  return (
    <div className="container mx-auto py-6">
      <CertificadosCalidadManagement />
    </div>
  )
}
