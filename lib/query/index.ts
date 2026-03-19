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
