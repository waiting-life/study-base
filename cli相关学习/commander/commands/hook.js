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
