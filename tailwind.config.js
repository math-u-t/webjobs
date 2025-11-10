/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          primary: '#3B82F6',
          secondary: '#10B981',
          background: '#FFFFFF',
          surface: '#F9FAFB',
          'text-primary': '#111827',
          'text-secondary': '#6B7280',
          border: '#E5E7EB',
        },
        // Dark mode colors
        dark: {
          primary: '#60A5FA',
          secondary: '#34D399',
          background: '#0F172A',
          surface: '#1E293B',
          'text-primary': '#F8FAFC',
          'text-secondary': '#94A3B8',
          border: '#334155',
        },
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
