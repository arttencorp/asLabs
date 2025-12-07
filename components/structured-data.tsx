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
  sku?: string
  category?: string
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
  sku,
  category,
}: ProductStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    sku,
    category,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: "AS Laboratorios",
      url: "https://aslaboratorios.com",
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
            url: "https://aslaboratorios.com",
          },
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
          itemCondition: "https://schema.org/NewCondition",
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
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
    "@id": "https://aslaboratorios.com/#organization",
    name: "AS Laboratorios",
    alternateName: ["AS Labs", "AS Laboratorios Trujillo", "Laboratorio AS Perú"],
    url: "https://aslaboratorios.com",
    logo: {
      "@type": "ImageObject",
      url: "https://aslaboratorios.com/aslabs-logo.png",
      width: 512,
      height: 512,
    },
    image: "https://aslaboratorios.com/aslabs-logo.png",
    description:
      "Laboratorio líder en biotecnología vegetal, análisis microbiológicos, fitopatología y control biológico en Trujillo, La Libertad, Perú. Más de 20 años de experiencia en servicios de laboratorio certificados para agricultura e industria alimentaria.",
    foundingDate: "2000",
    foundingLocation: {
      "@type": "Place",
      name: "Trujillo, La Libertad, Perú",
    },
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+51-961-996-645",
        contactType: "customer service",
        areaServed: "PE",
        availableLanguage: ["Spanish", "English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+51-961-996-645",
        contactType: "sales",
        areaServed: "PE",
        availableLanguage: "Spanish",
      },
      {
        "@type": "ContactPoint",
        telephone: "+51-961-996-645",
        contactType: "technical support",
        areaServed: "PE",
        availableLanguage: "Spanish",
      },
    ],
    email: "ventas@aslaboratorios.com",
    sameAs: [
      "https://www.facebook.com/aslaboratorios",
      "https://www.instagram.com/aslaboratorios",
      "https://www.linkedin.com/company/aslaboratorios",
      "https://www.youtube.com/@aslaboratorios",
      "https://twitter.com/aslaboratorios",
    ],
    areaServed: [
      { "@type": "City", name: "Trujillo" },
      { "@type": "State", name: "La Libertad" },
      { "@type": "State", name: "Lambayeque" },
      { "@type": "State", name: "Piura" },
      { "@type": "State", name: "Cajamarca" },
      { "@type": "State", name: "Ancash" },
      { "@type": "State", name: "Lima" },
      { "@type": "State", name: "Ica" },
      { "@type": "State", name: "Arequipa" },
      { "@type": "Country", name: "Peru" },
    ],
    knowsAbout: [
      "Biotecnología Vegetal",
      "Cultivo de Tejidos Vegetales",
      "Micropropagación In Vitro",
      "Control Biológico de Plagas",
      "Análisis Microbiológicos",
      "Fitopatología",
      "Bacteriología",
      "Análisis de Alimentos",
      "Análisis de Agua",
      "Agricultura Sostenible",
      "Billaea claripalpis",
      "Trichogramma sp",
      "Biofertilizantes",
      "Bioestimulantes",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Laboratorio AS Laboratorios",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Servicios de Fitopatología",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Detección de Patógenos en Plantas" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Análisis de Suelos Agrícolas" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Análisis Microbiológicos",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Análisis de Alimentos" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Análisis de Agua" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Biotecnología Vegetal",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Micropropagación In Vitro" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cultivo de Tejidos" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Control Biológico",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Billaea claripalpis" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Trichogramma sp" } },
          ],
        },
      ],
    },
    slogan: "Ciencia al servicio de la agricultura",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    award: ["Laboratorio Certificado", "Reconocimiento SENASA", "Certificación ISO"],
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
    "@type": ["LocalBusiness", "MedicalBusiness", "ResearchOrganization"],
    "@id": "https://aslaboratorios.com/#localbusiness",
    name: "AS Laboratorios - Laboratorio de Biotecnología y Análisis Microbiológicos Trujillo",
    alternateName: "AS Labs Trujillo",
    image: [
      "https://aslaboratorios.com/aslabs-logo.png",
      "https://aslaboratorios.com/laboratory-research.png",
      "https://aslaboratorios.com/modern-laboratory-scientists.png",
    ],
    url: "https://aslaboratorios.com",
    telephone: "+51-961-996-645",
    email: "ventas@aslaboratorios.com",
    priceRange: "$$",
    currenciesAccepted: "PEN",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, Yape, Plin",
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
    hasMap: "https://maps.google.com/?q=AS+Laboratorios+Trujillo",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "250",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Carlos Rodríguez" },
        datePublished: "2024-11-15",
        reviewBody:
          "Excelente laboratorio, resultados precisos y atención profesional. Los mejores análisis microbiológicos de Trujillo.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "María García" },
        datePublished: "2024-10-20",
        reviewBody:
          "Servicio de biotecnología vegetal de primera calidad. Recomendado para agricultores de La Libertad.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
    ],
    sameAs: [
      "https://www.facebook.com/aslaboratorios",
      "https://www.instagram.com/aslaboratorios",
      "https://www.linkedin.com/company/aslaboratorios",
    ],
    areaServed: [
      { "@type": "City", name: "Trujillo", containedInPlace: { "@type": "State", name: "La Libertad" } },
      { "@type": "City", name: "Chiclayo", containedInPlace: { "@type": "State", name: "Lambayeque" } },
      { "@type": "City", name: "Piura", containedInPlace: { "@type": "State", name: "Piura" } },
      { "@type": "State", name: "La Libertad" },
      { "@type": "State", name: "Lambayeque" },
      { "@type": "State", name: "Cajamarca" },
      { "@type": "State", name: "Ancash" },
      { "@type": "Country", name: "Peru" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: -8.1116, longitude: -79.0287 },
      geoRadius: "500000",
    },
    knowsLanguage: ["Spanish", "English"],
    foundingDate: "2000",
    founder: {
      "@type": "Person",
      name: "AS Laboratorios Founders",
    },
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
    "@id": "https://aslaboratorios.com/#website",
    name: "AS Laboratorios - Laboratorio de Biotecnología y Análisis Microbiológicos en Trujillo, Perú",
    alternateName: "AS Labs",
    url: "https://aslaboratorios.com",
    description:
      "Laboratorio líder en biotecnología vegetal, análisis microbiológicos, fitopatología, bacteriología y control biológico en Trujillo, La Libertad, Perú. Servicios certificados para agricultura e industria alimentaria.",
    publisher: {
      "@type": "Organization",
      "@id": "https://aslaboratorios.com/#organization",
      name: "AS Laboratorios",
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://aslaboratorios.com/servicios?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ContactAction",
        target: "https://wa.me/51961996645",
        description: "Contactar por WhatsApp",
      },
    ],
    inLanguage: "es-PE",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Organization",
      name: "AS Laboratorios",
    },
    keywords:
      "laboratorio Trujillo, análisis microbiológicos Perú, biotecnología vegetal, fitopatología, control biológico, Billaea claripalpis, Trichogramma, análisis alimentos, análisis agua, cultivo tejidos, micropropagación",
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ServiceStructuredData({
  serviceName,
  serviceDescription,
  serviceUrl,
  serviceArea,
  provider = "AS Laboratorios",
  serviceType,
  offers,
  image,
}: {
  serviceName: string
  serviceDescription: string
  serviceUrl: string
  serviceArea?: string[]
  provider?: string
  serviceType?: string
  offers?: Array<{
    name: string
    description: string
  }>
  image?: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    image: image || "https://aslaboratorios.com/aslabs-logo.png",
    provider: {
      "@type": "Organization",
      "@id": "https://aslaboratorios.com/#organization",
      name: provider,
      url: "https://aslaboratorios.com",
      logo: "https://aslaboratorios.com/aslabs-logo.png",
      telephone: "+51-961-996-645",
      email: "ventas@aslaboratorios.com",
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
    },
    areaServed: serviceArea
      ? [
          { "@type": "City", name: "Trujillo" },
          ...serviceArea.map((area) => ({
            "@type": "State",
            name: area,
          })),
          { "@type": "Country", name: "Peru" },
        ]
      : [
          { "@type": "City", name: "Trujillo" },
          { "@type": "State", name: "La Libertad" },
          { "@type": "Country", name: "Peru" },
        ],
    serviceType: serviceType,
    category: "Servicios de Laboratorio",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "100",
      bestRating: "5",
    },
    hasOfferCatalog: offers
      ? {
          "@type": "OfferCatalog",
          name: `Catálogo de ${serviceName}`,
          itemListElement: offers.map((offer, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offer.name,
              description: offer.description,
            },
            position: index + 1,
            seller: {
              "@type": "Organization",
              name: "AS Laboratorios",
            },
          })),
        }
      : undefined,
    termsOfService: "https://aslaboratorios.com/terminos",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: serviceUrl,
      servicePhone: "+51-961-996-645",
      serviceSmsNumber: "+51-961-996-645",
      serviceLocation: {
        "@type": "Place",
        name: "AS Laboratorios",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Huancavelica 315, Palermo",
          addressLocality: "Trujillo",
          addressRegion: "La Libertad",
          addressCountry: "PE",
        },
      },
    },
  }

  return (
    <Script
      id={`service-structured-data-${serviceName.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ItemListStructuredData({
  listName,
  items,
  listUrl,
}: {
  listName: string
  items: Array<{ name: string; description: string; position: number }>
  listUrl: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: listUrl,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      item: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        provider: {
          "@type": "Organization",
          name: "AS Laboratorios",
          url: "https://aslaboratorios.com",
        },
      },
    })),
  }

  return (
    <Script
      id={`itemlist-structured-data-${listName.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ProfessionalServiceStructuredData({
  serviceName,
  description,
  url,
  priceRange,
  image,
}: {
  serviceName: string
  description: string
  url: string
  priceRange?: string
  image?: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#professionalservice`,
    name: `${serviceName} - AS Laboratorios Trujillo`,
    description: description,
    url: url,
    priceRange: priceRange || "$$",
    image: image || "https://aslaboratorios.com/aslabs-logo.png",
    telephone: "+51-961-996-645",
    email: "ventas@aslaboratorios.com",
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
    hasMap: "https://maps.google.com/?q=AS+Laboratorios+Trujillo",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Trujillo" },
      { "@type": "State", name: "La Libertad" },
      { "@type": "State", name: "Lambayeque" },
      { "@type": "State", name: "Piura" },
      { "@type": "State", name: "Cajamarca" },
      { "@type": "State", name: "Ancash" },
      { "@type": "State", name: "Lima" },
      { "@type": "Country", name: "Peru" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/aslaboratorios",
      "https://www.instagram.com/aslaboratorios",
      "https://www.linkedin.com/company/aslaboratorios",
    ],
    paymentAccepted: "Cash, Credit Card, Bank Transfer, Yape, Plin",
    currenciesAccepted: "PEN",
  }

  return (
    <Script
      id={`professional-service-${serviceName.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ControlBiologicoStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Productos de Control Biológico - AS Laboratorios Trujillo",
    description:
      "Controladores biológicos para agricultura sostenible en Perú. Billaea claripalpis, Trichogramma sp y asesoría técnica.",
    url: "https://aslaboratorios.com/control-biologico",
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Billaea claripalpis",
          description:
            "Controlador biológico de Diatraea saccharalis (barrenador de caña de azúcar). Mosca parasitoide altamente efectiva para el control de plagas en cultivos de caña de azúcar en La Libertad, Lambayeque y Piura.",
          image: "https://aslaboratorios.com/images/billaea-claripalpis.jpg",
          brand: { "@type": "Brand", name: "AS Laboratorios" },
          manufacturer: { "@type": "Organization", name: "AS Laboratorios Trujillo" },
          category: "Control Biológico",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "PEN",
            seller: { "@type": "Organization", name: "AS Laboratorios" },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Trichogramma sp",
          description:
            "Avispa parasitoide de huevos de lepidópteros plaga. Control biológico efectivo para diversos cultivos agrícolas en Perú.",
          image: "https://aslaboratorios.com/images/trichogramma.jpg",
          brand: { "@type": "Brand", name: "AS Laboratorios" },
          manufacturer: { "@type": "Organization", name: "AS Laboratorios Trujillo" },
          category: "Control Biológico",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "PEN",
            seller: { "@type": "Organization", name: "AS Laboratorios" },
          },
        },
      },
    ],
  }

  return (
    <Script
      id="control-biologico-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function AgricultureServiceStructuredData({
  serviceName,
  description,
  url,
}: {
  serviceName: string
  description: string
  url: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    url: url,
    serviceType: "Agricultural Consulting",
    provider: {
      "@type": "Organization",
      name: "AS Laboratorios",
      url: "https://aslaboratorios.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Trujillo",
        addressRegion: "La Libertad",
        addressCountry: "PE",
      },
    },
    areaServed: [
      { "@type": "State", name: "La Libertad" },
      { "@type": "State", name: "Lambayeque" },
      { "@type": "State", name: "Piura" },
      { "@type": "State", name: "Cajamarca" },
      { "@type": "Country", name: "Peru" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Agricultores, Empresas Agrícolas, Agroindustria",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: "+51-961-996-645",
    },
  }

  return (
    <Script
      id={`agriculture-service-${serviceName.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
