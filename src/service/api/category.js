'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/category`, route);

  route.get(`/`, async (req, res) => {
    console.log(`service`, service);
    const categories = await service.findAll();
    res.status(HttpCode.OK)
      .json(categories);
  });
};
