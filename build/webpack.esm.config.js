const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [resolve('packages/index.js')]
  },
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
    filename: 'skywalker.esm.js',
    chunkFilename: '[id].js',
    library: 'skywalker',
    libraryTarget: 'var'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
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
    new VueLoaderPlugin()
  ]
}
