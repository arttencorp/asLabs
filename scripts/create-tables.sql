-- Crear tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de estados de pedido
CREATE TABLE IF NOT EXISTS estados_pedido (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    color VARCHAR(20) DEFAULT 'gray',
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar estados predefinidos
INSERT INTO estados_pedido (nombre, descripcion, color, orden) VALUES
('Recibido', 'Pedido recibido y en proceso de verificación', 'blue', 1),
('Confirmado', 'Pedido confirmado y en preparación', 'yellow', 2),
('En Preparación', 'Pedido siendo preparado en laboratorio', 'orange', 3),
('Listo para Envío', 'Pedido listo para ser enviado', 'purple', 4),
('Enviado', 'Pedido enviado al cliente', 'indigo', 5),
('Entregado', 'Pedido entregado exitosamente', 'green', 6),
('Cancelado', 'Pedido cancelado', 'red', 7)
ON CONFLICT (nombre) DO NOTHING;

-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    numero_pedido VARCHAR(50) UNIQUE NOT NULL,
    codigo_seguimiento VARCHAR(20) UNIQUE NOT NULL,
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    productos TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'recibido',
    codigo_rastreo VARCHAR(100),
    fecha_pedido TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notas TEXT
);

-- Crear tabla de historial de estados
CREATE TABLE IF NOT EXISTS historial_estados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    estado_anterior VARCHAR(50),
    estado_nuevo VARCHAR(50) NOT NULL,
    comentario TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Función para generar número de pedido automático
CREATE OR REPLACE FUNCTION generar_numero_pedido()
RETURNS TEXT AS $$
DECLARE
    fecha_actual TEXT;
    contador INTEGER;
    numero_pedido TEXT;
BEGIN
    -- Obtener fecha actual en formato YYYYMMDD
    fecha_actual := TO_CHAR(NOW(), 'YYYYMMDD');
    
    -- Contar pedidos del día actual
    SELECT COUNT(*) + 1 INTO contador
    FROM pedidos 
    WHERE numero_pedido LIKE 'ASL-' || fecha_actual || '-%';
    
    -- Generar número de pedido
    numero_pedido := 'ASL-' || fecha_actual || '-' || LPAD(contador::TEXT, 3, '0');
    
    RETURN numero_pedido;
END;
$$ LANGUAGE plpgsql;

-- Trigger para generar número de pedido automáticamente
CREATE OR REPLACE FUNCTION trigger_generar_numero_pedido()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.numero_pedido IS NULL OR NEW.numero_pedido = '' THEN
        NEW.numero_pedido := generar_numero_pedido();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pedidos_generar_numero
    BEFORE INSERT ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION trigger_generar_numero_pedido();

-- Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar automáticamente updated_at en clientes
CREATE TRIGGER update_clientes_updated_at 
    BEFORE UPDATE ON clientes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para actualizar automáticamente fecha_actualizacion en pedidos
CREATE TRIGGER update_pedidos_updated_at 
    BEFORE UPDATE ON pedidos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para registrar cambios de estado
CREATE OR REPLACE FUNCTION trigger_historial_estado()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo registrar si el estado cambió
    IF OLD.estado IS DISTINCT FROM NEW.estado THEN
        INSERT INTO historial_estados (pedido_id, estado_anterior, estado_nuevo, comentario)
        VALUES (NEW.id, OLD.estado, NEW.estado, 'Estado actualizado automáticamente');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pedidos_historial_estado
    AFTER UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION trigger_historial_estado();

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_pedidos_codigo_seguimiento ON pedidos(codigo_seguimiento);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente_id ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);

-- Insertar datos de ejemplo
INSERT INTO clientes (nombres, apellidos, email, telefono, direccion) VALUES
('Juan Pérez', NULL, 'juan.perez@email.com', '+51 987654321', 'Av. Universitaria 123'),
('María García', NULL, 'maria.garcia@email.com', '+51 987654322', 'Jr. Bolívar 456'),
('Carlos López', NULL, 'carlos.lopez@email.com', '+51 987654323', 'Av. América 789')
ON CONFLICT DO NOTHING;

-- Insertar datos de prueba si no existen
INSERT INTO clientes (nombres, apellidos, email, telefono, direccion)
SELECT 'María Elena', 'García López', 'maria.garcia@email.com', '+51 987 654 321', 'Av. Universitaria 1801, San Martín de Porres, Lima'
WHERE NOT EXISTS (SELECT 1 FROM clientes WHERE email = 'maria.garcia@email.com');

-- Insertar pedidos de ejemplo
DO $$
DECLARE
    cliente1_id UUID;
    cliente2_id UUID;
    cliente3_id UUID;
    pedido1_id UUID;
    pedido2_id UUID;
    pedido3_id UUID;
BEGIN
    -- Obtener IDs de clientes
    SELECT id INTO cliente1_id FROM clientes WHERE email = 'juan.perez@email.com';
    SELECT id INTO cliente2_id FROM clientes WHERE email = 'maria.garcia@email.com';
    SELECT id INTO cliente3_id FROM clientes WHERE email = 'carlos.lopez@email.com';
    
    -- Insertar pedidos solo si no existen
    IF NOT EXISTS (SELECT 1 FROM pedidos WHERE cliente_id = cliente1_id) THEN
        INSERT INTO pedidos (cliente_id, productos, total, estado, codigo_rastreo, notas)
        VALUES (cliente1_id, 'Kit de microbiología básica', 150.00, 'confirmado', 'TRK001234567', 'Cliente solicita entrega en horario de oficina')
        RETURNING id INTO pedido1_id;
        
        INSERT INTO historial_estados (pedido_id, estado_anterior, estado_nuevo, comentario)
        VALUES (pedido1_id, NULL, 'recibido', 'Pedido creado'),
               (pedido1_id, 'recibido', 'confirmado', 'Pedido confirmado por el cliente'),
               (pedido1_id, 'confirmado', 'preparando', 'Iniciada preparación en laboratorio');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pedidos WHERE cliente_id = cliente2_id) THEN
        INSERT INTO pedidos (cliente_id, productos, total, estado, codigo_rastreo, notas)
        VALUES (cliente2_id, 'Plantines de banano in vitro (50 unidades)', 300.00, 'enviado', 'TRACK-001-2024', 'Cliente solicita entrega en horario de oficina')
        RETURNING id INTO pedido2_id;
        
        INSERT INTO historial_estados (pedido_id, estado_anterior, estado_nuevo, comentario)
        VALUES (pedido2_id, NULL, 'recibido', 'Pedido creado'),
               (pedido2_id, 'recibido', 'confirmado', 'Pedido confirmado'),
               (pedido2_id, 'confirmado', 'preparando', 'En preparación'),
               (pedido2_id, 'preparando', 'listo para envío', 'Listo para envío'),
               (pedido2_id, 'listo para envío', 'enviado', 'Enviado vía courier');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pedidos WHERE cliente_id = cliente3_id) THEN
        INSERT INTO pedidos (cliente_id, productos, total, estado, codigo_rastreo, notas)
        VALUES (cliente3_id, 'Reactivos para PCR', 200.00, 'entregado', NULL, 'Cliente solicita entrega en horario de oficina')
        RETURNING id INTO pedido3_id;
        
        INSERT INTO historial_estados (pedido_id, estado_anterior, estado_nuevo, comentario)
        VALUES (pedido3_id, NULL, 'recibido', 'Pedido creado'),
               (pedido3_id, 'recibido', 'confirmado', 'Pedido confirmado'),
               (pedido3_id, 'confirmado', 'preparando', 'Preparación completada'),
               (pedido3_id, 'preparando', 'listo para envío', 'Empaquetado'),
               (pedido3_id, 'listo para envío', 'enviado', 'Enviado'),
               (pedido3_id, 'enviado', 'entregado', 'Entregado exitosamente');
    END IF;
END $$;

-- Insertar pedido de prueba
INSERT INTO pedidos (numero_pedido, codigo_seguimiento, cliente_id, productos, total, estado, codigo_rastreo, notas)
SELECT 
    'PED-1705312200000',
    'ABC123XY',
    c.id,
    'Kit Microbiología Básica, Medios de Cultivo (5 unidades), Manual de Laboratorio',
    450.00,
    'preparando',
    'TRACK-001-2024',
    'Cliente solicita entrega en horario de oficina'
FROM clientes c 
WHERE c.email = 'maria.garcia@email.com'
AND NOT EXISTS (SELECT 1 FROM pedidos WHERE codigo_seguimiento = 'ABC123XY');
