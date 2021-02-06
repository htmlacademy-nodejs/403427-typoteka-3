'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(`An error occured on getting mock data: ${err.message}`);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

(async () => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(`An error occured: ${err.message}`);
  }
})();

module.exports = getMockData;
