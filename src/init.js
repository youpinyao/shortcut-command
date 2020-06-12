
const fs = require('fs');
const path = require('path');

const configName = require('./configName');

function init() {
  fs.copyFileSync(path.resolve(__dirname, configName), path.resolve(process.cwd(), configName));
}

module.exports = init;
