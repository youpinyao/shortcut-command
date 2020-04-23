#!/usr/bin/env node

const commander = require('commander');
const init = require('../src/init');
const exec = require('../src/exec');

commander
  .version(require('../package.json').version)
  .option('-i, --init', 'init a config file', () => {
    init();
  })
  .action((_, args) => {
    if (commander.init) {
      return;
    }
    exec(args);
  })
  .parse(process.argv);

// 默认输入帮助
if (!process.argv.slice(1).length) {
  commander.outputHelp();
}
