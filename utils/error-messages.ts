/**
 * Transformador centralizado de errores técnicos a mensajes amigables.
 * Convierte errores de Supabase/PostgreSQL en mensajes entendibles para el usuario.
 */

const ERROR_PATTERNS: { pattern: RegExp; message: string }[] = [
  // Foreign key violations
  { pattern: /violates foreign key constraint/i, message: 'No se puede completar la operación porque hay datos relacionados que lo impiden.' },
  { pattern: /foreign key constraint.*modalidad/i, message: 'Debe asignar una modalidad de trabajo al puesto.' },
  { pattern: /foreign key constraint.*estado/i, message: 'Debe asignar un estado al puesto.' },

  // Unique violations
  { pattern: /duplicate key value violates unique constraint/i, message: 'Ya existe un registro con esos datos. No se permiten duplicados.' },
  { pattern: /unique constraint.*producto/i, message: 'Este producto ya fue agregado. No se puede duplicar.' },
  { pattern: /unique constraint.*email/i, message: 'Ya existe un registro con ese correo electrónico.' },
  { pattern: /unique constraint.*dni|documento/i, message: 'Ya existe un registro con ese número de documento.' },

  // Not null violations
  { pattern: /null value in column.*violates not-null/i, message: 'Hay campos obligatorios sin completar. Revisa el formulario.' },

  // Check constraint violations
  { pattern: /violates check constraint/i, message: 'Uno de los valores ingresados no es válido.' },

  // Row not found
  { pattern: /no rows returned/i, message: 'No se encontró el registro solicitado.' },
  { pattern: /row-level security/i, message: 'No tienes permisos para realizar esta acción.' },

  // Network
  { pattern: /fetch|network|ERR_CONNECTION|ECONNREFUSED/i, message: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.' },
  { pattern: /timeout|ETIMEDOUT/i, message: 'La operación tardó demasiado. Intenta nuevamente.' },

  // Generic DB
  { pattern: /relation.*does not exist/i, message: 'Error interno del sistema. Contacta al administrador.' },
  { pattern: /permission denied/i, message: 'No tienes permisos para realizar esta acción.' },
]

/**
 * Transforma un error técnico en un mensaje amigable para el usuario.
 * @param error - El error capturado (puede ser string, Error, o cualquier objeto)
 * @param fallback - Mensaje por defecto si no se encuentra un patrón
 */
export function transformarError(error: unknown, fallback = 'Ocurrió un error inesperado. Intenta nuevamente.'): string {
  const rawMessage = error instanceof Error
    ? error.message
    : typeof error === 'string'
      ? error
      : (error as any)?.message || String(error)

  for (const { pattern, message } of ERROR_PATTERNS) {
    if (pattern.test(rawMessage)) {
      return message
    }
  }

  return fallback
}
