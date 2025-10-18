import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neonPink: "#d946ef",
        neonCyan: "#22d3ee"
      },
      boxShadow: {
        neon: "0 0 80px -20px rgba(217,70,239,0.35)"
      }
    },
  },
  plugins: [],
};
export default config;