var settings = require('./settings');

module.exports = {
  entry: {
    App: settings.themeLocation + "/assets/scripts/App.js",
    Vendor: settings.themeLocation + "/assets/scripts/Vendor.js"
  },
  output: {
    path: settings.themeLocation + "/assets/scripts",
    filename: "[name]-bundled.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
};
