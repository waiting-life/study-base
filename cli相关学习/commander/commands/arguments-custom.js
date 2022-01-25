#!/usr/bin/env node
const { program } = require("commander");

function myParseInt(value, dummyPrevious) {
  // parseInt  参数为字符串和进制数、
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

program
  .command("add")
  .argument("<first>", "integer argument", myParseInt)
  .argument("[second]", "integer argument", myParseInt, 1000)
  .action((first, second) => {
    console.log(`${first} + ${second} = ${first + second}`);
    return first + second;
  });

program.parse();
