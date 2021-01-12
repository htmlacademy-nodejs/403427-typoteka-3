'use strict';

const fs = require(`fs`);

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  MOCK_FILE_NAME,
  MOCK_TITLES,
  MOCK_SENTENCES,
  MOCK_CATEGORIES,
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

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: MOCK_TITLES[getRandomInt(0, MOCK_TITLES.length - 1)],
    announce: shuffle(MOCK_SENTENCES).slice(SentencesRestrict.MIN, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(MOCK_SENTENCES).slice(0, MOCK_SENTENCES.length - 1).join(` `),
    createdDate: getRandomDateMonthsAgo(MONTHS_AGO),
    category: shuffle(MOCK_CATEGORIES).slice(getRandomInt(0, MOCK_CATEGORIES.length - 1)),
  }));
};

const writeOffers = async (offers) => {
  fs.writeFile(MOCK_FILE_NAME, JSON.stringify(offers), (err) => {
    if (err) {
      console.info(`Ошибка при создании данных`);
      process.exit(ExitCode.FATAL_EXCEPTION);
    }

    console.info(`Данные в количестве [${offers.length}] успешно сформированы в файл ${MOCK_FILE_NAME}`);
    process.exit(ExitCode.SUCCESS);
  });
};

module.exports = {
  name: CliCommand.GENERATE,
  run(args = []) {
    const [userCount] = args;
    const count = Number.parseInt(userCount, 10);
    const countOffer = count && count > 0 ? count : DEFAULT_GENERATE_COUNT;

    if (countOffer > MAX_MOCK_ITEMS) {
      console.info(`Не больше ${MAX_MOCK_ITEMS} публикаций
      `);
      process.exit(ExitCode.FATAL_EXCEPTION);
    }

    const offers = generateOffers(countOffer);
    writeOffers(offers);
  }
};
