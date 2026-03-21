/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#F5F5F5',
        softBlue: '#C7E2FF',
        orchidPink: '#E774C7',
        deepBlue: '#003893',
        textPrimary: '#003893',
        textSecondary: '#333',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      fontSize: {
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '24px',
      },
    },
  },
  plugins: [],
}