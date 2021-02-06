'use strict';

const DEFAULT_COUNT = 1;
const USER_ARGV_INDEX = 2;
const MOCK_FILE_NAME = `mocks.json`;
const MAX_MOCK_ITEMS = 1000;
const MONTHS_AGO = 2;
const MAX_ID_LENGTH = 6;
const MAX_COMMENTS = 2;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const SentencesRestrict = {
  MIN: 1,
  MAX: 5,
};

const CliCommand = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`,
  SERVER: `--server`
};

const ExitCode = {
  FATAL_EXCEPTION: 1,
  SUCCESS: 0,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const DEFAULT_CLI_COMMAND = CliCommand.HELP;

const API_PREFIX = `/api`;

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  SentencesRestrict,
  MAX_MOCK_ITEMS,
  MONTHS_AGO,
  FILE_CATEGORIES_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_COMMENTS_PATH,
  MOCK_FILE_NAME,
  DEFAULT_COUNT,
  ExitCode,
  CliCommand,
  DEFAULT_CLI_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_PORT,
  FILENAME,
  HttpCode,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  API_PREFIX,
  Env
};
