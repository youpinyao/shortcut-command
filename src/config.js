const path = require('path');
const os = require('os');
const fs = require('fs');

const configName = '.scconfig.json';

module.exports = () => {
  let commonConfig;
  let config;

  try {
    commonConfig = fs.readFileSync(path.resolve(os.homedir(), configName));
    commonConfig = JSON.parse(commonConfig.toString());
  } catch (error) {
    commonConfig = null;
  }

  try {
    config = fs.readFileSync(path.resolve(process.cwd(), configName));
    config = JSON.parse(config.toString());
  } catch (error) {
    config = null;
  }

  if (!commonConfig && !config) {
    throw Error('please init');
  }

  config = {
    ...(commonConfig || {}),
    ...(config || {}),
  };

  return config;
};
