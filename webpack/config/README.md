### 配置

#### 基本配置

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/foo.js",
  outpath: {
    path: path.resolve(__dirname, "dist"),
    filename: "foo.bundle.js",
  },
};
```

##### 多个 target

除了导出单个对象/函数，可能也会需要导出多种配置。当运行 webpack 时，所有配置项都会构建。

```js
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
```
