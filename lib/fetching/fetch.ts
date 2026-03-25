import { JobDraft } from "@/type";

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
