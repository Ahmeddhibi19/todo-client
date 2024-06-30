import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors :{
        primary:"#70E2A6",
        secondary:"#FD78E4",
        todo:"#F2F2F2",
        doing:"#FAE5B0",
        done:"#C8F8D1",
        hover_button:"#001968"
      }
    },
  },
  plugins: [],
};
export default config;
