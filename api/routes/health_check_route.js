const route = require('express').Router();

route.get('/ping', (req, res) => {
  res.sendStatus(200);
});

module.exports = route;
