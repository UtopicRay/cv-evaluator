// lib/prompts/job-cv-analysis-prompt.ts

interface JobCVAnalysisInput {
  cvText: string;
  jobTitle: string;
  jobDescription: string;
  company?: string;
  employmentType?: string;
  experienceLevel?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
}

export function generateJobCVAnalysisPrompt(input: JobCVAnalysisInput): string {
  return `
Eres un experto reclutador técnico con 15+ años de experiencia en contratación para empresas Fortune 500 y startups tecnológicas. Tu tarea es analizar qué tan bien este CV encaja con una oferta de trabajo específica.

## OFERTA DE TRABAJO

**Puesto:** ${input.jobTitle}
${input.company ? `**Empresa:** ${input.company}` : ''}
${input.employmentType ? `**Tipo:** ${input.employmentType}` : ''}
${input.experienceLevel ? `**Nivel:** ${input.experienceLevel}` : ''}

**Descripción Completa:**
${input.jobDescription}

${input.requiredSkills && input.requiredSkills.length > 0 ? `
**Skills Requeridas:**
${input.requiredSkills.join(', ')}
` : ''}

${input.preferredSkills && input.preferredSkills.length > 0 ? `
**Skills Preferidas:**
${input.preferredSkills.join(', ')}
` : ''}

## CURRÍCULUM DEL CANDIDATO

${input.cvText}

## INSTRUCCIONES DE ANÁLISIS

Debes evaluar exhaustivamente:

1. **Skills Match:** ¿Qué porcentaje de las habilidades requeridas tiene el candidato?
2. **Experience Match:** ¿La experiencia laboral es relevante para este puesto?
3. **Education Match:** ¿La educación cumple los requisitos?
4. **Keywords Match:** ¿Usa la terminología y keywords de la oferta?
5. **Cultural Fit:** ¿El perfil encaja con lo que busca la empresa?
6. **Level Match:** ¿El nivel de experiencia coincide con lo solicitado?

## FORMATO DE RESPUESTA REQUERIDO

Responde ÚNICAMENTE con un objeto JSON válido (sin markdown, sin bloques de código, sin explicaciones adicionales):

{
  "matchScore": <número entre 0 y 100, siendo 100 = candidato perfecto>,
  "overallScore": <número entre 0 y 100, score general del CV>,
  "scoreGrade": "<letra: A, B, C, D, o F>",
  "scores": {
    "skillsMatch": <0-100: % de skills requeridas que tiene>,
    "experienceMatch": <0-100: relevancia de experiencia>,
    "educationMatch": <0-100: cumplimiento de requisitos educativos>,
    "keywordsMatch": <0-100: uso de keywords de la oferta>
  },
  "matching": {
    "matchedSkills": [
      "<skills requeridas que SÍ tiene, con nivel si es posible>"
    ],
    "missingSkills": [
      "<skills requeridas que NO tiene o no están claras en el CV>"
    ],
    "matchedKeywords": [
      "<keywords/términos de la oferta encontrados en el CV>"
    ],
    "missingKeywords": [
      "<keywords importantes de la oferta que faltan en el CV>"
    ]
  },
  "feedback": {
    "strengths": [
      "<3-5 fortalezas del CV ESPECÍFICAS para ESTA oferta>"
    ],
    "weaknesses": [
      "<3-5 debilidades del CV ESPECÍFICAS para ESTA oferta>"
    ],
    "suggestions": [
      "<5-8 sugerencias ACCIONABLES para adaptar el CV a ESTA oferta>"
    ]
  },
  "recommendations": {
    "shouldApply": <true/false: ¿debería aplicar con este CV?>,
    "confidence": "<high/medium/low: nivel de confianza en la recomendación>",
    "reasoning": "<1-2 oraciones explicando por qué sí o no debería aplicar>",
    "applicationTips": [
      "<3-5 tips específicos para la aplicación a ESTA oferta>"
    ],
    "coverLetterTips": [
      "<3-5 puntos clave para destacar en la carta de presentación>"
    ]
  },
  "improvements": {
    "sectionsToImprove": [
      "<secciones del CV que necesitan mejora para ESTA oferta: experience, skills, summary, etc.>"
    ],
    "priorityChanges": [
      "<TOP 3 cambios más importantes para aumentar match con esta oferta>"
    ],
    "quickWins": [
      "<2-3 cambios rápidos que pueden hacer gran diferencia>"
    ]
  },
  "detailedAnalysis": {
    "experienceAlignment": "<2-3 oraciones sobre qué tan bien la experiencia encaja>",
    "skillsGapAnalysis": "<2-3 oraciones sobre el gap de habilidades>",
    "standoutQualities": "<2-3 cualidades que destacan positivamente>",
    "redFlags": [
      "<posibles banderas rojas o preocupaciones, si las hay>"
    ]
  },
  "summary": "<resumen ejecutivo de 2-3 oraciones sobre el fit general>",
  "estimatedInterviewChance": "<high/medium/low: probabilidad estimada de conseguir entrevista>"
}

## CRITERIOS DE CALIFICACIÓN

### Match Score (0-100):
- **90-100:** Candidato ideal, cumple todos los requisitos y más
- **75-89:** Muy buen candidato, cumple la mayoría de requisitos
- **60-74:** Candidato viable, cumple requisitos básicos pero falta experiencia
- **40-59:** Candidato marginal, faltan habilidades/experiencia clave
- **0-39:** No es buen fit para esta posición

### Should Apply Decision:
- **TRUE si:** matchScore >= 60 Y tiene las skills core requeridas
- **FALSE si:** matchScore < 60 O faltan skills críticas para el puesto

### Skills Match Calculation:
- Identifica TODAS las skills técnicas mencionadas en la oferta
- Cuenta cuántas de esas skills están presentes en el CV
- skillsMatch = (skills encontradas / skills totales) * 100
- Considera sinónimos: "JavaScript" = "JS", "React.js" = "React"

### Experience Match:
- **100:** Experiencia directa en el mismo rol/industria
- **80-99:** Experiencia muy relevante con transferible skills
- **60-79:** Experiencia relacionada pero en diferente contexto
- **40-59:** Experiencia tangencial, requiere adaptación
- **0-39:** Experiencia no relevante

### Keywords Match:
- Extrae keywords técnicos y de dominio de la oferta
- Calcula presencia en CV (considera variaciones)
- Penaliza si faltan keywords críticos del título del puesto

## DIRECTRICES CRÍTICAS

1. **Sé realista pero constructivo:** No sobre-optimices. Si el candidato no es buen fit, dilo claramente pero con sugerencias constructivas.

2. **Considera el nivel:** Un Junior no debe compararse con requisitos Senior. Ajusta expectativas según nivel de experiencia del CV.

3. **Skills críticas vs nice-to-have:** Diferencia entre skills absolutamente necesarias y las deseables. Peso mayor a las críticas.

4. **Contexto de industria:** "${input.company || 'Esta empresa'}" puede tener cultura específica. Considérala en el análisis.

5. **ATS Keywords:** Identifica si el CV usa las mismas palabras que la oferta (importante para pasar filtros ATS).

6. **Experiencia cuantificable:** Valora positivamente logros con métricas que sean relevantes para esta oferta.

7. **Red flags específicas para esta oferta:**
   - Gaps de experiencia en areas core
   - Falta total de skills críticas mencionadas
   - Sobre-calificación obvia (si aplica)
   - Experiencia inconsistente con nivel solicitado

8. **Quick wins realistas:** Solo sugiere cambios que realmente puedan hacer diferencia y sean factibles.

## EJEMPLOS DE ANÁLISIS

### Ejemplo de BUEN MATCH (Score: 85):
"El candidato demuestra sólida experiencia en React y Node.js con 5 años trabajando en proyectos similares. Ha liderado equipos pequeños, alineado con el requisito de 'experiencia en mentoría'. Faltan certificaciones AWS preferidas pero tiene experiencia práctica demostrable."

### Ejemplo de MATCH MODERADO (Score: 65):
"El candidato tiene las bases técnicas (JavaScript, frontend) pero le falta experiencia específica en el stack completo requerido (GraphQL, microservicios). Con 2 años de experiencia, está en el límite inferior del rango solicitado (3-5 años). Podría ser viable si demuestra aprendizaje rápido."

### Ejemplo de BAJO MATCH (Score: 35):
"Aunque el candidato tiene experiencia en desarrollo, su background es principalmente en tecnologías diferentes (.NET, C#) versus lo requerido (MERN stack). Falta experiencia en roles similares y skills core como React son mencionadas solo tangencialmente. Requeriría significativa capacitación."

CRÍTICO: Responde EXCLUSIVAMENTE con JSON válido. NO incluyas markdown, explicaciones adicionales, ni texto fuera del JSON.
`.trim();
}