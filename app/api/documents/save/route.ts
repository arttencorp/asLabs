import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { codigoDocumento, documentoHTML, documentoData } = body

    // Generar una contraseña aleatoria de 6 caracteres alfanuméricos
    const password = crypto.randomBytes(3).toString('hex').toUpperCase()

    // Guardar en Supabase
    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          codigo: codigoDocumento,
          password: password,
          html_content: documentoHTML,
          data_json: documentoData,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error al guardar documento:', error)
      return NextResponse.json(
        { error: 'Error al guardar documento', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      codigo: codigoDocumento,
      password: password,
      message: `Documento guardado. Comparte este código y contraseña con el cliente.`,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    )
  }
}
