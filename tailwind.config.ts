import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        // Paleta acolhedora e leve
        offwhite: '#FAFAFA',
        anthracite: '#333333',
        // Azul Sereno
        serene: {
          50: '#F0F5FA',
          100: '#DCEAF5',
          200: '#B8D4EB',
          300: '#8FB8DB',
          400: '#6A9BC9',
          500: '#4A7FB5', // principal
          600: '#3A6699',
          700: '#2F537D',
          800: '#264061',
          900: '#1D2F48',
        },
        // Verde Sálvia
        sage: {
          50: '#F2F6F3',
          100: '#E3ECE5',
          200: '#C7D9CB',
          300: '#A5C0AB',
          400: '#87A88F',
          500: '#6B9075', // principal
          600: '#55745E',
          700: '#445D4B',
          800: '#36493C',
          900: '#27362C',
        },
        // Tons neutros suaves
        warm: {
          50: '#FAFAFA',
          100: '#F5F5F4',
          200: '#EBEAE8',
          300: '#D9D7D4',
          400: '#A8A6A2',
          500: '#77756F',
          600: '#555350',
          700: '#3F3D3B',
          800: '#2B2A28',
          900: '#1A1918',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 40px -10px rgba(74, 127, 181, 0.15), 0 4px 20px -4px rgba(0, 0, 0, 0.04)',
        'soft-xl': '0 20px 60px -15px rgba(74, 127, 181, 0.2), 0 8px 30px -6px rgba(0, 0, 0, 0.06)',
        'inner-soft': 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backgroundImage: {
        'gradient-serene': 'linear-gradient(135deg, #F0F5FA 0%, #FAFAFA 100%)',
        'gradient-sage': 'linear-gradient(135deg, #F2F6F3 0%, #FAFAFA 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F4 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
