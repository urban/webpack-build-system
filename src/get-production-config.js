/* @flow */
import webpack, { DefinePlugin, BannerPlugin } from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import buildBanner from './build-banner'
import merge from 'lodash.merge'

export default function (config: Object, pack: Object): Object {

  const loaders = config.module.loaders.map((item) => {
    if (typeof item.loader !== 'string' || !item.loader.match('style-loader')) {
      return item
    }

    const [styleLoader, ...otherLoaders] = item.loader.split('!')
    return Object.assign({}, item, {
      loader: ExtractTextPlugin.extract(styleLoader, otherLoaders.join('!'))
    })
  })

  return merge({}, config, {
    module: { 
      loaders: [
        ...loaders,
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          loaders: [ 'babel-loader' ]
        }
      ]
    },
    plugins: [
      ...config.plugins,
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'develope'
      }),
//       new webpack.optimize.UglifyJsPlugin({
//         compress: { warnings: false },
//         output: { comments: false },
//         sourceMap: false
//       }),
      new ExtractTextPlugin(config.output.cssFilename, { allChunks: true }),
      new BannerPlugin(buildBanner(pack, {raw: false, entryOnly: false}))
    ]
  })
}
