'use strict';

const DEFAULT_COUNT = 1;
const USER_ARGV_INDEX = 2;
const MOCK_FILE_NAME = `mocks.json`;
const MAX_MOCK_ITEMS = 1000;
const MONTHS_AGO = 2;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const SentencesRestrict = {
  MIN: 1,
  MAX: 5,
};

const CliCommand = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`
};

const ExitCode = {
  FATAL_EXCEPTION: 1,
  SUCCESS: 0,
};

const DEFAULT_CLI_COMMAND = CliCommand.HELP;

module.exports = {
  SentencesRestrict,
  MAX_MOCK_ITEMS,
  MONTHS_AGO,
  FILE_CATEGORIES_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  MOCK_FILE_NAME,
  DEFAULT_COUNT,
  ExitCode,
  CliCommand,
  DEFAULT_CLI_COMMAND,
  USER_ARGV_INDEX
};
