import { NextResponse } from "next/server"
import { generateCVAnalysisPrompt } from "@/lib/promts/analyze-promt"
import { GoogleGenAI } from "@google/genai"
import type { CVAnalysisInput, CVAnalysisResponse } from "@/type"

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function validateAnalysisResponse(analysis: any): void {
  if (!analysis || typeof analysis !== "object") {
    throw new Error("Respuesta no es un objeto válido")
  }

  const requiredFields = [
    "overallScore",
    "scoreGrade",
    "scores",
    "feedback",
    "detectedSkills",
    "missingKeywords",
    "summary",
    "topPriorities",
  ]

  for (const field of requiredFields) {
    if (!(field in analysis)) {
      throw new Error(`Campo requerido faltante: ${field}`)
    }
  }

  if (
    typeof analysis.overallScore !== "number" ||
    analysis.overallScore < 0 ||
    analysis.overallScore > 100
  ) {
    throw new Error("overallScore inválido")
  }

  const scoreFields = [
    "experienceScore",
    "educationScore",
    "skillsScore",
    "formatScore",
    "keywordsScore",
    "atsScore",
  ]

  for (const scoreField of scoreFields) {
    const score = analysis.scores[scoreField]
    if (typeof score !== "number" || score < 0 || score > 100) {
      throw new Error(`${scoreField} inválido`)
    }
  }

  if (
    !Array.isArray(analysis.feedback.strengths) ||
    !Array.isArray(analysis.feedback.weaknesses) ||
    !Array.isArray(analysis.feedback.suggestions)
  ) {
    throw new Error("Formato de feedback inválido")
  }

  if (!Array.isArray(analysis.detectedSkills)) {
    throw new Error("detectedSkills debe ser un array")
  }

  if (!Array.isArray(analysis.missingKeywords)) {
    throw new Error("missingKeywords debe ser un array")
  }

  if (!Array.isArray(analysis.topPriorities)) {
    throw new Error("topPriorities debe ser un array")
  }

  if (!["A", "B", "C", "D", "F"].includes(analysis.scoreGrade)) {
    throw new Error("scoreGrade debe ser A, B, C, D o F")
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CVAnalysisInput

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: "API key de Gemini no configurada" },
        { status: 500 }
      )
    }

    if (!body.cvBase64 || !body.cvMimeType) {
      return NextResponse.json(
        { message: "No se recibió un archivo válido para analizar" },
        { status: 400 }
      )
    }

    const ai = new GoogleGenAI({ apiKey })

    const prompt = generateCVAnalysisPrompt({
      targetIndustry: body.targetIndustry,
      targetJobTitle: body.targetJobTitle,
      experienceLevel: body.experienceLevel,
      cvText: body.cvText || "El CV se adjunta como archivo.",
    })

    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: body.cvMimeType,
          data: body.cvBase64,
        },
      },
    ]

    let lastError: Error | null = null
    const maxRetries = 3

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
        })

        const responseText = response.text?.toString().trim()
        if (!responseText) {
          throw new Error("Respuesta vacía de Gemini")
        }

        let cleanedResponse = responseText.trim()
        cleanedResponse = cleanedResponse.replace(/```json\n?/g, "")
        cleanedResponse = cleanedResponse.replace(/```\n?/g, "")
        cleanedResponse = cleanedResponse.trim()

        const analysis: CVAnalysisResponse = JSON.parse(cleanedResponse)
        validateAnalysisResponse(analysis)

        return NextResponse.json(analysis)
      } catch (error: any) {
        lastError = error

        if (error.message?.includes("API key") || error.message?.includes("authentication")) {
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
      { message: `Error al analizar CV después de ${maxRetries} intentos: ${lastError?.message}` },
      { status: 500 }
    )
  } catch (error) {
    console.error("Error en análisis de CV:", error)
    return NextResponse.json(
      { message: "Error interno al analizar el CV" },
      { status: 500 }
    )
  }
}
