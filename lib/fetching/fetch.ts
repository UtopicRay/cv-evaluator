import { cache } from 'react'
import { JobDraft, User } from "@/type";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/auth"
import { prisma } from "@/lib/prisma"

export async function uploadJobforAnalysis(data: JobDraft) {
  try {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.userId,
        title: data.title.trim(),
        position: data.position.trim(),
        company: data.company?.trim() || null,
        remote: data.remote,
        cvId: data.cvId || null,
        experienceLevel: data.experienceLevel || null,
        description: data.description.trim(),
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || "No se pudo crear la oferta");
    }
    return payload;
  } catch (error) {
    console.error(error);
    throw error instanceof Error
      ? error
      : new Error("No se pudo crear la oferta");
  }
}

export const getUser: () => Promise<User | null> = cache(async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  const userData: User = {
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
  }
  return userData
})

