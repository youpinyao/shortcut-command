#!/usr/bin/env node

const commander = require('commander');
const init = require('../src/init');
const exec = require('../src/exec');
const config = require('../src/config');

commander
  .version(require('../package.json').version)
  .option('-i, --init', 'init a config file', () => {
    init();
  })
  .option('-c, --config', 'show config', () => {
    console.log();
    console.log(config());
    console.log();
  })
  .option('<key> ...<args>', 'exec command', () => {

  })
  .action((_, args) => {
    if (commander.init || commander.config) {
      return;
    }
    exec(args, commander);
  })
  .parse(process.argv);

// 默认输入帮助
if (!process.argv.slice(1).length) {
  commander.outputHelp();
}
