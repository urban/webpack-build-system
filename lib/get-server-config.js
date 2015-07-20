import webpack from 'webpack'

export default function getDevServerConfig (config) {

  const host = (config.devServer && config.devServer.host) || 'localhost'
  const port = (config.devServer && config.devServer.port) || 3000

  var devConfig = Object.assign({}, config, {
    devtool: 'eval',
    entry: [
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      config.entry
    ],
    devServer: {
      contentBase: './public',
      colors: true,
      port,
      host,
      info: false,
      historyApiFallback: true
    },
    plugins: config.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ])
  })

  // add react-hot-loader to /\.js(x?)$/
  devConfig.module.loaders.forEach((loader) => {
    if (!loader.test.test('.jsx')) return
    loader.loaders.unshift('react-hot-loader')
  })

  return devConfig
}
