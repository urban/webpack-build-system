'use strict';

exports.__esModule = true;
exports['default'] = buildFilename;

function buildFilename(pack, hash, ext) {
  return [pack.name,
  // extract-text-plugin uses [contenthash] and webpack uses [hash]
  hash ? ext === 'css' ? '[contenthash]' : '[hash]' : pack.version, ext || 'js'].join('.');
}

module.exports = exports['default'];