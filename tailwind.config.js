/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "todo-bg": "url('todobg.jpg')",
        "todo-bg2": "url('todobg2.jpg')",
        "todo-bg3": "url('todobg3.jpg')",
      },
    },
  },
  plugins: [],
};
