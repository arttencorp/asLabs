"use client"

import { StrainCatalog } from "@/components/strains/strain-commerce"
import { cepasATCC } from "./atcc-client"

export default function ATCCEnhancedClient() {
  return <StrainCatalog strains={cepasATCC} kind="atcc" />
}
