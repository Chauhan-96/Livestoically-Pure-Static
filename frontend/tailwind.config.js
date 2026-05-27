export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F7F5F0',
        'charcoal': '#1C1C1A',
        'muted': '#6B6860',
        'forest': '#4A7C59',
        'border': '#E8E4DC',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Lora', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '680px',
            color: '#1C1C1A',
            'h1,h2,h3,h4,h5,h6': {
              fontFamily: 'Playfair Display, serif',
              color: '#1C1C1A',
            },
            'a': {
              color: '#4A7C59',
              '&:hover': {
                color: '#2E5A42',
              }
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
