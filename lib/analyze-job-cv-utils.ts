import { generateJobCVAnalysisPrompt } from "@/lib/promts/job-promt"
import {
  JobCVAnalysisInput,
  JobCVAnalysisResponse,
} from "@/type"
import { GoogleGenAI } from "@google/genai"

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function validateJobCVAnalysisResponse(analysis: any): void {
  const requiredFields = [
    "matchScore",
    "overallScore",
    "scoreGrade",
    "scores",
    "matching",
    "feedback",
    "recommendations",
    "improvements",
    "detailedAnalysis",
    "summary",
    "estimatedInterviewChance",
  ]

  for (const field of requiredFields) {
    if (!(field in analysis)) {
      throw new Error(`Campo requerido faltante: ${field}`)
    }
  }

  if (
    analysis.matchScore < 0 ||
    analysis.matchScore > 100 ||
    analysis.overallScore < 0 ||
    analysis.overallScore > 100
  ) {
    throw new Error("Scores fuera del rango válido")
  }

  if (!analysis.recommendations.hasOwnProperty("shouldApply")) {
    throw new Error("Falta campo shouldApply")
  }
}

export async function analyzeJobCVComparison(
  input: JobCVAnalysisInput,
  maxRetries: number = 3
): Promise<JobCVAnalysisResponse> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error(
      "Falta GEMINI_API_KEY en variables de entorno"
    )
  }

  const ai = new GoogleGenAI({
    apiKey,
  })

  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Analizando CV vs Job - Intento ${attempt}/${maxRetries}`
      )

      const prompt = generateJobCVAnalysisPrompt(input)
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ text: prompt }],
      })
      const responseText = response.text?.toString().trim()

      if (!responseText) {
        throw new Error("Respuesta vacía de Gemini")
      }

      // Limpiar respuesta
      let cleanedResponse = responseText.trim()
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, "")
      cleanedResponse = cleanedResponse.replace(/```\n?/g, "")
      cleanedResponse = cleanedResponse.trim()

      // Parsear JSON
      const analysis: JobCVAnalysisResponse = JSON.parse(cleanedResponse)

      // Validar respuesta
      validateJobCVAnalysisResponse(analysis)

      console.log("Análisis CV vs Job completado exitosamente")
      return analysis
    } catch (error: any) {
      lastError = error
      console.error(`Error en intento ${attempt}:`, error.message)

      if (attempt === maxRetries) break

      if (error.message?.includes("API key")) {
        throw new Error("Error de autenticación con Google AI")
      }

      const waitTime = Math.pow(2, attempt) * 1000
      console.log(`Reintentando en ${waitTime / 1000}s...`)
      await sleep(waitTime)
    }
  }

  throw new Error(
    `Error al analizar CV vs Job después de ${maxRetries} intentos: ${lastError?.message}`
  )
}
