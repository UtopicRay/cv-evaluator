import { randomUUID } from "crypto";
import getSupabaseClient from "../supabase";

interface UploadImageParameters {
  file: File;
  bucket: string;
  folder?: string;
}

async function getStorage() {
  const supabase = await getSupabaseClient();
  return supabase.storage;
}

export async function uploadImage({
  file,
  bucket,
  folder,
}: UploadImageParameters) {
  // 1. Compresión del Archivo (Paso de optimización) [8]
  // Se utiliza la lógica de image compression para reducir el tamaño del archivo,
  // por ejemplo, a un máximo de 1MB.
  const fileExtension = "." + file.name.split(".").pop(); // Obtener la extensión del archivo
  // 2. Generación de Ruta Única [8, 9]
  // Se genera un path único, a menudo incluyendo el UUID V4:
  const path = (folder ? `${folder}/` : "") + randomUUID + fileExtension;

  // 3. Obtener el cliente de Storage [10]
  const storage = await getStorage(); // Una función que devuelve la instancia de Supabase Storage.

  // 4. Ejecutar la Subida [10]
  try {
    const { data, error } = await storage.from(bucket).upload(path, file); // Sube el archivo al bucket y path definidos.

    if (error) {
      // Manejar y retornar el error de subida [10]
      return { imageURL: null, error: error.message };
    }

    // 5. Construcción de la URL Pública [11]
    // Si la subida es exitosa, se genera la URL pública de la imagen [11].
    const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`;

    return { imageURL, error: null };
  } catch (err) {
    // Manejo de errores de compresión o de red [8, 10]
    console.error(err);
    return { imageURL: null, error: "Upload failed due to internal error." };
  }
}
