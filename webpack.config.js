const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js",
    assetModuleFilename: "[name][ext]"
  },
  resolve: {
    alias: {
      '∆': path.resolve(__dirname, 'src/exp')
    }
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"], }
    ]
  },
  devtool: "inline-source-map",
  plugins: [ new CleanWebpackPlugin(), new HtmlWebpackPlugin({ template: './src/index.html' }) ]
}