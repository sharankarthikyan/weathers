/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "red-rose": ["Red Rose Variable", "system-ui"],
        "dela-gothic-one": ["Dela Gothic One", "system-ui"],
        "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#1E3A8A", // Example of changing primary color
          "secondary": "#D1D5DB", // Example of changing secondary color
          "base-100": "#000000", // Background color for dark mode
          "base-content": "#c4c4c4", // Font color for dark mode
        },
      },
      "light",
    ],
  },
};
