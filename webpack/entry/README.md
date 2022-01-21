### entry

#### 单个入口(简写)语法

```js
// package.json
"scripts": {
  "build": "webpack --config webpack.config.js"
},

// webpack.config.js
const path = require("path");

module.exports = {
  // entry: "./src/index.js",
  entry: ["./src/index.js", "./src/test.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  //   entry: {
  //     main: path.resolve(__dirname, "./src/index.js"),
  //   },
  // 我们也可以将一个文件路径数组传递给 entry 属性，这将创建一个所谓的 "multi-main entry"。在你想要一次注入多个依赖文件，并且将它们的依赖关系绘制在一个 "chunk" 中时，这种方式就很有用。
  //   entry: ["./src/index.js", "./src/test.js"],
};
```

#### 对象语法

对象语法会比较繁琐，然而，这是应用程序中定义入口的最可扩展的方式

##### 描述入口的对象

用于描述入口的对象，你可以使用如下属性：

- `dependOn`: 当前入口所依赖的入口，它们必须在该入口被加载之前被加载。
- `filename`: 指定要输出的文件名称。
- `import`: 启动需要加载的模块。
- `library`: 指定 library 选项，为当前 entry 构建一个 library。
- `runtime`: 运行时 chunk 的名称，如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。
- `publicPath`: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。

```js
// webpack.config.js
module.exports = {
  entry: {
    a2: "./src/a",
    b2: {
      dependOn: "a2",
      import: "./src/b",
    },
  },
};
```

**注意**：

1. runtime 和 dependOn 不应在同一个入口上同时使用，所以如下配置无效，并且会抛出错误：

```js
// webpack.config.js
module.exports = {
  entry: {
    a2: "./src/a",
    b2: {
      runtime: "x2",
      dependOn: "a2",
      import: "./src/b",
    },
  },
};
```

2. 确保 runtime 不能指向已存在的入口名称，例如下面配置会抛出一个错误：

```js
// webpack.config.js
module.exports = {
  entry: {
    a1: "./src/a",
    b1: {
      runtime: "a1",
      import: "./src/b",
    },
  },
};
```

3. 另外 dependOn 不能是循环引用的，下面的例子也会出现错误：

```js
// webpack.config.js
module.exports = {
  entry: {
    a3: {
      import: "./src/a",
      dependOn: "b3",
    },
    b3: {
      import: "./src/b.js",
      dependOn: "a3",
    },
  },
};
```

#### 常见场景

##### 分离 app(应用程序)和 vendor(第三方库)入口

**webpack.config.js**

```js
module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
};
```

#### 多页面应用程序

**webpack.config.js**

```js
module.exports = {
  entry: {
    pageOne: "./src/pageOne/index.js",
    pageTwo: "./src/pageTwo/index.js",
    pageThree: "./src/pageThree/index.js",
  },
};
```
