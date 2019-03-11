const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    open: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, path.join(__dirname, 'src/static/lib')],
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/plugin-transform-runtime'],
            ['@babel/plugin-transform-async-to-generator']
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
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
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/static'), to: 'static' }
    ]),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.join(__dirname, 'index.html'),
      favicon: path.join(__dirname, 'src/static/img/favicon.ico'),
      inject: true
    })
  ]
}