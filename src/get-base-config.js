/* @flow */
import webpack from 'webpack'
import { join } from 'path'
import cssnext from 'cssnext'

export default function getBaseConfig (isDev: boolean = false, isVerbose: boolean = false): Object {

  const cssLocalIdentityName = '[name]---[local]---[hash:base64:5]'
  const cssModules = `css-loader?modules&importLoaders=1&localIdentityName=${cssLocalIdentityName}`

  return {

    output: {
      publicPath: '/',
      libraryTarget: 'umd'
    },

    resolve: {
      fallback: join(__dirname, 'node_modules'),
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      packageAlias: 'browser'
    },

    cache: isDev,
    debug: isDev,

    stats: {
      colors: true,
      reasons: isDev,
      hash: isVerbose,
      version: isVerbose,
      timings: true,
      chunks: isVerbose,
      chunkModules: isVerbose,
      cached: isVerbose,
      cachedAssets: isVerbose
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin()
    ],

    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: `style-loader!${cssModules}!postcss-loader`
        },
        {
          test: /\.png/,
          loader: 'url-loader?limit=8192&mimetype=image/png'
        },
        {
          test: /\.jpg/,
          loader: 'url-loader?limit=8192&mimetype=image/jpg'
        },
        {
          test: /\.gif/,
          loader: 'url-loader?limit=8192&mimetype=image/gif'
        },
        {
          test: /\.svg/,
          loader: 'url-loader?limit=8192&mimetype=image/svg+xml'
        },
        {
          test: /\.otf/,
          loader: 'url-loader?limit=100000&mimetype=font/otf'
        },
        {
          test: /\.eot/,
          loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
        }, {
          test: /\.woff2/,
          loader: 'url-loader?limit=100000&mimetype=application/font-woff2'
        }, {
          test: /\.woff/,
          loader: 'url-loader?limit=100000&mimetype=application/font-woff'
        }, {
          test: /\.ttf/,
          loader: 'url-loader?limit=100000&mimetype=application/font-ttf'
        }
      ]
    },

    postcss: [ cssnext() ]
  }
}
