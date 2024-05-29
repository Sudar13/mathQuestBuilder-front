const defaultTheme = require('tailwindcss/defaultTheme');

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './src/**/*.jsx',
    './src/**/**/*.jsx',
  ],
  theme: {
    extend: {
      keyframes: {},
      animation: {},
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
});
