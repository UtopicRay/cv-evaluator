import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Briefcase, Building2, HelpCircle } from "lucide-react";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { experienceLevels, industries } from "@/const";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import UsageSummary from "./usage-summary";

interface FormCvUploadProps {
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setIndustry: React.Dispatch<React.SetStateAction<string>>;
  setExperienceLevel: React.Dispatch<React.SetStateAction<string>>;
  errors: {
    jobTitle?: string;
    industry?: string;
  };
}
function FormCvUpload({
  setJobTitle,
  setIndustry,
  setExperienceLevel,
  errors,
}: FormCvUploadProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8 mt-8">
      <Card className="p-8 col-span-2">
        <h2 className="text-xl font-semibold mb-6">Información del CV</h2>

        <div className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-medium">
              Título del Puesto Objetivo
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="jobTitle"
                placeholder="ej. Desarrollador Full Stack, Diseñador UX/UI"
                className="pl-10 h-12"
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              El puesto al que aspiras o para el que optimizas tu CV
            </p>
            {errors.jobTitle && (
              <p className="text-xs text-destructive">{errors.jobTitle}</p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="industry" className="text-sm font-medium">
                Área o Industria
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Selecciona la industria que mejor se alinea con tu
                      objetivo profesional
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Select onValueChange={setIndustry}>
                <SelectTrigger className="pl-10 h-12">
                  <SelectValue placeholder="Selecciona un área" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.industry && (
              <p className="text-xs text-destructive">{errors.industry}</p>
            )}
          </div>

          {/* Experience Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Nivel de Experiencia{" "}
              <span className="text-muted-foreground">(opcional)</span>
            </Label>
            <RadioGroup onValueChange={setExperienceLevel}>
              <div className="grid sm:grid-cols-2 gap-3">
                {experienceLevels.map((level) => (
                  <div
                    key={level.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={level.value} id={level.value} />
                    <Label
                      htmlFor={level.value}
                      className="font-normal cursor-pointer"
                    >
                      {level.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>
      <div className="lg:sticky lg:top-8 h-fit">
        <UsageSummary />
      </div>
    </div>
  );
}

export default FormCvUpload;
