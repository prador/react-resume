const autoprefixer = require('autoprefixer')
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './dev/js/index'
  ],
  output: {
    path: path.join(__dirname, 'prod'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'react-hot',
      include: path.join(__dirname, 'dev/js'),
    },
    {
      test: /\.jsx?$/,
      include: path.join(__dirname, 'dev/js'),
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "stage-1", "stage-2"],
        "plugins": ["transform-decorators-legacy"]
      },
    },
    {
      test: /\.s?css$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file?name=public/fonts/[name].[ext]'
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: "file-loader?name=/dev/images/[name].[ext]"
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.join(__dirname, './prod')]
  }
};