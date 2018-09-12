const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.tsx',

  devtool: 'source-map',

  devServer: {
    port: 3000,
    historyApiFallback: true, // Fallback URL for react-router-dom
    contentBase: './dist'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ // Generating index.html, so we don't need to manually update the included script(s)
        template: 'index.html'
      }),
    new Dotenv({
        path: './.env'
    })
  ],
  
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
};