import { PrismaAdapter } from "@auth/prisma-adapter"; 
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { encode } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";


const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validation = authSchema.safeParse(credentials);
        if (!validation.success) {
          console.error("Validation error:", validation.error);
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: validation.data.email,
          },
        });

        if (!user) {
          console.error("Invalid credentials");
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          validation.data.password,
          user.password,
        );

        if (!isValidPassword) {
          console.error("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true; // Marcamos que se usó la estrategia de credenciales [10]
      }
      return token;
    },
  },
  jwt: {
    encode: async (params) => {
      if (params.token?.credentials) {
        const sessionToken = uuidv4(); // Generar un token de sesión único [11]

        if (!params.token.sub) {
          throw new Error("No se encontró el ID del usuario en el token.");
        }

        // Crear la sesión manualmente en la base de datos [12]
        const session = await prisma.session.create({
          data: {
            sessionToken,
            userId: params.token.sub,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días [12]
          },
        });

        if (!session) {
          throw new Error("No se pudo crear la sesión en la base de datos.");
        }

        return sessionToken;
      }
      // Si no es por credenciales, usar el método de codificado por defecto [12]
      return encode(params);
    },
  },
};
