export type AssessmentType =
  | 'high_risk_indicators'
  | 'some_warning_signs'
  | 'insufficient_information'
  | 'no_obvious_warning_signs';

export type SeverityType = 'low' | 'medium' | 'high';

export interface Finding {
  id: string;
  title: string;
  severity: SeverityType;
  confidence: number;
  observedEvidence: string;
  explanation: string;
  limitations: string;
  recommendedAction: string;
}

export interface InvestigationReport {
  id: string;
  createdAt: string;
  title: string;
  type: 'message' | 'screenshot';
  rawInputSnippet: string;
  assessment: AssessmentType;
  summary: string;
  findings: Finding[];
  knownFacts: string[];
  unknowns: string[];
  recommendedActions: string[];
  disclaimer: string;
  analysisMode: 'gemini_ai' | 'rule_based_heuristics';
  metadata?: {
    charCount?: number;
    imageFilename?: string;
  };
}

export interface IncidentNote {
  id: string;
  title: string;
  category: 'Job Scam' | 'Phishing / SMS' | 'Account Takeover' | 'Investment' | 'Marketplace' | 'Other';
  date: string;
  notes: string;
  status: 'Investigating' | 'Contained' | 'Reported' | 'Resolved';
  updatedAt: string;
}

export interface UserSettings {
  textSize: 'normal' | 'large';
  reducedMotion: boolean;
  preferredEngine: 'auto' | 'local_only';
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  howItOperates: string;
  commonRedFlags: string[];
  fictionalExample: string;
  verificationSteps: string[];
  harmReduction: string[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizScenario {
  id: string;
  scenarioTitle: string;
  category: string;
  messageText: string;
  question: string;
  options: QuizOption[];
  keyConcept: string;
  educationalTakeaway: string;
}
