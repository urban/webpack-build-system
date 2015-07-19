import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default function (config) {

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
    })
  )

  config.module.loaders.forEach((loader) => {
    if (!loader.test.test('.css')) return
    loader.loader = ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
  })

  return config
}
