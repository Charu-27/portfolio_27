export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string;
  yearsOfExperience: number;
  resumeUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
  category:  'backend' | 'tools' | 'other';
}

export interface PortfolioData {
  personal: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Charu Jain",
    title: "Software Engineer",
    location: "Navi Mumbai, Maharastra",
    email: "charu2722001@gmail.com",
    phone: "+91 9340078774",
    github: "https://github.com/Charu-27",
    linkedin: " https://www.linkedin.com/in/charu-jain272abc/",
    bio: "Backend-focused Software Engineer crafting scalable microservices with Java and Spring Boot, passionate about building reliable and high-performance systems",
    yearsOfExperience: 2.5,
    resumeUrl: "https://drive.google.com/file/d/1EN1RXmO97KlN852kYYLT5iMRwRWxOwiI/view?usp=drivesdk",
  },
  experiences: [
    {
      id: "1",
      company: "Reliance Jio",
      position: "Software Engineer",
      duration: "Jan 2023 - Present",
      location: "Navi Mumbai",
      description: ["Backend-focused Software Engineer with 2.4+ years of experience designing and maintaining microservices using Java and Spring Boot. Experienced in building scalable REST APIs, optimizing system performance, and deploying containerized applications with Docker, Kubernetes, and Azure DevOps"],
      technologies: ["Java", "Springboot", "RDBMS", "Oracle SQL", "Kubernetes", "Docker", "Azure Devops"]
    }
  ],
  projects: [
    {
      id: "1",
      name: "Expense Tracker",
      description: "Personalised Application to manage and track all your expenses at one place",
      technologies: ["Java", "Springboot", "React", "JavaScript", "Cursor"],
      githubUrl: "https://github.com/Charu-27/expense-tracker",
      liveUrl: "https://expensetracker-pi-two.vercel.app/",
      highlights: [
        "Personalised Application to manage and track all your expenses at one place",
      ]
    },
    {
      id: "2",
      name: "Doc Pocket",
      description: "A Platform to upload and store all your files and folders.",
      technologies: ["React", "Chart.js", "OpenWeather API", "Leaflet"],
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      liveUrl: "https://your-weather-demo.com",
      highlights: [
        "User authentication and authorisation",
        "cloud based data storage"
      ]
    }
  ],
  skills: [
    { name: "Java", level: 90, category: "backend" },
    { name: "Springboot", level: 90, category: "backend" },
    { name: "Oracle SQL", level: 90, category: "other" },
    { name: "REST APIs", level: 90, category: "backend" },
    { name: "Azure Devops", level: 85, category: "backend" },
    { name: "Kubernetes", level: 85, category: "backend" },
    { name: "Git", level: 90, category: "tools" },
    { name: "Docker", level: 75, category: "tools" },
    { name: "CI/CD", level: 85, category: "tools" },
    { name: "Redis", level: 90, category: "other" },
  ]
};