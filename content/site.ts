export const SITE = {
  name: "KOUD",
  person: "Jancy Koud Banga",
  role: "Software Engineer & Digital Product Builder",
  roleFr: "Ingénierie logicielle · Produits numériques",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://koud-portfolio.netlify.app",
  location: "Clermont-Ferrand, France",
  availability: "Disponible pour missions et opportunités — mobilité en France",
  email: "fridelinbanga@gmail.com",
  description:
    "Jancy Koud Banga — ingénierie logicielle et produits numériques. Applications métier, plateformes de données scientifiques, IA appliquée : de l'idée à la mise en production.",
  socials: [
    { label: "GitHub", href: "https://github.com/jancykoud", handle: "jancykoud" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jancy-koud-banga", handle: "jancy-koud-banga" },
    { label: "GitLab", href: "https://gitlab.com/fridelinbanga", handle: "fridelinbanga" },
  ],
  resumes: [
    { label: "CV Développement fullstack", href: "/assets/resume/CV_Koud-UM.pdf" },
    { label: "CV Chef de projet IT", href: "/assets/resume/CV_Koud_IAE.pdf" },
  ],
  portrait: { src: "/images/profile.jpg", width: 1250, height: 1246, alt: "Portrait de Jancy Koud Banga" },
} as const;

export const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Projets", href: "/projets" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Lab", href: "/lab" },
  { label: "Contact", href: "/contact" },
] as const;

/** Hero facts — each one is sourced (see docs/CONTENT_INVENTORY.md). */
export const HERO_FACTS = [
  { value: "2", label: "Masters (Informatique & MTS)", source: "CV" },
  { value: "53", label: "instruments catalogués sur DECLIC", source: "Articles DECLIC" },
  { value: "3", label: "produits en ligne", source: "wmbia.com · orient-ex.org · démo Akili" },
  { value: "OGC", label: "standards SensorThings · INSPIRE", source: "DECLIC" },
] as const;
