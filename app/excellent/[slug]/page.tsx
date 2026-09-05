import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ExcellentServiceDetail from "./service-detail-client"
import { excellentServices, getExcellentService } from "@/data/excellent-catalog"

export function generateStaticParams() {
  return excellentServices.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getExcellentService(params.slug)
  if (!service) return {}
  return {
    title: `${service.title} | exCELLent`,
    description: service.description,
    alternates: { canonical: `https://aslaboratorios.com/excellent/${service.slug}` },
    openGraph: { title: `${service.title} | exCELLent`, description: service.description, url: `https://aslaboratorios.com/excellent/${service.slug}`, images: [service.image] },
  }
}

export default function ExcellentServicePage({ params }: { params: { slug: string } }) {
  const service = getExcellentService(params.slug)
  if (!service) notFound()
  const related = excellentServices.filter((item) => item.slug !== service.slug).slice(0, 3)
  return <ExcellentServiceDetail service={service} related={related} />
}
