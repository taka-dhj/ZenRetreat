/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif-ja': ['Zen Old Mincho', 'serif'],
        'serif-en': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
