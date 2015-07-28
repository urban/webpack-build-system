import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import buildBanner from './build-banner'

export default function (config, pack) {

  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false
    }),
    new ExtractTextPlugin(config.output.cssFilename, {
      allChunks: true
    }),
    new webpack.BannerPlugin(buildBanner(pack, {raw: false, entryOnly: false}))
  )

  // add `extract-text-webpack-plugin` to all loaders with the `style-loader`
  config.module.loaders.forEach((item) => {
    if (typeof item.loader != 'string' || !item.loader.match('style-loader')) return

    const [styleLoader, ...otherLoaders] = item.loader.split('!')
    item.loader = ExtractTextPlugin.extract(styleLoader, otherLoaders.join('!'))
  })

  return config
}
