/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,ts,js}'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          muted: 'var(--muted)',
          text: 'var(--text)',
          textMuted: 'var(--text-muted)',
          border: 'var(--border)',
          primary: {
            DEFAULT: 'var(--primary)',
            100: 'var(--primary-100)',
            600: 'var(--primary-600)',
          },
        },
        boxShadow: {
          soft: '0 6px 20px rgba(0,0,0,0.12)',
          card: '0 8px 24px rgba(0,0,0,0.14)',
        },
        borderRadius: { xl: '14px' },
      },
    },
    plugins: [],
  };
  