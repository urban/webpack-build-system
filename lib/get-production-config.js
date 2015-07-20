import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

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

  config.module.loaders.forEach((loader) => {
    if (!loader.test.test('.css')) return
    loader.loader = ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
  })

  return config
}

function buildBanner (pack) {
  const now = new Date()
  const year = now.getFullYear()
  const dateStamp = now.toISOString()
  return (

`${pack.name} v${pack.version}

Copyright ${year} ${pack.author}
Released under the ${pack.license} license

Date: ${dateStamp}`

  )
}
