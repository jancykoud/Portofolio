export type VideoSource = {
  mp4: string;
  webm?: string;
  poster: string;
  captions: { lang: "fr" | "en"; label: string; src: string }[];
  duration: string;
};

/**
 * The presentation video has not been produced yet. Set `INTRO_VIDEO` once
 * the files exist in /public/video — the player then renders automatically.
 */
export const INTRO_VIDEO: VideoSource | null = null;

export const STORYBOARD = [
  { time: "0:00", end: "0:08", title: "Introduction", shot: "Plan serré, regard caméra, lumière froide latérale. Titre KOUD en surimpression.", voice: "« Je m'appelle Jancy Koud Banga. Je construis des logiciels qui résolvent de vrais problèmes. »" },
  { time: "0:08", end: "0:20", title: "Mon parcours", shot: "Plans de mains au tableau puis au clavier : des mathématiques au code.", voice: "Professeur de mathématiques au Congo, puis deux masters en France : informatique et management des SI." },
  { time: "0:20", end: "0:32", title: "Mon approche", shot: "Atelier avec des utilisateurs, post-its, schéma d'architecture dessiné à main levée.", voice: "Comprendre le métier avant d'écrire du code. Les standards plutôt que les rustines." },
  { time: "0:32", end: "0:46", title: "Mes projets", shot: "Captures réelles autorisées en défilement : DECLIC (schéma), Wmbia, Akili.", voice: "Plateforme de données pour la recherche environnementale, recherche sémantique, gestion scolaire offline-first." },
  { time: "0:46", end: "0:54", title: "Ma vision", shot: "Retour au plan face caméra, plus large.", voice: "Des produits sobres, fiables, qui tiennent dans la durée." },
  { time: "0:54", end: "1:00", title: "Collaborons", shot: "Écran final : KOUD, adresse du site, bouton « Discutons de votre projet ».", voice: "« Parlons de votre projet. »" },
] as const;
