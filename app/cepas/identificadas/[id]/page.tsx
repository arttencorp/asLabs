import type { Metadata } from "next"
import IdentificadasDetailClient from "./identificadas-detail-client"

interface IdentificadasDetailPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: IdentificadasDetailPageProps): Metadata {
  return {
    title: `Cepa Identificada | AS Laboratorios`,
    description: `Información detallada sobre cepas identificadas en AS Laboratorios`,
  }
}

export default function IdentificadasDetailPage({ params }: IdentificadasDetailPageProps) {
  return <IdentificadasDetailClient cepaId={params.id} />
}
