## commander.js学习

### 开始

#### 简单案例

1. 代码头部添加`\#!/usr/bin/env node`

```js
#!/usr/bin/env node
const { program } = require("commander");

program.version("0.0.1").usage("<command> [options]");

program.parse();
```

2. 运行`chmod +x index.js`
3. 然后就可以直接通过`./index.js`执行文件代码了

```bash
./index.js -V
# 0.0.1
```

### 选项

1. Commander使用`.option()`方法来定义选项，同时可以附加选项的简介。
   + 每个选项可以定义一个短选项名称(-后面接单个字符)
   + 和一个长选项名称(--后面接一个或多个单词),使用逗号，空格，或者`|`分隔。
2. 解析后的选项可以通过`Command`对象上的`.opts()`方法获取，同时会被传递给命令处理函数。可以通过`.getOptionValue()`或者`.setOptionValue()`操作单个选项的值。
3. 对于多个单词的长选项，选项名会转为驼峰命名法（camel-case），例如`--template-engine`选项可通过`program.opts().templateEngine`获取
4. 多个短选项可以合并简写，其中最后一个选项可以附加参数。 例如，`-a -b -p 80`也可以写为`-ab -p80`，甚至进一步简化为`-abp80`。

#### 常用的选项类型

1. **boolean型选项**：选项无需配置参数

2. **带参数选项**：使用尖括号声明在该选项后，如`--expect <value>`）。如果在命令行中不指定具体的选项及参数，则会被定义为`undefined`。

**示例代码**

```js
#!/usr/bin/env node
const { program } = require("commander");

// program.version("0.0.1").usage("<command> [options]");
program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --pizza-type <type>", "flavour of pizza");

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
console.log("pizza details");
if (options.small) console.log("-small pizza size");
if (options.pizzaType) console.log(`- ${options.pizzaType}`);
```

+ 命令行测试

```bash
./index.js -d -s -p vegetarian

# 输出
{ debug: true, small: true, pizzaType: 'vegetarian' }
pizza details
-small pizza size
- vegetarian
```

**通过`program.parse(arguments)`方法处理参数，没有被使用的选项会存放在`program.args`数组中。 该方法的参数是可选的,默认值为`process.argv`**

#### 选项的默认值

选项可以设置一个默认值

```js
#!/usr/bin/env node
const { program } = require("commander");

// 选项的默认值
program.option(
  "-c --cheese <type>",
  "add the specified type of cheese",
  "blue"
);

program.parse(process.argv);
console.log(`cheese: ${program.opts().cheese}`);
```

+ 命令行测试

```bash
./index.js # cheese: blue
./index.js -c stilton # cheese: stilton
```

#### 其他的选项类型

1. **取反选项**：可以定义一个以`no-`开头的 boolean 型长选项。在命令行中使用该选项时，会将对应选项的值置为`false`。当只定义了带`no-`的选项，未定义对应不带`no-`的选项时，该选项的默认值会被置为`true`。

```js
#!/usr/bin/env node
const { program } = require("commander");

/ 其他的选项类型，取反选项，以及可选参数的选项
program
  .option("--no-sauce", "remove sauce")
  .option("--cheese <flavour>", "cheese flavour", "mozzarella")
  .option("--no-cheese", "plain with no cheese")
  .parse();

const options = program.opts();
console.log(options); 
const sauceStr = options.sauce ? "sauce" : "no-sauce";
const cheeseStr =
  options.cheese === false ? "no-cheese" : `${options.cheese} cheese`;
console.log(`You ordered a pizza with ${sauceStr} and ${cheeseStr}`);
```

+ 命令行测试

```bash
./index.js
# { sauce: true, cheese: 'mozzarella' } options输出默认值
# You ordered a pizza with sauce and mozzarella cheese

./index.js --sauce
# 或者
./index.js --cheese=blue
# error: unknown option '--sauce'

./index.js --cheese blue
# { sauce: true, cheese: 'blue' }
# You ordered a pizza with sauce and blue cheese

./index.js --no-sauce --cheese=blue
# { sauce: false, cheese: 'blue' }
# You ordered a pizza with no-sauce and blue cheese

./index.js --no-sauce --no-cheese  
# { sauce: false, cheese: false }
# You ordered a pizza with no-sauce and no-cheese
```

2. **可选参数的选项**:选项的参数使用方括号声明表示参数是可选参数（如`--optional [value]`）。该选项在不带参数时可用作 boolean 选项，在带有参数时则从参数中得到值。

```js
#!/usr/bin/env node
const { program } = require("commander");

// 选项的参数使用方括号声明表示参数是可选参数（如--optional [value]）。该选项在不带参数时可用作 boolean 选项，在带有参数时则从参数中得到值。
program.option("-c, --cheese [type]", "Add cheese with optional type").parse();
const options = program.opts();
if (options.cheese === undefined) console.log("no cheese");
else if (options.cheese === true) console.log("add cheese");
else console.log(`add cheese type ${options.cheese}`);
```

+ 命令行测试

```bash
./index.js  # no cheese

./index.js --cheese  # add cheese

./index.js --cheese mozzarella   # add cheese type mozzarella
```



#### 必填选项

+ 通过`.requiredOption()`方法可以设置选项为必填
+ 通过`.requiredOption()`方法可以设置选项为必填
+ 该方法其余参数与`.option()`一致。

```js
#!/usr/bin/env node
const { program } = require("commander");

program.requiredOption("-c --cheese <type>", "pizza must have cheese").parse();
const options = program.opts();
if (options.cheese) console.log(options.cheese);
```

+ 命令行测试

```bash
./index.js
# error: required option '-c --cheese <type>' not specified

./index.js -c mozzarella	# mozzarella
```

#### 变长参数选项

定义选项时，可以通过使用`...`来设置参数为可变长参数。在命令行中，用户可以输入多个参数，解析后会以数组形式存储在对应属性字段中。在输入下一个选项前（`-`或`--`开头），用户输入的指令均会被视作变长参数。与普通参数一样的是，**可以通过`--`标记当前命令的结束**。

```js
#!/usr/bin/env node
const { program } = require("commander");

program
  .option("-n --number <numbers...>", "specify numbers")
  .option("-l --letter", "specify letter")
  .parse();

const options = program.opts();
console.log("Options", options);
console.log("Remaining arguments: ", program.args);
```

+ 命令行测试

```bash
./index.js
# Options {}
# Remaining arguments:  []

./index.js -n 1 2 3
# Options { number: [ '1', '2', '3' ] }
# Remaining arguments:  []

./index.js -n 1 2 3 -l a b c
# Options { number: [ '1', '2', '3' ], letter: true }
# Remaining arguments:  [ 'a', 'b', 'c' ]


```



#### 版本选项

+ `.version()`方法可以设置版本，其默认选项为`-V`和`--version`，设置了版本后，命令行会输出当前的版本号。

+ 版本选项也支持自定义设置选项名称，可以在`.version()`方法里再传递一些参数（长选项名称、描述信息），用法与`.option()`方法类似。

```js
#!/usr/bin/env node
const { program } = require("commander");

program.version("0.0.1").usage("<command> [options]");

program.parse();
```

+ 命令行测试

```bash
./index.js -V
# 0.0.1
```



#### 其他选项配置

大多数情况下，选项均可通过`.option()`方法添加，但对某些不常见的用例，也可以直接构造`Options`对象

```js
program
  .addOption(new Option('-s, --secret').hideHelp())
  .addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
  .addOption(new Option('-d, --drink <size>', 'drink size').choices(['small', 'medium', 'large']));
```



#### 自定义选项处理

选项的参数可以通过自定义函数来处理，该函数接收两个参数，即用户新输入的参数和当前已有的参数值(即上一次调用自定义处理函数后的返回值），返回新的选项参数值。

```js

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
```

+ 命令行测试

```bash
./options-custom.js -f 2 # float: 2
./options-custom.js -i 2.2 # integer: 2
./options-custom.js -v 3 # verbosity: 1
./options-custom.js -l 3 # ['3']
```





### 命令

1. 通过`.command()`或`.addCommand()`可以配置命令,有两种实现方式：为命令绑定处理函数，或者将命令单独写成一个可执行文件
2. `.command()`的第一个参数为命令名称，命令参数可以跟在名称后面，也可以用`.argument()`单独指定。参数可为必选的（尖括号表示）、可选的（方括号表示）或变长参数（点号表示，如果使用，只能是最后一个参数）。
3. 使用`.addCommand`向`program`增加配置好的子命令
4. 使用`.command()`和`addCommand()`来指定选项的相关设置。当设置`hidden: true`时，该命令不会打印在帮助信息里。当设置`isDefault: true`时，若没有指定其他子命令，则会默认执行这个命令。

**示例1**

```js
#!/usr/bin/env node
const { program } = require("commander");

program
  .command("build")
  .description("build web site for deployment")
  .action(() => {
    console.log("build");
  });

program
  .command("deploy")
  .description("deploy web site to production")
  .action(() => {
    console.log("deploy");
  });

// 当设置`isDefault: true`时，若没有指定其他子命令，则会默认执行这个命令
program
  .command("serve", { isDefault: true })
  .description("launch web server")
  .option("-p,--port <port_number>", "web port")
  .action((options) => {
    console.log(`server on port ${options.port}`);
  });

program.parse(process.argv);
```

+ 命令行测试

```bash
./index.js build 	# build

./index.js serve -p 8000  # server on port 8000
```

**示例2**

```js
#!/usr/bin/env node
const { program } = require("commander");

program
  .command("clone <source> [destination]")
  .description("clone a repository into a newly created directory")
  .action((source, destination) => {
    console.log(source, destination);
    console.log("clone command called");
  });
```

+ 命令行测试

```bash
 ./index.js clone aaa bbb	
# aaa bbb
# clone command called
```



#### 命令参数

1. 如上所述，子命令的参数可以通过`.command()`指定。对于有独立可执行文件的子命令来书，参数只能以这种方法指定。而对其他子命令，参数也可用以下方法。

   在`Command`对象上使用`.argument()`来按次序指定命令参数。该方法接受参数名称和参数描述。参数可为必选的（尖括号表示，例如`<required>`）或可选的（方括号表示，例如`[optional]`）。

```js
#!/usr/bin/env node
const { program } = require("commander");

program
  .version("0.1.0")
  .argument("<username>", "user to login")
  .argument("[password]", "password for user, if required", "no password given")
  .action((username, password) => {
    console.log("username:", username);
    console.log("password:", password);
  });

program.parse(process.argv);
```

+ 命令行测试

```bash
./index.js
# console.log("vendor");

./index.js wang
# username: wang
# password: no password given

./index.js wang 111111   
# username: wang
# password: 111111
```



2. 在参数名后加上`...`来声明可变参数，且只有最后一个参数支持这种用法。可变参数会以数组的形式传递给处理函数。例如

```js
#!/usr/bin/env node
const { program } = require("commander");

program
  .version("0.1.0")
  .command("rmdir")
  .argument("<dirs...>")
  .action(function (dirs) {
    dirs.forEach((dir) => {
      console.log("rmdir %s", dir);
    });
  });


```

+ 命令行测试

```bash
./index.js rmdir  # error: missing required argument 'dirs'

./index.js rmdir 333  # rmdir 333
```

3. 有一种便捷方式可以一次性指定多个参数，但不包含参数描述：

```js
program
  .arguments('<username> <password>');
```

##### 自定义参数处理

选项的参数可以通过自定义函数来处理

该函数接收两个参数：用户新输入的参数值和当前已有的参数值（即上一次调用自定义处理函数后的返回值），返回新的命令参数值。

```js
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
```

+ 命令行测试

```bash
./arguments-custom.js add 20.22  # 20 + 1000 = 1020
./arguments-custom.js add 20.22 40.22   # 20 + 40 = 60
```



#### 处理函数

命令处理函数的参数，为该命令声明的所有参数，除此之外还会**附加两个额外参数**：

1. **一个是解析出的选项。**(options)
2. 另一个则是**该命令对象自身。**(command)

```js
program
  .argument("<name>")
  .option("-t --title <honorific>", "title to use before name")
  .option("-d --debug", "display some debugging")
  .action((name, options, command) => {
    console.log(name, options, command);
    if (options.debug) {
      console.error("Called %s with options %o", command.name(), options);
    }
    const title = options.title ? options.title : "";
    console.log(`Thank-you ${title}${name}`);
  });

// 处理函数支持async，相应的，需要使用`.parseAsync`代替`.parse`

async function run() {
  console.log("run");
}

async function main() {
  program.command("run").action(run);
  await program.parseAsync(process.argv);
}
```

+ 处理函数支持`async`，相应的，需要使用`.parseAsync`代替`.parse`。

```js
```



#### 独立的可执行(子)命令

**当`.command`带有描述参数时，就意味着使用独立的可执行文件作为子命令。**

 Commander 将会尝试在入口脚本（例如`./examples/pm`）的目录中搜索`program-command`形式的可执行文件，例如`pm-install`、`pm-search`。

```js
#!/usr/bin/env node
const { program } = require("commander");

program
  .version("0.0.1")
  .description("Fake package manager")
  .command("install [name]", "install one or more packages")
  .alias("i")
  .command("search [query]", "search with optional query")
  .alias("s")
  .command("update", "update installed packages", {
    executableFile: "myUpdateSubCommand",
  })
  .command("list", "list packages installed", { isDefault: true });

program.parse(process.argv);
```





#### 生命周期钩子

可以在命令的生命周期事件上设置回调函数。

```js
#!/usr/bin/env node
const { program } = require("commander");

const timeLabel = "command duration";

program
  .option("-p --profile", "show how long command takes")
  .hook("preAction", (thisCommand) => {
    if (thisCommand.opts().profile) {
      console.time(timeLabel);
    }
  })
  .hook("postAction", (thisCommand) => {
    if (thisCommand.opts().profile) {
      console.timeEnd(timeLabel);
    }
  });
program
  .option("-t --trace", "display trace statements for commands")
  .hook("preAction", (thisCommand, actionCommand) => {
    if (thisCommand.opts().profile) {
      console.log(">>>>");
      console.log(
        `About to call action handler for subcommand: ${actionCommand.name()}`
      );
      console.log("arguments: %O", actionCommand.args);
      console.log("options: %o", actionCommand.opts());
      console.log("<<<<");
    }
  });

program
  .command("delay")
  .option(
    "-m --message <value>",
    "custom message to display",
    "Thanks for waiting"
  )
  .argument("[seconds]", "how long to delay", "1")
  .action(async (waitSeconds, options) => {
    console.log(waitSeconds);
    await new Promise((resolve) =>
      setTimeout(resolve, parseInt(waitSeconds) * 1000)
    );
    console.log(options.message);
  });

program
  .command("hello")
  .option("-e --example")
  .action((name, options) => {
    console.log("hello world");
    console.log(name);
  });

program.parseAsync().then(() => {});

```

+ 命令行测试

```bash
./hook.js -p hello

./hook.js -t hello -e 
./hook.js delay
./hook.js -t delay 5 --message bye
./hook.js -p delay
```

**注意**：

- `preAction`：在本命令或其子命令的处理函数执行前
- `postAction`：在本命令或其子命令的处理函数执行后

### 自动化帮助信息



#### 自定义帮助



#### 在出错后展示帮助信息



#### 使用代码展示帮助信息





#### 其他帮助配置



### 自定义事件监听



