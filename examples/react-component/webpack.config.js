'use strict'

var getConfig = require('@urban/webpack-build-system')

module.exports = getConfig({
  entry: 'src/index.jsx',
  output: {
    path: 'public/'
  }
})
