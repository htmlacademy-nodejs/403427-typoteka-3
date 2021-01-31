'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  MOCK_FILE_NAME,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_SENTENCES_PATH,
  FILE_COMMENTS_PATH,
  MAX_MOCK_ITEMS,
  MAX_COMMENTS,
  MONTHS_AGO,
  SentencesRestrict,
  ExitCode,
  MAX_ID_LENGTH
} = require(`../../constants`);

const {
  getRandomInt,
  getRandomDateMonthsAgo,
  shuffle
} = require(`../../utils`);

const generateArticles = (count, titles, categories, sentences, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(SentencesRestrict.MIN, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(sentences).slice(0, sentences.length - 1).join(` `),
    createdDate: getRandomDateMonthsAgo(MONTHS_AGO),
    category: shuffle(categories).slice(getRandomInt(0, categories.length - 1)),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }));
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    const result = content.trim()
      .split(`\n`)
      .map((el) => el.trim())
      .filter((el) => el);
    console.info(chalk.green(`Данные в количестве ${result.length} фраз успешно считаны`));
    return result;
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const writeArticles = async (articles) => {
  try {
    await fs.writeFile(MOCK_FILE_NAME, JSON.stringify(articles));
    console.info(chalk.green(`Данные в количестве ${articles.length} успешно сформированы в файл ${MOCK_FILE_NAME}`));
    process.exit(ExitCode.SUCCESS);
  } catch (err) {
    console.info(chalk.red(`Ошибка при создании данных`, err));
    process.exit(ExitCode.FATAL_EXCEPTION);
  }
};


module.exports = {
  name: CliCommand.GENERATE,
  async run(args = []) {
    const [userCount] = args;
    const count = Number.parseInt(userCount, 10);
    const countArticle = count && count > 0 ? count : DEFAULT_GENERATE_COUNT;

    if (countArticle > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} публикаций`));
      process.exit(ExitCode.FATAL_EXCEPTION);
    }
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const articles = await generateArticles(countArticle, titles, categories, sentences, comments);
    writeArticles(articles);
  }
};
