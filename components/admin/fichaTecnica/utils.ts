import type { FichaTecnicaForm } from './types'
import { ERROR_MESSAGES, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from './constants'

// Validar datos del formulario de ficha técnica
export function validarFichaTecnica(data: FichaTecnicaForm): string[] {
  const errors: string[] = []

  // Validar nombre de planta
  if (!data.fit_tec_nom_planta_vac?.trim()) {
    errors.push(ERROR_MESSAGES.REQUIRED_NAME)
  }

  // Validar producto
  if (!data.pro_id_int?.trim()) {
    errors.push(ERROR_MESSAGES.REQUIRED_PRODUCT)
  }

  return errors
}

// Validar archivo de imagen
export function validarArchivoImagen(file: File): { isValid: boolean; error?: string } {
  // Validar tipo de archivo
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE }
  }

  // Validar tamaño de archivo
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE }
  }

  return { isValid: true }
}

// Formatear tamaño de archivo
export function formatearTamanoArchivo(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Obtener extensión de archivo
export function obtenerExtensionArchivo(fileName: string): string {
  return fileName.slice(fileName.lastIndexOf('.'))
}

// Limpiar nombre de archivo para uso en storage
export function limpiarNombreArchivo(fileName: string): string {
  // Remove any path components
  const baseName = fileName.split(/[/\\]/).pop() || '';
  // Split into name and extension
  const lastDot = baseName.lastIndexOf('.');
  let name = lastDot > 0 ? baseName.slice(0, lastDot) : baseName;
  let ext = lastDot > 0 ? baseName.slice(lastDot + 1) : '';
  // Sanitize name: only alphanumeric and underscores, no leading dots
  name = name.replace(/[^a-zA-Z0-9]/g, '_').replace(/^_+/, '');
  // Sanitize extension: only alphanumeric, max 8 chars
  ext = ext.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
  // If no name, use 'file'
  if (!name) name = 'file';
  // Recombine
  return ext ? `${name}.${ext}` : name;
}

// Extraer nombre de archivo de URL de storage
export function extraerNombreArchivoDeUrl(url: string): string {
  const urlParts = url.split('/fichaTecnica/')
  if (urlParts.length === 2) {
    return urlParts[1]
  }
  return ''
}

// Verificar si una URL es válida
export function esUrlValida(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Formatear datos para mostrar en la tabla
export function formatearDatosFichaTecnica(ficha: any) {
  return {
    id: ficha.fit_tec_id_int,
    nombrePlanta: ficha.fit_tec_nom_planta_vac || 'Sin nombre',
    codigo: ficha.fit_tec_cod_vac || 'Sin código',
    producto: ficha.producto?.pro_nomb_vac || 'Producto no encontrado',
    tieneImagen: Boolean(ficha.fit_tec_imag_vac),
    fechaCreacion: ficha.fit_tec_created_at_dt,
    fechaActualizacion: ficha.fit_tec_updated_at_dt
  }
}