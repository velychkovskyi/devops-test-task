module.exports = {
  ...require('./errorMiddleware'),
  ...require('./noCacheMiddleware'),
};
