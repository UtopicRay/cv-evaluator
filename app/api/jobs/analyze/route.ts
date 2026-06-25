import { NextResponse } from "next/server"
import { generateJobCVAnalysisPrompt } from "@/lib/promts/job-promt"
import { GoogleGenAI } from "@google/genai"
import type { JobCVAnalysisInput, JobCVAnalysisResponse } from "@/type"

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as JobCVAnalysisInput

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: "API key de Gemini no configurada" },
        { status: 500 }
      )
    }

    const ai = new GoogleGenAI({ apiKey })

    let lastError: Error | null = null
    const maxRetries = 3

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const prompt = generateJobCVAnalysisPrompt(body)
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ text: prompt }],
        })

        const responseText = response.text?.toString().trim()
        if (!responseText) {
          throw new Error("Respuesta vacía de Gemini")
        }

        let cleanedResponse = responseText.trim()
        cleanedResponse = cleanedResponse.replace(/```json\n?/g, "")
        cleanedResponse = cleanedResponse.replace(/```\n?/g, "")
        cleanedResponse = cleanedResponse.trim()

        const analysis: JobCVAnalysisResponse = JSON.parse(cleanedResponse)
        validateJobCVAnalysisResponse(analysis)

        return NextResponse.json(analysis)
      } catch (error: any) {
        lastError = error

        if (error.message?.includes("API key")) {
          return NextResponse.json(
            { message: "Error de autenticación con Google AI" },
            { status: 500 }
          )
        }

        if (attempt === maxRetries) break

        const waitTime = Math.pow(2, attempt) * 1000
        await sleep(waitTime)
      }
    }

    return NextResponse.json(
      { message: `Error al analizar CV vs Job después de ${maxRetries} intentos: ${lastError?.message}` },
      { status: 500 }
    )
  } catch (error) {
    console.error("Error en análisis CV vs Job:", error)
    return NextResponse.json(
      { message: "Error interno al analizar CV vs Job" },
      { status: 500 }
    )
  }
}
