export const WHATSAPP_ADVISORS = {
  generalAnalysis: {
    label: "Asesor - Análisis Generales",
    phone: "+51 961 996 645",
    whatsapp: "51961996645",
    initials: "AG",
  },
  microbiology: {
    label: "Asesor - Microbiología, Cepas y Genómica",
    phone: "+51 952 194 005",
    whatsapp: "51952194005",
    initials: "MCG",
  },
} as const

export const MICROBIOLOGY_WHATSAPP_NUMBER = WHATSAPP_ADVISORS.microbiology.whatsapp

export function buildWhatsAppUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
