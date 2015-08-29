/* @flow */
import webpack from 'webpack'
import { join } from 'path'
import cssnext from 'cssnext'

export default function getBaseConfig (config: Object = {}): Object {

  const cssLocalIdentityName = '[name]---[local]---[hash:base64:5]'
  const cssModules = `css-loader?modules&importLoaders=1&localIdentityName=${cssLocalIdentityName}`

  return {

    output: {
      publicPath: '',
      hash: false,
      libraryTarget: 'umd'
    },

    resolve: {
      fallback: join(__dirname, 'node_modules'),
      extensions: ['', '.js', '.jsx', '.json'],
      packagealias: 'browser'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],

    module: {
      loaders: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: `style-loader!${cssModules}!postcss-loader`
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192'
        }, // inline base64 URLs for <=8k images, direct URLs for the rest
        {
          test: /\.(otf|eot|svg|ttf|woff)/,
          loader: 'url-loader?limit=10000'
        }
      ]
    },

    postcss: [ cssnext() ]
  }
}
