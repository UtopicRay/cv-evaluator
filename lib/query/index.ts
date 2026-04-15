import { BestMatchJobDto, CVItem, RecentsJobsDto } from "@/type";
import { prisma } from "../prisma";
import { ca } from "date-fns/locale";

export async function getCv(id: string) {
  try {
    const result = await prisma.cV.findUnique({
      where: { id },
      include: {
        analyses: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching CV:", error);
    return null;
  }
}
export async function getCvsByUserId(
  userId: string,
): Promise<CVItem[] | { error: string }> {
  try {
    const isFindUser = await getUserById(userId);
    if ("error" in isFindUser) return { error: "Usuario no encontrado" };
    const result = await prisma.cV.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        originalName: true,
        analyzedAt: true,
        createdAt: true,
        overallScore: true,
        scoreGrade: true,
        status: true,
        fileUrl: true,
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching CVs:", error);
    return { error: "Error fetching CVs" };
  }
}

export async function deleteCv(id: string) {
  try {
    const result = await prisma.cV.delete({
      where: { id },
    });
    return result;
  } catch (error) {
    console.error("Error deleting CV:", error);
    return { error: "Error deleting CV" };
  }
}
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return { error: "Usuario no encontrado" };
    const userProps = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };
    return userProps;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Error fetching user" };
  }
}

export async function getJobById(id: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        analyses: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        cv: {
          select: {
            id: true,
            originalName: true,
          },
        },
      },
    });
    if (!job) return { error: "Job not found" };
    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    return { error: "Error fetching job" };
  }
}

export async function getJobsByUserId(userId: string) {
  try {
    const jobs = await prisma.job.findMany({
      where: { userId },
      include: {
        analyses: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
export async function deleteJob(id: string) {
  try {
    const result = await prisma.job.delete({
      where: { id },
    });
    return result;
  } catch (error) {
    console.error("Error deleting job:", error);
    return { error: "Error deleting job" };
  }
}
export async function getRecentsJobs(
  userId: string,
): Promise<RecentsJobsDto[]> {
  try {
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        position: true,
        company: true,
        createdAt: true,
        analyses: {
          select: {
            matchScore: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      where: { userId },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    return jobs;
  } catch (error) {
    console.error("Error fetching recent jobs:", error);
    return [];
  }
}

export async function getHowManyCvUserHas(userId: string): Promise<number> {
  try {
    const count = await prisma.cV.count({
      where: { userId },
    });
    return count;
  } catch (error) {
    console.error("Error fetching CV count:", error);
    return 0;
  }
}
export async function getBestMatchJob(
  userId: string,
): Promise<BestMatchJobDto | null> {
  try {
    const job = await prisma.job.findFirst({
      where: { userId },
      select: {
        id: true,
        position: true,
        company: true,
        analyses: {
          select: { matchScore: true },
          orderBy: { matchScore: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return job;
  } catch (error) {
    console.error("Error fetching best match job:", error);
    return null;
  }
}

export async function getAverageJobScore(userId: string): Promise<number | null> {
  try {
    // Opción 1: Usando agregación de Prisma
    const result = await prisma.jobCVAnalysis.aggregate({
      where: {
        userId: userId,
      },
      _avg: {
        matchScore: true,
      },
    });

    // Retornar el promedio redondeado a 2 decimales, o null si no hay datos
    return result._avg.matchScore 
      ? Math.round(result._avg.matchScore * 100) / 100 
      : null;

  } catch (error) {
    console.error('Error al obtener average job score:', error);
    throw new Error('Error al calcular el score promedio de ofertas');
  }
}

export async function getAverageScoreByCV(userId: string) {
  try {
    const results = await prisma.jobCVAnalysis.groupBy({
      by: ['cvId'],
      where: {
        userId: userId,
      },
      _avg: {
        matchScore: true,
      },
      _count: {
        id: true,
      },
    });

    // Obtener información de los CVs
    const cvIds = results.map(r => r.cvId);
    const cvs = await prisma.cV.findMany({
      where: {
        id: { in: cvIds },
      },
      select: {
        id: true,
        fileName: true,
        originalName: true,
        overallScore: true,
      },
    });

    // Combinar resultados
    return results.map(result => {
      const cv = cvs.find(c => c.id === result.cvId);
      return {
        cvId: result.cvId,
        cvName: cv?.originalName || cv?.fileName || 'Unknown',
        cvOverallScore: cv?.overallScore,
        averageMatchScore: result._avg.matchScore 
          ? Math.round(result._avg.matchScore * 100) / 100 
          : null,
        jobCount: result._count.id,
      };
    }).sort((a, b) => (b.averageMatchScore || 0) - (a.averageMatchScore || 0));

  } catch (error) {
    console.error('Error al obtener average score by CV:', error);
    throw new Error('Error al calcular scores por CV');
  }
}
