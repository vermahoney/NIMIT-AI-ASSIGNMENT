import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 70px rgba(15, 23, 42, 0.25)",
      },
      backgroundImage: {
        glow: "radial-gradient(circle at top, rgba(99, 102, 241, 0.14), transparent 35%), radial-gradient(circle at right, rgba(16, 185, 129, 0.12), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
