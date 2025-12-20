module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
        colors: {
            'primary': 'var(--primary)',
            'primary-light': 'var(--primary-light)',
            'primary-dark': 'var(--primary-dark)',
        }
    }
  },
  plugins: []
}
