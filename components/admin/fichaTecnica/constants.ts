// Tipos de archivo permitidos para imágenes de fichas técnicas
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp'
] as const

// Tamaño máximo de archivo (sin límite práctico - 500MB)
export const MAX_FILE_SIZE = 500 * 1024 * 1024

// Extensiones de archivo permitidas
export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

// Mensajes de error
export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG y WebP.',
  FILE_TOO_LARGE: 'El archivo es demasiado grande. Tamaño máximo: 500MB.',
  REQUIRED_NAME: 'El nombre de la planta es requerido',
  REQUIRED_PRODUCT: 'El producto es requerido',
  PRODUCT_ALREADY_HAS_FICHA: 'Ya existe una ficha técnica para este producto',
  UPLOAD_ERROR: 'Error al subir la imagen',
  DELETE_ERROR: 'Error al eliminar la imagen'
} as const

// Placeholders
export const PLACEHOLDERS = {
  PLANT_NAME: 'Ej: Banano Cavendish',
  TECHNICAL_CODE: 'Ej: FT-001',
  SELECT_PRODUCT: 'Seleccionar producto...'
} as const

// Configuración de la tabla
export const TABLE_CONFIG = {
  ITEMS_PER_PAGE: 10,
  SEARCH_PLACEHOLDER: 'Buscar por nombre de planta, código o producto...'
} as const