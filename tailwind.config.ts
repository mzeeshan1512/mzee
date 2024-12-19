import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#ffffff",
          text: "#000000"
        },
        dark: {
          background: "#1a1a1a",
          text: "#ffffff"
        },
        primary: {
          50: "#ffe0e4",
          100: "#ffb3b8",
          200: "#ff8085",
          300: "#ff4d51",
          400: "#ff1a24",
          500: "#cc0c40", // Base color
          600: "#a10932",
          700: "#7e0725",
          800: "#5a0519",
          900: "#37030d"
        }
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #ffbf00, #cc0c40)",
        "primary-hover-gradient":
          "linear-gradient(to left, #ffbf00a3, #cc0c3fa3)",
        "primary-gradient-left": "linear-gradient(to left, #ffbf00, #cc0c40)",
        "grid-pattern-dark": `linear-gradient(to right, rgba(	211, 211, 211, 0.03) 2px, transparent 1px),
                         linear-gradient(to bottom, rgba(	211, 211, 211, 0.03) 2px, transparent 1px)`,
        "grid-pattern-light": `linear-gradient(to right, rgba(65,74,76, 0.03) 2px, transparent 1px),
                         linear-gradient(to bottom, rgba(65,74,76, 0.03) 2px, transparent 1px)`
      },
      backgroundSize: {
        "grid-size": "100px 100px" // Adjust size as needed
      },
      keyframes: {
        grayscale: {
          "0%, 100%": { filter: "grayscale(0%)" },
          "50%": { filter: "grayscale(100%)" }
        }
      },
      animation: {
        "grayscale-transform": "grayscale 4.3s ease-in-out infinite"
      }
    },
    variants: {
      extend: {
        width: ["responsive"]
      }
    }
  },
  plugins: [typography]
};

export default config;
