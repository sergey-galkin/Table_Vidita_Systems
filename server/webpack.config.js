const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: {
    index: './index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  resolve: {
    extensions: ['.js','.ts', '...']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'ts-loader',
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