const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, args) => {
  const {
    mode,
    buildTarget,
    target
  } = args;

  const config = {
    mode,
    target,
    entry: path.join(__dirname, 'src', buildTarget, 'index.js'),
    output: {
      path: path.join(__dirname, 'dist', buildTarget),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          test: /\.jsx?$/
        }
      ]
    }
  };

  const plugins = [];
  if (buildTarget === 'front') {
    plugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', buildTarget, 'index.html'),
      inject: false
    }));
    if (mode === 'development') {
      plugins.push(new webpack.HotModuleReplacementPlugin());
      return {
        ...config,
        plugins,
        devtool: 'inline-source-map',
        devServer: {
          hot: true,
          inline: true,
          contentBase: path.join(__dirname, 'src', 'front'),
          port: 3001,
          proxy: {
            '/api': 'http://localhost:3000'
          },
          historyApiFallback: true,
          watchOptions: {
            aggregateTimeout: 300,
            poll: 1100
          }
        }
      }
    }
  }
  return {
    ...config,
    plugins
  }
};