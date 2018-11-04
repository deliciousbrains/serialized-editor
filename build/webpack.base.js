var path = require("path")
var webpack = require("webpack")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  mode: "none",
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {},
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "../src"),
    },
  },
  devtool: "#eval-source-map",
}

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map"
  module.exports.mode = "production"
}
