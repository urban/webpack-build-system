import webpack from 'webpack'

export default function getDevServerConfig (config) {

  const devServer = Object.assign({}, {
      contentBase: './public',
      colors: true,
      host: 'localhost',
      port: 3000,
      info: false,
      historyApiFallback: true
    }, config.devServer)

  const devConfig = Object.assign({}, config, {
    devtool: 'eval',
    entry: [
      `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
      'webpack/hot/only-dev-server',
      config.entry
    ],
    devServer,
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
