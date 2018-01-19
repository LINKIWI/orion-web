/* eslint-disable import/no-extraneous-dependencies */

const dotenv = require('dotenv');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

dotenv.config();

// Array of known environment variables whose value may be injected into the frontend as a key in
// process.env, allowing Node-like environment variable access in client-side logic.
const BUILD_ENV_VARS = [
  'NODE_ENV',
  'MAPBOX_API_TOKEN',
  'ORION_SERVER_URL',
  'PIWIK_URL',
  'PIWIK_SITE_ID',
  'PIWIK_CLIENT_TRACKER_NAME',
  'PIWIK_SERVER_TRACKER_NAME',
];

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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
    // Mapbox modifies the globals in a way that Uglify statically parses incorrectly.
    // As a workaround, skip parsing of the module completely.
    // Reference: https://github.com/mapbox/mapbox-gl-js/issues/4359#issuecomment-303880888
    noParse: /(mapbox-gl)\.js$/,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: 'src/resources/templates/index.html',
      inlineSource: '.js$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ...BUILD_ENV_VARS
          .filter((key) => key in process.env)
          .reduce((acc, key) =>
            Object.assign({}, acc, { [key]: JSON.stringify(process.env[key]) }), {}),
      },
    }),
    isProduction && new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    isProduction && new webpack.optimize.UglifyJsPlugin({
      comments: false,
      parallel: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: isProduction ? {
      react: 'inferno-compat',
      'react-dom': 'inferno-compat',
    } : {},
  },
};
