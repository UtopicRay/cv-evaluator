"use client";
import { Card, CardHeader } from "../ui/card";
import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface WeaknessStrengthSuggestionCardProps {
  weakness: string[];
  strengths: string[];
  suggestions: string[];
}

function WeaknessStrengthSuggestionCard({
  weakness,
  strengths,
  suggestions,
}: WeaknessStrengthSuggestionCardProps) {
  return (
    <Card className="border-border/40 bg-card p-6">
      <Tabs defaultValue="strengths" className="w-full">
        <TabsList className="grid h-12 w-full grid-cols-3 rounded-xl bg-muted/70 p-1">
          <TabsTrigger
            value="strengths"
            className="h-full rounded-lg font-semibold transition-colors data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            Fortalezas
          </TabsTrigger>
          <TabsTrigger
            value="weakness"
            className="h-full rounded-lg font-semibold transition-colors data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            Debilidades
          </TabsTrigger>
          <TabsTrigger
            value="suggestions"
            className="h-full rounded-lg font-semibold transition-colors data-[state=active]:bg-sky-600 data-[state=active]:text-white"
          >
            Sugerencias
          </TabsTrigger>
        </TabsList>
        <TabsContent value="strengths">
          <h3 className="mb-4 text-xl font-extrabold tracking-tight">
            Fortalezas
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {strengths.length > 0 ? (
              strengths.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-8 w-8 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li>No hay fortalezas registradas.</li>
            )}
          </ul>
        </TabsContent>
        <TabsContent value="weakness">
          <h3 className="mb-4 text-xl font-extrabold tracking-tight">
            Debilidades
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {weakness.length > 0 ? (
              weakness.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-8 w-8 text-amber-600" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li>No hay debilidades registradas.</li>
            )}
          </ul>
        </TabsContent>
        <TabsContent value="suggestions">
          <h3 className="mb-4 text-xl font-extrabold tracking-tight">
            Sugerencias de mejora
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {suggestions.length > 0 ? (
              suggestions.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-8 w-8 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li>No hay sugerencias registradas.</li>
            )}
          </ul>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default WeaknessStrengthSuggestionCard;
