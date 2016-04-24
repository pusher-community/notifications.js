var path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'src', 'main.js'),
  output: {
    path: 'example',
    filename: 'notifications.js',
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
  }
};
