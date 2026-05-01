export type ExperienceDetail = {
  body: string;
  technologies?: string[];
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  url?: string;
  dateRange: string;
  description: string;
  technologies: string[];
  details?: ExperienceDetail[];
};

// Placeholder content — based on what you've shared so far.
// Replace with real entries when you're ready.
export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Lions Geek",
    location: "Morocco",
    url: "https://lionsgeek.ma",
    dateRange: "2024 - 2025",
    description:
      "Project-based full-stack development training. Built end-to-end applications with a focus on clean architecture, security, and shipping production-ready code.",
    technologies: ["Next.js", "React", "Laravel", "PHP", "TypeScript", "SQL"],
    details: [
      {
        body: "Designed and built multiple full-stack applications from scratch — modern frontends with React and Next.js, backends with Laravel and PHP.",
        technologies: ["Next.js", "React", "Laravel", "PHP"],
      },
      {
        body: "Earned the Full Stack Developer certification through hands-on capstone projects.",
        technologies: ["Full Stack"],
      },
    ],
  },
  {
    role: "Software Engineering Trainee",
    company: "ALX",
    location: "Remote",
    url: "https://www.alxafrica.com",
    dateRange: "2023 - 2024",
    description:
      "Intensive frontend, backend, and foundations training program with project-driven curriculum and peer-reviewed work.",
    technologies: ["TypeScript", "JavaScript", "React", "Vue", "Node.js"],
    details: [
      {
        body: "Frontend certification — responsive UIs with React, Vue, and modern JavaScript patterns.",
        technologies: ["React", "Vue", "TypeScript"],
      },
      {
        body: "Backend certification — REST API design, authentication flows, and relational data modeling.",
        technologies: ["Node.js", "REST APIs", "SQL"],
      },
      {
        body: "AI Career and Professional Foundations supplementary tracks.",
        technologies: ["AI Career", "Professional Foundations"],
      },
    ],
  },
  {
    role: "Cybersecurity Engineering",
    company: "HESTIM",
    location: "In studies",
    dateRange: "2026 - ongoing",
    description:
      "Currently studying cybersecurity engineering — focused on secure system design, threat modeling, and the principles behind defending real architectures.",
    technologies: ["Cybersecurity", "Threat Modeling", "OWASP"],
    details: [
      {
        body: "Coursework on secure design patterns, authentication, authorization, and how to build systems that hold under attack — not just patch them after.",
        technologies: ["Secure Design", "AuthN / AuthZ"],
      },
      {
        body: "Foundations across systems, networking, and security — the layers most people skip.",
        technologies: ["Networks", "Linux"],
      },
    ],
  },
];

// Skills shown in the right-hand sidebar.
export type SidebarSkillGroup = { label: string; items: string[] };

export const sidebarSkills: SidebarSkillGroup[] = [
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Vue", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PHP", "Laravel", "REST APIs"],
  },
  {
    label: "Database",
    items: ["SQL", "MySQL", "Schema design"],
  },
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "Python"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
  {
    label: "Learning",
    items: ["Cybersecurity", "Threat Modeling", "OWASP", "Linux"],
  },
];
