const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

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
      _entries: path.resolve(SRC_PATH, 'entries'),
      _pages: path.resolve(SRC_PATH, 'pages'),
      _components: path.resolve(SRC_PATH, 'components'),
    },
  },

  entry: {
    app: path.join(SRC_PATH, 'entries', 'index.jsx'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: babelOpts,
        include: SRC_PATH,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: SRC_PATH,
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new RefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'index.html'),
      filename: 'index.html',
    }),
  ],

  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: '[name].bundle.js',
  },
};
