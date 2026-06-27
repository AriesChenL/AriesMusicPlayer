/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          // 蓝色单色渐变强调色（调色板 50→950）
          DEFAULT: '#307fb6',
          light: '#5ca9e3',
          dark: '#005b90',
          hover: '#3f8dc5',
          pressed: '#005b90',
          // 数值梯度：与调色板一一对应
          50: '#b3ffff',
          100: '#96e4ff',
          200: '#79c6ff',
          300: '#5ca9e3',
          400: '#3f8dc5',
          500: '#307fb6',
          600: '#005b90',
          700: '#00396b',
          800: '#001848',
          900: '#00002f',
          950: '#02001b'
        },
        secondary: {
          DEFAULT: '#3a5a78',
          light: '#9fb3c8',
          dark: '#6e8aa4'
        },
        dark: {
          // 深海军蓝窗口 / 面板层级（设计稿 --win / --panel / --panel2 / --elev）
          DEFAULT: '#060b18',
          100: '#0c1426',
          200: '#111a30',
          300: '#16213c'
        },
        light: {
          DEFAULT: '#fff',
          100: '#f0f6fc',
          200: '#e4eef7',
          300: '#d7e6f3'
        }
      }
    }
  },
  plugins: []
};
