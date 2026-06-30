# CVScore - Editorial Intelligence

**Evalúa y mejora tu currículum en minutos con inteligencia artificial.**

![CVScore Dashboard - Análisis de CV](https://github.com/user-attachments/assets/dashboard-preview)

---

## Descripción

CVScore es una plataforma de análisis de CV impulsada por inteligencia artificial que permite a los usuarios subir sus currículums, recibir evaluaciones detalladas y compararlos contra descripciones de empleo para determinar la compatibilidad. El sistema utiliza **Google Gemini AI** para realizar análisis profundos de 7 dimensiones y generar recomendaciones personalizadas.

### Análisis de CV

![Análisis de CV - Match Score](https://github.com/user-attachments/assets/match-score)

El sistema evalúa los CV en múltiples categorías:

| Categoría | Descripción |
|-----------|-------------|
| **Skills Match** | Coincidencia de habilidades técnicas y blandas |
| **Experience Match** | Alineación de experiencia laboral con el puesto |
| **Education Match** | Nivel educativo requerido vs. el del candidato |
| **Keywords Match** | Presencia de palabras clave relevantes para ATS |

---

## Características Principales

### Análisis de CV Individual
- Puntuación general (0-100) con calificación A-F
- Desglose por secciones: experiencia, educación, habilidades, formato, palabras clave, compatibilidad ATS
- Fortalezas y debilidades identificadas por IA
- Recomendaciones personalizadas para mejora
- Palabras clave detectadas vs. faltantes

### Análisis de Compatibilidad con Empleos
- Score de compatibilidad con cada oferta de empleo
- Análisis de skills, experiencia, educación y keywords
- Recomendación de aplicación: "Deberías aplicar" / "No recomendado"
- Tips para carta de presentación
- Prioridades de mejora antes de aplicar

### Gestión de Empleos
- Crear y gestionar ofertas de empleo
- Seleccionar CV base para cada análisis
- Re-analizar con diferentes CVs
- Estados: Active, Applied, Archived, Closed

### Dashboard
- Estadísticas de CVs analizados
- Score promedio de match
- Mejor coincidencia de empleo
- Actividad reciente
- Insights de IA

---

## Flujo de Uso

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  1. SUBIR   │───▶│ 2. ANÁLISIS │───▶│  3. VER     │
│     CV      │    │     IA      │    │  RESULTADOS │
└─────────────┘    └─────────────┘    └─────────────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │ 4. COMPARAR │
                                   │ CON EMPLEO  │
                                   └─────────────┘
```

---

## Tecnologías

| Capa | Tecnología |
|------|------------|
| **Framework** | Next.js 15 (App Router) |
| **UI** | React 19, Tailwind CSS 4, shadcn/ui |
| **Base de Datos** | PostgreSQL + Prisma ORM |
| **Autenticación** | NextAuth.js con Prisma Adapter |
| **IA** | Google Gemini (gemini-2.5-flash) |
| **Almacenamiento** | Supabase Storage |
| **Formularios** | React Hook Form + Zod |
| **Gráficos** | Recharts |

---

## Instalación

### Prerrequisitos

- Node.js (LTS moderno)
- npm
- Base de datos PostgreSQL (ej. Supabase)
- Proyecto Supabase con bucket de almacenamiento "Cvs"
- API Key de Google Gemini

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/cv-evaluator.git
cd cv-evaluator

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar servidor de desarrollo
npm run dev
```

---

## Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `DATABASE_URL` | URL de conexión a PostgreSQL (pool) | Sí |
| `DIRECT_DATABASE_URL` | Conexión directa a PostgreSQL | Sí |
| `NEXTAUTH_URL` | URL base de la aplicación | Sí |
| `NEXTAUTH_SECRET` | Secreto para cifrado de sesiones | Sí |
| `GEMINI_API_KEY` | API Key de Google Gemini | Sí |
| `SUPABASE_URL` | URL del proyecto Supabase | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública de Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase | Sí |

---

## Estructura del Proyecto

```
cv-evaluator/
├── app/
│   ├── api/
│   │   ├── auth/          # Autenticación (register, login, nextauth)
│   │   ├── cv/            # CRUD de CVs + análisis IA
│   │   ├── jobs/          # CRUD de empleos + análisis de matching
│   │   └── upload/        # Subida de archivos a Supabase
│   ├── dashboard/         # Páginas del dashboard
│   │   ├── cv/            # Lista y detalle de CVs
│   │   ├── jobs/          # Lista y detalle de empleos
│   │   ├── upload/        # Asistente de subida de CV
│   │   └── settings/      # Configuración de cuenta
│   ├── login/             # Inicio de sesión
│   └── register/          # Registro
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   ├── cv/                # Componentes de análisis de CV
│   ├── jobs/              # Componentes de análisis de empleos
│   └── forms/             # Formularios
├── lib/
│   ├── prisma.ts          # Cliente Prisma singleton
│   ├── supabase.ts        # Cliente Supabase
│   ├── promts/            # Plantillas de prompts para IA
│   └── pdf/               # Extracción de texto de PDF
├── hooks/                 # Hooks personalizados de React
├── context/               # Contexto de usuario
├── prisma/
│   └── schema.prisma      # Esquema de base de datos
├── const/                 # Constantes compartidas
└── type/                  # Definiciones de tipos
```

---

## Modelo de Base de Datos

```
User ──┬── CV ──── CVAnalysis
       │    └──── CVSection
       │
       ├── Job ──── JobCVAnalysis
       │
       ├── Account (NextAuth)
       └── Session (NextAuth)
```

### Modelos Principales

- **User**: Usuarios registrados
- **CV**: CVs subidos con metadatos y puntuaciones
- **CVAnalysis**: Resultados del análisis IA (7 dimensiones)
- **CVSection**: Secciones parseadas del CV con feedback por sección
- **Job**: Ofertas de empleo para comparación
- **JobCVAnalysis**: Análisis de compatibilidad CV vs. Empleo

---

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/upload` | Subir archivo CV a Supabase |
| POST | `/api/cv/analyze` | Analizar CV con Gemini AI |
| POST | `/api/cv` | Guardar CV y resultados |
| GET | `/api/cv` | Listar CVs del usuario |
| DELETE | `/api/cv/[id]` | Eliminar CV |
| POST | `/api/jobs/analyze` | Analizar compatibilidad CV-Empleo |
| POST | `/api/jobs` | Crear/actualizar empleo |
| DELETE | `/api/jobs/[id]` | Eliminar empleo |

---

## Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Iniciar servidor de producción
npm run lint         # Verificar código con ESLint
npx tsc --noEmit     # Verificar tipos TypeScript
```

---

## Licencia

Proyecto privado. Todos los derechos reservados.
