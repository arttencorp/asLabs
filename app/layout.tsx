import type React from "react"
import "./globals.css"
import { DM_Serif_Text } from "next/font/google"
import type { Metadata, Viewport } from "next"
import {
  OrganizationStructuredData,
  LocalBusinessStructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data"

const dmSerifText = DM_Serif_Text({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2e7d32" },
    { media: "(prefers-color-scheme: dark)", color: "#2e7d32" },
  ],
  colorScheme: "light",
}

export const metadata: Metadata = {
  title: {
    template: "%s | AS Laboratorios - Biotecnología Vegetal Perú",
    default: "AS Laboratorios - Líder en Biotecnología Vegetal y Materiales de Laboratorio en Perú",
  },
  description:
    "AS Laboratorios - Empresa peruana líder en biotecnología vegetal desde el año 2000. Especialistas en plantines in vitro, control biológico, materiales de laboratorio, reactivos y asesoría técnica para agricultura sostenible. Servicio a universidades, estudiantes y agricultores en todo el Perú.",
  generator: "Next.js",
  applicationName: "AS Laboratorios",
  referrer: "origin-when-cross-origin",
  keywords: [
    "AS Laboratorios",
    "biotecnología vegetal Perú",
    "plantines in vitro",
    "control biológico",
    "materiales laboratorio Trujillo",
    "reactivos biología",
    "medios cultivo",
    "placas petri",
    "microscopio estudiantes",
    "universidad biología",
    "La Libertad biotecnología",
    "agricultura sostenible",
    "cultivo tejidos",
    "micropropagación",
    "banano baby",
    "pitahaya plantines",
    "fresa in vitro",
    "piña biotecnología",
    "genética molecular",
    "PCR laboratorio",
    "electroforesis",
    "asesoría técnica agrícola",
    "investigación biotecnológica",
    "educación científica Perú",
  ],
  authors: [{ name: "AS Laboratorios", url: "https://aslaboratorios.com" }],
  creator: "AS Laboratorios",
  publisher: "AS Laboratorios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aslaboratorios.com"),
  alternates: {
    canonical: "https://aslaboratorios.com",
    languages: {
      "es-PE": "https://aslaboratorios.com",
      es: "https://aslaboratorios.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://aslaboratorios.com",
    siteName: "AS Laboratorios",
    title: "AS Laboratorios - Líder en Biotecnología Vegetal Perú",
    description:
      "Empresa peruana especializada en biotecnología vegetal, plantines in vitro, control biológico y materiales de laboratorio. Servicio a universidades y agricultores desde el año 2000.",
    images: [
      {
        url: "/aslabs-logo.png",
        width: 1200,
        height: 630,
        alt: "AS Laboratorios - Biotecnología Vegetal Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AS Laboratorios - Biotecnología Vegetal Perú",
    description: "Líder en biotecnología vegetal, plantines in vitro y materiales de laboratorio en Perú",
    images: ["/aslabs-logo.png"],
    creator: "@aslaboratorios",
    site: "@aslaboratorios",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "AS-Laboratorios-Peru-Biotecnologia-Vegetal",
    yandex: "AS-Laboratorios-Peru",
    yahoo: "AS-Laboratorios-Peru",
  },
  category: "Biotechnology",
  classification: "Business",
  other: {
    "google-site-verification": "AS-Laboratorios-Peru-Biotecnologia-Vegetal",
    "msvalidate.01": "AS-Laboratorios-Peru-Microsoft",
    "facebook-domain-verification": "AS-Laboratorios-Peru-Facebook",
    "p:domain_verify": "AS-Laboratorios-Peru-Pinterest",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${dmSerifText.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="theme-color" content="#2e7d32" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AS Labs" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#2e7d32" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-serif antialiased">
        <OrganizationStructuredData />
        <LocalBusinessStructuredData />
        <WebsiteStructuredData />
        {children}
      </body>
    </html>
  )
}
