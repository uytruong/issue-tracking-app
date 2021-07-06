console.log('TAILWINDCSS --> ', process.env.TAILWIND_MODE);

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,html}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
