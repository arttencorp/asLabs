import Image from "next/image"

interface CertificadosSENASAProps {
    tieneASC5: boolean
    tieneASWG: boolean
}

export function CertificadosSENASA({ tieneASC5, tieneASWG }: CertificadosSENASAProps) { 

    return (
        <>
            {tieneASC5 && (
                <div className="mt-6 page-break-before">
                    <div className="mx-auto max-w-[210mm]">
                        <h3 className="text-center font-bold text-lg mb-4">CERTIFICADOS DE CONTROL DE CALIDAD</h3>

                        {/* Primer certificado */}
                        <div className="mb-4">
                            <Image
                                src="/certificados/certificado-senasa-114644.png"
                                alt="Certificado SENASA 114644"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        {/* Segundo certificado - sin page-break */}
                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-114535.png"
                                alt="Certificado SENASA 114535"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        {/* Tercer certificado - sin page-break */}
                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-100341.png"
                                alt="Certificado SENASA 100341"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            {tieneASWG && !tieneASC5 && (
                <div className="mt-6 page-break-before">
                    <div className="mx-auto max-w-[210mm]">
                        <h3 className="text-center font-bold text-lg mb-4">CERTIFICADOS DE CONTROL DE CALIDAD</h3>

                        {/* Primer certificado */}
                        <div className="mb-4">
                            <Image
                                src="/certificados/certificado-senasa-aswg-114644.png"
                                alt="Certificado SENASA ASWG 114644"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        {/* Segundo certificado - sin page-break */}
                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-aswg-114535.png"
                                alt="Certificado SENASA ASWG 114535"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        {/* Tercer certificado - sin page-break */}
                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-aswg-100341.png"
                                alt="Certificado SENASA ASWG 100341"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            {tieneASWG && tieneASC5 && (
                <div className="mt-6 page-break-before">
                    <div className="mx-auto max-w-[210mm]">
                        <h3 className="text-center font-bold text-lg mb-4">CERTIFICADOS DE CONTROL DE CALIDAD - ASC5</h3>

                        {/* Certificados ASC5 */}
                        <div className="mb-4">
                            <Image
                                src="/certificados/certificado-senasa-114644.png"
                                alt="Certificado SENASA 114644"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-114535.png"
                                alt="Certificado SENASA 114535"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-100341.png"
                                alt="Certificado SENASA 100341"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            {tieneASWG && tieneASC5 && (
                <div className="mt-6 page-break-before">
                    <div className="mx-auto max-w-[210mm]">
                        <h3 className="text-center font-bold text-lg mb-4">CERTIFICADOS DE CONTROL DE CALIDAD - ASWG</h3>

                        {/* Certificados ASWG */}
                        <div className="mb-4">
                            <Image
                                src="/certificados/certificado-senasa-aswg-114644.png"
                                alt="Certificado SENASA ASWG 114644"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-aswg-114535.png"
                                alt="Certificado SENASA ASWG 114535"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>

                        <div className="mt-8 mb-4">
                            <Image
                                src="/certificados/certificado-senasa-aswg-100341.png"
                                alt="Certificado SENASA ASWG 100341"
                                width={800}
                                height={1130}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}