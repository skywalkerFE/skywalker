const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const components = require('../component.json')
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function setLibrary() {
  let res = []

  Object.keys(components).forEach(x => {
    res.push(x)
  })
  return res
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: components,
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
  },
  output: {
    path: resolve('lib'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    library: setLibrary(),
    libraryTarget: 'var'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: ExtractTextPlugin.extract({ use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]})
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: [
          'vue-style-loader',
          'css-loader'
        ]})
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('packages')],
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/plugin-transform-runtime'],
            ['@babel/plugin-transform-async-to-generator']
          ]
        }
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
    new EsmWebpackPlugin(),
    new VueLoaderPlugin(),
    new ExtractTextPlugin('[name]/style/index.css')
  ]
}