
const spawn = require('cross-spawn');
const path = require('path');
const fs = require('fs');

function exec(params) {
  const config = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.scconfig.json')).toString());
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
