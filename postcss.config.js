var autoprefixer = require('autoprefixer');
var reporter = require('postcss-reporter');

module.exports = {
  plugins: [
    autoprefixer,
    reporter(),
  ],
};