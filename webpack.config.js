const webpack = require('webpack');
const path = require('path');

const SRC_PATH = path.join(__dirname, 'src', 'client', 'index.js');
const BUILD_PATH = path.join(__dirname, 'public');

const ENV = process.env.NODE_ENV;

const devel = {
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

const prod = {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
};

const base = {
  entry: SRC_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/public',
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {},
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
  ],
};

const config = ENV === 'production' ? prod : devel;

module.exports = Object.assign({}, base, config, { plugins: base.plugins.concat(config.plugins) });
