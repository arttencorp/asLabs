"use client"

import { StrainCatalog } from "@/components/strains/strain-commerce"
import { cepasIdentificadas } from "./identificadas-client"

export default function IdentificadasEnhancedClient() {
  return <StrainCatalog strains={cepasIdentificadas} kind="identified" />
}
