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
