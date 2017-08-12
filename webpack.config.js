const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var plugins = [];
var sourceMap = false;
var outputFileName = 'angular-particles.js';
var outputCSSFileName = 'angular-particles.css';

//If production mode
if (process.argv[2] === '--production') {
  outputFileName = 'angular-particles.min.js';
  outputCSSFileName = 'angular-particles.min.css';
  //sourceMap = true;
  //UglifyJS plugin
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true
    }
  }));

  plugins.push(new ExtractTextPlugin(outputCSSFileName));

} else {
  plugins.push(new ExtractTextPlugin(outputCSSFileName));
}

module.exports = {
  entry: './src/particles.js',
  output: {
    path: './lib',
    publicPath: '/lib/',
    filename: outputFileName,
    libraryTarget: 'umd'
  },
  externals: [
    {
      'particles.js': {
        root: 'particlesJS'
      }
    },
    {
      angular: {
        root: 'angular',
        commonjs2: 'angular',
        commonjs: 'angular',
        amd: 'angular'
      }
    }
  ],
  devtool: sourceMap ? 'source-map' : null,
  devServer: {
    contentBase: './demo/'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  plugins: plugins,
  jshint: {
    curly: true,
    eqeqeq: true,
    globals: {
      'angular': true
    },
    browser: true,
    quotmark: 'single',
    strict: true,
    undef: true,
    unused: true,
    jasmine: true
  }
};
