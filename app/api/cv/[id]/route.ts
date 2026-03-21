import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ message: "Falta el id" }, { status: 400 })
    }

    await prisma.cV.delete({ where: { id } })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("Error al eliminar el CV:", error)
    return NextResponse.json(
      { message: "Error interno al eliminar el CV" },
      { status: 500 },
    )
  }
}
