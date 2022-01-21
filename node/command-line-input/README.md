#### readline

```js
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`你叫什么名字?`, (name) => {
  console.log(`你好 ${name}!`);
  readline.close();
});

// 你叫什么名字?汪汪

// 你好 汪汪!
```

这段代码会询问用户名，当输入了文本并且用户按下回车键时，则会发送问候语。
question() 方法会显示第一个参数（即问题），并等待用户的输入。 当按下回车键时，则它会调用回调函数。
在此回调函数中，关闭了 readline 接口。
如果需要密码，则最好不要回显密码，而是显示 \* 符号。

#### inquirer

```js
const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "name",
    message: "请输入用户名",
  },
];
inquirer.prompt(questions).then((answers) => {
  console.log(`你好 ${answers["name"]}!`);
});
```

#### 其他

库：
readline-sync 软件包
Inquirer.js 软件包
