#!/usr/bin/env node
const { program } = require("commander");

// program.version("0.0.1").usage("<command> [options]");
// program.parse(process.argv);

// 常用选项
// program
//   .option("-d, --debug", "output extra debugging")
//   .option("-s, --small", "small pizza size")
//   .option("-p, --pizza-type <type>", "flavour of pizza");

// program.parse(process.argv);

// const options = program.opts();
// if (options.debug) console.log(options);
// console.log("pizza details");
// if (options.small) console.log("-small pizza size");
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);

// 选项的默认值
// program.option(
//   "-c --cheese <type>",
//   "add the specified type of cheese",
//   "blue"
// );

// program.parse(process.argv);
// console.log(`cheese: ${program.opts().cheese}`);

// 其他的选项类型，取反选项，以及可选参数的选项
// program
//   .option("--no-sauce", "remove sauce")
//   .option("--cheese <flavour>", "cheese flavour", "mozzarella")
//   .option("--no-cheese", "plain with no cheese")
//   .parse();

// const options = program.opts();
// console.log(options);
// const sauceStr = options.sauce ? "sauce" : "no-sauce";
// const cheeseStr =
//   options.cheese === false ? "no-cheese" : `${options.cheese} cheese`;
// console.log(`You ordered a pizza with ${sauceStr} and ${cheeseStr}`);

// 选项的参数使用方括号声明表示参数是可选参数（如--optional [value]）。该选项在不带参数时可用作 boolean 选项，在带有参数时则从参数中得到值。
// program.option("-c, --cheese [type]", "Add cheese with optional type").parse();
// const options = program.opts();
// if (options.cheese === undefined) console.log("no cheese");
// else if (options.cheese === true) console.log("add cheese");
// else console.log(`add cheese type ${options.cheese}`);

// 必填选项：通过.requiredOption()方法可以设置选项为必填。
// program.requiredOption("-c --cheese <type>", "pizza must have cheese").parse();

// const options = program.opts();
// if (options.cheese) console.log(options.cheese);

// program
//   .option("-n --number <numbers...>", "specify numbers")
//   .option("-l --letter", "specify letter")
//   .parse();

// // const options = program.opts();
// console.log("Options", program.opts());
// console.log("Remaining arguments: ", program.args);

program.parse(process.argv);
