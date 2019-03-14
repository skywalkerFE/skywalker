const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [resolve('packages/index.css.js')]
  },
  output: {
    path: resolve('lib'),
    filename: 'index.css.js'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ExtractTextPlugin.extract({ use: [
          'css-loader',
          'stylus-loader'
        ]})
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: [
          'css-loader'
        ]})
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        loaders: 'url-loader?limit=0&name=static/img/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loaders: 'file-loader?name=static/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('skywalker.css')
  ]
}
