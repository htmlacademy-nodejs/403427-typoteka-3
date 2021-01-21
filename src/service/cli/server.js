'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;

const {
  DEFAULT_PORT,
  FILENAME,
  HttpCode,
  CliCommand
} = require(`../../constants`);

const {checkNumParam} = require(`../../utils`);

const app = express();
app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: CliCommand.SERVER,
  run(args) {
    const [customPort] = args;
    const port = checkNumParam(customPort, DEFAULT_PORT);

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));

    });
  }
};
