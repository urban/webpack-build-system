var getConfig = require('@urban/webpack-build-system')

module.exports = getConfig({
  entry: 'src/index.js',
  output: {
    path: 'public/'
  }
})
