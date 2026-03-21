'use client'
import { useCallback, useState } from "react";

export function useFetchData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fecthCvs = useCallback(async ({ userId }: { userId: string }) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`/api/cv?userId=${userId}`);
      if (!response.ok) {
        throw new Error("No se pudieron cargar los CVs");
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Error al cargar los CVs",
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDeleteCv = useCallback(async (id: string) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`/api/cv/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el CV");
      }
      return true;
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Error al eliminar el CV",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fecthCvs, fetchDeleteCv };
}
