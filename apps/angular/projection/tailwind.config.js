const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        "light-green": 'rgba(0, 250, 0, 0.1)',
        "light-red": 'rgba(250, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
};
