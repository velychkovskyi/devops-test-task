/* eslint-disable security-node/detect-non-literal-require-calls */
const glob = require('glob');

function createRouter(app) {
  glob
    .sync('**/router.js', { cwd: `${__dirname}/` })
    .sort((a, b) => (b.split('/').length > a.split('/').length ? 1 : -1))
    .forEach((path) => {
      const routePath = `/${path.replace('/router.js', '')}`;
      const filePath = `./${path}`;

      // eslint-disable-next-line import/no-dynamic-require
      app.use(routePath, require(filePath));
    });
}

module.exports = createRouter;
