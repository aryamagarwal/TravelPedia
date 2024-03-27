/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'loginBg': "url('/src/assets/loginBg.jpg')",
      }
  },
  plugins: [],
}
}

