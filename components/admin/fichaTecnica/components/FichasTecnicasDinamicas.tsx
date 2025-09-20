"use client"

import { FichaTecnicaCompletaDatabase } from '@/types/database'
import { FichaTecnicaDinamica } from './FichaTecnicaDinamica'

interface FichasTecnicasDinamicasProps {
  fichas: FichaTecnicaCompletaDatabase[]
}

export function FichasTecnicasDinamicas({ fichas }: FichasTecnicasDinamicasProps) {
  if (!fichas || fichas.length === 0) {
    return null
  }

  return (
    <>
      {fichas.map((ficha, index) => (
        <FichaTecnicaDinamica 
          key={ficha.fit_tec_id_int || index} 
          ficha={ficha} 
        />
      ))}
    </>
  )
}