module.exports = [
  {
    output: {
      filename: "dist-amd.js",
      libraryTarget: "amd",
    },
    name: "amd",
    entry: "./src/app.js",
    mode: "production",
  },
  {
    output: {
      filename: "dist-commonjs.js",
      libraryTarget: "commonjs",
    },
    name: "commonjs",
    entry: "./src/app.js",
    mode: "production",
  },
];
