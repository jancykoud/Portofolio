"use client";

import {
  FaHtml5, FaJs, FaReact, FaNodeJs, FaGitlab,
  FaDownload, FaGraduationCap, FaBriefcase, FaCalendarAlt,
} from "react-icons/fa";
import {
  SiTailwindcss, SiNextdotjs, SiTypescript, SiPostgresql,
  SiDocker, SiPython, SiPrisma, SiNuxtdotjs,
} from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

// ── Données ──────────────────────────────────────────────────────────────────

const about = {
  title: "À propos de moi",
  description: "Ingénieure fullstack et SIG avec un double Master en Informatique et Management (MTS). Actuellement en poste sur le projet ANR TERRA FORMA (CNRS/INRAE/IRD/UCA), je conçois des plateformes de données environnementales conformes aux standards OGC/INSPIRE, de l'IoT terrain jusqu'au portail web.",
  info: [
    { fieldName: "Noms",          fieldValue: "Jancy KOUD BANGA" },
    { fieldName: "Téléphone",     fieldValue: "(+33) 7 88 70 29 85" },
    { fieldName: "Localisation",  fieldValue: "Clermont-Ferrand, France" },
    { fieldName: "Expérience",    fieldValue: "2+ ans" },
    { fieldName: "LinkedIn",      fieldValue: "jancy-koud-banga" },
    { fieldName: "Nationalité",   fieldValue: "Congolaise" },
    { fieldName: "Email",         fieldValue: "fridelinbanga@gmail.com" },
    { fieldName: "Disponibilité", fieldValue: "Ouverte aux opportunités freelance" },
    { fieldName: "Langues",       fieldValue: "Français, Anglais, Chinois" },
  ],
};

const experience = {
  title: "Mon expérience professionnelle",
  description: "Conception et développement de plateformes de données scientifiques et environnementales. De l'architecture backend à l'interface utilisateur.",
  items: [
    { company: "ANR TERRA FORMA — CNRS/INRAE/IRD/UCA", position: "Ingénieure SIG & Développement Fullstack", duration: "Octobre 2025 — Présent", description: "Développement solo du portail FROST-FORMS : wizard IoT multi-étapes, catalogue de 53 instruments LoRaWAN, carte interactive et workflow de modération. Conformité OGC SensorThings, INSPIRE, ISO 19115." },
    { company: "ORANGE DATA/IA", position: "Chef de projet / Développeur Web — Stage", duration: "Février 2025 - Août 2025", description: "Pilotage d'un projet de digitalisation (Datamesh, méthodes agiles). Développement d'applications web." },
    { company: "GSI Concept", position: "Développeur Full Stack", duration: "Juin 2024 - Août 2024", description: "Développement d'applications web avec technologies frontend et backend modernes." },
    { company: "Outlier", position: "Développeur Freelance", duration: "2024 - Présent", description: "Développement de projets innovants et collaboration sur des solutions technologiques avancées." },
    { company: "Lycée La Révolution, Congo", position: "Enseignant de Mathématiques", duration: "2020 - 2022", description: "Enseignement des mathématiques au niveau secondaire." },
  ],
};

const timeline = [
  { year: "2025 →", title: "ANR TERRA FORMA",   description: "Ingénieure SIG & Fullstack — CNRS/INRAE/IRD/UCA", type: "work",      icon: <FaBriefcase /> },
  { year: "2025",   title: "Stage Orange DATA/IA", description: "Chef de projet & Développeur",                 type: "work",      icon: <FaBriefcase /> },
  { year: "2024-2025", title: "Master MTS",        description: "Management des Technologies et SI - IAE Montpellier", type: "education", icon: <FaGraduationCap /> },
  { year: "2023-2025", title: "Master Informatique", description: "Technologies Cloud - Université de Montpellier", type: "education", icon: <FaGraduationCap /> },
  { year: "2024",   title: "GSI Concept",         description: "Développeur Full Stack",                       type: "work",      icon: <FaBriefcase /> },
  { year: "2023",   title: "Master Mathématiques",description: "Université de Bourgogne",                      type: "education", icon: <FaGraduationCap /> },
  { year: "2020-2022", title: "Enseignant",        description: "Lycée La Révolution, Congo",                  type: "work",      icon: <FaBriefcase /> },
  { year: "2014-2019", title: "Master Enseignement", description: "ENS Brazzaville",                           type: "education", icon: <FaGraduationCap /> },
];

const education = {
  title: "Mon parcours éducatif",
  description: "Double Master combinant expertise technique et compétences managériales. Formation pluridisciplinaire alliant informatique, management et mathématiques.",
  items: [
    { institution: "IAE Montpellier",       degree: "Master 2 Management des Technologies et des SI (MTS)", duration: "2024 - 2025", highlight: true, skills: "Gestion de projet, Gouvernance IT, Stratégie digitale, Méthodes agiles" },
    { institution: "Université de Montpellier", degree: "Master 2 Informatique - Technologies Cloud",       duration: "2023 - 2025", highlight: true, skills: "Cloud Computing, DevOps, Architectures distribuées, Data Engineering" },
    { institution: "Université de Bourgogne",   degree: "Master de Perfectionnement en Mathématiques",     duration: "2023",         skills: "Analyse avancée, Statistiques, Algorithmes" },
    { institution: "ENS Brazzaville, Congo",    degree: "Master d'Enseignement en Mathématiques",          duration: "2014 - 2019",  skills: "Mathématiques appliquées, Pédagogie, Didactique" },
  ],
};

const skills = {
  title: "Mes compétences",
  description: "Maîtrise de diverses technologies pour le développement web et la conception d'applications performantes.",
  skillList: [
    { icon: <FaReact />,       name: "React.js" },
    { icon: <SiTypescript />,  name: "TypeScript" },
    { icon: <SiNextdotjs />,   name: "Next.js" },
    { icon: <FaNodeJs />,      name: "Node.js" },
    { icon: <SiPython />,      name: "Python" },
    { icon: <SiPostgresql />,  name: "PostgreSQL" },
    { icon: <SiPrisma />,      name: "Prisma" },
    { icon: <SiDocker />,      name: "Docker" },
    { icon: <SiNuxtdotjs />,   name: "Nuxt.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <FaHtml5 />,       name: "HTML 5" },
    { icon: <FaGitlab />,      name: "GitLab CI/CD" },
  ],
};

// ── Card dark ────────────────────────────────────────────────────────────────

const CardDark = ({ children, highlight }) => (
  <div
    className="py-6 px-8 rounded-xl flex flex-col justify-center gap-2"
    style={{
      background: "#1a1a1a",
      border: highlight ? "0.5px solid rgba(139,92,246,0.3)" : "0.5px solid rgba(255,255,255,0.08)",
    }}
  >
    {children}
  </div>
);

// ── Page ─────────────────────────────────────────────────────────────────────

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } }}
      className="py-12 xl:py-20"
      style={{ background: "#0a0a0a" }}
    >
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            Parcours
          </p>
          <h1 className="font-syne font-black text-[38px] xl:text-[52px] leading-[1.05] text-white mb-6" style={{ letterSpacing: "-0.025em" }}>
            Mon CV<span style={{ color: "#8b5cf6" }}>.</span>
          </h1>

          {/* Badge Double Master */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-inter text-sm font-medium mb-8"
            style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "0.5px solid rgba(139,92,246,0.3)" }}
          >
            <FaGraduationCap />
            Double Master : Informatique & Management (MTS)
          </div>

          {/* Boutons CV */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/assets/resume/CV_Koud-UM.pdf" download
              className="font-inter inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
              style={{ background: "#ffffff", color: "#0a0a0a" }}
            >
              <FaDownload className="text-xs" />
              CV Développeur Fullstack
            </Link>
            <Link
              href="/assets/resume/CV_Koud_IAE.pdf" download
              className="font-inter inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-white/10"
              style={{ border: "0.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              <FaDownload className="text-xs" />
              CV Chef de Projet IT
            </Link>
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-syne font-bold text-2xl text-white text-center mb-10">Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full" style={{ width: "0.5px", background: "rgba(255,255,255,0.08)" }} />
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} relative`}
                >
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ width: 10, height: 10, borderRadius: "50%", background: item.type === "education" ? "#8b5cf6" : "#ffffff", top: 16 }}
                  />
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <div
                      className="p-4 rounded-xl"
                      style={{ background: "#1a1a1a", border: `0.5px solid ${item.type === "education" ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.08)"}` }}
                    >
                      <div className={`flex items-center gap-2 mb-1 ${index % 2 === 0 ? "justify-end" : ""}`}>
                        <span style={{ color: item.type === "education" ? "#8b5cf6" : "rgba(255,255,255,0.6)", fontSize: 12 }}>{item.icon}</span>
                        <span className="font-inter text-[11px] font-medium" style={{ color: item.type === "education" ? "#a78bfa" : "rgba(255,255,255,0.4)" }}>
                          {item.year}
                        </span>
                      </div>
                      <h3 className="font-syne font-bold text-base text-white mb-0.5">{item.title}</h3>
                      <p className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-14">
          <TabsList className="flex flex-col w-full max-w-[260px] mx-auto xl:mx-0 gap-3">
            <TabsTrigger value="experience">Expérience</TabsTrigger>
            <TabsTrigger value="education">Éducation</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="about-me">À propos</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">

            {/* Expérience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-6 text-center xl:text-left">
                <h3 className="font-syne font-bold text-2xl text-white">{experience.title}</h3>
                <p className="font-inter text-sm max-w-[600px] mx-auto xl:mx-0" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {experience.description}
                </p>
                <ScrollArea className="h-[420px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-2">
                    {experience.items.map((item, index) => (
                      <li key={index}>
                        <CardDark>
                          <span className="font-inter text-[11px] font-medium text-accent">{item.duration}</span>
                          <h3 className="font-syne font-bold text-base text-white max-w-[260px] min-h-[48px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{item.company}</p>
                          </div>
                          {item.description && (
                            <p className="font-inter text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{item.description}</p>
                          )}
                        </CardDark>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Éducation */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-6 text-center xl:text-left">
                <h3 className="font-syne font-bold text-2xl text-white">{education.title}</h3>
                <p className="font-inter text-sm max-w-[600px] mx-auto xl:mx-0" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {education.description}
                </p>
                <ScrollArea className="h-[420px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-2">
                    {education.items.map((item, index) => (
                      <li key={index}>
                        <CardDark highlight={item.highlight}>
                          {item.highlight && (
                            <span className="font-inter text-[10px] px-2 py-0.5 rounded-full self-start" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>
                              Double Master
                            </span>
                          )}
                          <span className="font-inter text-[11px] font-medium text-accent">{item.duration}</span>
                          <h3 className="font-syne font-bold text-base text-white max-w-[260px] min-h-[48px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{item.institution}</p>
                          </div>
                          {item.skills && (
                            <p className="font-inter text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{item.skills}</p>
                          )}
                        </CardDark>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Compétences */}
            <TabsContent value="skills" className="w-full" id="skills">
              <div className="flex flex-col gap-6 text-center xl:text-left">
                <h3 className="font-syne font-bold text-2xl text-white">{skills.title}</h3>
                <p className="font-inter text-sm max-w-[600px] mx-auto xl:mx-0" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {skills.description}
                </p>
                <ScrollArea className="h-[420px]">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 pr-2">
                    {skills.skillList.map((skill, index) => (
                      <li
                        key={index}
                        className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-200 cursor-default"
                        style={{ background: "#1a1a1a", border: "0.5px solid rgba(255,255,255,0.08)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; e.currentTarget.style.background = "#1f1a2e"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#1a1a1a"; }}
                      >
                        <span className="text-4xl" style={{ color: "#8b5cf6" }}>{skill.icon}</span>
                        <p className="font-inter text-sm font-medium text-white text-center">{skill.name}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* À propos */}
            <TabsContent value="about-me" className="w-full">
              <div className="flex flex-col gap-6 text-center xl:text-left">
                <h3 className="font-syne font-bold text-2xl text-white">{about.title}</h3>
                <p className="font-inter text-sm max-w-[600px] mx-auto xl:mx-0" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  {about.info.map((info, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ background: "#1a1a1a", border: "0.5px solid rgba(255,255,255,0.08)" }}
                    >
                      <span className="font-inter text-[11px] font-semibold text-accent min-w-[90px] pt-0.5 uppercase tracking-wider">
                        {info.fieldName}
                      </span>
                      <span className="font-inter text-sm text-white">{info.fieldValue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
