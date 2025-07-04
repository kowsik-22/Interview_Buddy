/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Crucial for scanning your React components
    "./public/index.html", // If you have Tailwind classes directly in public/index.html
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};