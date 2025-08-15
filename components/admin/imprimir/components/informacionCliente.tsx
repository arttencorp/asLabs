import { formatDate } from "@/utils/index"

interface InformacionClienteProps {
    razonSocial?: string
    dniRuc?: string
    direccion?: string
    telefono?: string
    fechaEmision?: string | number | Date
    fechaVencimiento?: string | number | Date
    tipoCliente?: 'natural' | 'juridica' // Nuevo prop para determinar el tipo
}

export function InformacionCliente({
    razonSocial,
    dniRuc,
    direccion,
    telefono,
    fechaEmision,
    fechaVencimiento,
    tipoCliente
}: InformacionClienteProps) {
    // Determinar la etiqueta del documento según el tipo de cliente
    const etiquetaDocumento = tipoCliente === 'natural' ? 'DNI' : 'RUC'
    
    return (
        <>
            <div className="flex justify-between text-xs">
                <div className="w-1/2">
                    <h2 className="font-bold">Cliente: {razonSocial || ""}</h2>
                    <p>{dniRuc ? `${etiquetaDocumento} ${dniRuc}` : ""}</p>
                    <p>{direccion || ""}</p>
                    <p>{telefono ? `Telf. ${telefono}` : ""}</p>
                </div>
                <div className="w-1/2 text-right">
                    <p>
                        <span className="font-semibold">Fecha de emisión:</span> {formatDate(String(fechaEmision ?? ""))}
                    </p>
                    <p>
                        <span className="font-semibold">Fecha de vencimiento:</span> {formatDate(String(fechaVencimiento ?? "")).toString()}
                    </p>
                </div>
            </div>

            <div className="my-3 h-[1px] w-full bg-gray-300"></div>
        </>
    )
}
