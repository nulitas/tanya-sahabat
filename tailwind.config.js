/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14181d",
        primary_chat: "#131314",
        secondary: "#f4f4f5",
        sidebar: "#1e1f20",
        sidebar_hover: "#282a2c",
        sidebar_hover_text: "#c4c7c5",
        text_input: "#282a2c",
      },
      animation: {
        fade: "fadeIn .5s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
