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
      url: "https://aslaboratorios.com/images/new-logo.png",
      width: 512,
      height: 512,
    },
    image: "https://aslaboratorios.com/images/new-logo.png",
    description:
      "Empresa peruana de biotecnología agrícola con servicios de análisis microbiológicos, fitopatología, cultivo in vitro, control biológico e investigación aplicada.",
    foundingDate: "1997",
    foundingLocation: {
      "@type": "Place",
      name: "Trujillo, La Libertad, Perú",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ca. 30, Urb. San Isidro II",
      postalCode: "13001",
      addressLocality: "Trujillo",
      addressRegion: "La Libertad",
      addressCountry: "PE",
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
    "@type": "ProfessionalService",
    "@id": "https://aslaboratorios.com/#localbusiness",
    name: "AS Laboratorios",
    alternateName: "AS Labs Trujillo",
    image: [
      "https://aslaboratorios.com/images/new-logo.png",
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
      streetAddress: "Ca. 30, Urb. San Isidro II",
      postalCode: "13001",
      addressLocality: "Trujillo",
      addressRegion: "La Libertad",
      addressCountry: "PE",
    },
    hasMap: "https://maps.google.com/?q=Ca.+30+Urb.+San+Isidro+II+Trujillo+Peru",
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
      { "@type": "City", name: "Trujillo", containedInPlace: { "@type": "State", name: "La Libertad" } },
      { "@type": "City", name: "Chiclayo", containedInPlace: { "@type": "State", name: "Lambayeque" } },
      { "@type": "City", name: "Piura", containedInPlace: { "@type": "State", name: "Piura" } },
      { "@type": "State", name: "La Libertad" },
      { "@type": "State", name: "Lambayeque" },
      { "@type": "State", name: "Cajamarca" },
      { "@type": "State", name: "Ancash" },
      { "@type": "Country", name: "Peru" },
    ],
    knowsLanguage: "Spanish",
    foundingDate: "1997",
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
    name: "AS Laboratorios",
    alternateName: "AS Labs",
    url: "https://aslaboratorios.com",
    description:
      "Biotecnología agrícola, análisis microbiológicos, fitopatología, bacteriología, plantines in vitro y control biológico en Trujillo, Perú.",
    publisher: {
      "@type": "Organization",
      "@id": "https://aslaboratorios.com/#organization",
      name: "AS Laboratorios",
    },
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
    image: image
      ? image.startsWith("http")
        ? image
        : `https://aslaboratorios.com${image}`
      : "https://aslaboratorios.com/images/new-logo.png",
    provider: {
      "@type": "Organization",
      "@id": "https://aslaboratorios.com/#organization",
      name: provider,
      url: "https://aslaboratorios.com",
      logo: "https://aslaboratorios.com/images/new-logo.png",
      telephone: "+51-961-996-645",
      email: "ventas@aslaboratorios.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ca. 30, Urb. San Isidro II",
        postalCode: "13001",
        addressLocality: "Trujillo",
        addressRegion: "La Libertad",
        addressCountry: "PE",
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
    termsOfService: "https://aslaboratorios.com/legal",
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
          streetAddress: "Ca. 30, Urb. San Isidro II",
          postalCode: "13001",
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

export function EcuadorLocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://aslaboratorios.com/ecuador#localbusiness",
    name: "AS Labs Ecuador",
    alternateName: "AS Laboratorios Ecuador",
    url: "https://aslaboratorios.com/ecuador",
    image: [
      "https://aslaboratorios.com/ecuador/carolina-millenium.jpg",
      "https://aslaboratorios.com/new/bannerasnuevo.webp",
      "https://aslaboratorios.com/images/new-logo.png",
    ],
    logo: "https://aslaboratorios.com/images/new-logo.png",
    description:
      "Sede de AS Labs en Quito para biología molecular, formulaciones bacterianas, plantines in vitro y cepas bacterianas identificadas.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Andrade Marin 24, Edificio Carolina Millenium",
      postalCode: "170518",
      addressLocality: "Quito",
      addressRegion: "Pichincha",
      addressCountry: "EC",
    },
    hasMap: "https://maps.google.com/?q=Andrade+Marin+24+Carolina+Millenium+Quito+Ecuador",
    areaServed: [
      { "@type": "City", name: "Quito" },
      { "@type": "AdministrativeArea", name: "Pichincha" },
      { "@type": "Country", name: "Ecuador" },
    ],
    parentOrganization: { "@id": "https://aslaboratorios.com/#organization" },
    knowsAbout: [
      "Biología molecular",
      "PCR y qPCR",
      "Secuenciamiento 16S rRNA e ITS",
      "Formulaciones bacterianas",
      "Plantines in vitro",
      "Cepas bacterianas identificadas",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de AS Labs para Ecuador",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Análisis de biología molecular" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Formulaciones bacterianas" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plantines in vitro" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cepas bacterianas identificadas" } },
      ],
    },
  }

  return (
    <script
      id="ecuador-local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function EcuadorServiceStructuredData({
  serviceName,
  serviceDescription,
  serviceUrl,
  offers,
  image,
}: {
  serviceName: string
  serviceDescription: string
  serviceUrl: string
  offers: Array<{ name: string; description: string }>
  image?: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    image: image ? `https://aslaboratorios.com${image}` : undefined,
    provider: {
      "@type": "Organization",
      "@id": "https://aslaboratorios.com/#organization",
      name: "AS Laboratorios",
      url: "https://aslaboratorios.com",
    },
    serviceArea: { "@type": "Country", name: "Ecuador" },
    areaServed: [
      { "@type": "City", name: "Quito" },
      { "@type": "Country", name: "Ecuador" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl,
      serviceLocation: {
        "@type": "Place",
        name: "AS Labs Ecuador",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Andrade Marin 24, Edificio Carolina Millenium",
          postalCode: "170518",
          addressLocality: "Quito",
          addressRegion: "Pichincha",
          addressCountry: "EC",
        },
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Catálogo de ${serviceName}`,
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offer.name, description: offer.description },
      })),
    },
  }

  return (
    <script
      id={`ecuador-service-${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
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
    image: image || "https://aslaboratorios.com/images/new-logo.png",
    telephone: "+51-961-996-645",
    email: "ventas@aslaboratorios.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ca. 30, Urb. San Isidro II",
      postalCode: "13001",
      addressLocality: "Trujillo",
      addressRegion: "La Libertad",
      addressCountry: "PE",
    },
    hasMap: "https://maps.google.com/?q=Ca.+30+Urb.+San+Isidro+II+Trujillo+Peru",
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
          image: "https://aslaboratorios.com/control-biologico.png",
          brand: { "@type": "Brand", name: "AS Laboratorios" },
          manufacturer: { "@type": "Organization", name: "AS Laboratorios Trujillo" },
          category: "Control Biológico",
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
          image: "https://aslaboratorios.com/control-biologico.png",
          brand: { "@type": "Brand", name: "AS Laboratorios" },
          manufacturer: { "@type": "Organization", name: "AS Laboratorios Trujillo" },
          category: "Control Biológico",
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
