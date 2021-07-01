const { expressLoader } = require('./express');

async function loaders({ expressApp }) {
  await expressLoader(expressApp);
  console.log('Express Initialized');
}

module.exports = { loaders };
