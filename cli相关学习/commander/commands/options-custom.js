#!/usr/bin/env node
const { program } = require("commander");

// 选项的参数可以通过自定义函数来处理，
// 该函数接收两个参数，即用户新输入的参数值和当前已有的参数值（即上一次调用自定义处理函数后的返回值），返回新的选项参数值。
function myParseInt(value, dummyPrevious) {
  // parseInt  参数为字符串和进制数、
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

function increaseVerbosity(dummyValue, previous) {
  return previous + 1;
}

function collect(value, previous) {
  return previous.concat(value);
}

function commaSeparatedList(value, dummyPrevious) {
  return value.split(",");
}

program
  .option("-f --float <number>", "float argument", parseFloat)
  .option("-i --integer <number>", "integer argument", myParseInt)
  .option(
    "-v --verbose",
    "verbosity that can be increased",
    increaseVerbosity,
    0
  )
  .option("-c --collect <value>", "repeatable value", collect, [])
  .option("-l --list <items>", "comma separated list", commaSeparatedList)
  .parse();

const options = program.opts();

if (options.float !== undefined) console.log(`float: ${options.float}`);
if (options.integer !== undefined) console.log(`integer: ${options.integer}`);
if (options.verbose > 0) console.log(`verbosity: ${options.verbose}`);
if (options.collect.length > 0) console.log(options.collect);
if (options.list !== undefined) console.log(options.list);
