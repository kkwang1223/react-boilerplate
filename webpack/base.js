'use strict';

const { resolve, join } = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = resolve(__dirname, '..');
const PATHS = {
  SRC: resolve(ROOT_PATH, 'src'),
  DIST: resolve(ROOT_PATH, 'dist'),
};

const babelOpts = {
  presets: [
    [
      '@babel/preset-env', 
      {
        targets: {
          browsers: ['> 1% in KR', 'last 2 chrome versions'],
        },
        debug: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['react-refresh/babel'],
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '_src': PATHS.SRC,
    }
  },

  entry: {
    main: join(PATHS.SRC, 'entries', 'index.jsx'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: babelOpts,
        include: PATHS.SRC,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: PATHS.SRC,
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new RefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: join(PATHS.SRC, 'index.html'),
      filename: 'index.html',
    }),
  ],

  output: {
    path: PATHS.DIST,
    filename: '[name].bundle.js',
  },
};