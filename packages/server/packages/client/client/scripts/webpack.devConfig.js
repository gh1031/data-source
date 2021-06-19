const base = require('./webpack.config');

module.exports = {
  ...base,
  devServer: {
    port: 1031,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/service/': {
        target: 'http://localhost:1032/'
      },
    }
  },
}
