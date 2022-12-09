const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: "development",
  devServer: {
    port: 9000,
    static: path.resolve(__dirname,'../dist'),
    open: "chrome",
    hot: true,
  },
  target: "web",
  plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
  devtool: "eval-source-map",
};

module.exports = merge(common, devConfig);