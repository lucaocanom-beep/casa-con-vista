import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Serif elegante per i titoli
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        // Sans pulito per il body
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Adriatico — blu mare profondo, principale per CTA e accenti forti
        adriatico: {
          50: "#f0f7fb",
          100: "#dbecf4",
          200: "#bbd9e9",
          300: "#8dbfd8",
          400: "#5a9ec1",
          500: "#3a82aa",
          600: "#2a6890",
          700: "#235376",
          800: "#1f4763",
          900: "#1d3c54",
          950: "#102739",
        },
        // Sabbia — toni caldi, terra, lungomare
        sabbia: {
          50: "#fbf8f2",
          100: "#f5ede0",
          200: "#ead7bc",
          300: "#dcbb8f",
          400: "#cb9c66",
          500: "#bd844b",
          600: "#a86d3f",
          700: "#8b5536",
          800: "#724632",
          900: "#5f3b2c",
          950: "#341e15",
        },
        // Schiuma — bianchi sporchi/cremosi per sfondi
        schiuma: {
          50: "#fdfcf8",
          100: "#faf6ed",
          200: "#f3ead4",
        },
        // Pietra — testi e neutri scuri
        pietra: {
          50: "#f6f6f5",
          100: "#e7e8e5",
          200: "#cfd1cb",
          300: "#aeb1a8",
          400: "#878b80",
          500: "#6c7065",
          600: "#555851",
          700: "#464844",
          800: "#3b3d3a",
          900: "#343532",
          950: "#1c1d1b",
        },
      },
      maxWidth: {
        prose: "65ch",
        content: "1200px",
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out both",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
