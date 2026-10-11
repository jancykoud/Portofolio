import { INTRO_VIDEO } from "@/content/video";

/**
 * Features that are only shown once they actually work. Evaluated at build
 * time (server side): after adding ANTHROPIC_API_KEY on Netlify, redeploy.
 * KOUD_AI_UI_PREVIEW=1 shows the assistant UI without a key (E2E tests only):
 * the API still answers "not configured".
 */
export const FEATURES = {
  koudAI: Boolean(process.env.ANTHROPIC_API_KEY) || process.env.KOUD_AI_UI_PREVIEW === "1",
  video: INTRO_VIDEO !== null,
} as const;
