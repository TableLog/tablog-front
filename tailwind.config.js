import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
        'gyeonggi-title': ['var(--font-gyeonggi-title)', 'sans-serif'],
        'gyeonggi-batang': ['var(--font-gyeonggi-batang)', 'sans-serif'],
      },
      colors: {
        primary01: '#d66060',
        primary02: '#e49898',
        primary03: '#e9a9a9',
        primary04: '#edb7b7',
        primary05: '#f2cfcf',
        white01: '#ffffff',
        black01: '#0e0e0e',
        black02: '#0e0e0e',
        black03: '#0e0e0e',
        grey01: '#5d5d5d',
        grey02: '#6d6d6d',
        grey03: '#808080',
        grey04: '#acacac',
        grey05: '#bababa',
        grey06: '#c6c6c6',
        grey07: '#e8e8e8',
        grey08: '#f5f5f5',
        red01: '#e73f3f',
        yellow01: '#ffc60a',
        green01: '#328e6e',
      },
      fontWeight: {
        thin: 100,
        extraLight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
        black: 900,
      },
      boxShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        tablog: {
          primary: '#d66060',
          'primary-content': '#ffffff',
          secondary: '#e49898',
          'secondary-content': '#ffffff',
          accent: '#d66060',
          'accent-content': '#ffffff',
          neutral: '#acacac',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f5f5f5',
          'base-300': '#e8e8e8',
          'base-content': '#0e0e0e',
          info: '#c6c6c6',
          'info-content': '#ffffff',
          success: '#328e6e',
          'success-content': '#ffffff',
          warning: '#ffc60a',
          'warning-content': '#0e0e0e',
          error: '#e73f3f',
          'error-content': '#ffffff',
        },
      },
    ],
  },
};

export default config;
