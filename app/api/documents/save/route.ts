import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { Pool } from '@neondatabase/serverless'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
})

async function ensureDocumentsTable() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        codigo_documento VARCHAR(255) UNIQUE NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        tipo VARCHAR(50),
        area VARCHAR(50),
        cliente_razon_social VARCHAR(255),
        cliente_ruc VARCHAR(50),
        servicio VARCHAR(255),
        documento_html TEXT,
        documento_json JSONB,
        fecha_emision DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_documents_codigo ON documents(codigo_documento);
    `)
  } finally {
    client.release()
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { codigoDocumento, documentoHTML, documentoData } = body

    if (!codigoDocumento || !documentoHTML) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    // Asegurar que la tabla existe
    await ensureDocumentsTable()

    // Generar una contraseña aleatoria de 6 caracteres alfanuméricos
    const password = crypto.randomBytes(3).toString('hex').toUpperCase()

    const client = await pool.connect()
    try {
      await client.query(
        `INSERT INTO documents 
         (codigo_documento, contrasena, tipo, area, cliente_razon_social, cliente_ruc, servicio, documento_html, documento_json, fecha_emision)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          codigoDocumento,
          password,
          documentoData?.tipo,
          documentoData?.area,
          documentoData?.cliente?.razonSocial,
          documentoData?.cliente?.ruc,
          documentoData?.servicio?.servicio,
          documentoHTML,
          JSON.stringify(documentoData),
          documentoData?.fechaEmision,
        ]
      )

      return NextResponse.json({
        success: true,
        codigo: codigoDocumento,
        password: password,
        message: `Documento guardado. Comparte este código y contraseña con el cliente.`,
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
