'use strict';

exports.__esModule = true;
exports['default'] = getBaseConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function getBaseConfig(config) {

  var cssLoaderOptions = _querystring2['default'].stringify({
    modules: true,
    importLoaders: 1,
    localIdentName: '[path][name]---[local]---[hash:base64:5]'
  });
  var cssLoader = 'css-loader?' + cssLoaderOptions;

  return {
    output: {
      publicPath: '/',
      hash: false
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      packageAlias: 'browser'
    },
    plugins: [new _webpack2['default'].DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }), new _htmlWebpackPlugin2['default']()],
    module: {
      loaders: [{
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!' + cssLoader + '!cssnext-loader'
      }, {
        test: /\.less$/,
        loader: 'style-loader!' + cssLoader + '!autoprefixer-loader!less-loader'
      }, {
        test: /\.sass$/,
        loader: 'style-loader!' + cssLoader + '!autoprefixer-loader!sass-loader?indentedSyntax'
      }, {
        test: /\.scss$/,
        loader: 'style-loader!' + cssLoader + '!autoprefixer-loader!sass-loader'
      }, {
        test: /\.styl$/,
        loader: 'style-loader!' + cssLoader + '!autoprefixer-loader!stylus-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=10000'
      }]
    }
  };
}

module.exports = exports['default'];