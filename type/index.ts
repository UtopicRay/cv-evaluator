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
export interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
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
export interface ScoreItem {
  label: string;
  value: number | null;
}
export type CVItem = {
  id: string;
  originalName: string;
  analyzedAt: Date | string | null;
  createdAt: Date | string;
  overallScore: number | null;
  scoreGrade: string | null;
  status: string;
  fileUrl: string;
};
export interface JobCVAnalysisInput {
  cvText: string;
  jobTitle: string;
  jobDescription: string;
  company?: string;
  employmentType?: string;
  experienceLevel?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
}

export interface JobCVAnalysisResponse {
  matchScore: number;
  overallScore: number;
  scoreGrade: string;
  scores: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    keywordsMatch: number;
  };
  matching: {
    matchedSkills: string[];
    missingSkills: string[];
    matchedKeywords: string[];
    missingKeywords: string[];
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  recommendations: {
    shouldApply: boolean;
    confidence: string;
    reasoning: string;
    applicationTips: string[];
    coverLetterTips: string[];
  };
  improvements: {
    sectionsToImprove: string[];
    priorityChanges: string[];
    quickWins: string[];
  };
  detailedAnalysis: {
    experienceAlignment: string;
    skillsGapAnalysis: string;
    standoutQualities: string;
    redFlags: string[];
  };
  summary: string;
  estimatedInterviewChance: string;
}

export interface JobDraft {
  userId: string;
  title: string;
  position: string;
  company?: string | null;
  remote: boolean;
  cvId?: string | null;
  experienceLevel?: string | null;
  description: string;
}
