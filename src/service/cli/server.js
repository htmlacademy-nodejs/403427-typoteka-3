'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {
  DEFAULT_PORT,
  FILENAME,
  HttpCode,
  CliCommand
} = require(`../../constants`);

const {checkNumParam} = require(`../../utils`);

const startServer = (port) => {
  http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
};


const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

const sendResponse = (res, statusCode, template) => {
  const html = (`
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>Node Http Server</title>
      </head>
      <body>${template}</body>
    </html>
  `).trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(html);
};

module.exports = {
  name: CliCommand.SERVER,
  run(args = []) {
    const [userPort] = args;
    const port = checkNumParam(userPort, DEFAULT_PORT);
    startServer(port);
  }
};
