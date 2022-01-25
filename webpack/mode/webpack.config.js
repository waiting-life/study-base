// module.exports = {
//   mode: "development",
// };

const config = {
  entry: "./src/app.js",
};
module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }
  if (argv.mode === "production") {
    // ...
  }
  return config;
};
