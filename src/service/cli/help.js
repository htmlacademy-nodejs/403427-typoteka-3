'use strict';

const {
  CliCommand
} = require(`../../constants`);

const helpText = `
Программа запускает http-сервер и формирует файл с данными для API.
    Гайд:
    service.js <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
`;

module.exports = {
  name: CliCommand.HELP,
  run() {
    console.info(helpText);
  }
};
