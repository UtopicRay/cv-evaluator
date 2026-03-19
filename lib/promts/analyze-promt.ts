import { CVAnalysisInput } from "@/type";

export function generateCVAnalysisPrompt(input: CVAnalysisInput): string {
  return `
Eres un experto en reclutamiento y optimización de currículums con más de 15 años de experiencia. Tu tarea es analizar el siguiente CV y proporcionar un análisis detallado y constructivo.

## INFORMACIÓN DEL CONTEXTO

**Puesto Objetivo:** ${input.targetJobTitle}
**Industria/Área:** ${input.targetIndustry}
${input.experienceLevel}

## CONTENIDO DEL CV A ANALIZAR

${input.cvText}

## INSTRUCCIONES DE ANÁLISIS

Analiza exhaustivamente el CV considerando:

1. **Estructura y Formato:** Claridad, organización, legibilidad visual
2. **Contenido de Experiencia Laboral:** Relevancia, logros cuantificables, verbos de acción
3. **Educación:** Completitud, relevancia para el puesto objetivo
4. **Habilidades Técnicas:** Alineación con el puesto, nivel de detalle
5. **Keywords y ATS Compatibility:** Términos clave de la industria, formato para sistemas ATS
6. **Logros y Resultados:** Cuantificación de impacto, uso de métricas
7. **Presentación General:** Longitud apropiada, coherencia, errores

## FORMATO DE RESPUESTA REQUERIDO

Debes responder ÚNICAMENTE con un objeto JSON válido (sin markdown, sin bloques de código, sin explicaciones adicionales) con la siguiente estructura exacta:

{
  "overallScore": <número entre 0 y 100>,
  "scoreGrade": "<letra: A, B, C, D, o F>",
  "scores": {
    "experienceScore": <número entre 0 y 100>,
    "educationScore": <número entre 0 y 100>,
    "skillsScore": <número entre 0 y 100>,
    "formatScore": <número entre 0 y 100>,
    "keywordsScore": <número entre 0 y 100>,
    "atsScore": <número entre 0 y 100>
  },
  "feedback": {
    "strengths": [
      "<mínimo 3, máximo 5 fortalezas específicas y concretas>"
    ],
    "weaknesses": [
      "<mínimo 3, máximo 5 debilidades específicas>"
    ],
    "suggestions": [
      "<mínimo 5, máximo 8 sugerencias accionables y específicas>"
    ]
  },
  "detectedSkills": [
    "<lista de habilidades técnicas encontradas en el CV>"
  ],
  "missingKeywords": [
    "<keywords importantes para ${input.targetJobTitle} en ${input.targetIndustry} que NO están en el CV>"
  ],
  "sections": [
    {
      "type": "<CONTACT | SUMMARY | EXPERIENCE | EDUCATION | SKILLS | CERTIFICATIONS | LANGUAGES | PROJECTS | OTHER>",
      "title": "<título de la sección>",
      "content": "<contenido de la sección>",
      "score": <número entre 0 y 100>,
      "feedback": "<feedback específico para esta sección>"
    }
  ],
  "summary": "<resumen ejecutivo del análisis en 2-3 oraciones>",
  "topPriorities": [
    "<las 3 acciones más importantes que el usuario debe hacer primero>"
  ]
}

## CRITERIOS DE CALIFICACIÓN

### Overall Score (0-100):
- **90-100 (A):** Excelente. CV optimizado, listo para aplicar a posiciones senior
- **80-89 (B):** Muy bueno. Necesita ajustes menores
- **70-79 (C):** Bueno. Necesita mejoras moderadas
- **60-69 (D):** Aceptable. Requiere trabajo significativo
- **0-59 (F):** Necesita reestructuración completa

### Scores por Sección (0-100):

**experienceScore:**
- Relevancia de experiencia para el puesto objetivo
- Uso de verbos de acción y logros cuantificables
- Progresión de carrera clara

**educationScore:**
- Completitud de información educativa
- Relevancia para la industria
- Certificaciones y formación continua

**skillsScore:**
- Alineación con requisitos del puesto
- Balance entre hard skills y soft skills
- Nivel de detalle apropiado

**formatScore:**
- Diseño limpio y profesional
- Longitud apropiada (1-2 páginas idealmente)
- Consistencia en formato

**keywordsScore:**
- Presencia de términos clave de la industria
- Uso de terminología técnica apropiada
- Alineación con descripciones de trabajo típicas

**atsScore:**
- Compatibilidad con sistemas ATS
- Formato de texto plano legible
- Ausencia de elementos problemáticos (tablas complejas, imágenes con texto)

## DIRECTRICES ADICIONALES

1. **Sé específico:** En lugar de "Mejorar la sección de experiencia", di "Agregar métricas cuantificables a los logros, ej: 'Incrementé las ventas en un 25%'"

2. **Sé constructivo:** Balancea crítica con reconocimiento. Cada debilidad debe tener una sugerencia correspondiente.

3. **Contextualiza:** Considera el nivel de experiencia. No esperes lo mismo de un junior que de un senior.

4. **Prioriza:** Las sugerencias deben estar ordenadas por impacto (las más importantes primero).

5. **Industria específica:** Asegúrate que las keywords y sugerencias sean relevantes para ${input.targetIndustry}.

6. **Formato ATS:** Identifica problemas específicos que podrían hacer que el CV sea rechazado por sistemas automáticos.

CRÍTICO: Responde EXCLUSIVAMENTE con el JSON válido. NO incluyas:
- Bloques de código markdown
- Texto explicativo antes o después
- Comentarios dentro del JSON
- Ningún otro formato que no sea JSON puro
`.trim();
}
