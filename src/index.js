/* @flow */
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

export default function getConfig (props: Object, isDev: boolean = isWebpackDevServer): Object {

  if (isMissingProperties(props)) {
    return errorForMissingProperties()
  }

  const pack = require(lookup('package.json', {cwd: process.cwd()}))

  if (isMissingPackageProperties(pack)) {
    return errorForMissingPackageProperties()
  }

  // entry must be an absolute path
  props.entry = resolve(props.entry)

  // add in our defaults
  const baseConfig = getBaseConfig(DEBUG, VERBOSE)
  var config = merge({
    output: {
      filename: buildFilename(pack, 'js'),
      cssFilename: buildFilename(pack, 'css')
    }
  }, baseConfig, props)

  return isDev ? getServerConfig(config) : getProductionConfig(config, pack)
}

function isMissingProperties (props) {
  return (
    !isDefined(props) ||
    !isDefined(props.entry) ||
    !isDefined(props.output.path)
  )
}

function isMissingPackageProperties (props) {
  return (
    !isDefined(props) ||
    !isDefined(props.name) ||
    !isDefined(props.version) ||
    !isDefined(props.author) ||
    !isDefined(props.license)
  )
}

function errorForMissingProperties () {
  throw new Error('Must pass in options with `entry` and `output.path` properties')
}

function errorForMissingPackageProperties () {
  throw new Error('Your `package.json` file must container `name`, `version`, `author` and `license` properties.')
}
