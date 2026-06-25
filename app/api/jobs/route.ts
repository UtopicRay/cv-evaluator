import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { analyzeJobCVComparison } from "@/lib/analyze-job-cv-utils"
import { type JobCVAnalysisInput } from "@/type"
import { CreateJob, UpdateJob } from "@/lib/query"

type CreateJobBody = {
  userId?: string
  title?: string
  description?: string
  position?: string
  company?: string | null
  remote?: boolean
  cvId?: string | null
  experienceLevel?: string | null
  jobId?: string | null
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateJobBody

    const userId = body.userId?.trim()
    const title = body.title?.trim()
    const description = body.description?.trim()
    const position = body.position?.trim()
    const company = body.company?.trim() || null
    const cvId = body.cvId?.trim() || null
    const experienceLevel = body.experienceLevel?.trim() || null
    const jobId = body.jobId?.trim() || null
    const remote = Boolean(body.remote)

    if (!userId || !title || !description || !position) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 },
      )
    }

    if (title.length < 3 || position.length < 2 || description.length < 20) {
      return NextResponse.json(
        { message: "Los campos no cumplen el minimo requerido" },
        { status: 400 },
      )
    }

    if (cvId) {
      const userCv = await prisma.cV.findFirst({
        where: {
          id: cvId,
          userId,
        },
        select: { id: true },
      })

      if (!userCv) {
        return NextResponse.json(
          { message: "El CV seleccionado no existe o no te pertenece" },
          { status: 400 },
        )
      }
    }
    const job = jobId? await UpdateJob({
      title,
      description,
      position,
      company,
      remote,
      cvId,
      experienceLevel,
      jobId,
    }): await CreateJob({
      userId,
      title,
      description,
      position,
      company,
      remote,
      cvId,
      experienceLevel,
    });
 
    // Si hay CV seleccionado, iniciar el análisis automáticamente
    if (cvId) {
      try {
        const cv = await prisma.cV.findFirst({
          where: {
            id: cvId,
            userId,
          },
        })

        if (cv && cv.rawText) {
          const analysisInput: JobCVAnalysisInput = {
            cvText: cv.rawText,
            jobTitle: title,
            jobDescription: description,
            company: company || undefined,
            experienceLevel: experienceLevel || undefined,
          }

          const analysis = await analyzeJobCVComparison(analysisInput)

          const existingAnalysis = await prisma.jobCVAnalysis.findUnique({
            where: {
              jobId_cvId: {
                jobId: job.id,
                cvId,
              },
            },
          })

          const analysisData = {
            jobId: job.id,
            cvId,
            userId,
            matchScore: analysis.matchScore,
            overallScore: analysis.overallScore,
            scoreGrade: analysis.scoreGrade,
            skillsMatch: analysis.scores.skillsMatch,
            experienceMatch: analysis.scores.experienceMatch,
            educationMatch: analysis.scores.educationMatch || 0,
            keywordsMatch: analysis.scores.keywordsMatch,
            matchedSkills: analysis.matching.matchedSkills,
            missingSkills: analysis.matching.missingSkills,
            matchedKeywords: analysis.matching.matchedKeywords,
            missingKeywords: analysis.matching.missingKeywords,
            strengths: analysis.feedback.strengths,
            weaknesses: analysis.feedback.weaknesses,
            suggestions: analysis.feedback.suggestions,
            shouldApply: analysis.recommendations.shouldApply,
            applicationTips: analysis.recommendations.applicationTips,
            coverLetterTips: analysis.recommendations.coverLetterTips,
            sectionsToImprove: analysis.improvements.sectionsToImprove,
            priorityChanges: analysis.improvements.priorityChanges,
            aiModel: "gemini-2.5-flash",
          }

          if (existingAnalysis) {
            await prisma.jobCVAnalysis.update({
              where: { id: existingAnalysis.id },
              data: analysisData,
            })
          } else {
            const latestJobAnalysis = await prisma.jobCVAnalysis.findFirst({
              where: { jobId: job.id },
              orderBy: { createdAt: "desc" },
            })

            if (latestJobAnalysis) {
              await prisma.jobCVAnalysis.update({
                where: { id: latestJobAnalysis.id },
                data: analysisData,
              })
            } else {
              await prisma.jobCVAnalysis.create({
                data: analysisData,
              })
            }
          }

          console.log(
            `Análisis CV vs Job completado para Job ${job.id} y CV ${cvId}`
          )
        }
      } catch (analysisError) {
        console.error("Error al analizar CV vs Job:", analysisError)
        // No lanzamos error, la oferta se creó exitosamente
        // El análisis es un proceso secundario
      }
    }

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error("Error al crear la oferta:", error)
    return NextResponse.json(
      { message: "Error interno al crear la oferta" },
      { status: 500 },
    )
  }
}
