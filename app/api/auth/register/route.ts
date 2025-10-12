import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const findUser = await prisma.user.findFirst({
      where: { email: res.email },
    });
    if (findUser) {
      console.log(res);
      return NextResponse.json("User already exists", { status: 400 });
    }
    const encrytedPassword = await bcrypt.hash(res.password, 10);
    await prisma.user.create({
      data: {
        email: res.email,
        name: res.name,
        password: encrytedPassword,
        lastName: res.lastName,
      },
    });
    return NextResponse.json("register user");
  } catch (err) {
    console.log(err);
    return NextResponse.json("Internal error", {
      status: 500,
      statusText: err.message as string,
    });
  }
}
