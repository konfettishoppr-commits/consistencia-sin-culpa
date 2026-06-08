# Consistencia sin Culpa — Guía de instalación

## Paso 1 — Configura Supabase

1. Ve a supabase.com y abre tu proyecto
2. Clic en "SQL Editor" en el menú izquierdo
3. Copia TODO el contenido del archivo `SUPABASE_SCHEMA.sql`
4. Pégalo en el editor y clic en "Run"
5. Ve a "Settings" > "API"
6. Copia estos dos valores y guárdalos en Notas:
   - `Project URL` → es tu SUPABASE_URL
   - `anon public` key → es tu SUPABASE_ANON_KEY

## Paso 2 — Sube el proyecto a GitHub

1. Ve a github.com
2. Clic en "+" arriba a la derecha > "New repository"
3. Nombre: `consistencia-sin-culpa`
4. Clic en "Create repository"
5. En la página del repo vacío, clic en "uploading an existing file"
6. Arrastra TODOS los archivos de esta carpeta
7. Clic en "Commit changes"

## Paso 3 — Despliega en Vercel

1. Ve a vercel.com
2. Clic en "Add New Project"
3. Selecciona el repo `consistencia-sin-culpa`
4. Antes de hacer deploy, clic en "Environment Variables"
5. Agrega estas variables una por una:

   NEXT_PUBLIC_SUPABASE_URL = (tu Project URL de Supabase)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (tu anon key de Supabase)
   RESEND_API_KEY = (tu key de Resend que empieza con re_)
   USER_EMAIL = konfettishoppr@gmail.com

6. Clic en "Deploy"
7. Espera 2 minutos — ¡tu app está lista!

## Paso 4 — Instala en tu iPhone

1. Abre Safari en tu iPhone
2. Ve a tu URL de Vercel (ej: consistencia-sin-culpa.vercel.app)
3. Toca el botón de compartir (cuadrado con flecha hacia arriba)
4. Toca "Agregar a pantalla de inicio"
5. Nombre: "Consistencia" > Agregar

¡Listo! Ya tienes tu app instalada como una app nativa.

## Recordatorios por email

Los recordatorios se envían automáticamente a konfettishoppr@gmail.com.
Los horarios son: 7:00 AM, 8:00 AM, 6:00 PM, 7:00 PM, 9:30 PM (hora de Puerto Rico).

Para configurar los recordatorios automáticos, ve a Vercel > tu proyecto > 
"Cron Jobs" y agrega:
- `0 11 * * *` → /api/reminders (7 AM PR = 11 UTC)
- `0 12 * * *` → /api/reminders (8 AM PR = 12 UTC)  
- `0 22 * * *` → /api/reminders (6 PM PR = 22 UTC)
- `0 23 * * *` → /api/reminders (7 PM PR = 23 UTC)
- `30 1 * * *` → /api/reminders (9:30 PM PR = 1:30 UTC)
