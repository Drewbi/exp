const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const expRoutes = require('./src/exp')

const entry = { index: './src/utils/home.js' }
expRoutes.forEach(exp => entry[exp.name] = './src/exp/' + exp.path)
module.exports = {
  mode: "development",
  entry,
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js",
    assetModuleFilename: "[name][ext]"
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"], },
      {
        test: /\.html$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.html$/i,
        use: ["extract-loader", "html-loader"],
      },
    ]
  },
  devtool: "inline-source-map",
  plugins: [ new CleanWebpackPlugin() ]
}