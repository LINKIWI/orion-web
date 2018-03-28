/* eslint-disable import/no-extraneous-dependencies */

const dotenv = require('dotenv');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: './src',
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
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': BUILD_ENV_VARS
        .filter((key) => key in process.env)
        .reduce((acc, key) => ({
          ...acc,
          [key]: JSON.stringify(process.env[key]),
        }), {}),
    }),
    new HTMLWebpackPlugin({
      template: 'src/resources/templates/index.html',
      inlineSource: '.js$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    isProduction && new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: isProduction ? {
      react: 'inferno-compat',
      'react-dom': 'inferno-compat',
    } : {},
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/',
  },
};
