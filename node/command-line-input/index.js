const inquirer = require("inquirer");

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question(`你叫什么名字?`, (name) => {
//   console.log(`你好 ${name}!`);
//   readline.close();
// });

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
