const  path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const pluginPath = '/Users/guanhao/Documents/work/learn-build-tools/webpack/plugins';
// const TestWebpackPlugin = require(`${pluginPath}/TestWebpackPlugin`);


const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production': 'development',
  
  entry: ['react-hot-loader/patch', path.resolve(__dirname, '../src/index')],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, '../src'),
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.s?(css)$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: path.join(process.cwd(), 'index.html')}),
    // !isProd && new ReactRefreshWebpackPlugin()
    // new TestWebpackPlugin({ test: 'test' })
  ].filter(Boolean)
}
