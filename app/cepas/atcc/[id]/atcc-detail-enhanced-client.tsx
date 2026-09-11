"use client"

import { StrainDetail } from "@/components/strains/strain-commerce"
import { cepasATCC } from "../atcc-client"

export default function ATCCDetailEnhancedClient({ cepaId }: { cepaId: string }) {
  return <StrainDetail strains={cepasATCC} kind="atcc" strainId={cepaId} />
}
