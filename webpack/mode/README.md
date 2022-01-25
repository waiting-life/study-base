### mode

提供 mode 配置选项，告知 webpack 使用相应模式的内置优化。

#### 用法

1. 只需在配置对象中提供 mode 选项

```js
module.exports = {
  mode: "development",
};
```

2. 或者从 cli 参数中传递

```
webpack --mode=development
```

**如果没有设置，webpack 会给 mode 的默认值设置为 production。**

3. 如果要根据`webpack.config.js`中的 mode 变量更改打包行为，则必须将配置导出为一个函数，而不是导出对象：

```js
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
```
