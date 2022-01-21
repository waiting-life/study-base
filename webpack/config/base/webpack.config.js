const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/foo.js",
  outpath: {
    path: path.resolve(__dirname, "dist"),
    filename: "foo.bundle.js",
  },
};
