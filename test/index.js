import test from 'tape'

// import fs from 'fs'
import { join } from 'path'
import webpack from 'webpack'
import getConfig from '../src'
import rimraf from 'rimraf'

const outputDir = join(__dirname, '../dist/')
// const outputFile = join.bind(null, outputDir)
const removeOutput = rimraf.bind(null, outputDir)

function promisify (fn, context = {}) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      fn.apply(context, [...args, function (err, ...result) {
        if (err) return reject(err)
        resolve.apply(null, result)
      }])
    })
  }
}

const webpackPromise = promisify(webpack)
// const readFilePromise = promisify(fs.readFile)

test('It works.', function (assert) {
  assert.plan(3)
  webpackPromise(getConfig({
      entry: join(__dirname, './fixtures/index.jsx'),
      output: {
        path: outputDir
      }
    })
  )
  .then(function (stats) {
    assert.pass('No fatal error.')
    const jsonStats = stats.toJson()
    assert.equal(jsonStats.errors.length, 0, 'No webpack errors.')
    assert.equal(jsonStats.warnings.length, 0, 'No webpack warnings.')
    removeOutput(assert.end)
  })
  .catch(console.log)
})
