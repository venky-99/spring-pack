'use strict';
var webpack = require('webpack'),
    path = require('path');

var APP = __dirname + '/src/main/frontend/.';
var OUT = __dirname + '/src/main/resources/static/.';

module.exports = {
  context: APP,
  entry: {
    app: ['webpack/hot/dev-server', './core/bootstrap.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery"
    })
    ],
  output: {
    path: OUT,
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'scripts'],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
    { test: /\.scss$/, loader: 'style!css!sass' },
    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
    { test: /\.tsx?$/, loader: 'ts-loader' },
    {
      test: /\.js$/,
      loader: 'ng-annotate!babel!jshint',
      exclude: /node_modules|bower_components/
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    },

    { test: /\.(woff|woff2)(\?.*)?$/,
      loader: "url?limit=10000&minetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&minetype=image/svg+xml" },
    {
      test: /\.png$/,
      loader: "url-loader",
      query: { mimetype: "image/png" }
    }
    ]
  },
  devServer: {
    proxy: [
    { path: "/api",
      target: "http://localhost:8081/" }
    ]
  },

  devtool: '#inline-source-map'

};
