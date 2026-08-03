import type { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import PlantinesClient from "./plantines-client"

export const metadata: Metadata = constructMetadata({
  title: "Plantines In Vitro de Banano, Piña y Pitahaya",
  description:
    "Plantines in vitro de banano, plátano, piña, pitahaya y otros cultivos, producidos con uniformidad genética y calidad fitosanitaria en Perú.",
  keywords: ["plantines in vitro Perú", "banano in vitro", "plátano in vitro", "piña in vitro", "pitahaya in vitro", "micropropagación vegetal", "plantines Trujillo"],
  path: "/plantines",
  image: "/plantines/pagina19.webp",
})

export default function PlantinesPage() {
  return <PlantinesClient />
}
