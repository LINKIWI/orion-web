/* eslint-disable import/no-extraneous-dependencies */

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: './src/resources/templates/entry.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /src\/.+\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: 'src/resources/templates/index.html',
      inlineSource: '.js$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    isProduction && new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    isProduction && new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    isProduction && new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ].filter(Boolean),
  resolve: {
    alias: isProduction ? {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    } : {},
  },
};
