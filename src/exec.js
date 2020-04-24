
const spawn = require('cross-spawn');
const chalk = require('chalk');
const { Confirm } = require('enquirer');

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

  let multiCmds = [[]];
  let replaceParams = {};
  let needConfirm = false;

  cmds.forEach((cmd, i) => {
    const isParams = /=/g.test(cmd) && !/^=/g.test(cmd) && !/=$/g.test(cmd);
    if (cmd === '&&' || cmd === '&') {
      multiCmds.push([]);
    } else if (cmd === '+' || !cmd) {
      // 跳过 累加标识，无用标识
    } else if (cmd === '--confirm') {
      // 是否需要确认操作
      needConfirm = true;
    } else if (isParams) {
      // 跳过参数
      replaceParams = {
        ...replaceParams,
        [cmd.split('=')[0]]: cmd.split('=')[1],
      };
    } else if (cmds[i - 1] === '+') {
      // 无空格累加
      const item = multiCmds[multiCmds.length - 1];
      item[item.length - 1] = item[item.length - 1] + cmd;
    } else {
      multiCmds[multiCmds.length - 1].push(cmd);
    }
  });

  multiCmds = multiCmds.map((items) => items.map((cmd, i) => {
    let newCmd = cmd;

    // 替换参数
    Object.keys(replaceParams).forEach((paramsKey) => {
      if ((new RegExp(paramsKey).test(newCmd))) {
        newCmd = newCmd.replace(new RegExp(`{{${paramsKey}}}`, 'g'), replaceParams[paramsKey]);
      }
    });

    // 字符串标识
    if (items[i - 1] === '--string') {
      return `"${newCmd}"`;
    }

    return newCmd;
  }));

  // 过滤无用
  multiCmds = multiCmds.map((items) => items.filter((cmd) => cmd !== '--string'));
  const doCmd = () => {
    for (let index = 0; index < multiCmds.length; index += 1) {
      const element = multiCmds[index];

      console.log();
      console.log(chalk.green(element.join(' ')));
      console.log();

      spawn.sync(element[0], element.slice(1), { stdio: 'inherit' });
    }
  };

  if (needConfirm) {
    const prompt = new Confirm({
      name: 'question',
      message: `

${chalk.green(multiCmds.map((item) => item.join(' ')).join('\n\r'))}

are you sure ?`,
    });

    prompt.run()
      .then((answer) => {
        if (answer) {
          doCmd();
        }
      });
  } else {
    doCmd();
  }
}

module.exports = exec;
