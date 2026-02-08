export interface TechnicalData {
  climate: string
  soil: string
  irrigation: string
  fertilization: string
  spacing: string
  maintenance: string
  harvest: string
  storage: string
  diseases: string[]
  benefits: string[]
}

export interface Plantin {
  id: string
  name: string
  category: string
  description: string
  features: string[]
  available: boolean
  isResearch?: boolean
  isProduction?: boolean
  icon: any
  image?: string
  price?: string
  yield?: string
  harvestTime?: string
  profitability?: string
  resistance?: string[]
  technicalData?: TechnicalData
}
