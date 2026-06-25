import { CVAnalysisInput, CVAnalysisResponse, JobCVAnalysisInput, JobCVAnalysisResponse } from "@/type"

export default function UseAnalizeDocument() {
  async function analyzeCVWithAI(
    input: CVAnalysisInput,
    maxRetries: number = 3
  ): Promise<CVAnalysisResponse> {
    const response = await fetch("/api/cv/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Error al analizar el CV")
    }

    return data as CVAnalysisResponse
  }

  async function analyzeCVvsJob(
    input: JobCVAnalysisInput,
    maxRetries: number = 3
  ): Promise<JobCVAnalysisResponse> {
    const response = await fetch("/api/jobs/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Error al analizar CV vs Job")
    }

    return data as JobCVAnalysisResponse
  }

  return { analyzeCVWithAI, analyzeCVvsJob }
}
