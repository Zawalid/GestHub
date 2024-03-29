/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "background-tertiary": "var(--background-tertiary)",
        "background-disabled": "var(--background-disabled)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-disabled": "var(--text-disabled)",
        "text-placeholder": "var(--text-placeholder)",
        border: "var(--border)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".child-padding": {
          "> *": {
            paddingInline: "1.25rem",
          },
          "@media (min-width: 640px)": {
            "> *": {
              paddingInline: "2rem",
            },
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
