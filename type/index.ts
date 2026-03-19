export interface InfoDetailsProps {
  title: string;
  description: string;
  color: string;
}
export interface CVAnalysisInput {
  cvText: string;
  cvBase64?: string;
  cvMimeType?: string;
  targetJobTitle: string;
  targetIndustry: string;
  experienceLevel?: string;
}

export interface CVAnalysisResponse {
  overallScore: number;
  scoreGrade: string;
  scores: {
    experienceScore: number;
    educationScore: number;
    skillsScore: number;
    formatScore: number;
    keywordsScore: number;
    atsScore: number;
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  detectedSkills: string[];
  missingKeywords: string[];
  sections: Array<{
    type: string;
    title: string;
    content: string;
    score: number;
    feedback: string;
  }>;
  summary: string;
  topPriorities: string[];
}
export interface GradeMeta {
  label: string;
  description: string;
  color: string;
}
export interface ScoreItem{
  label: string;
  value: number | null;
}