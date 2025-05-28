module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true, // Not needed for Tailwind CSS v1
  },
  purge: [ // For Tailwind v1.x
    './index.html', // If your main HTML file is in the root
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.ts', // For TypeScript files
    './src/**/*.js', // If you have any JS files
    './src/**/*.jsx', // If using JSX
    './src/**/*.tsx', // If using TSX
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
