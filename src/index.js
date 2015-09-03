/* @flow */
import invariant from 'invariant'
import isDefined from './is-defined'
import getBaseConfig from './get-base-config'
import getServerConfig from './get-server-config'
import getProductionConfig from './get-production-config'
import buildFilename from './build-filename'
import lookup from 'look-up'
import { resolve } from 'path'
import merge from 'lodash.merge'

const isWebpackDevServer = process.argv.includes('webpack-dev-server')
const WATCH = process.argv.includes('watch')
const DEBUG = !process.argv.includes('release')
const VERBOSE = process.argv.includes('verbose')

const projectPackage = require(lookup('package.json', { cwd: process.cwd() }))

export default function getConfig (props: Object, pkg: Object = projectPackage, isDev: boolean = isWebpackDevServer): Object {

  invariant(
    props && props.entry && props.output && props.output.path,
    'Must pass in config options object with `entry` and `output.path` properties'
  )

  invariant(
    pkg && pkg.name && pkg.version && pkg.author && pkg.license,
    'Your `package.json` file must container `name`, `version`, `author` and `license` properties.'
  )

  // entry must be an absolute path
  props.entry = resolve(props.entry)

  // add in our defaults
  const baseConfig = getBaseConfig(DEBUG, VERBOSE)
  var config = merge({
    output: {
      filename: buildFilename(pkg, 'js'),
      cssFilename: buildFilename(pkg, 'css')
    }
  }, baseConfig, props)

  return isDev ? getServerConfig(config) : getProductionConfig(config, pkg)
}
