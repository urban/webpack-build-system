/* @flow */
import isDefined from './is-defined'
import getBaseConfig from './get-base-config'
import getServerConfig from './get-server-config'
import getProductionConfig from './get-production-config'
import buildFilename from './build-filename'
import lookup from 'look-up'
import {resolve} from 'path'

// figure out if we're running `webpack` or `webpack-dev-server`
// we'll use this as the default for `isDev`
const isWebpackDevServer = (process.argv[1] || '').indexOf('webpack-dev-server') !== -1

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
  var config = Object.assign({
      filename: buildFilename(pack, config.output.hash, 'js'),
      cssFilename: buildFilename(pack, config.output.hash, 'css')
    },
    getBaseConfig(),
    props)

  // dev specific stuff
  if (isDev) {
    config = getServerConfig(config)
  } else {
    config = getProductionConfig(config, pack)
  }

  return config
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
