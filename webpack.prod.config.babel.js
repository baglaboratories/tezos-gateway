const webpack = require('webpack'); // eslint-disable-line
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // eslint-disable-line
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // eslint-disable-line
const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const FileManagerPlugin = require('filemanager-webpack-plugin'); // eslint-disable-line
const config = require('./webpack.main.config.js');

config.devtool = 'source-map';
config.mode = 'production';
config.optimization = {
  ...config.optimization,
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
      terserOptions: {
        compress: true,
        ecma: 6,
        mangle: true,
      },
      sourceMap: true,
    }),
  ],
};

// Add plugins
config.plugins.push(
  new webpack.DefinePlugin({
    DEBUG: false,
    'process.env.NODE_ENV': "'production'",
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './client/src/template.html',
    inject: false,
    chunks: ['common', 'app'],
    head: ['common'],
    body: ['app'],
  }),
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
