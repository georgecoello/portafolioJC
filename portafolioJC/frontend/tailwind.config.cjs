module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        'jc-bg': 'var(--jc-bg)',
        'jc-surface': 'var(--jc-surface)',
        'jc-primary': 'var(--jc-primary)',
        'jc-accent': 'var(--jc-blue)',
        'jc-accent-2': 'var(--jc-cyan)',
        'jc-text': 'var(--jc-text)',
        'jc-muted': 'var(--jc-muted)'
      },
      backgroundImage: {
        'jc-gradient': 'var(--jc-gradient)'
      }
    },
  },
  plugins: [],
}
