const webpack = require('webpack');  // eslint-disable-line
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');  // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin');  // eslint-disable-line
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');  // eslint-disable-line
const FileManagerPlugin = require('filemanager-webpack-plugin');  // eslint-disable-line
let config = require('./webpack.main.config.js');

config = {
  ...config,
  mode: 'development',
  devtool: '#eval-source-map',
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
};

// Define environment name
config.plugins.push(
  new webpack.DefinePlugin({
    DEBUG: true,
    'process.env.NODE_ENV': "'development'",
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './client/src/template.html',
    inject: false,
    chunks: ['common', 'app'],
    head: ['common'],
    body: ['app'],
    alwaysWriteToDisk: true,
  }),
  new HtmlWebpackHarddiskPlugin(),
  new FileManagerPlugin({
    onEnd: {
      copy: [
        {
          source: './client/public/build/index.html',
          destination: './client/public/index.html',
        },
      ],
    },
  }),
  new WebpackBuildNotifierPlugin({
    title: 'Tezos Gateway',
  }),
);

module.exports = config;
