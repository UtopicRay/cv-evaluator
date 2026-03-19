import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const userId = formData.get("userId")

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "Archivo inválido" },
        { status: 400 },
      )
    }

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { message: "UserId inválido" },
        { status: 400 },
      )
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { message: "Faltan credenciales de Supabase" },
        { status: 500 },
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const extension = file.name.split(".").pop() || "pdf"
    const filePath = `${userId}/${randomUUID()}.${extension}`

    const { data, error } = await supabase.storage
      .from("Cvs")
      .upload(filePath, file, {
        contentType: file.type || "application/pdf",
        upsert: false,
      })

    if (error || !data?.path) {
      return NextResponse.json(
        { message: "No se pudo subir el archivo" },
        { status: 500 },
      )
    }

    const { data: publicUrlData } = supabase.storage
      .from("Cvs")
      .getPublicUrl(data.path)

    return NextResponse.json({
      filePath: data.path,
      fileUrl: publicUrlData.publicUrl,
    })
  } catch (error) {
    console.error("Error al subir archivo:", error)
    return NextResponse.json(
      { message: "Error interno al subir archivo" },
      { status: 500 },
    )
  }
}
