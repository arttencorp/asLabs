import React from "react";

interface CertificadosCalidadProps {
    certificadosCalidad?: string
    tieneASWG: boolean
    tieneASC5: boolean
}

export function CertificadosCalidad({
    certificadosCalidad,
    tieneASWG,
    tieneASC5
}: CertificadosCalidadProps) {
    return (
        <div className="mt-4">
            <h3 className="text-sm font-bold mb-1.5 text-[#5D9848]">Certificados de Calidad</h3>
            {(() => {
                // Si hay productos con certificados específicos, mostrarlos
                if (tieneASWG || tieneASC5) {
                    return (
                        <div className="space-y-3 text-[10pt]">
                            {tieneASWG && (
                                <>
                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de Bacterias Fitopatógenas
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2023114632010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 114644-2023-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/BM-22: FUSARIUM OXYSPORUM F. SP CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR
                                            CONVENCIONAL - REGIÓN IGS
                                        </p>
                                        <p className="text-[9pt]">
                                            MET-UCDSV/BM-102: FUSARIUM OXYSPORUM F.SP. CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR
                                            CONVENCIONAL PRIMERS LI
                                        </p>
                                    </div>

                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de Ralstonia solanacearum
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2023114630010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 114535-2023-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/BM-102: FUSARIUM OXYSPORUM F.SP. CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR
                                            CONVENCIONAL PRIMERS LI
                                        </p>
                                    </div>

                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de banana Streak virus.
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2020109320010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 100341-2021-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/VIR-002: DAS ELISA PARA DETECCIÓN DE VIRUS FITOPATÓGENO EN MATERIAL VEGETAL
                                        </p>
                                    </div>
                                </>
                            )}

                            {tieneASC5 && (
                                <>
                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de Fusarium oxysporum f.sp. cubense Raza 4 Tropical
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2023114627010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 114531-2023-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/BM-22: FUSARIUM OXYSPORUM F. SP CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR
                                            CONVENCIONAL - REGIÓN IGS
                                        </p>
                                    </div>

                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de Fusarium oxysporum f.sp. cubense Raza 4 Tropical
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2023114627010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 114531-2023-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/BM-102: FUSARIUM OXYSPORUM F.SP. CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR
                                            CONVENCIONAL PRIMERS LI
                                        </p>
                                    </div>

                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de Bacterias Fitopatógenas
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2023114632010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 114644-2023-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/BAC-005: DIAGNÓSTICO DE BACTERIAS FITOPATÓGENAS EN MATERIAL VEGETAL
                                        </p>
                                    </div>

                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de Ralstonia solanacearum
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2023114632010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 114644-2023-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/BAC-004: BACTERIAS FITOPATÓGENAS POR SEROLOGÍA EN MATERIAL VEGETAL
                                        </p>
                                    </div>

                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de banana Streak virus.
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2020109321010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 100342-2021-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/VIR-002: DAS ELISA PARA DETECCIÓN DE VIRUS FITOPATÓGENO EN MATERIAL VEGETAL
                                        </p>
                                    </div>

                                    <div className="border border-dashed border-amber-300 bg-amber-100 p-2">
                                        <h4 className="font-bold text-center mb-1.5 text-xs">
                                            Negativo a la presencia de banana Streak virus.
                                        </h4>
                                        <table className="w-full border-collapse text-[9pt]">
                                            <tbody>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold w-1/3">CÓDIGO DE MUESTRA</td>
                                                    <td className="p-1 border border-gray-300">2020109319010001</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-1 font-semibold border border-gray-300">TIPO</td>
                                                    <td className="p-1 border border-gray-300">PLANTA COMPLETA</td>
                                                </tr>
                                                <tr className="border border-gray-300 bg-gray-100">
                                                    <td className="p-1 font-semibold">INFORME DE ENSAYO</td>
                                                    <td className="p-1 border border-gray-300">Nº 100340-2021-AG-SENASA-OCDP-UCDSV</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mt-1 text-[9pt]">
                                            MET-UCDSV/VIR-002: DAS ELISA PARA DETECCIÓN DE VIRUS FITOPATÓGENO EN MATERIAL VEGETAL
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                } else {
                    return (
                        <div className="whitespace-pre-line text-xs bg-[#f0f7ed] p-3 rounded-md">
                            {certificadosCalidad || ""}
                        </div>
                    )
                }
            })()}
        </div>
    )
}