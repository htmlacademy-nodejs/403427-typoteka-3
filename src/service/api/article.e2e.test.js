'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);
const initAPI = require(`../api`);

const {HttpCode, API_PREFIX} = require(`../../constants`);

const MOCK_ARTICLES = [{
  id: `1`,
  description: `1`,
  comments: [{id: `1`}]
}, {
  id: `2`,
  description: `2`
}];

const routes = initAPI(MOCK_ARTICLES);

app.use(API_PREFIX, routes);

describe(`Articles API end-to-end tests`, () => {
  describe(`get articles`, () => {
    test(`When get /api/articles response code should be 200`, async () => {
      const res = await request(app).get(`/api/articles`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When get articles response should be equal to mocked array`, async () => {
      const res = await request(app).get(`/api/articles`);
      expect(res.body).toEqual(MOCK_ARTICLES);
    });

    test(`When get article by id it should be equal to mocked data`, async () => {
      const res = await request(app).get(`/api/articles/1`);
      expect(res.body).toEqual(MOCK_ARTICLES[0]);
    });

    test(`for non-existing article status code should be NOT_FOUND`, async () => {
      const res = await request(app).get(`/api/articles/0`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`post article`, () => {
    test(`When post to /api/articles response should contain id`, async () => {
      const res = await request(app).post(`/api/articles`).send({
        category: ``, description: ``, title: ``
      });
      expect(res.body).toHaveProperty(`id`);
    });

    test(`When post to /api/articles validator should return BAD_REQUEST`, async () => {
      const res = await request(app).post(`/api/articles`).send({});
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`update article`, () => {
    test(`should update article by id`, async () => {
      const updatedMock = {
        category: [`1`], description: ``, title: ``
      };
      const res = await request(app).put(`/api/articles/2`).send(updatedMock);
      expect(res.body).toMatchObject(updatedMock);
    });

    test(`when update articles validator should return BAD_REQUEST`, async () => {
      const res = await request(app).put(`/api/articles/1`).send({});
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`for non-existing article status code should be BAD_REQUEST`, async () => {
      const res = await request(app).put(`/api/articles/0`);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`delete article`, () => {
    test(`When delete article response should contain article`, async () => {
      const {body} = await request(app).post(`/api/articles`).send({
        category: ``, description: ``, title: ``
      });
      const res = await request(app).delete(`/api/articles/${body.id}`);
      expect(res.body).toHaveProperty(`id`, body.id);
    });

    test(`When delete not existing article should return NOT_FOUND`, async () => {
      const res = await request(app).delete(`/api/articles/0`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`get all comments from article`, () => {
    test(`for existing announcement should return all comments`, async () => {
      const res = await request(app).get(`/api/articles/1/comments`);
      expect(res.body).toEqual(MOCK_ARTICLES[0].comments);
    });

    test(`for non-existing announcement status code should be NOT_FOUND`, async () => {
      const res = await request(app).get(`/api/articles/0/comments`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`delete comments from article`, () => {
    test(`for existing comment delete it by id`, async () => {
      const {body: comments} = await request(app).get(`/api/articles/1/comments`);
      const res = await request(app).delete(`/api/articles/1/comments/1`);
      expect(res.body).toEqual(comments[0]);

      const {body: updatedComments} = await request(app).get(`/api/articles/1/comments`);
      expect(updatedComments.length).toBe(0);
    });

    test(`for non-existing comment status code should be NOT_FOUND`, async () => {
      const res = await request(app).delete(`/api/articles/1/comments/0`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`add comment to article`, () => {
    test(`when add comment it should return new comment id`, async () => {
      const res = await request(app).post(`/api/articles/1/comments`).send({text: `example`});

      expect(res.statusCode).toBe(HttpCode.CREATED);
      expect(res.body).toHaveProperty(`text`);
    });

    test(`comment validator should return BAD_REQUEST on error`, async () => {
      const res = await request(app)
        .post(`/api/articles/1/comments`)
        .send({});
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});
