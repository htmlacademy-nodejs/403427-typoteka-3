'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  MOCK_FILE_NAME,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_SENTENCES_PATH,
  MAX_MOCK_ITEMS,
  MONTHS_AGO,
  SentencesRestrict,
  ExitCode
} = require(`../../constants`);

const {
  getRandomInt,
  getRandomDateMonthsAgo,
  shuffle
} = require(`../../utils`);

const generateOffers = (count, titles, categories, sentences) => {
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(SentencesRestrict.MIN, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(sentences).slice(0, sentences.length - 1).join(` `),
    createdDate: getRandomDateMonthsAgo(MONTHS_AGO),
    category: shuffle(categories).slice(getRandomInt(0, categories.length - 1)),
  }));
};

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

const writeOffers = async (offers) => {
  try {
    await fs.writeFile(MOCK_FILE_NAME, JSON.stringify(offers));
    console.info(chalk.green(`Данные в количестве ${offers.length} успешно сформированы в файл ${MOCK_FILE_NAME}`));
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
    const countOffer = count && count > 0 ? count : DEFAULT_GENERATE_COUNT;

    if (countOffer > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} публикаций`));
      process.exit(ExitCode.FATAL_EXCEPTION);
    }
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const offers = await generateOffers(countOffer, titles, categories, sentences);
    writeOffers(offers);
  }
};
