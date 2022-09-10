/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: "'Inconsolata', monospace",
    },
    extend: {
      colors: {
        app: "#fff",
        "high-light": "rgba(41,41,41,1)",
        primary: "#808080",
        secondary: "rgba(63,63,63,1)",
        dark: "rgba(21,21,21,1)",
      },
    },
    animation: {
      "scale-image-banner": "scale-image-banner 300ms ease-in-out forwards",
      scale: "scale 300ms ease-in-out forwards",
      opacity: "opacity 1s ease-in-out forwards",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    keyframes: {
      opacity: {
        "0%": {
          opacity: "0",
        },
        "100%": {
          opacity: "1",
        },
      },
      "scale-image-banner": {
        "0%": {
          opacity: "0",
          transform: "scale(2)",
          filter: "blur(90px)",
          "transform-origin": "50% 50%",
        },
        "100%": {
          opacity: "1",
          transform: "scale(1)",
          filter: "blur(0)",
          "transform-origin": "50% 50%",
        },
      },
      scale: {
        "0%": {
          opacity: "0",
          transform: "scale(0)",
        },
        "100%": {
          opacity: "1",
          transform: "scale(1)",
        },
      },
      pulse: {
        "0%": {
          opacity: "1",
        },
        "50%": {
          opacity: "0.5",
        },
        "100%": {
          opacity: "1",
        },
      },
    },
    screens: {
      sm: "480px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1900px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
