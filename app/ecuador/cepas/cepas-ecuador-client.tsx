"use client"

import { StrainCatalog } from "@/components/strains/strain-commerce"
import { cepasIdentificadas } from "@/app/cepas/identificadas/identificadas-client"

export default function CepasEcuadorClient() {
  return <StrainCatalog strains={cepasIdentificadas} kind="identified" market="ecuador" />
}
