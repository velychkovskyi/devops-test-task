const express = require('express');

const config = require('./config');
const { loaders } = require('./loaders');

const app = express();
app.disable('x-powered-by');

async function startServer() {

  await loaders({ expressApp: app });
  app.listen(config.port, () => {
    console.log(
      `Server started at port ${config.port} in ${
        config.env
      } environment. Mocked mode is ${
        config.mockedMode ? 'enabled' : 'disabled'
      }.`,
    );
  });
}

startServer();
