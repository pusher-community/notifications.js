var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'notifications': path.join(process.cwd(), 'src', 'main.js'),
    'notifications.min': path.join(process.cwd(), 'src', 'main.js')
  },
  output: {
    path: 'lib',
    filename: '[name].js',
    library: 'Notifications',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ]
};
