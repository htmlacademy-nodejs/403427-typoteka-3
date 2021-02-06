'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);
const initAPI = require(`../api`);

const {HttpCode, API_PREFIX} = require(`../../constants`);

const MOCK_ARTICLES = [{
  title: `foo`
}, {
  title: ``
}];

const routes = initAPI(MOCK_ARTICLES);

app.use(API_PREFIX, routes);

describe(`Search API end-to-end tests`, () => {
  test(`return articles list on /api/search`, async () => {
    const res = await request(app).get(`/api/search?query=${MOCK_ARTICLES[0].title}`);
    expect(res.statusCode).toBe(HttpCode.OK);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test(`return articles list if title contains substring`, async () => {
    const res = await request(app).get(`/api/search?query=${MOCK_ARTICLES[0].title}`);
    expect(res.body).toContainEqual(MOCK_ARTICLES[0]);
  });

  test(`return empty list if title not contains substring`, async () => {
    const res = await request(app).get(`/api/search?query=bar`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.body.length).toBe(0);
  });

  test(`return BAD_REQUEST on empty request with empty list`, async () => {
    const res = await request(app).get(`/api/search`);
    expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    expect(res.body.length).toBe(0);
  });
});
