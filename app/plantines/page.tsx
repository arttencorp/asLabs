import type { Metadata } from "next"
import PlantinesClient from "./plantines-client"

export const metadata: Metadata = {
  title: "Nuestros Plantines | AS Laboratorios",
  description:
    "Plantines in vitro de alta calidad genética y fitosanitaria. Bananos, plátanos, piña, pitahaya y fresa resistentes y libres de plagas.",
  keywords: "plantines, banano, plátano, piña, pitahaya, fresa, in vitro, biotecnología vegetal",
}

export default function PlantinesPage() {
  return <PlantinesClient />
}
