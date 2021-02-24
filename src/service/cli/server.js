'use strict';

const express = require(`express`);
const {HttpCode, API_PREFIX} = require(`../../constants`);
const initAPI = require(`../api`);
const getMockData = require(`../lib/get-mock-data`);
const DEFAULT_PORT = 3000;
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

module.exports = {
  app,
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      const mockData = await getMockData();
      const routes = initAPI(mockData);

      app.use(API_PREFIX, routes);
      app.use((req, res) => res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found`));

      try {
        app.listen(process.env.PORT || DEFAULT_PORT);
        logger.info(`Listening to connections on ${port}`);
      } catch (err) {
        logger.error(`An error occured on server creation: ${err.message}`);
      }

    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  }
};
