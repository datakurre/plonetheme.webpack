const webpack = require('webpack');
const join = require('path').join;
const resolve = require('path').resolve;
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const PATHS = {
  src: resolve('./src/theme/webpack'),
  build: resolve('./resources/theme/webpack')
};

const common = merge(require('./webpack.globals'), {
  // Define bundles
  entry: {
    'plone': join(PATHS.src, 'plone'),
    'plone-logged-in': join(PATHS.src, 'plone-logged-in'),
    'resourceregistry': join(PATHS.src, 'resourceregistry'),
    'ploneformgen': join(PATHS.src, 'ploneformgen'),
    'plone-mosaic': join(PATHS.src, 'plone-mosaic'),
    'plone-mosaic-layouts-editor': join(PATHS.src, 'plone-mosaic-layouts-editor')
  },
  output: {
    path: PATHS.build
  },
  module: {
    loaders: [
      { test: /jquery\.js$/, loader: 'expose?$' },
      { test: /jquery\.js$/, loader: 'expose?jQuery' }
    ]
  },
  plugins: [
    // Copy themes
    new CopyWebpackPlugin(
      [{ from: join(PATHS.src, '../..'), to: '../..' }],
      { ignore: ['**/webpack/*.js', '**/webpack/*.less', 'index.html'] }
    ),
    // Inject bundles
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(PATHS.src, 'index.html'),
      chunksSortMode: function(a, b) {
        return a.names[0] > b.names[0] ? 1 : -1;
      },
      inject: false
    })
  ]
});

const TARGET = process.env.TARGET || process.env.NODE_ENV;

if(TARGET === 'build' || !TARGET) {
  module.exports = merge(common, {
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
      publicPath: process.env.PUBLIC_PATH || '/Plone/++theme++webpack/'
    },
    module: {
      loaders: [
        { test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css!less') }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin('init.js'),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  });
}

if(TARGET === 'watch') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      outputPath: PATHS.build,
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || '8080'
    },
    module: {
      loaders: [
        { test: /\.less$/,
          loaders: ['style', 'css', 'less'] }
      ]
    },
    entry: join(PATHS.src,
                process.env.ENTRYPOINT || 'plone-logged-in.js'),
    output: {
      filename: 'bundle.js',
      publicPath: 'http://' + (process.env.HOST || 'localhost') + ':' +
                  (process.env.PORT || '8080') + '/assets/'
    },
    plugins: [
      new WriteFileWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
