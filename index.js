require('babel/register', {
  stage: 1,
  loose: 'all'
})

module.exports = require('./lib/make-config')
