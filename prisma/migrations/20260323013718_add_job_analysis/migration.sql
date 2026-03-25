/*
  Warnings:

  - You are about to drop the column `bestCVId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Job` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('ACTIVE', 'APPLIED', 'ARCHIVED', 'CLOSED');

-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_bestCVId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "bestCVId",
DROP COLUMN "score",
ADD COLUMN     "cvId" TEXT,
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "niceToHave" JSONB,
ADD COLUMN     "preferredSkills" JSONB,
ADD COLUMN     "requiredSkills" JSONB,
ADD COLUMN     "requirements" JSONB,
ADD COLUMN     "responsibilities" JSONB,
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "JobCVAnalysis" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "scoreGrade" TEXT NOT NULL,
    "skillsMatch" DOUBLE PRECISION NOT NULL,
    "experienceMatch" DOUBLE PRECISION NOT NULL,
    "educationMatch" DOUBLE PRECISION,
    "keywordsMatch" DOUBLE PRECISION NOT NULL,
    "matchedSkills" JSONB NOT NULL,
    "missingSkills" JSONB NOT NULL,
    "matchedKeywords" JSONB NOT NULL,
    "missingKeywords" JSONB NOT NULL,
    "strengths" JSONB NOT NULL,
    "weaknesses" JSONB NOT NULL,
    "suggestions" JSONB NOT NULL,
    "shouldApply" BOOLEAN NOT NULL,
    "applicationTips" JSONB NOT NULL,
    "coverLetterTips" JSONB,
    "sectionsToImprove" JSONB NOT NULL,
    "priorityChanges" JSONB NOT NULL,
    "aiModel" TEXT NOT NULL,
    "tokensUsed" INTEGER,
    "analysisTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobCVAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobCVAnalysis_userId_idx" ON "JobCVAnalysis"("userId");

-- CreateIndex
CREATE INDEX "JobCVAnalysis_jobId_idx" ON "JobCVAnalysis"("jobId");

-- CreateIndex
CREATE INDEX "JobCVAnalysis_cvId_idx" ON "JobCVAnalysis"("cvId");

-- CreateIndex
CREATE INDEX "JobCVAnalysis_matchScore_idx" ON "JobCVAnalysis"("matchScore");

-- CreateIndex
CREATE UNIQUE INDEX "JobCVAnalysis_jobId_cvId_key" ON "JobCVAnalysis"("jobId", "cvId");

-- CreateIndex
CREATE INDEX "Job_userId_idx" ON "Job"("userId");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Job_createdAt_idx" ON "Job"("createdAt");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCVAnalysis" ADD CONSTRAINT "JobCVAnalysis_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCVAnalysis" ADD CONSTRAINT "JobCVAnalysis_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCVAnalysis" ADD CONSTRAINT "JobCVAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
