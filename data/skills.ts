export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: ".frontend()",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Vue",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    label: ".backend()",
    items: [
      "Node.js",
      "PHP",
      "Laravel",
      "REST APIs",
      "Authentication flows",
    ],
  },
  {
    label: ".database()",
    items: [
      "SQL",
      "MySQL",
      "Schema design",
      "Migrations",
    ],
  },
  {
    label: ".learning()",
    items: [
      "Cybersecurity engineering",
      "Secure design patterns",
      "Threat modeling",
      "OWASP fundamentals",
    ],
  },
  {
    label: ".tools()",
    items: [
      "Git / GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "Linux basics",
    ],
  },
];
