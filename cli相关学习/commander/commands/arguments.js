#!/usr/bin/env node
const { program } = require("commander");

program
  .command("build", { hidden: true })
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

program
  .command("serve", { isDefault: true })
  .description("launch web server")
  .option("-p,--port <port_number>", "web port")
  .action((options) => {
    console.log(`server on port ${options.port}`);
  });

program
  .command("clone <source> [destination]")
  .description("clone a repository into a newly created directory")
  .action((source, destination) => {
    console.log(source, destination);
    console.log("clone command called");
  });

program
  .command("start <service>", "start named service")
  .command("stop [service]", "stop named service, or all if no name supplied");

program
  .version("0.1.0")
  .argument("<username>", "user to login")
  .argument("[password]", "password for user, if required", "no password given")
  .action((username, password) => {
    console.log("username:", username);
    console.log("password:", password);
  });

program
  .version("0.1.0")
  .command("rmdir")
  .argument("<dirs...>")
  .action(function (dirs) {
    dirs.forEach((dir) => {
      console.log("rmdir %s", dir);
    });
  });

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

// async function run() {
//   console.log("run");
// }

// async function main() {
//   program.command("run").action(run);
//   await program.parseAsync(process.argv);
// }

// program
//   .command("add")
//   .argument("<first>", "integer argument", myParseInt)
//   .argument("[second]", "integer argument", myParseInt, 1000)
//   .action((first, second) => {
//     console.log(first, second);
//     console.log(`${first} + ${second} = ${first + second}`);
//   });
program.parse();
