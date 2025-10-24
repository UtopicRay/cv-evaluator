import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const findUser = await prisma.user.findFirst({
      where: { email: res.email },
    });

    const checkPassword = await bcrypt.compare(
      res.password,
      findUser?.password || ""
    );
    console.log(checkPassword);
    if (!findUser || !checkPassword) {
      return NextResponse.json(
        "El usuario no se encuentra registrado o la contraseña es incorrecta",
        { status: 400 }
      );
    }
    return NextResponse.json("login user");
  } catch (err) {
    console.log(err);
    return NextResponse.json("Internal error", {
      status: 500,
      statusText: err.message as string,
    });
  }
}
