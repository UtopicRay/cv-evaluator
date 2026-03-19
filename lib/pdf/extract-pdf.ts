import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(link: string): Promise<string> {
  try {
    const data = await new PDFParse({ url: link });

    // Limpiar el texto extraído
    var result = await data.getText();
    var texts= result.text.replace(/\s+/g, ' ').trim();
    if (!texts || texts.length < 50) {
      throw new Error(
        "El PDF parece estar vacío o no contiene texto extraíble"
      );
    }

    return texts;
  } catch (error) {
    console.error("Error al extraer texto del PDF:", error);
    throw new Error(
      "No se pudo extraer el texto del PDF. Asegúrate de que no sea una imagen escaneada."
    );
  }
}
