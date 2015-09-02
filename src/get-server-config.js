/* @flow */
import webpack, { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack'
import merge from 'lodash.merge'

export default function getDevServerConfig (config: Object): Object {

  const host = config.devServer.host || 'localhost'
  const port = config.devServer.port || 3000

  return merge({}, config, {
    devtool: 'eval',
    entry: [
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      config.entry
    ],
    devServer: {
      contentBase: './public',
      colors: true,
      host,
      port,
      info: false,
      historyApiFallback: true
    },
    module: {
      loaders: [
        ...config.module.loaders,
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          loaders: [ 'react-hot-loader', 'babel-loader' ]
        }
      ]
    },
    plugins: [
      ...config.plugins,
      new HotModuleReplacementPlugin(),
      new NoErrorsPlugin()
    ]
  })
}
