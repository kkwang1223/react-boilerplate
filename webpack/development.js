const { merge } = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval',

  devServer: {
    port: 4000,
    historyApiFallback: true,
    hot: true,
  },
});
