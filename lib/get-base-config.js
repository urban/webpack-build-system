import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import querystring from 'querystring'

export default function getBaseConfig (config) {

  const cssLoaderOptions = querystring.stringify({
    modules: true,
    importLoaders: 1,
    localIdentName: '[path][name]---[local]---[hash:base64:5]'
  })
  const cssLoader = `css-loader?${cssLoaderOptions}`

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
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: `style-loader!${cssLoader}!cssnext-loader`
        },
        {
          test: /\.less$/,
          loader: `style-loader!${cssLoader}!autoprefixer-loader!less-loader`
        },
        {
          test: /\.sass$/,
          loader: `style-loader!${cssLoader}!autoprefixer-loader!sass-loader?indentedSyntax`
        },
        {
          test: /\.scss$/,
          loader: `style-loader!${cssLoader}!autoprefixer-loader!sass-loader`
        },
        {
          test: /\.styl$/,
          loader: `style-loader!${cssLoader}!autoprefixer-loader!stylus-loader`
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192'
        }, // inline base64 URLs for <=8k images, direct URLs for the rest
        {
          test: /\.(otf|eot|svg|ttf|woff)/,
          loader: 'url-loader?limit=10000'
        }
      ]
    }
  }
}
