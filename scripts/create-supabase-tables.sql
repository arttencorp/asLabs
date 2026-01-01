-- Crear tabla de clientes
CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefono TEXT,
    direccion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS public.pedidos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    numero_pedido TEXT NOT NULL UNIQUE,
    codigo_seguimiento TEXT NOT NULL UNIQUE,
    cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE RESTRICT,
    productos TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total > 0),
    estado TEXT NOT NULL DEFAULT 'recibido',
    codigo_rastreo TEXT,
    fecha_pedido TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notas TEXT
);

-- Crear tabla de historial de estados
CREATE TABLE IF NOT EXISTS public.historial_estados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID NOT NULL REFERENCES public.pedidos(id) ON DELETE CASCADE,
    estado_anterior TEXT,
    estado_nuevo TEXT NOT NULL,
    comentario TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_clientes_email ON public.clientes(email);
CREATE INDEX IF NOT EXISTS idx_pedidos_codigo_seguimiento ON public.pedidos(codigo_seguimiento);
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente_id ON public.pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_fecha_pedido ON public.pedidos(fecha_pedido);
CREATE INDEX IF NOT EXISTS idx_historial_pedido_id ON public.historial_estados(pedido_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historial_estados ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad (permitir todas las operaciones por ahora)
CREATE POLICY "Allow all operations on clientes" ON public.clientes
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on pedidos" ON public.pedidos
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on historial_estados" ON public.historial_estados
    FOR ALL USING (true) WITH CHECK (true);

-- Insertar datos de prueba
INSERT INTO public.clientes (nombres, apellidos, email, telefono, direccion) 
VALUES (
    'María Elena',
    'García López',
    'maria.garcia@email.com',
    '+51 987 654 321',
    'Av. Universitaria 1801, San Martín de Porres, Lima'
) ON CONFLICT (email) DO NOTHING;

-- Obtener el ID del cliente insertado para crear el pedido
DO $$
DECLARE
    cliente_id_var UUID;
BEGIN
    SELECT id INTO cliente_id_var FROM public.clientes WHERE email = 'maria.garcia@email.com';
    
    IF cliente_id_var IS NOT NULL THEN
        INSERT INTO public.pedidos (
            numero_pedido,
            codigo_seguimiento,
            cliente_id,
            productos,
            total,
            estado,
            codigo_rastreo,
            notas
        ) VALUES (
            'PED-' || EXTRACT(EPOCH FROM NOW())::BIGINT,
            'ABC123XY',
            cliente_id_var,
            'Kit Microbiología Básica, Medios de Cultivo (5 unidades), Manual de Laboratorio',
            450.00,
            'preparando',
            'TRACK-001-2024',
            'Cliente solicita entrega en horario de oficina'
        ) ON CONFLICT (codigo_seguimiento) DO NOTHING;
    END IF;
END $$;
