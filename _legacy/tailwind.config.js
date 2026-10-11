/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        cream: "#f2f0eb",
        dark: "#0a0a0a",
        accent: {
          DEFAULT: "#6d28d9",
          hover: "#5b21b6",
        },
        /* Keep legacy names so blog / work pages don't break */
        primary: "#0a0a0a",
        "primary-dark": "#ffffff",
        surface: "#111111",
        "surface-card": "#1a1a1a",
        muted: "rgba(0,0,0,0.4)",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        primary: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        hero: "-0.025em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
