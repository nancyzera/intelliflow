/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00E5FF',
          purple: '#9D4EDD'
        }
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 229, 255, 0.4), 0 0 40px rgba(157, 78, 221, 0.3)'
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}


