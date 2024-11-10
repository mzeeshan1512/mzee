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
  // darkMode: 'class',
  theme: {
    extend: {
      colors: {
         light: {
          background: '#ffffff',
          text: '#000000',
        },
        dark: {
          background: '#1a1a1a',
          text: '#ffffff',
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
          900: "#37030d",
        },
      secondary: {
          50: "#fff9e6",
          100: "#ffefb3",
          200: "#ffe680",
          300: "#ffdc4d",
          400: "#ffd31a",
          500: "#ffbf00", // Base color
          600: "#cc9900",
          700: "#997300",
          800: "#664d00",
          900: "#332600",
        },

      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #ffbf00, #cc0c40)",
        "primary-hover-gradient": "linear-gradient(to left, #ffbf00a3, #cc0c3fa3)",
        "primary-gradient-left": "linear-gradient(to left, #ffbf00, #cc0c40)",
      },
    },
  },
  plugins: [
    typography, // Add typography plugin here
  ],
};

export default config;
