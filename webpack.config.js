const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// Inspired by vue-devtools build process
// https://github.com/vuejs/vue-devtools/blob/master/shells/createConfig.js

const bubleOptions = {
  objectAssign: 'Object.assign',
  transforms: {
    forOf: false,
    modules: false
  }
}

let config = {
  entry: {
    popup: './src/popup/popup.js',
    options: './src/options/options.js',
    background: './src/background/index.js',
    blocker: './src/blocker/blocker.js',
  },
  output: {
    filename: '[name]/[name].js',
    path: path.join(__dirname, 'build')
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: bubleOptions
      },
      {
        test: /\.vue$/, 
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          },
          transpileOptions: bubleOptions
        } 
      },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../fonts'
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      name: 'popup',
      title: 'Popup - Chronos',
      filename: 'popup/popup.html',
      template: 'src/template.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      name: 'options',
      title: 'Options - Chronos',
      filename: 'options/options.html',
      template: 'src/template.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      name: 'blocker',
      title: 'Blocked Page - Chronos',
      filename: 'blocker/blocker.html',
      template: 'src/template.html',
      chunks: ['blocker']
    }),
    new CopyWebpackPlugin([
      { from: 'src/manifest.json' },
      { from: 'src/icons/', to: 'icons/' }
    ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  mode: 'production',
  devtool: false,
  target: 'web',
  cache: true
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    })
  )
} else {
  const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
  const smp = new SpeedMeasurePlugin()
  config = smp.wrap(config)
}

module.exports = config