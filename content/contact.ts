export const SUBJECTS = [
  { id: "mission", label: "Mission freelance / projet client" },
  { id: "emploi", label: "Opportunité d'emploi (CDI, CDD)" },
  { id: "collaboration", label: "Collaboration technique" },
  { id: "question", label: "Question" },
  { id: "autre", label: "Autre" },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]["id"];
export const SUBJECT_IDS = SUBJECTS.map((s) => s.id) as [SubjectId, ...SubjectId[]];
