import BiofertilizantesDetailClient from "./biofertilizantes-detail-client"

export default function BiofertilizanteDetailPage({ params }: { params: { id: string } }) {
  return <BiofertilizantesDetailClient cepaId={params.id} />
}
