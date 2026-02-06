-- Crear tabla de documentos
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_documento VARCHAR(255) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  area VARCHAR(50) NOT NULL,
  cliente_razon_social VARCHAR(255),
  cliente_ruc VARCHAR(50),
  servicio VARCHAR(255),
  documento_json JSONB NOT NULL,
  fecha_emision DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsqueda rápida
CREATE INDEX idx_documents_codigo ON documents(codigo_documento);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);

-- Crear trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
