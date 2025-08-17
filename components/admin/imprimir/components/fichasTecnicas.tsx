interface FichaTecnica {
    titulo?: string;
    descripcion?: string;
    archivo?: string;
}

interface FichasTecnicasProps {
    fichasTecnicas: FichaTecnica[]
}

export function FichasTecnicas({ fichasTecnicas }: FichasTecnicasProps) {
    if (!fichasTecnicas || fichasTecnicas.length === 0) {
        return null;
    }

    return (
        <>
            {fichasTecnicas.map((ficha, index) => (
                <div key={index} className="mt-6 page-break-before">
                    {ficha.archivo ? (
                        // Si hay imagen, mostrar con contenedor de página completa
                        <div className="mx-auto max-w-[210mm] bg-white print:p-0">
                            <div className="ficha-tecnica-print">
                                <img 
                                    src={ficha.archivo} 
                                    alt={ficha.titulo || 'Ficha técnica'}
                                />
                            </div>
                        </div>
                    ) : (
                        // Si no hay imagen, mostrar la estructura igual que las fichas originales
                        <div className="border border-green-300 rounded-lg overflow-hidden">
                            <div className="bg-[#5D9848] text-white p-3 flex items-center">
                                <div className="w-12 h-12 bg-[#C25B28] flex items-center justify-center mr-3 rounded-md">
                                    <div className="w-8 h-8 border-t-3 border-r-3 border-white transform rotate-45"></div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">FICHA TÉCNICA</h2>
                                    <h3 className="text-base font-bold">{ficha.titulo || 'Sin título'}</h3>
                                    <p className="text-sm">{ficha.descripcion || 'Sin descripción'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}
