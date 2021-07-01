/* eslint-disable func-names */
const { isProduction } = require('../config');


// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  const productionResponse = {
    status: err.status,
    code: err.code,
    message: err.message,
  };

  const developmentResponse = {
    ...productionResponse,
    stack: err.stack,
    message: err.message,
  };

  return res
    .status(productionResponse.status)
    .json(isProduction ? productionResponse : developmentResponse);
}

function handleErrorAsync(func) {
  return async function (req, res, next) {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { errorMiddleware, handleErrorAsync };
