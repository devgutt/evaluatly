const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV === 'prod' ? 'prod' : 'dev';

module.exports = {
  mode: env === 'dev' ? 'development' : 'production',
  devtool: env == 'dev' ? 'cheap-module-eval-source-map' : false,
  entry: {
    'render': './index.js',
  },
  output: {
    path: __dirname + '/../docs/js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "eslint-loader"
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      }
    ]
  }
}

