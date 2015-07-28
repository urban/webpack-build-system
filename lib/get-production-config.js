'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _buildBanner = require('./build-banner');

var _buildBanner2 = _interopRequireDefault(_buildBanner);

exports['default'] = function (config, pack) {

  config.plugins.push(new _webpack2['default'].optimize.DedupePlugin(), new _webpack2['default'].optimize.OccurenceOrderPlugin(true), new _webpack2['default'].optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourceMap: false
  }), new _extractTextWebpackPlugin2['default'](config.output.cssFilename, {
    allChunks: true
  }), new _webpack2['default'].BannerPlugin(_buildBanner2['default'](pack, { raw: false, entryOnly: false })));

  // add `extract-text-webpack-plugin` to all loaders with the `style-loader`
  config.module.loaders.forEach(function (item) {
    if (typeof item.loader != 'string' || !item.loader.match('style-loader')) return;

    var _item$loader$split = item.loader.split('!');

    var styleLoader = _item$loader$split[0];

    var otherLoaders = _item$loader$split.slice(1);

    item.loader = _extractTextWebpackPlugin2['default'].extract(styleLoader, otherLoaders.join('!'));
  });

  return config;
};

module.exports = exports['default'];