import getBaseConfig from './get-base-config'
import getServerConfig from './get-server-config'
import getProductionConfig from './get-production-config'
import lookup from 'look-up'
import merge from 'lodash.merge'
import {resolve} from 'path'

export default function getConfig (props, isDev) {

  if (isMissingProperties(props)) {
    return errorForMissingProperties()
  }

  const pack = require(lookup('package.json', {cwd: process.cwd()}))

  if (isMissingPackageProperties(pack)) {
    return errorForMissingPackageProperties()
  }

  // figure out if we're running `webpack` or `webpack-dev-server`
  // we'll use this as the default for `isDev`
  isDev = isDev || process.argv[1].indexOf('webpack-dev-server') !== -1

  // entry must be an absolute path
  props.entry = resolve(props.entry)

  // add in our defaults
  var config = merge(getBaseConfig(), props)

  if (!config.output.filename) {
    config.output.filename = isDev ? 'bundle.js' : buildFilename(pack, config.output.hash, 'js')
  }

  if (!config.output.cssFilename) {
    config.output.cssFilename = isDev ? 'bundle.css' : buildFilename(pack, config.output.hash, 'css')
  }

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

function buildFilename (pack, hash, ext) {
  return [
    pack.name,
    // extract-text-plugin uses [contenthash] and webpack uses [hash]
    hash ? (ext === 'css' ? '[contenthash]' : '[hash]') : pack.version,
    ext || 'js'
  ].join('.')
}

function isDefined (value) {
  return (value !== undefined && value !== null)
}
