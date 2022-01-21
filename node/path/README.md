### path

#### path.dirname(),path.basename(),path.extname()

给定一个路径，可以使用以下方法从其中提取信息：

dirname: 获取文件的父文件夹。
basename: 获取文件名部分。
extname: 获取文件的扩展名。

```js
const path = require("path");
const notes = "/users/joe/notes.txt";

console.log(path.dirname(notes));
console.log(path.basename(notes));
console.log(path.extname(notes));
console.log(path.basename(notes, path.extname(notes)));

// /users/joe
// notes.txt
// .txt
// notes
```

#### path.join()

可以使用`path.join()`连接路径的两个或多个片段

#### path.resolve()

可以使用`path.resolve()`获得相对路径的绝对计算

```js
console.log(path.resolve("index.js"));

// /Users/wangqiaojuan/projects/my-projects/笔记/前端学习案例/node/fs/index.js
```

1. **在此示例中，Node.js 只是简单地将 /joe.txt 附加到当前工作目录。**
2. **如果指定第二个文件夹参数，则 resolve 会使用第一个作为第二个的基础**

```js
console.log(path.resolve("test", "index.js"));

// /Users/wangqiaojuan/projects/my-projects/笔记/前端学习案例/node/fs/test/index.js
```

#### path.normalize()

当包含诸如 .、.. 或双斜杠之类的相对说明符时，其会尝试计算实际的路径：

```js
console.log(path.normalize("/users/wangqiaojuan/..//test.txt"));

// /users/test.txt
```

#### path.isAbsolute()

如果是绝对路径，则返回 true

#### path.parse()

解析对象的路径为组成其的片段：

root: 根路径。
dir: 从根路径开始的文件夹路径。
base: 文件名 + 扩展名
name: 文件名
ext: 文件扩展名

```js
const filePath = process.cwd();
console.log(filePath);
console.log(path.parse(filePath));

// {
//  root: '/',
//   dir: '/Users/wangqiaojuan/projects/my-projects/笔记/前端学习案例/node',
//   base: 'fs',
//   ext: '',
//   name: 'fs'
// }
```

#### path.relative()

接受 2 个路径作为参数。 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。

```js
const filePath = process.cwd(); // filePath: /Users/wangqiaojuan/projects/my-projects/笔记/前端学习案例/node/fs
console.log(path.relative(filePath, path.join(filePath, "index.js")));
// index.js
```
