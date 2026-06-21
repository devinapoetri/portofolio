import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "ExploreCirebon Web App",
    description: "A web-based smart city tourism information system using Laravel for backend and ReactJS for frontend.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["ReactJS", "Laravel", "Web Development"],
    githubUrl: "https://github.com/devinapoetri",
  },
  {
    id: "2",
    title: "Bank Customer Churn Analysis",
    description: "Analyzed customer churn data to identify retention patterns and developed interactive Tableau dashboards for key insights.",
    category: "Data Analysis",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["Tableau", "Data Analysis", "Visualization"],
  },
  {
    id: "3",
    title: "Air Quality Analysis",
    description: "Conducted data cleaning, EDA, and generated analytical visualizations to identify patterns and trends in air quality.",
    category: "Data Analysis",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "MySQL", "Tableau", "Orange"],
  }
];
