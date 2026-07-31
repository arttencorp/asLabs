import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import type { Metadata, Viewport } from "next"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
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
  title: { default: "Biotecnología Agrícola y Laboratorio en Perú | AS Laboratorios" },
  description:
    "Biotecnología agrícola, plantines in vitro, análisis de laboratorio, control biológico e investigación aplicada desde Trujillo para todo el Perú.",
  generator: "Next.js",
  applicationName: "AS Laboratorios",
  referrer: "origin-when-cross-origin",
  keywords: [
    "AS Laboratorios Trujillo",
    "biotecnología agrícola Perú",
    "plantines in vitro",
    "análisis de laboratorio Trujillo",
    "análisis microbiológicos",
    "fitopatología",
    "control biológico",
    "cultivo tejidos",
    "micropropagación",
    "cepas microbianas",
    "investigación agrícola Perú",
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
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://aslaboratorios.com",
    siteName: "AS Laboratorios",
    title: "Biotecnología Agrícola y Laboratorio en Perú | AS Laboratorios",
    description:
      "Plantines in vitro, análisis de laboratorio, control biológico e investigación aplicada desde Trujillo para el Perú.",
    images: [
      {
        url: "/new/bannerasnuevo.webp",
        alt: "Equipo de AS Laboratorios trabajando en biotecnología agrícola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biotecnología Agrícola y Laboratorio en Perú | AS Laboratorios",
    description: "Plantines in vitro, análisis de laboratorio, control biológico e investigación aplicada en Perú.",
    images: ["/new/bannerasnuevo.webp"],
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
  category: "Biotechnology",
  classification: "Business",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={poppins.variable} suppressHydrationWarning>
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
      <body className="min-h-screen bg-background font-[var(--font-poppins)] text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
