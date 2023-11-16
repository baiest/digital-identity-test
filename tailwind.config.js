/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "100dvh"
      },
      screens: {
        sm: "640px", // Para dispositivos móviles
        lg: "768px", // Para tabletas
        "lg-x": "1024px" // Para escritorio
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        "background-primary": "var(--background-primary-color)"
      },
      animation: {
        progress: {
          "0%": {
            width: "0%"
          },
          "100%": {
            width: "100%"
          }
        }
      }
    }
  },
  plugins: []
};
