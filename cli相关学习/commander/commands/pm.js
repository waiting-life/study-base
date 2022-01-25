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
  .command("list", "list packages installed", { isDefault: true })
  .action((name, options, command) => {
    console.log(name);
    if (options.install) console.log("install");
  });

program.parse(process.argv);
