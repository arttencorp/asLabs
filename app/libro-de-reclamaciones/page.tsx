import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import Footer from '@/components/footer'
import LibroReclamacionesClient from '@/app/libro-de-reclamaciones/client'

export const metadata: Metadata = {
    title: 'Libro de Reclamaciones | AS Laboratorios',
    description:
        'Registra tu queja o reclamo y consulta el estado de tu solicitud. AS Laboratorios atiende todos los reclamos en un máximo de 15 días hábiles, de acuerdo con la Ley N.° 29571.',
}

export default function LibroReclamacionesPage() {
    return (
        <>
            <Navbar />
            <LibroReclamacionesClient />
            <Footer />
        </>
    )
}
