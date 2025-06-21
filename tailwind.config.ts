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
        pretendard: ['var(--font-pretendard)'],
        'gyeonggi-batang': ['var(--font-gyeonggi-batang)'],
      },
      colors: {
        primary01: '#4F46E5',
        primary02: '#6962E8',
        primary03: '#847EEB',
        primary04: '#9E99EE',
        primary05: '#B9B5F1',
        white01: '#FFFFFF',
        black01: '#000000',
        black02: '#333333',
        black03: '#666666',
        grey01: '#F8F8F8',
        grey02: '#EBEBEB',
        grey03: '#DCDCDC',
        grey04: '#C2C2C2',
        grey05: '#A7A7A7',
        grey06: '#8D8D8D',
        grey07: '#727272',
        grey08: '#585858',
        red01: '#F43A24',
        yellow01: '#FFC107',
        green01: '#249F3D',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        tablog: {
          primary: '#4F46E5',
          secondary: '#fde047',
          accent: '#1fb2a6',
          neutral: '#2a2e37',
          'base-100': '#ffffff',
          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#F43A24',
        },
      },
    ],
  },
};
export default config;
