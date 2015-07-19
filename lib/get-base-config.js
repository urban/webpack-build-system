import webpack from 'webpack'
import autoPrefixer from 'autoprefixer-core'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default function getBaseConfig(config) {
  return {
    output: {
      publicPath: '/',
      hash: false
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      packageAlias: 'browser'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new HtmlWebpackPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        },
        {
          test: /\.json$/,
          loaders: ['json']
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader'
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192'
        }, // inline base64 URLs for <=8k images, direct URLs for the rest
        {
          test: /\.(otf|eot|svg|ttf|woff)/,
          loader: 'url-loader?limit=10000'
        }
      ],
      postcss: [autoPrefixer]
    }
  }
}
