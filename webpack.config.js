var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/register');

module.exports = env => {
  if (!env || !env.apiKey) {
    throw new Error(
      'You need to specify your tmdb api-key. You can do so by specifying ' +
        '--env.apiKey=<yourkey> in the command line. For example:\n' +
        '$ npm run serve-dev  -- --env.apiKey=<yourkey>\n' +
        ' or \n' +
        '$ npm run build-webpack -- --env.apiKey=<yourkey> && npm run serve-prod',
    );
  }
  console.log('Using apiKey: ', env.apiKey);
  return {
    mode: 'development',
    entry: ['babel-polyfill', './src/index'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
      }),
      // new webpack.EnvironmentPlugin(['apiKey']),
      new webpack.DefinePlugin({
        'process.env.apiKey': JSON.stringify((env && env.apiKey) || ''),
      }),
    ],
    devServer: {
      contentBase: __dirname + '/build',
      compress: true,
      port: 9000,
      open: true,
      stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false,
      },
    },
    watch: false,
    devtool: 'source-map',
  };
};
