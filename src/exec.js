
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

  const multiCmds = [[]];

  cmds.forEach((cmd, i) => {
    if (cmd === '&&' || cmd === '&') {
      multiCmds.push([]);
    } else if (cmd === '+') {
      // 跳过
    } else if (cmds[i - 1] === '+') {
      // 无空格累加
      const item = multiCmds[multiCmds.length - 1];
      item[item.length - 1] = item[item.length - 1] + cmd;
    } else {
      multiCmds[multiCmds.length - 1].push(cmd);
    }
  });

  for (let index = 0; index < multiCmds.length; index += 1) {
    const element = multiCmds[index];
    spawn.sync(element[0], element.slice(1), { stdio: 'inherit' });
  }
}

module.exports = exec;
