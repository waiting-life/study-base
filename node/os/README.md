#### os.homedir()

返回到当前用户的主目录的路径

```js
const os = require("os");
console.log(os.homedir());
// /Users/wangqiaojuan
```

#### os.hostname()

返回主机名

```js
const os = require("os");
console.log(os.hostname());
// macdeMacBook-Pro.local
```

#### os.userInfo()

返回包含当前 username、uid、gid、shell 和 homedir 的对象。
