
const fs = require('fs');
const os = require('os');
const path = require('path');

const configName = require('./configName');

function init() {
  fs.copyFileSync(path.resolve(__dirname, configName), path.resolve(os.homedir(), configName));
}

module.exports = init;
