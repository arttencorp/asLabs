import { formatearFecha } from "../utils"

interface InformacionClienteProps {
    razonSocial?: string
    dniRuc?: string
    direccion?: string
    telefono?: string
    fechaEmision?: string | number | Date
    fechaVencimiento?: string | number | Date
}

export function InformacionCliente({
    razonSocial,
    dniRuc,
    direccion,
    telefono,
    fechaEmision,
    fechaVencimiento
}: InformacionClienteProps) {
    return (
        <>
            <div className="flex justify-between text-xs">
                <div className="w-1/2">
                    <h2 className="font-bold">Cliente: {razonSocial || ""}</h2>
                    <p>RUC {dniRuc || ""}</p>
                    <p>{direccion || ""}</p>
                    <p>Telf. {telefono || ""}</p>
                </div>
                <div className="w-1/2 text-right">
                    <p>
                        <span className="font-semibold">Fecha de emisión:</span> {String(formatearFecha(fechaEmision ?? ""))}
                    </p>
                    <p>
                        <span className="font-semibold">Fecha de vencimiento:</span> {formatearFecha(fechaVencimiento ?? "").toString()}
                    </p>
                </div>
            </div>

            <div className="my-3 h-[1px] w-full bg-gray-300"></div>
        </>
    )
}
