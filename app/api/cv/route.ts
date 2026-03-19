import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

const sectionTypeMap: Record<string, string> = {
  CONTACT: "CONTACT",
  SUMMARY: "SUMMARY",
  EXPERIENCE: "EXPERIENCE",
  EDUCATION: "EDUCATION",
  SKILLS: "SKILLS",
  CERTIFICATIONS: "CERTIFICATIONS",
  LANGUAGES: "LANGUAGES",
  PROJECTS: "PROJECTS",
  OTHER: "OTHER",
}

function normalizeSectionType(type: string | undefined) {
  if (!type) return "OTHER"
  const key = type.toUpperCase()
  return sectionTypeMap[key] ?? "OTHER"
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      userId,
      fileName,
      originalName,
      fileSize,
      fileUrl,
      mimeType,
      rawText,
      analysis,
    } = body

    if (!userId || !fileName || !originalName || !fileSize || !fileUrl || !mimeType) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 },
      )
    }

    if (!analysis || !analysis.scores || !analysis.feedback) {
      return NextResponse.json(
        { message: "El análisis es inválido" },
        { status: 400 },
      )
    }

    const cv = await prisma.cV.create({
      data: {
        userId,
        fileName,
        originalName,
        fileSize,
        fileUrl,
        mimeType,
        rawText: rawText || "",
        overallScore: analysis.overallScore,
        scoreGrade: analysis.scoreGrade,
        status: "COMPLETED",
        analyzedAt: new Date(),
      },
    })

    await prisma.cVAnalysis.create({
      data: {
        cvId: cv.id,
        experienceScore: analysis.scores.experienceScore,
        educationScore: analysis.scores.educationScore,
        skillsScore: analysis.scores.skillsScore,
        formatScore: analysis.scores.formatScore,
        keywordsScore: analysis.scores.keywordsScore,
        atsScore: analysis.scores.atsScore,
        strengths: analysis.feedback.strengths,
        weaknesses: analysis.feedback.weaknesses,
        suggestions: analysis.feedback.suggestions,
        detectedSkills: analysis.detectedSkills,
        missingKeywords: analysis.missingKeywords,
        aiModel: analysis.aiModel || "gemini-2.5-flash",
        tokensUsed: analysis.tokensUsed,
        analysisTime: analysis.analysisTime,
      },
    })

    if (Array.isArray(analysis.sections) && analysis.sections.length > 0) {
      await prisma.cVSection.createMany({
        data: analysis.sections.map((section: any, index: number) => ({
          cvId: cv.id,
          type: normalizeSectionType(section.type),
          title: section.title || null,
          content: section.content || "",
          order: index,
          metadata: {
            score: section.score,
            feedback: section.feedback,
          },
        })),
      })
    }

    return NextResponse.json({ id: cv.id }, { status: 201 })
  } catch (error) {
    console.error("Error al guardar el CV:", error)
    return NextResponse.json(
      { message: "Error interno al guardar el CV" },
      { status: 500 },
    )
  }
}
