const stringify = require('fast-safe-stringify');
const path = require('path');

const { env } = process;

function checkConfig(configObj) {
  function checkValues(key, value) {
    if (value === undefined || value === '') {
      return [key];
    }

    if (value && typeof value === 'object') {
      const notConfiguredKeys = [];

      Object.entries(value).forEach(([innerKey, innerValue]) => {
        const notConfigured = checkValues(innerKey, innerValue);

        if (notConfigured && notConfigured.length) {
          notConfigured.forEach((k) => {
            notConfiguredKeys.push(`${key}.${k}`);
          });
        }
      });

      if (notConfiguredKeys.length) {
        return notConfiguredKeys;
      }
    }

    return null;
  }

  const unconfigured = checkValues('config', configObj);

  if (unconfigured && unconfigured.length) {
    // eslint-disable-next-line no-console
    console.error(
      `The following values are not configured: ${stringify(
        unconfigured,
      )}. Please, check the appropriate Environment Variables`,
    );

    process.exit(1);
  }
}

let config = {
  env: env.NODE_ENV || 'development',
  isDevelopment: env.NODE_ENV !== 'production',
  isProduction: env.NODE_ENV === 'production',
  workingDirectory: path.join(__dirname, '../../'),
  port: parseInt(env.PORT, 10) || 3050,
  applicationName: env.APPLICATION_NAME || 'test-devops-task',
};

checkConfig(config);

config = Object.freeze(config);

module.exports = config;
