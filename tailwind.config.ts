import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f7ff',
          100: '#ececff',
          500: '#605dff',
          700: '#433fd6',
          900: '#23223f'
        }
      },
      boxShadow: {
        soft: '0 8px 32px rgba(35, 34, 63, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
