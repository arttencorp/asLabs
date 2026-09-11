"use client"

import { StrainDetail } from "@/components/strains/strain-commerce"
import { cepasIdentificadas } from "../identificadas-client"

export default function IdentificadasDetailEnhancedClient({ cepaId }: { cepaId: string }) {
  return <StrainDetail strains={cepasIdentificadas} kind="identified" strainId={cepaId} />
}
