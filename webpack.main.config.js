const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line

module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, 'node_modules'],
    alias: {
      components: path.resolve(__dirname, './client/src/components/'),
      containers: path.resolve(__dirname, './client/src/containers/'),
      utils: path.resolve(__dirname, './client/src/utils/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-exponentiation-operator',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1&localIdentName=[local]-[hash:base64:5]',
          'postcss-loader',
          'resolve-url-loader',
          'fast-sass-loader',
        ],
      },
      {
        test: /\.woff2?$/,
        loader: 'url-loader?limit=100&minetype=application/font-woff',
      },
      { test: /\.(ttf|eot|svg|png|jpg|gif)?$/, loader: 'file-loader' },
    ],
  },

  entry: {
    app: ['@babel/polyfill', './client/src/ReduxApp.jsx'],
  },

  output: {
    path: path.join(__dirname, 'client', 'public', 'build'),
    filename: '[name]-[hash]-bundle.js',
    chunkFilename: '[name]-[hash]-bundle.js',
    publicPath: '/build/',
    hashFunction: 'md5',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(['./client/public/build']),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[hash].css',
    }),
  ],
};
