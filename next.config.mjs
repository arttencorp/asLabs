/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Ocultamiento temporal de familias no habilitadas para el público.
    const hiddenFamilies = [
      "biologia-molecular",
      "microbiologia",
      "equipos-consumibles",
      "bacteriofagos",
      "equipos-de-laboratorio",
    ]
    return [
      { source: "/kits-reactivos", destination: "/kits-reactivos/medios-de-cultivo", permanent: false },
      ...hiddenFamilies.map((family) => ({
        source: `/kits-reactivos/${family}`,
        destination: "/kits-reactivos/medios-de-cultivo",
        permanent: false,
      })),
    ]
  },
}

export default nextConfig
