const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: {
    app: './src/app.ts'
  },
  output: {
    path: './dist',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html']
  },
  plugins: plugins
};