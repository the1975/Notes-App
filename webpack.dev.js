const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: 8080,
    open: true,
  },
});