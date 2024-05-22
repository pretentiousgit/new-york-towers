const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, '/server_utils/*')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    // Exclude all files in server_utils from bundles  
    './server_utils': 'commonjs ./server_utils'  
  },
  plugins: [new webpack.IgnorePlugin({resourceRegExp: /server_utils/ })]
};
