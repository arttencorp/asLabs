import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { codigo, password } = body

    if (!codigo || !password) {
      return NextResponse.json(
        { error: 'Código y contraseña requeridos' },
        { status: 400 }
      )
    }

    // Buscar documento
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('codigo', codigo)
      .eq('password', password)
      .single()

    if (error || !data) {
      console.error('Documento no encontrado:', error)
      return NextResponse.json(
        { error: 'Código o contraseña incorrectos' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      documento: {
        codigo: data.codigo,
        html_content: data.html_content,
        data_json: data.data_json,
        created_at: data.created_at,
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    )
  }
}
