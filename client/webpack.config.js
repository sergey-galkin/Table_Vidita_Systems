const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devServer: {
    static: './build',
    historyApiFallback: true,
    port: '3000',
    proxy: {
      context: ['/documents1', '/documents2', '/cancel'],
      target: 'http://localhost:3001',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      publicPath: '/',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '...']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
        ],
      },
      {
        test: /\.jsx$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};