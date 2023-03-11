const express = require('express');

const routes = new express.Router();

routes.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

module.exports = routes;
