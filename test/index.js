import test from 'tape'

import fs from 'fs'
import { join } from 'path'
import webpack from 'webpack'
import getConfig from '../src'
import rimraf from 'rimraf'
import merge from 'lodash.merge'

const outputDir = join(__dirname, '../dist/')
const outputFile = join.bind(null, outputDir)
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
const readFilePromise = promisify(fs.readFile)

const baseConfig = {
  entry: join(__dirname, './fixtures/index.jsx'),
  output: { path: outputDir }
}

const basePkg = {
  name: 'test-project',
  version: '1.0.0',
  author: 'Urban Faubion',
  license: 'MIT'
}

test('It works.', function (assert) {
  assert.plan(3)
  webpackPromise(getConfig(baseConfig, basePkg))
    .then(function (stats) {
      assert.pass('No fatal error.')
      const jsonStats = stats.toJson()
      assert.equal(jsonStats.errors.length, 0, 'No webpack errors.')
      assert.equal(jsonStats.warnings.length, 0, 'No webpack warnings.')
      removeOutput(assert.end)
    })
    .catch(console.log)
})

test('It throws errors.', function (assert) {
  assert.plan(2)
  assert.throws(function () { getConfig() }, 'Throws error when passed no config.')
  assert.throws(function () { 
    getConfig(baseConfig, null)
  }, 'Throws error with improper `pacakge.json` file properties.')
  assert.end()
})

test('It should output bundle names based on the project name.', function (assert) {
  assert.plan(2)
  const config = getConfig(baseConfig, basePkg)
  assert.equal(config.output.filename, 'test-project.1.0.0.js')
  assert.equal(config.output.cssFilename, 'test-project.1.0.0.css')
  assert.end()
})

test('It should allow custom bundle names.', function (assert) {
  assert.plan(2)
  const config = getConfig(merge({}, baseConfig, {
      output: {
        filename: 'bundle.js',
        cssFilename: 'bundle.css'
      }
    }), basePkg)
  assert.equal(config.output.filename, 'bundle.js')
  assert.equal(config.output.cssFilename, 'bundle.css')
  assert.end()
})

test('It should output bundles to disk.', function (assert) {
  assert.plan(2)
  webpackPromise(getConfig(baseConfig, basePkg))
    .then(function (stats) {
      assert.pass('no fatal error.')
      return Promise.all([
        readFilePromise(outputFile('test-project.1.0.0.js')),
        readFilePromise(outputFile('test-project.1.0.0.css'))
      ])
    })
    .then(function (results) {
      assert.pass('files exists.')
      removeOutput(assert.end)
    })
    .catch(console.log)
})
