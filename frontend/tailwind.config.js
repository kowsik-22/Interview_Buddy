// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your React component locations
    "./public/index.html",       // Include your main HTML file if you use classes there
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};