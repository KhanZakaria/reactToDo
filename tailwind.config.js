/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "todo-bg": "url('todobg2.jpg')",
        "todo-bg2": "url('./src/images/todobg2.jpg')",
      },
    },
  },
  plugins: [],
};
