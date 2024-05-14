/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'loginBg': "url('/src/assets/loginBg.jpg')",
        
      },
      height: theme => ({
        "screen70": "70vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      fontSize: theme => ({
        "screen4": "4vw",
        "screen/2": "50vw",
        "screen/3": "calc(100vw / 3)",
        "screen/4": "calc(100vw / 4)",
        "screen/5": "calc(100vw / 5)",
      }),
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'body': ['Poppins'],
        'display': ['Poppins'],
        'gideon': ['Gideon Roman'],
      },
      zIndex: {
        '60': '60',
      }
  },
  plugins: [],
}
}

