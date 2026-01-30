import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "ink": "#0b1220",
        "mist": "#f6f8fb",
        "metro": "#4f7cff",
        "metro-dark": "#395fe6"
      },
      boxShadow: {
        "metro": "0 12px 30px rgba(15, 23, 42, 0.12)",
        "sheet": "0 -12px 30px rgba(15, 23, 42, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
