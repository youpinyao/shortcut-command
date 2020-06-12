
const spawn = require('cross-spawn');

const current = spawn.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout.toString().trim();

module.exports = {
  current,
};
