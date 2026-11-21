export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
  imageAlt: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "liberty-stom",
    number: "01",
    name: "LIBERTY STOM",
    category: "Стоматология / Commercial Website",
    industry: "Healthcare",
    description:
      "Концепт современного сайта частной стоматологии в Астане. Акцент на доверии, услугах, врачах и записи пациентов.",
    tags: ["React", "TypeScript", "Responsive UI", "UX/UI", "Frontend"],
    url: "https://liberty-stom-blue.vercel.app/",
    image: "/projects/liberty-stom.webp",
    imageAlt: "Liberty Stom, сайт стоматологической клиники",
    accent: "#E8E4DC",
  },
  {
    id: "aisdent",
    number: "02",
    name: "AISDENT",
    category: "Dental Clinic / Web Design & Development",
    industry: "Healthcare",
    description:
      "Современный сайт стоматологической клиники с чистой визуальной системой, понятной структурой услуг и акцентом на конверсию.",
    tags: ["React", "TypeScript", "UI Development", "Responsive", "Landing"],
    url: "https://aisdent-j8gc.vercel.app/",
    image: "/projects/aisdent.webp",
    imageAlt: "Aisdent, стоматологическая клиника",
    accent: "#EAE8E1",
  },
  {
    id: "impala-beauty",
    number: "03",
    name: "IMPALA BEAUTY BRAND",
    category: "Beauty / Brand Website",
    industry: "Lifestyle",
    description:
      "Премиальный сайт для beauty-бренда в Астане: услуги, прайс, фотографии, отзывы и онлайн-запись.",
    tags: ["React", "TypeScript", "Editorial Design", "Responsive", "SEO"],
    url: "https://impala-psi.vercel.app/",
    image: "/projects/impala-beauty.jpg",
    imageAlt: "Impala Beauty Brand, beauty-студия",
    accent: "#E6E1D8",
  },
];
