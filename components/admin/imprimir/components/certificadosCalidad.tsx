import React from "react";

interface Certificado {
    titulo: string;
    codigo: string;
    tipo: string;
    informe: string;
    detalle: string[];
    link?: string;
}

interface CertificadosCalidadProps {
    certificadosCalidad?: string
    certificados?: Certificado[] // Nueva prop para certificados estructurados
    tieneASWG?: boolean // Temporal para compatibilidad
    tieneASC5?: boolean // Temporal para compatibilidad
}

export function CertificadosCalidad({
    certificadosCalidad,
    certificados,
    tieneASWG = false,
    tieneASC5 = false
}: CertificadosCalidadProps) {
    return (
        <div className="mt-4">
            <h3 className="text-sm font-bold mb-1.5 text-[#5D9848]">Certificados de Calidad</h3>
            
            {/* Mostrar certificados de BD si existen */}
            {certificados && certificados.length > 0 ? (
                <div className="space-y-3 text-[10pt]">
                    {certificados.map((cert, index) => (
                        <div key={index} className="border border-dashed border-amber-300 bg-amber-100 p-2">
                            <h4 className="font-bold text-center mb-1.5 text-xs">
                                {cert.titulo}
                            </h4>
                            <table className="w-full border-collapse text-[9pt]">
                                <tbody>
                                    <tr className="border border-gray-300 bg-gray-100">
                                        <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                        <td className="p-1 border border-gray-300">{cert.codigo}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                        <td className="p-1 border border-gray-300">{cert.tipo}</td>
                                    </tr>
                                    <tr className="border border-gray-300 bg-gray-100">
                                        <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                        <td className="p-1 border border-gray-300">{cert.informe}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mt-1">
                                {cert.detalle.map((detalle, detIndex) => (
                                    <p key={detIndex} className="mt-1 text-[9pt]">
                                        {detalle}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Mostrar texto simple de certificados si no hay datos estructurados */
                certificadosCalidad && (
                    <p className="text-xs text-gray-600">{certificadosCalidad}</p>
                )
            )}
        </div>
    )
}