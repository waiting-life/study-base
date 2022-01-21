### loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件。
loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。
loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！
需要安装响应的 loader

#### 用法

1. 配置方式(推荐)：在 `webpack.config.js` 中指定 loader
2. 在每个 import 语句中显示指定 loader

##### 配置方式

- `webpack` 允许你在 `webpack` 中指定多个 loader。
- `module.rules` 从右到左(或从下到上)的取值/执行

**webpack.config.js**

```js
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
```

##### 内联方式

#### 示例

- 可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。首先安装相对应的 loader：
- webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader

```shell
yarn add css-loader ts-loader --save-dev
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      { test: /.css$/, use: "css-loader" },
      { test: /.ts$/, use: "ts-loader" },
    ],
  },
};
```
