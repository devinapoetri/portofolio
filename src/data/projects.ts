import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "ExploreCirebon Web App",
    description: "A web-based smart city tourism information system using Laravel for backend and ReactJS for frontend.",
    longDescription: "ExploreCirebon is a smart city tourism platform designed to help visitors discover cultural sites, culinary spots, and local attractions in Cirebon. Built with Laravel as the backend REST API and ReactJS on the frontend, it features an interactive map, user reviews, and a recommendation engine based on visitor preferences. The system also includes an admin dashboard for managing tourism content.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    ],
    tags: ["ReactJS", "Laravel", "Web Development"],
    githubUrl: "https://github.com/devinapoetri",
  },
  {
    id: "2",
    title: "Bank Customer Churn Analysis",
    description: "Analyzed customer churn data to identify retention patterns and developed interactive Tableau dashboards for key insights.",
    longDescription: "This data analysis project focused on identifying factors contributing to bank customer churn using a real-world dataset. The workflow included data preprocessing, exploratory data analysis (EDA), feature engineering, and machine learning classification models. Interactive Tableau dashboards were created to present key insights to stakeholders, highlighting churn risk segments and actionable retention strategies.",
    category: "Data Analysis",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200",
    ],
    tags: ["Tableau", "Data Analysis", "Visualization"],
  },
  {
    id: "3",
    title: "Air Quality Analysis",
    description: "Conducted data cleaning, EDA, and generated analytical visualizations to identify patterns and trends in air quality.",
    longDescription: "This project analyzed multi-year air quality monitoring data across several cities. Using Python for data cleaning and statistical analysis, MySQL for data storage, and Orange Data Mining for classification modeling, the study identified pollution trends, seasonal patterns, and correlations between air pollutants. Final results were visualized in Tableau to present findings in an accessible format.",
    category: "Data Analysis",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1569428034239-f9565e32e224?auto=format&fit=crop&q=80&w=1200",
    ],
    tags: ["Python", "MySQL", "Tableau", "Orange"],
  }
];
