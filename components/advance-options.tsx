import React from "react";
import { Card } from "./ui/card";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface AdvanceOptionsProps {
  setIncludeATS: React.Dispatch<React.SetStateAction<boolean>>;
  setCompareJobs: React.Dispatch<React.SetStateAction<boolean>>;
  setIndustrySuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}
function AdvanceOptions({
  setIncludeATS,
  setCompareJobs,
  setIndustrySuggestions,
}: AdvanceOptionsProps) {
  return (
    <Card className="p-8">
      <details className="group">
        <summary className="text-lg font-semibold cursor-pointer list-none flex items-center justify-between">
          <span>Opciones Avanzadas</span>
          <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
        </summary>
        <div className="mt-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="ats"
              checked={false}
              onCheckedChange={(checked) => setIncludeATS(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="ats" className="font-normal cursor-pointer">
                Incluir análisis de keywords ATS
              </Label>
              <p className="text-xs text-muted-foreground">
                Verifica si tu CV es compatible con sistemas de seguimiento de
                candidatos
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="compare"
              checked={false}
              onCheckedChange={(checked) => setCompareJobs(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="compare" className="font-normal cursor-pointer">
                Comparar con ofertas de trabajo similares
              </Label>
              <p className="text-xs text-muted-foreground">
                Analiza cómo se compara tu CV con requisitos del mercado actual
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="suggestions"
              checked={false}
              onCheckedChange={(checked) =>
                setIndustrySuggestions(checked as boolean)
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="suggestions"
                className="font-normal cursor-pointer"
              >
                Sugerencias de mejora específicas para la industria
              </Label>
              <p className="text-xs text-muted-foreground">
                Recibe recomendaciones personalizadas según tu área profesional
              </p>
            </div>
          </div>
        </div>
      </details>
    </Card>
  );
}

export default AdvanceOptions;
