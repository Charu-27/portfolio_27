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

export interface SkillGroupItem {
  name: string;
  iconSlug?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: SkillGroupItem[];
}

export interface Education {
  id: string;
  institution: string;
  institutionLocation: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  cgpa: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  skillGroups: SkillGroup[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Charu Jain",
    title: "Software Engineer",
    location: "Navi Mumbai, Maharashtra",
    email: "charu2722001@gmail.com",
    phone: "+91 9340078774",
    github: "https://github.com/Charu-27",
    linkedin: "https://www.linkedin.com/in/charu-jain272abc/",
    bio: "Backend-focused Software Engineer crafting scalable microservices with Java and Spring Boot, passionate about building reliable and high-performance systems",
    yearsOfExperience: 2.6,
    resumeUrl: "https://drive.google.com/file/d/15PeuMpUYgyynScURivHyTpKt37Thi133/view?usp=sharing",
  },
  education: [
    {
      id: "1",
      institution: "Gyan Ganga College of Technology",
      institutionLocation: "Jabalpur, Madhya Pradesh",
      degree: "B.Tech",
      field: "Computer Science & Engineering",
      startYear: 2019,
      endYear: 2023,
      cgpa: "9.3",
    },
  ],
  experiences: [
    {
      id: "1",
      company: "Reliance Jio",
      position: "Software Engineer",
      duration: "Jan 2023 - Present",
      location: "Navi Mumbai",
      description: ["Backend-focused Software Engineer with 2.6 years of experience designing and maintaining microservices using Java and Spring Boot. Experienced in building scalable REST APIs, optimizing system performance, and deploying containerized applications with Docker, Kubernetes, and Azure DevOps"],
      technologies: ["Java", "Springboot", "RDBMS", "Oracle SQL", "Kubernetes", "Docker", "Azure Devops"]
    }
  ],
  projects: [
    {
      id: "1",
      name: "Expense Tracker",
      description:
        "Full-stack application to track income and spending. Helps you record transactions and see your money in one place.",
      image: '/images/projects/expense-tracker.jpg',
      technologies: ["React", "Java", "Spring Boot"],
      githubUrl: "https://github.com/Charu-27/expense-tracker",
      liveUrl: "https://expensetracker-pi-two.vercel.app/",
      highlights: [
        "Track expenses and categories in a single dashboard",
        "REST APIs with a Spring Boot backend",
        "React front end deployed on Vercel",
      ],
    },
    {
      id: "2",
      name: "Doc Pocket",
      description:
        "Web app to organise documents in folders and upload different file types. Built with React and Firebase for sign-in and cloud storage.",
      image: '/images/projects/doc-pocket.jpg',
      technologies: ["React", "Firebase"],
      githubUrl: "https://github.com/Charu-27/Doc_Pocket",
      liveUrl: "https://doc-pocket.vercel.app",
      highlights: [
        "User authentication with Firebase",
        "Cloud storage for files and folders",
        "Folder-based document organisation",
      ],
    },
  ],
  skillGroups: [
    {
      id: "languages",
      title: "Programming Languages",
      items: [
        { name: "Java", iconSlug: "openjdk" },
        { name: "C++", iconSlug: "cplusplus" },
        { name: "SQL", iconSlug: "oracle" },
      ],
    },
    {
      id: "backend",
      title: "Backend Technologies",
      items: [
        { name: "Spring Boot", iconSlug: "springboot" },
        { name: "REST APIs", iconSlug: "openapiinitiative" },
        { name: "Microservices", iconSlug: "nginx" },
        { name: "Hibernate / JPA", iconSlug: "hibernate" },
        { name: "Postman", iconSlug: "postman" },
        { name: "Kafka", iconSlug: "apachekafka" },
      ],
    },
    {
      id: "data",
      title: "Databases & Caching",
      items: [
        { name: "Oracle SQL", iconSlug: "oracle" },
        { name: "Redis", iconSlug: "redis" },
      ],
    },
    {
      id: "devops",
      title: "DevOps & Cloud",
      items: [
        { name: "Docker", iconSlug: "docker" },
        { name: "Kubernetes", iconSlug: "kubernetes" },
        { name: "Azure DevOps", iconSlug: "azuredevops" },
        { name: "Git", iconSlug: "git" },
        { name: "GitHub", iconSlug: "github" },
        { name: "CI/CD", iconSlug: "githubactions" },
        { name: "Linux", iconSlug: "linux" },
      ],
    },
  ],
};