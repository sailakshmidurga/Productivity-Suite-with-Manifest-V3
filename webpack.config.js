const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",

  entry: {
    popup: "./src/popup.js",
    options: "./src/options.js",
    newtab: "./src/newtab.js",
    background: "./src/background.js"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "." },
        { from: "src/popup.html", to: "." },
        { from: "src/options.html", to: "." },
        { from: "src/newtab.html", to: "." },
        { from: "src/blocked.html", to: "." }
      ]
    })
  ]
};