import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  { ignores: ["_legacy/**", "my-app/**", ".next/**", "out/**", "node_modules/**", "playwright-report/**", "test-results/**", "next-env.d.ts"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // French copy is full of apostrophes; escaping them all hurts readability for no safety gain.
      "react/no-unescaped-entities": "off",
      // Flags intentional mount-time reads of browser-only state (URL, storage). To refactor
      // towards useSyncExternalStore progressively; kept visible as warnings.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
