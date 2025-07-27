import Script from "next/script"

interface FAQItem {
  question: string
  answer: string
}

interface FAQStructuredDataProps {
  questions: FAQItem[]
}

export function FAQStructuredData({ questions }: FAQStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface ProductStructuredDataProps {
  name: string
  description: string
  image: string
  url: string
  price?: string
  currency?: string
  availability?: string
  brand?: string
}

export function ProductStructuredData({
  name,
  description,
  image,
  url,
  price,
  currency = "PEN",
  availability = "InStock",
  brand = "AS Laboratorios",
}: ProductStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: price
      ? {
          "@type": "Offer",
          price,
          priceCurrency: currency,
          availability: `https://schema.org/${availability}`,
          seller: {
            "@type": "Organization",
            name: "AS Laboratorios",
          },
        }
      : undefined,
  }

  return (
    <Script
      id="product-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AS Laboratorios",
    alternateName: "AS Labs",
    url: "https://aslaboratorios.com",
    logo: "https://aslaboratorios.com/aslabs-logo.png",
    description:
      "Empresa peruana líder en biotecnología vegetal, especializada en plantines in vitro, control biológico, materiales de laboratorio y asesoría técnica para agricultura sostenible.",
    foundingDate: "2000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Huancavelica 315, Palermo",
      addressLocality: "Trujillo",
      addressRegion: "La Libertad",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-961-996-645",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://www.facebook.com/aslaboratorios",
      "https://www.instagram.com/aslaboratorios",
      "https://www.linkedin.com/company/aslaboratorios",
    ],
    areaServed: {
      "@type": "Country",
      name: "Peru",
    },
    knowsAbout: [
      "Biotecnología Vegetal",
      "Cultivo de Tejidos",
      "Control Biológico",
      "Materiales de Laboratorio",
      "Educación Científica",
      "Agricultura Sostenible",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Biotecnología Vegetal",
          description: "Servicios de cultivo de tejidos y micropropagación",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Plantines in vitro",
          description: "Plantines de alta calidad genética y fitosanitaria",
        },
      },
    ],
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AS Laboratorios",
    image: "https://aslaboratorios.com/aslabs-logo.png",
    "@id": "https://aslaboratorios.com",
    url: "https://aslaboratorios.com",
    telephone: "+51-961-996-645",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Huancavelica 315, Palermo",
      addressLocality: "Trujillo",
      addressRegion: "La Libertad",
      postalCode: "13011",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.1116,
      longitude: -79.0287,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: ["https://www.facebook.com/aslaboratorios", "https://www.instagram.com/aslaboratorios"],
  }

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AS Laboratorios",
    url: "https://aslaboratorios.com",
    description:
      "Líder en biotecnología vegetal en Perú. Plantines in vitro, control biológico, materiales de laboratorio y asesoría técnica para agricultura sostenible.",
    publisher: {
      "@type": "Organization",
      name: "AS Laboratorios",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://aslaboratorios.com/tienda?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "es-PE",
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
