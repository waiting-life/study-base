### output

可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置

#### 用法

在 webpack 配置中，output 属性的最低要求是，将它的值设置为一个对象，然后为将输出文件的文件名配置为一个 output.filename：

```js
const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js",
    search: "./src/search.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
// 写入到硬盘：./dist/app.js, ./dist/search.js
```

#### output.library

输出一个库，为你的入口做导出
一起来看一个简单的示例。

**webpack.config.js**

```js
module.exports = {
  // …
  entry: "./src/index.js",
  output: {
    library: "MyLibrary",
  },
};
```

假设你在 src/index.js 的入口中导出了如下函数：

```js
export function hello(name) {
  console.log(`hello ${name}`);
}
```

此时，变量 MyLibrary 将与你的入口文件所导出的文件进行绑定，下面是如何使用 webpack 构建的库的实现：

```html
<script src="https://example.org/path/to/my-library.js"></script>
<script>
  MyLibrary.hello("webpack");
</script>
```

#### 高级进阶

对资源使用 CDN 和 hash
