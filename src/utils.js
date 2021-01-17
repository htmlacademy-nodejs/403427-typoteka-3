'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDateMonthsAgo = (months) => {
  const startDate = new Date();
  const currentDate = new Date();
  startDate.setMonth(currentDate.getMonth() - months);
  return getRandomDate(startDate, currentDate);
};

const getRandomDate = (start, end) => {
  const result = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const formattedResult = result.toISOString().replace(/T/, ` `).replace(/\..+/, ``);
  return formattedResult;
};


const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const checkNumParam = (value, defaultValue) => {
  const valueNum = Number.parseInt(value, 10);
  return valueNum && valueNum > 0 ? valueNum : defaultValue;
};

module.exports = {
  getRandomInt,
  getRandomDateMonthsAgo,
  shuffle,
  checkNumParam
};
