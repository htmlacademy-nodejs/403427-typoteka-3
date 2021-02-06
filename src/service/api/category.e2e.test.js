'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);
const initAPI = require(`../api`);

const {HttpCode, API_PREFIX} = require(`../../constants`);

const routes = initAPI([{
  category: [
    `Книги`,
    `Разное`
  ],
}, {
  category: [
    `Посуда`,
    `Разное`
  ],
}]);

app.use(API_PREFIX, routes);

describe(`Categories API end-to-end tests`, () => {
  let res;
  beforeAll(async () => {
    res = await request(app)
      .get(`/api/category`);
  });

  test(`When get /api/category response code should be 200`, () => {
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`When get offer's categories response should be an array`, () => {
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test(`When get offer's categories response should be equal to mocked array`, () => {
    expect(res.body).toEqual([
      `Книги`,
      `Посуда`
    ]);
  });
});
