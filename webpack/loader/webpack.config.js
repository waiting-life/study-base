// module.exports = {
//   module: {
//     rules: [
//       { test: /.css$/, use: "css-loader" },
//       { test: /.ts$/, use: "ts-loader" },
//     ],
//   },
// };

// 配置方式
// loader 从右到左(或从下到上)的取值/执行
module.exports = {
  module: {
    rules: [
      {
        test: "/.css$/",
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
