/* @flow */
import webpack from 'webpack'

export default function getDevServerConfig (config: Object): Object {

  const devServer = Object.assign({}, {
      contentBase: './public',
      colors: true,
      host: 'localhost',
      port: 3000,
      info: false,
      historyApiFallback: true
    }, config.devServer)

  return Object.assign({}, config, {
    devtool: 'eval',
    entry: [
      `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
      'webpack/hot/only-dev-server',
      config.entry
    ],
    devServer,
    module: Object.assign({}, config.module, {
      // add react-hot-loader to /\.js(x?)$/
      loaders: config.module.loaders.map((item) => {
        if (!item.test.test(/\.js(x?)$/)) return item
        return Object.assign({}, item, {
          loaders: [
            'react-hot-loader',
            ...item.loaders
          ]
        })
      })
    }),
    plugins: [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  })
}
