var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackRootPlugin = require("html-webpack-root-plugin");
module.exports = {
  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  devServer: {
    contentBase: [__dirname + "/dist/", path.join(__dirname, "uploads")],
    compress: true,
    port: 9000,
    historyApiFallback: true,
    publicPath: "/dist/"
  },
  module: {
    rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: "file-loader"
        }],
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "css-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: "index.html", //relative to root of the application
      template: "./src/index.html"
    })
  ]
};