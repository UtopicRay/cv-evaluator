import { generateCVAnalysisPrompt } from "@/lib/promts/analyze-promt";
import { CVAnalysisInput, CVAnalysisResponse } from "@/type";
import { GoogleGenAI } from "@google/genai";

export default function UseAnalizeDocument() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey,
  });

  async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function analyzeCVWithAI(
    input: CVAnalysisInput,
    maxRetries: number = 3
  ): Promise<CVAnalysisResponse> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Intento ${attempt} de ${maxRetries} para analizar CV`);

        if (!apiKey) {
          throw new Error("Falta NEXT_PUBLIC_GEMINI_API_KEY en variables de entorno");
        }

        if (!input.cvBase64 || !input.cvMimeType) {
          throw new Error("No se recibió un archivo válido para analizar");
        }

        const prompt = generateCVAnalysisPrompt({
          targetIndustry: input.targetIndustry,
          targetJobTitle: input.targetJobTitle,
          experienceLevel: input.experienceLevel,
          cvText: input.cvText || "El CV se adjunta como archivo.",
        });
        const contents = [
          { text: prompt },
          {
            inlineData: {
              mimeType: input.cvMimeType,
              data: input.cvBase64,
            },
          },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
        });

        const responseText = response.text?.toString().trim();
        if (!responseText) {
          throw new Error("Respuesta vacía de Gemini");
        }

        // Limpiar respuesta
        let cleanedResponse = responseText.trim();
        cleanedResponse = cleanedResponse.replace(/```json\n?/g, "");
        cleanedResponse = cleanedResponse.replace(/```\n?/g, "");
        cleanedResponse = cleanedResponse.trim();

        // Parsear JSON
        const analysis: CVAnalysisResponse = JSON.parse(cleanedResponse);

        // Validaciones
        validateAnalysisResponse(analysis);

        console.log("Análisis completado exitosamente");
        return analysis;
      } catch (error: any) {
        lastError = error;
        console.error(`Error en intento ${attempt}:`, error.message);

        // Si es el último intento, lanzar el error
        if (attempt === maxRetries) {
          break;
        }

        // Errores que no vale la pena reintentar
        if (
          error.message?.includes("API key") ||
          error.message?.includes("authentication")
        ) {
          throw new Error(
            "Error de autenticación con Google AI. Verifica tu API key."
          );
        }

        // Esperar antes de reintentar (backoff exponencial)
        const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`Reintentando en ${waitTime / 1000} segundos...`);
        await sleep(waitTime);
      }
    }

    // Si llegamos aquí, todos los intentos fallaron
    throw new Error(
      `Error al analizar CV después de ${maxRetries} intentos: ${lastError?.message}`
    );
  }

  function validateAnalysisResponse(analysis: any): void {
    // Validar estructura básica
    if (!analysis || typeof analysis !== "object") {
      throw new Error("Respuesta no es un objeto válido");
    }

    // Validar campos requeridos
    const requiredFields = [
      "overallScore",
      "scoreGrade",
      "scores",
      "feedback",
      "detectedSkills",
      "missingKeywords",
      "summary",
      "topPriorities",
    ];

    for (const field of requiredFields) {
      if (!(field in analysis)) {
        throw new Error(`Campo requerido faltante: ${field}`);
      }
    }

    // Validar scores
    if (
      typeof analysis.overallScore !== "number" ||
      analysis.overallScore < 0 ||
      analysis.overallScore > 100
    ) {
      throw new Error("overallScore inválido");
    }

    // Validar scores individuales
    const scoreFields = [
      "experienceScore",
      "educationScore",
      "skillsScore",
      "formatScore",
      "keywordsScore",
      "atsScore",
    ];

    for (const scoreField of scoreFields) {
      const score = analysis.scores[scoreField];
      if (typeof score !== "number" || score < 0 || score > 100) {
        throw new Error(`${scoreField} inválido`);
      }
    }

    // Validar feedback
    if (
      !Array.isArray(analysis.feedback.strengths) ||
      !Array.isArray(analysis.feedback.weaknesses) ||
      !Array.isArray(analysis.feedback.suggestions)
    ) {
      throw new Error("Formato de feedback inválido");
    }

    // Validar arrays
    if (!Array.isArray(analysis.detectedSkills)) {
      throw new Error("detectedSkills debe ser un array");
    }

    if (!Array.isArray(analysis.missingKeywords)) {
      throw new Error("missingKeywords debe ser un array");
    }

    if (!Array.isArray(analysis.topPriorities)) {
      throw new Error("topPriorities debe ser un array");
    }

    // Validar scoreGrade
    if (!["A", "B", "C", "D", "F"].includes(analysis.scoreGrade)) {
      throw new Error("scoreGrade debe ser A, B, C, D o F");
    }
  }
  return { analyzeCVWithAI };
}
