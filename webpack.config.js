const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:7].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:7].[ext]',
          outputPath: 'media'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:7].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
    open: true,
    host: '0.0.0.0' // 允许外部设备访问
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}