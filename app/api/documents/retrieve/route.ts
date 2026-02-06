import { NextRequest, NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
})

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

    const client = await pool.connect()
    try {
      const result = await client.query(
        `SELECT * FROM documents WHERE codigo_documento = $1 AND contrasena = $2`,
        [codigo, password]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Código o contraseña incorrectos' },
          { status: 404 }
        )
      }

      const data = result.rows[0]

      return NextResponse.json({
        success: true,
        documento: {
          codigo: data.codigo_documento,
          html_content: data.documento_html,
          data_json: data.documento_json,
          created_at: data.created_at,
        },
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error procesando la solicitud', details: String(error) },
      { status: 500 }
    )
  }
}
