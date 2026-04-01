/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',      
        surface: '#FFFFFF',          

        primary: '#2563EB',         
        primaryLight: '#60A5FA',     
        primaryDark: '#1E40AF',     

        accent: '#06B6D4',           
        accentLight: '#67E8F9',

        textPrimary: '#0F172A',      
        textSecondary: '#475569',   

        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',

        border: '#E2E8F0',
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