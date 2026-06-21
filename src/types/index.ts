export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
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
  type: "work" | "achievement" | "education";
}

