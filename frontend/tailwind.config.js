/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // sidebar: {
        //   DEFAULT: "hsl(var(--sidebar-background))",
        //   foreground: "hsl(var(--sidebar-foreground))",
        //   primary: "hsl(var(--sidebar-primary))",
        //   "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        //   accent: "hsl(var(--sidebar-accent))",
        //   "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        //   border: "hsl(var(--sidebar-border))",
        //   ring: "hsl(var(--sidebar-ring))",
        // },
        "classic-black": "#0a0a0a", // dark black
        "classic-grey": "#2a2a2a", // lighter shade of black for surfaces
        "classic-accent": "#ffffff", // white for contrasting text
        "primary": '#347928',    // Green shade
        "secondary": '#C0EBA6'   // Light green shade
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
};
