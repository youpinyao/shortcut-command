
const spawn = require('cross-spawn');
const path = require('path');
const os = require('os');
const fs = require('fs');

const configName = '.scconfig.json';

function exec(params, commander) {
  if (!params) {
    commander.outputHelp();
    return;
  }

  let config;

  try {
    config = fs.readFileSync(path.resolve(process.cwd(), configName));
  } catch (error) {
    config = fs.readFileSync(path.resolve(os.homedir(), configName));
  }

  config = JSON.parse(config.toString());

  const key = params[0];
  let cmds = [].concat(params);
  const shortcut = config[key];

  if (shortcut) {
    cmds.shift();
    cmds = shortcut.split(' ').concat(cmds);
  }

  spawn.sync(cmds[0], cmds.slice(1), { stdio: 'inherit' });
}

module.exports = exec;
