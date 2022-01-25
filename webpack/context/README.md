### context

入口对象是用于 webpack 查找开始构建 bundle 的地方。
上下文是入口文件所处的目录的绝对路径的字符串。
基础目录，绝对路径，用于从配置中解析入口点(entry point)和 加载器(loader)。

##### 用法

```js
const path = require("path");
module.exports = {
  context: path.resolve(__dirname, "app"),
};
```
