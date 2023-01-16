const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.tsx',
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
    extensions: ['.js', '.jsx', '.ts', '.tsx', '...']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-modules-typescript-loader', 'css-loader'],
      },
      {
        test: /\.(j|t)sx?$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/i,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /[\\/]node_modules[\\/]/,
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};