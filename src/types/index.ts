export interface ClassMetrics {
  precision: number;
  recall: number;
  f1: number;
}

export interface ModelSnapshot {
  accuracy: number;
  class0: ClassMetrics;
  class1: ClassMetrics;
  macroAvg: ClassMetrics;
  weightedAvg: ClassMetrics;
}

export interface ModelMetrics {
  beforeHPO: ModelSnapshot;
  afterHPO: ModelSnapshot;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  image: string;
  images?: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  workflow?: { title: string; description: string }[];
  datasetOverview?: {
    source: string;
    rows: string;
    features: string;
    target?: string;
  };
  modelMetrics?: ModelMetrics;
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  longDescription?: string;
  type: "work" | "organization" | "education";
  images?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialUrl?: string;
  image?: string;
  images?: string[];
  category: string;
}
