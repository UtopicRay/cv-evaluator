import { NextResponse } from "next/server";
import { deleteJob } from "@/lib/query";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const result = await deleteJob(id);
    if (result && typeof result === "object" && "error" in result) {
      return NextResponse.json({ message: (result as any).error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ message: "Error deleting job" }, { status: 500 });
  }
}
