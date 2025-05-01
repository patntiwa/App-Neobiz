
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media', // automatique selon le navigateur
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#2A3F5D',
        turquoise: '#2EC4B6',
        grayLight: '#F5F7FA',
        darkText: '#333333',
        darkGray: '#4A4A4A',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
