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

  // add react-hot-loader to /\.js(x?)$/
  const loaders = config.module.loaders.map( (item) => {
    if (!item.test.test(/\.js(x?)$/)) return item
    return Object.assign({}, item, {
      loaders: [
        'react-hot-loader',
        ...item.loaders
      ]
    })
  })

  return Object.assign({}, config, {
    devtool: 'eval',
    entry: [
      `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
      'webpack/hot/only-dev-server',
      config.entry
    ],
    devServer,
    plugins: [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  })
}
