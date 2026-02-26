// ============================================
// SUPABASE MODULES - CENTRALIZED RE-EXPORTS
// ============================================
// Este archivo re-exporta todas las funciones de los módulos
// para mantener compatibilidad con imports existentes

// Cliente y configuración
export * from './client'

// Gestión de clientes/personas
export * from './personas'

// Productos y catálogos (estados, formas de pago)
export * from './productos'

// Certificados de calidad
export * from './certificados'

// Fichas técnicas completas
export * from './fichas-tecnicas'

// Gestión de pedidos
export * from './pedidos'

// Gestión de cotizaciones
export * from './cotizaciones'

// Tienda (categorías y productos de tienda)
export * from './tienda'

// Documentos de laboratorio (certificados e informes)
export * from './documentos-lab'

// Módulo de recepción (flujo cotización → orden → documento)
export * from './recepcion'

// Firmas (catálogo y asignaciones a documentos)
export * from './firmas'
