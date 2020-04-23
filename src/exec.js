
const spawn = require('cross-spawn');

const getConfig = require('./config');

function exec(params, commander) {
  if (!params) {
    commander.outputHelp();
    return;
  }

  const key = params[0];
  let cmds = [].concat(params);
  const config = getConfig();
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

    console.log();

    console.log(element.join(' '));

    console.log();


    spawn.sync(element[0], element.slice(1), { stdio: 'inherit' });
  }
}

module.exports = exec;
