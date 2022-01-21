const path = require("path");

// module.exports = {
//   // entry: "./src/index.js",
//   //   entry: {
//   //     main: path.resolve(__dirname, "./src/index.js"),
//   //   },
//   entry: ["./src/index.js", "./src/test.js"],
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//   },
// };

// module.exports = {
//   entry: {
//     a2: "./src/a",
//     b2: {
//       dependOn: "a2",
//       import: "./src/b",
//     },
//   },
// };

// 1. runtime 和 dependOn 不应在同一个入口上同时使用，所以如下配置无效，并且会抛出错误：
// module.exports = {
//   entry: {
//     a2: "./src/a",
//     b2: {
//       runtime: "x2",
//       dependOn: "a2",
//       import: "./src/b",
//     },
//   },
// };

// 2. 确保 runtime 不能指向已存在的入口名称，例如下面配置会抛出一个错误
// module.exports = {
//   entry: {
//     a1: "./src/a",
//     b1: {
//       runtime: "a1",
//       import: "./src/b",
//     },
//   },
// };

// 3. 另外 dependOn 不能是循环引用的，下面的例子也会出现错误
// module.exports = {
//   entry: {
//     a3: {
//       import: "./src/a",
//       dependOn: "b3",
//     },
//     b3: {
//       import: "./src/b.js",
//       dependOn: "a3",
//     },
//   },
// };

// 分离 app(应用程序)和 vendor(第三方库)入口
module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
};
