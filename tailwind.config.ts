import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { main: "#ff9859" },
        secondary: { main: "#f1c336" },
        highlight: {main:" #472019"}
      },
    },
  },
  plugins: [],
} satisfies Config;
