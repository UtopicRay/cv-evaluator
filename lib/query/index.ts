import { get } from "http";
import { prisma } from "../prisma";

export async function getUser(email: string) {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) return null;
  const userProps = {
    id: user.id,
    email: user.email,
    name: user.name,
    lastName: user.lastName,
  };
  return userProps;
}
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
export async function getCvsByUserId(userId: string) {
  try {
    const isFindUser = await getUser(userId);
    if (!isFindUser) return { error: "Usuario no encontrado" };
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
    return { error: "Error fetching user" } ;
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
