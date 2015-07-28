'use strict';

exports.__esModule = true;
exports['default'] = getDevServerConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function getDevServerConfig(config) {

  var host = config.devServer && config.devServer.host || 'localhost';
  var port = config.devServer && config.devServer.port || 3000;

  var devConfig = Object.assign({}, config, {
    devtool: 'eval',
    entry: ['webpack-dev-server/client?http://' + host + ':' + port, 'webpack/hot/only-dev-server', config.entry],
    devServer: {
      contentBase: './public',
      colors: true,
      port: port,
      host: host,
      info: false,
      historyApiFallback: true
    },
    plugins: config.plugins.concat([new _webpack2['default'].HotModuleReplacementPlugin(), new _webpack2['default'].NoErrorsPlugin()])
  });

  // add react-hot-loader to /\.js(x?)$/
  devConfig.module.loaders.forEach(function (loader) {
    if (!loader.test.test('.jsx')) return;
    loader.loaders.unshift('react-hot-loader');
  });

  return devConfig;
}

module.exports = exports['default'];