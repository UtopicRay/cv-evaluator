-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "bestCVId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_bestCVId_fkey" FOREIGN KEY ("bestCVId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
