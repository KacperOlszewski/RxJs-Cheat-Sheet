module.exports = [
  {
    test: /\.(ts)$/,
    exclude: /(node_modules)/,
    loaders: ['awesome-typescript-loader']
  },
  {
    test: /\.scss/,
    loader: 'style!css!sass'
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|woff(4)?)(\?[a-z0-9]+)?$/,
    loader: 'file?name=bundles/[hash].[ext]'
  },
  {
    test: /\.(html)$/,
    loader: 'raw'
  }
];