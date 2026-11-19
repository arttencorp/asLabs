# Resultados de convocatorias

## Activación en Supabase

1. Abrir el proyecto de AS Laboratorios en Supabase.
2. Ir a **SQL Editor** y ejecutar `migrations/202611190001_convocatoria_resultados.sql`.
3. Confirmar que se creó la tabla `Convocatoria_Resultado`.
4. En **Storage**, confirmar que existe el bucket privado `convocatorias-resultados` con límite de 10 MB y tipo `application/pdf`.

La migración es idempotente para la tabla, el bucket, el índice, el trigger y las políticas incluidas.

## Prueba funcional

1. Iniciar sesión en `/admin/login`.
2. Abrir `/admin/convocatorias`.
3. En un puesto, pulsar el botón verde **Gestionar resultados**.
4. Subir un PDF en una etapa y comprobar que inicialmente está oculto.
5. Activar **Publicado**.
6. Abrir `/trabaja-con-nosotros/resultados` en una ventana privada y verificar que el documento aparece.
7. Ocultarlo y confirmar que deja de ser accesible públicamente.
8. Probar reemplazo y eliminación del PDF.

Los enlaces públicos son firmados y expiran después de 15 minutos. La página genera enlaces nuevos cada vez que se consulta.
