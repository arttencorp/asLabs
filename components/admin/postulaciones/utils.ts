export function obtenerColorEstadoPostulacion(estado: string | null): {
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
    className: string
} {
    switch (estado) {
        case 'PENDIENTE':
            return { variant: 'outline', className: 'border-yellow-500 text-yellow-700 bg-yellow-50' }
        case 'EN REVISIÓN':
            return { variant: 'outline', className: 'border-blue-500 text-blue-700 bg-blue-50' }
        case 'ACEPTADO':
            return { variant: 'outline', className: 'border-green-500 text-green-700 bg-green-50' }
        case 'RECHAZADO':
            return { variant: 'outline', className: 'border-red-500 text-red-700 bg-red-50' }
        default:
            return { variant: 'outline', className: 'border-gray-500 text-gray-700 bg-gray-50' }
    }
}
