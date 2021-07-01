const express = require('express');
const stringify = require('fast-safe-stringify');
const {
  noCacheMiddleware,
  errorMiddleware,
} = require('../middlewares');
const createRouter = require('../routes');
const healthCheck = require('../routes/router');

async function expressLoader(app) {
  process.on('unhandledRejection', (reason, p) => {
    console.error(p, reason);
  });

  process.on('uncaughtException', (error) => {
    console.error(stringify(error));
  });

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(healthCheck);

  app.use(noCacheMiddleware);
  createRouter(app);
  app.use(errorMiddleware);
}

module.exports = { expressLoader };
