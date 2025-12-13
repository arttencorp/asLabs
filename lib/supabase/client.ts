import { createClient } from "@supabase/supabase-js"
import { createBrowserClient } from "@supabase/ssr"

// Configuración cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Cliente para operaciones sin sesión (mantener el existente para compatibilidad)
export const supabase = createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-key",
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        db: {
            schema: "public",
        },
        global: {
            headers: {
                "x-client-info": "as-labs-admin",
            },
        },
        realtime: {
            params: {
                eventsPerSecond: 10,
            },
        },
    },
)

// Cliente para operaciones con sesión (autenticadas)
export const createAuthenticatedClient = () => {
    return createBrowserClient(
        supabaseUrl || "https://placeholder.supabase.co",
        supabaseAnonKey || "placeholder-key"
    )
}

// Función auxiliar para limpiar datos (convertir strings vacíos a null)
export function cleanData(obj: any) {
    const cleaned = { ...obj }
    for (const key in cleaned) {
        if (cleaned[key] === '') {
            cleaned[key] = null
        }
    }
    return cleaned
}
