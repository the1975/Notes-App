const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8080,
    open: true,
    allowedHosts: 'all', // Wajib untuk GitHub Codespaces
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws', // Memperbaiki error WSS di Codespaces
    },
  },
});