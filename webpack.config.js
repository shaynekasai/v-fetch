const path = require("path");

module.exports = {
  entry: path.resolve(__dirname + "/src/v-fetch.js"),
  output: {
    path: path.resolve(__dirname + "/dist/"),
    filename: "v-fetch.js",
    library: "v-fetch",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};