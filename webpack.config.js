const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Inspired by vue-devtools build process
// https://github.com/encadyma/vue-devtools/blob/master/shells/createConfig.js

const bubleOptions = {
  objectAssign: 'Object.assign',
  transforms: {
    forOf: false,
    modules: false
  }
}

module.exports = {
  entry: {
    popup: './src/popup/popup.js',
    options: './src/options/options.js',
    background: './src/background/index.js'
  },
  output: {
    filename: '[name]/[name].js',
    path: path.join(__dirname, 'build')
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
          transpileOptions: bubleOptions
        } 
      },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
    ]
  },
  plugins: [
    // new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      name: 'popup',
      filename: 'popup/popup.html',
      template: 'src/template.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      name: 'options',
      filename: 'options/options.html',
      template: 'src/template.html',
      chunks: ['options']
    }),
    new CopyWebpackPlugin([
      { from: 'src/manifest.json' }
    ])
  ],
  mode: 'production'
}