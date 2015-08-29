/* @flow */
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import buildBanner from './build-banner'

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

  return Object.assign({}, config, {
    module: Object.assign({}, config.module, { loaders }),
    plugins: [
      ...config.plugins,
       new webpack.optimize.OccurenceOrderPlugin(true),
       new webpack.optimize.UglifyJsPlugin({
         compress: { warnings: false },
         output: { comments: false },
         sourceMap: false
       }),
      new ExtractTextPlugin(config.output.cssFilename, { allChunks: true }),
      new webpack.BannerPlugin(buildBanner(pack, {raw: false, entryOnly: false}))
    ]
  })
}
