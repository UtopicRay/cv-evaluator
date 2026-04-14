"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { UploadStepper } from "@/components/upload-stepper";
import { FileUploadZone } from "@/components/file-upload-zone";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  ChevronRight,
  Home,
  HelpCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormCvUpload from "@/components/forms/form-cv-upload";
import { Card } from "@/components/ui/card";
import { AnalyzingAnimation } from "@/components/analyzing-animation";
import Link from "next/link";
import UseAnalizeDocument from "@/hooks/analize-document";

export default function UploadPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { analyzeCVWithAI } = UseAnalizeDocument();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
    }
  }, []);

  const isFormValid =
    jobTitle.length >= 3 && jobTitle.length <= 100 && industry !== "";

  const fileToBase64 = async (selectedFile: File): Promise<string> => {
    const buffer = await selectedFile.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }

    return btoa(binary);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!jobTitle || jobTitle.length < 3) {
        newErrors.jobTitle = "El título debe tener al menos 3 caracteres";
      }
      if (jobTitle.length > 100) {
        newErrors.jobTitle = "El título no puede exceder 100 caracteres";
      }
      if (!industry) {
        newErrors.industry = "Debes seleccionar un área de trabajo";
      }
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAnalyze = async () => {
    if (currentStep === 1) {
      const isValid = validateForm();
      if (isValid) {
        setCurrentStep(2);
      }
      return;
    }
    if (currentStep === 2) {
      if (!file) {
        setErrors((prev) => ({
          ...prev,
          file: "Debes subir un archivo antes de continuar",
        }));
        return;
      }
      if (!userId) {
        setErrors((prev) => ({
          ...prev,
          file: "No se pudo identificar al usuario",
        }));
        return;
      }

      setErrors({});
      setIsAnalyzing(true);
      setCurrentStep(3);

      try {
        const cvBase64 = await fileToBase64(file);
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("userId", userId);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("No se pudo subir el archivo");
        }

        const uploadResult = await uploadResponse.json();

        const result = await analyzeCVWithAI({
          targetIndustry: industry,
          targetJobTitle: jobTitle,
          experienceLevel: experienceLevel,
          cvText: `Archivo adjunto: ${file.name}`,
          cvBase64,
          cvMimeType: file.type || "application/pdf",
        });

        const response = await fetch("/api/cv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            fileName: uploadResult.filePath,
            originalName: file.name,
            fileSize: file.size,
            fileUrl: uploadResult.fileUrl,
            mimeType: file.type || "application/pdf",
            rawText: `Archivo adjunto: ${file.name}`,
            analysis: result,
          }),
        });

        if (!response.ok) {
          throw new Error("No se pudo guardar el análisis");
        }

        const saved = await response.json();
        router.push(`/dashboard/cv/${saved.id}`);
      } catch (error) {
        console.error(error);
        setErrors((prev) => ({
          ...prev,
          file: "Ocurrió un error durante el análisis",
        }));
        setCurrentStep(2);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/dashboard">
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Subir CV</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Sube tu Currículum</h1>
          <p className="text-lg text-muted-foreground">
            Obtén un análisis detallado y calificación instantánea de tu CV
          </p>
        </div>

        {/* Stepper */}
        <UploadStepper currentStep={currentStep} />

        {/* Main Content */}
        <div className="flex w-full items-center justify-center">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Information Form */}
            {currentStep === 1 && (
              <FormCvUpload
                errors={errors}
                setExperienceLevel={setExperienceLevel}
                setIndustry={setIndustry}
                setJobTitle={setJobTitle}
              ></FormCvUpload>
            )}

            {/* File Upload */}
            {currentStep === 2 && (
              <Card className="p-8 w-full my-14">
                <h2 className="text-xl font-semibold mb-6">Subir Archivo</h2>
                <FileUploadZone
                  file={file}
                  onFileChange={setFile}
                  error={errors.file}
                />
              </Card>
            )}
            {currentStep === 3 && <AnalyzingAnimation></AnalyzingAnimation>}
            {/* Action Buttons */}
            {currentStep < 3 && (
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push("/dashboard")}
                >
                  Cancelar
                </Button>
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button
                      size="lg"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      variant="outline"
                      className="min-w-[160px]"
                    >
                      Anterior
                    </Button>
                  )}
                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={
                      (currentStep === 1 && jobTitle === "") ||
                      (currentStep === 1 && industry === "") ||
                      (currentStep === 2 && !file)
                    }
                    className="min-w-[160px]"
                  >
                    {isFormValid || currentStep < 2
                      ? "Siguiente"
                      : "Analizar CV"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
