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
import FormCvUpload from "@/components/form-cv-upload";
import { Card } from "@/components/ui/card";
import { AnalyzingAnimation } from "@/components/analyzing-animation";
import Link from "next/link";

export default function UploadPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFormValid= jobTitle.length >=3 && jobTitle.length <=100 && industry !=="";  
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
      validateForm();
      if(isFormValid){
        setCurrentStep(2)
      }
      return;
    }
    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/dashboard/cv/1");
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
