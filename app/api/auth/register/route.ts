import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();
  const findUser = await prisma.user.findUnique({
    where: { email: res.email },
  });
  if (findUser) {
    console.log(res.email);
    return NextResponse.json("User already exists", { status: 400 });
  }
  console.log(res);
  return NextResponse.json("register user");
}
